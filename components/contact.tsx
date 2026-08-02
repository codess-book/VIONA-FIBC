"use client";

import React, { useRef } from "react";
import { motion, useInView } from "motion/react";
import { Send, MapPin, Phone, Mail, Globe, User, AtSign } from "lucide-react";
import dynamic from "next/dynamic";

// Dynamically import the 3D Globe
const World = dynamic(
  () => import("./ui/globe").then((m) => m.World),
  { ssr: false }
);

const globeConfig = {
  pointSize: 4,
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
  autoRotateSpeed: 0.8,
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

// ---------- Animated Network Line Component ----------
function AnimatedNetworkLine({ delay = 0, reverse = false }: { delay?: number; reverse?: boolean }) {
  return (
    <div className="absolute w-full h-full pointer-events-none overflow-hidden opacity-[0.12]">
      {/* Horizontal Line */}
      <motion.div
        className={`absolute h-[2px] bg-gradient-to-r ${reverse ? 'from-blue-500 to-transparent' : 'from-transparent to-blue-500'} top-[30%] left-0 w-full`}
        initial={{ x: reverse ? '0%' : '-100%' }}
        animate={{ x: reverse ? '-100%' : '100%' }}
        transition={{ duration: 6, repeat: Infinity, ease: 'linear', delay }}
      >
        {/* Dot moving on line */}
        <motion.div
          className={`absolute h-3 w-3 rounded-full bg-blue-400/80 shadow-[0_0_15px_rgba(96,165,250,0.6)] ${reverse ? 'right-0' : 'left-0'}`}
          animate={{ x: reverse ? ['0%', '100%'] : ['0%', '100%'] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'linear', delay }}
        />
      </motion.div>
    </div>
  );
}

// ---------- Glowing Node Component ----------
function GlowingNode({ top, left, delay }: { top: string; left: string; delay: number }) {
  return (
    <motion.div
      className={`absolute h-5 w-5 rounded-full bg-blue-400/20 border border-blue-500/30`}
      style={{ top, left }}
      animate={{
        scale: [1, 1.8, 1],
        opacity: [0.3, 0.8, 0.3],
      }}
      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay }}
    >
      <div className="absolute inset-0 m-auto h-1.5 w-1.5 rounded-full bg-blue-500 animate-pulse" />
    </motion.div>
  );
}

export default function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-white py-20 md:py-28"
    >
      {/* ---- ANIMATED TECH NETWORK BACKGROUND ---- */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        
        {/* 1. Dotted flowing lines (Horizontal & Diagonal) */}
        {/* <AnimatedNetworkLine delay={0} />
        <AnimatedNetworkLine delay={2} reverse={true} />
        <AnimatedNetworkLine delay={4} /> */}
        
        {/* 2. Additional Diagonal flowing dotted line */}
        {/* <motion.div
          className="absolute w-[200%] h-[2px] bg-gradient-to-r from-transparent via-blue-400/30 to-transparent rotate-[-30deg] top-[60%] -left-[50%]"
          initial={{ x: '-50%' }}
          animate={{ x: '50%' }}
          transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
        >
          <motion.div
            className="absolute h-3 w-3 rounded-full bg-blue-400/60 shadow-[0_0_20px_rgba(96,165,250,0.5)] left-0"
            animate={{ x: ['0%', '100%'] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
          />
        </motion.div> */}

        {/* 3. Arrow indicators moving along paths */}
        {/* <motion.div
          className="absolute text-blue-400/20"
          animate={{
            x: ['0%', '80%', '0%'],
            y: ['0%', '20%', '0%'],
            rotate: [0, 45, 0],
            scale: [1, 1.2, 1]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          style={{ top: '20%', left: '10%' }}
        >
          <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </motion.div> */}

        {/* <motion.div
          className="absolute text-blue-400/20"
          animate={{
            x: ['0%', '-60%', '0%'],
            y: ['0%', '-30%', '0%'],
            rotate: [0, -45, 0],
            scale: [1, 1.3, 1]
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          style={{ bottom: '30%', right: '15%' }}
        >
          <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </motion.div> */}

        {/* 4. Glowing Network Nodes */}
        {/* <GlowingNode top="15%" left="15%" delay={0} />
        <GlowingNode top="70%" left="25%" delay={1.5} />
        <GlowingNode top="30%" left="85%" delay={3} />
        <GlowingNode top="85%" left="75%" delay={2} /> */}

        {/* 5. Soft Background Blue Blobs */}
        <motion.div
          className="absolute -top-32 -left-32 h-[400px] w-[400px] rounded-full bg-blue-900/5 blur-3xl"
          animate={{ x: [0, 60, 0], y: [0, 40, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -bottom-32 -right-32 h-[400px] w-[400px] rounded-full bg-blue-600/5 blur-3xl"
          animate={{ x: [0, -50, 0], y: [0, -30, 0] }}
          transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-14 xl:gap-16">
          
          {/* ---- LEFT: Form ---- */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-2 text-[0.7rem] font-semibold uppercase tracking-[0.3em] text-blue-700">
              <span className="h-px w-8 bg-blue-700" />
              Get in Touch
            </span>

            <h2 className="mt-4 text-4xl font-bold text-slate-900 sm:text-5xl">
              Let’s{" "}
              <span className="bg-gradient-to-r from-blue-900 to-blue-500 bg-clip-text text-transparent">
                Connect.
              </span>
            </h2>

            <motion.div
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : {}}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="mt-4 h-[3px] w-20 rounded-full bg-gradient-to-r from-blue-900 to-blue-500"
            />

            <p className="mt-4 text-base text-slate-600">
              Reach out to us for bulk packaging inquiries. We respond within 24 hours.
            </p>

            {/* ---- Premium Form ---- */}
            <motion.form
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative mt-6 space-y-4 rounded-xl border border-blue-200/30 bg-white/90 p-5 shadow-lg shadow-blue-900/5"
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-blue-400/5 via-transparent to-blue-400/5 pointer-events-none rounded-xl"
                animate={{ opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              />

              <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="flex items-center gap-1.5 text-xs font-medium text-slate-700">
                    <User className="h-3 w-3 text-blue-500" /> Full Name
                  </label>
                  <input
                    type="text"
                    placeholder="John Doe"
                    className="mt-1 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  />
                </div>
                <div>
                  <label className="flex items-center gap-1.5 text-xs font-medium text-slate-700">
                    <AtSign className="h-3 w-3 text-blue-500" /> Email
                  </label>
                  <input
                    type="email"
                    placeholder="john@example.com"
                    className="mt-1 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  />
                </div>
              </div>

              <div className="relative z-10">
                <label className="flex items-center gap-1.5 text-xs font-medium text-slate-700">
                  <Phone className="h-3 w-3 text-blue-500" /> Phone Number
                </label>
                <input
                  type="tel"
                  placeholder="+91 98765 43210"
                  className="mt-1 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                />
              </div>

              <div className="relative z-10">
                <label className="flex items-center gap-1.5 text-xs font-medium text-slate-700">
                  <MapPin className="h-3 w-3 text-blue-500" /> Message / Address
                </label>
                <textarea
                  rows={3}
                  placeholder="Tell us about your packaging needs or delivery address..."
                  className="mt-1 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 resize-none"
                />
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                type="submit"
                className="relative z-10 flex w-full items-center justify-center gap-2 rounded-lg bg-blue-900 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-900/20 transition-all duration-300 hover:bg-blue-800 hover:shadow-blue-900/30"
              >
                Send Message <Send className="h-4 w-4" />
              </motion.button>
            </motion.form>

            <div className="mt-5 flex flex-wrap gap-3 text-xs text-slate-600">
              <a href="mailto:info@viona.com" className="flex items-center gap-1.5 hover:text-blue-700">
                <Mail className="h-3.5 w-3.5" /> info@viona.com
              </a>
              <span className="text-slate-300">|</span>
              <a href="tel:+917992392070" className="flex items-center gap-1.5 hover:text-blue-700">
                <Phone className="h-3.5 w-3.5" /> +91 79923 92070
              </a>
              <span className="text-slate-300">|</span>
              <span className="flex items-center gap-1.5">
                <MapPin className="h-3.5 w-3.5" /> Gujarat, India
              </span>
            </div>
          </motion.div>

          {/* ---- RIGHT: 3D Globe ---- */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="relative flex items-center justify-center"
          >
            <div className="relative w-full max-w-md aspect-square">
              <div className="absolute inset-0 rounded-full bg-blue-500/10 blur-3xl animate-pulse" />
              <World data={sampleArcs} globeConfig={globeConfig} />

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.6, duration: 0.5 }}
                className="absolute top-6 left-1/2 -translate-x-1/2 rounded-full border border-blue-200/30 bg-white/80 px-5 py-1.5 backdrop-blur-md shadow-lg"
              >
                <div className="flex items-center gap-1.5">
                  <Globe className="h-4 w-4 text-blue-700" />
                  <span className="text-[10px] font-semibold uppercase tracking-[0.15em] text-blue-900">
                    Global Presence
                  </span>
                </div>
              </motion.div>

              <p className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-center text-[10px] font-medium uppercase tracking-[0.15em] text-blue-700/60">
                Trusted in 50+ Countries
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}