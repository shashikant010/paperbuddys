// src/ManageClassesModal.jsx
import React, { useState, useEffect } from 'react';
import { X, Loader2, BookOpen, Plus, Trash2, Layers } from 'lucide-react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from './firebase';

const ManageClassesModal = ({ isOpen, onClose, onSubmit, school, isDarkMode, isLoading }) => {
  const [existingClasses, setExistingClasses] = useState([]);
  const [newClasses, setNewClasses] = useState([]);
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    if (isOpen && school?.currentAcademicYearId) {
      fetchExistingClasses();
    } else {
      setExistingClasses([]);
      setNewClasses([]);
    }
  }, [isOpen, school]);

  const fetchExistingClasses = async () => {
    setIsFetching(true);
    try {
      const classesRef = collection(db, 'academicYears', school.currentAcademicYearId, 'classes');
      const snapshot = await getDocs(classesRef);
      const fetchedClasses = snapshot.docs.map(doc => doc.data());
      
      // Sort classes for better display
      fetchedClasses.sort((a, b) => {
        const numA = parseInt(a.classNumber) || 999;
        const numB = parseInt(b.classNumber) || 999;
        return numA - numB;
      });
      
      setExistingClasses(fetchedClasses);

      // Smart pre-fill: If no classes exist, pre-fill standard grades 1 to 10
      if (fetchedClasses.length === 0) {
        const defaultClasses = Array.from({ length: 10 }, (_, i) => ({
          id: Date.now() + i,
          classNum: String(i + 1),
          section: 'A'
        }));
        setNewClasses(defaultClasses);
      } else {
        // Otherwise just provide one empty row
        setNewClasses([{ id: Date.now(), classNum: '', section: 'A' }]);
      }
    } catch (error) {
      console.error("Error fetching existing classes:", error);
    } finally {
      setIsFetching(false);
    }
  };

  const handleAddRow = () => {
    setNewClasses(prev => [...prev, { id: Date.now(), classNum: '', section: 'A' }]);
  };

  const handleRemoveRow = (id) => {
    setNewClasses(prev => prev.filter(cls => cls.id !== id));
  };

  const handleChangeRow = (id, field, value) => {
    setNewClasses(prev => prev.map(cls => 
      cls.id === id ? { ...cls, [field]: value.toUpperCase() } : cls
    ));
  };

  const handleAutoFillStandard = () => {
    const standard = Array.from({ length: 12 }, (_, i) => ({
      id: Date.now() + i,
      classNum: String(i + 1),
      section: 'A'
    }));
    setNewClasses(standard);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Filter out completely empty rows before submitting
    const validClasses = newClasses.filter(c => c.classNum.trim() !== '' && c.section.trim() !== '');
    onSubmit(validClasses);
  };

  if (!isOpen || !school) return null;

  const inputClass = `w-full px-4 py-2.5 rounded-xl font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 border transition-colors ${
    isDarkMode ? 'bg-slate-800 border-slate-700 text-white placeholder-slate-500' : 'bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400'
  }`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
      <div className={`relative w-full max-w-2xl max-h-[90vh] flex flex-col rounded-3xl shadow-2xl ${isDarkMode ? 'bg-slate-900' : 'bg-white'}`}>
        
        {/* Header */}
        <div className={`flex items-center justify-between px-6 py-5 border-b ${isDarkMode ? 'border-slate-800' : 'border-slate-200'}`}>
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-xl ${isDarkMode ? 'bg-emerald-500/20 text-emerald-400' : 'bg-emerald-100 text-emerald-600'}`}>
              <BookOpen size={24} />
            </div>
            <div>
              <h2 className={`text-xl font-black leading-tight ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                Bulk Manage Classes
              </h2>
              <p className={`text-sm font-medium ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                {school.name} ({school.currentAcademicYearId?.split('_')[1] || 'No Year Active'})
              </p>
            </div>
          </div>
          <button onClick={onClose} className={`p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
            <X size={24} />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-8">
          
          {/* Section: Existing Classes */}
          <div>
            <h3 className={`text-sm font-black uppercase tracking-wider mb-4 flex items-center gap-2 ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`}>
              <Layers size={16} /> Existing Classes
            </h3>
            {isFetching ? (
              <div className="flex items-center justify-center py-4">
                <Loader2 size={24} className="animate-spin text-blue-500" />
              </div>
            ) : existingClasses.length === 0 ? (
              <div className={`text-sm font-medium italic ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`}>
                No classes registered yet for this academic year.
              </div>
            ) : (
              <div className="flex flex-wrap gap-2">
                {existingClasses.map(cls => (
                  <span key={cls.classId || cls.classNumber} className={`px-3 py-1.5 rounded-lg text-sm font-bold border ${
                    isDarkMode ? 'bg-slate-800 border-slate-700 text-slate-300' : 'bg-slate-50 border-slate-200 text-slate-700'
                  }`}>
                    {cls.className}
                  </span>
                ))}
              </div>
            )}
          </div>

          <hr className={isDarkMode ? 'border-slate-800' : 'border-slate-200'} />

          {/* Section: Bulk Add */}
          <form id="bulk-class-form" onSubmit={handleSubmit}>
            <div className="flex items-center justify-between mb-4">
              <h3 className={`text-sm font-black uppercase tracking-wider ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`}>
                Add New Classes (Bulk)
              </h3>
              <button 
                type="button" 
                onClick={handleAutoFillStandard}
                className="text-xs font-bold text-blue-500 hover:text-blue-600 transition-colors"
              >
                Auto-fill Standard 1-12
              </button>
            </div>

            <div className="space-y-3">
              {newClasses.map((cls, index) => (
                <div key={cls.id} className="flex items-center gap-3">
                  <div className="flex-1">
                    <input 
                      required 
                      value={cls.classNum} 
                      onChange={(e) => handleChangeRow(cls.id, 'classNum', e.target.value)} 
                      className={inputClass} 
                      placeholder="Class (e.g. 10, PP1)" 
                    />
                  </div>
                  <div className="flex-1">
                    <input 
                      required 
                      value={cls.section} 
                      onChange={(e) => handleChangeRow(cls.id, 'section', e.target.value)} 
                      className={inputClass} 
                      placeholder="Section (e.g. A)" 
                    />
                  </div>
                  <button 
                    type="button" 
                    onClick={() => handleRemoveRow(cls.id)}
                    className={`p-3 rounded-xl transition-colors ${
                      isDarkMode ? 'bg-red-500/10 text-red-400 hover:bg-red-500/20' : 'bg-red-50 text-red-600 hover:bg-red-100'
                    }`}
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              ))}
            </div>

            <button 
              type="button" 
              onClick={handleAddRow}
              className={`mt-4 flex items-center gap-2 text-sm font-bold px-4 py-2 rounded-lg border border-dashed transition-colors ${
                isDarkMode ? 'border-slate-700 text-slate-400 hover:bg-slate-800 hover:text-white' : 'border-slate-300 text-slate-500 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              <Plus size={16} /> Add Another Row
            </button>
          </form>

        </div>

        {/* Footer */}
        <div className={`px-6 py-5 border-t ${isDarkMode ? 'border-slate-800' : 'border-slate-200'} flex justify-end gap-3`}>
          <button type="button" onClick={onClose} disabled={isLoading} className={`px-6 py-3 rounded-xl font-bold transition-colors ${isDarkMode ? 'bg-slate-800 text-slate-300 hover:bg-slate-700' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}>
            Cancel
          </button>
          <button 
            type="submit" 
            form="bulk-class-form" 
            disabled={isLoading || newClasses.length === 0} 
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-white transition-all ${
              isLoading || newClasses.length === 0 
                ? 'bg-emerald-400 cursor-not-allowed' 
                : 'bg-emerald-600 hover:bg-emerald-700 shadow-lg shadow-emerald-600/30'
            }`}
          >
            {isLoading ? <Loader2 size={20} className="animate-spin" /> : `Save ${newClasses.length} Classes`}
          </button>
        </div>

      </div>
    </div>
  );
};

export default ManageClassesModal;