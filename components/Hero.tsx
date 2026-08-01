"use client";

import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
  useInView,
} from "motion/react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ChevronDown, Sparkles } from "lucide-react";
import { useRef, useEffect, useState } from "react";
import { Highlight, HeroHighlight } from "./ui/hero0highlight.tsx";
import { Roboto_Condensed } from "next/font/google";

const robotoCondensed = Roboto_Condensed({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
});
// -------- Letter animation variants --------
const letterVariants = {
  hidden: { opacity: 0, y: 60, rotateX: -15 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: {
      duration: 0.6,
      delay: i * 0.035,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.2,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

// -------- Particle component (now blue) --------
const Particle = ({ delay, duration, size, x, y }: any) => (
  <motion.div
    className="absolute rounded-full bg-blue-400/20"
    style={{
      width: size,
      height: size,
      left: x,
      top: y,
      filter: "blur(1px)",
      willChange: "transform, opacity",
    }}
    animate={{
      y: [y, y - 30, y],
      x: [x, x + 20, x],
      opacity: [0.2, 0.6, 0.2],
    }}
    transition={{
      duration,
      delay,
      repeat: Infinity,
      ease: "easeInOut",
    }}
  />
);

export default function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const smoothScrollProgress = useSpring(scrollYProgress, {
    damping: 30,
    stiffness: 200,
    mass: 0.5,
  });

  const imageScale = useTransform(smoothScrollProgress, [0, 1], [1, 1.08], {
    clamp: false,
  });
  const imageOpacity = useTransform(smoothScrollProgress, [0, 0.4], [1, 0.7]);
  const contentY = useTransform(smoothScrollProgress, [0, 0.5], [0, 40]);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { damping: 30, stiffness: 200 });
  const springY = useSpring(mouseY, { damping: 30, stiffness: 200 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const x = (clientX / window.innerWidth - 0.5) * 20;
      const y = (clientY / window.innerHeight - 0.5) * 20;
      mouseX.set(x);
      mouseY.set(y);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  const [particles, setParticles] = useState<
    Array<{
      x: number;
      y: number;
      size: number;
      duration: number;
      delay: number;
    }>
  >([]);

  useEffect(() => {
    setParticles(
      Array.from({ length: 12 }, () => ({
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 6 + 2,
        duration: Math.random() * 8 + 6,
        delay: Math.random() * 5,
      })),
    );
  }, []);

  const gridRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(gridRef, { once: true });

  const titleText = "Built for the big lift.";

  return (
    <section
      ref={containerRef}
      className="relative flex min-h-[100vh] items-end overflow-hidden bg-[#0c0b09]"
    >
      {/* ---- Background Image with Mouse Parallax ---- */}
      <motion.div
        className="absolute inset-0 h-full w-full"
        style={{
          scale: imageScale,
          opacity: imageOpacity,
          x: useTransform(springX, (v) => v * 0.8),
          y: useTransform(springY, (v) => v * 0.8),
          willChange: "transform, opacity",
        }}
      >
        <Image
          src="/Images/hero-bags.jpg"
          alt="FIBC bulk bags stacked in a warehouse, ready for dispatch"
          fill
          className="object-cover"
          priority
        />
        {/* ---- Overlay gradients (cool blue tones) ---- */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0c0b09]/60 via-[#0c0b09]/50 to-[#0c0b09]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0c0b09]/40 via-transparent to-[#0c0b09]/20" />

        {/* ---- Animated light sweep (blue) ---- */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-400/10 to-transparent"
          animate={{
            x: ["-100%", "200%"],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{ width: "60%", filter: "blur(60px)" }}
        />

        {/* ---- Warm glow accents replaced with blue ---- */}
        <div className="absolute bottom-0 left-0 h-[60%] w-[60%] bg-blue-400/5 blur-[120px] rounded-full" />
        <div className="absolute top-0 right-0 h-[40%] w-[40%] bg-blue-400/5 blur-[100px] rounded-full" />

        {/* ---- Subtle grid overlay (blue) ---- */}
        <div
          ref={gridRef}
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `
                            linear-gradient(rgba(96, 165, 250, 0.03) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(96, 165, 250, 0.03) 1px, transparent 1px)
                        `,
            backgroundSize: "60px 60px",
            opacity: isInView ? 0.6 : 0,
            transition: "opacity 1.5s ease",
          }}
        />
      </motion.div>

      {/* ---- Floating Particles (blue) ---- */}
      {particles.length > 0 && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {particles.map((p, i) => (
            <Particle key={i} {...p} />
          ))}
        </div>
      )}

      {/* ---- Grain texture (kept) ---- */}
      <div className="absolute inset-0 opacity-[0.035] pointer-events-none mix-blend-soft-light">
        <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
          <filter id="grain">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.75"
              numOctaves="3"
              stitchTiles="stitch"
            />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 0, 0 0 0 0 0, 0 0 0 0 0, 0 0 0 0.5 0"
            />
          </filter>
          <rect width="100%" height="100%" filter="url(#grain)" />
        </svg>
      </div>

      {/* ---- Content ---- */}
      <motion.div
        className="relative z-10 mx-auto w-full max-w-6xl px-6 pb-24 pt-32 lg:px-12 lg:pb-32"
        style={{ y: contentY }}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Badge - white & blue */}
        <motion.div variants={itemVariants} className="flex items-center gap-4">
          <span className="h-px w-12 bg-blue-400/60" />
          <span className="flex items-center gap-2 text-[0.65rem] font-medium uppercase tracking-[0.25em] text-blue-400/80">
            <Sparkles className="h-3 w-3" />
            Viona FIBC Private Limited
          </span>
          <span className="h-px flex-1 bg-blue-400/20" />
        </motion.div>

        {/* Main Heading - white with blue accent */}
        {/* <motion.h1
                    variants={itemVariants}
                    className="mt-8 max-w-3xl font-display text-5xl font-black uppercase leading-[0.92] text-white sm:text-7xl lg:text-8xl"
                >
                    <span className="inline-block overflow-hidden">
                        {titleText.split(' ').map((word, wordIdx) => (
                            <span key={wordIdx} className="inline-block mr-3">
                                {word === "big" || word === "lift." ? (
                                    <span className="text-blue-400">
                                        {word.split('').map((char, charIdx) => (
                                            <motion.span
                                                key={charIdx}
                                                custom={charIdx + wordIdx * 2}
                                                variants={letterVariants}
                                                className="inline-block"
                                            >
                                                {char}
                                            </motion.span>
                                        ))}
                                    </span>
                                ) : (
                                    <span>
                                        {word.split('').map((char, charIdx) => (
                                            <motion.span
                                                key={charIdx}
                                                custom={charIdx + wordIdx * 2}
                                                variants={letterVariants}
                                                className="inline-block"
                                            >
                                                {char}
                                            </motion.span>
                                        ))}
                                    </span>
                                )}
                            </span>
                        ))}
                    </span>
                </motion.h1> */}

        {/* <div className="relative z-10 flex min-h-[80vh] flex-col items-center justify-center px-4 text-center"> */}
       <motion.h1
  initial={{
    opacity: 0,
    y: 20,
  }}
  animate={{
    opacity: 1,
    y: [20, -5, 0],
  }}
  transition={{
    duration: 0.5,
    ease: [0.4, 0.0, 0.2, 1],
  }}
  style={{
    fontFamily: '"Roboto Condensed", sans-serif',
    fontOpticalSizing: "auto",
    fontWeight: 700,
    fontStyle: "normal",
  }}
  className="max-w-4xl text-3xl font-bold leading-relaxed text-white md:text-5xl lg:text-6xl lg:leading-snug"
>
  <Highlight className="text-white">Engineered</Highlight>
  {" "}for Heavy Loads.
  <br />
  <span className="text-blue-300">Built for Lasting</span>{" "}
  <Highlight className="text-white">Performance.</Highlight>
</motion.h1>

        {/* Description - white with blue accent */}
        <motion.p
          variants={itemVariants}
          className={`${robotoCondensed.className} mt-6 max-w-xl text-base leading-relaxed text-white/60 sm:text-lg lg:text-xl`}
        >
          Viona Flexible Packaging Pvt. Ltd. designs and manufactures durable
          FIBC bulk bags that combine dependable performance, precision
          manufacturing, and consistent quality. Our packaging solutions are
          built to support demanding industrial applications while delivering
          lasting value to customers around the world.
        </motion.p>

        {/* CTA Group - blue button */}
        {/* CTA Group - Premium Glass Button */}
        <motion.div
          variants={itemVariants}
          className="mt-10 flex flex-wrap items-center gap-5"
        >
          <Link
            href="/contact"
            className="group inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/5 px-6 py-3 text-sm font-medium tracking-wide text-white shadow-lg transition-all duration-300 hover:bg-blue-500 hover:border-blue-500 hover:text-white hover:shadow-blue-500/40"
          >
            Request a quote
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </motion.div>
        {/* Divider with certifications - white/blue */}

        {/* Scroll Indicator - white/blue */}
        <motion.div
          variants={itemVariants}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden sm:flex flex-col items-center gap-2 text-[0.55rem] font-medium uppercase tracking-[0.25em] text-white/25"
        >
          <span>Scroll</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="h-8 w-px bg-gradient-to-b from-blue-400/40 to-transparent"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}

// "use client";

// import { motion } from "motion/react";
// import Image from "next/image";
// import { HeroHighlight, Highlight } from "./ui/hero0highlight.tsx";
// import { ArrowRight } from "lucide-react";

// export function HeroSection() {
//   return (
//     <HeroHighlight>
//

//       <div className="relative z-10 flex min-h-[80vh] flex-col items-center justify-center px-4 text-center">
//         <motion.h1
//           initial={{
//             opacity: 0,
//             y: 20,
//           }}
//           animate={{
//             opacity: 1,
//             y: [20, -5, 0],
//           }}
//           transition={{
//             duration: 0.5,
//             ease: [0.4, 0.0, 0.2, 1],
//           }}
//           className="max-w-4xl text-3xl font-bold leading-relaxed text-white md:text-5xl lg:text-6xl lg:leading-snug"
//         >
//           Engineering{" "}
//           <Highlight className="text-white">
//             Excellence.
//           </Highlight>
//           <br />
//           <span className="text-blue-300">Packaging</span>{" "}
//           <Highlight className="text-white">
//             Innovation.
//           </Highlight>
//         </motion.h1>

//         <motion.p
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.2, duration: 0.5 }}
//           className="mt-4 max-w-2xl text-base text-gray-300 md:text-lg"
//         >
//           At VIONA, we combine advanced manufacturing technology with skilled
//           craftsmanship to create flexible packaging solutions trusted across
//           industries.
//         </motion.p>

//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.4, duration: 0.5 }}
//           className="mt-8 flex flex-wrap items-center justify-center gap-4"
//         >
//           <a
//             href="#"
//             className="group inline-flex items-center gap-2 rounded-full bg-blue-500 px-8 py-3 text-sm font-semibold text-white transition-all hover:bg-blue-400 hover:shadow-[0_0_30px_rgba(96,165,250,0.3)]"
//           >
//             Explore Our Facility
//             <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
//           </a>
//           <a
//             href="#"
//             className="inline-flex items-center gap-2 rounded-full border border-white/20 px-8 py-3 text-sm font-semibold text-white transition-all hover:border-blue-400 hover:bg-white/10"
//           >
//             Our Products
//           </a>
//         </motion.div>
//       </div>
//     </HeroHighlight>
//   );
// }

// 'use client';

// import { useRef } from 'react';
// import { motion, useScroll, useTransform } from 'motion/react';
// import Link from 'next/link';
// import Image from 'next/image';
// import { ArrowRight } from 'lucide-react';
// // import { SectionLabel } from '@/components/site/Reveal';  // adjust path if needed
// import { SectionLabel } from './ui/rever';
// export default function Hero() {
//   const heroRef = useRef<HTMLDivElement>(null);
//   const { scrollYProgress } = useScroll({
//     target: heroRef,
//     offset: ['start start', 'end start'],
//   });
//   const imageY = useTransform(scrollYProgress, [0, 1], ['0%', '18%']);
//   const textY = useTransform(scrollYProgress, [0, 1], ['0%', '40%']);
//   const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

//   return (
//     <section ref={heroRef} className="relative flex min-h-[92vh] items-end overflow-hidden">
//       {/* Parallax background image */}
//       <motion.div style={{ y: imageY }} className="absolute inset-0 h-[118%] w-full">
//         <Image
//           src="/Images/hero-bag.jpg"
//           alt="Stacks of white FIBC bulk bags in a warehouse"
//           fill
//           className="object-cover"
//           priority
//         />
//       </motion.div>
//       <div className="absolute inset-0 bg-[image:var(--gradient-hero)]" />
//       <div className="absolute inset-0 grid-lines opacity-40" />

//       {/* Content */}
//       <motion.div
//         style={{ y: textY, opacity: fade }}
//         className="relative mx-auto w-full max-w-7xl px-5 pb-20 pt-36 lg:px-8 lg:pb-28"
//       >
//         <motion.div
//           initial={{ opacity: 0, y: 24 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
//         >
//           <SectionLabel>Viona FIBC Private Limited</SectionLabel>
//         </motion.div>

//         <h1 className="mt-6 max-w-4xl font-display text-4xl font-extrabold leading-[1.05] text-foreground sm:text-6xl lg:text-7xl">
//           {'Big bags engineered for the weight of industry'.split(' ').map((word, i) => (
//             <motion.span
//               key={`${word}-${i}`}
//               className="mr-[0.28em] inline-block"
//               initial={{ opacity: 0, y: 30 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{
//                 duration: 0.7,
//                 delay: 0.15 + i * 0.055,
//                 ease: [0.22, 1, 0.36, 1],
//               }}
//             >
//               {word}
//             </motion.span>
//           ))}
//         </h1>

//         <motion.p
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.7, delay: 0.65 }}
//           className="mt-7 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg"
//         >
//           An India based manufacturer pursuing excellence in the production of FIBC
//           bulk bags — premium craftsmanship, precise quality control, affordable
//           pricing.
//         </motion.p>

//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.7, delay: 0.8 }}
//           className="mt-10"
//         >
//           <Link
//             href="/contact"
//             className="group inline-flex items-center gap-3 rounded-sm bg-primary px-7 py-4 font-display text-sm font-semibold tracking-wide text-primary-foreground transition-transform duration-300 hover:scale-[1.03]"
//           >
//             Request a quote
//             <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
//           </Link>
//         </motion.div>
//       </motion.div>
//     </section>
//   );
// }
// import { motion } from "framer-motion";
// import { ArrowRight, Phone, ChevronDown } from "lucide-react";
// import { BackgroundFX } from "./Backgroundfx";
// import { FrameVisual } from "./framevisuals";
// import { FeatureCard } from "./FeatureCard";
// import { Button } from "./ui/button";
// import { heroFeatures } from "@/lib/data";

// // import { Button } from "@/components/ui/Button";
// // import { FrameVisual } from "./framevisuals";
// // import { BackgroundFX } from "@/components/BackgroundFX";
// // import { FeatureCard } from "@/components/FeatureCard";
// const fadeUp = {
//   hidden: { opacity: 0, y: 24 },
//   show: (delay = 0) => ({
//     opacity: 1,
//     y: 0,
//     transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] },
//   }),
// };

// export function Hero() {
//   return (
//     <section
//       id="home"
//       aria-label="VIONA Flexible Packaging — introduction"
//       className="relative flex min-h-screen w-full flex-col overflow-hidden bg-[var(--background)]"
//     >
//       <BackgroundFX />

//       <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-1 flex-col px-6 pt-28 sm:px-10 lg:grid lg:grid-cols-[1.05fr_1fr] lg:items-center lg:gap-14 lg:pt-24 xl:gap-20">
//         {/* LEFT — copy & CTAs */}
//         <div className="flex flex-col items-start">
//           <motion.div
//             initial="hidden"
//             animate="show"
//             custom={0}
//             variants={fadeUp}
//             className="mb-7 inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.04] px-4 py-1.5 backdrop-blur-md"
//           >
//             <span className="relative flex h-2 w-2">
//               <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--accent)] opacity-75" />
//               <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--accent)]" />
//             </span>
//             <span className="text-xs font-semibold tracking-[0.2em] text-[var(--text-muted)]">
//               WELCOME TO VIONA
//             </span>
//           </motion.div>

//           <motion.h1
//             initial="hidden"
//             animate="show"
//             custom={0.1}
//             variants={fadeUp}
//             className="[font-family:var(--font-display)] text-4xl font-extrabold leading-[1.08] tracking-tight text-[var(--foreground)] sm:text-5xl lg:text-6xl"
//           >
//             Flexible Packaging.
//             <br />
//             <span className="bg-gradient-to-r from-[var(--accent)] to-[var(--accent-2)] bg-clip-text text-transparent">
//               Stronger Future.
//             </span>
//           </motion.h1>

//           <motion.p
//             initial="hidden"
//             animate="show"
//             custom={0.2}
//             variants={fadeUp}
//             className="mt-6 max-w-xl text-base leading-relaxed text-[var(--text-muted)] sm:text-lg"
//           >
//             Great packaging is built on precision, reliability, and
//             responsibility. At VIONA FIBC Pvt. Ltd., we develop
//             high-quality flexible packaging solutions that safeguard products,
//             support operational efficiency, and contribute to a more sustainable
//             future. Trusted by businesses across food, pharmaceutical, and
//             consumer markets, we deliver packaging designed for today's needs
//             and tomorrow's challenges.
//           </motion.p>

//           <motion.div
//             initial="hidden"
//             animate="show"
//             custom={0.3}
//             variants={fadeUp}
//             className="mt-10 grid w-full grid-cols-1 gap-4 sm:grid-cols-2 md:max-w-md lg:max-w-lg"
//           >
//             <Button
//               variant="primary"
//               icon={<ArrowRight className="h-4 w-4" strokeWidth={2.25} />}
//               className="w-full justify-center rounded-full px-6 py-3.5 text-base font-semibold shadow-lg shadow-amber-500/20 transition-all duration-300 hover:scale-[1.02] hover:shadow-amber-500/40 active:scale-[0.98]"
//             >
//               Explore Products
//             </Button>
//             <Button
//               variant="secondary"
//               icon={<Phone className="h-4 w-4" strokeWidth={2} />}
//               iconPosition="left"
//               className="w-full justify-center rounded-full border border-white/15 bg-white/5 px-6 py-3.5 text-base font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:bg-white/10 hover:shadow-[0_0_30px_rgba(255,255,255,0.05)] active:scale-[0.98]"
//             >
//               Contact Us
//             </Button>
//           </motion.div>

//           {/* Feature cards — horizontal scroll on mobile / tablet only */}
//           {/* <div className="mt-14 flex w-full snap-x gap-4 overflow-x-auto pb-2 lg:hidden [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
//             {heroFeatures.map((feature, i) => (
//               <FeatureCard
//                 key={feature.id}
//                 feature={feature}
//                 index={i}
//                 orientation="horizontal"
//               />
//             ))}
//           </div> */}

//           <motion.div
//             initial="hidden"
//             animate="show"
//             custom={0.4}
//             variants={fadeUp}
//             className="mt-16 hidden items-center gap-2.5 lg:flex"
//           >
//             <span className="relative flex h-2 w-2">
//               <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--accent)] opacity-75" />
//               <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--accent)]" />
//             </span>
//             <span className="text-xs font-semibold tracking-[0.2em] text-[var(--text-muted)]">
//               SCROLL TO EXPLORE
//             </span>
//             <motion.span
//               animate={{ y: [0, 4, 0] }}
//               transition={{
//                 duration: 1.6,
//                 repeat: Infinity,
//                 ease: "easeInOut",
//               }}
//               className="text-[var(--text-muted)]"
//             >
//               <ChevronDown className="h-3.5 w-3.5" />
//             </motion.span>
//           </motion.div>
//         </div>

//         {/* RIGHT — framed image + floating feature panel */}
//         <FrameVisual />
//       </div>
//     </section>
//   );
// }
