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

// -------- Count-up hook --------
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

// -------- SWL Gauge --------
function SWLGauge({ active }: { active: boolean }) {
  const value = useCountUp(2000, 1400, active);

  return (
    <div className="pointer-events-none absolute left-3 top-1/2 hidden -translate-y-1/2 flex-col items-center gap-2 md:flex xl:left-8">
      <span
        className={`${plexMono.className} text-[0.5rem] tracking-[0.2em] text-white/40 xl:text-[0.6rem]`}
      >
        SWL
      </span>
      <div className="relative h-24 w-px bg-white/10 md:h-32 xl:h-40">
        <motion.div
          className="absolute bottom-0 left-0 w-px bg-[#6E8CAE]"
          initial={{ height: "0%" }}
          animate={{ height: active ? "100%" : "0%" }}
          transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
      <span className={`${plexMono.className} text-[10px] text-[#6E8CAE] xl:text-xs`}>
        {value.toLocaleString()}
        <span className="text-white/40"> KG</span>
      </span>
    </div>
  );
}

// -------- Spec Card --------
const specRows = [
  { label: "Fabric", value: "Woven PP, 90–220 GSM" },
  { label: "UV Rating", value: "12-month stabilized" },
  { label: "Capacity Range", value: "500 – 2,000 KG" },
];

function SpecCard({ active }: { active: boolean }) {
  return (
    <motion.div
      className="pointer-events-none absolute right-3 top-1/2 hidden -translate-y-1/2 rounded-lg border border-white/10 bg-white/[0.02] p-3 backdrop-blur-sm md:block xl:right-8 xl:w-[300px] xl:p-6"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: active ? 1 : 0, x: active ? 0 : 20 }}
      transition={{ duration: 0.9, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="flex items-center gap-2 border-b border-white/10 pb-2 xl:pb-3">
        <span className="h-1 w-1 rounded-full bg-[#6E8CAE] xl:h-1.5 xl:w-1.5" />
        <span
          className={`${plexMono.className} text-[0.45rem] uppercase tracking-[0.2em] text-white/50 xl:text-[0.6rem] xl:tracking-[0.25em]`}
        >
          Specification
        </span>
      </div>
      <dl className="mt-2 flex flex-col gap-2 xl:mt-4 xl:gap-4">
        {specRows.map((row) => (
          <div key={row.label} className="flex flex-col gap-0.5">
            <dt
              className={`${plexMono.className} text-[0.4rem] uppercase tracking-[0.15em] text-white/35 xl:text-[0.6rem]`}
            >
              {row.label}
            </dt>
            <dd
              className={`${plexMono.className} text-[10px] text-white/80 xl:text-sm`}
            >
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
    { clamp: false }
  );
  const imageOpacity = useTransform(
    smoothScrollProgress,
    [0, 0.4],
    isDesktop ? [1, 0.75] : [1, 1]
  );
  const contentY = useTransform(
    smoothScrollProgress,
    [0, 0.5],
    shouldAnimate ? [0, 30] : [0, 0]
  );

  const signatureActive = mounted && !prefersReducedMotion;

  return (
    <section
      ref={containerRef}
      className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-[#0A0A0B]"
    >
      {/* ---- Premium Background with Visible Textures ---- */}
      <div className="absolute inset-0 h-full w-full">
        {/* Image Container */}
        <div className="relative h-full w-full">
          <Image
            src="/Images/hero-bags.jpg"
            alt="FIBC bulk bags stacked in a warehouse"
            fill
            sizes="100vw"
            quality={85}
            className="object-cover object-center"
            priority
            fetchPriority="high"
            placeholder="blur"
            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAADAAQDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCwAA//2Q=="
          />
        </div>

        {/* Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0B] via-[#0A0A0B]/70 to-[#0A0A0B]/20" />
        <div className="absolute inset-0 bg-gradient-to-br from-[#0A0A0B]/60 via-transparent to-[#0A0A0B]/80" />

        {/* ====== VISIBLE TEXTURES ====== */}

        {/* 1. Woven Fabric Pattern - Main Texture */}
        <div
          className="absolute inset-0 opacity-[0.15]"
          style={{
            backgroundImage: `
              repeating-linear-gradient(
                45deg, 
                rgba(255,255,255,0.12) 0px, 
                rgba(255,255,255,0.12) 1px, 
                transparent 1px, 
                transparent 6px
              ),
              repeating-linear-gradient(
                -45deg, 
                rgba(255,255,255,0.12) 0px, 
                rgba(255,255,255,0.12) 1px, 
                transparent 1px, 
                transparent 6px
              )
            `,
          }}
        />

        {/* 2. Diagonal Cross-Hatch Pattern */}
        <div
          className="absolute inset-0 opacity-[0.10]"
          style={{
            backgroundImage: `
              repeating-linear-gradient(
                0deg, 
                transparent, 
                transparent 30px,
                rgba(255,255,255,0.06) 30px,
                rgba(255,255,255,0.06) 31px,
                transparent 31px,
                transparent 60px
              ),
              repeating-linear-gradient(
                90deg, 
                transparent, 
                transparent 30px,
                rgba(255,255,255,0.06) 30px,
                rgba(255,255,255,0.06) 31px,
                transparent 31px,
                transparent 60px
              )
            `,
          }}
        />

        {/* 3. Industrial Grid Pattern */}
        <div
          className="absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)
            `,
            backgroundSize: "50px 50px",
          }}
        />

        {/* 4. Woven Polypropylene Grain */}
        <div
          className="absolute inset-0 opacity-[0.12]"
          style={{
            backgroundImage: `
              repeating-linear-gradient(
                to right,
                transparent 0px,
                transparent 2px,
                rgba(255,255,255,0.05) 2px,
                rgba(255,255,255,0.05) 3px,
                transparent 3px,
                transparent 5px
              ),
              repeating-linear-gradient(
                to bottom,
                transparent 0px,
                transparent 2px,
                rgba(255,255,255,0.05) 2px,
                rgba(255,255,255,0.05) 3px,
                transparent 3px,
                transparent 5px
              )
            `,
          }}
        />

        {/* 5. Diagonal Light Rays */}
        <div
          className="absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage: `
              repeating-linear-gradient(
                55deg,
                transparent 0px,
                transparent 80px,
                rgba(255,255,255,0.07) 80px,
                rgba(255,255,255,0.07) 81px,
                transparent 81px,
                transparent 160px
              ),
              repeating-linear-gradient(
                -55deg,
                transparent 0px,
                transparent 80px,
                rgba(255,255,255,0.07) 80px,
                rgba(255,255,255,0.07) 81px,
                transparent 81px,
                transparent 160px
              )
            `,
          }}
        />

        {/* 6. Subtle Noise/Dots Pattern */}
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage: `
              radial-gradient(circle at 20% 30%, rgba(255,255,255,0.08) 1px, transparent 1px),
              radial-gradient(circle at 70% 60%, rgba(255,255,255,0.06) 1px, transparent 1px),
              radial-gradient(circle at 40% 80%, rgba(255,255,255,0.05) 1px, transparent 1px),
              radial-gradient(circle at 90% 20%, rgba(255,255,255,0.07) 1px, transparent 1px)
            `,
            backgroundSize: "100px 100px",
          }}
        />

        {/* 7. Ambient Glows - Warm Gold (Left) */}
        <div className="absolute left-0 top-1/4 h-[60%] w-[35%] rounded-full bg-[#C9A227]/[0.08] blur-[120px]" />

        {/* 8. Ambient Glows - Cool Blue (Right) */}
        <div className="absolute bottom-0 right-0 h-[50%] w-[40%] rounded-full bg-[#6E8CAE]/[0.07] blur-[140px]" />

        {/* 9. Center Highlight */}
        <div className="absolute left-1/2 top-1/3 h-[40%] w-[30%] -translate-x-1/2 rounded-full bg-white/[0.03] blur-[100px]" />

        {/* 10. Vignette Effect */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at center, transparent 40%, rgba(10,10,11,0.5) 100%)",
          }}
        />

        {/* 11. Edge Darkening - Top */}
        <div className="absolute left-0 top-0 h-[30%] w-full bg-gradient-to-b from-[#0A0A0B]/40 to-transparent" />

        {/* 12. Edge Darkening - Bottom */}
        <div className="absolute bottom-0 left-0 h-[30%] w-full bg-gradient-to-t from-[#0A0A0B]/60 to-transparent" />

        {/* 13. Glass Reflection Lines */}
        <div className="absolute left-0 top-0 h-[1px] w-[40%] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        <div className="absolute bottom-0 right-0 h-[1px] w-[40%] bg-gradient-to-l from-transparent via-white/10 to-transparent" />

        {/* 14. Subtle Diagonal Glare */}
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{
            background:
              "linear-gradient(135deg, rgba(255,255,255,0.08) 0%, transparent 50%, rgba(255,255,255,0.03) 100%)",
          }}
        />
      </div>

      {/* SWL Gauge */}
      <SWLGauge active={signatureActive} />

      {/* Spec Card */}
      <SpecCard active={signatureActive} />

      {/* ---- Content ---- */}
      <motion.div
        className="relative z-10 mx-auto w-full max-w-6xl px-5 py-16 sm:px-8 sm:py-20 md:py-24 lg:px-12 lg:py-28"
        style={{ y: contentY }}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Eyebrow */}
        <motion.div variants={itemVariants} className="flex items-center gap-3">
          <span className="h-px w-6 bg-[#6E8CAE]/60 sm:w-8" />
          <span
            className={`${plexMono.className} text-[0.5rem] uppercase tracking-[0.2em] text-white/60 sm:text-[0.6rem] sm:tracking-[0.25em]`}
          >
            Viona FIBC Private Limited
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          variants={itemVariants}
          className="mt-5 max-w-3xl text-4xl leading-[1.08] tracking-[-0.02em] text-white sm:text-5xl md:text-6xl lg:text-7xl"
          style={{ fontFamily: robotoCondensed.style.fontFamily }}
        >
          <span className="font-light text-white/80">Engineered for</span>
          <br className="hidden sm:block" />
          <span className="font-bold">Heavy Loads.</span>
          <br />
          <span className="font-light text-white/80">Built for lasting</span>{" "}
          <span className="font-bold text-[#8FA8C4]">performance.</span>
        </motion.h1>

        {/* Description */}
        <motion.p
          variants={itemVariants}
          className={`${robotoCondensed.className} mt-5 max-w-lg text-sm leading-relaxed text-white/60 sm:text-base md:mt-6 md:text-lg`}
        >
          Viona Flexible Packaging Pvt. Ltd. designs and manufactures durable
          FIBC bulk bags — precision-engineered, load-tested, and built to
          support demanding industrial applications worldwide.
        </motion.p>

        {/* CTA */}
        <motion.div
          variants={itemVariants}
          className="mt-7 flex flex-wrap items-center gap-5 sm:mt-8 sm:gap-6 md:mt-10 md:gap-8"
        >
          <Link
            href="/contact"
            className="group inline-flex items-center gap-2 rounded-full border border-white/20 px-5 py-2.5 text-sm font-medium tracking-widetext-white transition-colors duration-300 hover:border-[#6E8CAE] hover:bg-[#6E8CAE]/10 sm:px-6 sm:py-3"
          >
            Request a quote
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </motion.div>
        
      </motion.div>
    </section>
  );
}