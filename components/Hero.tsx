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
  useInView,
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

// -------- Safe Working Load gauge — desktop-only signature element --------
function SWLGauge({ active }: { active: boolean }) {
  const value = useCountUp(2000, 1400, active);

  return (
    <div className="pointer-events-none absolute left-8 top-1/2 hidden -translate-y-1/2 flex-col items-center gap-3 xl:flex">
      <span
        className={`${plexMono.className} text-[0.6rem] tracking-[0.2em] text-white/40`}
      >
        SWL
      </span>
      <div className="relative h-40 w-px bg-white/10">
        <motion.div
          className="absolute bottom-0 left-0 w-px bg-[#C9A227]"
          initial={{ height: "0%" }}
          animate={{ height: active ? "100%" : "0%" }}
          transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
      <span className={`${plexMono.className} text-xs text-[#C9A227]`}>
        {value.toLocaleString()}
        <span className="text-white/40"> KG</span>
      </span>
    </div>
  );
}

export default function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const gaugeRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

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

  const isGaugeInView = useInView(gaugeRef, { once: true, margin: "-10%" });

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
          quality={80}
          className="object-cover"
          priority
          fetchPriority="high"
        />

        {/* Restrained overlay — one gradient, no stacked color washes */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0B] via-[#0A0A0B]/70 to-[#0A0A0B]/20" />

        {/* Single vignette accent, desktop only — replaces the old multi-blob glow */}
        <div className="absolute bottom-0 right-0 hidden h-[50%] w-[40%] rounded-full bg-[#6E8CAE]/[0.06] blur-[100px] md:block" />
      </motion.div>

      {/* SWL gauge — the one signature motion moment */}
      <div ref={gaugeRef}>
        <SWLGauge active={isGaugeInView && !prefersReducedMotion} />
      </div>

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