"use client";

import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/cn";

type ButtonVariant = "primary" | "secondary";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  icon?: ReactNode;
  iconPosition?: "left" | "right";
}

/**
 * Shared pill CTA button.
 * - `primary`   → electric-blue gradient with a soft outer glow, used for the main conversion action.
 * - `secondary` → dark glass pill, used for lower-emphasis actions like "Contact Us".
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", icon, iconPosition = "right", className, children, ...props }, ref) => {
    const base =
      "group relative inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold tracking-wide transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]";

    const styles: Record<ButtonVariant, string> = {
      primary:
        "bg-gradient-to-r from-[var(--accent)] to-[var(--accent-2)] text-[#14100a] shadow-[0_0_20px_rgba(232,163,61,0.3)] hover:shadow-[0_0_32px_rgba(232,163,61,0.5)]",
      secondary:
        "border border-[var(--line)] bg-white/[0.04] text-[var(--foreground)] backdrop-blur-md hover:border-white/20 hover:bg-white/[0.08]",
    };

    return (
      <motion.button
        ref={ref}
        whileHover={{ scale: 1.045 }}
        whileTap={{ scale: 0.97 }}
        transition={{ type: "spring", stiffness: 400, damping: 20 }}
        className={cn(base, styles[variant], className)}
        {...(props as any)}
      >
        {icon && iconPosition === "left" && (
          <span className="transition-transform duration-300 group-hover:-translate-x-0.5">{icon}</span>
        )}
        {children}
        {icon && iconPosition === "right" && (
          <span className="transition-transform duration-300 group-hover:translate-x-0.5">{icon}</span>
        )}
      </motion.button>
    );
  }
);

Button.displayName = "Button";
