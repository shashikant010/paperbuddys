import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { 
  Download, FileText, Cpu, Share2, CheckCircle2, Menu, X, 
  BrainCircuit, Layers, BookOpen, Linkedin, Zap, Users, School,
  Star, Quote
} from 'lucide-react';

// --- IMAGE IMPORTS ---
// Ensure these files exist in your src/assets folder
import appLogo from './assets/app_logo.png';
import heroImage from './assets/hero_image.png';
import sachinSnImg from './assets/sachin_shriniwas.png';
import shashiImg from './assets/shashikant.png';
import sachinImg from './assets/sachin.png';
import vikasImg from './assets/vikas.png';

// --- CONFIGURATION ---
const APK_DOWNLOAD_LINK = "https://github.com/Sachshri/paper-buddy-/releases/download/v1.0.0/paper_buddy.apk";

// --- ANIMATION VARIANTS ---
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3
    }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      type: "spring",
      stiffness: 50,
      damping: 20,
      duration: 0.8 
    }
  }
};

const textFadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.8, ease: "easeOut" } 
  }
};

// --- DATA ---
const stats = [
  { id: 1, label: "Papers Generated", value: "10,000+", icon: <FileText /> },
  { id: 2, label: "Active Students", value: "5,000+", icon: <Users /> },
  { id: 3, label: "Schools & Institutes", value: "50+", icon: <School /> },
];

const teamMembers = [
  {
    name: "Sachin Shri Niwas",
    role: "Lead Backend & iOS Developer",
    bio: "Core engineering lead designing scalable backend systems and secure API architecture.",
    color: "from-blue-500 to-cyan-500",
    image: sachinSnImg,
    linkedin: "https://www.linkedin.com/in/sachin-shri-niwas/"
  },
  {
    name: "Shashi Kant",
    role: "Backend & Android Developer",
    bio: "Owner of the Android ecosystem, specializing in intelligent server-side logic.",
    color: "from-green-500 to-emerald-500",
    image: shashiImg,
    linkedin: null 
  },
  {
    name: "Sachin Kumar",
    role: "UI/UX & Module Integration",
    bio: "The creative force designing intuitive interfaces and managing seamless full-stack integration.",
    color: "from-purple-500 to-pink-500",
    image: sachinImg,
    linkedin: null
  },
  {
    name: "Vikas Bamnia",
    role: "Marketing & Research",
    bio: "Driving market presence and evolving the platform based on real-world educational needs.",
    color: "from-orange-500 to-red-500",
    image: vikasImg,
    linkedin: "https://www.linkedin.com/in/vikash-kumar-25013423a/"
  }
];

const features = [
  { title: "AI-Powered Generation", desc: "Algorithms that understand syllabus context.", icon: <BrainCircuit /> },
  { title: "Customizable Difficulty", desc: "Set logic for Easy, Medium, or Hard papers.", icon: <Layers /> },
  { title: "Instant PDF Export", desc: "Print-ready formatting in seconds.", icon: <FileText /> },
  { title: "Smart Syllabus Tracking", desc: "Avoids repeating questions from recent tests.", icon: <BookOpen /> },
];

const howItWorks = [
  { id: 1, title: "Input Data", desc: "Enter Subject, Topic, Question Count, and Standard.", icon: <FileText /> },
  { id: 2, title: "AI Processing", desc: "Our engine constructs a balanced paper instantly.", icon: <Cpu /> },
  { id: 3, title: "Export or Attempt", desc: "Download as PDF or attempt digitally in-app.", icon: <Download /> },
  { id: 4, title: "Deep Analysis", desc: "Get detailed insights and performance results.", icon: <CheckCircle2 /> },
];

const testimonials = [
  {
    name: "Dr. Anjali Sharma",
    role: "HOD Physics, DPS RK Puram",
    content: "PaperBuddy cut my exam setting time from 4 hours to 15 minutes. The question quality is surprisingly accurate to the CBSE pattern.",
    rating: 5
  },
  {
    name: "Rajesh Kumar",
    role: "Coaching Center Owner",
    content: "I manage 200 students. Generating unique practice sets for every batch was impossible until we found PaperBuddy. A game changer.",
    rating: 5
  },
  {
    name: "Priya Mehta",
    role: "TGT Science",
    content: "The variety of difficulty levels is excellent. I can make an 'Easy' paper for revision and a 'Hard' one for finals in seconds.",
    rating: 5
  },
  {
    name: "Vikram Singh",
    role: "Freelance Tutor",
    content: "The clean UI and instant PDF export are my favorite features. My students love the professional look of the papers.",
    rating: 4
  }
];

// --- SPACE BACKGROUND COMPONENT ---
const SpaceBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    const setSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    setSize();
    window.addEventListener('resize', setSize);

    const stars = [];
    const numStars = 200;

    for (let i = 0; i < numStars; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 1.5,
        speed: Math.random() * 0.5 + 0.1,
        alpha: Math.random()
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      gradient.addColorStop(0, '#0a192f');
      gradient.addColorStop(1, '#112240');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = '#ffffff';
      stars.forEach(star => {
        ctx.globalAlpha = star.alpha;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fill();

        star.y -= star.speed; 
        
        if (star.y < 0) {
          star.y = canvas.height;
          star.x = Math.random() * canvas.width;
        }
      });
      
      requestAnimationFrame(animate);
    };

    animate();

    return () => window.removeEventListener('resize', setSize);
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="absolute inset-0 w-full h-full z-0"
    />
  );
};

// --- MAIN COMPONENTS ---

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed w-full z-50 bg-navy-900/90 backdrop-blur-md border-b border-white/10"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center gap-3">
            {/* Alt text updated for SEO */}
            <img src={appLogo} alt="Paper Buddy AI Logo" className="h-10 w-10 rounded-lg object-contain" />
            <div className="text-2xl font-bold bg-gradient-to-r from-white to-accent-purple bg-clip-text text-transparent">
              Paper<span className="text-accent-purple">Buddy</span>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {['Home', 'How it Works', 'Features', 'Team', 'About'].map((item) => (
                <a key={item} href={`#${item.toLowerCase().replace(/\s/g, '')}`} className="text-slate-300 hover:text-accent-cyan transition-colors px-3 py-2 rounded-md text-sm font-medium">
                  {item}
                </a>
              ))}
              <a 
                href={APK_DOWNLOAD_LINK}
                className="bg-accent-purple hover:bg-purple-600 text-white px-5 py-2 rounded-full font-semibold transition-all shadow-lg shadow-purple-500/30 inline-block hover:shadow-purple-500/50"
              >
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
           {['Home', 'How it Works', 'Features', 'Team', 'About'].map((item) => (
             <a key={item} href={`#${item.toLowerCase().replace(/\s/g, '')}`} className="text-slate-300 block px-3 py-2 rounded-md text-base font-medium">
               {item}
             </a>
           ))}
           <a href={APK_DOWNLOAD_LINK} className="block w-full text-center bg-accent-purple text-white px-5 py-3 mt-4 rounded-lg font-bold ">
             Download App
           </a>
        </div>
      )}
    </motion.nav>
  );
};

const Hero = () => {
  return (
    <section id="home" className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden h-auto min-h-screen flex items-center scroll-mt-24">
      <SpaceBackground />
      <div className="absolute inset-0 bg-gradient-to-b from-navy-900/50 via-navy-900/10 to-navy-900 z-0"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            {/* SEO Keyword insertion: Paper Buddy */}
            <motion.h1 variants={textFadeUp} className="text-5xl md:text-6xl font-extrabold text-white leading-tight mb-6">
              Paper Buddy Generate Exam Papers in <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-cyan to-blue-500">Seconds</span>
            </motion.h1>
            <motion.p variants={textFadeUp} className="text-lg text-slate-300 mb-8 max-w-lg drop-shadow-md">
              The ultimate AI tool for teachers and coaching institutes. Simply enter the subject, and Paper Buddy handles the rest. Experience the future of assessment.
            </motion.p>
            <motion.div variants={textFadeUp} className="flex flex-col sm:flex-row gap-4">
              <a 
                href={APK_DOWNLOAD_LINK}
                className="flex items-center justify-center gap-2 bg-gradient-to-r from-accent-purple to-blue-600 text-white px-8 py-4 rounded-lg font-bold text-lg hover:scale-105 transition-transform shadow-xl shadow-purple-500/20"
              >
                <Download size={20} />
                Get the App
              </a>
            </motion.div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
            className="relative flex justify-center"
          >
             <div className="relative z-10">
               <div className="absolute inset-0 bg-accent-purple/30 blur-3xl rounded-full transform scale-90"></div>
               <img 
                 src={heroImage} 
                 /* IMPORTANT: Alt text helps Google Image Search */
                 alt="Paper Buddy Mobile App Interface showing exam generation" 
                 className="relative w-full max-w-md mx-auto drop-shadow-2xl animate-float"
               />
             </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const StatsSection = () => {
  return (
    <section className="py-10 bg-navy-800 border-y border-white/5 relative z-20 scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stats.map((stat) => (
            <motion.div 
              key={stat.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex items-center justify-center gap-4"
            >
              <div className="p-3 bg-navy-900 rounded-full text-accent-cyan border border-white/10">
                {stat.icon}
              </div>
              <div>
                <h4 className="text-3xl font-bold text-white">{stat.value}</h4>
                <p className="text-sm text-slate-400 uppercase tracking-wide">{stat.label}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Comparison = () => (
  <motion.section 
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="py-24 bg-navy-800/50"
  >
    <div className="max-w-5xl mx-auto px-6">
      <h2 className="text-3xl font-bold text-white text-center mb-12">
        Why Switch to PaperBuddy?
      </h2>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="p-6 bg-navy-900 rounded-xl border border-white/10 hover:border-red-500/30 transition-colors">
          <h3 className="text-xl font-bold text-red-400 mb-4">Traditional Method</h3>
          <ul className="space-y-3 text-slate-400">
            <li className="flex items-center gap-2">❌ Takes 1–2 hours</li>
            <li className="flex items-center gap-2">❌ Manually selecting difficulty</li>
            <li className="flex items-center gap-2">❌ Formatting issues</li>
            <li className="flex items-center gap-2">❌ Repetitive questions</li>
          </ul>
        </div>

        <div className="p-6 bg-navy-900 rounded-xl border border-accent-cyan/30 shadow-lg shadow-accent-cyan/10">
          <h3 className="text-xl font-bold text-accent-cyan mb-4">With PaperBuddy</h3>
          <ul className="space-y-3 text-slate-300">
            <li className="flex items-center gap-2"><span className="text-accent-cyan">✔</span> Generates in seconds</li>
            <li className="flex items-center gap-2"><span className="text-accent-cyan">✔</span> Balanced difficulty automatically</li>
            <li className="flex items-center gap-2"><span className="text-accent-cyan">✔</span> Clean PDF output</li>
            <li className="flex items-center gap-2"><span className="text-accent-cyan">✔</span> Smart question rotation</li>
          </ul>
        </div>
      </div>
    </div>
  </motion.section>
);

const HowToUse = () => {
  return (
    <section id="howitworks" className="py-24 bg-navy-800/30 scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">How It Works</h2>
          <p className="text-slate-400">From input to exam-ready paper in 4 simple steps.</p>
        </motion.div>
        
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {howItWorks.map((step, index) => (
            <motion.div 
              key={step.id}
              variants={cardVariants}
              whileHover={{ y: -10, transition: { duration: 0.3 } }}
              className="bg-navy-900 p-8 rounded-2xl border border-white/5 hover:border-accent-purple/50 transition-colors group relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-4 opacity-10 font-bold text-6xl text-white select-none">{step.id}</div>
              <div className="w-14 h-14 bg-navy-800 rounded-xl flex items-center justify-center text-accent-cyan mb-6 group-hover:bg-accent-purple group-hover:text-white transition-colors duration-300">
                {step.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{step.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

const AboutFeatures = () => {
  return (
    <section id="features" className="py-20 relative scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Features Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-32"
        >
          {features.map((feature, idx) => (
            <motion.div 
              key={idx} 
              variants={cardVariants}
              whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
              className="p-6 bg-gradient-to-br from-navy-800 to-navy-900 border border-white/5 rounded-xl hover:shadow-lg hover:shadow-accent-cyan/10 transition-all"
            >
              <div className="text-accent-purple mb-4">{feature.icon}</div>
              <h4 className="text-lg font-bold text-white mb-2">{feature.title}</h4>
              <p className="text-slate-400 text-sm">{feature.desc}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Detailed About Section */}
        <div id="about" className="grid lg:grid-cols-2 gap-16 items-start scroll-mt-24">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl font-bold text-white mb-6">Why We Built PaperBuddy</h2>
            <div className="space-y-6 text-slate-300 leading-relaxed">
              <p>Creating question papers is time-consuming. We built Paper Buddy to eliminate manual work and provide a reliable tool where users can instantly create well-balanced papers.</p>
              
              <div className="bg-navy-800 p-6 rounded-xl border-l-4 border-accent-cyan mt-8">
                <h3 className="text-xl font-bold text-white mb-2">Our Mission</h3>
                <p>To make assessment creation faster, smarter, and accessible for everyone.</p>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-navy-800/50 p-8 rounded-2xl border border-white/5"
          >
            <h3 className="text-2xl font-bold text-white mb-6">What Makes Us Different</h3>
            <ul className="space-y-4">
              {["Smart customization", "Speed & Efficiency", "Cross-platform", "User-centered Design"].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-slate-300">
                  <span className="text-accent-cyan"><CheckCircle2 size={18} /></span>{item}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const Team = () => {
  return (
    <section id="team" className="py-20 bg-navy-800/30 scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Meet The Team</h2>
          <p className="text-slate-400">The minds behind the magic.</p>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {teamMembers.map((member, index) => (
            <motion.div 
              key={index}
              variants={cardVariants}
              whileHover={{ y: -10, transition: { duration: 0.3 } }}
              className="bg-navy-900 rounded-2xl overflow-hidden border border-white/5 shadow-lg group flex flex-col"
            >
              <div className={`h-2 bg-gradient-to-r ${member.color}`}></div>
              <div className="p-6 flex-1 flex flex-col items-center">
                <div className={`w-28 h-28 rounded-full p-1 bg-gradient-to-br ${member.color} mb-4`}>
                   <img 
                     src={member.image} 
                     alt={member.name} 
                     className="w-full h-full object-cover rounded-full border-4 border-navy-900"
                   />
                </div>
                
                <h3 className="text-xl font-bold text-white text-center mb-1">{member.name}</h3>
                <p className="text-accent-cyan text-xs font-semibold uppercase tracking-wider text-center mb-4">{member.role}</p>
                <p className="text-slate-400 text-sm text-center leading-relaxed mb-4">
                  {member.bio}
                </p>

                <div className="flex justify-center gap-4 mt-auto pt-6 border-t border-white/5 w-full">
                   {member.linkedin ? (
                     <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded bg-navy-800 flex items-center justify-center hover:bg-[#0077b5] hover:text-white cursor-pointer transition-colors text-slate-400">
                       <Linkedin size={16} />
                     </a>
                   ) : (
                     <div className="h-8"></div> 
                   )}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

const Testimonials = () => {
  return (
    <section id="testimonials" className="py-24 bg-navy-900 relative overflow-hidden border-t border-white/5 scroll-mt-24">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 opacity-20 pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-accent-purple rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-accent-cyan rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Trusted by Educators</h2>
          <p className="text-slate-400">Join thousands of teachers transforming how they assess.</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              className="bg-navy-800/50 backdrop-blur-sm p-8 rounded-2xl border border-white/5 relative group"
            >
              <Quote className="absolute top-6 right-6 text-white/5 w-16 h-16 group-hover:text-accent-purple/20 transition-colors" />
              
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    size={16} 
                    className={i < testimonial.rating ? "text-yellow-400 fill-yellow-400" : "text-slate-600"} 
                  />
                ))}
              </div>

              <p className="text-slate-300 text-lg mb-6 italic leading-relaxed">
                "{testimonial.content}"
              </p>

              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-accent-purple to-blue-500 flex items-center justify-center font-bold text-white">
                  {testimonial.name.charAt(0)}
                </div>
                <div>
                  <h4 className="text-white font-bold">{testimonial.name}</h4>
                  <p className="text-accent-cyan text-xs uppercase tracking-wider">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Call to Action Bar */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 p-8 md:p-12 bg-gradient-to-r from-accent-purple to-blue-600 rounded-3xl text-center shadow-2xl shadow-purple-500/20 relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
          <div className="relative z-10">
            <h3 className="text-3xl font-bold text-white mb-4">Ready to modernize your exams?</h3>
            <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
              Download PaperBuddy today and generate your first AI-powered question paper in under 60 seconds.
            </p>
            <a 
              href={APK_DOWNLOAD_LINK}
              className="bg-white text-navy-900 px-8 py-4 rounded-full font-bold text-lg hover:bg-slate-100 transition-colors shadow-lg inline-flex items-center gap-2"
            >
              <Download size={20} />
              Download Now
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-navy-950 border-t border-white/10 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          <div>
            <div className="flex items-center gap-2 mb-4">
               <img src={appLogo} alt="Logo" className="w-8 h-8 rounded" />
               <h2 className="text-2xl font-bold text-white">PaperBuddy</h2>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed mb-6">
              Empowering educators and students with AI-driven assessment tools.
            </p>
            <a 
              href={APK_DOWNLOAD_LINK}
              className="bg-accent-purple hover:bg-purple-600 text-white px-6 py-3 rounded-lg flex items-center gap-2 transition-all font-semibold shadow-lg shadow-purple-500/20 w-fit"
            >
               <Download size={18} />
               Download App
            </a>
          </div>

          <div>
            <h3 className="text-white font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><a href="#home" className="hover:text-accent-cyan">Home</a></li>
              <li><a href="#about" className="hover:text-accent-cyan">About Us</a></li>
              <li><a href="#features" className="hover:text-accent-cyan">Features</a></li>
              <li><a href="#team" className="hover:text-accent-cyan">Team</a></li>
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h3 className="text-white font-bold mb-4">Contact Us</h3>
            <div className="grid sm:grid-cols-2 gap-6 text-sm text-slate-400">
              <div>
                <p className="flex items-start gap-2 mb-2">
                  <span className="text-accent-cyan mt-1"><Share2 size={16}/></span>
                  Flat/Block No. vmagerrown,<br/> 
                  Gali No. 8, Basai Enclave,<br/> 
                  Kadipur, Gurugram, Haryana - 122001
                </p>
              </div>
              <div>
                 <p className="flex items-center gap-2 mb-2"><span className="text-accent-cyan">@</span> support@paperbuddy.in</p>
                 <p className="flex items-center gap-2"><span className="text-accent-cyan">#</span> +91 97182 03533</p>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500">
          <p>© 2025 PaperBuddy Inc. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white">Privacy Policy</a>
            <a href="#" className="hover:text-white">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

function App() {
  return (
    <div className="min-h-screen bg-navy-900 selection:bg-accent-purple selection:text-white font-sans">
      <Navbar />
      <Hero />
      <StatsSection />
      <Comparison />
      <HowToUse />
      <AboutFeatures />
      <Team />
      <Testimonials />
      <Footer />
    </div>
  );
}

export default App;