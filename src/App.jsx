import React, { useState, useEffect, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';
import { 
  Download, FileText, Cpu, Share2, CheckCircle2, Menu, X, 
  BrainCircuit, Layers, BookOpen, Linkedin, Zap, Users, School,
  Star, Quote, Calendar, CreditCard, TrendingUp, ShieldCheck,
  MessageCircle, BarChart3, Smartphone, AlertTriangle, Trash2,
  Mail, MapPin, Moon, Sun, ExternalLink, QrCode, Bus, Presentation, Laptop,
  Phone, RefreshCcw, FileSignature
} from 'lucide-react';
import SuperAdminLogin from './SuperAdminLogin';
import SuperAdminDashboard from './SuperAdminDashboard';

// --- IMAGE IMPORTS ---
import appLogo from './assets/app_logo.png';
import shashiImg from './assets/shashikant.png';
import sachinImg from './assets/sachin.png';
import vikasImg from './assets/vikas.png';
import teamGroupImg from './assets/team.webp';


// --- CONFIGURATION & LINKS ---
const APK_DOWNLOAD_LINK = "https://play.google.com/store/apps/details?id=com.paperbuddy.students";
const TEACHER_APK_LINK = "https://play.google.com/store/apps/details?id=com.paperbuddy.paper_buddy_teachers&hl=en_IN";
const CONTACT_EMAIL = "support@paperbuddy.in";
const CONTACT_PHONE = "+91 97182 03533";
const CONTACT_ADDRESS = "Gurugram, Haryana, India";

// --- ANIMATION VARIANTS ---
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.1 }
  }
};

const textFadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 60, damping: 20 } }
};

// --- DATA ---
const appEcosystem = [
  { 
    id: 1, 
    title: "Admin App", 
    role: "School Management",
    desc: "A comprehensive dashboard for school overview, student strength analytics, flexible fee management, HR, and payroll. Access detailed reports and institution settings.", 
    icon: <BarChart3 size={32} />, 
    color: "from-blue-500 to-indigo-600",
    portal: "https://paperbuddy.in/app",
    download: null
  },
  { 
    id: 2, 
    title: "Teacher App", 
    role: "Academic Control",
    desc: "Manage today's classes, mark attendance, generate exams, and upload study material like PDFs and videos. Streamline communication with parents.", 
    icon: <Presentation size={32} />, 
    color: "from-fuchsia-500 to-purple-600",
    portal: "https://paperbuddy.in/app",
    download: TEACHER_APK_LINK
  },
  { 
    id: 3, 
    title: "Student App", 
    role: "Learning & Updates",
    desc: "Dashboard for attendance, fee payment history, daily homework, and exam updates. Live bus tracking with arrival and pickup alerts.", 
    icon: <Smartphone size={32} />, 
    color: "from-emerald-400 to-teal-500",
    portal: "https://students.paperbuddy.in",
    download: APK_DOWNLOAD_LINK
  },
  { 
    id: 4, 
    title: "Driver App", 
    role: "Transport Logistics",
    desc: "Driver login and vehicle assignment. Features live location sharing, automatic updates, and route history for student pickup management.", 
    icon: <Bus size={32} />, 
    color: "from-orange-400 to-red-500",
    portal: "https://paperbuddy.in/app",
    download: null
  },
  { 
    id: 5, 
    title: "Office App", 
    role: "University File Tracking",
    desc: "A hybrid file system integrating digital drafting with physical QR-code movement tracking. Every desk scans the QR when receiving or forwarding files.", 
    icon: <Laptop size={32} />, 
    color: "from-cyan-400 to-blue-500",
    portal: "https://paperbuddy.in/office",
    download: null
  },
];

const teamMembers = [
  {
    name: "Shashi Kant",
    role: "Founder & Head of Product",
    bio: "Building the robust Android ecosystem ensuring smooth performance across thousands of devices.",
    color: "from-emerald-400 to-teal-500",
    image: shashiImg,
    linkedin: null 
  },
  {
    name: "Sachin",
    role: "Co-Founder & Head of Operations",
    bio: "Crafting the intuitive interfaces that make complex ERP tasks feel simple for teachers and parents.",
    color: "from-blue-400 to-indigo-500",
    image: sachinImg,
    linkedin: null
  },
  {
    name: "Vikash Bamnia",
    role: "Co-Founder & Head of Marketing",
    bio: "Bridging the gap between technology and real-world school administrative needs.",
    color: "from-orange-400 to-red-500",
    image: vikasImg,
    linkedin: "https://www.linkedin.com/in/vikash-kumar-25013423a/"
  }
];

// --- 3D INTERACTIVE TILT CARD COMPONENT ---
const TiltCard = ({ children, className }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [15, -15]);
  const rotateY = useTransform(x, [-100, 100], [-15, 15]);

  function handleMouse(event) {
    const rect = event.currentTarget.getBoundingClientRect();
    x.set(event.clientX - rect.left - rect.width / 2);
    y.set(event.clientY - rect.top - rect.height / 2);
  }

  return (
    <motion.div
      style={{ rotateX, rotateY, perspective: 1000 }}
      onMouseMove={handleMouse}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      className={className}
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
    >
      {children}
    </motion.div>
  );
};

// --- COMPONENTS ---

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
};

const Navbar = ({ isDarkMode, toggleTheme }) => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleNavClick = (sectionId) => {
    setIsOpen(false);
    if (location.pathname !== '/') {
      navigate('/', { state: { scrollTo: sectionId } });
    } else {
      const element = document.getElementById(sectionId);
      if (element) element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.nav 
      initial={{ y: -100 }} animate={{ y: 0 }} transition={{ duration: 0.6 }}
      className={`fixed w-full z-50 backdrop-blur-xl border-b transition-colors duration-300 ${
        isDarkMode ? 'bg-slate-900/80 border-slate-800 shadow-lg shadow-black/20' : 'bg-white/80 border-slate-200 shadow-xl shadow-blue-900/5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center gap-3 cursor-pointer group" onClick={() => navigate('/')}>
            <div className="relative">
              <div className="absolute inset-0 bg-blue-500 blur-md opacity-0 group-hover:opacity-40 transition-opacity rounded-lg"></div>
              <img src={appLogo} alt="Logo" className="h-10 w-10 rounded-xl object-contain relative z-10 shadow-md" />
            </div>
            <div className={`text-2xl font-black tracking-tight ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>
              Paper<span className="text-blue-500">Buddy</span>
            </div>
          </div>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-8">
              {['Home', 'Ecosystem', 'Features'].map((item) => (
                <button 
                  key={item} 
                  onClick={() => item === 'Home' ? navigate('/') : handleNavClick(item.toLowerCase())}
                  className={`font-semibold text-sm transition-colors relative group ${
                    isDarkMode ? 'text-slate-300 hover:text-blue-400' : 'text-slate-600 hover:text-blue-600'
                  }`}
                >
                  {item}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-500 transition-all group-hover:w-full rounded-full"></span>
                </button>
              ))}
              <Link 
                to="/team"
                className={`font-semibold text-sm transition-colors ${
                  location.pathname === '/team' 
                    ? (isDarkMode ? 'text-blue-400' : 'text-blue-600') 
                    : (isDarkMode ? 'text-slate-300 hover:text-blue-400' : 'text-slate-600 hover:text-blue-600')
                }`}
              >
                Our Team
              </Link>
              
              <div className="w-px h-6 bg-slate-300 dark:bg-slate-700 mx-2"></div>
              
              <button onClick={toggleTheme} className={`p-2 rounded-full transition-colors ${
                isDarkMode ? 'bg-slate-800 text-yellow-400 hover:bg-slate-700' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}>
                {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
              </button>

              <a href={APK_DOWNLOAD_LINK} target="_blank" rel="noreferrer" 
                 className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-2xl font-bold transition-all shadow-[0_8px_20px_rgba(37,99,235,0.3)] hover:shadow-[0_12px_25px_rgba(37,99,235,0.4)] transform hover:-translate-y-1">
                Get Student App
              </a>
            </div>
          </div>

          <div className="-mr-2 flex items-center gap-4 md:hidden">
            <button onClick={toggleTheme} className={`p-2 rounded-full ${isDarkMode ? 'text-yellow-400' : 'text-slate-600'}`}>
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button onClick={() => setIsOpen(!isOpen)} className={`p-2 ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
            className={`md:hidden border-b overflow-hidden ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}
          >
             <div className="px-4 pt-2 pb-6 space-y-2">
               {['Home', 'Ecosystem', 'Features'].map((item) => (
                 <button key={item} onClick={() => item === 'Home' ? navigate('/') : handleNavClick(item.toLowerCase())} 
                   className={`block w-full text-left px-4 py-3 rounded-xl font-semibold ${
                     isDarkMode ? 'text-slate-300 hover:bg-slate-800' : 'text-slate-600 hover:bg-slate-50'
                   }`}>
                   {item}
                 </button>
               ))}
               <Link to="/team" onClick={() => setIsOpen(false)} 
                 className={`block w-full text-left px-4 py-3 rounded-xl font-semibold ${
                   isDarkMode ? 'text-slate-300 hover:bg-slate-800' : 'text-slate-600 hover:bg-slate-50'
                 }`}>
                 Our Team
               </Link>
               <div className="pt-4 pb-2 px-4 flex flex-col gap-3">
                  <a href={APK_DOWNLOAD_LINK} target="_blank" rel="noreferrer" className="text-center bg-blue-600 text-white px-6 py-3 rounded-xl font-bold">
                    Get Student App
                  </a>
                  <a href={TEACHER_APK_LINK} target="_blank" rel="noreferrer" className="text-center bg-purple-600 text-white px-6 py-3 rounded-xl font-bold">
                    Get Teacher App
                  </a>
               </div>
             </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

const Footer = ({ isDarkMode }) => (
  <footer className={`border-t py-16 transition-colors duration-300 ${isDarkMode ? 'bg-slate-950 border-slate-800 text-slate-400' : 'bg-slate-50 border-slate-200 text-slate-600'}`}>
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
        <div className="lg:col-span-1">
          <div className="flex items-center gap-2 mb-4">
             <img src={appLogo} alt="Logo" className="w-8 h-8 rounded" />
             <h2 className={`text-2xl font-black ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>PaperBuddy</h2>
          </div>
          <p className="text-sm leading-relaxed mb-6 font-medium">
            The complete, modern ecosystem designed to unify students, teachers, parents, and admins.
          </p>
        </div>
        
        <div>
          <h3 className={`font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Quick Links</h3>
          <ul className="space-y-3 text-sm font-medium">
            <li><Link to="/team" className="hover:text-blue-500 transition-colors">Our Team</Link></li>
            <li><Link to="/pricing" className="hover:text-blue-500 transition-colors">Pricing & Products</Link></li>
            <li><Link to="/account-deletion" className="hover:text-blue-500 transition-colors">Data Deletion</Link></li>
          </ul>
        </div>

        <div>
          <h3 className={`font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Legal Policies</h3>
          <ul className="space-y-3 text-sm font-medium">
            <li><Link to="/privacy" className="hover:text-blue-500 transition-colors">Privacy Policy</Link></li>
            <li><Link to="/terms" className="hover:text-blue-500 transition-colors">Terms & Conditions</Link></li>
            <li><Link to="/refunds" className="hover:text-blue-500 transition-colors">Refund & Cancellation</Link></li>
          </ul>
        </div>
        
        <div>
          <h3 className={`font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Contact Us</h3>
          <div className="text-sm space-y-3 font-medium">
             <p className="flex items-center gap-3"><Mail size={18} className="text-blue-500"/> {CONTACT_EMAIL}</p>
             <p className="flex items-center gap-3"><Phone size={18} className="text-blue-500"/> {CONTACT_PHONE}</p>
             <p className="flex items-center gap-3"><MapPin size={18} className="text-blue-500"/> {CONTACT_ADDRESS}</p>
          </div>
        </div>
      </div>
      <div className={`border-t pt-8 text-center text-sm font-semibold ${isDarkMode ? 'border-slate-800' : 'border-slate-200'}`}>
        <p>© {new Date().getFullYear()} PaperBuddy ERP. All rights reserved.</p>
      </div>
    </div>
  </footer>
);

// --- PAGES ---

const HomePage = ({ isDarkMode }) => {
  const location = useLocation();

  useEffect(() => {
    if (location.state && location.state.scrollTo) {
      const element = document.getElementById(location.state.scrollTo);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
      window.history.replaceState({}, document.title);
    }
  }, [location]);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="pt-20">
      
      {/* 3D HERO SECTION */}
      <section id="home" className="relative pt-20 pb-32 lg:pt-32 lg:pb-40 overflow-hidden">
        {/* Dynamic Background Blurs */}
        <div className={`absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full blur-[120px] pointer-events-none transition-colors duration-1000 ${isDarkMode ? 'bg-blue-600/20' : 'bg-blue-300/40'}`}></div>
        <div className={`absolute bottom-0 right-1/4 w-[600px] h-[600px] rounded-full blur-[150px] pointer-events-none transition-colors duration-1000 ${isDarkMode ? 'bg-purple-600/20' : 'bg-pink-300/40'}`}></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            
            {/* Text Content */}
            <motion.div initial="hidden" animate="visible" variants={containerVariants}>
              <motion.div variants={textFadeUp} className={`inline-flex items-center gap-2 px-4 py-2 mb-8 rounded-2xl text-sm font-bold shadow-sm border ${
                isDarkMode ? 'bg-white/5 border-white/10 text-blue-400' : 'bg-blue-50 border-blue-100 text-blue-600'
              }`}>
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-500 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500"></span>
                </span>
                The Next-Gen Unified School OS
              </motion.div>
              
              <motion.h1 variants={textFadeUp} className={`text-5xl md:text-7xl font-black leading-[1.1] mb-6 tracking-tight ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                Education, <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600">
                  Elevated.
                </span>
              </motion.h1>
              
              <motion.p variants={textFadeUp} className={`text-lg md:text-xl font-medium mb-10 max-w-lg leading-relaxed ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                A completely modern, 3D-ready ecosystem linking Students, Teachers, Admins, and Transport seamlessly. Smart tracking, digital hybrid files, and more.
              </motion.p>
              
              <motion.div variants={textFadeUp} className="flex flex-wrap gap-4">
                <a href={APK_DOWNLOAD_LINK} target="_blank" rel="noreferrer" 
                   className="flex items-center justify-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:-translate-y-1 transition-all shadow-[0_10px_30px_rgba(37,99,235,0.3)] hover:shadow-[0_15px_40px_rgba(37,99,235,0.4)]">
                  <Smartphone size={22} /> Student App
                </a>
                <a href={TEACHER_APK_LINK} target="_blank" rel="noreferrer" 
                   className={`flex items-center justify-center gap-2 px-8 py-4 rounded-2xl font-bold text-lg hover:-translate-y-1 transition-all border-2 ${
                     isDarkMode ? 'bg-slate-800 text-white border-slate-700 hover:bg-slate-700 hover:border-slate-600' : 'bg-white text-slate-800 border-slate-200 hover:border-slate-300 hover:shadow-xl'
                   }`}>
                  <Presentation size={22} /> Teacher App
                </a>
                <a href="https://paperbuddy.in/demo/index.html" target="_blank" rel="noreferrer" 
                   className={`flex items-center justify-center gap-2 px-8 py-4 rounded-2xl font-bold text-lg hover:-translate-y-1 transition-all border-2 ${
                     isDarkMode ? 'bg-transparent text-blue-400 border-blue-500/30 hover:bg-blue-500/10' : 'bg-transparent text-blue-600 border-blue-200 hover:border-blue-400 hover:bg-blue-50'
                   }`}>
                  <Layers size={22} /> View Features Details
                </a>
              </motion.div>
            </motion.div>

            {/* 3D Floating Ecosystem Illustration */}
            <motion.div initial="hidden" animate="visible" variants={containerVariants} className="relative h-[500px] w-full hidden lg:block perspective-1000">
              {/* Center App (Admin) */}
              <motion.div 
                animate={{ y: [0, -15, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-30"
              >
                <div className="w-32 h-32 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-3xl shadow-[0_20px_50px_rgba(37,99,235,0.5)] flex items-center justify-center border-t border-white/20">
                  <BarChart3 size={50} className="text-white" />
                </div>
              </motion.div>

              {/* Top Left (Teacher) */}
              <motion.div 
                animate={{ y: [0, 20, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                className="absolute top-[15%] left-[20%] z-20"
              >
                <div className="w-24 h-24 bg-gradient-to-br from-fuchsia-500 to-purple-600 rounded-3xl shadow-[0_15px_40px_rgba(192,38,211,0.4)] flex items-center justify-center border-t border-white/20">
                  <BookOpen size={40} className="text-white" />
                </div>
              </motion.div>

              {/* Bottom Right (Student) */}
              <motion.div 
                animate={{ y: [0, -25, 0] }} transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute bottom-[20%] right-[20%] z-40"
              >
                <div className="w-28 h-28 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-3xl shadow-[0_20px_40px_rgba(52,211,153,0.4)] flex items-center justify-center border-t border-white/20">
                  <Smartphone size={45} className="text-white" />
                </div>
              </motion.div>

              {/* Bottom Left (Driver) */}
              <motion.div 
                animate={{ y: [0, 15, 0] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
                className="absolute bottom-[10%] left-[25%] z-20"
              >
                <div className="w-20 h-20 bg-gradient-to-br from-orange-400 to-red-500 rounded-2xl shadow-[0_15px_30px_rgba(251,146,60,0.4)] flex items-center justify-center border-t border-white/20">
                  <Bus size={32} className="text-white" />
                </div>
              </motion.div>

              {/* Top Right (Office/University) */}
              <motion.div 
                animate={{ y: [0, -15, 0] }} transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                className="absolute top-[25%] right-[15%] z-10"
              >
                <div className="w-24 h-24 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-3xl shadow-[0_15px_30px_rgba(34,211,238,0.4)] flex items-center justify-center border-t border-white/20">
                  <Laptop size={35} className="text-white" />
                </div>
              </motion.div>
              
              {/* Connecting Lines (Decorative) */}
              <svg className="absolute inset-0 w-full h-full z-0 opacity-20 pointer-events-none" style={{ filter: isDarkMode ? 'invert(1)' : 'none' }}>
                <line x1="50%" y1="50%" x2="25%" y2="25%" stroke="currentColor" strokeWidth="2" strokeDasharray="5,5" />
                <line x1="50%" y1="50%" x2="75%" y2="75%" stroke="currentColor" strokeWidth="2" strokeDasharray="5,5" />
                <line x1="50%" y1="50%" x2="30%" y2="80%" stroke="currentColor" strokeWidth="2" strokeDasharray="5,5" />
                <line x1="50%" y1="50%" x2="80%" y2="35%" stroke="currentColor" strokeWidth="2" strokeDasharray="5,5" />
              </svg>
            </motion.div>

          </div>
        </div>
      </section>

      {/* MULTI-APP ECOSYSTEM SHOWCASE */}
      <section id="ecosystem" className={`py-24 relative ${isDarkMode ? 'bg-slate-900/50' : 'bg-slate-50'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className={`text-4xl md:text-5xl font-black mb-6 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>The 5-Star Ecosystem</h2>
            <p className={`text-lg font-medium max-w-2xl mx-auto ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
              Access specific tools tailored for every role within the institution. Click the portals below to manage your operations securely.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {appEcosystem.map((app, idx) => (
              <TiltCard key={app.id} className={`p-8 rounded-[2rem] border transition-all duration-300 flex flex-col h-full ${
                isDarkMode ? 'bg-slate-800/80 border-slate-700 shadow-xl' : 'bg-white border-slate-200 shadow-[0_20px_50px_rgba(0,0,0,0.05)]'
              }`}>
                <div className={`w-20 h-20 rounded-3xl bg-gradient-to-br ${app.color} flex items-center justify-center text-white mb-8 shadow-lg transform -translate-y-4`}>
                  {app.icon}
                </div>
                <h3 className={`text-2xl font-black mb-2 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{app.title}</h3>
                <p className={`text-sm font-bold uppercase tracking-wider mb-4 bg-clip-text text-transparent bg-gradient-to-r ${app.color}`}>
                  {app.role}
                </p>
                <p className={`text-base font-medium leading-relaxed mb-8 flex-grow ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                  {app.desc}
                </p>
                
                <div className="space-y-3 mt-auto">
                  {app.portal && (
                    <a href={app.portal} target="_blank" rel="noreferrer" 
                       className={`flex items-center justify-center gap-2 w-full py-3.5 rounded-xl font-bold transition-all ${
                         isDarkMode ? 'bg-slate-900 text-white hover:bg-black' : 'bg-slate-100 text-slate-800 hover:bg-slate-200'
                       }`}>
                      Web Portal <ExternalLink size={18} />
                    </a>
                  )}
                  {app.download && (
                    <a href={app.download} target="_blank" rel="noreferrer" 
                       className={`flex items-center justify-center gap-2 w-full py-3.5 rounded-xl font-bold transition-all text-white bg-gradient-to-r ${app.color} hover:opacity-90 shadow-lg`}>
                      <Download size={18} /> Download App
                    </a>
                  )}
                </div>
              </TiltCard>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURE HIGHLIGHT: HYBRID FILE SYSTEM (OFFICE APP) */}
      <section id="features" className="py-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`rounded-[3rem] p-10 md:p-16 relative overflow-hidden ${
            isDarkMode ? 'bg-gradient-to-br from-blue-900 to-slate-900' : 'bg-gradient-to-br from-blue-50 to-indigo-50'
          }`}>
            {/* Background 3D elements */}
            <QrCode className="absolute -bottom-10 -right-10 w-96 h-96 opacity-10 text-blue-500" />
            
            <div className="grid lg:grid-cols-2 gap-16 relative z-10 items-center">
              <div>
                <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-xl bg-blue-500/10 text-blue-500 font-bold text-sm">
                  <Star size={16} className="fill-current" /> Exclusive Office Feature
                </div>
                <h2 className={`text-4xl md:text-5xl font-black mb-6 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                  Hybrid File Tracking System
                </h2>
                <p className={`text-lg font-medium mb-8 leading-relaxed ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                  The most important module for universities. We preserve your existing paper workflow while adding complete digital visibility.
                </p>
                
                <ul className="space-y-6">
                  {[
                    { title: "Digital File Drafting", desc: "Clerks create files digitally. University letterhead and reference numbers are automatically generated.", icon: <FileText /> },
                    { title: "Instant QR Generation", desc: "A unique QR code is applied. Print the cover page and movement sheet immediately.", icon: <QrCode /> },
                    { title: "Physical Movement Tracking", desc: "Every desk scans the QR when receiving or forwarding the physical file.", icon: <Share2 /> }
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-4">
                      <div className="p-3 rounded-xl bg-blue-500 text-white shadow-lg">{item.icon}</div>
                      <div>
                        <h4 className={`text-xl font-bold mb-1 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{item.title}</h4>
                        <p className={`font-medium ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>{item.desc}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="relative">
                <TiltCard className={`rounded-[2rem] p-8 border shadow-2xl relative ${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}`}>
                   <div className="flex items-center justify-between border-b pb-4 mb-6 border-slate-200 dark:border-slate-700">
                     <h3 className={`font-black text-xl ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>File #UNI-2026-89A</h3>
                     <span className="px-3 py-1 bg-green-500/20 text-green-600 dark:text-green-400 rounded-lg text-sm font-bold">Approved</span>
                   </div>
                   <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-300 dark:before:via-slate-700 before:to-transparent">
                     {/* Timeline steps */}
                     {['Initiated by Clerk', 'Scanned at Dept Head', 'Approved by VC'].map((step, i) => (
                       <div key={i} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                          <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white dark:border-slate-800 bg-blue-500 text-white shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow">
                            <CheckCircle2 size={16} />
                          </div>
                          <div className={`w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-xl border shadow-sm ${isDarkMode ? 'bg-slate-900 border-slate-700 text-slate-300' : 'bg-slate-50 border-slate-100 text-slate-600'}`}>
                            <div className="font-bold">{step}</div>
                            <div className="text-xs opacity-70 mt-1">{new Date().toLocaleTimeString()}</div>
                          </div>
                       </div>
                     ))}
                   </div>
                </TiltCard>
              </div>
            </div>
          </div>
        </div>
      </section>

    </motion.div>
  );
};

// --- DEDICATED TEAM PAGE ---
const TeamPage = ({ isDarkMode }) => {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="pt-32 pb-24 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-20">
          <h1 className={`text-5xl md:text-6xl font-black mb-6 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
            Meet The Founders
          </h1>
          <p className={`text-xl font-medium max-w-2xl mx-auto ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
            The engineering and business minds behind the unified education ecosystem.
          </p>
        </div>

        {/* Group Photo Showcase */}
        <div className="flex justify-center mb-24 relative perspective-1000">
           <TiltCard className={`p-3 rounded-[3rem] shadow-2xl border ${isDarkMode ? 'bg-slate-800/50 border-slate-700' : 'bg-white border-slate-200'}`}>
             <img src={teamGroupImg} alt="PaperBuddy Founders" className="max-w-4xl w-full rounded-[2.5rem] object-cover" />
           </TiltCard>
        </div>

        {/* Individual Cards */}
        <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">
          {teamMembers.map((member, index) => (
            <motion.div 
              key={index} 
              whileHover={{ y: -10 }}
              className={`rounded-[2rem] overflow-hidden border shadow-xl flex flex-col ${
                isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'
              }`}
            >
              <div className={`h-3 w-full bg-gradient-to-r ${member.color}`}></div>
              <div className="p-8 flex flex-col items-center flex-grow text-center">
                <div className={`w-36 h-36 rounded-[2rem] p-1 bg-gradient-to-br ${member.color} mb-6 shadow-lg rotate-3 hover:rotate-0 transition-transform duration-300`}>
                   <img src={member.image} alt={member.name} className={`w-full h-full object-cover rounded-[1.8rem] border-4 ${isDarkMode ? 'border-slate-800' : 'border-white'}`}/>
                </div>
                <h3 className={`text-2xl font-black mb-1 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{member.name}</h3>
                <p className={`text-sm font-bold uppercase tracking-wider mb-4 bg-clip-text text-transparent bg-gradient-to-r ${member.color}`}>
                  {member.role}
                </p>
                <p className={`font-medium mb-8 leading-relaxed flex-grow ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                  {member.bio}
                </p>
                {member.linkedin && (
                  <a href={member.linkedin} target="_blank" rel="noreferrer" 
                     className={`p-3 rounded-xl transition-all shadow-sm ${
                       isDarkMode ? 'bg-slate-900 text-blue-400 hover:bg-blue-600 hover:text-white' : 'bg-slate-100 text-blue-600 hover:bg-blue-600 hover:text-white'
                     }`}>
                    <Linkedin size={20} />
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </motion.div>
  );
};

// --- LEGAL POLICIES PAGES ---

const PrivacyPolicyPage = ({ isDarkMode }) => {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  return (
    <div className={`min-h-screen ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
      <section className={`pt-32 pb-16 text-center border-b ${isDarkMode ? 'border-slate-800 bg-slate-900/80' : 'border-slate-200 bg-slate-50'}`}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl mx-auto px-6">
          <div className="flex justify-center mb-4">
            <ShieldCheck className="text-blue-500" size={40} />
          </div>
          <h1 className={`text-4xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
            Privacy Policy
          </h1>
          <p className="font-semibold opacity-70">
            Effective Date: 1 March 2026
          </p>
        </motion.div>
      </section>

      <section className="py-16">
        <div className="max-w-4xl mx-auto px-6 space-y-10 leading-relaxed font-medium">
          <div>
            <p>
              PaperBuddy ERP ("we", "our", or "us") operates the PaperBuddy School ERP
              applications for Students, Teachers, Administrators, and Parents.
              We are committed to protecting your privacy and ensuring transparency
              in how we collect, use, and safeguard your data.
            </p>
          </div>

          <div>
            <h2 className={`text-2xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>1. Information We Collect</h2>
            <h3 className={`font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>Personal Information</h3>
            <ul className="list-disc list-inside space-y-1">
              <li>Name</li>
              <li>Email address</li>
              <li>Phone number</li>
              <li>Profile photo (optional)</li>
              <li>School and class details</li>
            </ul>
            <h3 className={`font-semibold mt-4 mb-2 ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>Academic Data</h3>
            <ul className="list-disc list-inside space-y-1">
              <li>Attendance records</li>
              <li>Marks and results</li>
              <li>Assignments and submissions</li>
              <li>Performance analytics</li>
            </ul>
            <h3 className={`font-semibold mt-4 mb-2 ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>Device & Usage Data</h3>
            <ul className="list-disc list-inside space-y-1">
              <li>Device type and OS version</li>
              <li>App usage logs</li>
              <li>Crash reports for performance improvement</li>
            </ul>
          </div>

          <div>
            <h2 className={`text-2xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>2. App Permissions & Usage</h2>
            <p className="mb-4">
              To provide core ERP functionalities, the PaperBuddy app requests the following device permissions. We strictly use these permissions for the stated purposes:
            </p>
            <div className="space-y-4">
              <div>
                <h3 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>Location & Background Location Services</h3>
                <p className="text-sm opacity-70 font-mono mb-1">
                  (ACCESS_FINE_LOCATION, ACCESS_COARSE_LOCATION, ACCESS_BACKGROUND_LOCATION, FOREGROUND_SERVICE, FOREGROUND_SERVICE_LOCATION)
                </p>
                <p>We require access to your device's precise and coarse location, including tracking location in the background via foreground services. This is utilized exclusively for:</p>
                <ul className="list-disc list-inside space-y-1 mt-2">
                  <li><strong>Location-Based Attendance:</strong> To verify that staff or students are within the designated school geofence when marking attendance.</li>
                  <li><strong>Driver Location Tracking:</strong> To provide parents and administrators with real-time school bus tracking. <em>Note: Driver location is continuously tracked in the background even when the app is closed or not in use to ensure student safety during transit.</em></li>
                </ul>
              </div>
              <div>
                <h3 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>Storage Access</h3>
                <p className="text-sm opacity-70 font-mono mb-1">(READ_EXTERNAL_STORAGE, WRITE_EXTERNAL_STORAGE)</p>
                <p>Used to read and write files to your device. This allows users to upload profile photos, submit homework assignments, and download study materials, report cards, and fee receipts.</p>
              </div>
              <div>
                <h3 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>Internet & Network Access</h3>
                <p className="text-sm opacity-70 font-mono mb-1">(INTERNET)</p>
                <p>Essential for the application to communicate with our secure cloud servers, allowing real-time synchronization of attendance, results, messages, and overall app functionality.</p>
              </div>
              <div>
                <h3 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>Push Notifications</h3>
                <p className="text-sm opacity-70 font-mono mb-1">(POST_NOTIFICATIONS)</p>
                <p>Required to send real-time alerts and updates regarding student attendance, fee reminders, new assignments, and critical school announcements.</p>
              </div>
              <div>
                <h3 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>Device Wake Lock</h3>
                <p className="text-sm opacity-70 font-mono mb-1">(WAKE_LOCK)</p>
                <p>Used temporarily to prevent the device processor from sleeping during critical background tasks, ensuring uninterrupted live location updates for school buses and stable downloads for large educational files.</p>
              </div>
            </div>
          </div>

          <div>
            <h2 className={`text-2xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>3. How We Use Your Information</h2>
            <ul className="list-disc list-inside space-y-1">
              <li>Provide and maintain ERP services</li>
              <li>Manage attendance, results, and academic records</li>
              <li>Enable communication between schools and users</li>
              <li>Improve app performance and user experience</li>
              <li>Provide customer support</li>
              <li>Ensure security and prevent misuse</li>
            </ul>
          </div>

          <div>
            <h2 className={`text-2xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>4. Data Sharing & Disclosure</h2>
            <p>We do <strong>not sell personal data</strong>. Data may be shared only with:</p>
            <ul className="list-disc list-inside space-y-1 mt-2">
              <li>Authorized school administrators and teachers</li>
              <li>Service providers for hosting and analytics (under confidentiality)</li>
              <li>Legal authorities if required by law</li>
            </ul>
          </div>

          <div>
            <h2 className={`text-2xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>5. Data Security</h2>
            <p>We implement industry-standard security measures including:</p>
            <ul className="list-disc list-inside space-y-1 mt-2">
              <li>Encrypted data transmission (HTTPS)</li>
              <li>Secure cloud storage</li>
              <li>Role-based access control</li>
              <li>Regular security monitoring</li>
            </ul>
          </div>

          <div>
            <h2 className={`text-2xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>6. Data Retention</h2>
            <p>We retain user data only as long as necessary to provide services or comply with legal obligations. Schools control student record retention policies.</p>
          </div>

          <div>
            <h2 className={`text-2xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>7. Children's Privacy</h2>
            <p>PaperBuddy ERP is designed for educational institutions and may be used by students under 18. Data is collected only through schools and managed by authorized administrators.</p>
          </div>

          <div>
            <h2 className={`text-2xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>8. Your Rights</h2>
            <ul className="list-disc list-inside space-y-1">
              <li>Access your data</li>
              <li>Request corrections</li>
              <li>Request deletion through your school or via our Data Deletion page</li>
              <li>Withdraw consent where applicable</li>
            </ul>
          </div>

          <div>
            <h2 className={`text-2xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>9. Third-Party Services</h2>
            <p>We may use trusted third-party services such as cloud hosting and analytics providers. These services follow strict data protection standards.</p>
          </div>

          <div>
            <h2 className={`text-2xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>10. Changes to This Policy</h2>
            <p>We may update this Privacy Policy from time to time. Updates will be posted on this page with a revised effective date.</p>
          </div>

          <div>
            <h2 className={`text-2xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>11. Contact Us</h2>
            <p>If you have questions about this Privacy Policy:</p>
            <ul className="list-none mt-2 space-y-1">
              <li>Email: {CONTACT_EMAIL}</li>
              <li>Phone: {CONTACT_PHONE}</li>
              <li>Location: {CONTACT_ADDRESS}</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
};

const TermsConditionsPage = ({ isDarkMode }) => {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  return (
    <div className={`min-h-screen pt-32 pb-24 ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
      <div className="max-w-4xl mx-auto px-6">
        <div className="flex justify-center mb-6">
          <div className="p-4 rounded-2xl bg-purple-500/10 text-purple-500">
            <FileSignature size={48} />
          </div>
        </div>
        <h1 className={`text-4xl md:text-5xl font-black text-center mb-4 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
          Terms & Conditions
        </h1>
        <p className="text-center font-bold mb-12">Last Updated: March 2026</p>
        
        <div className={`space-y-10 p-10 rounded-[2rem] border ${isDarkMode ? 'bg-slate-800/50 border-slate-700' : 'bg-white border-slate-200 shadow-xl'}`}>
          <div>
            <h2 className={`text-2xl font-black mb-4 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>1. Acceptance of Terms</h2>
            <p className="font-medium">By accessing or using the PaperBuddy ERP platform (including applications and websites), you agree to comply with and be bound by these Terms & Conditions.</p>
          </div>
          <div>
            <h2 className={`text-2xl font-black mb-4 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>2. Use of the Services</h2>
            <p className="font-medium">PaperBuddy provides ERP solutions designed to facilitate school management. You agree to use these services only for lawful educational and administrative purposes.</p>
          </div>
          <div>
            <h2 className={`text-2xl font-black mb-4 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>3. User Accounts</h2>
            <p className="font-medium">Users are responsible for maintaining the confidentiality of their login credentials. Any activity occurring under your account is your responsibility.</p>
          </div>
          <div>
            <h2 className={`text-2xl font-black mb-4 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>4. Intellectual Property</h2>
            <p className="font-medium">All content, features, and functionality on the platform—including software, designs, and text—are owned by PaperBuddy ERP and are protected by copyright and intellectual property laws.</p>
          </div>
          <div>
            <h2 className={`text-2xl font-black mb-4 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>5. Limitation of Liability</h2>
            <p className="font-medium">PaperBuddy ERP shall not be liable for any indirect, incidental, or consequential damages resulting from the use or inability to use our platform.</p>
          </div>
          <div>
            <h2 className={`text-2xl font-black mb-4 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>6. Governing Law</h2>
            <p className="font-medium">These terms shall be governed by and construed in accordance with the laws of Haryana, India. Any disputes will be subject to the exclusive jurisdiction of the courts in Gurugram.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const RefundsCancellationsPage = ({ isDarkMode }) => {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  return (
    <div className={`min-h-screen pt-32 pb-24 ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
      <div className="max-w-4xl mx-auto px-6">
        <div className="flex justify-center mb-6">
          <div className="p-4 rounded-2xl bg-orange-500/10 text-orange-500">
            <RefreshCcw size={48} />
          </div>
        </div>
        <h1 className={`text-4xl md:text-5xl font-black text-center mb-4 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
          Refunds & Cancellations
        </h1>
        <p className="text-center font-bold mb-12">Policy effective for all subscription plans.</p>
        
        <div className={`space-y-10 p-10 rounded-[2rem] border ${isDarkMode ? 'bg-slate-800/50 border-slate-700' : 'bg-white border-slate-200 shadow-xl'}`}>
          <div>
            <h2 className={`text-2xl font-black mb-4 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Cancellation Policy</h2>
            <p className="font-medium mb-4">Administrators or designated school representatives can cancel their institutional subscription to PaperBuddy ERP at any time by contacting support.</p>
            <ul className="list-disc list-inside space-y-2 font-medium">
              <li>Cancellations will take effect at the end of the current billing cycle.</li>
              <li>Account data will be retained for 30 days post-cancellation to allow for data export before final deletion.</li>
            </ul>
          </div>
          <div>
            <h2 className={`text-2xl font-black mb-4 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Refund Policy</h2>
            <p className="font-medium mb-4">We strive to ensure complete satisfaction. If you are unsatisfied with our ERP solution, the following refund rules apply:</p>
            <ul className="list-disc list-inside space-y-2 font-medium">
              <li><strong>Initial Subscriptions:</strong> Refund requests made within the first 7 days of the initial purchase will be granted a full refund.</li>
              <li><strong>Renewals:</strong> We do not offer refunds for monthly/annual renewals once the billing cycle has started.</li>
              <li><strong>Processing:</strong> Approved refunds will be processed in Indian Rupees (INR) and credited back to the original payment method within 5-7 business days.</li>
            </ul>
          </div>
          <div>
            <p className="font-medium mt-6 pt-6 border-t border-slate-200 dark:border-slate-700">
              For any cancellation or refund requests, please email us directly at <strong>{CONTACT_EMAIL}</strong> or call us at <strong>{CONTACT_PHONE}</strong>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const PricingProductsPage = ({ isDarkMode }) => {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  return (
    <div className={`min-h-screen pt-32 pb-24 ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
      <div className="max-w-4xl mx-auto px-6">
        <div className="flex justify-center mb-6">
          <div className="p-4 rounded-2xl bg-green-500/10 text-green-500">
            <CreditCard size={48} />
          </div>
        </div>
        <h1 className={`text-4xl md:text-5xl font-black text-center mb-4 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
          Pricing & Products
        </h1>
        <p className="text-center font-bold mb-12">Clear and transparent pricing for educational institutions.</p>
        
        <div className={`p-10 rounded-[2rem] border ${isDarkMode ? 'bg-slate-800/50 border-slate-700' : 'bg-white border-slate-200 shadow-xl'}`}>
          
          <div className="mb-12">
             <h2 className={`text-3xl font-black mb-4 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Our Services (The Ecosystem)</h2>
             <p className="font-medium mb-6">PaperBuddy provides a complete suite of interconnected applications designed to manage all aspects of school or university administration.</p>
             <div className="grid md:grid-cols-2 gap-4 font-medium">
               <div className={`p-4 rounded-xl border ${isDarkMode ? 'bg-slate-900 border-slate-700' : 'bg-slate-50 border-slate-200'}`}>✔️ Admin / Dashboard Portal</div>
               <div className={`p-4 rounded-xl border ${isDarkMode ? 'bg-slate-900 border-slate-700' : 'bg-slate-50 border-slate-200'}`}>✔️ Teacher Android App</div>
               <div className={`p-4 rounded-xl border ${isDarkMode ? 'bg-slate-900 border-slate-700' : 'bg-slate-50 border-slate-200'}`}>✔️ Student Android App</div>
               <div className={`p-4 rounded-xl border ${isDarkMode ? 'bg-slate-900 border-slate-700' : 'bg-slate-50 border-slate-200'}`}>✔️ Driver / Transport App</div>
               <div className={`p-4 rounded-xl border ${isDarkMode ? 'bg-slate-900 border-slate-700' : 'bg-slate-50 border-slate-200'}`}>✔️ Office / Hybrid File System</div>
             </div>
          </div>

          <div className={`text-center p-10 rounded-[2rem] bg-gradient-to-br ${isDarkMode ? 'from-blue-900 to-slate-900 border border-slate-700' : 'from-blue-50 to-indigo-50 border border-blue-100'}`}>
            <h3 className={`text-2xl font-black mb-2 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Standard Plan</h3>
            <p className="font-medium mb-6 opacity-80">Access to all 5 products included.</p>
            <div className="text-5xl font-black text-blue-600 dark:text-blue-400 mb-2">
              ₹10 INR
            </div>
            <p className="font-bold text-lg mb-8">10 rs per students / month</p>
            <p className="text-sm font-medium opacity-70">
              Pricing is stated exclusively in Indian Rupees (INR). Fees are calculated based on active student strength recorded in the Admin Dashboard.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

const AccountDeletionPage = ({ isDarkMode }) => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="min-h-screen pt-32 pb-24 flex items-center justify-center px-4">
      <TiltCard className={`max-w-md w-full p-10 rounded-[2rem] border shadow-2xl relative overflow-hidden ${
        isDarkMode ? 'bg-slate-800 border-red-900/50' : 'bg-white border-red-100'
      }`}>
        <div className="absolute top-0 left-0 w-full h-2 bg-red-500"></div>
        <div className="flex items-center gap-4 mb-6">
          <div className="p-3 bg-red-500/10 rounded-2xl text-red-500">
            <AlertTriangle size={32} />
          </div>
          <h1 className={`text-3xl font-black ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Delete Account</h1>
        </div>
        
        <p className={`mb-8 font-medium ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
          Warning: Deleting your account is permanent. All saved data, files, and history will be erased.
        </p>

        {isSubmitted ? (
          <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="bg-green-500/10 border border-green-500/30 p-6 rounded-2xl text-center">
            <CheckCircle2 className="mx-auto text-green-500 mb-3" size={40} />
            <h3 className="text-green-600 dark:text-green-400 font-bold text-lg mb-2">Request Received</h3>
            <p className="font-medium text-slate-600 dark:text-slate-300">Your deletion request is being processed. It will complete in 7 days.</p>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className={`block font-bold mb-2 ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>Registered Email</label>
              <input 
                type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
                className={`w-full border rounded-xl px-5 py-4 font-medium focus:outline-none focus:ring-2 focus:ring-red-500 transition-all ${
                  isDarkMode ? 'bg-slate-900 border-slate-700 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                }`}
                placeholder="Enter your email"
              />
            </div>
            <button type="submit" className="w-full flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white px-5 py-4 rounded-xl font-bold text-lg transition-all transform hover:-translate-y-1 shadow-lg shadow-red-600/30">
              <Trash2 size={20} /> Request Deletion
            </button>
          </form>
        )}
      </TiltCard>
    </motion.div>
  );
};

// --- MAIN APP COMPONENT ---
function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Set default theme to light (white modern UI) but allow toggle
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      document.body.style.backgroundColor = '#020617'; // slate-950
    } else {
      document.documentElement.classList.remove('dark');
      document.body.style.backgroundColor = '#f8fafc'; // slate-50
    }
  }, [isDarkMode]);

  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  return (
    <Router>
      <div className={`min-h-screen font-sans selection:bg-blue-500 selection:text-white transition-colors duration-300 ${isDarkMode ? 'dark text-slate-200' : 'text-slate-800'}`}>
        <ScrollToTop />
        <Navbar isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<HomePage isDarkMode={isDarkMode} />} />
            <Route path="/team" element={<TeamPage isDarkMode={isDarkMode} />} />
            <Route path="/privacy" element={<PrivacyPolicyPage isDarkMode={isDarkMode} />} />
            <Route path="/terms" element={<TermsConditionsPage isDarkMode={isDarkMode} />} />
            <Route path="/refunds" element={<RefundsCancellationsPage isDarkMode={isDarkMode} />} />
            <Route path="/pricing" element={<PricingProductsPage isDarkMode={isDarkMode} />} />
            <Route path="/account-deletion" element={<AccountDeletionPage isDarkMode={isDarkMode} />} />
            <Route path="/super-admin" element={<SuperAdminLogin isDarkMode={isDarkMode} />} />
            <Route 
  path="/super-admin/dashboard" 
  element={<SuperAdminDashboard isDarkMode={isDarkMode} />} 
/>
          </Routes>
        </AnimatePresence>
        <Footer isDarkMode={isDarkMode} />
      </div>
    </Router>
  );
}

export default App;