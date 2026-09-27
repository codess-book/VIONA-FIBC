"use client";

import { useEffect, useRef, useState } from "react";

type Action = {
  label: string;
  href: string;
  target?: string;
  gradient: string;
  ringColor: string;
  glowColor: string;
  icon: React.ReactNode;
};

export default function FloatingContact() {
  const [open, setOpen] = useState(false);
  const [hoveredKey, setHoveredKey] = useState<string | null>(null);
  const wrapRef = useRef<HTMLDivElement>(null);

  // Replace with your actual numbers
  const phone = "+917992392070";
  const whatsappNumber = "917992392070";
  const whatsappMessage =
    "Hi! I found VIONA FIBC on your website and would like to know more about your bulk packaging solutions.";

  const actions: Action[] = [
    {
      label: "WhatsApp",
      href: `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`,
      target: "_blank",
      gradient: "linear-gradient(135deg, #25d366, #128c7e)",
      ringColor: "#25d366",
      glowColor: "rgba(37,211,102,0.45)",
      icon: (
        <svg
          viewBox="0 0 32 32"
          xmlns="http://www.w3.org/2000/svg"
          className="w-[18px] h-[18px] sm:w-5 sm:h-5"
          fill="white"
        >
          <path d="M16.002 2.667C8.637 2.667 2.667 8.637 2.667 16c0 2.347.636 4.607 1.84 6.587L2.667 29.333l6.933-1.813A13.27 13.27 0 0 0 16.002 29.333C23.365 29.333 29.333 23.363 29.333 16S23.365 2.667 16.002 2.667zm0 24.267a11 11 0 0 1-5.613-1.533l-.4-.24-4.12 1.08 1.1-4-.267-.413A10.987 10.987 0 0 1 5.02 16c0-6.053 4.927-10.98 10.98-10.98S26.98 9.947 26.98 16 22.053 26.934 16 26.934zm6.027-8.213c-.333-.167-1.96-.967-2.267-1.08-.306-.107-.527-.16-.747.16-.22.32-.853 1.08-1.047 1.307-.193.22-.387.247-.72.08-.333-.167-1.4-.52-2.667-1.653-.987-.88-1.653-1.967-1.847-2.3-.193-.333-.02-.513.147-.68.153-.147.333-.387.5-.58.167-.193.22-.333.333-.553.107-.22.053-.413-.027-.58-.08-.167-.747-1.8-1.02-2.467-.267-.64-.547-.553-.747-.56-.193-.007-.413-.007-.633-.007a1.22 1.22 0 0 0-.88.413c-.307.333-1.16 1.133-1.16 2.767s1.187 3.207 1.353 3.427c.167.22 2.333 3.56 5.653 4.993.793.34 1.413.547 1.893.7.793.253 1.517.22 2.087.133.637-.093 1.96-.8 2.24-1.573.28-.773.28-1.433.193-1.573-.08-.147-.307-.22-.64-.387z" />
        </svg>
      ),
    },
    {
      label: "Call us now",
      href: `tel:${phone}`,
      gradient: "linear-gradient(135deg, #22c55e, #16a34a, #15803d)",
      ringColor: "#22c55e",
      glowColor: "rgba(34,197,94,0.45)",
      icon: (
        <svg
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          className="w-[18px] h-[18px] sm:w-5 sm:h-5"
          fill="none"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
        </svg>
      ),
    },
  ];

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div
      ref={wrapRef}
      className="fixed bottom-4 right-4 sm:bottom-5 sm:right-5 z-[999] flex flex-col items-end gap-2 sm:gap-2.5"
    >
      {/* Options */}
      <div
        className="flex flex-col items-end gap-2 sm:gap-2.5 transition-all duration-300"
        style={{
          opacity: open ? 1 : 0,
          transform: open ? "translateY(0)" : "translateY(10px)",
          pointerEvents: open ? "auto" : "none",
        }}
      >
        {actions.map((action, i) => {
          const isHovered = hoveredKey === action.label;
          return (
            <a
              key={action.label}
              href={action.href}
              target={action.target}
              rel={
                action.target === "_blank" ? "noopener noreferrer" : undefined
              }
              aria-label={action.label}
              onMouseEnter={() => setHoveredKey(action.label)}
              onMouseLeave={() => setHoveredKey(null)}
              className="flex items-center gap-2 sm:gap-2.5 group"
              style={{
                opacity: open ? 1 : 0,
                transform: open
                  ? "translateY(0) scale(1)"
                  : "translateY(8px) scale(0.9)",
                transition: `opacity 320ms cubic-bezier(0.22,1,0.36,1) ${i * 55}ms, transform 320ms cubic-bezier(0.22,1,0.36,1) ${i * 55}ms`,
                filter: isHovered
                  ? `drop-shadow(0 6px 18px ${action.glowColor})`
                  : `drop-shadow(0 3px 10px ${action.glowColor.replace("0.45", "0.2")})`,
              }}
            >
              {/* Tooltip */}
              <div
                className="hidden sm:block font-['DM_Sans',sans-serif] text-[12px] font-[500] text-white px-3.5 py-1.5 rounded-full whitespace-nowrap transition-all duration-300"
                style={{
                  background: "rgba(18,35,63,0.92)",
                  border: `1px solid ${action.ringColor}40`,
                  backdropFilter: "blur(12px)",
                  opacity: isHovered ? 1 : 0,
                  transform: isHovered
                    ? "translateX(0) scale(1)"
                    : "translateX(8px) scale(0.95)",
                  pointerEvents: "none",
                }}
              >
                {action.label}
              </div>

              {/* Icon button — chhota kiya */}
              <div
                className="relative w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center flex-shrink-0 transition-transform duration-300 ring-1 ring-white/15"
                style={{
                  background: action.gradient,
                  transform: isHovered ? "scale(1.08)" : "scale(1)",
                  boxShadow: `0 4px 14px ${action.glowColor.replace("0.45", "0.4")}, inset 0 1px 0 rgba(255,255,255,0.2)`,
                }}
              >
                <span
                  className="absolute inset-0 rounded-full animate-ping opacity-25"
                  style={{ background: action.ringColor }}
                />
                <span className="relative z-10">{action.icon}</span>
              </div>
            </a>
          );
        })}
      </div>

      {/* Main FAB — chhota kiya */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-label={open ? "Close contact menu" : "Open contact menu"}
        onMouseEnter={() => setHoveredKey("__main__")}
        onMouseLeave={() => setHoveredKey(null)}
        className="flex items-center gap-2 sm:gap-2.5 group transition-transform duration-300 active:scale-95"
        style={{
          filter:
            hoveredKey === "__main__"
              ? "drop-shadow(0 8px 22px rgba(37,99,235,0.5))"
              : "drop-shadow(0 4px 12px rgba(37,99,235,0.28))",
          transition: "filter 0.3s ease, transform 0.3s ease",
        }}
      >
        {/* Tooltip */}
        <div
          className="hidden sm:block font-['DM_Sans',sans-serif] text-[12px] font-[500] text-white px-3.5 py-1.5 rounded-full whitespace-nowrap transition-all duration-300"
          style={{
            background: "rgba(18,35,63,0.92)",
            border: "1px solid rgba(37,99,235,0.35)",
            backdropFilter: "blur(12px)",
            opacity: hoveredKey === "__main__" ? 1 : 0,
            transform:
              hoveredKey === "__main__"
                ? "translateX(0) scale(1)"
                : "translateX(8px) scale(0.95)",
            pointerEvents: "none",
          }}
        >
          {open ? "Close" : "Contact us"}
        </div>

        {/* Button — chhota + polished */}
        <div
          className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center flex-shrink-0 transition-transform duration-300 ring-1 ring-white/15"
          style={{
            background:
              "linear-gradient(135deg, #3b82f6 0%, #2563eb 45%, #1e40af 100%)",
            transform: hoveredKey === "__main__" ? "scale(1.07)" : "scale(1)",
            boxShadow:
              "0 8px 20px rgba(37,99,235,0.42), 0 2px 6px rgba(15,23,42,0.15), inset 0 1px 0 rgba(255,255,255,0.22)",
          }}
        >
          {!open && (
            <span className="absolute inset-0 rounded-full bg-[#3b82f6] animate-ping opacity-20" />
          )}

          {/* Icon — rotates 135° when open */}
          <span
            className="relative z-10 flex items-center justify-center transition-transform duration-300"
            style={{ transform: open ? "rotate(135deg)" : "rotate(0deg)" }}
          >
            {open ? (
              // X icon
              <svg
                viewBox="0 0 24 24"
                className="w-[18px] h-[18px] sm:w-5 sm:h-5"
                fill="none"
                stroke="white"
                strokeWidth="2.3"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            ) : (
              // Option C — clean headphone icon
              <svg
                viewBox="0 0 24 24"
                className="w-[18px] h-[18px] sm:w-5 sm:h-5"
                fill="none"
                stroke="white"
                strokeWidth="1.9"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
                <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" />
              </svg>
            )}
          </span>

          {/* Online status dot (only when closed) */}
          {!open && (
            <span
              className="absolute top-[8px] right-[8px] sm:top-[10px] sm:right-[10px] w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-emerald-400 border-2 border-[#1d4ed8] z-20"
              aria-hidden="true"
            >
              <span className="absolute inset-0 rounded-full bg-emerald-400 animate-ping opacity-75" />
            </span>
          )}
        </div>
      </button>
    </div>
  );
}