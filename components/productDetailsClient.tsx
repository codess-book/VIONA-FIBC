"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  RotateCcw,
  Pause,
  Play,
  Hand,
  Box,
  ArrowLeft,
  ArrowRight,
  Mail,
  ShieldCheck,
  ClipboardList,
} from "lucide-react";
import Link from "next/link";

// ---------- Bag geometry (a true box: all faces meet at the corners) ----------
const W = 150; // width  (x)
const H = 190; // height (y)
const D = 150; // depth  (z)
const START = { y: -28, x: -12 };

// ---------- Certifications (same standards shown on the About / Team pages) ----------
const certs = ["ISO 9001:2015", "ISO 14001:2015", "ISO 22000:2018"];

// ---------- 3D Viewer ----------
// Rotation is written straight to the DOM (no React re-render every frame), so
// the auto-spin and dragging stay smooth even on phones.
function BagViewer3D({ texture, name }: { texture: string; name: string }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const rotRef = useRef<HTMLDivElement>(null);
  const angle = useRef({ ...START });
  const dragging = useRef<{ x: number; y: number } | null>(null);

  const [spinning, setSpinning] = useState(true);
  const [visible, setVisible] = useState(true);

  const apply = useCallback(() => {
    if (rotRef.current) {
      rotRef.current.style.transform = `rotateX(${angle.current.x}deg) rotateY(${angle.current.y}deg)`;
    }
  }, []);

  // respect reduced motion: start paused
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setSpinning(false);
    }
  }, []);

  // only spin while the viewer is on screen
  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) =>
      setVisible(entry.isIntersecting),
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!spinning || !visible) return;
    let raf = 0;
    let last = performance.now();
    const tick = (now: number) => {
      angle.current.y += (now - last) * 0.018;
      last = now;
      apply();
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [spinning, visible, apply]);

  const onDown = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    dragging.current = { x: e.clientX, y: e.clientY };
    setSpinning(false);
    e.currentTarget.setPointerCapture?.(e.pointerId);
  }, []);

  const onMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      const start = dragging.current;
      if (!start) return;
      const dx = e.clientX - start.x;
      const dy = e.clientY - start.y;
      dragging.current = { x: e.clientX, y: e.clientY };
      angle.current.y += dx * 0.5;
      angle.current.x = Math.max(-45, Math.min(35, angle.current.x - dy * 0.3));
      apply();
    },
    [apply],
  );

  const onUp = useCallback(() => {
    dragging.current = null;
  }, []);

  const onKey = useCallback(
    (e: React.KeyboardEvent) => {
      const step = 10;
      if (e.key === "ArrowLeft") angle.current.y -= step;
      else if (e.key === "ArrowRight") angle.current.y += step;
      else if (e.key === "ArrowUp")
        angle.current.x = Math.min(35, angle.current.x + step);
      else if (e.key === "ArrowDown")
        angle.current.x = Math.max(-45, angle.current.x - step);
      else return;
      e.preventDefault();
      setSpinning(false);
      apply();
    },
    [apply],
  );

  const reset = () => {
    angle.current = { ...START };
    apply();
  };

  // shade = darkness added over the texture so the box reads as 3D
  const tex = `url(${texture})`;
  const shaded = (dark: number, light = 0) =>
    light > 0
      ? `linear-gradient(rgba(255,255,255,${light}), rgba(255,255,255,${light})), ${tex}`
      : `linear-gradient(rgba(0,0,0,${dark}), rgba(0,0,0,${dark})), ${tex}`;

  const sides = [
    { label: "Front", t: `translateZ(${D / 2}px)`, bg: shaded(0) },
    {
      label: "Right",
      t: `rotateY(90deg) translateZ(${W / 2}px)`,
      bg: shaded(0.18),
    },
    {
      label: "Back",
      t: `rotateY(180deg) translateZ(${D / 2}px)`,
      bg: shaded(0.3),
    },
    {
      label: "Left",
      t: `rotateY(-90deg) translateZ(${W / 2}px)`,
      bg: shaded(0.18),
    },
  ];

  const faceBase: React.CSSProperties = {
    backfaceVisibility: "hidden",
    backgroundSize: "cover",
    backgroundPosition: "center",
    boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.08)",
  };

  const controlBtn =
    "rounded-full border border-white/15 p-2 text-blue-100 transition-colors duration-300 hover:border-blue-300/60 hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-300";

  return (
    <div
      ref={rootRef}
      className="relative overflow-hidden rounded-3xl border border-blue-900/50 bg-gradient-to-br from-[#0B1F4B] via-[#08142E] to-[#050B1A] shadow-[0_40px_80px_-40px_rgba(30,64,175,0.6)]"
    >
      {/* textures */}
      <div
        className="viewer-weave pointer-events-none absolute inset-0 opacity-[0.06]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        aria-hidden="true"
        style={{
          backgroundImage: `
            linear-gradient(rgba(147,197,253,0.6) 1px, transparent 1px),
            linear-gradient(90deg, rgba(147,197,253,0.6) 1px, transparent 1px)
          `,
          backgroundSize: "44px 44px",
        }}
      />
      {/* spotlight behind the bag */}
      <div
        className="pointer-events-none absolute left-1/2 top-[45%] h-[70%] w-[70%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-400/25 blur-[90px]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 45%, rgba(5,11,26,0.7) 100%)",
        }}
      />

      {/* corner brackets */}
      {[
        "left-4 top-4 border-l-2 border-t-2 rounded-tl-sm",
        "right-4 top-4 border-r-2 border-t-2 rounded-tr-sm",
        "bottom-[4.25rem] left-4 border-b-2 border-l-2 rounded-bl-sm",
        "bottom-[4.25rem] right-4 border-b-2 border-r-2 rounded-br-sm",
      ].map((c) => (
        <span
          key={c}
          aria-hidden="true"
          className={`pointer-events-none absolute z-10 h-5 w-5 border-blue-300/40 ${c}`}
        />
      ))}

      {/* header labels */}
      <div className="pointer-events-none absolute inset-x-0 top-0 z-10 flex items-center justify-between px-8 pt-6 text-xs text-blue-100/60">
        <span className="inline-flex items-center gap-1.5">
          <Box className="h-3.5 w-3.5" />
          Interactive 3D view
        </span>
        <span className="hidden sm:inline">360°</span>
      </div>

      {/* stage */}
      <div
        role="group"
        tabIndex={0}
        aria-label={`Interactive 3D view of ${name}. Drag, or use the arrow keys, to rotate.`}
        className="relative flex h-[360px] w-full cursor-grab touch-none select-none items-center justify-center focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-4 focus-visible:outline-blue-300/60 active:cursor-grabbing sm:h-[440px] lg:h-[560px]"
        onPointerDown={onDown}
        onPointerMove={onMove}
        onPointerUp={onUp}
        onPointerCancel={onUp}
        onKeyDown={onKey}
      >
        <div className="origin-center scale-[1.1] sm:scale-[1.3] lg:scale-[1.7]">
          <div style={{ perspective: "1100px", perspectiveOrigin: "50% 45%" }}>
            <div
              ref={rotRef}
              className="relative"
              style={{
                width: W,
                height: H,
                transformStyle: "preserve-3d",
                transform: `rotateX(${START.x}deg) rotateY(${START.y}deg)`,
              }}
            >
              {sides.map((f) => (
                <div
                  key={f.label}
                  className="absolute inset-0 rounded-[4px]"
                  style={{ ...faceBase, transform: f.t, backgroundImage: f.bg }}
                />
              ))}
              {/* top */}
              <div
                className="absolute left-0 rounded-[4px]"
                style={{
                  ...faceBase,
                  width: W,
                  height: D,
                  top: (H - D) / 2,
                  transform: `rotateX(90deg) translateZ(${H / 2}px)`,
                  backgroundImage: shaded(0, 0.14),
                }}
              />
              {/* bottom */}
              <div
                className="absolute left-0 rounded-[4px]"
                style={{
                  ...faceBase,
                  width: W,
                  height: D,
                  top: (H - D) / 2,
                  transform: `rotateX(-90deg) translateZ(${H / 2}px)`,
                  backgroundImage: shaded(0.55),
                }}
              />
            </div>
          </div>
          {/* floor shadow */}
          <div className="pointer-events-none mx-auto mt-6 h-5 w-44 rounded-[50%] bg-black/60 blur-md" />
        </div>
      </div>

      {/* controls */}
      <div className="relative z-10 flex items-center justify-between gap-2 border-t border-white/10 bg-white/[0.04] px-5 py-3 backdrop-blur-sm">
        <span className="flex items-center gap-2 text-xs text-blue-100/60">
          <Hand className="h-3.5 w-3.5" />
          Drag to rotate
        </span>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setSpinning((s) => !s)}
            aria-label={spinning ? "Pause rotation" : "Start rotation"}
            className={controlBtn}
          >
            {spinning ? (
              <Pause className="h-3.5 w-3.5" />
            ) : (
              <Play className="h-3.5 w-3.5" />
            )}
          </button>
          <button
            type="button"
            onClick={reset}
            aria-label="Reset view"
            className={controlBtn}
          >
            <RotateCcw className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}

// ---------- Main Client Layout ----------
export default function ProductDetailsClient({ product }: { product: any }) {
  const enquiry = `mailto:info@vionafibc.com?subject=${encodeURIComponent(
    `Enquiry: ${product.name}`,
  )}`;
  const specs: { label: string; value: string }[] = product.specs ?? [];

  return (
    <section className="relative isolate min-h-screen overflow-hidden bg-white pb-16 pt-24 md:pb-24 md:pt-28">
      {/* ---- Shared background system (kept inside this section) ---- */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="weave-layer absolute -inset-[14px] opacity-[0.04]" />
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(180, 198, 198, 0.25) 1px, transparent 1px),
              linear-gradient(90deg, rgba(188, 191, 199, 0.54) 1px, transparent 1px)
            `,
            backgroundSize: "40px 40px",
          }}
        />
        <div className="glow-drift-1 absolute right-0 top-0 h-[320px] w-[420px] rounded-full bg-blue-500/[0.06] blur-3xl" />
        <div className="glow-drift-2 absolute bottom-[8%] left-[-4%] h-[300px] w-[420px] rounded-full bg-cyan-400/[0.05] blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Link
          href="/allProducts"
          className="inline-flex items-center gap-2 rounded-lg text-sm font-medium text-blue-700 transition-colors duration-300 hover:text-blue-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-700"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to products
        </Link>

        <div className="mt-6 grid grid-cols-1 items-start gap-8 lg:grid-cols-2 lg:gap-14">
          {/* ---------- Left: rotating 3D bag ---------- */}
          <div className="lg:sticky lg:top-28">
            <BagViewer3D texture={product.texture} name={product.name} />
          </div>

          {/* ---------- Right: all content ---------- */}
          <div className="flex flex-col">
            <div
              className="pd-rise flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.22em] text-blue-700"
              style={{ animationDelay: "0.05s" }}
            >
              <span className="h-px w-8 bg-gradient-to-r from-amber-400 to-blue-600" />
              Industrial grade
            </div>

            <h1
              className="pd-rise mt-4 text-3xl font-bold leading-[1.1] tracking-tight text-slate-900 md:text-4xl lg:text-5xl"
              style={{ animationDelay: "0.12s" }}
            >
              {product.name}
            </h1>

            <p
              className="pd-rise mt-5 max-w-xl text-base leading-relaxed text-slate-600 lg:text-[1.05rem]"
              style={{ animationDelay: "0.2s" }}
            >
              {product.description}
            </p>

            {/* Specifications */}
            {specs.length > 0 && (
              <div
                className="pd-rise mt-8 overflow-hidden rounded-2xl border border-slate-200/80 bg-white/80 shadow-sm shadow-slate-900/5 backdrop-blur-sm"
                style={{ animationDelay: "0.28s" }}
              >
                <div className="flex items-center gap-2.5 border-b border-slate-200/70 bg-blue-50/60 px-5 py-3.5">
                  <ClipboardList className="h-4 w-4 text-blue-700" />
                  <h2 className="text-sm font-semibold text-slate-900">
                    Specifications
                  </h2>
                </div>
                <dl className="divide-y divide-slate-100">
                  {specs.map((spec, i) => (
                    <div
                      key={`${spec.label}-${i}`}
                      className="flex items-baseline justify-between gap-6 px-5 py-3.5 transition-colors duration-300 hover:bg-blue-50/40"
                    >
                      <dt className="text-sm text-slate-500">{spec.label}</dt>
                      <dd className="text-right text-sm font-semibold tabular-nums text-slate-900">
                        {spec.value}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            )}

            {/* Actions */}
            <div
              className="pd-rise mt-8 flex flex-wrap items-center gap-3"
              style={{ animationDelay: "0.36s" }}
            >
              <Link
                href="/contact"
                className="group inline-flex items-center gap-2 rounded-xl bg-blue-900 px-6 py-3.5 text-sm font-semibold text-white shadow-md shadow-blue-900/25 transition-[background-color,box-shadow] duration-300 hover:bg-blue-800 hover:shadow-lg hover:shadow-blue-900/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700"
              >
                Request a quote
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
              {/* <a
                href={enquiry}
                className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white/80 px-6 py-3.5 text-sm font-semibold text-slate-800 transition-colors duration-300 hover:border-blue-400 hover:bg-blue-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700"
              >
                <Mail className="h-4 w-4 text-blue-700" />
                Email an enquiry
              </a> */}
            </div>

            {/* Certifications */}
            <div
              className="pd-rise mt-10 border-t border-slate-200/70 pt-6"
              style={{ animationDelay: "0.44s" }}
            >
              <p className="text-xs font-medium text-slate-500">Certified to</p>
              <ul className="mt-3 flex flex-wrap gap-2.5">
                {certs.map((c) => (
                  <li
                    key={c}
                    className="inline-flex items-center gap-1.5 rounded-full border border-blue-100 bg-blue-50/60 px-3 py-1.5 text-xs font-medium text-slate-700"
                  >
                    <ShieldCheck className="h-3.5 w-3.5 text-blue-700" />
                    {c}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .weave-layer, .viewer-weave {
          background-image:
            repeating-linear-gradient(45deg, rgba(30,64,175,0.9) 0px, rgba(30,64,175,0.9) 1px, transparent 1px, transparent 10px),
            repeating-linear-gradient(-45deg, rgba(37,99,235,0.9) 0px, rgba(37,99,235,0.9) 1px, transparent 1px, transparent 10px);
          background-size: 14px 14px;
        }
        /* drifts with transform (smooth); layer is one tile oversized so the loop is seamless */
        .weave-layer { animation: weave-drift 3s linear infinite; will-change: transform; }
        @keyframes weave-drift {
          0%   { transform: translate3d(0, 0, 0); }
          100% { transform: translate3d(14px, 14px, 0); }
        }

        .glow-drift-1 { animation: float-a 22s ease-in-out infinite; will-change: transform; }
        .glow-drift-2 { animation: float-b 28s ease-in-out infinite; will-change: transform; }
        @keyframes float-a {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50%      { transform: translate(-20px, 20px) scale(1.06); }
        }
        @keyframes float-b {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50%      { transform: translate(20px, -20px) scale(1.05); }
        }

        /* one page-load reveal for the content column */
        .pd-rise {
          opacity: 0;
          animation: pd-rise 0.8s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }
        @keyframes pd-rise {
          from { opacity: 0; transform: translate3d(0, 20px, 0); }
          to   { opacity: 1; transform: translate3d(0, 0, 0); }
        }

        @media (prefers-reduced-motion: reduce) {
          .weave-layer, .glow-drift-1, .glow-drift-2 { animation: none !important; }
          .pd-rise { animation: none !important; opacity: 1; }
        }
      `}</style>
    </section>
  );
}
