import React, { useState, useEffect, useRef } from 'react';
import { HashRouter as Router, Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Download, FileText, Cpu, Share2, CheckCircle2, Menu, X, 
  BrainCircuit, Layers, BookOpen, Linkedin, Zap, Users, School,
  Star, Quote, Calendar, CreditCard, TrendingUp, ShieldCheck,
  MessageCircle, BarChart3, Smartphone, AlertTriangle, Trash2
} from 'lucide-react';

// --- IMAGE IMPORTS ---
import appLogo from './assets/app_logo.png';
import heroImage from './assets/hero_image.png'; 
import sachinSnImg from './assets/sachin_shriniwas.png';
import shashiImg from './assets/shashikant.png';
import sachinImg from './assets/sachin.png';
import vikasImg from './assets/vikas.png';

// --- CONFIGURATION ---
const APK_DOWNLOAD_LINK = "https://github.com/Sachshri/paper-buddy-/releases/download/v1.0.0/paper_buddy.apk";
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
    name: "Sachin Shri Niwas",
    role: "Lead Backend & iOS Developer",
    bio: "Architecting the secure cloud infrastructure that powers our real-time school data synchronization.",
    color: "from-blue-500 to-cyan-500",
    image: sachinSnImg,
    linkedin: "https://www.linkedin.com/in/sachin-shri-niwas/"
  },
  {
    name: "Shashi Kant",
    role: "Backend & Android Developer",
    bio: "Building the robust Android ecosystem ensuring smooth performance across thousands of devices.",
    color: "from-green-500 to-emerald-500",
    image: shashiImg,
    linkedin: null 
  },
  {
    name: "Sachin Kumar",
    role: "UI/UX & Module Integration",
    bio: "Crafting the intuitive interfaces that make complex ERP tasks feel simple for teachers and parents.",
    color: "from-purple-500 to-pink-500",
    image: sachinImg,
    linkedin: null
  },
  {
    name: "Vikas Bamnia",
    role: "Marketing & Research",
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
    const stars = Array.from({ length: 200 }, () => ({
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
      className="fixed w-full z-50 bg-navy-900/90 backdrop-blur-md border-b border-white/10"
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
                  className="text-slate-300 hover:text-accent-cyan transition-colors px-3 py-2 rounded-md text-sm font-medium"
                >
                  {item}
                </button>
              ))}
              <Link 
                to="/privacy-policy"
                className={`transition-colors px-3 py-2 rounded-md text-sm font-medium ${location.pathname === '/privacy-policy' ? 'text-accent-cyan' : 'text-slate-300 hover:text-accent-cyan'}`}
              >
                Privacy Policy
              </Link>
              <a href={APK_DOWNLOAD_LINK} className="bg-accent-purple hover:bg-purple-600 text-white px-5 py-2 rounded-full font-semibold transition-all shadow-lg shadow-purple-500/30 inline-block hover:shadow-purple-500/50">
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
        <div className="md:hidden bg-navy-800 px-2 pt-2 pb-3 space-y-1 sm:px-3 border-b border-white/10">
           {['Home', 'Ecosystem', 'Features', 'Team'].map((item) => (
             <button key={item} onClick={() => item === 'Home' ? navigate('/') : handleNavClick(item.toLowerCase())} className="text-slate-300 block px-3 py-2 rounded-md text-base font-medium w-full text-left">
               {item}
             </button>
           ))}
           <Link to="/privacy-policy" onClick={() => setIsOpen(false)} className="text-slate-300 block px-3 py-2 rounded-md text-base font-medium w-full text-left">
               Privacy Policy
           </Link>
           <a href={APK_DOWNLOAD_LINK} className="block w-full text-center bg-accent-purple text-white px-5 py-3 mt-4 rounded-lg font-bold">
             Download App
           </a>
        </div>
      )}
    </motion.nav>
  );
};

const Footer = () => {
  const navigate = useNavigate();
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
              <li><Link to="/" className="hover:text-accent-cyan">Home</Link></li>
              <li><Link to="/privacy-policy" className="hover:text-accent-cyan">Privacy Policy</Link></li>
              <li><a href={APK_DOWNLOAD_LINK} className="hover:text-accent-cyan">Download</a></li>
            </ul>
          </div>
          <div className="lg:col-span-2">
            <h3 className="text-white font-bold mb-4">Contact</h3>
            <div className="text-sm text-slate-400 space-y-2">
               <p>{CONTACT_EMAIL}</p>
               <p>Gurugram, Haryana, India</p>
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

  // Handle scrolling when navigating back from Privacy Policy
  useEffect(() => {
    if (location.state && location.state.scrollTo) {
      const element = document.getElementById(location.state.scrollTo);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
      // Clear state to prevent scroll on refresh
      window.history.replaceState({}, document.title);
    }
  }, [location]);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      {/* HERO SECTION */}
      <section id="home" className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 min-h-screen flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div initial="hidden" animate="visible" variants={containerVariants}>
              <motion.div variants={textFadeUp} className="inline-block px-4 py-1.5 mb-6 rounded-full bg-accent-purple/20 border border-accent-purple/50 text-accent-cyan text-sm font-semibold">
                  🚀 Complete School ERP
              </motion.div>
              <motion.h1 variants={textFadeUp} className="text-5xl md:text-6xl font-extrabold text-white leading-tight mb-6">
                One Platform to Manage Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-cyan to-blue-500">Entire Institute</span>
              </motion.h1>
              <motion.p variants={textFadeUp} className="text-lg text-slate-300 mb-8 max-w-lg">
                From automated attendance and fees to AI-powered exam generation. Empower your Teachers, Students, and Admin.
              </motion.p>
              <motion.div variants={textFadeUp}>
                <a href={APK_DOWNLOAD_LINK} className="flex items-center justify-center gap-2 bg-gradient-to-r from-accent-purple to-blue-600 text-white px-8 py-4 rounded-lg font-bold text-lg hover:scale-105 transition-transform shadow-xl shadow-purple-500/20 w-fit">
                  <Download size={20} /> Get the App
                </a>
              </motion.div>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1, delay: 0.2 }}
              className="relative flex justify-center"
            >
               <div className="relative z-10">
                 <div className="absolute inset-0 bg-accent-purple/30 blur-3xl rounded-full transform scale-90"></div>
                 <img src={heroImage} alt="ERP Interface" className="relative w-full max-w-md mx-auto drop-shadow-2xl animate-float" />
               </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* STATS */}
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

      {/* COMPARISON */}
      <section className="py-24 bg-navy-800/50">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-white text-center mb-12">Why Upgrade to PaperBuddy ERP?</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-6 bg-navy-900 rounded-xl border border-white/10">
              <h3 className="text-xl font-bold text-red-400 mb-4">Fragmented Systems</h3>
              <ul className="space-y-3 text-slate-400">
                <li className="flex items-center gap-2">❌ Separate apps for attendance & fees</li>
                <li className="flex items-center gap-2">❌ Manual Excel sheets</li>
                <li className="flex items-center gap-2">❌ Hours spent typing tests</li>
              </ul>
            </div>
            <div className="p-6 bg-navy-900 rounded-xl border border-accent-cyan/30 shadow-lg shadow-accent-cyan/10">
              <h3 className="text-xl font-bold text-accent-cyan mb-4">PaperBuddy Ecosystem</h3>
              <ul className="space-y-3 text-slate-300">
                <li className="flex items-center gap-2"><span className="text-accent-cyan">✔</span> All-in-one School OS</li>
                <li className="flex items-center gap-2"><span className="text-accent-cyan">✔</span> Automated Fee Receipts & Dues</li>
                <li className="flex items-center gap-2"><span className="text-accent-cyan">✔</span> AI Paper Generator built-in</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ECOSYSTEM */}
      <section id="ecosystem" className="py-24 bg-navy-800/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">The Complete Ecosystem</h2>
            <p className="text-slate-400">Dedicated applications for every stakeholder.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {appEcosystem.map((step) => (
              <div key={step.id} className="bg-navy-900 p-8 rounded-2xl border border-white/5 hover:border-accent-purple/50 transition-colors group">
                <div className="w-14 h-14 bg-navy-800 rounded-xl flex items-center justify-center text-accent-cyan mb-6 group-hover:bg-accent-purple group-hover:text-white transition-colors">
                  {step.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
                <p className="text-slate-400 text-sm">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-32">
            {features.map((feature, idx) => (
              <motion.div key={idx} variants={cardVariants} whileHover={{ scale: 1.05 }} className="p-6 bg-gradient-to-br from-navy-800 to-navy-900 border border-white/5 rounded-xl hover:shadow-lg hover:shadow-accent-cyan/10">
                <div className="text-accent-purple mb-4">{feature.icon}</div>
                <h4 className="text-lg font-bold text-white mb-2">{feature.title}</h4>
                <p className="text-slate-400 text-sm">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* TEAM */}
      <section id="team" className="py-20 bg-navy-800/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-4">Meet The Team</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="bg-navy-900 rounded-2xl overflow-hidden border border-white/5 shadow-lg">
                <div className={`h-2 bg-gradient-to-r ${member.color}`}></div>
                <div className="p-6 flex flex-col items-center">
                  <div className={`w-28 h-28 rounded-full p-1 bg-gradient-to-br ${member.color} mb-4`}>
                     <img src={member.image} alt={member.name} className="w-full h-full object-cover rounded-full border-4 border-navy-900"/>
                  </div>
                  <h3 className="text-xl font-bold text-white text-center mb-1">{member.name}</h3>
                  <p className="text-accent-cyan text-xs font-semibold uppercase mb-4">{member.role}</p>
                  <p className="text-slate-400 text-sm text-center mb-4">{member.bio}</p>
                  {member.linkedin && <a href={member.linkedin} className="text-slate-400 hover:text-white"><Linkedin size={16} /></a>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
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
    </motion.div>
  );
};

const PrivacyPolicyPage = () => {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="pt-32 pb-20 max-w-4xl mx-auto px-6 relative z-10 min-h-screen">
        <div className="bg-navy-800/80 backdrop-blur-sm p-8 md:p-12 rounded-2xl border border-white/10 text-slate-300 shadow-2xl">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Privacy Policy</h1>
            <p className="mb-8 text-slate-400">Last updated: February 2026</p>
            
            <div className="space-y-8">
                <section>
                    <h2 className="text-xl font-bold text-white mb-3">1. Introduction</h2>
                    <p>Welcome to Paper Buddy ("we," "our," or "us"). We are committed to protecting your personal information and your right to privacy. This Privacy Policy applies to our mobile application (Paper Buddy - School ERP) and our website. By using our services, you agree to the collection and use of information in accordance with this policy.</p>
                </section>
                <section>
                    <h2 className="text-xl font-bold text-white mb-3">2. Information We Collect</h2>
                    <ul className="list-disc pl-5 space-y-2">
                        <li><strong>Personal Data:</strong> We collect personally identifiable information such as Name, Email address, Phone number, Student Roll Number, and Institute details to facilitate the ERP functions (Attendance, Fees, Results).</li>
                        <li><strong>Device Information:</strong> We may collect information about your device, including model, operating system version, and unique device identifiers to ensure app compatibility and security.</li>
                        <li><strong>Usage Data:</strong> We collect data on how the Service is accessed and used (e.g., features used, time spent) to improve user experience.</li>
                    </ul>
                </section>
                <section>
                    <h2 className="text-xl font-bold text-white mb-3">3. How We Use Your Information</h2>
                    <p>We use the collected data for the following purposes:</p>
                    <ul className="list-disc pl-5 space-y-2 mt-2">
                        <li>To provide and maintain our School ERP services.</li>
                        <li>To notify you about changes to our service or academic updates.</li>
                        <li>To allow you to participate in interactive features (Student Community, Quizzes).</li>
                        <li>To provide customer support and detect technical issues.</li>
                    </ul>
                </section>
                <section>
                    <h2 className="text-xl font-bold text-white mb-3">4. Third-Party Services</h2>
                    <p>We may employ third-party companies and services to facilitate our Service. Specifically, we use:</p>
                    <ul className="list-disc pl-5 space-y-2 mt-2">
                        <li><strong>Google Firebase:</strong> For authentication, database management, and analytics.</li>
                        <li><strong>Payment Gateways:</strong> For processing fee payments (if applicable). We do not store your complete banking details on our servers.</li>
                    </ul>
                </section>
                <section>
                    <h2 className="text-xl font-bold text-white mb-3">5. Data Security</h2>
                    <p>The security of your data is important to us. We implement industry-standard security measures to protect your personal information. However, please remember that no method of transmission over the Internet is 100% secure.</p>
                </section>
                <section>
                    <h2 className="text-xl font-bold text-white mb-3">6. Contact Us</h2>
                    <p>If you have any questions about this Privacy Policy, please contact us at:</p>
                    <p className="mt-2 text-accent-cyan font-semibold">{CONTACT_EMAIL}</p>
                </section>
            </div>
        </div>
    </motion.div>
  );
};

const AccountDeletionPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate API call or form submission here
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
            <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
            <Route path="/account-deletion" element={<AccountDeletionPage />} />
          </Routes>
        </AnimatePresence>
        <Footer />
      </div>
    </Router>
  );
}

export default App;