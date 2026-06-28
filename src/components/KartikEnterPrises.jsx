import React, { useState, useEffect, useRef } from 'react';
import { 
  Menu, X, Phone, Mail, MapPin, ChevronRight, CheckCircle2, 
  Wrench, Zap, Snowflake, Droplets, ThermometerSun, MonitorPlay, 
  Users, Award, Briefcase, Star, Clock, ArrowRight, Play, Quote,
  ChevronDown, MessageCircle,
  GraduationCap, TrendingUp, ShieldCheck
} from 'lucide-react';

// --- Constants & Theme ---
const THEME = {
  blue: '#0B1F4D',
  gold: '#F8B400',
  navy: '#051024',
};

// --- Mock Data ---
const STATS = [
  { label: 'Students Trained', value: '10,000+', icon: <Users size={24} /> },
  { label: 'Professional Courses', value: '15+', icon: <Award size={24} /> },
  { label: 'Practical Classes', value: '100%', icon: <Wrench size={24} /> },
  { label: 'Placements', value: '5000+', icon: <Briefcase size={24} /> },
];

const FEATURES = [
  { title: 'Experienced Trainers', desc: 'Learn from industry veterans with 10+ years of hands-on experience.', icon: <Award className="text-[#F8B400]" size={32} /> },
  { title: 'Practical Workshop', desc: 'State-of-the-art labs equipped with the latest appliances for real-world practice.', icon: <Wrench className="text-[#F8B400]" size={32} /> },
  { title: 'Job Assistance', desc: 'Dedicated placement cell ensuring you get hired by top companies.', icon: <Briefcase className="text-[#F8B400]" size={32} /> },
  { title: 'Government Cert.', desc: 'Recognized certification that adds significant value to your resume.', icon: <ShieldCheck className="text-[#F8B400]" size={32} /> },
  { title: 'Affordable Fees', desc: 'Premium education made accessible with flexible payment options.', icon: <TrendingUp className="text-[#F8B400]" size={32} /> },
  { title: 'Live Projects', desc: 'Work on real customer appliances to build confidence before you graduate.', icon: <MonitorPlay className="text-[#F8B400]" size={32} /> },
];

const COURSES = [
  { id: 1, title: 'Advanced AC Repairing', duration: '3 Months', fee: '₹15,000', icon: <Snowflake size={24}/>, img: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&q=80&w=800' },
  { id: 2, title: 'Refrigerator Expert', duration: '2 Months', fee: '₹12,000', icon: <ThermometerSun size={24}/>, img: 'https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?auto=format&fit=crop&q=80&w=800' },
  { id: 3, title: 'Washing Machine Master', duration: '2 Months', fee: '₹10,000', icon: <Droplets size={24}/>, img: 'https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?auto=format&fit=crop&q=80&w=800' },
  { id: 4, title: 'Microwave & Oven', duration: '1 Month', fee: '₹6,000', icon: <Zap size={24}/>, img: 'https://images.unsplash.com/photo-1574269909862-7e1d70bb8078?auto=format&fit=crop&q=80&w=800' },
  { id: 5, title: 'RO Water Purifier', duration: '1 Month', fee: '₹5,000', icon: <Droplets size={24}/>, img: 'https://images.unsplash.com/photo-1570519390250-b0c036d000ce?auto=format&fit=crop&q=80&w=800' },
  { id: 6, title: 'Electronics & PCB', duration: '4 Months', fee: '₹20,000', icon: <MonitorPlay size={24}/>, img: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800' },
];

const TESTIMONIALS = [
  { id: 1, name: 'Rahul Sharma', role: 'Placed at LG Electronics', text: 'The practical training here is unmatched. I got hands-on experience which helped me clear my technical interview easily. Highly recommend Kartik Enterprises!', img: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=200' },
  { id: 2, name: 'Amit Kumar', role: 'Independent Business Owner', text: 'Started my own repair shop after completing the AC & Fridge course. The trainers are supportive even after the course ends. Best investment in my career.', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200' },
  { id: 3, name: 'Sneha Gupta', role: 'Placed at Samsung', text: 'I was hesitant initially, but the PCB repair course is structured perfectly from basics to advanced. The placement assistance is genuine and very helpful.', img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200' },
];

const FAQS = [
  { q: 'Is there any minimum qualification required?', a: 'We recommend a minimum of 10th pass, but passion and eagerness to learn matter most. Our courses are designed from scratch.' },
  { q: 'Do you provide 100% job placement?', a: 'We provide 100% placement assistance. We have tie-ups with top brands and local service centers. Meritorious students usually get placed before the course ends.' },
  { q: 'Can I pay fees in installments?', a: 'Yes, we offer flexible EMI and installment options to make our premium education affordable for everyone.' },
  { q: 'Is the certificate recognized?', a: 'Yes, our institute is ISO certified and our training certificates are recognized industry-wide by all major electronic brands.' },
];

const GALLERY = [
  'https://images.unsplash.com/photo-1581092921461-eab62e97a780?auto=format&fit=crop&q=80&w=600',
  'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&q=80&w=600',
  'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&q=80&w=600',
  'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&q=80&w=600',
  'https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&q=80&w=600',
  'https://images.unsplash.com/photo-1574169208507-84376144848b?auto=format&fit=crop&q=80&w=600',
];

// --- Components ---

const Navbar = ({ scrolled }) => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = ['Home', 'About', 'Courses', 'Placement', 'Gallery', 'Contact'];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-500 ${scrolled ? 'bg-[#0B1F4D]/95 backdrop-blur-md shadow-xl py-3' : 'bg-transparent py-5'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#F8B400] flex items-center justify-center shadow-lg shadow-[#F8B400]/20">
              <Wrench size={24} className="text-[#0B1F4D]" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white tracking-tight leading-tight">KARTIK</h1>
              <p className="text-[10px] text-[#F8B400] font-semibold tracking-widest uppercase">Institute</p>
            </div>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a key={link} href={`#${link.toLowerCase()}`} className="text-sm font-medium text-gray-200 hover:text-[#F8B400] transition-colors relative group">
                {link}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#F8B400] transition-all group-hover:w-full"></span>
              </a>
            ))}
            <button className="bg-[#F8B400] text-[#0B1F4D] px-6 py-2 rounded-full font-bold text-sm hover:bg-white hover:shadow-[0_0_15px_rgba(248,180,0,0.5)] transition-all duration-300 transform hover:-translate-y-0.5">
              Apply Now
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="text-white hover:text-[#F8B400]">
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-[#0B1F4D]/95 backdrop-blur-xl border-t border-white/10 shadow-2xl">
          <div className="px-4 pt-2 pb-6 space-y-2">
            {navLinks.map((link) => (
              <a 
                key={link} 
                href={`#${link.toLowerCase()}`} 
                onClick={() => setIsOpen(false)}
                className="block px-3 py-3 text-base font-medium text-white border-b border-white/5 hover:text-[#F8B400] hover:bg-white/5 rounded-md"
              >
                {link}
              </a>
            ))}
            <button className="w-full mt-4 bg-[#F8B400] text-[#0B1F4D] px-6 py-3 rounded-xl font-bold text-base shadow-lg">
              Apply Now
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

const SectionHeading = ({ subtitle, title, light = false }) => (
  <div className="text-center mb-16 relative z-10">
    <span className={`inline-block py-1 px-3 rounded-full text-xs font-bold tracking-wider uppercase mb-4 border ${light ? 'border-[#F8B400] text-[#F8B400]' : 'border-[#0B1F4D]/20 text-[#0B1F4D] bg-[#0B1F4D]/5'}`}>
      {subtitle}
    </span>
    <h2 className={`text-4xl md:text-5xl font-extrabold tracking-tight ${light ? 'text-white' : 'text-[#0B1F4D]'}`}>
      {title}
    </h2>
    <div className="w-24 h-1.5 bg-[#F8B400] mx-auto mt-6 rounded-full"></div>
  </div>
);

export default function App() {
  const [scrolled, setScrolled] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [openFaq, setOpenFaq] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Auto-advance testimonials
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen font-sans bg-gray-50 text-gray-800 selection:bg-[#F8B400] selection:text-[#0B1F4D]">
      <Navbar scrolled={scrolled} />

      {/* Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden bg-[#051024]">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1621905252507-b35492cc74b4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80" 
            alt="AC Repair Workshop" 
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0B1F4D]/90 via-[#0B1F4D]/70 to-transparent"></div>
        </div>

        {/* Animated Background Shapes */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
           <div className="absolute -top-40 -right-40 w-96 h-96 bg-[#F8B400] rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
           <div className="absolute top-40 -left-20 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-1000"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-6 border-l-4 border-l-[#F8B400]">
              <Star size={16} className="text-[#F8B400]" />
              <span className="text-white text-sm font-medium">India's Premium Repair Institute</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-extrabold text-white leading-[1.1] mb-6">
              Build Your Career With <span className="text-[#F8B400] relative whitespace-nowrap">Professional<svg className="absolute w-full h-3 -bottom-1 left-0 text-[#F8B400]/30" viewBox="0 0 100 10" preserveAspectRatio="none"><path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="4" fill="transparent"/></svg></span> Repair Training
            </h1>
            
            <p className="text-lg md:text-xl text-gray-300 mb-10 max-w-2xl leading-relaxed">
              Master the skills of repairing ACs, Refrigerators, Washing Machines, and PCBs with 100% practical training and assured placement assistance.
            </p>
            
            <div className="flex flex-wrap items-center gap-4">
              <button className="bg-[#F8B400] text-[#0B1F4D] px-8 py-4 rounded-xl font-bold text-lg hover:bg-white hover:shadow-[0_0_30px_rgba(248,180,0,0.4)] transition-all duration-300 transform hover:-translate-y-1 flex items-center gap-2">
                Apply Now <ArrowRight size={20} />
              </button>
              <button className="bg-white/10 text-white border border-white/20 px-8 py-4 rounded-xl font-bold text-lg hover:bg-white/20 backdrop-blur-sm transition-all duration-300 flex items-center gap-2">
                <Play size={20} className="text-[#F8B400]" fill="currentColor" /> Watch Demo
              </button>
            </div>
          </div>
        </div>

        {/* Floating Stats Bar */}
        <div className="absolute bottom-0 left-0 w-full z-20 translate-y-1/2 hidden md:block">
          <div className="max-w-7xl mx-auto px-4">
            <div className="bg-white rounded-2xl shadow-2xl shadow-blue-900/10 p-6 md:p-8 flex justify-between items-center border border-gray-100">
              {STATS.map((stat, idx) => (
                <div key={idx} className="flex items-center gap-4 px-4 w-1/4 border-r last:border-0 border-gray-100">
                  <div className="w-14 h-14 rounded-full bg-[#0B1F4D]/5 flex items-center justify-center text-[#F8B400]">
                    {stat.icon}
                  </div>
                  <div>
                    <div className="text-3xl font-extrabold text-[#0B1F4D]">{stat.value}</div>
                    <div className="text-sm font-semibold text-gray-500 uppercase tracking-wide">{stat.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section id="about" className="pt-32 pb-20 md:pt-40 bg-gray-50 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading subtitle="Why Kartik Enterprises" title="Premium Training Experience" />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            {FEATURES.map((feature, idx) => (
              <div key={idx} className="bg-white rounded-2xl p-8 shadow-lg shadow-gray-200/50 border border-gray-100 hover:shadow-2xl hover:shadow-blue-900/10 transition-all duration-300 transform hover:-translate-y-2 group">
                <div className="w-16 h-16 rounded-xl bg-[#0B1F4D]/5 flex items-center justify-center mb-6 group-hover:bg-[#0B1F4D] transition-colors duration-300">
                  <div className="group-hover:text-white transition-colors duration-300">
                    {feature.icon}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-[#0B1F4D] mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Courses */}
      <section id="courses" className="py-24 bg-[#0B1F4D] relative">
        {/* Subtle pattern background */}
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16">
            <div className="flex-1">
              <span className="inline-block py-1 px-3 rounded-full text-xs font-bold tracking-wider uppercase mb-4 border border-[#F8B400] text-[#F8B400]">
                Master Your Skills
              </span>
              <h2 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">Our Premium Courses</h2>
              <div className="w-24 h-1.5 bg-[#F8B400] mt-6 rounded-full"></div>
            </div>
            <button className="mt-6 md:mt-0 text-[#F8B400] font-semibold hover:text-white transition-colors flex items-center gap-2 group">
              View All Courses <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {COURSES.map((course) => (
              <div key={course.id} className="group bg-white/5 backdrop-blur-sm rounded-3xl overflow-hidden border border-white/10 hover:border-[#F8B400]/50 transition-all duration-500 hover:shadow-[0_0_40px_rgba(248,180,0,0.15)] flex flex-col">
                <div className="relative h-60 overflow-hidden">
                  <div className="absolute inset-0 bg-[#0B1F4D]/20 group-hover:bg-transparent transition-colors duration-500 z-10"></div>
                  <img src={course.img} alt={course.title} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-in-out" />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-[#0B1F4D] z-20 flex items-center gap-1 shadow-lg">
                    <Clock size={12} /> {course.duration}
                  </div>
                </div>
                <div className="p-8 flex-1 flex flex-col">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 rounded-lg bg-[#F8B400]/20 text-[#F8B400]">
                      {course.icon}
                    </div>
                    <h3 className="text-2xl font-bold text-white group-hover:text-[#F8B400] transition-colors">{course.title}</h3>
                  </div>
                  <ul className="space-y-2 mb-8 flex-1 text-gray-300 text-sm">
                    <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-green-400" /> 100% Practical Training</li>
                    <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-green-400" /> Real Appliances Practice</li>
                    <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-green-400" /> Industry Expert Trainers</li>
                  </ul>
                  <div className="flex items-center justify-between mt-auto pt-6 border-t border-white/10">
                    <div>
                      <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Course Fee</p>
                      <p className="text-xl font-bold text-[#F8B400]">{course.fee}</p>
                    </div>
                    <button className="bg-white/10 hover:bg-[#F8B400] text-white hover:text-[#0B1F4D] w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 border border-white/20 hover:border-transparent transform group-hover:rotate-45">
                      <ArrowRight size={20} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process / Timeline */}
      <section className="py-24 bg-white overflow-hidden">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeading subtitle="Simple Steps" title="Your Journey to Success" />
            
            <div className="relative max-w-4xl mx-auto mt-16">
              {/* Vertical Line */}
              <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-[#F8B400] via-[#0B1F4D] to-transparent transform md:-translate-x-1/2"></div>
              
              {['Counseling', 'Enrollment', 'Practical Training', 'Certification', 'Placement'].map((step, idx) => (
                <div key={idx} className={`relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group mb-12 last:mb-0 ${idx % 2 !== 0 ? 'md:flex-row' : ''}`}>
                  
                  {/* Marker */}
                  <div className="absolute left-4 md:left-1/2 w-8 h-8 rounded-full bg-white border-4 border-[#F8B400] shadow-[0_0_15px_rgba(248,180,0,0.5)] transform -translate-x-1/2 flex items-center justify-center z-10 group-hover:scale-125 transition-transform duration-300">
                     <div className="w-2 h-2 bg-[#0B1F4D] rounded-full"></div>
                  </div>

                  {/* Content Box */}
                  <div className="ml-12 md:ml-0 md:w-5/12 w-full">
                    <div className="bg-gray-50 p-6 rounded-2xl shadow-sm border border-gray-100 group-hover:shadow-xl group-hover:border-[#0B1F4D]/10 transition-all duration-300">
                      <div className="text-4xl font-black text-gray-100 absolute -top-4 -right-4 z-0 pointer-events-none group-hover:text-gray-200 transition-colors">0{idx+1}</div>
                      <h4 className="text-xl font-bold text-[#0B1F4D] relative z-10">{step}</h4>
                      <p className="text-gray-500 mt-2 text-sm relative z-10">Detailed structured process ensuring complete understanding and practical application before moving to the next stage.</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
         </div>
      </section>

      {/* Gallery */}
      <section id="gallery" className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading subtitle="Inside The Institute" title="State-of-the-Art Workshop" />
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 mt-12">
            {GALLERY.map((img, idx) => (
              <div key={idx} className={`relative group rounded-2xl overflow-hidden cursor-pointer ${idx === 0 || idx === 3 ? 'md:col-span-2 md:row-span-2' : ''}`}>
                <div className="absolute inset-0 bg-[#0B1F4D]/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 flex items-center justify-center">
                  <div className="bg-white/20 backdrop-blur-md w-12 h-12 rounded-full flex items-center justify-center transform scale-0 group-hover:scale-100 transition-transform duration-300 delay-100 text-white">
                    <Search size={20} />
                  </div>
                </div>
                <img 
                  src={img} 
                  alt={`Gallery ${idx + 1}`} 
                  className="w-full h-full object-cover aspect-video md:aspect-auto transform group-hover:scale-105 transition-transform duration-500"
                  style={{ minHeight: idx === 0 || idx === 3 ? '400px' : '200px' }}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Placements & Testimonials */}
      <section id="placement" className="py-24 bg-[#0B1F4D] relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            
            {/* Left: Placement Info */}
            <div>
              <span className="inline-block py-1 px-3 rounded-full text-xs font-bold tracking-wider uppercase mb-4 border border-[#F8B400] text-[#F8B400]">
                Success Stories
              </span>
              <h2 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-6">Start Your Career With Top Brands</h2>
              <p className="text-gray-300 text-lg mb-10 leading-relaxed">
                Our dedicated placement cell ensures that every deserving student gets an opportunity to interview with leading appliance manufacturers and service centers across India.
              </p>
              
              <div className="grid grid-cols-2 gap-6 mb-10">
                <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                  <div className="text-4xl font-black text-[#F8B400] mb-2">100%</div>
                  <div className="text-sm text-gray-300 font-medium">Placement Assistance</div>
                </div>
                <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                  <div className="text-4xl font-black text-[#F8B400] mb-2">₹3.5L</div>
                  <div className="text-sm text-gray-300 font-medium">Average Starting Package</div>
                </div>
              </div>

              {/* Mock Logos */}
              <div className="flex flex-wrap gap-6 opacity-70">
                <div className="h-10 px-4 bg-white/10 rounded flex items-center justify-center font-bold text-white tracking-widest uppercase text-sm">Samsung</div>
                <div className="h-10 px-4 bg-white/10 rounded flex items-center justify-center font-bold text-white tracking-widest uppercase text-sm">LG</div>
                <div className="h-10 px-4 bg-white/10 rounded flex items-center justify-center font-bold text-white tracking-widest uppercase text-sm">Whirlpool</div>
                <div className="h-10 px-4 bg-white/10 rounded flex items-center justify-center font-bold text-white tracking-widest uppercase text-sm">Voltas</div>
              </div>
            </div>

            {/* Right: Testimonial Slider (Custom built for single file reliability) */}
            <div className="relative">
              <div className="absolute -inset-4 bg-[#F8B400]/10 rounded-[3rem] transform -rotate-3 filter blur-xl"></div>
              <div className="relative bg-white rounded-3xl p-8 md:p-12 shadow-2xl shadow-black/50 border border-gray-100">
                <Quote size={48} className="text-gray-100 absolute top-8 right-8" />
                
                <div className="relative h-64 md:h-56">
                  {TESTIMONIALS.map((test, idx) => (
                    <div 
                      key={test.id} 
                      className={`absolute top-0 left-0 w-full transition-all duration-700 ease-in-out ${idx === activeTestimonial ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8 pointer-events-none'}`}
                    >
                      <div className="flex gap-1 text-[#F8B400] mb-6">
                        {[...Array(5)].map((_, i) => <Star key={i} size={18} fill="currentColor" />)}
                      </div>
                      <p className="text-lg md:text-xl text-gray-700 font-medium leading-relaxed mb-8 italic">
                        "{test.text}"
                      </p>
                      <div className="flex items-center gap-4">
                        <img src={test.img} alt={test.name} className="w-14 h-14 rounded-full object-cover border-2 border-[#0B1F4D]" />
                        <div>
                          <h4 className="font-bold text-[#0B1F4D]">{test.name}</h4>
                          <p className="text-sm text-gray-500 font-medium">{test.role}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Controls */}
                <div className="flex gap-2 mt-8">
                  {TESTIMONIALS.map((_, idx) => (
                    <button 
                      key={idx}
                      onClick={() => setActiveTestimonial(idx)}
                      className={`h-2 rounded-full transition-all duration-300 ${idx === activeTestimonial ? 'w-8 bg-[#0B1F4D]' : 'w-2 bg-gray-300 hover:bg-gray-400'}`}
                    />
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Admission / Contact Section */}
      <section id="contact" className="py-24 bg-gray-50 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16">
            
            {/* Form */}
            <div className="bg-white rounded-3xl p-8 md:p-10 shadow-xl shadow-blue-900/5 border border-gray-100 relative overflow-hidden">
               <div className="absolute top-0 right-0 w-32 h-32 bg-[#F8B400]/10 rounded-bl-full -z-0"></div>
               <div className="relative z-10">
                  <h3 className="text-3xl font-extrabold text-[#0B1F4D] mb-2">Apply for Admission</h3>
                  <p className="text-gray-500 mb-8">Fill out the form below and our counselor will call you.</p>
                  
                  <form onSubmit={(e) => e.preventDefault()} className="space-y-5">
                    <div className="grid grid-cols-2 gap-5">
                      <div className="space-y-1">
                        <label className="text-sm font-semibold text-gray-700">First Name</label>
                        <input type="text" className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-[#0B1F4D] focus:border-transparent outline-none transition-all" placeholder="John" />
                      </div>
                      <div className="space-y-1">
                        <label className="text-sm font-semibold text-gray-700">Last Name</label>
                        <input type="text" className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-[#0B1F4D] focus:border-transparent outline-none transition-all" placeholder="Doe" />
                      </div>
                    </div>
                    <div className="space-y-1">
                      <label className="text-sm font-semibold text-gray-700">Phone Number</label>
                      <input type="tel" className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-[#0B1F4D] focus:border-transparent outline-none transition-all" placeholder="+91 98765 43210" />
                    </div>
                    <div className="space-y-1">
                      <label className="text-sm font-semibold text-gray-700">Select Course</label>
                      <select className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-[#0B1F4D] focus:border-transparent outline-none transition-all text-gray-600">
                        <option>Advanced AC Repairing</option>
                        <option>Refrigerator Expert</option>
                        <option>Washing Machine Master</option>
                        <option>PCB Repairing</option>
                      </select>
                    </div>
                    <button className="w-full bg-[#0B1F4D] text-white py-4 rounded-xl font-bold text-lg hover:bg-[#071533] shadow-lg shadow-[#0B1F4D]/20 transition-all duration-300 transform hover:-translate-y-1 mt-4">
                      Submit Application
                    </button>
                  </form>
               </div>
            </div>

            {/* FAQs */}
            <div>
              <h3 className="text-3xl font-extrabold text-[#0B1F4D] mb-8">Frequently Asked Questions</h3>
              <div className="space-y-4">
                {FAQS.map((faq, idx) => (
                  <div key={idx} className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                    <button 
                      onClick={() => setOpenFaq(openFaq === idx ? -1 : idx)}
                      className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none"
                    >
                      <span className="font-bold text-[#0B1F4D] pr-4">{faq.q}</span>
                      <ChevronDown size={20} className={`text-[#F8B400] transform transition-transform duration-300 flex-shrink-0 ${openFaq === idx ? 'rotate-180' : ''}`} />
                    </button>
                    <div 
                      className={`px-6 overflow-hidden transition-all duration-300 ease-in-out ${openFaq === idx ? 'max-h-48 pb-5 opacity-100' : 'max-h-0 opacity-0'}`}
                    >
                      <p className="text-gray-600 text-sm">{faq.a}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Direct Contact Info Card */}
              <div className="mt-10 bg-[#0B1F4D] rounded-2xl p-6 md:p-8 flex flex-col sm:flex-row items-center gap-6 justify-between text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#F8B400] rounded-bl-full opacity-10 pointer-events-none"></div>
                <div>
                  <h4 className="text-lg font-bold mb-1">Need immediate help?</h4>
                  <p className="text-gray-300 text-sm">Call our admission helpline now.</p>
                </div>
                <a href="tel:+919876543210" className="bg-[#F8B400] text-[#0B1F4D] px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-white transition-colors shrink-0 whitespace-nowrap shadow-lg">
                  <Phone size={20} /> +91 98765 43210
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#051024] text-white pt-20 pb-10 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            
            {/* Brand */}
            <div className="lg:col-span-1">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-[#F8B400] flex items-center justify-center">
                  <Wrench size={24} className="text-[#0B1F4D]" />
                </div>
                <div>
                  <h2 className="text-xl font-bold tracking-tight leading-tight">KARTIK</h2>
                  <p className="text-[10px] text-[#F8B400] font-semibold tracking-widest uppercase">Enterprises & Institute</p>
                </div>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed mb-6">
                India's premier institute for practical appliance repair training. Building careers and creating entrepreneurs since 2010.
              </p>
              <div className="flex gap-4">
                <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-[#F8B400] hover:text-[#0B1F4D] transition-colors"><FacebookIcon size={18} /></a>
                <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-[#F8B400] hover:text-[#0B1F4D] transition-colors"><TwitterIcon size={18} /></a>
                <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-[#F8B400] hover:text-[#0B1F4D] transition-colors"><InstagramIcon size={18} /></a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-bold mb-6 text-white border-b border-white/10 pb-2 inline-block">Quick Links</h4>
              <ul className="space-y-3">
                {['About Institute', 'All Courses', 'Placement Record', 'Student Gallery', 'Contact Us'].map((link, i) => (
                  <li key={i}>
                    <a href="#" className="text-gray-400 hover:text-[#F8B400] transition-colors flex items-center gap-2 text-sm">
                      <ChevronRight size={14} /> {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Courses */}
            <div>
              <h4 className="text-lg font-bold mb-6 text-white border-b border-white/10 pb-2 inline-block">Top Courses</h4>
              <ul className="space-y-3">
                {['AC Repairing Course', 'Refrigerator Repair', 'Washing Machine', 'Microwave Oven', 'PCB Repairing'].map((link, i) => (
                  <li key={i}>
                    <a href="#" className="text-gray-400 hover:text-[#F8B400] transition-colors flex items-center gap-2 text-sm">
                      <ChevronRight size={14} /> {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="text-lg font-bold mb-6 text-white border-b border-white/10 pb-2 inline-block">Contact Info</h4>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <MapPin size={20} className="text-[#F8B400] shrink-0 mt-1" />
                  <span className="text-gray-400 text-sm leading-relaxed">123, Tech Plaza, Near Metro Station, New Delhi, 110001</span>
                </li>
                <li className="flex items-center gap-3">
                  <Phone size={20} className="text-[#F8B400] shrink-0" />
                  <a href="tel:+919876543210" className="text-gray-400 hover:text-[#F8B400] text-sm">+91 98765 43210</a>
                </li>
                <li className="flex items-center gap-3">
                  <Mail size={20} className="text-[#F8B400] shrink-0" />
                  <a href="mailto:info@kartikinstitute.com" className="text-gray-400 hover:text-[#F8B400] text-sm">info@kartikinstitute.com</a>
                </li>
              </ul>
            </div>

          </div>
          
          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-500 text-sm">
              © {new Date().getFullYear()} Kartik Enterprises & Institute. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm text-gray-500">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating Action Buttons */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
        {scrolled && (
          <button 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="w-12 h-12 rounded-full bg-white text-[#0B1F4D] shadow-xl flex items-center justify-center hover:bg-gray-100 transition-all transform hover:-translate-y-1 opacity-0 animate-[fadeIn_0.3s_ease-out_forwards]"
            style={{ animationFillMode: 'forwards' }}
          >
            <ChevronDown size={24} className="rotate-180" />
          </button>
        )}
        <a href="https://wa.me/919876543210" target="_blank" rel="noreferrer" className="w-14 h-14 rounded-full bg-[#25D366] text-white shadow-[0_0_20px_rgba(37,211,102,0.4)] flex items-center justify-center hover:bg-[#1EBE5D] transition-all transform hover:-translate-y-1 hover:scale-110">
          <MessageCircle size={28} />
        </a>
      </div>

      {/* Helper component for magnifying glass icon in gallery */}
      <Search className="hidden" /> 
    </div>
  );
}

function Search(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  )
}

function FacebookIcon(props) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width={props.size || 24} height={props.size || 24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
    </svg>
  );
}

function TwitterIcon(props) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width={props.size || 24} height={props.size || 24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/>
    </svg>
  );
}

function InstagramIcon(props) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width={props.size || 24} height={props.size || 24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
    </svg>
  );
}