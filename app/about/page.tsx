import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  Award,
  Mail,
  Tag,
  ClipboardCheck,
  Sprout,
  Users2,
  ShieldCheck,
  FileCheck2,
  Briefcase,
  Gauge,
} from "lucide-react";
import { AboutClientWrapper } from "@/components/AboutClinetwrapper";

export const metadata: Metadata = {
  title: "About Us | VIONA-FIBC Private Limited",
  description:
    "VIONA-FIBC is a premier manufacturer of FIBC bulk bags in India, serving Agro, Infrastructure, and Chemical industries — our vision, mission, values, global reach, and certifications.",
};

// ---------- Values Data ----------
const values = [
  "Responsibility & Integrity",
  "Customer satisfaction",
  "Quality and Reliability",
  "Teamwork",
  "Client focused",
  "Open communication",
  "Constantly striving for innovation",
  "Uncompromising quality",
  "Trust and credibility",
];

// ---------- CSR Data ----------
const csrItems = [
  { label: "Sustainable development", icon: Sprout },
  { label: "Child labour", icon: Users2 },
  { label: "Product safety and quality", icon: ShieldCheck },
  { label: "Legal compliance", icon: FileCheck2 },
  { label: "Professional workplace", icon: Briefcase },
  { label: "Optimum utilisation of resources", icon: Gauge },
];

// ---------- Certificates Data ----------
const certificates = [
  { name: "ISO 900:1:2015", logo: "/Images/certificates/cert2.png" },
  { name: "ISO 14001:2015 ", logo: "/Images/certificates/certi3.png" },
  { name: "ISO 22000:2018", logo: "/Images/certificates/certi1.png" },
];

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

// ---------- Animated Vision Icon: a compass needle swinging, scanning forward ----------
function VisionIcon() {
  return (
    <svg viewBox="0 0 44 44" className="h-11 w-11">
      <circle cx="22" cy="22" r="19" fill="none" stroke="rgb(30 64 175 / 0.35)" strokeWidth="1.5" />
      <g className="compass-needle">
        <line x1="22" y1="10" x2="22" y2="22" stroke="rgb(29 78 216)" strokeWidth="2.2" strokeLinecap="round" />
        <line x1="22" y1="22" x2="22" y2="34" stroke="rgb(147 197 253)" strokeWidth="2.2" strokeLinecap="round" />
      </g>
      <circle cx="22" cy="22" r="2.2" fill="rgb(29 78 216)" />
    </svg>
  );
}

// ---------- Animated Mission Icon: a small relationship network pulsing outward ----------
function MissionIcon() {
  const points = [
    { x: 22, y: 6 },
    { x: 36, y: 15 },
    { x: 31, y: 33 },
    { x: 13, y: 33 },
    { x: 8, y: 15 },
  ];
  return (
    <svg viewBox="0 0 44 44" className="h-11 w-11">
      {points.map((p, i) => (
        <line key={i} x1="22" y1="22" x2={p.x} y2={p.y} stroke="rgb(30 64 175 / 0.3)" strokeWidth="1.2" />
      ))}
      {points.map((p, i) => (
        <g key={i}>
          <circle cx={p.x} cy={p.y} r="2.4" fill="rgb(29 78 216)" />
          <circle
            cx={p.x}
            cy={p.y}
            r="2.4"
            fill="none"
            stroke="rgb(37 99 235 / 0.6)"
            strokeWidth="1.2"
            className="node-ping"
            style={{ animationDelay: `${i * 0.4}s` }}
          />
        </g>
      ))}
      <circle cx="22" cy="22" r="3.4" fill="rgb(29 78 216)" />
    </svg>
  );
}

// ---------- Woven Value Tag ----------
function ValueTag({ label, index }: { label: string; index: number }) {
  const rotations = ["-rotate-2", "rotate-1", "-rotate-1", "rotate-2"];
  const rotate = rotations[index % rotations.length];

  return (
    <div
      className={`group relative flex items-center gap-2 rounded-md border border-dashed border-blue-300 bg-white px-4 py-3 text-left shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-500 hover:shadow-md ${rotate} hover:rotate-0`}
    >
      <span className="absolute -top-2 -left-2 h-3 w-3 rounded-full border border-blue-300 bg-blue-50" />
      <Tag className="h-3.5 w-3.5 shrink-0 text-blue-600" />
      <span className="text-xs font-medium leading-snug text-slate-700">{label}</span>
    </div>
  );
}

// ---------- Main About Page ----------
export default function About() {
  return (
    <section className="relative min-h-screen bg-white overflow-hidden">
      {/* ---- Single shared background system for the whole page ---- */}
      <div className="pointer-events-none fixed inset-0">
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
        <div className="glow-drift-2 absolute bottom-[10%] right-[5%] h-[380px] w-[520px] rounded-full bg-cyan-400/[0.06] blur-3xl" />
        <div className="glow-drift-3 absolute top-[45%] left-[-5%] h-[300px] w-[420px] rounded-full bg-blue-300/[0.05] blur-3xl" />
      </div>

      {/* ---- One consistent container width for every section ---- */}
      <div className="relative z-10 mx-auto max-w-5xl px-6 lg:px-8 pt-8 pb-12 md:pt-12 md:pb-20">
        {/* ---- 1. HERO ---- */}
        <div className="relative py-12 md:py-16 text-center">
          <AboutClientWrapper>
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-4 py-1 text-xs font-semibold text-blue-700 border border-blue-200">
                About VIONA
              </div>

              <h1 className="mt-6 text-4xl md:text-6xl font-bold text-slate-900 leading-tight">
                Engineering{" "}
                <span className="bg-gradient-to-r from-blue-900 to-blue-500 bg-clip-text text-transparent">
                  Excellence
                </span>
                <br />
                <span className="bg-gradient-to-r from-blue-900 to-blue-500 bg-clip-text text-transparent">
                  Packaging
                </span>{" "}
                Innovation
              </h1>

              <div className="mt-8 space-y-4 text-sm leading-relaxed text-slate-600 max-w-2xl mx-auto">
                <p>
                  At <span className="text-slate-900 font-medium">VIONA-FIBC PRIVATE LIMITED</span>, we
                  believe in creating Packaging Solutions that cater to businesses which appreciate premium
                  craftsmanship.
                </p>
                <p>
                  Our niche product range serves{" "}
                  <span className="text-blue-700/80">Agro, Infrastructure, Minerals & Chemical Industries</span>.
                  We are an India based company working towards excellence in Big Bags production.
                </p>
                <p>
                  Our team comes with years of industry experience, comprising a highly motivated set of
                  specialists dedicated to delivering lasting value.
                </p>
              </div>
            </div>
          </AboutClientWrapper>
        </div>

        <StitchDivider />

        {/* ---- 2. VISION & MISSION ---- */}
        <div className="py-12 md:py-16">
          <div className="text-center mb-10">
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-blue-700">
              What Drives Us
            </span>
            <h2 className="mt-2 text-3xl font-bold text-slate-900">
              Vision & <span className="text-blue-700">Mission</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
            <div className="relative rounded-2xl border border-blue-200/60 bg-blue-50/30 p-8 backdrop-blur-sm">
              <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-full bg-blue-900/10 border border-blue-300/50">
                <VisionIcon />
              </div>
              <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-700">Vision</h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-700">
                To become a respected brand by safely carrying the future of the world forward, through
                innovative products and advanced technology.
              </p>
            </div>

            <div className="relative rounded-2xl border border-slate-200 bg-white/80 p-8 backdrop-blur-sm">
              <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-full bg-blue-900/10 border border-blue-300/50">
                <MissionIcon />
              </div>
              <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-700">Mission</h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-700">
                To be the global solution partner of our customers in the packaging and textile industry,
                through high-quality, innovative, and reliable products. We aim to build an outstanding
                organization that supplies profitable, quality products meeting our customers&rsquo;
                requirements &mdash; achieved by creating mutually beneficial relationships between our
                customers, vendors, bankers, employees, shareholders, and society at large.
              </p>
            </div>
          </div>
        </div>

        <StitchDivider />

        {/* ---- 3. VALUES ---- */}
        <div className="py-12 md:py-16">
          <div className="text-center mb-10">
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-blue-700">
              What We Stand For
            </span>
            <h2 className="mt-2 text-3xl font-bold text-slate-900">
              Our <span className="text-blue-700">Values</span>
            </h2>
            <p className="mx-auto mt-3 max-w-md text-xs text-slate-500">
              Stitched into how we work, the way a label is stitched into every bag we make.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            {values.map((label, idx) => (
              <ValueTag key={label} label={label} index={idx} />
            ))}
          </div>
        </div>

        <StitchDivider />

        {/* ---- 4. GLOBAL FOOTPRINT ---- */}
        <div className="py-12 md:py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div>
              <span className="text-xs font-semibold uppercase tracking-[0.25em] text-blue-700">
                Our Reach
              </span>
              <h2 className="mt-2 text-3xl font-bold text-slate-900">
                Global <span className="text-blue-700">Footprint</span>
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-slate-600 max-w-md">
                From our manufacturing base in India, our bulk packaging solutions travel to customers
                across the world &mdash; built to move safely, wherever they&rsquo;re headed.
              </p>
              <div className="mt-6 inline-flex items-baseline gap-2 rounded-xl border border-blue-200/60 bg-blue-50/40 px-6 py-4">
                <span className="font-mono text-4xl font-bold text-blue-800">43+</span>
                <span className="text-xs font-medium uppercase tracking-[0.15em] text-slate-500">
                  Countries Served
                </span>
              </div>
            </div>

            <div className="relative mx-auto h-64 w-64">
              <svg viewBox="0 0 240 240" className="h-full w-full">
                <defs>
                  <clipPath id="globe-clip">
                    <circle cx="120" cy="120" r="100" />
                  </clipPath>
                </defs>
                <circle cx="120" cy="120" r="100" fill="none" stroke="rgb(30 64 175 / 0.25)" strokeWidth="1.5" />
                <ellipse cx="120" cy="120" rx="100" ry="38" fill="none" stroke="rgb(30 64 175 / 0.18)" strokeWidth="1" />
                <ellipse cx="120" cy="120" rx="100" ry="70" fill="none" stroke="rgb(30 64 175 / 0.18)" strokeWidth="1" />
                <line x1="20" y1="120" x2="220" y2="120" stroke="rgb(30 64 175 / 0.18)" strokeWidth="1" />
                <g clipPath="url(#globe-clip)">
                  {Array.from({ length: 9 }).map((_, row) =>
                    Array.from({ length: 9 }).map((_, col) => {
                      const cx = 30 + col * 22.5;
                      const cy = 30 + row * 22.5;
                      const dx = cx - 120;
                      const dy = cy - 120;
                      if (Math.sqrt(dx * dx + dy * dy) > 96) return null;
                      return <circle key={`${row}-${col}`} cx={cx} cy={cy} r="1.6" fill="rgb(30 64 175 / 0.35)" />;
                    })
                  )}
                </g>
                {[
                  { cx: 80, cy: 90 },
                  { cx: 165, cy: 100 },
                  { cx: 100, cy: 150 },
                  { cx: 150, cy: 160 },
                ].map((p, i) => (
                  <g key={i}>
                    <circle cx={p.cx} cy={p.cy} r="3" fill="rgb(37 99 235)" />
                    <circle
                      cx={p.cx}
                      cy={p.cy}
                      r="3"
                      fill="none"
                      stroke="rgb(37 99 235 / 0.6)"
                      strokeWidth="1.5"
                      className="globe-ping"
                      style={{ animationDelay: `${i * 0.6}s` }}
                    />
                  </g>
                ))}
              </svg>
            </div>
          </div>
        </div>

        <StitchDivider />

        {/* ---- 5. CORPORATE SOCIAL RESPONSIBILITY ---- */}
        <div className="py-12 md:py-16">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-blue-700">
              <ClipboardCheck className="h-4 w-4" />
              Giving Back
            </div>
            <h2 className="mt-2 text-3xl font-bold text-slate-900">
              Corporate Social <span className="text-blue-700">Responsibility</span>
            </h2>
            <p className="mx-auto mt-3 max-w-lg text-sm text-slate-600">
              We believe in the development of the community around us. Running our business in a way
              that positively shapes the economic, social, and environmental fabric of society.
            </p>
          </div>

          <div className="mx-auto max-w-3xl rounded-2xl border border-slate-200 bg-white/80 p-2 backdrop-blur-sm">
            <div className="grid grid-cols-1 sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-slate-100">
              {csrItems.map(({ label, icon: Icon }, idx) => (
                <div key={idx} className="flex items-center gap-3 px-6 py-4">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-50 border border-blue-200/60">
                    <Icon className="h-4 w-4 text-blue-700" />
                  </span>
                  <span className="text-sm font-medium text-slate-700">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <StitchDivider />

        {/* ---- 6. CERTIFICATES ---- */}
        <div className="py-12 md:py-16">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
              <Award className="h-4 w-4" />
              Our Certifications & Standards
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-12 md:gap-16">
            {certificates.map((cert, idx) => (
              <div key={idx} className="group flex flex-col items-center gap-3">
                <div className="h-20 w-28 relative grayscale hover:grayscale-0 transition-all duration-500">
                  <Image src={cert.logo} alt={cert.name} fill className="object-contain" />
                </div>
                <p className="text-xs font-medium text-slate-500 group-hover:text-blue-600 transition-colors">
                  {cert.name}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ---- Background + animation definitions ---- */}
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

        .glow-drift-1 { animation: float-a 22s ease-in-out infinite; }
        .glow-drift-2 { animation: float-b 26s ease-in-out infinite; }
        .glow-drift-3 { animation: float-c 30s ease-in-out infinite; }
        @keyframes float-a {
          0%, 100% { transform: translate(-50%, 0) scale(1); }
          50%      { transform: translate(-50%, 30px) scale(1.08); }
        }
        @keyframes float-b {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50%      { transform: translate(-20px, -25px) scale(1.05); }
        }
        @keyframes float-c {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50%      { transform: translate(15px, 20px) scale(1.06); }
        }

        .stitch-line {
          stroke-dasharray: 14 10;
          stroke-dashoffset: 600;
          animation: stitch-in 2.4s ease-out forwards;
        }
        @keyframes stitch-in {
          to { stroke-dashoffset: 0; }
        }

        .compass-needle {
          transform-origin: 22px 22px;
          animation: compass-swing 4s ease-in-out infinite alternate;
        }
        @keyframes compass-swing {
          0%   { transform: rotate(-24deg); }
          100% { transform: rotate(24deg); }
        }

        .node-ping {
          transform-origin: center;
          animation: ping-out 2.2s ease-out infinite;
        }
        .globe-ping {
          transform-origin: center;
          animation: ping-out 2.4s ease-out infinite;
        }
        @keyframes ping-out {
          0%   { transform: scale(1); opacity: 1; }
          100% { transform: scale(3); opacity: 0; }
        }

        @media (prefers-reduced-motion: reduce) {
          .weave-layer,
          .glow-drift-1,
          .glow-drift-2,
          .glow-drift-3,
          .stitch-line,
          .compass-needle,
          .node-ping,
          .globe-ping {
            animation: none !important;
          }
        }
      `}</style>
    </section>
  );
}