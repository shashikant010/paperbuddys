// src/SuperAdminDashboard.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  collection, onSnapshot, writeBatch, doc, 
  deleteDoc, query, where, getDocs, serverTimestamp, updateDoc 
} from 'firebase/firestore';
import { signOut } from 'firebase/auth';
import { motion } from 'framer-motion';
import { 
  School, Plus, Edit, Trash2, Settings, 
  LogOut, MapPin, Mail, Loader2, ShieldAlert, BookOpen
} from 'lucide-react';
import { auth, db } from './firebase';
import SchoolModal from './SchoolModal';
import FeatureToggleModal from './FeatureToggleModal';
import ManageClassesModal from './ManageClassesModal';

// Helper to convert "1" to "1st", "2" to "2nd", but leave "PP1" as "PP1"
const getOrdinal = (n) => {
  const num = parseInt(n);
  if (isNaN(num)) return n; 
  const s = ["th", "st", "nd", "rd"];
  const v = num % 100;
  return num + (s[(v - 20) % 10] || s[v] || s[0]);
};

const SuperAdminDashboard = ({ isDarkMode }) => {
  const [schools, setSchools] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Modals State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFeatureModalOpen, setIsFeatureModalOpen] = useState(false);
  const [isClassModalOpen, setIsClassModalOpen] = useState(false);
  
  const [selectedSchool, setSelectedSchool] = useState(null);
  const [selectedSchoolForFeatures, setSelectedSchoolForFeatures] = useState(null);
  const [selectedSchoolForClass, setSelectedSchoolForClass] = useState(null);
  
  const [isSaving, setIsSaving] = useState(false);
  const [isSavingFeatures, setIsSavingFeatures] = useState(false);
  const [isSavingClass, setIsSavingClass] = useState(false);
  
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribeAuth = auth.onAuthStateChanged((user) => {
        if (!user) navigate('/super-admin');
    });

    const schoolsRef = collection(db, 'schools');
    const unsubscribeSchools = onSnapshot(schoolsRef, 
      (snapshot) => {
        const schoolsData = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setSchools(schoolsData);
        setLoading(false);
      },
      (err) => {
        console.error("Error fetching schools:", err);
        setError("Failed to load schools.");
        setLoading(false);
      }
    );

    return () => {
      unsubscribeAuth();
      unsubscribeSchools();
    };
  }, [navigate]);

  const handleLogout = async () => {
    await signOut(auth);
    navigate('/super-admin');
  };

  const openAddModal = () => {
    setSelectedSchool(null);
    setIsModalOpen(true);
  };

  const openEditModal = (school) => {
    setSelectedSchool(school);
    setIsModalOpen(true);
  };

  const handleManageFeatures = (school) => {
    setSelectedSchoolForFeatures(school);
    setIsFeatureModalOpen(true);
  };

  const handleManageClassesPrompt = (school) => {
    if (!school.currentAcademicYearId) {
      alert("This school does not have an active Academic Year setup.");
      return;
    }
    setSelectedSchoolForClass(school);
    setIsClassModalOpen(true);
  };

  // --- CRUD LOGIC ---

  const handleSaveSchool = async (data, isEdit) => {
    setIsSaving(true);
    setError(null);
    try {
      const batch = writeBatch(db);
      
      const schoolPayload = {
        name: data.name,
        nickname: data.nickname,
        email: data.email,
        schoolId: data.schoolId,
        schoolLogoUrl: data.schoolLogoUrl,
        upiId: data.upiId,
        attendanceType: data.attendanceType,
        attendanceSettings: {
          checkInStart: data.checkInStart,
          lateCutoff: data.lateCutoff,
          radiusMeters: Number(data.radiusMeters),
        },
        address: {
          city: data.city,
          state: data.state,
          pincode: data.pincode,
          street: data.street,
          houseNumber: data.houseNumber,
          landmark: data.landmark,
        },
        location: {
          lat: Number(data.lat),
          lng: Number(data.lng),
        }
      };

      const schoolRef = doc(db, 'schools', data.schoolId);

      if (!isEdit) {
        const academicYearId = `${data.schoolId}_${(data.yearLabel || '2026-2027').replace('-', '_')}`;
        schoolPayload.adminId = data.adminId;
        schoolPayload.currentAcademicYearId = academicYearId;
        schoolPayload.disabledFeatures = []; 

        batch.set(schoolRef, schoolPayload);

        const ayRef = doc(db, 'academicYears', academicYearId);
        batch.set(ayRef, {
          isActive: true,
          schoolId: data.schoolId,
          totalStudents: 0,
          yearLabel: data.yearLabel || '2026-2027',
          createdAt: serverTimestamp()
        });

        const adminRef = doc(db, 'admins', data.adminId);
        batch.set(adminRef, {
          id: data.adminId,
          name: data.adminName,
          email: data.adminEmail,
          role: 'admin',
          schoolId: data.schoolId
        });
      } else {
        batch.update(schoolRef, schoolPayload);
      }

      await batch.commit();
      setIsModalOpen(false);
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteSchool = async (school) => {
    if (!window.confirm(`WARNING: Are you sure you want to permanently delete ${school.name} and all its structural data?`)) return;
    
    setError(null);
    try {
      const batch = writeBatch(db);
      batch.delete(doc(db, 'schools', school.id));
      
      const ayQ = query(collection(db, 'academicYears'), where('schoolId', '==', school.id));
      const ayDocs = await getDocs(ayQ);
      ayDocs.forEach(d => batch.delete(d.ref));
      
      const adminQ = query(collection(db, 'admins'), where('schoolId', '==', school.id));
      const adminDocs = await getDocs(adminQ);
      adminDocs.forEach(d => batch.delete(d.ref));

      await batch.commit();
    } catch (err) {
      console.error(err);
      setError("Failed to delete school.");
    }
  };

  const handleSaveFeatures = async (schoolId, newDisabledFeatures) => {
    setIsSavingFeatures(true);
    setError(null);
    try {
      const schoolRef = doc(db, 'schools', schoolId);
      await updateDoc(schoolRef, {
        disabledFeatures: newDisabledFeatures
      });
      setIsFeatureModalOpen(false);
    } catch (err) {
      console.error(err);
      setError("Failed to update feature configuration.");
    } finally {
      setIsSavingFeatures(false);
    }
  };

  const handleSaveClassesBulk = async (classesArray) => {
    setIsSavingClass(true);
    setError(null);
    try {
      const batch = writeBatch(db);
      const school = selectedSchoolForClass;

      classesArray.forEach((cls) => {
        if (!cls.classNum || !cls.section) return;

        const classNum = cls.classNum;
        const section = cls.section;
        const ordinalClass = getOrdinal(classNum);
        const docId = `class-${classNum}-${section}`;

        const classPayload = {
          behaviorStats: { avgScore: 0, healthStatus: "", totalScore: 0, trend: "" },
          classFeesSummary: {
            classId: `class-${classNum}${section}${section}`, // Follows original JSON logic
            className: ordinalClass,
            collectedAmount: 0,
            paidStudentsCount: 0,
            pendingStudentsCount: 0,
            totalAmount: 0
          },
          className: `${ordinalClass} ${section}`,
          classNumber: `${classNum}${section}`,
          classTeacher: {},
          isActive: true,
          schoolId: school.schoolId,
          section: section,
          stats: { averageAttendance: 0, averageMarks: 0, totalAssignments: 0, totalPresent: 0, totalStudents: 0 },
          subjects: null,
          timeTableId: "",
          totalStudents: 0
        };

        const classRef = doc(db, 'academicYears', school.currentAcademicYearId, 'classes', docId);
        batch.set(classRef, classPayload);
      });

      await batch.commit();
      setIsClassModalOpen(false);
    } catch (err) {
      console.error(err);
      setError("Failed to bulk create classes.");
    } finally {
      setIsSavingClass(false);
    }
  };

  if (loading) {
    return (
      <div className={`min-h-screen flex items-center justify-center pt-20 ${isDarkMode ? 'bg-slate-950 text-white' : 'bg-slate-50 text-slate-900'}`}>
        <Loader2 size={48} className="animate-spin text-blue-500" />
      </div>
    );
  }

  return (
    <div className={`min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8 transition-colors duration-300 ${isDarkMode ? 'bg-slate-950' : 'bg-slate-50'}`}>
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className={`text-3xl font-black flex items-center gap-3 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
              <ShieldAlert className="text-blue-500" size={32} />
              Super Admin Control
            </h1>
            <p className={`mt-1 font-medium ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
              Manage all registered institutions and their access.
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            <button 
              onClick={openAddModal}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-bold transition-all shadow-lg shadow-blue-600/20 hover:-translate-y-0.5"
            >
              <Plus size={20} /> Add School
            </button>
            <button 
              onClick={handleLogout}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold transition-all border ${
                isDarkMode ? 'bg-slate-900 border-slate-700 text-red-400 hover:bg-red-500/10' : 'bg-white border-slate-200 text-red-600 hover:bg-red-50'
              }`}
            >
              <LogOut size={20} /> Logout
            </button>
          </div>
        </div>

        {error && (
          <div className="mb-8 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 font-bold">
            {error}
          </div>
        )}

        {/* Schools Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {schools.length === 0 && !error ? (
            <div className={`col-span-full text-center py-12 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
              <School size={48} className="mx-auto mb-4 opacity-50" />
              <p className="text-lg font-bold">No schools found in the database.</p>
            </div>
          ) : (
            schools.map((school, index) => (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                key={school.id} 
                className={`flex flex-col p-6 rounded-[1.5rem] border shadow-xl ${
                  isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
                }`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`p-3 rounded-xl ${isDarkMode ? 'bg-blue-500/10 text-blue-400' : 'bg-blue-50 text-blue-600'}`}>
                    <School size={24} />
                  </div>
                  <span className={`text-xs font-bold px-3 py-1 rounded-full ${isDarkMode ? 'bg-slate-800 text-slate-300' : 'bg-slate-100 text-slate-600'}`}>
                    ID: {school.schoolId}
                  </span>
                </div>
                
                <h3 className={`text-xl font-black mb-1 truncate ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                  {school.name}
                </h3>
                
                <div className="space-y-2 mt-4 flex-grow">
                  <div className={`flex items-center gap-2 text-sm font-medium ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                    <Mail size={16} />
                    <span className="truncate">{school.email || 'N/A'}</span>
                  </div>
                  <div className={`flex items-center gap-2 text-sm font-medium ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                    <MapPin size={16} />
                    <span className="truncate">
                      {school.address && school.address.city ? `${school.address.city}, ${school.address.state}` : 'N/A'}
                    </span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className={`grid grid-cols-4 gap-2 mt-6 pt-6 border-t ${isDarkMode ? 'border-slate-800' : 'border-slate-100'}`}>
                  <button 
                    onClick={() => handleManageFeatures(school)}
                    title="Manage Features"
                    className={`flex items-center justify-center p-2.5 rounded-lg transition-colors ${
                      isDarkMode ? 'bg-purple-500/10 text-purple-400 hover:bg-purple-500/20' : 'bg-purple-50 text-purple-600 hover:bg-purple-100'
                    }`}
                  >
                    <Settings size={20} />
                  </button>
                  <button 
                    onClick={() => handleManageClassesPrompt(school)}
                    title="Manage Classes"
                    className={`flex items-center justify-center p-2.5 rounded-lg transition-colors ${
                      isDarkMode ? 'bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20' : 'bg-emerald-50 text-emerald-600 hover:bg-emerald-100'
                    }`}
                  >
                    <BookOpen size={20} />
                  </button>
                  <button 
                    onClick={() => openEditModal(school)}
                    title="Edit School"
                    className={`flex items-center justify-center p-2.5 rounded-lg transition-colors ${
                      isDarkMode ? 'bg-blue-500/10 text-blue-400 hover:bg-blue-500/20' : 'bg-blue-50 text-blue-600 hover:bg-blue-100'
                    }`}
                  >
                    <Edit size={20} />
                  </button>
                 
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>

      {/* Forms & Modals */}
      <SchoolModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSaveSchool}
        initialData={selectedSchool}
        isDarkMode={isDarkMode}
        isLoading={isSaving}
      />

      <FeatureToggleModal
        isOpen={isFeatureModalOpen}
        onClose={() => setIsFeatureModalOpen(false)}
        onSave={handleSaveFeatures}
        school={selectedSchoolForFeatures}
        isDarkMode={isDarkMode}
        isLoading={isSavingFeatures}
      />

      <ManageClassesModal
        isOpen={isClassModalOpen}
        onClose={() => setIsClassModalOpen(false)}
        onSubmit={handleSaveClassesBulk}
        school={selectedSchoolForClass}
        isDarkMode={isDarkMode}
        isLoading={isSavingClass}
      />
    </div>
  );
};

export default SuperAdminDashboard;