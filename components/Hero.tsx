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

export default function Hero() {
  const containerRef = useRef<HTMLElement>(null);
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

  // Image: slow zoom + gentle dim while scrolling down
  const imageScale = useTransform(
    smoothScrollProgress,
    [0, 1],
    shouldAnimate ? [1, 1.08] : [1, 1],
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

  return (
    <section
      ref={containerRef}
      className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-[#0A0A0B]"
    >
      {/* ---- Premium Background with Visible Textures ---- */}
      <div className="absolute inset-0 h-full w-full">
        {/* Image Container (scroll zoom + dim applied here) */}
        <motion.div
          className="relative h-full w-full will-change-transform"
          style={{ scale: imageScale, opacity: imageOpacity }}
        >
          <Image
            src="/Images/factory-background.jpg"
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
        </motion.div>

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

      {/* ---- Content ---- */}
      <motion.div
        className="relative z-10 mx-auto w-full max-w-6xl px-6 py-20 sm:px-10 sm:py-24 lg:px-14 lg:py-28"
        style={{ y: contentY }}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Eyebrow */}
        <motion.div
          variants={itemVariants}
          className="flex items-center gap-3 sm:gap-4"
        >
          <span className="h-px w-8 bg-gradient-to-r from-[#C9A227]/80 to-[#6E8CAE]/60 sm:w-12" />
          <span
            className={`${plexMono.className} text-[0.62rem] uppercase tracking-[0.26em] text-white/65 sm:text-xs sm:tracking-[0.32em]`}
          >
            Viona FIBC Private Limited
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          variants={itemVariants}
          className="mt-6 max-w-4xl text-[2.6rem] leading-[1.04] tracking-[-0.03em] text-white sm:mt-7 sm:text-6xl md:text-7xl lg:text-[5.75rem]"
          style={{
            fontFamily: robotoCondensed.style.fontFamily,
            textShadow: "0 2px 32px rgba(0,0,0,0.5)",
          }}
        >
          <span className="block font-light text-white/75">Engineered for</span>
          <span className="block font-bold">Heavy Loads.</span>
          <span className="block font-light text-white/75">
            Built for lasting{" "}
            <span className="font-bold text-[#8FA8C4]">performance.</span>
          </span>
        </motion.h1>

        {/* Thin divider */}
        <motion.span
          variants={itemVariants}
          className="mt-8 block h-px w-16 bg-gradient-to-r from-[#6E8CAE] to-transparent sm:mt-10 sm:w-24"
        />

        {/* Description */}
        <motion.p
          variants={itemVariants}
          className={`${robotoCondensed.className} mt-6 max-w-xl text-[1.05rem] font-light leading-[1.7] tracking-[0.005em] text-white/70 sm:text-lg md:text-xl`}
        >
          Viona Flexible Packaging Pvt. Ltd. designs and manufactures durable
          FIBC bulk bags — precision-engineered, load-tested, and built to
          support demanding industrial applications worldwide.
        </motion.p>

        {/* CTA */}
        <motion.div
          variants={itemVariants}
          className="mt-9 flex flex-wrap items-center gap-5 sm:mt-10 md:mt-12"
        >
          <Link
            href="/contact"
            className={`${robotoCondensed.className} group inline-flex items-center gap-3 rounded-full border border-white/25 bg-white/[0.04] px-6 py-3 text-base font-medium tracking-[0.06em] text-white backdrop-blur-sm transition-all duration-300 hover:border-[#6E8CAE] hover:bg-[#6E8CAE]/15 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8FA8C4] sm:px-8 sm:py-3.5`}
          >
            Request a quote
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}
