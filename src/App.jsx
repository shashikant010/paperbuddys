import React, { useState, useEffect, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Download, FileText, Cpu, Share2, CheckCircle2, Menu, X, 
  BrainCircuit, Layers, BookOpen, Linkedin, Zap, Users, School,
  Star, Quote, Calendar, CreditCard, TrendingUp, ShieldCheck,
  MessageCircle, BarChart3, Smartphone, AlertTriangle, Trash2,
  Mail, MapPin
} from 'lucide-react';

// --- IMAGE IMPORTS ---
import appLogo from './assets/app_logo.png';
import heroImage from './assets/hero_image.png'; 
import shashiImg from './assets/shashikant.png';
import sachinImg from './assets/sachin.png';
import vikasImg from './assets/vikas.png';
import teamGroupImg from './assets/team.webp';

// --- CONFIGURATION ---
const APK_DOWNLOAD_LINK = "https://play.google.com/store/apps/details?id=com.paperbuddy.students";
const CONTACT_EMAIL = "support@paperbuddy.in";

// --- ANIMATION VARIANTS ---
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2, delayChildren: 0.3 }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, y: 0, 
    transition: { type: "spring", stiffness: 50, damping: 20, duration: 0.8 }
  }
};

const textFadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

// --- DATA ---
const stats = [
  { id: 1, label: "Students Managed", value: "15,000+", icon: <Users /> },
  { id: 2, label: "Daily Activities", value: "50,000+", icon: <Zap /> },
  { id: 3, label: "Partner Institutes", value: "100+", icon: <School /> },
];

const features = [
  { title: "Smart Attendance", desc: "Automated tracking for students & staff with instant parent alerts.", icon: <CheckCircle2 /> },
  { title: "Fee Management", desc: "Track payments, dues, and generate digital receipts seamlessly.", icon: <CreditCard /> },
  { title: "LMS & Study Material", desc: "Upload notes, assignments, and video lectures for easy access.", icon: <BookOpen /> },
  { title: "Performance Analysis", desc: "Detailed graphical reports on student results and growth.", icon: <TrendingUp /> },
  { title: "Exam Generator", desc: "Our core AI engine to create question papers in seconds.", icon: <BrainCircuit /> },
  { title: "Student Community", desc: "A dedicated space for peer learning and doubt solving.", icon: <MessageCircle /> },
  { title: "Timetable & Tasks", desc: "Dynamic scheduling and daily task management for teachers.", icon: <Calendar /> },
  { title: "Daily Quizzes", desc: "Gamified daily assessments to keep students engaged.", icon: <Layers /> },
];

const appEcosystem = [
  { id: 1, title: "Admin Control", desc: "Manage fees, admissions, staff, and get a bird's-eye view of your institute.", icon: <BarChart3 /> },
  { id: 2, title: "Teacher App", desc: "Mark attendance, upload assignments, and generate papers on the go.", icon: <Cpu /> },
  { id: 3, title: "Student App", desc: "Access results, pay fees, attempt quizzes, and join the community.", icon: <Smartphone /> },
  { id: 4, title: "Parent Connect", desc: "Real-time updates on attendance, marks, and important notices.", icon: <Share2 /> },
];

const teamMembers = [
  {
    name: "Shashi Kant",
    role: "Founder & Head of Product",
    bio: "Building the robust Android ecosystem ensuring smooth performance across thousands of devices.",
    color: "from-green-500 to-emerald-500",
    image: shashiImg,
    linkedin: null 
  },
  {
    name: "Sachin",
    role: "Co-Founder & Head of Operations",
    bio: "Crafting the intuitive interfaces that make complex ERP tasks feel simple for teachers and parents.",
    color: "from-blue-500 to-cyan-500",
    image: sachinImg,
    linkedin: null
  },
  {
    name: "Vikash Kumar",
    role: "Co-Founder & Head of Marketing",
    bio: "Bridging the gap between technology and real-world school administrative needs.",
    color: "from-orange-500 to-red-500",
    image: vikasImg,
    linkedin: "https://www.linkedin.com/in/vikash-kumar-25013423a/"
  }
];

const testimonials = [
  {
    name: "Ramesh Gupta",
    role: "Principal, St. Xavier's",
    content: "PaperBuddy transformed how we manage our school. From fees to attendance, everything is now digital and transparent.",
    rating: 5
  },
  {
    name: "Suman Verma",
    role: "Senior Coordinator",
    content: "The Exam Generator is still my favorite feature, but the new Assignment management module has saved us hours of paperwork.",
    rating: 5
  },
  {
    name: "Amit Singh",
    role: "Coaching Owner",
    content: "Managing 500+ students was a nightmare. PaperBuddy's Admin app gives me total control over fees and student performance.",
    rating: 5
  },
  {
    name: "Priya Das",
    role: "Parent",
    content: "I love getting instant notifications about my child's attendance and test results. It keeps me connected to their progress.",
    rating: 4
  }
];

// --- SPACE BACKGROUND COMPONENT ---
const SpaceBackground = () => {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const setSize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    setSize();
    window.addEventListener('resize', setSize);
    const stars = Array.from({ length: 120 }, () => ({
      x: Math.random() * canvas.width, y: Math.random() * canvas.height,
      radius: Math.random() * 1.5, speed: Math.random() * 0.5 + 0.1, alpha: Math.random()
    }));
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      gradient.addColorStop(0, '#0a192f'); gradient.addColorStop(1, '#112240');
      ctx.fillStyle = gradient; ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#ffffff';
      stars.forEach(star => {
        ctx.globalAlpha = star.alpha;
        ctx.beginPath(); ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2); ctx.fill();
        star.y -= star.speed;
        if (star.y < 0) { star.y = canvas.height; star.x = Math.random() * canvas.width; }
      });
      requestAnimationFrame(animate);
    };
    animate();
    return () => window.removeEventListener('resize', setSize);
  }, []);
  return <canvas ref={canvasRef} className="fixed inset-0 w-full h-full z-0 pointer-events-none" />;
};

// --- COMPONENTS ---

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const Navbar = () => {
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
      className="fixed w-full z-50 bg-navy-900/80 backdrop-blur-lg border-b border-white/10 shadow-lg shadow-black/20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate('/')}>
            <img src={appLogo} alt="Logo" className="h-10 w-10 rounded-lg object-contain" />
            <div className="text-2xl font-bold bg-gradient-to-r from-white to-accent-purple bg-clip-text text-transparent">
              Paper<span className="text-accent-purple">Buddy</span>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {['Home', 'Ecosystem', 'Features', 'Team'].map((item) => (
                <button 
                  key={item} 
                  onClick={() => item === 'Home' ? navigate('/') : handleNavClick(item.toLowerCase())}
                  className="text-slate-300 hover:text-accent-cyan transition-colors px-3 py-2 rounded-md text-sm font-medium relative group"
                >
                  {item}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent-cyan transition-all group-hover:w-full"></span>
                </button>
              ))}
              <Link 
                to="/privacy"
                className={`transition-colors px-3 py-2 rounded-md text-sm font-medium ${location.pathname === '/privacy-policy' ? 'text-accent-cyan' : 'text-slate-300 hover:text-accent-cyan'}`}
              >
                Privacy Policy
              </Link>
              <a href={APK_DOWNLOAD_LINK} target="_blank" rel="noreferrer" className="bg-gradient-to-r from-accent-purple to-blue-600 hover:from-purple-600 hover:to-blue-700 text-white px-6 py-2.5 rounded-full font-semibold transition-all shadow-[0_0_20px_rgba(168,85,247,0.4)] hover:shadow-[0_0_30px_rgba(168,85,247,0.6)] inline-block transform hover:-translate-y-0.5">
                Download App
              </a>
            </div>
          </div>
          <div className="-mr-2 flex md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-white p-2">
              {isOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden bg-navy-800 px-2 pt-2 pb-3 space-y-1 sm:px-3 border-b border-white/10 shadow-2xl">
           {['Home', 'Ecosystem', 'Features', 'Team'].map((item) => (
             <button key={item} onClick={() => item === 'Home' ? navigate('/') : handleNavClick(item.toLowerCase())} className="text-slate-300 block px-3 py-2 rounded-md text-base font-medium w-full text-left hover:bg-white/5">
               {item}
             </button>
           ))}
           <Link to="/privacy-policy" onClick={() => setIsOpen(false)} className="text-slate-300 block px-3 py-2 rounded-md text-base font-medium w-full text-left hover:bg-white/5">
               Privacy Policy
           </Link>
           <a href={APK_DOWNLOAD_LINK} target="_blank" rel="noreferrer" className="block w-full text-center bg-gradient-to-r from-accent-purple to-blue-600 text-white px-5 py-3 mt-4 rounded-lg font-bold">
             Download App
           </a>
        </div>
      )}
    </motion.nav>
  );
};

const Footer = () => {
  return (
    <footer className="bg-navy-950 border-t border-white/10 pt-16 pb-8 relative z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-4">
               <img src={appLogo} alt="Logo" className="w-8 h-8 rounded" />
               <h2 className="text-2xl font-bold text-white">PaperBuddy</h2>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed mb-6">
              Empowering educators with a unified, AI-driven school management platform.
            </p>
          </div>
          <div>
            <h3 className="text-white font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><Link to="/" className="hover:text-accent-cyan transition-colors">Home</Link></li>
              <li><Link to="/privacy-policy" className="hover:text-accent-cyan transition-colors">Privacy Policy</Link></li>
              <li><a href={APK_DOWNLOAD_LINK} target="_blank" rel="noreferrer" className="hover:text-accent-cyan transition-colors">Download App</a></li>
            </ul>
          </div>
          <div className="lg:col-span-2">
            <h3 className="text-white font-bold mb-4">Contact</h3>
            <div className="text-sm text-slate-400 space-y-2">
               <p className="flex items-center gap-2"><Mail size={16}/> {CONTACT_EMAIL}</p>
               <p className="flex items-center gap-2"><MapPin size={16}/> Gurugram, Haryana, India</p>
            </div>
          </div>
        </div>
        <div className="border-t border-white/10 pt-8 text-center text-xs text-slate-500">
          <p>© 2026 PaperBuddy Inc. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

// --- PAGES ---

const HomePage = () => {
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
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      {/* HERO SECTION */}
      <section id="home" className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 min-h-screen flex items-center overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-1/4 left-10 w-72 h-72 bg-accent-purple/20 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-blue-500/20 rounded-full blur-[120px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div initial="hidden" animate="visible" variants={containerVariants}>
              <motion.div variants={textFadeUp} className="inline-flex items-center gap-2 px-4 py-2 mb-8 rounded-full bg-white/5 border border-white/10 text-accent-cyan text-sm font-semibold shadow-[0_0_15px_rgba(34,211,238,0.15)] backdrop-blur-sm">
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-cyan opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-accent-cyan"></span>
                  </span>
                  Complete School ERP is Live
              </motion.div>
              <motion.h1 variants={textFadeUp} className="text-5xl md:text-6xl font-extrabold text-white leading-tight mb-6">
                One Platform to Manage Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-cyan to-blue-500">Entire Institute</span>
              </motion.h1>
              <motion.p variants={textFadeUp} className="text-lg text-slate-300 mb-10 max-w-lg leading-relaxed">
                From automated attendance and fee collection to AI-powered exam generation. Empower your Teachers, Students, and Admin in one unified ecosystem.
              </motion.p>
              <motion.div variants={textFadeUp} className="flex flex-wrap gap-4">
                <a href={APK_DOWNLOAD_LINK} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 bg-gradient-to-r from-accent-purple to-blue-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:scale-105 transition-all shadow-[0_0_30px_rgba(168,85,247,0.3)] w-fit">
                  <Download size={20} /> Download for Android
                </a>
              </motion.div>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1, delay: 0.2 }}
              className="relative flex justify-center lg:justify-end"
            >
               <div className="relative z-10 w-full max-w-md">
                 <div className="absolute inset-0 bg-gradient-to-tr from-accent-purple/30 to-blue-500/30 rounded-full blur-[80px] transform scale-110"></div>
                 <img src={heroImage} alt="ERP Interface" className="relative w-full mx-auto drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)] animate-float" />
               </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* STATS - Hidden for now */}
      {false && (
        <section className="py-10 bg-navy-800 border-y border-white/5 relative z-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8">
            {stats.map((stat) => (
              <motion.div key={stat.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="flex items-center justify-center gap-4">
                <div className="p-3 bg-navy-900 rounded-full text-accent-cyan border border-white/10">{stat.icon}</div>
                <div>
                  <h4 className="text-3xl font-bold text-white">{stat.value}</h4>
                  <p className="text-sm text-slate-400 uppercase tracking-wide">{stat.label}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      )}

      {/* COMPARISON - Added subtle gradient background */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-navy-900 via-navy-800 to-navy-900 pointer-events-none"></div>
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400 mb-4">Why Upgrade to PaperBuddy?</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-accent-cyan to-blue-500 mx-auto rounded-full"></div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Old Way Card */}
            <div className="p-8 bg-black/20 backdrop-blur-md rounded-2xl border border-red-500/20 relative group hover:border-red-500/40 transition-colors">
              <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/5 rounded-bl-full pointer-events-none"></div>
              <h3 className="text-2xl font-bold text-red-400 mb-6 flex items-center gap-3">
                <span className="p-2 bg-red-500/10 rounded-lg"><AlertTriangle size={24} /></span>
                The Old Way
              </h3>
              <ul className="space-y-5 text-slate-400">
                <li className="flex items-start gap-3">
                  <X className="text-red-500 shrink-0 mt-0.5" size={20}/>
                  <span>Juggling separate, disconnected apps for attendance, fees, and results.</span>
                </li>
                <li className="flex items-start gap-3">
                  <X className="text-red-500 shrink-0 mt-0.5" size={20}/>
                  <span>Endless hours spent manually updating Excel sheets.</span>
                </li>
                <li className="flex items-start gap-3">
                  <X className="text-red-500 shrink-0 mt-0.5" size={20}/>
                  <span>Typing out question papers and assignments by hand.</span>
                </li>
              </ul>
            </div>

            {/* PaperBuddy Way Card */}
            <div className="p-8 bg-gradient-to-br from-navy-800 to-navy-900 rounded-2xl border border-accent-cyan/30 shadow-[0_0_30px_rgba(34,211,238,0.1)] relative overflow-hidden transform md:scale-105">
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-accent-cyan/10 rounded-full blur-2xl pointer-events-none"></div>
              <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-accent-purple/10 rounded-full blur-2xl pointer-events-none"></div>
              
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3 relative z-10">
                <span className="p-2 bg-gradient-to-r from-accent-cyan to-blue-500 text-white rounded-lg shadow-lg"><CheckCircle2 size={24} /></span>
                The PaperBuddy Way
              </h3>
              <ul className="space-y-5 text-slate-300 relative z-10">
                <li className="flex items-start gap-3 font-medium">
                  <div className="mt-1 w-5 h-5 rounded-full bg-accent-cyan/20 flex items-center justify-center shrink-0">
                    <div className="w-2 h-2 rounded-full bg-accent-cyan"></div>
                  </div>
                  <span>One unified School OS connecting admins, teachers, and parents.</span>
                </li>
                <li className="flex items-start gap-3 font-medium">
                  <div className="mt-1 w-5 h-5 rounded-full bg-blue-500/20 flex items-center justify-center shrink-0">
                    <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                  </div>
                  <span>Automated fee receipts, due reminders, and detailed financial reports.</span>
                </li>
                <li className="flex items-start gap-3 font-medium">
                  <div className="mt-1 w-5 h-5 rounded-full bg-accent-purple/20 flex items-center justify-center shrink-0">
                    <div className="w-2 h-2 rounded-full bg-accent-purple"></div>
                  </div>
                  <span>Built-in AI engine generates standard exam papers in seconds.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ECOSYSTEM - Added subtle glowing background blobs */}
      <section id="ecosystem" className="py-24 relative border-t border-white/5">
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-accent-purple/50 to-transparent"></div>
        <div className="absolute left-0 top-1/2 w-96 h-96 bg-accent-purple/10 rounded-full blur-[100px] -translate-y-1/2 pointer-events-none"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">The Complete Ecosystem</h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">Four dedicated applications working seamlessly together in real-time.</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {appEcosystem.map((step) => (
              <div key={step.id} className="bg-white/[0.02] backdrop-blur-sm p-8 rounded-2xl border border-white/10 hover:border-accent-cyan/50 hover:bg-white/[0.04] transition-all duration-300 group hover:-translate-y-2 hover:shadow-[0_10px_30px_rgba(34,211,238,0.1)]">
                <div className="w-16 h-16 bg-gradient-to-br from-navy-800 to-navy-900 rounded-xl flex items-center justify-center text-accent-cyan mb-6 group-hover:scale-110 group-hover:text-white group-hover:from-accent-cyan group-hover:to-blue-600 transition-all duration-300 shadow-inner border border-white/5">
                  {step.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES - Made cards more "glassmorphic" */}
      <section id="features" className="py-24 relative">
        <div className="absolute right-0 top-1/4 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[120px] pointer-events-none"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Powerful Features</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-accent-purple mx-auto rounded-full"></div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            {features.map((feature, idx) => (
              <motion.div key={idx} variants={cardVariants} whileHover={{ scale: 1.03 }} className="p-6 bg-gradient-to-b from-white/[0.05] to-transparent backdrop-blur-md border border-white/10 rounded-xl hover:border-accent-purple/50 transition-all group">
                <div className="text-accent-purple mb-5 p-3 bg-accent-purple/10 w-fit rounded-lg group-hover:bg-accent-purple group-hover:text-white transition-colors">
                  {feature.icon}
                </div>
                <h4 className="text-lg font-bold text-white mb-2">{feature.title}</h4>
                <p className="text-slate-400 text-sm leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* TEAM - Enhanced background and image display */}
      <section id="team" className="py-24 relative border-t border-white/5 overflow-hidden">
        <div className="absolute inset-0 bg-navy-950 pointer-events-none"></div>
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent-cyan/10 rounded-full blur-[100px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400 mb-4 tracking-tight">Meet The Founders</h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">The engineering and business minds behind the unified education ecosystem.</p>
          </div>

          {/* Group Image Integration - Enhanced framing */}
          <div className="flex justify-center mb-24 relative">
             <div className="absolute inset-0 bg-gradient-to-r from-accent-purple to-accent-cyan blur-[60px] opacity-20 transform scale-90"></div>
             <div className="relative p-1.5 bg-gradient-to-br from-white/20 to-white/5 rounded-[2rem] shadow-2xl backdrop-blur-sm border border-white/10">
               <img src={teamGroupImg} alt="PaperBuddy Founders" className="max-w-3xl w-full rounded-[1.75rem] border-8 border-navy-900 object-cover" />
             </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto relative">
            {teamMembers.map((member, index) => (
              <div key={index} className="bg-navy-900/80 backdrop-blur-lg rounded-2xl overflow-hidden border border-white/10 shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group">
                <div className={`h-1.5 w-full bg-gradient-to-r ${member.color}`}></div>
                <div className="p-8 flex flex-col items-center relative">
                  <div className={`w-32 h-32 rounded-full p-1 bg-gradient-to-br ${member.color} mb-6 shadow-lg group-hover:scale-105 transition-transform`}>
                     <img src={member.image} alt={member.name} className="w-full h-full object-cover rounded-full border-4 border-navy-900"/>
                  </div>
                  <h3 className="text-2xl font-bold text-white text-center mb-1">{member.name}</h3>
                  <p className="text-accent-cyan text-sm font-bold uppercase tracking-wider mb-4 text-center">{member.role}</p>
                  <p className="text-slate-400 text-sm text-center mb-6 leading-relaxed flex-grow">{member.bio}</p>
                  {member.linkedin && (
                    <a href={member.linkedin} target="_blank" rel="noreferrer" className="p-2 bg-white/5 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-colors">
                      <Linkedin size={18} />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS - Hidden for now */}
      {false && (
        <section className="py-24 bg-navy-900 border-t border-white/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-white mb-4">Trusted by Institutes</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              {testimonials.map((t, i) => (
                <div key={i} className="bg-navy-800/50 p-8 rounded-2xl border border-white/5 relative">
                  <Quote className="absolute top-6 right-6 text-white/5 w-16 h-16" />
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, idx) => <Star key={idx} size={16} className={idx < t.rating ? "text-yellow-400 fill-yellow-400" : "text-slate-600"} />)}
                  </div>
                  <p className="text-slate-300 text-lg mb-6 italic">"{t.content}"</p>
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-accent-purple to-blue-500 flex items-center justify-center font-bold text-white">{t.name.charAt(0)}</div>
                    <div><h4 className="text-white font-bold">{t.name}</h4><p className="text-accent-cyan text-xs uppercase">{t.role}</p></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </motion.div>
  );
};

const PrivacyPolicyPage = () => {
  return (
    <div className="min-h-screen bg-navy-900 text-slate-300">
      
      {/* HEADER */}
      <section className="pt-32 pb-16 text-center border-b border-white/10 bg-navy-900/80">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto px-6"
        >
          <div className="flex justify-center mb-4">
            <ShieldCheck className="text-accent-cyan" size={40} />
          </div>
          <h1 className="text-4xl font-bold text-white mb-4">
            Privacy Policy
          </h1>
          <p className="text-slate-400">
            Effective Date: 1 March 2026
          </p>
        </motion.div>
      </section>

      {/* CONTENT */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-6 space-y-10 leading-relaxed">

          {/* INTRO */}
          <div>
            <p>
              PaperBuddy ERP ("we", "our", or "us") operates the PaperBuddy School ERP
              applications for Students, Teachers, Administrators, and Parents.
              We are committed to protecting your privacy and ensuring transparency
              in how we collect, use, and safeguard your data.
            </p>
          </div>

          {/* INFO WE COLLECT */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-4">
              1. Information We Collect
            </h2>

            <h3 className="text-white font-semibold mb-2">Personal Information</h3>
            <ul className="list-disc list-inside space-y-1">
              <li>Name</li>
              <li>Email address</li>
              <li>Phone number</li>
              <li>Profile photo (optional)</li>
              <li>School and class details</li>
            </ul>

            <h3 className="text-white font-semibold mt-4 mb-2">Academic Data</h3>
            <ul className="list-disc list-inside space-y-1">
              <li>Attendance records</li>
              <li>Marks and results</li>
              <li>Assignments and submissions</li>
              <li>Performance analytics</li>
            </ul>

            <h3 className="text-white font-semibold mt-4 mb-2">Device & Usage Data</h3>
            <ul className="list-disc list-inside space-y-1">
              <li>Device type and OS version</li>
              <li>App usage logs</li>
              <li>Crash reports for performance improvement</li>
            </ul>
          </div>

          {/* APP PERMISSIONS */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-4">
              2. App Permissions & Usage
            </h2>
            <p className="mb-4">
              To provide core ERP functionalities, the PaperBuddy app requests the following device permissions. We strictly use these permissions for the stated purposes:
            </p>
            <div className="space-y-4">
              <div>
                <h3 className="text-white font-semibold">Location & Background Location Services</h3>
                <p className="text-sm text-slate-400 font-mono mb-1">
                  (ACCESS_FINE_LOCATION, ACCESS_COARSE_LOCATION, ACCESS_BACKGROUND_LOCATION, FOREGROUND_SERVICE, FOREGROUND_SERVICE_LOCATION)
                </p>
                <p>
                  We require access to your device's precise and coarse location, including tracking location in the background via foreground services. This is utilized exclusively for:
                </p>
                <ul className="list-disc list-inside space-y-1 mt-2">
                  <li><strong>Location-Based Attendance:</strong> To verify that staff or students are within the designated school geofence when marking attendance.</li>
                  <li><strong>Driver Location Tracking:</strong> To provide parents and administrators with real-time school bus tracking. <em>Note: Driver location is continuously tracked in the background even when the app is closed or not in use to ensure student safety during transit.</em></li>
                </ul>
              </div>

              <div>
                <h3 className="text-white font-semibold">Storage Access</h3>
                <p className="text-sm text-slate-400 font-mono mb-1">
                  (READ_EXTERNAL_STORAGE, WRITE_EXTERNAL_STORAGE)
                </p>
                <p>
                  Used to read and write files to your device. This allows users to upload profile photos, submit homework assignments, and download study materials, report cards, and fee receipts.
                </p>
              </div>

              <div>
                <h3 className="text-white font-semibold">Internet & Network Access</h3>
                <p className="text-sm text-slate-400 font-mono mb-1">
                  (INTERNET)
                </p>
                <p>
                  Essential for the application to communicate with our secure cloud servers, allowing real-time synchronization of attendance, results, messages, and overall app functionality.
                </p>
              </div>

              <div>
                <h3 className="text-white font-semibold">Push Notifications</h3>
                <p className="text-sm text-slate-400 font-mono mb-1">
                  (POST_NOTIFICATIONS)
                </p>
                <p>
                  Required to send real-time alerts and updates regarding student attendance, fee reminders, new assignments, and critical school announcements.
                </p>
              </div>

              <div>
                <h3 className="text-white font-semibold">Device Wake Lock</h3>
                <p className="text-sm text-slate-400 font-mono mb-1">
                  (WAKE_LOCK)
                </p>
                <p>
                  Used temporarily to prevent the device processor from sleeping during critical background tasks, ensuring uninterrupted live location updates for school buses and stable downloads for large educational files.
                </p>
              </div>
            </div>
          </div>

          {/* HOW WE USE */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-4">
              3. How We Use Your Information
            </h2>
            <ul className="list-disc list-inside space-y-1">
              <li>Provide and maintain ERP services</li>
              <li>Manage attendance, results, and academic records</li>
              <li>Enable communication between schools and users</li>
              <li>Improve app performance and user experience</li>
              <li>Provide customer support</li>
              <li>Ensure security and prevent misuse</li>
            </ul>
          </div>

          {/* DATA SHARING */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-4">
              4. Data Sharing & Disclosure
            </h2>
            <p>
              We do <strong>not sell personal data</strong>. Data may be shared only with:
            </p>
            <ul className="list-disc list-inside space-y-1 mt-2">
              <li>Authorized school administrators and teachers</li>
              <li>Service providers for hosting and analytics (under confidentiality)</li>
              <li>Legal authorities if required by law</li>
            </ul>
          </div>

          {/* DATA SECURITY */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-4">
              5. Data Security
            </h2>
            <p>
              We implement industry-standard security measures including:
            </p>
            <ul className="list-disc list-inside space-y-1 mt-2">
              <li>Encrypted data transmission (HTTPS)</li>
              <li>Secure cloud storage</li>
              <li>Role-based access control</li>
              <li>Regular security monitoring</li>
            </ul>
          </div>

          {/* DATA RETENTION */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-4">
              6. Data Retention
            </h2>
            <p>
              We retain user data only as long as necessary to provide services
              or comply with legal obligations. Schools control student record
              retention policies.
            </p>
          </div>

          {/* CHILDREN PRIVACY */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-4">
              7. Children's Privacy
            </h2>
            <p>
              PaperBuddy ERP is designed for educational institutions and may be
              used by students under 18. Data is collected only through schools
              and managed by authorized administrators.
            </p>
          </div>

          {/* USER RIGHTS */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-4">
              8. Your Rights
            </h2>
            <ul className="list-disc list-inside space-y-1">
              <li>Access your data</li>
              <li>Request corrections</li>
              <li>Request deletion through your school</li>
              <li>Withdraw consent where applicable</li>
            </ul>
          </div>

          {/* THIRD PARTY */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-4">
              9. Third-Party Services
            </h2>
            <p>
              We may use trusted third-party services such as cloud hosting and
              analytics providers. These services follow strict data protection
              standards.
            </p>
          </div>

          {/* POLICY CHANGES */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-4">
              10. Changes to This Policy
            </h2>
            <p>
              We may update this Privacy Policy from time to time. Updates will
              be posted on this page with a revised effective date.
            </p>
          </div>

          {/* CONTACT */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-4">
              11. Contact Us
            </h2>
            <p>If you have questions about this Privacy Policy:</p>
            <ul className="list-none mt-2 space-y-1">
              <li>Email: support@paperbuddy.in</li>
              <li>Phone: +91 97182 03533</li>
              <li>Location: Gurugram, Haryana, India</li>
            </ul>
          </div>

        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/10 py-6 text-center text-slate-500 text-sm">
        © 2026 PaperBuddy ERP. All rights reserved.
      </footer>
    </div>
  );
};
const AccountDeletionPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    setUsername('');
    setPassword('');
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="pt-32 pb-20 max-w-md mx-auto px-6 relative z-10 min-h-screen flex flex-col justify-center">
      <div className="bg-navy-800/90 backdrop-blur-sm p-8 rounded-2xl border border-red-500/20 shadow-2xl shadow-red-900/10">
        
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-red-500/10 rounded-full text-red-500">
            <AlertTriangle size={24} />
          </div>
          <h1 className="text-2xl font-bold text-white">Delete Account</h1>
        </div>
        
        <p className="mb-8 text-sm text-slate-400">
          Warning: Deleting your account is a permanent action. All your saved data, attendance records, and history will be permanently erased.
        </p>

        {isSubmitted ? (
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-green-500/10 border border-green-500/30 p-4 rounded-xl text-center">
            <CheckCircle2 className="mx-auto text-green-500 mb-2" size={32} />
            <h3 className="text-green-400 font-bold mb-1">Request Received</h3>
            <p className="text-sm text-slate-300">Your account deletion request has been submitted. It will be processed within 7 business days.</p>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1.5">Username or Email</label>
              <input 
                type="text" 
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-navy-900 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all placeholder:text-slate-600"
                placeholder="Enter your registered email"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1.5">Password</label>
              <input 
                type="password" 
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-navy-900 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all placeholder:text-slate-600"
                placeholder="Confirm your password"
              />
            </div>

            <button 
              type="submit" 
              className="w-full flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-3 mt-2 rounded-lg font-bold transition-all shadow-lg shadow-red-600/20 active:scale-95"
            >
              <Trash2 size={18} />
              Request Deletion
            </button>
          </form>
        )}
      </div>
    </motion.div>
  );
};

// --- MAIN APP COMPONENT ---

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-navy-900 selection:bg-accent-purple selection:text-white font-sans text-slate-200">
        <ScrollToTop />
        <SpaceBackground />
        <Navbar />
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/privacy" element={<PrivacyPolicyPage />} />
            <Route path="/account-deletion" element={<AccountDeletionPage />} />
          </Routes>
        </AnimatePresence>
        <Footer />
      </div>
    </Router>
  );
}

export default App;