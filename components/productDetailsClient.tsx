"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  RotateCcw,
  Pause,
  Play,
  Hand,
  ShoppingBag,
  ArrowLeft,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import type { PRODUCTS } from "@/lib/data/product";

// --- 3D Viewer Component (unchanged logic, refreshed styling) ---
function BagViewer3D({ texture, name }: { texture: string; name: string }) {
  const [angle, setAngle] = useState({ y: -28, x: -12 });
  const [spinning, setSpinning] = useState(true);
  const dragging = useRef<{ x: number; y: number } | null>(null);
  const frame = useRef<number>(0);

  useEffect(() => {
    if (!spinning) return;
    let last = performance.now();
    const tick = (now: number) => {
      const dt = now - last;
      last = now;
      setAngle((a) => ({ ...a, y: a.y + dt * 0.018 }));
      frame.current = requestAnimationFrame(tick);
    };
    frame.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame.current);
  }, [spinning]);

  const onDown = useCallback((e: React.PointerEvent) => {
    dragging.current = { x: e.clientX, y: e.clientY };
    setSpinning(false);
    (e.target as Element).setPointerCapture?.(e.pointerId);
  }, []);

  const onMove = useCallback((e: React.PointerEvent) => {
    const start = dragging.current;
    if (!start) return;
    const dx = e.clientX - start.x;
    const dy = e.clientY - start.y;
    dragging.current = { x: e.clientX, y: e.clientY };
    setAngle((a) => ({
      y: a.y + dx * 0.5,
      x: Math.max(-45, Math.min(35, a.x - dy * 0.3)),
    }));
  }, []);

  const onUp = useCallback(() => {
    dragging.current = null;
  }, []);

  const faces = [
    { t: "translateZ(90px)", label: "Front" },
    { t: "rotateY(180deg) translateZ(90px)", label: "Back" },
    { t: "rotateY(90deg) translateZ(90px)", label: "Right" },
    { t: "rotateY(-90deg) translateZ(90px)", label: "Left" },
  ];

  return (
    <div className="relative overflow-hidden rounded-xl border border-blue-200/50 bg-blue-50/30 shadow-sm">
      {/* faint woven texture backdrop inside the viewer */}
      <div className="pointer-events-none absolute inset-0 viewer-weave opacity-[0.05]" />

      <div
        className="relative flex h-[200px] sm:h-[240px] lg:h-[280px] w-full cursor-grab touch-none select-none items-center justify-center active:cursor-grabbing"
        onPointerDown={onDown}
        onPointerMove={onMove}
        onPointerUp={onUp}
        onPointerCancel={onUp}
      >
        <div
          className="relative"
          style={{ perspective: "1000px", perspectiveOrigin: "50% 45%" }}
        >
          <div
            className="relative"
            style={{
              width: 150,
              height: 190,
              transformStyle: "preserve-3d",
              transform: `rotateX(${angle.x}deg) rotateY(${angle.y}deg)`,
            }}
          >
            {faces.map((f) => (
              <div
                key={f.label}
                className="absolute inset-0 rounded-[6px] bg-cover bg-center"
                style={{
                  transform: f.t,
                  backgroundImage: `url(${texture})`,
                  backfaceVisibility: "hidden",
                }}
              />
            ))}
            <div
              className="absolute rounded-[6px] bg-cover bg-center"
              style={{
                width: 150,
                height: 150,
                transform: "rotateX(90deg) translateZ(95px)",
                backgroundImage: `url(${texture})`,
                filter: "brightness(1.1)",
              }}
            />
            <div
              className="absolute rounded-[6px] bg-cover bg-center"
              style={{
                width: 150,
                height: 150,
                transform: "rotateX(-90deg) translateZ(95px)",
                backgroundImage: `url(${texture})`,
                filter: "brightness(0.5)",
              }}
            />
          </div>
          <div className="pointer-events-none mx-auto mt-4 h-4 w-40 rounded-[50%] blur-sm bg-slate-200/60" />
        </div>
      </div>

      <div className="relative flex items-center justify-between gap-2 border-t border-blue-100 bg-white/70 backdrop-blur-sm px-3 py-2">
        <span className="flex items-center gap-1 text-[10px] uppercase tracking-wider text-slate-500">
          <Hand className="h-3 w-3" /> <span>Drag to rotate</span>
        </span>
        <div className="flex gap-1">
          <button
            onClick={() => setSpinning((s) => !s)}
            className="rounded-full border border-slate-300 p-1.5 text-slate-600 hover:bg-blue-50 hover:border-blue-400 transition-colors"
          >
            {spinning ? (
              <Pause className="h-3 w-3" />
            ) : (
              <Play className="h-3 w-3" />
            )}
          </button>
          <button
            onClick={() => setAngle({ y: -28, x: -12 })}
            className="rounded-full border border-slate-300 p-1.5 text-slate-600 hover:bg-blue-50 hover:border-blue-400 transition-colors"
          >
            <RotateCcw className="h-3 w-3" />
          </button>
        </div>
      </div>
    </div>
  );
}

// --- Corner-bracket frame: a technical-drawing reference frame around the hero image ---
function CornerBrackets() {
  const corner = "absolute h-5 w-5 border-blue-400/60";
  return (
    <>
      <span
        className={`${corner} top-3 left-3 border-t-2 border-l-2 rounded-tl-sm`}
      />
      <span
        className={`${corner} top-3 right-3 border-t-2 border-r-2 rounded-tr-sm`}
      />
      <span
        className={`${corner} bottom-3 left-3 border-b-2 border-l-2 rounded-bl-sm`}
      />
      <span
        className={`${corner} bottom-3 right-3 border-b-2 border-r-2 rounded-br-sm`}
      />
    </>
  );
}

// --- Main Client Layout ---
export default function ProductDetailsClient({ product }: { product:any }) {
  const hasDiscount = product.originalPrice !== null;

  return (
    <section className="relative min-h-screen bg-white pt-24 pb-4 md:pt-28 md:pb-6 overflow-hidden">
      {/* ---- Shared background system ---- */}
      <div className="pointer-events-none absolute inset-0">
        <div className="weave-layer absolute inset-0 opacity-[0.04]" />
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(37, 99, 235, 0.25) 1px, transparent 1px),
              linear-gradient(90deg, rgba(37, 99, 235, 0.25) 1px, transparent 1px)
            `,
            backgroundSize: "40px 40px",
          }}
        />
        <div className="glow-drift-1 absolute top-0 right-0 h-[320px] w-[420px] bg-blue-500/[0.06] blur-3xl rounded-full" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Link
          href="/allProducts"
          className="inline-flex items-center gap-2 text-sm text-blue-600 hover:text-blue-800 font-medium mb-3"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Products
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
          {/* Left: Static Image with technical corner-bracket frame — dark canvas so white product photos pop */}
          <div className="relative flex items-center justify-center bg-gradient-to-br from-blue-950 via-blue-900 to-slate-900 border border-blue-900/40 rounded-2xl p-6 shadow-sm overflow-hidden h-[300px] sm:h-[400px] lg:h-[450px]">
            <div className="pointer-events-none absolute inset-0 opacity-[0.06] viewer-weave" />
            <CornerBrackets />
            <Image
              src={product.image}
              alt={product.name}
              width={500}
              height={500}
              priority
              className="relative z-10 w-full h-full object-contain drop-shadow-[0_8px_24px_rgba(0,0,0,0.35)]"
            />
          </div>

          {/* Right: 3D Viewer + Details */}
          <div className="flex flex-col space-y-3 lg:space-y-4">
            <BagViewer3D texture={product.texture} name={product.name} />

            <div className="flex-1 flex flex-col space-y-3 bg-white p-1">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-blue-600 font-bold">
                    Industrial Grade
                  </p>
                  <h1 className="text-2xl md:text-3xl font-bold text-slate-900 leading-tight">
                    {product.name}
                  </h1>
                </div>
                <div className="text-right">
                  <span className="font-mono text-2xl font-semibold text-slate-900">
                    ${product.price.toFixed(2)}
                  </span>
                  {hasDiscount && (
                    <p className="font-mono text-xs text-slate-400 line-through">
                      ${product.originalPrice?.toFixed(2)}
                    </p>
                  )}
                </div>
              </div>

              {hasDiscount && (
                <div className="inline-flex w-fit rounded-full bg-blue-100 px-2.5 py-0.5 text-[10px] font-bold text-blue-700 border border-blue-200">
                  Save{" "}
                  {Math.round(
                    ((product.originalPrice! - product.price) /
                      product.originalPrice!) *
                      100,
                  )}
                  %
                </div>
              )}

              <p className="text-sm text-slate-600 leading-relaxed line-clamp-2">
                {product.description}
              </p>

              {/* Specs Grid — styled like an engineering spec sheet */}
              <div className="relative grid grid-cols-2 gap-3 bg-blue-50/80 border border-blue-100 p-3 rounded-xl">
                <span className="absolute -top-2 left-3 rounded-full bg-white px-2 text-[9px] font-bold uppercase tracking-[0.15em] text-blue-500 border border-blue-100">
                  Spec Sheet
                </span>
                {product.specs.map(
                  (spec: { label: string; value: string }, i: number) => (
                    <div key={i} className="flex flex-col">
                      <span className="text-[9px] uppercase font-bold text-blue-500">
                        {spec.label}
                      </span>
                      <span className="font-mono text-sm font-semibold text-slate-700">
                        {spec.value}
                      </span>
                    </div>
                  ),
                )}
              </div>

              {/* Stitched divider before the purchase row */}
              <div className="relative w-full h-4 pt-1" aria-hidden="true">
                <svg
                  viewBox="0 0 600 12"
                  preserveAspectRatio="none"
                  className="absolute inset-0 h-full w-full"
                >
                  <line
                    x1="0"
                    y1="6"
                    x2="600"
                    y2="6"
                    stroke="rgb(37 99 235 / 0.3)"
                    strokeWidth="1.5"
                    strokeDasharray="8 6"
                    strokeLinecap="round"
                  />
                </svg>
              </div>

              <div className="flex items-center gap-3 pt-1">
                <div className="flex items-center border border-slate-200 rounded-full bg-white overflow-hidden">
                  <button className="px-3 py-1.5 hover:bg-slate-50 text-slate-600">
                    -
                  </button>
                  <span className="w-10 text-center text-sm font-medium text-slate-800">
                    1
                  </span>
                  <button className="px-3 py-1.5 hover:bg-slate-50 text-slate-600">
                    +
                  </button>
                </div>

                <button className="flex-1 flex items-center justify-center gap-2 bg-blue-900 hover:bg-blue-800 text-white py-2.5 px-5 rounded-full text-sm font-semibold transition-colors shadow-md shadow-blue-900/20">
                  <ShoppingBag className="h-4 w-4" />
                  Add to Cart
                </button>
              </div>
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
        .weave-layer { animation: weave-drift 40s linear infinite; }
        @keyframes weave-drift {
          0%   { background-position: 0 0, 0 0; }
          100% { background-position: 200px 200px, -200px 200px; }
        }
        .glow-drift-1 { animation: float-a 22s ease-in-out infinite; }
        @keyframes float-a {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50%      { transform: translate(-20px, 20px) scale(1.06); }
        }
        @media (prefers-reduced-motion: reduce) {
          .weave-layer, .glow-drift-1 { animation: none !important; }
        }
      `}</style>
    </section>
  );
}
