"use client";

import { useRef } from "react";
import Image from "next/image";
import {
  ShieldCheck,
  FlaskConical,
  Cog,
  ClipboardCheck,
  Lightbulb,
  Truck,
} from "lucide-react";
import {
  motion,
  useInView,
  useScroll,
  useTransform,
  useReducedMotion,
  type Variants,
} from "framer-motion";

// ---------- Quality Journey Data ----------
const stages = [
  {
    label: "Raw Material Selection",
    icon: ShieldCheck,
    image: "/Images/quality/raw-material.jpg",
    blurb:
      "Quality begins before the first thread is woven. Every raw material is selected and verified against strict specifications.",
  },
  {
    label: "Rigorous Testing",
    icon: FlaskConical,
    image: "/Images/quality/test.png",
    blurb:
      "Every batch goes through thorough, rigorous testing so nothing short of premium quality moves forward into production.",
  },
  {
    label: "Precision Manufacturing",
    icon: Cog,
    image: "/Images/quality/manufacture-eqipments.jpg",
    blurb:
      "Sophisticated equipment and stringent process controls shape every bag to world-class manufacturing standards.",
  },
  {
    label: "Quality Assurance Checks",
    icon: ClipboardCheck,
    image: "/Images/quality/quality.jpg",
    blurb:
      "Our Quality Assurance team checks at every single stage, ensuring the product meets every required standard before moving on.",
  },
  {
    label: "R&D & Continuous Improvement",
    icon: Lightbulb,
    image: "/Images/quality/r&d.jpg",
    blurb:
      "We keep raising the standards of FIBC manufacturing through continuous R&D, so quality never stands still.",
  },
  {
    label: "Final Delivery",
    icon: Truck,
    image: "/Images/quality/finaldelivery.png",
    blurb:
      "From our floor to your door, every bag carries our uncompromising commitment to quality and customer satisfaction.",
  },
];

// ---------- Hero entrance choreography (runs once, on load) ----------
const heroContainer: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.05 },
  },
};

const heroItem: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

// ---------- Scroll-drawn stitched spine ----------
function StitchedSpine({
  containerRef,
}: {
  containerRef: React.RefObject<HTMLDivElement | null>;
}) {
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 75%", "end 60%"],
  });
  const pathLength = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <svg
      className="absolute left-6 md:left-1/2 top-0 h-full w-4 md:-translate-x-1/2"
      viewBox="0 0 16 100"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <line
        x1="8"
        y1="0"
        x2="8"
        y2="100"
        stroke="rgb(37 99 235 / 0.16)"
        strokeWidth="2"
        vectorEffect="non-scaling-stroke"
      />
      <motion.line
        x1="8"
        y1="0"
        x2="8"
        y2="100"
        stroke="rgb(37 99 235 / 0.5)"
        strokeWidth="2"
        strokeDasharray="6 5"
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
        style={prefersReducedMotion ? undefined : { pathLength }}
      />
    </svg>
  );
}

// ---------- One stage row ----------
function StageRow({
  stage,
  idx,
}: {
  stage: (typeof stages)[number];
  idx: number;
}) {
  const Icon = stage.icon;
  const isEven = idx % 2 === 0;
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-15% 0px -15% 0px" });

  return (
    <div
      ref={ref}
      className="relative grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 items-center pl-16 md:pl-0"
    >
      {/* numbered node on the spine */}
      <motion.div
        initial={{ opacity: 0, scale: 0.4 }}
        animate={isInView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.4, ease: "backOut", delay: 0.15 }}
        className="absolute left-6 md:left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 z-10"
      >
        <div className="relative flex h-9 w-9 items-center justify-center rounded-full bg-white border-2 border-blue-500 shadow-sm">
          <span className="font-mono text-xs font-bold text-blue-700">
            {String(idx + 1).padStart(2, "0")}
          </span>
          <span className="node-ping absolute inset-0 rounded-full border border-blue-400" />
        </div>
      </motion.div>

      {/* Image */}
      <motion.div
        initial={{ opacity: 0, x: isEven ? -28 : 28, scale: 0.97 }}
        animate={isInView ? { opacity: 1, x: 0, scale: 1 } : {}}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: 0.05 }}
        className={`${isEven ? "md:order-1" : "md:order-2"}`}
      >
        <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-blue-200/50 bg-blue-50/30 shadow-sm">
          <Image src={stage.image} alt={stage.label} fill className="object-cover" />
        </div>
      </motion.div>

      {/* Text */}
      <motion.div
        initial={{ opacity: 0, x: isEven ? 28 : -28 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: 0.18 }}
        className={`${isEven ? "md:order-2 md:pl-4" : "md:order-1 md:pr-4 md:text-right"}`}
      >
        <div className={`inline-flex items-center gap-2 ${!isEven ? "md:flex-row-reverse" : ""}`}>
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-900/10 border border-blue-300/50">
            <Icon className="h-4 w-4 text-blue-700" />
          </span>
          <span className="text-xs font-semibold uppercase tracking-[0.15em] text-blue-600">
            Stage {String(idx + 1).padStart(2, "0")}
          </span>
        </div>
        <h3 className="mt-2 text-xl font-bold text-slate-900">{stage.label}</h3>
        <p className="mt-2 text-sm leading-relaxed text-slate-600">{stage.blurb}</p>
      </motion.div>
    </div>
  );
}

export default function QualityContent() {
  const timelineRef = useRef<HTMLDivElement>(null);
  const journeyHeadingRef = useRef(null);
  const journeyHeadingInView = useInView(journeyHeadingRef, {
    once: true,
    margin: "-60px",
  });

  return (
    <section className="relative min-h-screen bg-white pt-24 pb-16 md:pt-28 md:pb-24 overflow-hidden">
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
        <div className="glow-drift-1 absolute top-[-8%] left-1/2 -translate-x-1/2 h-[420px] w-[720px] rounded-full bg-blue-500/[0.07] blur-3xl" />
        <div className="glow-drift-2 absolute bottom-[10%] right-[5%] h-[380px] w-[520px] rounded-full bg-cyan-400/[0.06] blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-5xl px-6 lg:px-8">
        {/* ---- HERO (animates in on page load) ---- */}
        <motion.div
          variants={heroContainer}
          initial="hidden"
          animate="show"
          className="text-center mb-20"
        >
          <motion.span
            variants={heroItem}
            className="text-xs font-semibold uppercase tracking-[0.25em] text-blue-700 block"
          >
            Our Commitment
          </motion.span>
          <motion.h1
            variants={heroItem}
            className="mt-2 text-4xl md:text-5xl font-bold text-slate-900"
          >
            Quality, <span className="text-blue-700">Uncompromised</span>
          </motion.h1>

          <motion.div
            variants={heroItem}
            className="mt-8 space-y-4 text-sm leading-relaxed text-slate-600 max-w-2xl mx-auto text-left md:text-center"
          >
            <p>
              Quality is first and foremost in our mind. When you deal with Viona-FIBC Pvt Ltd, you are
              guaranteed a higher level of quality and customer satisfaction &mdash; maintained right from
              the selection of raw material to the final delivery.
            </p>
            <p>
              Our Quality Assurance team ensures the product meets all required standards at every single
              stage, backed by rigorous testing so we deliver a premium product at the best value. Through
              continuous R&amp;D, Viona-FIBC keeps raising the standards of FIBC manufacturing.
            </p>
          </motion.div>

          <motion.p
            variants={heroItem}
            className="mt-6 mx-auto max-w-xl text-sm font-medium text-blue-800 italic"
          >
            &ldquo;Uncompromising attitude towards quality and customer satisfaction has made us world
            leaders in FIBC.&rdquo;
          </motion.p>
        </motion.div>

        {/* ---- QUALITY JOURNEY: stitched timeline ---- */}
        <motion.div
          ref={journeyHeadingRef}
          initial={{ opacity: 0, y: 16 }}
          animate={journeyHeadingInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-blue-700">
            How We Get There
          </span>
          <h2 className="mt-2 text-3xl font-bold text-slate-900">
            The Quality <span className="text-blue-700">Journey</span>
          </h2>
        </motion.div>

        <div ref={timelineRef} className="relative">
          <StitchedSpine containerRef={timelineRef} />

          <div className="flex flex-col gap-16">
            {stages.map((stage, idx) => (
              <StageRow key={stage.label} stage={stage} idx={idx} />
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .weave-layer {
          background-image: repeating-linear-gradient(
              45deg,
              rgba(30, 64, 175, 0.9) 0px,
              rgba(30, 64, 175, 0.9) 1px,
              transparent 1px,
              transparent 10px
            ),
            repeating-linear-gradient(
              -45deg,
              rgba(37, 99, 235, 0.9) 0px,
              rgba(37, 99, 235, 0.9) 1px,
              transparent 1px,
              transparent 10px
            );
          background-size: 14px 14px;
          animation: weave-drift 40s linear infinite;
        }
        @keyframes weave-drift {
          0% {
            background-position: 0 0, 0 0;
          }
          100% {
            background-position: 200px 200px, -200px 200px;
          }
        }

        .glow-drift-1 {
          animation: float-a 22s ease-in-out infinite;
        }
        .glow-drift-2 {
          animation: float-b 26s ease-in-out infinite;
        }
        @keyframes float-a {
          0%,
          100% {
            transform: translate(-50%, 0) scale(1);
          }
          50% {
            transform: translate(-50%, 30px) scale(1.08);
          }
        }
        @keyframes float-b {
          0%,
          100% {
            transform: translate(0, 0) scale(1);
          }
          50% {
            transform: translate(-20px, -25px) scale(1.05);
          }
        }

        .node-ping {
          animation: ping-out 2.4s ease-out infinite;
        }
        @keyframes ping-out {
          0% {
            transform: scale(1);
            opacity: 0.8;
          }
          100% {
            transform: scale(1.8);
            opacity: 0;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .weave-layer,
          .glow-drift-1,
          .glow-drift-2,
          .node-ping {
            animation: none !important;
          }
        }
      `}</style>
    </section>
  );
}