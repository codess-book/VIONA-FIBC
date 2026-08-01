"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Send, MapPin, Phone, Mail, Globe, User, AtSign, CheckCircle, Loader2, ArrowRight } from "lucide-react";
import dynamic from "next/dynamic";

// Dynamically import the 3D Globe
const World = dynamic(
  () => import("./ui/globe").then((m) => m.World),
  { 
    ssr: false,
    loading: () => (
      <div className="flex h-full w-full items-center justify-center">
        <div className="h-16 w-16 animate-spin rounded-full border-4 border-blue-200 border-t-blue-600" />
      </div>
    )
  }
);

const globeConfig = {
  pointSize: 3,
  globeColor: "#1a2a6c",
  showAtmosphere: true,
  atmosphereColor: "#FFFFFF",
  atmosphereAltitude: 0.15,
  emissive: "#1a2a6c",
  emissiveIntensity: 0.3,
  shininess: 0.6,
  polygonColor: "rgba(255,255,255,0.6)",
  ambientLight: "#38bdf8",
  directionalLeftLight: "#ffffff",
  directionalTopLight: "#ffffff",
  pointLight: "#ffffff",
  arcTime: 0,
  arcLength: 1,
  rings: 0,
  maxRings: 3,
  initialPosition: { lat: 22.3193, lng: 114.1694 },
  autoRotate: true,
  autoRotateSpeed: 0.6,
};

const sampleArcs = [
  {
    order: 1,
    startLat: 28.6139,
    startLng: 77.209,
    endLat: 3.139,
    endLng: 101.6869,
    arcAlt: 0.5,
    color: "#3b82f6",
  },
  {
    order: 2,
    startLat: 51.5072,
    startLng: -0.1276,
    endLat: 22.3193,
    endLng: 114.1694,
    arcAlt: 0.4,
    color: "#06b6d4",
  },
  {
    order: 3,
    startLat: -33.8688,
    startLng: 151.2093,
    endLat: 40.7128,
    endLng: -74.006,
    arcAlt: 0.6,
    color: "#6366f1",
  },
  {
    order: 4,
    startLat: 34.0522,
    startLng: -118.2437,
    endLat: 35.6762,
    endLng: 139.6503,
    arcAlt: 0.4,
    color: "#f472b6",
  },
];

// ---------- Form Input Component ----------
function FormInput({ 
  icon: Icon, 
  label, 
  type = "text", 
  placeholder, 
  required = false,
  value,
  onChange,
  error
}: { 
  icon: any; 
  label: string; 
  type?: string; 
  placeholder: string; 
  required?: boolean;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  error?: string;
}) {
  const isTextarea = type === "textarea";
  
  return (
    <div className="relative z-10">
      <label className="flex items-center gap-1.5 text-[10px] sm:text-xs font-medium text-slate-700">
        <Icon className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-blue-500" /> 
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      {isTextarea ? (
        <textarea
          rows={3}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={`mt-1 w-full rounded-lg border ${
            error ? 'border-red-300 bg-red-50' : 'border-slate-200 bg-slate-50'
          } px-3 py-2 sm:py-2.5 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all resize-none`}
        />
      ) : (
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={`mt-1 w-full rounded-lg border ${
            error ? 'border-red-300 bg-red-50' : 'border-slate-200 bg-slate-50'
          } px-3 py-2 sm:py-2.5 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all`}
        />
      )}
      {error && (
        <p className="mt-1 text-[10px] text-red-500">{error}</p>
      )}
    </div>
  );
}

// ---------- Animated Background Elements ----------
function BackgroundElements() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {/* Premium Gradient Mesh */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `
              radial-gradient(circle at 20% 50%, rgba(59,130,246,0.3) 0%, transparent 50%),
              radial-gradient(circle at 80% 50%, rgba(6,182,212,0.2) 0%, transparent 50%),
              radial-gradient(circle at 50% 20%, rgba(99,102,241,0.1) 0%, transparent 40%)
            `,
          }}
        />
      </div>

      {/* Floating Particles */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute h-1 w-1 rounded-full bg-blue-400/20"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, 20, 0],
            opacity: [0.2, 0.6, 0.2],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: 5 + Math.random() * 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: Math.random() * 2,
          }}
        />
      ))}

      {/* Soft Glow Orbs */}
      <motion.div
        className="absolute -top-32 -left-32 h-[400px] w-[400px] rounded-full bg-blue-500/10 blur-3xl"
        animate={{ 
          x: [0, 50, 0], 
          y: [0, 30, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -bottom-32 -right-32 h-[400px] w-[400px] rounded-full bg-cyan-400/10 blur-3xl"
        animate={{ 
          x: [0, -50, 0], 
          y: [0, -30, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[300px] w-[300px] rounded-full bg-blue-400/5 blur-3xl"
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Diagonal Light Rays */}
      <div className="absolute inset-0 opacity-[0.04]">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            repeating-linear-gradient(
              45deg,
              transparent 0px,
              transparent 100px,
              rgba(59,130,246,0.3) 100px,
              rgba(59,130,246,0.3) 101px,
              transparent 101px,
              transparent 200px
            ),
            repeating-linear-gradient(
              -45deg,
              transparent 0px,
              transparent 100px,
              rgba(6,182,212,0.2) 100px,
              rgba(6,182,212,0.2) 101px,
              transparent 101px,
              transparent 200px
            )
          `,
        }} />
      </div>
    </div>
  );
}

export default function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });
  
  const [isMobile, setIsMobile] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [formErrors, setFormErrors] = useState<{[key: string]: string}>({});

  // Check if mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (formErrors[name]) {
      setFormErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  // Validate form
  const validateForm = () => {
    const errors: {[key: string]: string} = {};
    if (!formData.name.trim()) errors.name = 'Name is required';
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Email is invalid';
    }
    if (!formData.phone.trim()) errors.phone = 'Phone is required';
    if (!formData.message.trim()) errors.message = 'Message is required';
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Handle form submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setIsSubmitted(true);
    setFormData({ name: '', email: '', phone: '', message: '' });
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-gradient-to-b from-white via-blue-50/20 to-white py-16 sm:py-20 md:py-28"
    >
      {/* Background Elements */}
      <BackgroundElements />

      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-14 xl:gap-16">
          
          {/* ---- LEFT: Form ---- */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.span 
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 text-[0.6rem] sm:text-[0.7rem] font-semibold uppercase tracking-[0.25em] sm:tracking-[0.3em] text-blue-700"
            >
              <span className="h-px w-6 sm:w-8 bg-gradient-to-r from-blue-700 to-transparent" />
              Get in Touch
            </motion.span>

            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 }}
              className="mt-3 sm:mt-4 text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900"
            >
              Let&apos;s{" "}
              <span className="bg-gradient-to-r from-blue-900 via-blue-600 to-blue-500 bg-clip-text text-transparent">
                Connect.
              </span>
            </motion.h2>

            <motion.div
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : {}}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="mt-3 sm:mt-4 h-[2px] sm:h-[3px] w-16 sm:w-20 rounded-full bg-gradient-to-r from-blue-900 to-blue-500"
            />

            <motion.p 
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.3 }}
              className="mt-3 sm:mt-4 text-xs sm:text-sm md:text-base text-slate-600"
            >
              Reach out to us for bulk packaging inquiries. We respond within 24 hours.
            </motion.p>

            {/* ---- Premium Form with Glass Effect ---- */}
            <motion.form
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
              onSubmit={handleSubmit}
              className="relative mt-4 sm:mt-6 space-y-3 sm:space-y-4 rounded-2xl border border-blue-200/30 bg-white/80 backdrop-blur-xl p-4 sm:p-6 shadow-2xl shadow-blue-900/5"
            >
              {/* Glass Reflection */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/40 via-transparent to-transparent pointer-events-none" />
              
              {/* Success Message */}
              <AnimatePresence>
                {isSubmitted && (
                  <motion.div
                    initial={{ opacity: 0, y: -20, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="absolute inset-x-4 top-4 z-20 rounded-xl bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 p-4 shadow-lg"
                  >
                    <div className="flex items-center gap-3">
                      <div className="rounded-full bg-green-100 p-1">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                      </div>
                      <p className="text-xs sm:text-sm font-medium text-green-700">
                        Message sent successfully! We'll get back to you soon.
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <FormInput
                  icon={User}
                  label="Full Name"
                  type="text"
                  placeholder="John Doe"
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                  error={formErrors.name}
                />
                <FormInput
                  icon={AtSign}
                  label="Email"
                  type="email"
                  placeholder="john@example.com"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  error={formErrors.email}
                />
              </div>

              <FormInput
                icon={Phone}
                label="Phone Number"
                type="tel"
                placeholder="+91 98765 43210"
                required
                value={formData.phone}
                onChange={handleInputChange}
                error={formErrors.phone}
              />

              <FormInput
                icon={MapPin}
                label="Message"
                type="textarea"
                placeholder="Tell us about your packaging needs..."
                required
                value={formData.message}
                onChange={handleInputChange}
                error={formErrors.message}
              />

              {/* ---- Moving Border Button ---- */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                type="submit"
                disabled={isSubmitting}
                className="relative z-10 group w-full overflow-hidden rounded-xl bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 px-6 py-3 sm:py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-900/30 transition-all duration-300 hover:shadow-blue-900/50 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {/* Moving Border Animation */}
                <span className="absolute inset-0 -z-10">
                  <span className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-spin-slow" />
                  <span className="absolute inset-[2px] rounded-xl bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900" />
                </span>
                
                {/* Shine Effect */}
                <span className="absolute inset-0 -z-10 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                
                <span className="relative z-10 flex items-center justify-center gap-2">
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message
                      <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </>
                  )}
                </span>
              </motion.button>
            </motion.form>

            <motion.div 
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.6 }}
              className="mt-4 sm:mt-5 flex flex-wrap gap-2 sm:gap-3 text-[10px] sm:text-xs text-slate-600"
            >
              <a href="mailto:info@viona.com" className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-50/80 border border-slate-200/50 hover:border-blue-300 hover:bg-blue-50/50 transition-all duration-300">
                <Mail className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-blue-500" /> 
                <span className="text-slate-700">info@viona.com</span>
              </a>
              <a href="tel:+917992392070" className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-50/80 border border-slate-200/50 hover:border-blue-300 hover:bg-blue-50/50 transition-all duration-300">
                <Phone className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-blue-500" /> 
                <span className="text-slate-700">+91 79923 92070</span>
              </a>
              <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-50/80 border border-slate-200/50">
                <MapPin className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-blue-500" /> 
                <span className="text-slate-700">Gujarat, India</span>
              </span>
            </motion.div>
          </motion.div>

          {/* ---- RIGHT: 3D Globe ---- */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="relative flex items-center justify-center mt-6 lg:mt-0"
          >
            <div className="relative w-full max-w-xs sm:max-w-sm md:max-w-md aspect-square">
              {/* Globe Placeholder on Mobile */}
              {isMobile ? (
                <div className="flex h-full w-full items-center justify-center rounded-full bg-gradient-to-br from-blue-50 to-blue-100/50 border-2 border-blue-200/30 shadow-xl">
                  <div className="text-center p-6">
                    <div className="relative mx-auto mb-4">
                      <div className="absolute inset-0 rounded-full bg-blue-500/20 blur-xl animate-pulse" />
                      <Globe className="h-20 w-20 text-blue-400/60 mx-auto relative z-10" />
                    </div>
                    <p className="text-sm font-semibold text-slate-700">Global Presence</p>
                    <div className="flex items-center justify-center gap-2 mt-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-green-400 animate-pulse" />
                      <p className="text-[10px] text-slate-500">Trusted in 50+ Countries</p>
                    </div>
                  </div>
                </div>
              ) : (
                <>
                  <div className="absolute inset-0 rounded-full bg-blue-500/10 blur-3xl animate-pulse" />
                  <World data={sampleArcs} globeConfig={globeConfig} />
                </>
              )}

              {/* Global Presence Badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.6, duration: 0.5 }}
                className={`absolute ${
                  isMobile ? 'top-4' : 'top-6'
                } left-1/2 -translate-x-1/2 rounded-full border border-blue-200/30 bg-white/90 backdrop-blur-xl px-3 py-1.5 sm:px-5 sm:py-2 shadow-lg shadow-blue-900/10`}
              >
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <div className="relative">
                    <Globe className="h-3 w-3 sm:h-4 sm:w-4 text-blue-700" />
                    <span className="absolute -top-0.5 -right-0.5 h-1.5 w-1.5 rounded-full bg-green-400 animate-pulse" />
                  </div>
                  <span className="text-[8px] sm:text-[10px] font-semibold uppercase tracking-[0.12em] sm:tracking-[0.15em] text-blue-900 whitespace-nowrap">
                    Global Presence
                  </span>
                </div>
              </motion.div>

              {/* Bottom Text */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ delay: 0.8 }}
                className="absolute -bottom-4 sm:-bottom-6 left-1/2 -translate-x-1/2 text-center"
              >
                <p className="text-[8px] sm:text-[10px] font-medium uppercase tracking-[0.12em] sm:tracking-[0.15em] text-blue-700/60 whitespace-nowrap">
                  Trusted in 50+ Countries
                </p>
                <div className="flex items-center justify-center gap-1 mt-1">
                  {[...Array(5)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="h-1 w-1 rounded-full bg-blue-400/30"
                      animate={{ scale: [1, 1.5, 1] }}
                      transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
                    />
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      <style jsx>{`
        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        .animate-spin-slow {
          animation: spin-slow 3s linear infinite;
        }
      `}</style>
    </section>
  );
}