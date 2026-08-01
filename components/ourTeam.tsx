"use client"
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Award, Mail, ShieldCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "Our Team | VIONA-FIBC Private Limited",
  description:
    "Meet the leadership team at VIONA-FIBC, and the quality certifications that back every bag we manufacture.",
};

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
  { name: "ISO 9001:2015", logo: "/Images/certs/iso.png" },
  { name: "FDA Approved", logo: "/Images/certs/fda.png" },
  { name: "BIS Certified", logo: "/Images/certs/bis.png" },
];

// ---------- Team Card ----------
function TeamCard({ member }: { member: typeof teamMembers[0] }) {
  return (
    <div
      className={`team-card group relative overflow-hidden rounded-2xl border p-6 text-center backdrop-blur-sm transition-all duration-300 ${
        member.isDirector
          ? "border-blue-200/50 bg-blue-50/40 hover:border-blue-400 hover:shadow-[0_0_30px_rgba(96,165,250,0.18)]"
          : "border-slate-200 bg-white/85 hover:border-blue-300 hover:shadow-lg"
      }`}
    >
      {/* faint woven texture inside the card */}
      <div className="card-weave pointer-events-none absolute inset-0 opacity-[0.04]" />

      {member.isDirector && (
        <div className="absolute top-4 right-4 rounded-full bg-blue-900/10 px-2 py-1 text-[10px] font-bold text-blue-700 border border-blue-500/30">
          Leadership
        </div>
      )}

      <div className="relative z-10">
        <div className="relative mx-auto h-32 w-32 overflow-hidden rounded-full border-2 border-blue-200/60 mb-4 ring-4 ring-white">
          <Image src={member.image} alt={member.name} fill className="object-cover" />
        </div>
        <h3 className="text-xl font-bold text-slate-900">{member.name}</h3>
        <p className="text-sm font-medium text-blue-700">{member.role}</p>
        <p className="mt-2 text-xs leading-relaxed text-slate-600 min-h-[60px]">
          {member.bio}
        </p>
        <div className="mt-4 flex justify-center gap-3">
          <Link href="#" className="text-slate-400 hover:text-blue-600 transition-colors">
            <Mail className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}

// ---------- Stitched Seam Divider ----------
function StitchDivider() {
  return (
    <div className="relative w-full h-6" aria-hidden="true">
      <svg viewBox="0 0 1200 24" preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
        <line
          x1="0"
          y1="12"
          x2="1200"
          y2="12"
          stroke="rgb(37 99 235 / 0.35)"
          strokeWidth="2"
          strokeDasharray="14 10"
          strokeLinecap="round"
          className="stitch-line"
        />
      </svg>
    </div>
  );
}

export default function TeamAndCertificatesPage() {
  return (
    <section className="relative min-h-screen bg-white overflow-hidden">
      {/* ---- Shared background system ---- */}
      <div className="pointer-events-none absolute inset-0">
        <div className="weave-layer absolute inset-0 opacity-[0.05]" />
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(30, 64, 175, 0.5) 1px, transparent 1px),
              linear-gradient(90deg, rgba(30, 64, 175, 0.5) 1px, transparent 1px)
            `,
            backgroundSize: "48px 48px",
          }}
        />
        <div className="glow-drift-1 absolute top-[-10%] left-1/2 -translate-x-1/2 h-[420px] w-[720px] rounded-full bg-blue-500/[0.07] blur-3xl" />
        <div className="glow-drift-2 absolute bottom-[8%] right-[6%] h-[380px] w-[520px] rounded-full bg-cyan-400/[0.06] blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-6 lg:px-8 pt-8 pb-12 md:pt-12 md:pb-20">
        {/* ---- 1. TEAM ---- */}
        <div className="py-12 md:py-16">
          <div className="text-center mb-12">
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-blue-700">
              Leadership & Team
            </span>
            <h2 className="mt-2 text-3xl md:text-4xl font-bold text-slate-900">
              The Minds Behind <span className="text-blue-700">VIONA</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {teamMembers.map((member, idx) => (
              <TeamCard key={idx} member={member} />
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
              Every batch we ship carries the mark of these standards, the same way it carries our name.
            </p>
          </div>

          <div className="flex flex-wrap items-stretch justify-center gap-6 md:gap-8">
            {certificates.map((cert, idx) => (
              <div
                key={idx}
                className="cert-card group relative flex w-40 flex-col items-center gap-3 rounded-2xl border border-slate-200 bg-white/85 px-6 py-8 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-300 hover:shadow-lg"
              >
                {/* seal ring behind the logo, like an official stamp */}
                <div className="relative flex h-20 w-20 items-center justify-center rounded-full border-2 border-dashed border-blue-200 transition-colors duration-300 group-hover:border-blue-400">
                  <div className="relative h-14 w-14 grayscale transition-all duration-500 group-hover:grayscale-0">
                    <Image src={cert.logo} alt={cert.name} fill className="object-contain" />
                  </div>
                  <ShieldCheck className="absolute -bottom-1 -right-1 h-5 w-5 rounded-full bg-white p-0.5 text-blue-600 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                </div>
                <p className="text-center text-xs font-semibold text-slate-600 group-hover:text-blue-700 transition-colors">
                  {cert.name}
                </p>
              </div>
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

        .stitch-line {
          stroke-dasharray: 14 10;
          stroke-dashoffset: 600;
          animation: stitch-in 2.4s ease-out forwards;
        }
        @keyframes stitch-in {
          to { stroke-dashoffset: 0; }
        }

        @media (prefers-reduced-motion: reduce) {
          .weave-layer,
          .card-weave,
          .glow-drift-1,
          .glow-drift-2,
          .stitch-line {
            animation: none !important;
          }
        }
      `}</style>
    </section>
  );
}