"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Award, Mail, ShieldCheck } from "lucide-react";
import { motion, useInView, useAnimation, useReducedMotion } from "framer-motion";

// ---------- Team Data ----------
const teamMembers = [
  {
    name: "Aditi Rathore",
    role: "Director",
    image: "/Images/team/aditi.jpg",
    bio: "Director involved in management committee for every lookout. Responsible for strategic decision-making, board appointments for senior management, and leading international marketing initiatives.",
    isDirector: true,
  },
  {
    name: "Chintaman Rathore",
    role: "Director",
    image: "/Images/team/chintaman.jpg",
    bio: "An orator and doctorate professional with vast experience across all related fields. Known for his flexibility and comfort at every level of management.",
    isDirector: true,
  },
  {
    name: "Nikhil Upadhyay",
    role: "Head of Export Marketing",
    image: "/Images/team/nikhil.jpg",
    bio: "Vast experience in Export Marketing. Expert in handling Europe, USA, and Middle East customers. Overseas business development specialist.",
    isDirector: false,
  },
];

// ---------- Certificates Data ----------
const certificates = [
  { name: "ISO 900:1:2015", logo: "/Images/certificates/cert2.png" },
  { name: "ISO 14001:2015 ", logo: "/Images/certificates/certi3.png" },
  { name: "ISO 22000:2018", logo: "/Images/certificates/certi1.png" },
];


// ---------- Animated Team Card ----------
function TeamCard({ member, index }: { member: typeof teamMembers[0]; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const controls = useAnimation();
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  const getInitialX = () => {
    if (prefersReducedMotion) return 0;
    if (index === 0) return -80;
    if (index === 2) return 80;
    return 0;
  };

  const getInitialY = () => {
    if (prefersReducedMotion) return 0;
    if (index === 1) return 60;
    return 0;
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: {
          opacity: 0,
          x: getInitialX(),
          y: getInitialY(),
          scale: 0.9,
        },
        visible: {
          opacity: 1,
          x: 0,
          y: 0,
          scale: 1,
          transition: {
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1],
            delay: index * 0.15,
          },
        },
      }}
      className={`team-card group relative overflow-hidden rounded-2xl border p-6 text-center backdrop-blur-sm transition-all duration-300 hover:shadow-2xl ${
        member.isDirector
          ? "border-blue-200/50 bg-blue-50/40 hover:border-blue-400 hover:shadow-[0_0_40px_rgba(96,165,250,0.2)]"
          : "border-slate-200 bg-white/85 hover:border-blue-300 hover:shadow-lg"
      }`}
    >
      <div className="card-weave pointer-events-none absolute inset-0 opacity-[0.04]" />

      {member.isDirector && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 + index * 0.15 }}
          className="absolute top-4 right-4 rounded-full bg-blue-900/10 px-2 py-1 text-[10px] font-bold text-blue-700 border border-blue-500/30"
        >
          Leadership
        </motion.div>
      )}

      <div className="relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 + index * 0.15, duration: 0.6 }}
          className="relative mx-auto h-32 w-32 overflow-hidden rounded-full border-2 border-blue-200/60 mb-4 ring-4 ring-white"
        >
          <Image src={member.image} alt={member.name} fill className="object-cover" />
        </motion.div>

        <motion.h3
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 + index * 0.15 }}
          className="text-xl font-bold text-slate-900"
        >
          {member.name}
        </motion.h3>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 + index * 0.15 }}
          className="text-sm font-medium text-blue-700"
        >
          {member.role}
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 + index * 0.15 }}
          className="mt-2 text-xs leading-relaxed text-slate-600 min-h-[60px]"
        >
          {member.bio}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45 + index * 0.15 }}
          className="mt-4 flex justify-center gap-3"
        >
          <Link href="#" className="text-slate-400 hover:text-blue-600 transition-colors">
            <Mail className="h-4 w-4" />
          </Link>
        </motion.div>
      </div>
    </motion.div>
  );
}

// ---------- Animated Certificate Card (redesigned: bigger, clearer, grid-based) ----------
function CertificateCard({ cert, index }: { cert: typeof certificates[0]; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const controls = useAnimation();
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: {
          opacity: 0,
          x: prefersReducedMotion ? 0 : index % 2 === 0 ? -60 : 60,
          y: 20,
          scale: 0.9,
        },
        visible: {
          opacity: 1,
          x: 0,
          y: 0,
          scale: 1,
          transition: {
            duration: 0.7,
            ease: [0.22, 1, 0.36, 1],
            delay: index * 0.12,
          },
        },
      }}
      className="cert-card group relative flex w-full flex-col items-center gap-4 rounded-2xl border border-slate-200 bg-white/90 px-5 py-8 sm:px-8 sm:py-10 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-300 hover:shadow-xl"
    >
      <motion.div
        initial={{ opacity: 0, rotate: -30 }}
        animate={{ opacity: 1, rotate: 0 }}
        transition={{ delay: 0.2 + index * 0.12 }}
        className="relative flex h-28 w-28 sm:h-36 sm:w-36 items-center justify-center rounded-full border-2 border-dashed border-blue-200 bg-blue-50/40 transition-colors duration-300 group-hover:border-blue-400"
      >
        <div className="relative h-24 w-24 sm:h-32 sm:w-32 transition-transform duration-500 group-hover:scale-105">
          <Image src={cert.logo} alt={cert.name} fill className="object-contain" />
        </div>
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 + index * 0.12 }}
        >
          <ShieldCheck className="absolute -bottom-1 -right-1 h-6 w-6 rounded-full bg-white p-1 text-blue-600 shadow-sm opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        </motion.div>
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 + index * 0.12 }}
        className="text-center text-sm font-semibold text-slate-700 group-hover:text-blue-700 transition-colors"
      >
        {cert.name}
      </motion.p>
    </motion.div>
  );
}

// ---------- Stitched Seam Divider ----------
function StitchDivider() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0, scaleX: 0.8 },
        visible: {
          opacity: 1,
          scaleX: 1,
          transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1] },
        },
      }}
      className="relative w-full h-6"
      aria-hidden="true"
    >
      <svg viewBox="0 0 1200 24" preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
        <motion.line
          x1="0"
          y1="12"
          x2="1200"
          y2="12"
          stroke="rgb(37 99 235 / 0.35)"
          strokeWidth="2"
          strokeDasharray="14 10"
          strokeLinecap="round"
          initial={{ strokeDashoffset: 600 }}
          animate={{ strokeDashoffset: 0 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        />
      </svg>
    </motion.div>
  );
}

// ---------- Section Title Animation ----------
function SectionTitle({ children, subtitle }: { children: React.ReactNode; subtitle?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0, y: 30 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
        },
      }}
      className="text-center mb-12"
    >
      {subtitle && (
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-xs font-semibold uppercase tracking-[0.25em] text-blue-700"
        >
          {subtitle}
        </motion.span>
      )}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mt-2 text-3xl md:text-4xl font-bold text-slate-900"
      >
        {children}
      </motion.h2>
    </motion.div>
  );
}

export default function TeamAndCertificatesPage() {
  return (
    <section className="relative min-h-screen bg-white overflow-hidden">
      <div className="pointer-events-none absolute inset-0">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.05 }}
          transition={{ duration: 1.5 }}
          className="weave-layer absolute inset-0"
        />

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.05 }}
          transition={{ duration: 1.8 }}
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(30, 64, 175, 0.5) 1px, transparent 1px),
              linear-gradient(90deg, rgba(30, 64, 175, 0.5) 1px, transparent 1px)
            `,
            backgroundSize: "48px 48px",
          }}
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5 }}
          className="glow-drift-1 absolute top-[-10%] left-1/2 -translate-x-1/2 h-[420px] w-[720px] rounded-full bg-blue-500/[0.07] blur-3xl"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, delay: 0.3 }}
          className="glow-drift-2 absolute bottom-[8%] right-[6%] h-[380px] w-[520px] rounded-full bg-cyan-400/[0.06] blur-3xl"
        />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-6 lg:px-8 pt-8 pb-12 md:pt-12 md:pb-20">
        {/* ---- 1. TEAM ---- */}
        <div className="py-12 md:py-16">
          <SectionTitle subtitle="Leadership & Team">
            The Minds Behind <span className="text-blue-700">VIONA</span>
          </SectionTitle>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {teamMembers.map((member, idx) => (
              <TeamCard key={idx} member={member} index={idx} />
            ))}
          </div>
        </div>

        <StitchDivider />

        {/* ---- 2. CERTIFICATES ---- */}
        <div className="py-12 md:py-16">
          <div className="text-center mb-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.2em] text-slate-500"
            >
              <Award className="h-4 w-4" />
              Our Certifications & Standards
            </motion.div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mx-auto mt-3 max-w-md text-xs text-slate-500"
            >
              Every batch we ship carries the mark of these standards, the same way it carries our name.
            </motion.p>
          </div>

          {/* Mobile: stacked one below another. sm+: clean 3-col row */}
          <div className="mx-auto grid max-w-xs grid-cols-1 gap-4 sm:max-w-3xl sm:grid-cols-3 sm:gap-6 md:gap-8">
            {certificates.map((cert, idx) => (
              <CertificateCard key={idx} cert={cert} index={idx} />
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .weave-layer {
          background-image:
            repeating-linear-gradient(45deg, rgba(30,64,175,0.9) 0px, rgba(30,64,175,0.9) 1px, transparent 1px, transparent 10px),
            repeating-linear-gradient(-45deg, rgba(37,99,235,0.9) 0px, rgba(37,99,235,0.9) 1px, transparent 1px, transparent 10px);
          background-size: 14px 14px;
          animation: weave-drift 40s linear infinite;
        }
        @keyframes weave-drift {
          0%   { background-position: 0 0, 0 0; }
          100% { background-position: 200px 200px, -200px 200px; }
        }

        .card-weave {
          background-image:
            repeating-linear-gradient(45deg, rgba(30,64,175,0.9) 0px, rgba(30,64,175,0.9) 1px, transparent 1px, transparent 8px),
            repeating-linear-gradient(-45deg, rgba(37,99,235,0.9) 0px, rgba(37,99,235,0.9) 1px, transparent 1px, transparent 8px);
          background-size: 10px 10px;
        }

        .glow-drift-1 { animation: float-a 22s ease-in-out infinite; }
        .glow-drift-2 { animation: float-b 26s ease-in-out infinite; }
        @keyframes float-a {
          0%, 100% { transform: translate(-50%, 0) scale(1); }
          50%      { transform: translate(-50%, 30px) scale(1.08); }
        }
        @keyframes float-b {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50%      { transform: translate(-20px, -25px) scale(1.05); }
        }

        @media (prefers-reduced-motion: reduce) {
          .weave-layer,
          .card-weave,
          .glow-drift-1,
          .glow-drift-2 {
            animation: none !important;
          }
        }
      `}</style>
    </section>
  );
}