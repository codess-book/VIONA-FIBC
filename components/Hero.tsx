"use client";

import { motion } from "framer-motion";
import { ArrowRight, Phone, ChevronDown } from "lucide-react";
import { BackgroundFX } from "./Backgroundfx";
import { FrameVisual } from "./framevisuals";
import { FeatureCard } from "./FeatureCard";
import { Button } from "./ui/button";
import { heroFeatures } from "@/lib/data";

// import { Button } from "@/components/ui/Button";
// import { FrameVisual } from "./framevisuals";
// import { BackgroundFX } from "@/components/BackgroundFX";
// import { FeatureCard } from "@/components/FeatureCard";
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] },
  }),
};

export function Hero() {
  return (
    <section
      id="home"
      aria-label="VIONA Flexible Packaging — introduction"
      className="relative flex min-h-screen w-full flex-col overflow-hidden bg-[var(--background)]"
    >
      <BackgroundFX />

      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-1 flex-col px-6 pt-28 sm:px-10 lg:grid lg:grid-cols-[1.05fr_1fr] lg:items-center lg:gap-14 lg:pt-24 xl:gap-20">
        {/* LEFT — copy & CTAs */}
        <div className="flex flex-col items-start">
          <motion.div
            initial="hidden"
            animate="show"
            custom={0}
            variants={fadeUp}
            className="mb-7 inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.04] px-4 py-1.5 backdrop-blur-md"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--accent)] opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--accent)]" />
            </span>
            <span className="text-xs font-semibold tracking-[0.2em] text-[var(--text-muted)]">
              WELCOME TO VIONA
            </span>
          </motion.div>

          <motion.h1
            initial="hidden"
            animate="show"
            custom={0.1}
            variants={fadeUp}
            className="[font-family:var(--font-display)] text-4xl font-extrabold leading-[1.08] tracking-tight text-[var(--foreground)] sm:text-5xl lg:text-6xl"
          >
            Flexible Packaging.
            <br />
            <span className="bg-gradient-to-r from-[var(--accent)] to-[var(--accent-2)] bg-clip-text text-transparent">
              Stronger Future.
            </span>
          </motion.h1>

          <motion.p
            initial="hidden"
            animate="show"
            custom={0.2}
            variants={fadeUp}
            className="mt-6 max-w-xl text-base leading-relaxed text-[var(--text-muted)] sm:text-lg"
          >
            VIONA Flexible Packaging Pvt. Ltd. engineers high-performance
            flexible packaging for food, pharma, and consumer goods — combining
            precision manufacturing, sustainable materials, and rigorous quality
            control to help brands package what matters.
          </motion.p>

          <motion.div
  initial="hidden"
  animate="show"
  custom={0.3}
  variants={fadeUp}
  className="mt-10 grid w-full grid-cols-1 gap-4 sm:grid-cols-2 md:max-w-md lg:max-w-lg"
>
  <Button
    variant="primary"
    icon={<ArrowRight className="h-4 w-4" strokeWidth={2.25} />}
    className="w-full justify-center rounded-full px-6 py-3.5 text-base font-semibold shadow-lg shadow-amber-500/20 transition-all duration-300 hover:scale-[1.02] hover:shadow-amber-500/40 active:scale-[0.98]"
  >
    Explore Products
  </Button>
  <Button
    variant="secondary"
    icon={<Phone className="h-4 w-4" strokeWidth={2} />}
    iconPosition="left"
    className="w-full justify-center rounded-full border border-white/15 bg-white/5 px-6 py-3.5 text-base font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:bg-white/10 hover:shadow-[0_0_30px_rgba(255,255,255,0.05)] active:scale-[0.98]"
  >
    Contact Us
  </Button>
</motion.div>

          {/* Feature cards — horizontal scroll on mobile / tablet only */}
          {/* <div className="mt-14 flex w-full snap-x gap-4 overflow-x-auto pb-2 lg:hidden [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {heroFeatures.map((feature, i) => (
              <FeatureCard
                key={feature.id}
                feature={feature}
                index={i}
                orientation="horizontal"
              />
            ))}
          </div> */}

          <motion.div
            initial="hidden"
            animate="show"
            custom={0.4}
            variants={fadeUp}
            className="mt-16 hidden items-center gap-2.5 lg:flex"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--accent)] opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--accent)]" />
            </span>
            <span className="text-xs font-semibold tracking-[0.2em] text-[var(--text-muted)]">
              SCROLL TO EXPLORE
            </span>
            <motion.span
              animate={{ y: [0, 4, 0] }}
              transition={{
                duration: 1.6,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="text-[var(--text-muted)]"
            >
              <ChevronDown className="h-3.5 w-3.5" />
            </motion.span>
          </motion.div>
        </div>

        {/* RIGHT — framed image + floating feature panel */}
        <FrameVisual />
      </div>
    </section>
  );
}
