// src/SuperAdminLogin.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShieldCheck, Mail, Lock, Eye, EyeOff, Loader2 } from 'lucide-react';
import { signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from './firebase';

const SuperAdminLogin = ({ isDarkMode }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // 1. Authenticate with Firebase Auth
      const userCredential = await signInWithEmailAndPassword(auth, email.trim(), password);
      const user = userCredential.user;

      // 2. Verify Super Admin Role in Firestore
      const userDocRef = doc(db, 'users', user.uid);
      const userDocSnap = await getDoc(userDocRef);

      if (!userDocSnap.exists()) {
        await signOut(auth);
        throw new Error("User record not found in database.");
      }

      const userData = userDocSnap.data();
      if (userData.role !== 'super-admin') {
        await signOut(auth);
        throw new Error("Access Denied: You do not have Super Admin privileges.");
      }

      // 3. Success - Redirect to dashboard
      navigate('/super-admin/dashboard');

    } catch (err) {
      console.error(err);
      await signOut(auth); // Ensure they are signed out on any failure
      // Clean up Firebase error messages for the UI
      let errorMessage = err.message.replace('Firebase: ', '').replace('Error ', '');
      if (err.code === 'auth/invalid-credential') {
        errorMessage = 'Invalid email or password.';
      }
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`min-h-screen flex items-center justify-center p-4 transition-colors duration-300 ${isDarkMode ? 'bg-slate-950' : 'bg-slate-50'}`}>
      <motion.div 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }} 
        className={`w-full max-w-md p-8 sm:p-10 rounded-[2rem] shadow-2xl border ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}
      >
        <div className="flex flex-col items-center mb-8">
          <div className={`p-4 rounded-full mb-4 ${isDarkMode ? 'bg-blue-500/20' : 'bg-blue-100'}`}>
            <ShieldCheck size={40} className="text-blue-500" />
          </div>
          <h1 className={`text-2xl sm:text-3xl font-black text-center ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
            Super Admin Portal
          </h1>
          <p className={`text-center font-medium mt-2 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
            Sign in to manage schools and global settings.
          </p>
        </div>

        {error && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }} 
            animate={{ opacity: 1, height: 'auto' }} 
            className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 text-sm font-bold text-center"
          >
            {error}
          </motion.div>
        )}

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className={`block font-bold mb-2 text-sm ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
              Email Address
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Mail size={18} className="text-slate-400" />
              </div>
              <input
                type="email"
                required
                disabled={loading}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`w-full pl-11 pr-4 py-3.5 rounded-xl font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                  isDarkMode ? 'bg-slate-800 border-slate-700 text-white placeholder-slate-500' : 'bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400'
                } border`}
                placeholder="admin@paperbuddy.in"
              />
            </div>
          </div>

          <div>
            <label className={`block font-bold mb-2 text-sm ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Lock size={18} className="text-slate-400" />
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                required
                disabled={loading}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`w-full pl-11 pr-12 py-3.5 rounded-xl font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                  isDarkMode ? 'bg-slate-800 border-slate-700 text-white placeholder-slate-500' : 'bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400'
                } border`}
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-blue-500 transition-colors"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full flex items-center justify-center gap-2 py-4 rounded-xl font-bold text-white transition-all transform ${
              loading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 hover:-translate-y-1 shadow-[0_8px_20px_rgba(37,99,235,0.3)]'
            }`}
          >
            {loading ? <Loader2 size={20} className="animate-spin" /> : 'Secure Login'}
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default SuperAdminLogin;