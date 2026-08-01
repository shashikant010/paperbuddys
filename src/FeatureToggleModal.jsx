import React, { useState, useEffect } from 'react';
import { X, Loader2, Shield } from 'lucide-react';

// Centralized list of all lockable features across Admin & Teacher apps
const AVAILABLE_FEATURES = [
  { id: '/classes', title: 'Classes & Sections', group: 'Admin' },
  { id: '/attendance', title: 'Daily Attendance', group: 'Admin' },
  { id: '/fees', title: 'Fees Overview', group: 'Admin' },
  { id: '/teachers', title: 'Teachers Directory', group: 'Admin' },
  { id: '/holidays', title: 'Holidays & Events', group: 'Admin' },
  { id: '/exams', title: 'Manage Exams', group: 'Admin' },
  { id: '/transport', title: 'Transport & Routes', group: 'Admin' },
  { id: '/timetable', title: 'Timetable Schedules', group: 'Admin' },
  { id: '/behavior', title: 'Anecdotal Records', group: 'Shared' },
  { id: '/announcement', title: 'Announcements', group: 'Shared' },
  { id: '/quiz', title: 'AI Quiz Maker', group: 'Teacher' },
  { id: '/assessment', title: 'Grading & Assessment', group: 'Teacher' },
  { id: '/homework-list', title: 'Homework Management', group: 'Teacher' },
  { id: '/question-paper', title: 'Question Papers', group: 'Teacher' },
  { id: '/leaves', title: 'Teacher Leaves', group: 'Teacher' },
  { id: '/resources', title: 'Class Resources', group: 'Teacher' },
  { id: '/syllabus-management', title: 'Syllabus Tracking', group: 'Teacher' },
];

const FeatureToggleModal = ({ isOpen, onClose, onSave, school, isDarkMode, isLoading }) => {
  // Store an array of disabled feature IDs
  const [disabledFeatures, setDisabledFeatures] = useState([]);

  useEffect(() => {
    if (isOpen && school) {
      setDisabledFeatures(school.disabledFeatures || []);
    }
  }, [isOpen, school]);

  if (!isOpen || !school) return null;

  const handleToggle = (featureId) => {
    setDisabledFeatures(prev => 
      prev.includes(featureId) 
        ? prev.filter(id => id !== featureId) // Remove (Enable)
        : [...prev, featureId]                // Add (Disable)
    );
  };

  const handleSave = () => {
    onSave(school.id, disabledFeatures);
  };

  // Group features for better UI organization
  const groupedFeatures = AVAILABLE_FEATURES.reduce((acc, feature) => {
    if (!acc[feature.group]) acc[feature.group] = [];
    acc[feature.group].push(feature);
    return acc;
  }, {});

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
      <div className={`relative w-full max-w-2xl max-h-[90vh] flex flex-col rounded-3xl shadow-2xl ${isDarkMode ? 'bg-slate-900' : 'bg-white'}`}>
        
        {/* Header */}
        <div className={`flex items-center justify-between px-6 py-5 border-b ${isDarkMode ? 'border-slate-800' : 'border-slate-200'}`}>
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-xl ${isDarkMode ? 'bg-purple-500/20 text-purple-400' : 'bg-purple-100 text-purple-600'}`}>
              <Shield size={24} />
            </div>
            <div>
              <h2 className={`text-xl font-black leading-tight ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                Feature Access Control
              </h2>
              <p className={`text-sm font-medium ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                {school.name}
              </p>
            </div>
          </div>
          <button onClick={onClose} className={`p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
            <X size={24} />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-8">
          <div className={`p-4 rounded-xl text-sm font-medium ${isDarkMode ? 'bg-blue-900/20 text-blue-300 border border-blue-800' : 'bg-blue-50 text-blue-700 border border-blue-100'}`}>
            Toggle switches below to lock or unlock features for this specific institution. Locked features will be hidden from the school's Admin and Teacher dashboards.
          </div>

          {Object.entries(groupedFeatures).map(([groupName, features]) => (
            <div key={groupName}>
              <h3 className={`text-sm font-black uppercase tracking-wider mb-4 ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`}>
                {groupName} Modules
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {features.map(feature => {
                  const isLocked = disabledFeatures.includes(feature.id);
                  return (
                    <div 
                      key={feature.id} 
                      className={`flex items-center justify-between p-4 rounded-xl border transition-colors ${
                        isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-slate-50 border-slate-200'
                      } ${isLocked ? 'opacity-60' : ''}`}
                    >
                      <span className={`font-bold text-sm ${isDarkMode ? 'text-slate-200' : 'text-slate-700'}`}>
                        {feature.title}
                      </span>
                      
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input 
                          type="checkbox" 
                          className="sr-only peer" 
                          checked={!isLocked} 
                          onChange={() => handleToggle(feature.id)}
                        />
                        <div className={`w-11 h-6 rounded-full peer transition-colors after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full peer-checked:after:border-white ${
                          isDarkMode ? 'bg-slate-600 peer-checked:bg-blue-500' : 'bg-slate-300 peer-checked:bg-blue-600'
                        }`}></div>
                      </label>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className={`px-6 py-5 border-t ${isDarkMode ? 'border-slate-800' : 'border-slate-200'} flex justify-end gap-3`}>
          <button type="button" onClick={onClose} disabled={isLoading} className={`px-6 py-3 rounded-xl font-bold transition-colors ${isDarkMode ? 'bg-slate-800 text-slate-300 hover:bg-slate-700' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}>
            Cancel
          </button>
          <button type="button" onClick={handleSave} disabled={isLoading} className="flex items-center gap-2 px-6 py-3 rounded-xl font-bold bg-blue-600 hover:bg-blue-700 text-white transition-all shadow-lg shadow-blue-600/30">
            {isLoading ? <Loader2 size={20} className="animate-spin" /> : 'Save Configurations'}
          </button>
        </div>

      </div>
    </div>
  );
};

export default FeatureToggleModal;