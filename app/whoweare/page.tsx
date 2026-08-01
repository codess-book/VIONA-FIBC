import { Metadata } from "next";
import {
  Compass,
  Handshake,
  Tag,
  Globe2,
  ClipboardCheck,
  Sprout,
  Users2,
  ShieldCheck,
  FileCheck2,
  Briefcase,
  Gauge,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Vision, Mission & Values | VIONA-FIBC Private Limited",
  description:
    "Our vision, mission, core values, global footprint across 43 countries, and corporate social responsibility commitments at VIONA-FIBC.",
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

// ---------- Stitched Seam Divider (shared signature, matches About page) ----------
function StitchDivider() {
  return (
    <div className="stitch-divider relative w-full h-6" aria-hidden="true">
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

// ---------- Woven Value Tag (signature element for this page) ----------
// Modeled on the stitched fabric care-labels sewn into an actual FIBC bag.
function ValueTag({ label, index }: { label: string; index: number }) {
  const rotations = ["-rotate-2", "rotate-1", "-rotate-1", "rotate-2"];
  const rotate = rotations[index % rotations.length];

  return (
    <div
      className={`value-tag group relative flex items-center gap-2 rounded-md border border-dashed border-blue-300 bg-white px-4 py-3 text-left shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-500 hover:shadow-md ${rotate} hover:rotate-0`}
    >
      <span className="absolute -top-2 -left-2 h-3 w-3 rounded-full border border-blue-300 bg-blue-50" />
      <Tag className="h-3.5 w-3.5 shrink-0 text-blue-600" />
      <span className="text-xs font-medium leading-snug text-slate-700">{label}</span>
    </div>
  );
}

export default function CompanyProfilePage() {
  return (
    <section className="relative min-h-screen bg-white overflow-hidden">
      {/* ---- Shared background system (weave + blueprint grid + drifting glow) ---- */}
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
        <div className="glow-drift-2 absolute bottom-[10%] right-[5%] h-[380px] w-[520px] rounded-full bg-cyan-400/[0.06] blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-5xl px-6 lg:px-8 pt-8 pb-12 md:pt-12 md:pb-20">
        {/* ---- 1. VISION & MISSION ---- */}
        <div className="py-12 md:py-16 text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-blue-700">
            What Drives Us
          </span>
          <h1 className="mt-2 text-4xl md:text-5xl font-bold text-slate-900">
            Vision & <span className="text-blue-700">Mission</span>
          </h1>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
            <div className="relative rounded-2xl border border-blue-200/60 bg-blue-50/30 p-8 backdrop-blur-sm">
              <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-full bg-blue-900/10 border border-blue-300/50">
                <Compass className="h-5 w-5 text-blue-700" />
              </div>
              <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-700">Vision</h2>
              <p className="mt-3 text-sm leading-relaxed text-slate-700">
                To become a respected brand by safely carrying the future of the world forward, through
                innovative products and advanced technology.
              </p>
            </div>

            <div className="relative rounded-2xl border border-slate-200 bg-white/80 p-8 backdrop-blur-sm">
              <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-full bg-blue-900/10 border border-blue-300/50">
                <Handshake className="h-5 w-5 text-blue-700" />
              </div>
              <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-700">Mission</h2>
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

        {/* ---- 2. VALUES ---- */}
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

        {/* ---- 3. GLOBAL FOOTPRINT ---- */}
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

            {/* Abstract dot-grid globe with pulsing shipment pings */}
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
                      return (
                        <circle
                          key={`${row}-${col}`}
                          cx={cx}
                          cy={cy}
                          r="1.6"
                          fill="rgb(30 64 175 / 0.35)"
                        />
                      );
                    })
                  )}
                </g>
                {/* Shipment ping points */}
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

        {/* ---- 4. CORPORATE SOCIAL RESPONSIBILITY ---- */}
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

        .globe-ping {
          transform-origin: center;
          animation: ping-out 2.4s ease-out infinite;
        }
        @keyframes ping-out {
          0%   { transform: scale(1); opacity: 1; }
          100% { transform: scale(3.2); opacity: 0; }
        }

        @media (prefers-reduced-motion: reduce) {
          .weave-layer,
          .glow-drift-1,
          .glow-drift-2,
          .stitch-line,
          .globe-ping {
            animation: none !important;
          }
        }
      `}</style>
    </section>
  );
}