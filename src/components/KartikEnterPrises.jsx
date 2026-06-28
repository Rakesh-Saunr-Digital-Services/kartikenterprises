import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence, animate, useInView } from 'framer-motion';
import { 
  Menu, X, Phone, Mail, MapPin, ChevronRight, Star, 
  Settings, Wrench, Zap, Droplets, Wind, Cpu, 
  Award, Users, Briefcase, GraduationCap, ArrowRight,
  CheckCircle2, PlayCircle, ChevronDown, MessageSquare
} from 'lucide-react';

// --- DATA MOCKS ---

const COURSES = [
  { id: 1, title: 'AC Repairing Masterclass', duration: '3 Months', fees: '₹15,000', icon: Wind, img: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&q=80&w=800' },
  { id: 2, title: 'Refrigerator Repair', duration: '2 Months', fees: '₹12,000', icon: Droplets, img: 'https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?auto=format&fit=crop&q=80&w=800' },
  { id: 3, title: 'Washing Machine Tech', duration: '2 Months', fees: '₹10,000', icon: Settings, img: 'https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?auto=format&fit=crop&q=80&w=800' },
  { id: 4, title: 'Microwave & Appliances', duration: '1.5 Months', fees: '₹8,000', icon: Zap, img: 'https://images.unsplash.com/photo-1574269909862-7e1d70bb8078?auto=format&fit=crop&q=80&w=800' },
  { id: 5, title: 'RO Water Purifier', duration: '1 Month', fees: '₹6,000', icon: Droplets, img: 'https://images.unsplash.com/photo-1585771761921-22e3792c23bc?auto=format&fit=crop&q=80&w=800' },
  { id: 6, title: 'Advanced PCB Repair', duration: '4 Months', fees: '₹25,000', icon: Cpu, img: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800' },
];

const FEATURES = [
  { title: 'Experienced Trainers', desc: 'Learn from industry veterans with 15+ years experience.', icon: Users },
  { title: '100% Practical Labs', desc: 'Hands-on training with modern, real-world equipment.', icon: Wrench },
  { title: 'Placement Assistance', desc: 'Dedicated cell for interviews with top companies.', icon: Briefcase },
  { title: 'Govt. Recognized', desc: 'Valid certification to boost your career globally.', icon: Award },
];

const FAQS = [
  { q: "What is the minimum qualification required?", a: "Most of our courses require a minimum of 10th or 12th pass. However, dedication to learn is the primary requirement." },
  { q: "Do you provide placement guarantee?", a: "We provide 100% placement assistance. We have tie-ups with 50+ service centers and corporate brands that regularly hire our students." },
  { q: "Are the classes available in Hindi/English?", a: "Yes, our instructors teach in a mix of Hindi and English to ensure every student understands the practical concepts perfectly." },
  { q: "Do you provide hostel facility?", a: "Yes, we can assist outstation students in finding affordable PG and hostel accommodations near the institute." }
];

const TESTIMONIALS = [
  { name: 'Rahul Sharma', role: 'AC Technician at LG', text: 'The practical training at Kartik Enterprises changed my life. I got placed immediately after completing my 3-month AC repair course.', img: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=200' },
  { name: 'Amit Kumar', role: 'Self Employed', text: 'The PCB repair course is top-notch. The trainers explain complex electronics very simply. I now run my own successful repair shop.', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200' },
  { name: 'Vikas Singh', role: 'Service Engineer', text: 'Best institute in the city for appliance repair. The infrastructure and tools provided during training are exactly what we use in the field.', img: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=200' },
];

// --- REUSABLE COMPONENTS ---

const FadeIn = ({ children, delay = 0, className = "" }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 0.7, delay, ease: "easeOut" }}
    className={className}
  >
    {children}
  </motion.div>
);

const SectionHeading = ({ title, subtitle, light = false }) => (
  <div className="text-center mb-16">
    <motion.h2 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`text-3xl md:text-5xl font-bold mb-4 ${light ? 'text-white' : 'text-[#0B1F4D]'}`}
    >
      {title}
    </motion.h2>
    <motion.div 
      initial={{ width: 0 }}
      whileInView={{ width: '80px' }}
      viewport={{ once: true }}
      className="h-1 bg-[#F8B400] mx-auto mb-6 rounded-full"
    />
    <motion.p 
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ delay: 0.2 }}
      className={`max-w-2xl mx-auto text-lg ${light ? 'text-gray-300' : 'text-gray-600'}`}
    >
      {subtitle}
    </motion.p>
  </div>
);

const AnimatedNumber = ({ value, suffix = "", prefix = "", decimals = 0 }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (inView) {
      const controls = animate(0, value, {
        duration: 2.5,
        ease: "easeOut",
        onUpdate(v) {
          if (ref.current) {
            let formatted = decimals > 0 
              ? v.toFixed(decimals) 
              : Math.round(v).toLocaleString('en-IN');
            ref.current.textContent = `${prefix}${formatted}${suffix}`;
          }
        },
      });
      return () => controls.stop();
    }
  }, [value, inView, prefix, suffix, decimals]);

  return <span ref={ref}>{prefix}0{suffix}</span>;
};

// --- MAIN APP COMPONENT ---

export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeFaq, setActiveFaq] = useState(0);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="font-sans text-gray-800 bg-slate-50 selection:bg-[#F8B400] selection:text-[#0B1F4D]">
      
      {/* NAVBAR */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled || mobileMenuOpen ? 'bg-white/90 backdrop-blur-md shadow-sm border-b border-gray-100 py-3' : 'bg-transparent py-5'}`}>
        <div className="container mx-auto px-4 md:px-8 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#0B1F4D] to-blue-800 flex items-center justify-center shadow-lg">
              <Wrench className="text-[#F8B400] w-6 h-6" />
            </div>
            <span className={`font-bold text-xl md:text-2xl tracking-tight ${isScrolled || mobileMenuOpen ? 'text-[#0B1F4D]' : 'text-white'}`}>
              Kartik <span className="text-[#F8B400]">Enterprises</span>
            </span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-8">
            {['Home', 'About', 'Courses', 'Placement', 'Gallery', 'Contact'].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} className={`relative group font-medium transition-colors ${isScrolled || mobileMenuOpen ? 'text-[#0B1F4D] hover:text-[#F8B400]' : 'text-gray-100 hover:text-white'}`}>
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#F8B400] transition-all duration-300 group-hover:w-full"></span>
              </a>
            ))}
            <button className="bg-[#F8B400] text-[#0B1F4D] px-6 py-2.5 rounded-full font-bold hover:bg-yellow-400 hover:shadow-lg hover:shadow-yellow-500/30 transition-all transform hover:-translate-y-0.5">
              Apply Now
            </button>
          </div>

          {/* Mobile Toggle */}
          <button 
            className="lg:hidden relative z-50 p-2 rounded-full bg-black/5 hover:bg-black/10 transition-colors" 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} className="text-[#0B1F4D]" /> : <Menu size={24} className={isScrolled ? 'text-[#0B1F4D]' : 'text-white'} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: "-100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "-100%" }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-40 bg-white pt-24 px-6 pb-8 lg:hidden flex flex-col justify-between overflow-y-auto"
          >
            <div className="flex flex-col gap-2 mt-4">
              {['Home', 'About', 'Courses', 'Placement', 'Gallery', 'Contact'].map((item, index) => (
                <motion.a 
                  key={item} 
                  href={`#${item.toLowerCase()}`} 
                  onClick={() => setMobileMenuOpen(false)} 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + (index * 0.05), duration: 0.3 }}
                  className="text-3xl font-bold text-[#0B1F4D] py-4 border-b border-gray-100 hover:text-[#F8B400] hover:pl-4 transition-all"
                >
                  {item}
                </motion.a>
              ))}
            </div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mt-8 space-y-4"
            >
              <div className="flex items-center gap-4 text-gray-600 mb-6">
                <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-[#0B1F4D]">
                  <Phone size={18} />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider">Call Us</p>
                  <p className="font-bold text-[#0B1F4D]">+91 98765 43210</p>
                </div>
              </div>
              <button className="w-full bg-[#F8B400] text-[#0B1F4D] px-8 py-4 rounded-xl font-bold text-lg shadow-lg shadow-yellow-500/20 active:scale-95 transition-transform">
                Apply Now
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* HERO SECTION */}
      <section id="home" className="relative min-h-screen flex items-center pt-20 overflow-hidden">
        {/* Background Image & Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&q=80&w=2070" 
            alt="Technical Training" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0B1F4D]/95 via-[#0B1F4D]/80 to-transparent"></div>
        </div>

        <div className="container mx-auto px-4 md:px-8 relative z-10 grid lg:grid-cols-2 gap-12 items-center mt-10">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-white"
          >
            <span className="inline-block py-1 px-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[#F8B400] font-medium mb-6">
              #1 Repairing Institute in India
            </span>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6">
              Build Your Career With <span className="text-[#F8B400]">Professional</span> Repair Training
            </h1>
            <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-lg leading-relaxed">
              100% Practical Training • Government Recognized Certificate • Assured Placement Assistance
            </p>
            
            <div className="flex flex-wrap gap-4">
              <button className="bg-[#F8B400] text-[#0B1F4D] px-8 py-4 rounded-lg font-bold text-lg hover:bg-yellow-400 hover:shadow-xl hover:shadow-[#F8B400]/20 transition-all flex items-center gap-2">
                Start Your Journey <ArrowRight size={20} />
              </button>
              <button className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-white/20 transition-all flex items-center gap-2">
                <PlayCircle size={20} /> Watch Demo
              </button>
            </div>
          </motion.div>

          {/* Floating Stats */}
          <div className="hidden lg:grid grid-cols-2 gap-6 relative">
            {[
              { num: 10000, suffix: '+', text: 'Students Trained', icon: Users, color: 'text-blue-500', delay: 0.2 },
              { num: 15, suffix: '+', text: 'Expert Courses', icon: Award, color: 'text-[#F8B400]', delay: 0.4 },
              { num: 100, suffix: '%', text: 'Practical Classes', icon: Wrench, color: 'text-green-500', delay: 0.6 },
              { num: 5000, suffix: '+', text: 'Placements', icon: Briefcase, color: 'text-purple-500', delay: 0.8 },
            ].map((stat, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: stat.delay }}
                className={`bg-white/10 backdrop-blur-xl border border-white/20 p-6 rounded-2xl shadow-2xl ${idx % 2 !== 0 ? 'mt-12' : ''}`}
              >
                <stat.icon className={`w-10 h-10 ${stat.color} mb-4`} />
                <h3 className="text-3xl font-bold text-white mb-1">
                  <AnimatedNumber value={stat.num} suffix={stat.suffix} />
                </h3>
                <p className="text-gray-300 font-medium">{stat.text}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/50"
        >
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center p-1">
            <div className="w-1.5 h-3 bg-[#F8B400] rounded-full"></div>
          </div>
        </motion.div>
      </section>

      {/* WHY CHOOSE US */}
      <section id="about" className="py-24 bg-white relative">
        <div className="container mx-auto px-4 md:px-8">
          <SectionHeading 
            title="Why Choose Kartik Enterprises?" 
            subtitle="We provide industry-leading infrastructure and practical knowledge to make you job-ready from day one."
          />
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {FEATURES.map((feat, idx) => (
              <FadeIn key={idx} delay={idx * 0.1}>
                <div className="group p-8 rounded-2xl bg-slate-50 border border-slate-100 hover:bg-white hover:shadow-2xl hover:shadow-blue-900/5 transition-all duration-300 h-full">
                  <div className="w-14 h-14 rounded-xl bg-blue-100 text-[#0B1F4D] flex items-center justify-center mb-6 group-hover:bg-[#0B1F4D] group-hover:text-[#F8B400] transition-colors">
                    <feat.icon size={28} />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-gray-900">{feat.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feat.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* POPULAR COURSES */}
      <section id="courses" className="py-24 bg-slate-50">
        <div className="container mx-auto px-4 md:px-8">
          <SectionHeading 
            title="Our Premium Courses" 
            subtitle="Master highly demanded technical skills with our comprehensive, hands-on training modules."
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {COURSES.map((course, idx) => (
              <FadeIn key={course.id} delay={idx * 0.1}>
                <div className="bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group">
                  <div className="relative h-64 overflow-hidden">
                    <div className="absolute inset-0 bg-[#0B1F4D]/20 group-hover:bg-transparent transition-colors z-10"></div>
                    <img src={course.img} alt={course.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                    <div className="absolute top-4 right-4 z-20 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-bold text-[#0B1F4D] flex items-center gap-1 shadow-sm">
                      <Award size={14} className="text-[#F8B400]" /> Best Seller
                    </div>
                  </div>
                  
                  <div className="p-8">
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">{course.title}</h3>
                    
                    <div className="flex justify-between items-center mb-6 text-sm">
                      <div className="flex items-center gap-2 text-gray-600 font-medium">
                        <div className="p-2 bg-blue-50 rounded-lg text-[#0B1F4D]"><course.icon size={18} /></div>
                        {course.duration}
                      </div>
                      <div className="text-lg font-bold text-[#0B1F4D] bg-yellow-50 px-3 py-1 rounded-lg">
                        {course.fees}
                      </div>
                    </div>

                    <div className="border-t border-gray-100 pt-6 flex gap-4">
                      <button className="flex-1 bg-[#0B1F4D] text-white py-3 rounded-xl font-semibold hover:bg-blue-900 transition-colors">
                        Syllabus
                      </button>
                      <button className="flex-1 bg-[#F8B400] text-[#0B1F4D] py-3 rounded-xl font-semibold hover:bg-yellow-400 transition-colors">
                        Enroll Now
                      </button>
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <button className="inline-flex items-center gap-2 text-[#0B1F4D] font-bold hover:text-blue-700">
              View All Courses <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </section>

      {/* ADMISSION PROCESS (Timeline) */}
      <section className="py-24 bg-[#0B1F4D] text-white overflow-hidden">
        <div className="container mx-auto px-4 md:px-8">
          <SectionHeading 
            title="Simple Admission Process" 
            subtitle="Start your journey towards a professional career in 4 simple steps."
            light={true}
          />

          <div className="max-w-4xl mx-auto relative mt-16">
            {/* Center Line */}
            <div className="absolute left-[20px] md:left-1/2 top-0 bottom-0 w-1 bg-white/10 md:-translate-x-1/2 rounded-full"></div>

            {[
              { step: '01', title: 'Counseling & Demo', desc: 'Visit our center or call us for free career counseling and a live demo class.' },
              { step: '02', title: 'Enrollment', desc: 'Fill the application form and complete the admission process with flexible payment options.' },
              { step: '03', title: 'Practical Training', desc: 'Attend daily theory and 100% practical classes on live projects and modern machines.' },
              { step: '04', title: 'Certification & Job', desc: 'Get your Govt. recognized certificate and face interviews arranged by our placement cell.' },
            ].map((item, idx) => (
              <FadeIn key={idx} delay={idx * 0.2} className={`relative flex items-center mb-12 ${idx % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                {/* Dot */}
                <div className="absolute left-[20px] md:left-1/2 w-10 h-10 bg-[#F8B400] border-4 border-[#0B1F4D] rounded-full -translate-x-1/2 flex items-center justify-center font-bold text-[#0B1F4D] z-10 shadow-lg">
                  {item.step}
                </div>
                
                {/* Content */}
                <div className={`ml-16 md:ml-0 md:w-1/2 p-6 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl ${idx % 2 === 0 ? 'md:mr-12' : 'md:ml-12'}`}>
                  <h4 className="text-xl font-bold mb-2 text-[#F8B400]">{item.title}</h4>
                  <p className="text-gray-300">{item.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* PLACEMENTS */}
      <section id="placement" className="py-24 bg-white">
        <div className="container mx-auto px-4 md:px-8 text-center">
          <SectionHeading 
            title="Our Star Performers" 
            subtitle="Our students are working with top brands across the country."
          />
          
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-60 grayscale hover:grayscale-0 transition-all duration-500 mb-20">
             {/* Simulated Logos */}
            <div className="text-3xl font-black font-serif tracking-tighter">SAMSUNG</div>
            <div className="text-3xl font-black tracking-widest text-blue-600">LG</div>
            <div className="text-3xl font-black italic">Whirlpool</div>
            <div className="text-3xl font-bold uppercase tracking-widest text-red-600">Voltas</div>
            <div className="text-3xl font-bold uppercase tracking-wider text-blue-800">Panasonic</div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { label: 'Highest Package', value: 4.5, prefix: '₹', suffix: ' LPA', decimals: 1 },
              { label: 'Average Package', value: 2.8, prefix: '₹', suffix: ' LPA', decimals: 1 },
              { label: 'Placement Rate', value: 100, prefix: '', suffix: '%', decimals: 0 },
            ].map((stat, idx) => (
              <FadeIn key={idx} delay={idx * 0.1}>
                <div className="p-8 rounded-2xl bg-gradient-to-br from-slate-50 to-slate-100 border border-slate-200">
                  <div className="text-4xl font-bold text-[#0B1F4D] mb-2">
                    <AnimatedNumber value={stat.value} prefix={stat.prefix} suffix={stat.suffix} decimals={stat.decimals} />
                  </div>
                  <div className="text-gray-600 font-medium uppercase tracking-wider text-sm">{stat.label}</div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-24 bg-slate-50 overflow-hidden">
        <div className="container mx-auto px-4 md:px-8">
          <SectionHeading 
            title="Student Success Stories" 
            subtitle="Don't just take our word for it. Hear what our successful alumni have to say."
          />

          <div className="flex overflow-x-auto snap-x snap-mandatory hide-scrollbar gap-6 pb-10 pt-4 -mx-4 px-4 md:mx-0 md:px-0">
            {TESTIMONIALS.map((test, idx) => (
              <div key={idx} className="min-w-[300px] md:min-w-[400px] snap-center bg-white p-8 rounded-3xl shadow-xl shadow-blue-900/5 relative mt-8">
                <div className="absolute -top-10 left-8">
                  <img src={test.img} alt={test.name} className="w-20 h-20 rounded-full border-4 border-white shadow-lg object-cover" />
                </div>
                <div className="pt-8">
                  <div className="flex gap-1 text-[#F8B400] mb-4">
                    {[...Array(5)].map((_, i) => <Star key={i} size={18} fill="currentColor" />)}
                  </div>
                  <p className="text-gray-600 italic mb-6">"{test.text}"</p>
                  <div>
                    <h4 className="font-bold text-[#0B1F4D]">{test.name}</h4>
                    <p className="text-sm text-gray-500">{test.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GALLERY (Masonry Concept) */}
      <section id="gallery" className="py-24 bg-white">
        <div className="container mx-auto px-4 md:px-8">
          <SectionHeading title="Institute Gallery" subtitle="A glimpse into our modern classrooms and fully equipped practical workshops." />
          
          <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
            {[
              "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?auto=format&fit=crop&q=80&w=600",
              "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=600",
              "https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&q=80&w=600",
              "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&q=80&w=600",
              "https://images.unsplash.com/photo-1581092335397-9583eb92d232?auto=format&fit=crop&q=80&w=600",
            ].map((img, idx) => (
              <FadeIn key={idx} delay={idx * 0.1}>
                <div className="group relative rounded-2xl overflow-hidden cursor-pointer shadow-md hover:shadow-xl transition-all">
                  <img src={img} alt="Gallery" className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-[#0B1F4D]/0 group-hover:bg-[#0B1F4D]/40 transition-colors duration-300 flex items-center justify-center">
                    <span className="opacity-0 group-hover:opacity-100 text-white font-medium bg-white/20 backdrop-blur-md px-4 py-2 rounded-lg transition-opacity duration-300">View Larger</span>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT & FORM */}
      <section id="contact" className="py-24 bg-slate-50 relative overflow-hidden">
        {/* Background blobs */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-200/50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-yellow-200/50 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>

        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col lg:flex-row border border-slate-100">
            
            {/* Contact Info */}
            <div className="lg:w-2/5 bg-[#0B1F4D] p-10 md:p-16 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2"></div>
              
              <h3 className="text-3xl font-bold mb-8">Get In Touch</h3>
              <p className="text-gray-300 mb-12">Have questions about our courses? Our counselors are ready to help you plan your career.</p>
              
              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                    <Phone className="text-[#F8B400]" size={20} />
                  </div>
                  <div>
                    <h5 className="font-semibold text-gray-300 text-sm">Call Us Directly</h5>
                    <p className="text-xl font-bold">+91 98765 43210</p>
                    <p className="text-xl font-bold">+91 98765 43211</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                    <Mail className="text-[#F8B400]" size={20} />
                  </div>
                  <div>
                    <h5 className="font-semibold text-gray-300 text-sm">Email Address</h5>
                    <p className="font-medium">info@kartikinstitute.com</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                    <MapPin className="text-[#F8B400]" size={20} />
                  </div>
                  <div>
                    <h5 className="font-semibold text-gray-300 text-sm">Visit Institute</h5>
                    <p className="font-medium leading-relaxed">123, Technical Hub Area,<br/>Near Metro Station,<br/>New Delhi - 110001</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="lg:w-3/5 p-10 md:p-16 bg-white/80 backdrop-blur-md">
              <h3 className="text-2xl font-bold text-[#0B1F4D] mb-8">Request a Free Callback</h3>
              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                    <input type="text" className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0B1F4D] focus:border-transparent transition-all" placeholder="John Doe" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                    <input type="tel" className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0B1F4D] focus:border-transparent transition-all" placeholder="+91" />
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Select Course</label>
                    <select className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0B1F4D] focus:border-transparent transition-all text-gray-600">
                      <option>AC Repairing</option>
                      <option>PCB Repairing</option>
                      <option>Washing Machine</option>
                      <option>Refrigerator</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
                    <input type="text" className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0B1F4D] focus:border-transparent transition-all" placeholder="Your City" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Message (Optional)</label>
                  <textarea rows="4" className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0B1F4D] focus:border-transparent transition-all" placeholder="How can we help you?"></textarea>
                </div>

                <button type="button" className="w-full bg-gradient-to-r from-[#0B1F4D] to-blue-900 text-white py-4 rounded-xl font-bold text-lg hover:shadow-lg hover:shadow-blue-900/30 transition-all transform hover:-translate-y-0.5">
                  Submit Application
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 md:px-8 max-w-4xl">
          <SectionHeading title="Frequently Asked Questions" subtitle="Find answers to common queries before you enroll." />
          
          <div className="space-y-4">
            {FAQS.map((faq, idx) => (
              <div key={idx} className="border border-slate-200 rounded-2xl overflow-hidden transition-all duration-300">
                <button 
                  onClick={() => setActiveFaq(activeFaq === idx ? -1 : idx)}
                  className={`w-full flex items-center justify-between p-6 text-left font-bold text-lg transition-colors ${activeFaq === idx ? 'bg-[#0B1F4D] text-white' : 'bg-slate-50 text-gray-800 hover:bg-slate-100'}`}
                >
                  {faq.q}
                  <ChevronDown className={`transform transition-transform duration-300 ${activeFaq === idx ? 'rotate-180 text-[#F8B400]' : 'text-gray-400'}`} />
                </button>
                <AnimatePresence>
                  {activeFaq === idx && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="bg-white px-6 py-6 border-t border-slate-100"
                    >
                      <p className="text-gray-600 leading-relaxed">{faq.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#0B1F4D] to-blue-900"></div>
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        
        <div className="container mx-auto px-4 md:px-8 relative z-10 text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Start Your Professional Career Today</h2>
          <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">Join thousands of successful students who have built their careers with Kartik Enterprises.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="bg-[#F8B400] text-[#0B1F4D] px-8 py-4 rounded-xl font-bold text-lg hover:bg-yellow-400 hover:shadow-xl hover:shadow-[#F8B400]/20 transition-all">
              Apply For Admission
            </button>
            <button className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white/20 transition-all flex items-center justify-center gap-2">
              <Phone size={20} /> Call Counselor
            </button>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-gray-900 text-gray-300 py-16 border-t-4 border-[#F8B400]">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
            
            {/* Brand */}
            <div>
              <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 rounded bg-[#0B1F4D] flex items-center justify-center">
                  <Wrench className="text-[#F8B400] w-5 h-5" />
                </div>
                <span className="font-bold text-xl text-white">Kartik Enterprises</span>
              </div>
              <p className="text-gray-400 mb-6 text-sm leading-relaxed">
                Empowering youth with professional technical skills for a brighter, secure future. India's trusted name in technical education.
              </p>
            </div>

            {/* Links */}
            <div>
              <h4 className="text-white font-bold mb-6 text-lg">Quick Links</h4>
              <ul className="space-y-3 text-sm">
                {['Home', 'About Institute', 'Our Courses', 'Placements', 'Gallery', 'Contact Us'].map(link => (
                  <li key={link}><a href="#" className="hover:text-[#F8B400] transition-colors flex items-center gap-2"><ChevronRight size={14} /> {link}</a></li>
                ))}
              </ul>
            </div>

            {/* Courses */}
            <div>
              <h4 className="text-white font-bold mb-6 text-lg">Popular Courses</h4>
              <ul className="space-y-3 text-sm">
                {['AC Repairing', 'PCB Designing', 'Washing Machine', 'Refrigerator', 'Microwave Oven'].map(link => (
                  <li key={link}><a href="#" className="hover:text-[#F8B400] transition-colors flex items-center gap-2"><ChevronRight size={14} /> {link}</a></li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="text-white font-bold mb-6 text-lg">Contact Info</h4>
              <ul className="space-y-4 text-sm text-gray-400">
                <li className="flex items-start gap-3">
                  <MapPin className="text-[#F8B400] shrink-0" size={18} />
                  <span>123, Technical Hub Area, Near Metro Station, New Delhi - 110001</span>
                </li>
                <li className="flex items-center gap-3">
                  <Phone className="text-[#F8B400] shrink-0" size={18} />
                  <span>+91 98765 43210</span>
                </li>
                <li className="flex items-center gap-3">
                  <Mail className="text-[#F8B400] shrink-0" size={18} />
                  <span>info@kartikinstitute.com</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
            <p>&copy; {new Date().getFullYear()} Kartik Enterprises Repair & Institute. All rights reserved.</p>
            <div className="flex gap-4">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>

      {/* FLOATING ACTION BUTTONS */}
      <div className="fixed bottom-6 right-6 flex flex-col gap-4 z-50">
        <a href="tel:+919876543210" className="w-14 h-14 bg-blue-600 rounded-full flex items-center justify-center text-white shadow-lg hover:scale-110 transition-transform">
          <Phone size={24} />
        </a>
        <a href="https://wa.me/919876543210" target="_blank" rel="noreferrer" className="w-14 h-14 bg-green-500 rounded-full flex items-center justify-center text-white shadow-lg hover:scale-110 transition-transform">
          <MessageSquare size={24} />
        </a>
      </div>

    </div>
  );
}