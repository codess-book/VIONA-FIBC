"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useReducedMotion,
} from "motion/react";
import { Roboto_Condensed, IBM_Plex_Mono } from "next/font/google";

const robotoCondensed = Roboto_Condensed({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
});

// -------- Animation variants --------
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.15,
      ease: [0.4, 0, 0.2, 1] as [number, number, number, number],
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
  },
};

// -------- Count-up hook for the SWL gauge (signature element) --------
function useCountUp(target: number, durationMs: number, start: boolean) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!start) return;
    let startTime: number | null = null;
    let raf = 0;

    const step = (t: number) => {
      if (startTime === null) startTime = t;
      const progress = Math.min((t - startTime) / durationMs, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(eased * target));
      if (progress < 1) raf = requestAnimationFrame(step);
    };

    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [start, target, durationMs]);

  return value;
}
// -------- Blueprint-style bag illustration — fills the right side --------
// Pure SVG line-art, no raster image, negligible weight even on mobile.
function BagBlueprint({ active }: { active: boolean }) {
  return (
    <motion.div
      className="pointer-events-none absolute right-6 top-1/2 hidden w-[280px] -translate-y-1/2 lg:block xl:right-16 xl:w-[340px]"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: active ? 1 : 0, x: active ? 0 : 20 }}
      transition={{ duration: 0.9, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
    >
      <svg
        viewBox="0 0 340 420"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full"
      >
        {/* top face (parallelogram) */}
        <path
          d="M70 90 L200 60 L270 90 L140 120 Z"
          stroke="#6E8CAE"
          strokeOpacity="0.35"
          strokeWidth="1"
        />
        {/* front face */}
        <path
          d="M70 90 L140 120 L140 330 L70 300 Z"
          stroke="#6E8CAE"
          strokeOpacity="0.5"
          strokeWidth="1"
        />
        {/* side face */}
        <path
          d="M140 120 L270 90 L270 300 L140 330 Z"
          stroke="#6E8CAE"
          strokeOpacity="0.25"
          strokeWidth="1"
        />

        {/* lifting loops, top corners */}
        <circle cx="70" cy="90" r="7" stroke="#C9A227" strokeOpacity="0.6" strokeWidth="1" />
        <circle cx="200" cy="60" r="7" stroke="#C9A227" strokeOpacity="0.6" strokeWidth="1" />
        <circle cx="270" cy="90" r="7" stroke="#C9A227" strokeOpacity="0.6" strokeWidth="1" />
        <circle cx="140" cy="120" r="7" stroke="#C9A227" strokeOpacity="0.6" strokeWidth="1" />

        {/* bottom dimension line */}
        <line x1="70" y1="345" x2="140" y2="365" stroke="white" strokeOpacity="0.15" strokeWidth="1" />
        <line x1="140" y1="365" x2="270" y2="335" stroke="white" strokeOpacity="0.15" strokeWidth="1" />
        <text x="90" y="390" fill="white" fillOpacity="0.35" fontSize="10" fontFamily="monospace">
          1000 MM
        </text>

        {/* vertical dimension line */}
        <line x1="45" y1="90" x2="45" y2="300" stroke="white" strokeOpacity="0.15" strokeWidth="1" />
        <text
          x="10"
          y="200"
          fill="white"
          fillOpacity="0.35"
          fontSize="10"
          fontFamily="monospace"
          transform="rotate(-90 20 200)"
        >
          1200 MM
        </text>

        {/* spec tag */}
        <rect x="150" y="200" width="70" height="26" rx="2" stroke="#C9A227" strokeOpacity="0.4" strokeWidth="1" />
        <text x="160" y="217" fill="#C9A227" fillOpacity="0.7" fontSize="10" fontFamily="monospace">
          TYPE C
        </text>
      </svg>
    </motion.div>
  );
}

export default function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();

  // Hero is always above the fold on load, so trigger the signature
  // animations on mount rather than relying on scroll-into-view —
  // that avoided the earlier bug where a zero-size ref never fired.
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px) and (pointer: fine)");
    setIsDesktop(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const smoothScrollProgress = useSpring(scrollYProgress, {
    damping: 30,
    stiffness: 200,
    mass: 0.5,
  });

  const shouldAnimate = isDesktop && !prefersReducedMotion;

  const imageScale = useTransform(
    smoothScrollProgress,
    [0, 1],
    shouldAnimate ? [1, 1.05] : [1, 1],
    { clamp: false },
  );
  const imageOpacity = useTransform(
    smoothScrollProgress,
    [0, 0.4],
    isDesktop ? [1, 0.75] : [1, 1],
  );
  const contentY = useTransform(
    smoothScrollProgress,
    [0, 0.5],
    shouldAnimate ? [0, 30] : [0, 0],
  );

  const signatureActive = mounted && !prefersReducedMotion;

  return (
    <section
      ref={containerRef}
      className="relative flex min-h-[100vh] items-end overflow-hidden bg-[#0A0A0B]"
    >
      {/* ---- Background image ---- */}
      <motion.div
        className="absolute inset-0 h-full w-full"
        style={{ scale: imageScale, opacity: imageOpacity, willChange: "transform, opacity" }}
      >
        <Image
          src="/Images/hero-bags.jpg"
          alt="FIBC bulk bags stacked in a warehouse, ready for dispatch"
          fill
          sizes="100vw"
          quality={90}
          className="object-cover"
          priority
          fetchPriority="high"
          placeholder="empty"
        />

        {/* Restrained overlay — one gradient, no stacked color washes */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0B] via-[#0A0A0B]/70 to-[#0A0A0B]/20" />

        {/* Single vignette accent, desktop only — replaces the old multi-blob glow */}
        <div className="absolute bottom-0 right-0 hidden h-[50%] w-[40%] rounded-full bg-[#6E8CAE]/[0.06] blur-[100px] md:block" />
      </motion.div>

      {/* SWL gauge — the one signature motion moment */}
      <SWLGauge active={signatureActive} />

      {/* Blueprint graphic — fills the right side, reinforces the spec/technical theme */}
      <BagBlueprint active={signatureActive} />

      {/* ---- Content ---- */}
      <motion.div
        className="relative z-10 mx-auto w-full max-w-6xl px-6 pb-20 pt-32 lg:px-12 lg:pb-24"
        style={{ y: contentY }}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Eyebrow — mono, technical, restrained */}
        <motion.div variants={itemVariants} className="flex items-center gap-3">
          <span className="h-px w-8 bg-[#6E8CAE]/50" />
          <span
            className={`${plexMono.className} text-[0.65rem] uppercase tracking-[0.25em] text-white/50`}
          >
            Viona FIBC Private Limited
          </span>
        </motion.div>

        {/* Headline — weight contrast does the work, no highlight gimmicks */}
        <motion.h1
          variants={itemVariants}
          className="mt-8 max-w-3xl text-[2.5rem] leading-[1.05] tracking-[-0.02em] text-white sm:text-6xl lg:text-7xl"
          style={{ fontFamily: robotoCondensed.style.fontFamily }}
        >
          <span className="font-light text-white/70">Engineered for</span>
          <br />
          <span className="font-bold">Heavy Loads.</span>
          <br />
          <span className="font-light text-white/70">Built for lasting</span>{" "}
          <span className="font-bold text-[#8FA8C4]">performance.</span>
        </motion.h1>

        {/* Description */}
        <motion.p
          variants={itemVariants}
          className={`${robotoCondensed.className} mt-8 max-w-lg text-base leading-relaxed text-white/50 sm:text-lg`}
        >
          Viona Flexible Packaging Pvt. Ltd. designs and manufactures durable
          FIBC bulk bags — precision-engineered, load-tested, and built to
          support demanding industrial applications worldwide.
        </motion.p>

        {/* CTA — one primary, one quiet secondary */}
        <motion.div
          variants={itemVariants}
          className="mt-10 flex flex-wrap items-center gap-8"
        >
          <Link
            href="/contact"
            className="group inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 text-sm font-medium tracking-wide text-white transition-colors duration-300 hover:border-[#6E8CAE] hover:bg-[#6E8CAE]/10"
          >
            Request a quote
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
          <Link
            href="/products"
            className={`${plexMono.className} text-xs uppercase tracking-[0.15em] text-white/40 underline decoration-white/20 underline-offset-4 transition-colors hover:text-white/70`}
          >
            View specifications
          </Link>
        </motion.div>

        {/* Spec strip — replaces the old bouncing scroll indicator */}
        <motion.div
          variants={itemVariants}
          className={`${plexMono.className} mt-16 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-white/10 pt-5 text-[0.65rem] uppercase tracking-[0.15em] text-white/30`}
        >
          <span>ISO 9001 Certified</span>
          <span className="hidden h-3 w-px bg-white/15 sm:block" />
          <span>UN Certified Packaging</span>
          <span className="hidden h-3 w-px bg-white/15 sm:block" />
          <span>Export to 20+ Countries</span>
        </motion.div>
      </motion.div>
    </section>
  );
}