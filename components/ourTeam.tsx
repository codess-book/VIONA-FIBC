"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Award, Mail, ShieldCheck } from "lucide-react";
import { motion, useInView, useAnimation } from "framer-motion";

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
  { name: "ISO 9001:2015", logo: "/Images/certificates/cert2.png" },
  { name: "ISO 14001:2015", logo: "/Images/certificates/certi3.png" },
  { name: "ISO 22000:2018", logo: "/Images/certificates/certi1.png" },
];

// ---------- Optimized Team Card ----------
function TeamCard({
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
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={`team-card group relative overflow-hidden rounded-2xl border p-6 text-center backdrop-blur-sm transition-all duration-300 hover:shadow-2xl transform-gpu ${
        member.isDirector
          ? "border-blue-200/50 bg-blue-50/40 hover:border-blue-400 hover:shadow-[0_0_40px_rgba(96,165,250,0.2)]"
          : "border-slate-200 bg-white/85 hover:border-blue-300 hover:shadow-lg"
      }`}
    >
      <div className="card-weave pointer-events-none absolute inset-0 opacity-[0.04]" />

      {member.isDirector && (
        <div className="absolute top-4 right-4 rounded-full bg-blue-900/10 px-2.5 py-1 text-[10px] font-bold text-blue-700 border border-blue-500/30">
          Leadership
        </div>
      )}

      <div className="relative z-10">
        <div className="relative mx-auto h-32 w-32 overflow-hidden rounded-full border-2 border-blue-200/60 mb-4 ring-4 ring-white group-hover:scale-105 transition-transform duration-300">
          <Image
            src={member.image}
            alt={member.name}
            fill
            className="object-cover"
          />
        </div>

        <h3 className="text-xl font-bold text-slate-900">{member.name}</h3>

        <p className="text-sm font-medium text-blue-700">{member.role}</p>

        <p className="mt-2 text-xs leading-relaxed text-slate-600 min-h-[60px]">
          {member.bio}
        </p>

        <div className="mt-4 flex justify-center gap-3">
          <Link
            href="#"
            className="text-slate-400 hover:text-blue-600 transition-colors"
          >
            <Mail className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

// ---------- Optimized Certificate Card (No Border, Bigger Size, Same Ring Design) ----------
// ---------- Certificate Card (Extra Large Circle & Logo) ----------
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
      {/* 1. Outer Ring Size: 'h-60 w-60 sm:h-72 sm:w-72'
        2. Inner Image Size: 'h-48 w-48 sm:h-60 sm:w-60'
      */}
      <div className="relative flex h-60 w-60 sm:h-82 sm:w-82 items-center justify-center rounded-full border-2 border-dashed border-blue-200/80 bg-blue-50/30 transition-colors duration-300 group-hover:border-blue-400">
        <div className="relative h-48 w-48 sm:h-82 sm:w-82 transition-transform duration-300 group-hover:scale-105">
          <Image
            src={cert.logo}
            alt={cert.name}
            fill
            className="object-contain"
            sizes="(max-width: 640px) 240px, 288px"
          />
        </div>

        {/* Shield Icon */}
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

export default function TeamAndCertificatesPage() {
  return (
    <section className="relative min-h-screen bg-white overflow-hidden">
      {/* Lag-Free Static Backdrop Layer */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(30, 64, 175, 0.5) 1px, transparent 1px),
              linear-gradient(90deg, rgba(30, 64, 175, 0.5) 1px, transparent 1px)
            `,
            backgroundSize: "48px 48px",
          }}
        />

        <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 h-[420px] w-[720px] rounded-full bg-blue-500/[0.06] blur-3xl" />
        <div className="absolute bottom-[8%] right-[6%] h-[380px] w-[520px] rounded-full bg-cyan-400/[0.05] blur-3xl" />
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
            <div className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
              <Award className="h-4 w-4" />
              Our Certifications & Standards
            </div>
            <p className="mx-auto mt-3 max-w-md text-xs text-slate-500">
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

      <style>{`
        .card-weave {
          background-image:
            repeating-linear-gradient(45deg, rgba(30,64,175,0.9) 0px, rgba(30,64,175,0.9) 1px, transparent 1px, transparent 8px),
            repeating-linear-gradient(-45deg, rgba(37,99,235,0.9) 0px, rgba(37,99,235,0.9) 1px, transparent 1px, transparent 8px);
          background-size: 10px 10px;
        }
      `}</style>
    </section>
  );
}
