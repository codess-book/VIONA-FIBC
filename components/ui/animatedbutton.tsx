"use client";
import React from "react";
import NextLink from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
 
/* ------------------------------------------------------------------ */
/* Reusable button — works identically on desktop (hover) and          */
/* mobile (tap / active), plus a subtle auto-looping shine that runs   */
/* on its own so it never looks "dead" on touch screens.               */
/* ------------------------------------------------------------------ */
 
type ButtonProps = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary";
};
 
export default function HeroButton({ href, children, variant = "primary" }: ButtonProps) {
  const isPrimary = variant === "primary";
 
  return (
    <NextLink
      href={href}
      className={`
        group relative inline-flex items-center gap-2 overflow-hidden rounded-full
        px-6 py-3 text-sm font-medium tracking-wide
        transition-transform duration-200 ease-out
        active:scale-95 hover:scale-[1.02]
        touch-manipulation
        ${
          isPrimary
            ? "bg-gradient-to-r from-blue-700 via-blue-900 to-blue-700 bg-[length:200%_100%] text-white shadow-lg shadow-blue-900/20"
            : "border-2 border-blue-900 bg-transparent text-blue-900 shadow-sm"
        }
      `}
      style={{ WebkitTapHighlightColor: "transparent" }}
    >
      {/* continuous auto shine — runs on its own, no hover/tap needed */}
      <span
        className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent"
        style={{
          animation: "shine 2.8s ease-in-out infinite",
          animationDelay: isPrimary ? "0s" : "1.4s",
        }}
      />
 
      {/* secondary button's fill — triggers on hover (desktop) AND tap (mobile) */}
      {!isPrimary && (
        <span className="absolute inset-0 -z-10 origin-left scale-x-0 bg-gradient-to-r from-blue-600 to-blue-800 transition-transform duration-500 ease-out group-hover:scale-x-100 group-active:scale-x-100" />
      )}
 
      <span className="relative z-10">{children}</span>
      <ArrowRight className="relative z-10 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 group-active:translate-x-1" />
 
      <style jsx>{`
        @keyframes shine {
          0% {
            transform: translateX(-100%);
          }
          50%,
          100% {
            transform: translateX(100%);
          }
        }
      `}</style>
    </NextLink>
  );
}