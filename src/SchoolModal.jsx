// src/SchoolModal.jsx
import React, { useState, useEffect } from 'react';
import { X, Loader2 } from 'lucide-react';

const SchoolModal = ({ isOpen, onClose, onSubmit, initialData, isDarkMode, isLoading }) => {
  const isEdit = !!initialData;

  const [formData, setFormData] = useState({
    name: '', nickname: '', email: '', schoolId: '', schoolLogoUrl: '', upiId: '',
    attendanceType: 'daily', checkInStart: '07:00', lateCutoff: '11:15', radiusMeters: 50,
    city: '', state: '', pincode: '', street: '', houseNumber: '', landmark: '',
    lat: 0, lng: 0,
    adminName: '', adminEmail: '', adminId: '', yearLabel: '2026-2027'
  });

  useEffect(() => {
    if (isOpen && initialData) {
      setFormData({
        name: initialData.name || '',
        nickname: initialData.nickname || '',
        email: initialData.email || '',
        schoolId: initialData.schoolId || '',
        schoolLogoUrl: initialData.schoolLogoUrl || '',
        upiId: initialData.upiId || '',
        attendanceType: initialData.attendanceType || 'daily',
        checkInStart: initialData.attendanceSettings?.checkInStart || '07:00',
        lateCutoff: initialData.attendanceSettings?.lateCutoff || '11:15',
        radiusMeters: initialData.attendanceSettings?.radiusMeters || 50,
        city: initialData.address?.city || '',
        state: initialData.address?.state || '',
        pincode: initialData.address?.pincode || '',
        street: initialData.address?.street || '',
        houseNumber: initialData.address?.houseNumber || '',
        landmark: initialData.address?.landmark || '',
        lat: initialData.location?.lat || 0,
        lng: initialData.location?.lng || 0,
        // Safely initialize these to prevent undefined errors
        adminName: '', adminEmail: '', adminId: '', yearLabel: '2026-2027'
      });
    } else if (isOpen && !initialData) {
      // Reset for Add
      setFormData({
        name: '', nickname: '', email: '', schoolId: '', schoolLogoUrl: '', upiId: '',
        attendanceType: 'daily', checkInStart: '07:00', lateCutoff: '11:15', radiusMeters: 50,
        city: '', state: '', pincode: '', street: '', houseNumber: '', landmark: '',
        lat: 0, lng: 0, adminName: '', adminEmail: '', adminId: '', yearLabel: '2026-2027'
      });
    }
  }, [isOpen, initialData]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData, isEdit);
  };

  const inputClass = `w-full px-4 py-2.5 rounded-xl font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 border ${
    isDarkMode ? 'bg-slate-800 border-slate-700 text-white placeholder-slate-500' : 'bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400'
  }`;

  const labelClass = `block text-xs font-bold mb-1.5 ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`;
  const sectionClass = `text-lg font-black mb-4 ${isDarkMode ? 'text-white' : 'text-slate-900'} border-b ${isDarkMode ? 'border-slate-800' : 'border-slate-200'} pb-2`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
      <div className={`relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl shadow-2xl ${isDarkMode ? 'bg-slate-900' : 'bg-white'}`}>
        
        {/* Modal Header */}
        <div className={`sticky top-0 z-10 flex items-center justify-between px-6 py-4 border-b ${isDarkMode ? 'bg-slate-900/90 border-slate-800' : 'bg-white/90 border-slate-200'} backdrop-blur-md`}>
          <h2 className={`text-2xl font-black ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
            {isEdit ? 'Edit School' : 'Add New School'}
          </h2>
          <button onClick={onClose} className={`p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-8">
          {/* General Information */}
          <div>
            <h3 className={sectionClass}>General Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div><label className={labelClass}>School Name *</label><input required name="name" value={formData.name} onChange={handleChange} className={inputClass} placeholder="e.g. Vijay High School" /></div>
              <div><label className={labelClass}>Nickname</label><input name="nickname" value={formData.nickname} onChange={handleChange} className={inputClass} placeholder="e.g. VHS" /></div>
              <div><label className={labelClass}>School ID *</label><input required disabled={isEdit} name="schoolId" value={formData.schoolId} onChange={handleChange} className={`${inputClass} ${isEdit ? 'opacity-50 cursor-not-allowed' : ''}`} placeholder="e.g. vijay-school" /></div>
              <div><label className={labelClass}>Email</label><input type="email" name="email" value={formData.email} onChange={handleChange} className={inputClass} placeholder="admin@school.com" /></div>
              <div><label className={labelClass}>UPI ID</label><input name="upiId" value={formData.upiId} onChange={handleChange} className={inputClass} placeholder="school@upi" /></div>
              <div><label className={labelClass}>Logo URL</label><input name="schoolLogoUrl" value={formData.schoolLogoUrl} onChange={handleChange} className={inputClass} placeholder="https://..." /></div>
            </div>
          </div>

          {/* Attendance Settings */}
          <div>
            <h3 className={sectionClass}>Attendance Settings</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className={labelClass}>Type</label>
                <select name="attendanceType" value={formData.attendanceType} onChange={handleChange} className={inputClass}>
                  <option value="daily">Daily</option>
                  <option value="subject-wise">Subject-wise</option>
                </select>
              </div>
              <div><label className={labelClass}>Check-In Start</label><input type="time" name="checkInStart" value={formData.checkInStart} onChange={handleChange} className={inputClass} /></div>
              <div><label className={labelClass}>Late Cutoff</label><input type="time" name="lateCutoff" value={formData.lateCutoff} onChange={handleChange} className={inputClass} /></div>
              <div><label className={labelClass}>Radius (Meters)</label><input type="number" name="radiusMeters" value={formData.radiusMeters} onChange={handleChange} className={inputClass} /></div>
            </div>
          </div>

          {/* Address & Location */}
          <div>
            <h3 className={sectionClass}>Address & Location</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div><label className={labelClass}>House/Plot No.</label><input name="houseNumber" value={formData.houseNumber} onChange={handleChange} className={inputClass} /></div>
              <div><label className={labelClass}>Street/Colony</label><input name="street" value={formData.street} onChange={handleChange} className={inputClass} /></div>
              <div><label className={labelClass}>Landmark</label><input name="landmark" value={formData.landmark} onChange={handleChange} className={inputClass} /></div>
              <div><label className={labelClass}>City</label><input name="city" value={formData.city} onChange={handleChange} className={inputClass} /></div>
              <div><label className={labelClass}>State</label><input name="state" value={formData.state} onChange={handleChange} className={inputClass} /></div>
              <div><label className={labelClass}>Pincode</label><input name="pincode" value={formData.pincode} onChange={handleChange} className={inputClass} /></div>
              <div><label className={labelClass}>Latitude</label><input type="number" step="any" name="lat" value={formData.lat} onChange={handleChange} className={inputClass} /></div>
              <div><label className={labelClass}>Longitude</label><input type="number" step="any" name="lng" value={formData.lng} onChange={handleChange} className={inputClass} /></div>
            </div>
          </div>

          {/* Initial Setup (Admin & Academic Year) - ONLY FOR ADDING */}
          {!isEdit && (
            <div>
              <h3 className={sectionClass}>Initial Setup (Created Automatically)</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div><label className={labelClass}>Admin ID (Auth UID) *</label><input required name="adminId" value={formData.adminId} onChange={handleChange} className={inputClass} placeholder="Firebase UID" /></div>
                <div><label className={labelClass}>Admin Name *</label><input required name="adminName" value={formData.adminName} onChange={handleChange} className={inputClass} placeholder="Admin Full Name" /></div>
                <div><label className={labelClass}>Admin Email *</label><input required type="email" name="adminEmail" value={formData.adminEmail} onChange={handleChange} className={inputClass} placeholder="admin@email.com" /></div>
                <div><label className={labelClass}>Academic Year *</label><input required name="yearLabel" value={formData.yearLabel} onChange={handleChange} className={inputClass} placeholder="e.g. 2026-2027" /></div>
              </div>
            </div>
          )}

          {/* Footer Actions */}
          <div className={`pt-6 border-t ${isDarkMode ? 'border-slate-800' : 'border-slate-200'} flex justify-end gap-3`}>
            <button type="button" onClick={onClose} disabled={isLoading} className={`px-6 py-3 rounded-xl font-bold transition-colors ${isDarkMode ? 'bg-slate-800 text-slate-300 hover:bg-slate-700' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}>
              Cancel
            </button>
            <button type="submit" disabled={isLoading} className="flex items-center gap-2 px-6 py-3 rounded-xl font-bold bg-blue-600 hover:bg-blue-700 text-white transition-all shadow-lg shadow-blue-600/30">
              {isLoading ? <Loader2 size={20} className="animate-spin" /> : (isEdit ? 'Save Changes' : 'Create School')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SchoolModal;