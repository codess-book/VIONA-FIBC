"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Award, ArrowUpRight, ShieldCheck, Crown } from "lucide-react";
import {
  motion,
  useInView,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";

// ---------- Team Data (all 6 — full bios live on /team) ----------
const teamMembers = [
  {
    name: "Dr. Chintaman Rathore",
    role: "Managing Director",
    image: "/Images/Team/md-chintaman-rathore.jpeg",
    leadership: true,
  },
  {
    name: "Harshad Chauhan",
    role: "General Manager",
    image: "/Images/Team/general-manager-harshad-chauhan.jpeg",
    leadership: false,
  },
  {
    name: "Nikhil Upadhyay",
    role: "Int'l Marketing Manager",
    image: "/Images/Team/intl-marketing-manager-nikhil.jpeg",
    leadership: false,
  },
  {
    name: "Divya Rathore",
    role: "Int'l Marketing Manager",
    image: "/Images/Team/intel-manager-divya-rathore.jpeg",
    leadership: false,
  },
  {
    name: "Sourabh Meena",
    role: "Logistics Head",
    image: "/Images/Team/Logistichead-tarunmeena.jpeg",
    leadership: false,
  },
  {
    name: "Tarun Lodhi",
    role: "Documentation Head",
    image: "/Images/team/documentationHead-Tarun.jpeg",
    leadership: false,
  },
];

// ---------- Certificates Data ----------
const certificates = [
  { name: "ISO 9001:2015", logo: "/Images/certificates/cert2.png" },
  { name: "ISO 14001:2015", logo: "/Images/certificates/certi3.png" },
  { name: "ISO 22000:2018", logo: "/Images/certificates/certi1.png" },
];

// ---------- Compact Team Chip (photo + name + role only) ----------
function TeamChip({
  member,
  index,
}: {
  member: (typeof teamMembers)[0];
  index: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 25 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.45,
        delay: index * 0.08,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="group relative flex flex-col items-center text-center"
    >
      <div className="relative">
        <div
          className={`relative h-24 w-24 sm:h-28 sm:w-28 overflow-hidden rounded-full ring-4 ring-white shadow-md transition-all duration-300 group-hover:scale-105 group-hover:shadow-xl ${
            member.leadership
              ? "border-2 border-amber-400/70"
              : "border-2 border-blue-200/60"
          }`}
        >
          <Image
            src={member.image}
            alt={member.name}
            fill
            className="object-cover"
            sizes="112px"
          />
        </div>

        {member.leadership && (
          <div className="absolute -bottom-1 -right-1 rounded-full bg-slate-900 p-1.5 text-amber-300 shadow-sm">
            <Crown className="h-3 w-3" />
          </div>
        )}
      </div>

      <h3 className="mt-3 text-sm font-semibold text-slate-900 leading-tight">
        {member.name}
      </h3>
      <p className="text-xs text-blue-700 font-medium mt-0.5">{member.role}</p>
    </motion.div>
  );
}

// ---------- Certificate Card ----------
function CertificateCard({
  cert,
  index,
}: {
  cert: (typeof certificates)[0];
  index: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="cert-card group relative flex w-full flex-col items-center gap-4 py-6 transition-all duration-300 hover:-translate-y-1 transform-gpu"
    >
      <div className="relative flex h-72 w-72 sm:h-96 sm:w-96 items-center justify-center rounded-full border-2 border-dashed border-blue-200/80 bg-blue-50/30 transition-colors duration-300 group-hover:border-blue-400 overflow-hidden">
        {/* diagonal shine sweep on hover */}
        <span className="pointer-events-none absolute inset-0 -translate-x-full bg-[linear-gradient(115deg,transparent_35%,rgba(255,255,255,0.85)_50%,transparent_65%)] transition-transform duration-700 ease-out group-hover:translate-x-full" />

        <div className="relative h-60 w-60 sm:h-80 sm:w-80 transition-transform duration-300 group-hover:scale-105">
          <Image
            src={cert.logo}
            alt={cert.name}
            fill
            className="object-contain"
            sizes="(max-width: 640px) 288px, 384px"
          />
        </div>

        <div className="absolute bottom-1 right-1 sm:bottom-2 sm:right-2 rounded-full bg-white p-2 text-blue-600 shadow-md border border-blue-100 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <ShieldCheck className="h-7 w-7" />
        </div>
      </div>

      <p className="text-center text-lg sm:text-xl font-bold text-slate-800 group-hover:text-blue-700 transition-colors mt-2">
        {cert.name}
      </p>
    </motion.div>
  );
}

// ---------- Stitched Seam Divider ----------
function StitchDivider() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-20px" });

  return (
    <div ref={ref} className="relative w-full h-6" aria-hidden="true">
      <svg
        viewBox="0 0 1200 24"
        preserveAspectRatio="none"
        className="absolute inset-0 h-full w-full"
      >
        <motion.line
          x1="0"
          y1="12"
          x2="1200"
          y2="12"
          stroke="rgb(37 99 235 / 0.35)"
          strokeWidth="2"
          strokeDasharray="14 10"
          strokeLinecap="round"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8 }}
        />
      </svg>
    </div>
  );
}

// ---------- Section Title ----------
function SectionTitle({
  children,
  subtitle,
}: {
  children: React.ReactNode;
  subtitle?: string;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5 }}
      className="text-center mb-12"
    >
      {subtitle && (
        <span className="text-xs font-semibold uppercase tracking-[0.25em] text-blue-700">
          {subtitle}
        </span>
      )}
      <h2 className="mt-2 text-3xl md:text-4xl font-bold text-slate-900">
        {children}
      </h2>
    </motion.div>
  );
}

// ---------- The single orchestrated moment: a stitched thread that ----------
// ---------- draws itself under the team row as the section scrolls in ----------
function StitchProgressThread({
  targetRef,
}: {
  targetRef: React.RefObject<HTMLDivElement | null>;
}) {
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start 85%", "end 55%"],
  });
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

  if (prefersReducedMotion) return null;

  return (
    <div
      className="pointer-events-none absolute left-0 right-0 top-1/2 -z-0 hidden md:block"
      aria-hidden="true"
    >
      <motion.div
        style={{ scaleX }}
        className="h-px w-full origin-left bg-[repeating-linear-gradient(90deg,rgb(37_99_235/0.4)_0,rgb(37_99_235/0.4)_10px,transparent_10px,transparent_18px)]"
      />
    </div>
  );
}

export default function TeamAndCertificatesPage() {
  const teamRowRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="relative min-h-screen bg-white overflow-hidden">
      {/* ---------- Woven texture backdrop ---------- */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        {/* fine grain, static (perf-safe) */}
        <svg
          className="absolute inset-0 h-full w-full opacity-[0.05] mix-blend-multiply"
          aria-hidden="true"
        >
          <filter id="viona-grain">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.85"
              numOctaves="2"
              stitchTiles="stitch"
            />
            <feColorMatrix type="saturate" values="0" />
          </filter>
          <rect width="100%" height="100%" filter="url(#viona-grain)" />
        </svg>

        {/* woven crosshatch, slowly drifting like fabric under light */}
        <div
          className="viona-weave absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage: `
              repeating-linear-gradient(45deg, rgba(30,64,175,0.6) 0px, rgba(30,64,175,0.6) 1px, transparent 1px, transparent 10px),
              repeating-linear-gradient(-45deg, rgba(30,64,175,0.6) 0px, rgba(30,64,175,0.6) 1px, transparent 1px, transparent 10px)
            `,
            backgroundSize: "28px 28px",
          }}
        />

        {/* dot texture, subtle breathing drift — full section backdrop */}
        <div
          className="viona-dots absolute inset-0 opacity-[0.14]"
          style={{
            backgroundImage: `radial-gradient(rgba(30, 64, 175, 0.8) 1.6px, transparent 1.6px)`,
            backgroundSize: "24px 24px",
          }}
        />

        <div className="viona-blob-a absolute top-[-10%] left-1/2 -translate-x-1/2 h-[420px] w-[720px] rounded-full bg-blue-500/[0.06] blur-3xl" />
        <div className="viona-blob-b absolute bottom-[8%] right-[6%] h-[380px] w-[520px] rounded-full bg-cyan-400/[0.05] blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-6 lg:px-8 pt-8 pb-12 md:pt-12 md:pb-20">
        {/* ---- 1. TEAM PREVIEW (all 6, compact) ---- */}
        <div className="py-12 md:py-16">
          <SectionTitle subtitle="Leadership & Team">
            The Minds Behind <span className="bg-gradient-to-r from-blue-900 to-blue-500 bg-clip-text text-transparent">VIONA</span>
          </SectionTitle>

          <div ref={teamRowRef} className="relative">
            <StitchProgressThread targetRef={teamRowRef} />
            <div className="relative grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-x-4 gap-y-10">
              {teamMembers.map((member, idx) => (
                <TeamChip key={idx} member={member} index={idx} />
              ))}
            </div>
          </div>

          <div className="mt-12 flex justify-center">
            <Link
              href="/team"
              className="viona-shine-btn group relative inline-flex items-center gap-2 overflow-hidden rounded-xl bg-blue-900 px-6 py-3 text-sm font-semibold text-white shadow-md shadow-blue-900/20 transition-all duration-300 hover:bg-blue-800 hover:shadow-lg hover:shadow-blue-900/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700"
            >
              <span className="relative z-10">Know more about our team</span>
              <ArrowUpRight className="relative z-10 h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              {!prefersReducedMotion && (
                <span
                  className="viona-shine-sweep pointer-events-none absolute inset-0"
                  aria-hidden="true"
                />
              )}
            </Link>
          </div>
        </div>

        <StitchDivider />

        {/* ---- 2. CERTIFICATES ---- */}
        <div className="py-12 md:py-16">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 text-2xl font-semibold uppercase tracking-[0.2em] text-slate-500">
              <Award className="h-4 w-4" />
              Our Certifications & Standards
            </div>
            <p className="mx-auto mt-3 max-w-md text-s text-slate-500">
              Every batch we ship carries the mark of these standards, the same
              way it carries our name.
            </p>
          </div>

          <div className="mx-auto grid max-w-8xl grid-cols-1 gap-6 sm:grid-cols-3 md:gap-10">
            {certificates.map((cert, idx) => (
              <CertificateCard key={idx} cert={cert} index={idx} />
            ))}
          </div>
        </div>
      </div>

      {/* ---------- scoped styles: texture drift + shiny button ---------- */}
      <style jsx>{`
        @keyframes viona-weave-drift {
          from {
            background-position:
              0 0,
              0 0;
          }
          to {
            background-position:
              56px 0,
              -56px 0;
          }
        }
        .viona-weave {
          animation: viona-weave-drift 26s linear infinite;
        }

        @keyframes viona-dots-drift {
          from {
            background-position: 0 0;
          }
          to {
            background-position: 22px 22px;
          }
        }
        .viona-dots {
          animation: viona-dots-drift 40s linear infinite;
        }

        @keyframes viona-blob-a-float {
          0%,
          100% {
            transform: translate(-50%, 0) scale(1);
          }
          50% {
            transform: translate(-50%, 18px) scale(1.04);
          }
        }
        @keyframes viona-blob-b-float {
          0%,
          100% {
            transform: translate(0, 0) scale(1);
          }
          50% {
            transform: translate(-14px, -14px) scale(1.05);
          }
        }
        .viona-blob-a {
          animation: viona-blob-a-float 14s ease-in-out infinite;
        }
        .viona-blob-b {
          animation: viona-blob-b-float 17s ease-in-out infinite;
        }

        .viona-shine-sweep {
          background: linear-gradient(
            110deg,
            transparent 30%,
            rgba(255, 255, 255, 0.55) 48%,
            rgba(255, 255, 255, 0.85) 50%,
            rgba(255, 255, 255, 0.55) 52%,
            transparent 70%
          );
          background-size: 220% 100%;
          background-position: -60% 0;
          animation: viona-shine-loop 3.2s ease-in-out infinite;
        }
        @keyframes viona-shine-loop {
          0% {
            background-position: -60% 0;
          }
          55%,
          100% {
            background-position: 140% 0;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .viona-weave,
          .viona-dots,
          .viona-blob-a,
          .viona-blob-b,
          .viona-shine-sweep {
            animation: none !important;
          }
        }
      `}</style>
    </section>
  );
}
