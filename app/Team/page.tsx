// app/team/page.tsx
"use client";

import React, { useRef, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import {
  ArrowUpRight,
  Mail,
  Watch,
  Phone,
  Users,
  Award,
  Briefcase,
  MapPin,
  Crown,
  Sparkles,
  Clock,
  ChevronRight,
} from "lucide-react";

// --- Team Data ---
const teamMembers = [
  {
    name: "Dr. Chintaman Rathore",
    role: "Managing Director",
    leadership: false,
    bio: "A distinguished orator and doctorate holder, Dr. Rathore brings decades of cross-industry experience to VIONA and maintains close, hands-on engagement with every level of the organisation.",
    email: "info@vionafibc.com",
    phone: "+91 9009177118",
    image: "/Images/Team/md-chintaman-rathore.jpeg",
    gradient: "from-amber-500 to-orange-500",
    bgGradient: "from-amber-50/80 to-orange-50/80",
  },
  {
    name: "Harshad Chauhan",
    role: "General Manager",
    leadership: false,
    bio: "Operations expert ensuring seamless manufacturing processes and delivering premium quality FIBC solutions to global clients.",
    email: "harshad@vionafibc.com",
    phone: "+91 7354712121",
    image: "/Images/Team/general-manager-harshad-chauhan.jpeg",
    gradient: "from-blue-600 to-cyan-500",
    bgGradient: "from-blue-50/80 to-cyan-50/80",
  },
  {
    name: "Nikhil Upadhyay",
    role: "Int'l Marketing Manager",
    leadership: false,
    bio: "Nikhil brings deep expertise in export marketing, with his team leading business development across Europe, the USA and the Middle East.",
    email: "marketing@vionafibc.com",
    phone: "+91 7992392070",
    image: "/Images/Team/intl-marketing-manager-nikhil.jpeg",
    gradient: "from-emerald-500 to-teal-400",
    bgGradient: "from-emerald-50/80 to-teal-50/80",
  },
  {
    name: "Divya Rathore",
    role: "Int'l Marketing Manager",
    leadership: false,
    bio: "Building strong client relationships and delivering customised FIBC solutions for diverse industrial applications worldwide.",
    email: "sales@vionafibc.com",
    phone: "+91 7974993209",
    image: "/Images/Team/intel-manager-divya-rathore.jpeg",
    gradient: "from-purple-500 to-pink-400",
    bgGradient: "from-purple-50/80 to-pink-50/80",
  },
  {
    name: "Sourabh Meena",
    role: "Logistics Head",
    leadership: false,
    bio: "Streamlining supply chain operations to ensure timely delivery and efficient logistics for VIONA's global clientele.",
    email: "sourabh.meena@vionafibc.com",
    phone: "+91 9399060851",
    image: "/Images/Team/Logistichead-tarunmeena.jpeg",
    gradient: "from-red-500 to-orange-400",
    bgGradient: "from-red-50/80 to-orange-50/80",
  },
  {
    name: "Tarun Lodhi",
    role: "Documentation Head",
    leadership: false,
    bio: "Managing export documentation and compliance, ensuring seamless international trade operations for VIONA-FIBC.",
    email: "aditi.rathore@vionafibc.com",
    phone: "+91 7441149831",
    image: "/Images/Team/documentationHead-Tarun.jpeg",
    gradient: "from-indigo-500 to-blue-400",
    bgGradient: "from-indigo-50/80 to-blue-50/80",
  },
];

const getInitials = (name: string) =>
  name
    .split(" ")
    .map((word) => word.charAt(0))
    .join("")
    .toUpperCase()
    .slice(0, 2);

// --- Stats ---
const stats = [
//   { icon: Award, label: "Quality Management", value: "ISO 9001:2015" },
  { icon: Watch, label: "Years of Experience", value: "67+" },
  { icon: Users, label: "Our Employees", value: "500+" },
  { icon: Briefcase, label: "Best Quality", value: "Premium" },
];

// --- Floating Particles Component ---
const FloatingParticles = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      opacity: number;
    }> = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const initParticles = () => {
      particles = [];
      const count = Math.min(
        50,
        Math.floor((canvas.width * canvas.height) / 25000),
      );
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.2,
          vy: (Math.random() - 0.5) * 0.2,
          radius: Math.random() * 2 + 1,
          opacity: Math.random() * 0.15 + 0.05,
        });
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(37, 99, 235, ${p.opacity})`;
        ctx.fill();
      });

      // Draw connecting lines
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(37, 99, 235, ${0.04 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      requestAnimationFrame(animate);
    };

    resize();
    initParticles();
    animate();

    window.addEventListener("resize", () => {
      resize();
      initParticles();
    });

    return () => window.removeEventListener("resize", resize);
  }, []);

  return (
    <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" />
  );
};

// --- Animated Background Orbs ---
const AnimatedOrbs = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <motion.div
        className="absolute -top-40 -right-40 h-[600px] w-[600px] rounded-full bg-blue-400/10 blur-3xl"
        animate={{
          x: [0, 30, -20, 0],
          y: [0, -20, 30, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute -bottom-40 -left-40 h-[600px] w-[600px] rounded-full bg-amber-400/10 blur-3xl"
        animate={{
          x: [0, -30, 20, 0],
          y: [0, 30, -20, 0],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[500px] rounded-full bg-blue-500/5 blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.5, 1, 0.5],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  );
};

// --- Team Card Component ---
function TeamCard({
  member,
  index,
  isInView,
}: {
  member: (typeof teamMembers)[0];
  index: number;
  isInView: boolean;
}) {
  const cardRef = useRef<HTMLDivElement>(null);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{
        duration: 0.6,
        delay: index * 0.06,
        ease: [0.21, 0.47, 0.32, 0.98],
      }}
      className="group"
    >
      <div className="relative h-full rounded-2xl bg-white/90 backdrop-blur-sm border border-slate-200/60 shadow-sm shadow-slate-900/5 transition-all duration-500 hover:-translate-y-2 hover:shadow-xl hover:shadow-slate-900/10 overflow-hidden flex flex-col">
        {/* Background gradient on hover */}
        <div
          className={`absolute inset-0 bg-gradient-to-br ${member.bgGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
        />

        {/* Top accent bar */}
        <div
          className={`absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r ${member.gradient} scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left`}
        />

        {/* Leadership badge */}
        {member.leadership && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.4, delay: index * 0.06 + 0.3 }}
            className="absolute top-4 right-4 z-20 inline-flex items-center gap-1 rounded-full bg-slate-900 px-2.5 py-1 text-[10px] font-semibold text-amber-300 shadow-sm"
          >
            <Crown className="h-3 w-3" />
            Leadership
          </motion.div>
        )}

        <div className="relative z-10 flex flex-col items-center text-center flex-1 px-5 sm:px-7 pt-8 pb-6">
          {/* Avatar */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{
              duration: 0.5,
              delay: index * 0.06 + 0.15,
              ease: [0.21, 0.47, 0.32, 0.98],
            }}
            className="relative mb-4"
          >
            <div
              className={`w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-gradient-to-br ${member.gradient} p-[3px] shadow-lg group-hover:shadow-xl transition-all duration-500`}
            >
              <div className="w-full h-full rounded-full bg-white p-1">
                <div className="w-full h-full rounded-full overflow-hidden flex items-center justify-center bg-slate-50">
                  {member.image ? (
                    <Image
                      src={member.image}
                      alt={member.name}
                      width={128}
                      height={128}
                      className="w-full h-full object-cover"
                      priority={index < 2}
                    />
                  ) : (
                    <span className="text-2xl font-semibold text-slate-700">
                      {getInitials(member.name)}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Glow ring */}
            <div
              className={`absolute inset-0 rounded-full bg-gradient-to-br ${member.gradient} opacity-0 group-hover:opacity-25 blur-xl transition-opacity duration-500 -z-10`}
            />

            {/* Status dot */}
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.3, delay: index * 0.06 + 0.4 }}
              className="absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full bg-emerald-400 border-2 border-white shadow-sm"
            >
              <div className="absolute inset-0 rounded-full bg-emerald-400 animate-ping opacity-75" />
            </motion.div>
          </motion.div>

          {/* Name */}
          <h3 className="text-base sm:text-lg font-semibold text-slate-900 group-hover:text-blue-700 transition-colors duration-300">
            {member.name}
          </h3>

          {/* Role pill */}
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.3, delay: index * 0.06 + 0.2 }}
            className={`mt-2 mb-3 inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r ${member.gradient} px-3.5 py-1 text-xs font-semibold text-white shadow-sm`}
          >
            {member.leadership && <Crown className="h-3 w-3" />}
            {member.role}
          </motion.span>

          {/* Bio */}
          <p className="text-sm text-slate-600 leading-relaxed max-w-xs mx-auto flex-1">
            {member.bio}
          </p>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4, delay: index * 0.06 + 0.35 }}
            className="mt-5 pt-4 border-t border-slate-200/70 w-full flex flex-col items-center gap-2"
          >
            <a
              href={`mailto:${member.email}`}
              className={`inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r ${member.gradient} px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-all duration-300 hover:shadow-md hover:brightness-105 hover:-translate-y-0.5`}
            >
              <Mail size={14} />
              <span className="truncate text-xs sm:text-sm">
                {member.email}
              </span>
            </a>
            <a
              href={`tel:${member.phone}`}
              className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-500 hover:text-slate-800 transition-colors duration-300"
            >
              <Phone size={12} />
              {member.phone}
            </a>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

// --- Stats Row Component ---
function StatsRow({ isInView }: { isInView: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.3 }}
      className="grid grid-cols-2 sm:grid-cols-4 gap-4 lg:border-l lg:border-slate-200/70 lg:pl-10"
    >
      {stats.map((stat, idx) => (
        <motion.div
          key={idx}
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4, delay: 0.4 + idx * 0.08 }}
        >
          <div className="flex items-center gap-1.5 text-slate-500">
            <stat.icon className="h-3.5 w-3.5" />
            <p className="text-xs">{stat.label}</p>
          </div>
          <p className="mt-1 text-lg font-semibold text-slate-900">
            {stat.value}
          </p>
        </motion.div>
      ))}
    </motion.div>
  );
}

// --- Main Component ---
export default function TeamPage() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen overflow-hidden bg-gradient-to-b from-slate-50 via-white to-blue-50/30 py-12 sm:py-16 md:py-20 lg:py-28"
    >
      {/* Background */}
      <FloatingParticles />
      <AnimatedOrbs />

      {/* Background textures */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Woven cross-hatch — echoes FIBC fabric */}
        <div
          className="absolute inset-0 opacity-[0.3] sm:opacity-[0.4]"
          style={{
            backgroundImage: `
              repeating-linear-gradient(45deg, rgba(30, 64, 175, 0.06) 0px, rgba(30, 64, 175, 0.06) 1px, transparent 1px, transparent 13px),
              repeating-linear-gradient(-45deg, rgba(30, 64, 175, 0.05) 0px, rgba(30, 64, 175, 0.05) 1px, transparent 1px, transparent 13px)
            `,
          }}
        />

        {/* Fine grain texture */}
        <svg className="absolute inset-0 h-full w-full opacity-[0.04]">
          <filter id="grain">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.9"
              numOctaves="2"
              stitchTiles="stitch"
            />
          </filter>
          <rect width="100%" height="100%" filter="url(#grain)" />
        </svg>

        {/* Gradient masks */}
        <div className="absolute inset-0 bg-gradient-to-b from-white via-transparent to-white" />
        <div className="absolute inset-0 bg-gradient-to-tr from-slate-50 via-transparent to-blue-50/40" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* ==================== HERO ==================== */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] gap-8 lg:gap-12 items-end pb-10 sm:pb-12 lg:pb-14 mb-10 sm:mb-12 lg:mb-16 border-b border-slate-200/70"
        >
          {/* Left: Title */}
          <div>
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="inline-flex items-center gap-2 mt-8 text-blue-700 text-xs sm:text-sm font-medium mb-3 sm:mb-4"
            >
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-blue-600" />
              </span>
              Meet our leadership
            </motion.div>

            <h1 className="text-3xl sm:text-3xl md:text-4xl lg:text-[2.8rem] xl:text-[3.4rem] font-bold text-slate-900 leading-[1.1] tracking-tight">
              The people behind VIONA's
              <span className="block bg-gradient-to-r from-blue-700 via-blue-800 to-blue-800 bg-clip-text text-transparent">
                engineering & packaging standards
              </span>
            </h1>

            <p className="mt-3 sm:mt-4 text-sm sm:text-base lg:text-lg text-slate-600 max-w-xl leading-relaxed">
              A team of experienced specialists overseeing manufacturing, export
              and client relationships for industries worldwide.
            </p>
          </div>

          {/* Right: Stats */}
          <StatsRow isInView={isInView} />
        </motion.div>

        {/* ==================== TEAM GRID ==================== */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 md:gap-7 lg:gap-8">
          {teamMembers.map((member, index) => (
            <TeamCard
              key={member.name}
              member={member}
              index={index}
              isInView={isInView}
            />
          ))}
        </div>

        {/* ==================== CTA ==================== */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-14 sm:mt-16 md:mt-20"
        >
          <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-slate-900 to-blue-950" />

            {/* Texture overlay */}
            <div
              className="absolute inset-0 opacity-[0.35]"
              style={{
                backgroundImage: `
                  repeating-linear-gradient(45deg, rgba(255,255,255,0.03) 0px, rgba(255,255,255,0.03) 1px, transparent 1px, transparent 14px),
                  repeating-linear-gradient(-45deg, rgba(255,255,255,0.03) 0px, rgba(255,255,255,0.03) 1px, transparent 1px, transparent 14px)
                `,
              }}
            />

            {/* Glow orbs */}
            <div className="absolute -top-20 -right-20 h-48 sm:h-64 w-48 sm:w-64 rounded-full bg-blue-500/20 blur-3xl" />
            <div className="absolute -bottom-20 -left-20 h-48 sm:h-64 w-48 sm:w-64 rounded-full bg-amber-500/10 blur-3xl" />

            <div className="relative z-10 px-6 sm:px-8 md:px-12 py-8 sm:py-10 md:py-14 flex flex-col sm:flex-row items-center justify-between gap-5 sm:gap-6">
              <div className="text-center sm:text-left">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.6 }}
                  className="inline-flex items-center gap-1.5 rounded-full bg-blue-500/20 px-3 py-1 text-xs font-medium text-blue-300 border border-blue-400/30 mb-3"
                >
                  <Clock className="h-3.5 w-3.5" />
                  Ready to Connect
                </motion.div>
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white">
                  Ready to discuss your packaging needs?
                </h2>
                <p className="mt-1.5 text-sm text-blue-100/70 max-w-md">
                  Reach our team directly for guidance, quotes or plant visits
                  tailored to your FIBC requirements.
                </p>
              </div>

              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.4, delay: 0.7 }}
                className="shrink-0"
              >
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-xl bg-white px-5 sm:px-6 py-2.5 sm:py-3 text-sm font-semibold text-slate-900 hover:bg-blue-50 transition-all duration-300 shadow-lg shadow-blue-900/30 hover:shadow-blue-900/40 group"
                >
                  Contact us
                  <ChevronRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </motion.div>
            </div>
          </div>
        </motion.div>

        
      </div>
    </section>
  );
}
