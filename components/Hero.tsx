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

// -------- Count-up hook for the SWL gauge --------
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

// -------- Safe Working Load gauge --------
function SWLGauge({ active }: { active: boolean }) {
  const value = useCountUp(2000, 1400, active);

  return (
    <div className="pointer-events-none absolute left-4 top-1/2 hidden -translate-y-1/2 flex-col items-center gap-3 lg:flex xl:left-8">
      <span
        className={`${plexMono.className} text-[0.6rem] tracking-[0.2em] text-white/40`}
      >
        SWL
      </span>
      <div className="relative h-32 w-px bg-white/10 lg:h-40">
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

// -------- Spec card --------
const specRows = [
  { label: "Fabric", value: "Woven PP, 90–220 GSM" },
  { label: "UV Rating", value: "12-month stabilized" },
  { label: "Capacity Range", value: "500 – 2,000 KG" },
];

function SpecCard({ active }: { active: boolean }) {
  return (
    <motion.div
      className="pointer-events-none absolute right-4 top-1/2 hidden -translate-y-1/2 rounded-lg border border-white/10 bg-white/[0.02] p-4 backdrop-blur-sm lg:block xl:right-8 xl:w-[320px] xl:p-6"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: active ? 1 : 0, x: active ? 0 : 20 }}
      transition={{ duration: 0.9, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="flex items-center gap-2 border-b border-white/10 pb-3">
        <span className="h-1.5 w-1.5 rounded-full bg-[#C9A227]" />
        <span
          className={`${plexMono.className} text-[0.55rem] uppercase tracking-[0.25em] text-white/50 xl:text-[0.6rem]`}
        >
          Specification
        </span>
      </div>
      <dl className="mt-3 flex flex-col gap-3 xl:mt-4 xl:gap-4">
        {specRows.map((row) => (
          <div key={row.label} className="flex flex-col gap-0.5">
            <dt
              className={`${plexMono.className} text-[0.5rem] uppercase tracking-[0.15em] text-white/35 xl:text-[0.6rem]`}
            >
              {row.label}
            </dt>
            <dd className={`${plexMono.className} text-xs text-white/80 xl:text-sm`}>
              {row.value}
            </dd>
          </div>
        ))}
      </dl>
    </motion.div>
  );
}

export default function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();

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
      className="relative flex min-h-screen items-center overflow-hidden bg-[#0A0A0B]"
    >
      {/* ---- Enhanced Background with Multiple Layers ---- */}
      <div className="absolute inset-0 h-full w-full">
        {/* Main Image */}
        <div className="relative h-full w-full">
          <Image
            src="/Images/hero-bags.jpg"
            alt="FIBC bulk bags stacked in a warehouse, ready for dispatch"
            fill
            sizes="100vw"
            quality={90}
            className="object-cover"
            priority
            fetchPriority="high"
            placeholder="blur"
            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAADAAQDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCwAA//2Q=="
          />
        </div>

        {/* Main Gradient Overlay - Darker for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0B] via-[#0A0A0B]/80 to-[#0A0A0B]/40" />

        {/* Additional Gradient from corners for depth */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0A0A0B]/50 via-transparent to-[#0A0A0B]/70" />

        {/* Woven Fabric Texture - Main Pattern */}
        <div
          className="absolute inset-0 opacity-[0.08] mix-blend-overlay"
          style={{
            backgroundImage: `
              repeating-linear-gradient(
                45deg, 
                rgba(255,255,255,0.1) 0px, 
                rgba(255,255,255,0.1) 1px, 
                transparent 1px, 
                transparent 8px
              ),
              repeating-linear-gradient(
                -45deg, 
                rgba(255,255,255,0.1) 0px, 
                rgba(255,255,255,0.1) 1px, 
                transparent 1px, 
                transparent 8px
              )
            `,
          }}
        />

        {/* Diagonal Cross-hatch Pattern - Industrial feel */}
        <div
          className="absolute inset-0 opacity-[0.05] mix-blend-overlay"
          style={{
            backgroundImage: `
              repeating-linear-gradient(
                0deg, 
                transparent, 
                transparent 40px,
                rgba(255,255,255,0.03) 40px,
                rgba(255,255,255,0.03) 41px,
                transparent 41px,
                transparent 80px
              ),
              repeating-linear-gradient(
                90deg, 
                transparent, 
                transparent 40px,
                rgba(255,255,255,0.03) 40px,
                rgba(255,255,255,0.03) 41px,
                transparent 41px,
                transparent 80px
              )
            `,
          }}
        />

        {/* Subtle Noise Texture - Organic feel */}
        <div
          className="absolute inset-0 opacity-[0.03] mix-blend-overlay"
          style={{
            backgroundImage: `
              radial-gradient(circle at 10% 20%, rgba(255,255,255,0.05) 0%, transparent 50%),
              radial-gradient(circle at 90% 80%, rgba(255,255,255,0.03) 0%, transparent 50%),
              radial-gradient(circle at 50% 50%, rgba(200,200,200,0.02) 0%, transparent 70%)
            `,
          }}
        />

        {/* Premium Grain Texture - Like woven polypropylene */}
        <div
          className="absolute inset-0 opacity-[0.06] mix-blend-overlay"
          style={{
            backgroundImage: `
              repeating-linear-gradient(
                to right,
                transparent 0px,
                transparent 3px,
                rgba(255,255,255,0.03) 3px,
                rgba(255,255,255,0.03) 4px,
                transparent 4px,
                transparent 7px
              ),
              repeating-linear-gradient(
                to bottom,
                transparent 0px,
                transparent 3px,
                rgba(255,255,255,0.03) 3px,
                rgba(255,255,255,0.03) 4px,
                transparent 4px,
                transparent 7px
              )
            `,
          }}
        />

        {/* Ambient Light Glow - Left side warm accent */}
        <div className="absolute left-0 top-0 h-[60%] w-[40%] rounded-full bg-[#C9A227]/[0.06] blur-[100px]" />

        {/* Ambient Light Glow - Right side cool accent */}
        <div className="absolute bottom-0 right-0 h-[70%] w-[50%] rounded-full bg-[#6E8CAE]/[0.06] blur-[120px]" />

        {/* Central Highlight - Adds depth to the middle */}
        <div className="absolute left-1/2 top-1/2 h-[40%] w-[30%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/[0.02] blur-[80px]" />

        {/* Edge Vignette - Darkens edges for focus */}
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(
                ellipse at center,
                transparent 50%,
                rgba(10,10,11,0.3) 100%
              )
            `,
          }}
        />

        {/* Industrial Grid Pattern - Subtle structure overlay */}
        <div
          className="absolute inset-0 opacity-[0.03] mix-blend-overlay"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
          }}
        />

        {/* Dynamic Light Rays - Diagonal beams */}
        <div
          className="absolute inset-0 opacity-[0.04] mix-blend-overlay"
          style={{
            backgroundImage: `
              repeating-linear-gradient(
                65deg,
                transparent 0px,
                transparent 100px,
                rgba(255,255,255,0.05) 100px,
                rgba(255,255,255,0.05) 101px,
                transparent 101px,
                transparent 200px
              ),
              repeating-linear-gradient(
                -65deg,
                transparent 0px,
                transparent 100px,
                rgba(255,255,255,0.05) 100px,
                rgba(255,255,255,0.05) 101px,
                transparent 101px,
                transparent 200px
              )
            `,
          }}
        />

        {/* Glass Reflection Effect - Top */}
        <div className="absolute left-0 top-0 h-[1px] w-[30%] bg-gradient-to-r from-transparent via-white/5 to-transparent" />

        {/* Glass Reflection Effect - Bottom */}
        <div className="absolute bottom-0 right-0 h-[1px] w-[30%] bg-gradient-to-l from-transparent via-white/5 to-transparent" />
      </div>

      {/* SWL gauge */}
      <SWLGauge active={signatureActive} />

      {/* Spec card */}
      <SpecCard active={signatureActive} />

      {/* ---- Content ---- */}
      <motion.div
        className="relative z-10 mx-auto w-full max-w-6xl px-4 py-12 sm:px-6 sm:py-16 md:pb-20 md:pt-32 lg:px-12 lg:pb-24"
        style={{ y: contentY }}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Eyebrow */}
        <motion.div variants={itemVariants} className="flex items-center gap-3">
          <span className="h-px w-6 bg-[#C9A227]/50 sm:w-8" />
          <span
            className={`${plexMono.className} text-[0.55rem] uppercase tracking-[0.2em] text-white/50 sm:text-[0.65rem] sm:tracking-[0.25em]`}
          >
            Viona FIBC Private Limited
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          variants={itemVariants}
          className="mt-6 max-w-3xl text-4xl leading-[1.05] tracking-[-0.02em] text-white sm:text-6xl lg:text-7xl"
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
          className={`${robotoCondensed.className} mt-6 max-w-lg text-sm leading-relaxed text-white/50 sm:text-base sm:mt-8 sm:text-lg`}
        >
          Viona Flexible Packaging Pvt. Ltd. designs and manufactures durable
          FIBC bulk bags — precision-engineered, load-tested, and built to
          support demanding industrial applications worldwide.
        </motion.p>

        {/* CTA */}
        <motion.div
          variants={itemVariants}
          className="mt-8 flex flex-wrap items-center gap-6 sm:mt-10 sm:gap-8"
        >
          <Link
            href="/contact"
            className="group inline-flex items-center gap-2 rounded-full border border-white/20 px-5 py-2.5 text-sm font-medium tracking-wide text-white transition-all duration-300 hover:border-[#C9A227] hover:bg-[#C9A227]/10 hover:shadow-[0_0_30px_rgba(201,162,39,0.1)] sm:px-6 sm:py-3"
          >
            Request a quote
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}