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

// ---------- Team Data ----------
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
    image: "/Images/Team/documentationHead-Tarun.jpeg",
    leadership: false,
  },
];

// ---------- Certificates Data ----------
const certificates = [
  {
    name: "ISO 9001:2015",
    subtitle: "Quality Management",
    logo: "/Images/certificates/cert2.png",
  },
  {
    name: "ISO 14001:2015",
    subtitle: "Environmental",
    logo: "/Images/certificates/certi3.png",
  },
  {
    name: "ISO 22000:2018",
    subtitle: "Food Safety",
    logo: "/Images/certificates/certi1.png",
  },
];

// ---------- Easing ----------
const EASE_OUT_QUINT = [0.22, 1, 0.36, 1] as const;
const SPRING_SOFT = {
  type: "spring" as const,
  stiffness: 220,
  damping: 24,
  mass: 0.9,
};
const SPRING_SNAP = { type: "spring" as const, stiffness: 320, damping: 26 };

// ---------- Team Chip ----------
function TeamChip({
  member,
  index,
}: {
  member: (typeof teamMembers)[0];
  index: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 25 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: index * 0.07, ease: EASE_OUT_QUINT }}
      whileHover={prefersReducedMotion ? undefined : { y: -6 }}
      className="group relative flex flex-col items-center text-center will-change-transform"
    >
      <div className="relative">
        <motion.div
          transition={SPRING_SNAP}
          className={`relative h-24 w-24 sm:h-28 sm:w-28 overflow-hidden rounded-full ring-4 ring-white shadow-md transition-shadow duration-300 group-hover:shadow-xl group-hover:ring-blue-100 ${
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
        </motion.div>

        {member.leadership && (
          <motion.div
            animate={prefersReducedMotion ? undefined : { scale: [1, 1.08, 1] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -bottom-1 -right-1 rounded-full bg-slate-900 p-1.5 text-amber-300 shadow-sm"
          >
            <Crown className="h-3 w-3" />
          </motion.div>
        )}
      </div>

      <h3 className="mt-3 text-sm font-semibold text-slate-900 leading-tight">
        {member.name}
      </h3>
      <p className="text-xs text-blue-700 font-medium mt-0.5">{member.role}</p>
    </motion.div>
  );
}

// ---------- Certificate Card (Redesigned, same size) ----------
function CertificateCard({
  cert,
  index,
}: {
  cert: (typeof certificates)[0];
  index: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.12, ease: EASE_OUT_QUINT }}
      className="cert-wrap group relative flex w-full flex-col items-center gap-6 transform-gpu will-change-transform"
    >
      {/* Outer rotating conic ring wrapper — SAME SIZE */}
      <motion.div
        whileHover={prefersReducedMotion ? undefined : { y: -8, scale: 1.015 }}
        transition={SPRING_SOFT}
        className="relative flex h-72 w-72 sm:h-96 sm:w-96 items-center justify-center"
      >
        {/* Rotating conic gradient ring */}
        <div
          className="cert-ring pointer-events-none absolute inset-0 rounded-full opacity-70 transition-opacity duration-500 group-hover:opacity-100"
          aria-hidden="true"
        />

        {/* Soft outer glow (hover) */}
        <div
          className="pointer-events-none absolute -inset-4 rounded-full bg-blue-500/0 blur-2xl transition-all duration-500 group-hover:bg-blue-500/15"
          aria-hidden="true"
        />

        {/* Main glass disc */}
        <div className="cert-disc relative flex h-full w-full items-center justify-center overflow-hidden rounded-full border border-blue-100/80">
          {/* Inner radial highlight */}
          <div
            className="pointer-events-none absolute inset-0 rounded-full"
            style={{
              background:
                "radial-gradient(circle at 50% 30%, rgba(255,255,255,0.95) 0%, rgba(239,246,255,0.6) 35%, rgba(219,234,254,0.35) 65%, rgba(191,219,254,0.15) 100%)",
            }}
            aria-hidden="true"
          />

          {/* Dashed stitch ring */}
          <svg
            className="pointer-events-none absolute inset-6 h-[calc(100%-3rem)] w-[calc(100%-3rem)] opacity-40 transition-opacity duration-500 group-hover:opacity-80"
            viewBox="0 0 100 100"
            aria-hidden="true"
          >
            <circle
              cx="50"
              cy="50"
              r="48"
              fill="none"
              stroke="rgb(37 99 235 / 0.55)"
              strokeWidth="0.6"
              strokeDasharray="1.5 2.2"
              strokeLinecap="round"
            />
          </svg>

          {/* Diagonal shine sweep — smooth */}
          <span
            className="cert-shine pointer-events-none absolute inset-0"
            aria-hidden="true"
          />

          {/* Certificate logo (breathing) */}
          <div className="cert-logo relative h-60 w-60 sm:h-80 sm:w-80 transition-transform duration-500 ease-out group-hover:scale-[1.04]">
            <Image
              src={cert.logo}
              alt={cert.name}
              fill
              className="object-contain drop-shadow-[0_8px_24px_rgba(30,64,175,0.15)]"
              sizes="(max-width: 640px) 288px, 384px"
            />
          </div>

          {/* Verified badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.6 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 + index * 0.12, ...SPRING_SNAP }}
            className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 flex items-center gap-1.5 rounded-full bg-white/95 backdrop-blur-sm px-3 py-1.5 text-blue-600 shadow-md border border-blue-100 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          >
            <ShieldCheck className="h-4 w-4" />
            <span className="text-[10px] font-bold uppercase tracking-wider">
              Verified
            </span>
          </motion.div>

          {/* Index pill — top-left */}
          <div className="absolute top-3 left-3 sm:top-4 sm:left-4 flex h-8 w-8 items-center justify-center rounded-full bg-slate-900/90 text-[10px] font-bold text-white backdrop-blur-sm shadow-md">
            {String(index + 1).padStart(2, "0")}
          </div>
        </div>
      </motion.div>

      {/* Labels */}
      <div className="flex flex-col items-center gap-1">
        <p className="text-center text-lg sm:text-xl font-bold text-slate-900 transition-colors duration-300 group-hover:text-blue-800">
          {cert.name}
        </p>
        {cert.subtitle && (
          <p className="text-center text-xs font-medium uppercase tracking-[0.18em] text-slate-500">
            {cert.subtitle}
          </p>
        )}
      </div>
    </motion.div>
  );
}

// ---------- Stitch Divider ----------
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
          initial={{ pathLength: 0, opacity: 0 }}
          animate={isInView ? { pathLength: 1, opacity: 1 } : {}}
          transition={{ duration: 1.1, ease: EASE_OUT_QUINT }}
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
      transition={{ duration: 0.6, ease: EASE_OUT_QUINT }}
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

// ---------- Stitch Progress Thread ----------
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

// ---------- Page ----------
export default function TeamAndCertificatesPage() {
  const teamRowRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="relative min-h-screen overflow-hidden bg-white">
      {/* ---------- Layered premium backdrop ---------- */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        {/* Base gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-white via-blue-50/30 to-white" />

        {/* Aurora mesh blobs */}
        <div className="viona-blob-a absolute top-[-12%] left-1/2 h-[520px] w-[820px] -translate-x-1/2 rounded-full bg-blue-500/[0.08] blur-3xl" />
        <div className="viona-blob-b absolute bottom-[6%] right-[4%] h-[440px] w-[600px] rounded-full bg-cyan-400/[0.07] blur-3xl" />
        <div className="viona-blob-c absolute top-[35%] left-[-8%] h-[380px] w-[520px] rounded-full bg-indigo-400/[0.06] blur-3xl" />

        {/* Woven crosshatch */}
        <div
          className="viona-weave absolute inset-0 opacity-[0.045]"
          style={{
            backgroundImage: `
              repeating-linear-gradient(45deg, rgba(30,64,175,0.7) 0px, rgba(30,64,175,0.7) 1px, transparent 1px, transparent 10px),
              repeating-linear-gradient(-45deg, rgba(30,64,175,0.7) 0px, rgba(30,64,175,0.7) 1px, transparent 1px, transparent 10px)
            `,
            backgroundSize: "28px 28px",
          }}
        />

        {/* Dot texture */}
        <div
          className="viona-dots absolute inset-0 opacity-[0.12]"
          style={{
            backgroundImage: `radial-gradient(rgba(30, 64, 175, 0.85) 1.4px, transparent 1.4px)`,
            backgroundSize: "24px 24px",
          }}
        />

        {/* SVG grain */}
        <svg
          className="absolute inset-0 h-full w-full opacity-[0.045] mix-blend-multiply"
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

        {/* Vignette */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at center, transparent 40%, rgba(15,23,42,0.06) 100%)",
          }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-6 lg:px-8 pt-8 pb-16 md:pt-12 md:pb-24">
        {/* ---- 1. TEAM ---- */}
        <div className="py-12 md:py-16">
          <SectionTitle subtitle="Leadership & Team">
            The Minds Behind{" "}
            <span className="bg-gradient-to-r from-blue-900 to-blue-500 bg-clip-text text-transparent">
              VIONA
            </span>
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
              href="/Team"
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
          <div className="text-center mb-14">
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: EASE_OUT_QUINT }}
              className="inline-flex items-center gap-2.5 rounded-full border border-blue-100 bg-white/70 px-4 py-2 backdrop-blur-sm shadow-sm"
            >
              <Award className="h-4 w-4 text-blue-700" />
              <span className="text-[11px] font-bold uppercase tracking-[0.22em] text-slate-600">
                Certifications & Standards
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1, ease: EASE_OUT_QUINT }}
              className="mt-5 text-3xl md:text-4xl font-bold text-slate-900"
            >
              Built on{" "}
              <span className="bg-gradient-to-r from-blue-900 to-cyan-500 bg-clip-text text-transparent">
                Global Standards
              </span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.18, ease: EASE_OUT_QUINT }}
              className="mx-auto mt-4 max-w-lg text-sm text-slate-500 leading-relaxed"
            >
              Every batch we ship carries the mark of these standards, the same
              way it carries our name.
            </motion.p>
          </div>

          <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 sm:grid-cols-3 sm:gap-6 md:gap-10">
            {certificates.map((cert, idx) => (
              <CertificateCard key={idx} cert={cert} index={idx} />
            ))}
          </div>
        </div>
      </div>

      {/* ---------- Scoped styles ---------- */}
      <style jsx>{`
        /* ---------- Backdrop animations ---------- */
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
            transform: translate(-50%, 24px) scale(1.05);
          }
        }
        @keyframes viona-blob-b-float {
          0%,
          100% {
            transform: translate(0, 0) scale(1);
          }
          50% {
            transform: translate(-18px, -18px) scale(1.06);
          }
        }
        @keyframes viona-blob-c-float {
          0%,
          100% {
            transform: translate(0, 0) scale(1);
          }
          50% {
            transform: translate(20px, -12px) scale(1.04);
          }
        }
        .viona-blob-a {
          animation: viona-blob-a-float 16s ease-in-out infinite;
        }
        .viona-blob-b {
          animation: viona-blob-b-float 19s ease-in-out infinite;
        }
        .viona-blob-c {
          animation: viona-blob-c-float 22s ease-in-out infinite;
        }

        /* ---------- Certificate disc ---------- */
        .cert-disc {
          background: linear-gradient(
            180deg,
            rgba(255, 255, 255, 0.9) 0%,
            rgba(239, 246, 255, 0.85) 100%
          );
          box-shadow:
            inset 0 1px 0 rgba(255, 255, 255, 0.9),
            inset 0 -20px 40px rgba(30, 64, 175, 0.05),
            0 20px 45px -22px rgba(30, 64, 175, 0.25),
            0 8px 20px -12px rgba(15, 23, 42, 0.12);
          backdrop-filter: blur(6px);
          transition:
            box-shadow 500ms cubic-bezier(0.22, 1, 0.36, 1),
            transform 500ms cubic-bezier(0.22, 1, 0.36, 1);
          will-change: transform, box-shadow;
        }
        .cert-wrap:hover .cert-disc {
          box-shadow:
            inset 0 1px 0 rgba(255, 255, 255, 1),
            inset 0 -20px 40px rgba(30, 64, 175, 0.08),
            0 30px 60px -22px rgba(30, 64, 175, 0.4),
            0 10px 24px -12px rgba(15, 23, 42, 0.18);
        }

        /* Rotating conic ring */
        @keyframes cert-ring-spin {
          to {
            transform: rotate(360deg);
          }
        }
        .cert-ring {
          background: conic-gradient(
            from 0deg,
            transparent 0deg,
            rgba(37, 99, 235, 0.55) 40deg,
            rgba(59, 130, 246, 0.15) 120deg,
            transparent 180deg,
            rgba(6, 182, 212, 0.5) 260deg,
            transparent 340deg
          );
          -webkit-mask: radial-gradient(
            farthest-side,
            transparent calc(100% - 2px),
            #000 calc(100% - 1px)
          );
          mask: radial-gradient(
            farthest-side,
            transparent calc(100% - 2px),
            #000 calc(100% - 1px)
          );
          animation: cert-ring-spin 14s linear infinite;
          will-change: transform;
        }

        /* Smooth diagonal shine */
        @keyframes cert-shine-sweep {
          0% {
            transform: translateX(-130%) skewX(-14deg);
            opacity: 0;
          }
          15% {
            opacity: 0.9;
          }
          60% {
            opacity: 0;
          }
          100% {
            transform: translateX(130%) skewX(-14deg);
            opacity: 0;
          }
        }
        .cert-shine {
          background: linear-gradient(
            100deg,
            transparent 38%,
            rgba(255, 255, 255, 0.75) 50%,
            transparent 62%
          );
          transform: translateX(-130%) skewX(-14deg);
          will-change: transform, opacity;
        }
        .cert-wrap:hover .cert-shine {
          animation: cert-shine-sweep 1.6s cubic-bezier(0.4, 0, 0.2, 1);
        }

        /* Subtle logo breathing (only on hover, not continuous) */
        .cert-logo {
          filter: drop-shadow(0 6px 18px rgba(30, 64, 175, 0.12));
        }

        /* ---------- Button shine ---------- */
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

        /* ---------- Reduced motion ---------- */
        @media (prefers-reduced-motion: reduce) {
          .viona-weave,
          .viona-dots,
          .viona-blob-a,
          .viona-blob-b,
          .viona-blob-c,
          .viona-shine-sweep,
          .cert-ring,
          .cert-shine {
            animation: none !important;
          }
        }
      `}</style>
    </section>
  );
}
