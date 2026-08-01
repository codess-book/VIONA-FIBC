"use client";
import { cn } from "@/lib/utils";
import { useMotionValue, motion, useMotionTemplate } from "motion/react";
import React from "react";

export const HeroHighlight = ({
  children,
  className,
  containerClassName,
}: {
  children: React.ReactNode;
  className?: string;
  containerClassName?: string;
}) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({
    currentTarget,
    clientX,
    clientY,
  }: React.MouseEvent<HTMLDivElement>) {
    if (!currentTarget) return;
    let { left, top } = currentTarget.getBoundingClientRect();

    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <div
      className={cn(
        "group relative flex h-full w-full items-center justify-center bg-transparent py-10",
        containerClassName,
      )}
      onMouseMove={handleMouseMove}
    >
      {/* Background Glow Effect - ye mouse move karne par blue circle banayega */}
      <motion.div
        className="pointer-events-none absolute inset-0 z-20 transition duration-300"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              350px circle at ${mouseX}px ${mouseY}px,
              rgba(96, 165, 250, 0.15), /* Light Blue Glow */
              transparent 80%
            )
          `,
        }}
      />
      
      {/* Children (Text) */}
      <div className={cn("relative z-30 w-full", className)}>
        {children}
      </div>
    </div>
  );
};

export const Highlight = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <motion.span
      initial={{
        backgroundSize: "0% 100%",
        opacity: 0, // Start faded out
      }}
      animate={{
        backgroundSize: "100% 100%",
        opacity: 1, // Fade in smoothly
      }}
      transition={{
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
        delay: 0.2,
        opacity: { duration: 0.3 },
      }}
      style={{
        backgroundRepeat: "no-repeat",
        backgroundPosition: "left center",
        display: "inline-block", // 🔥 Layout shift prevent
        willChange: "background-size, transform", // 🔥 GPU optimization
      }}
      layout="position" // 🔥 Position lock kar diya
      className={cn(
        `relative rounded-lg bg-gradient-to-r from-blue-400/30 to-blue-500/30 px-2 py-0.5 text-white shadow-[0_0_30px_rgba(96,165,250,0.1)]`,
        className,
      )}
    >
      {children}
    </motion.span>
  );
};