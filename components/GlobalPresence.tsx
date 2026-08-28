"use client";

import { useEffect, useRef, useState } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  Line,
} from "react-simple-maps";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { locations, type Location } from "../lib/data/location";
import type { Variants } from "motion/react";
const GEO_URL =
  "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

const HQ = locations.find((l) => l.isHQ) ?? locations[0];
const OFFICES = locations.filter((l) => !l.isHQ);
const slideFromLeft: Variants = {
  hidden: { opacity: 0, x: -40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};
export default function GlobalPresence() {
  const [active, setActive] = useState<Location | null>(null);
  const reduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-15% 0px" });

  return (
    <section className="relative w-full overflow-hidden bg-[#F8FAFC] py-12 sm:py-20">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@500;600;700;800&family=Inter:wght@400;500;600&display=swap');
        .gp-display { font-family: 'Plus Jakarta Sans', ui-sans-serif, system-ui, sans-serif; }
        .gp-body { font-family: 'Inter', ui-sans-serif, system-ui, sans-serif; }
      `}</style>

      {/* Subtle Background Glow behind Header */}
      <div className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 transform">
        <div className="h-[300px] w-[600px] rounded-full bg-gradient-to-tr from-[#E8823A]/15 to-[#0F3D5C]/10 blur-[90px]" />
      </div>

      <div
        ref={sectionRef}
        className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 gp-body"
      >
        {/* Modern & Styled Header */}
        <div className="flex flex-col items-center text-center">
          {/* Animated Status Pill */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white/80 px-3.5 py-1.5 shadow-sm backdrop-blur-md"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-gradient-to-r from-blue-900 to-blue-500 opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-]"></span>
            </span>
            <span className="text-xs font-semibold tracking-wider text-[#0F3D5C] uppercase">
              Global Network
            </span>
          </motion.div>

          {/* Heading with Gradient Accent */}
          {/* <motion.h2
            initial={{ opacity: 0, y: 15 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="gp-display mt-5 text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#0F172A]"
          >
            Our Global{" "}
            <span className="bg-gradient-to-r from-blue-900 to-blue-500 bg-clip-text text-transparent">
              Presence
            </span>
          </motion.h2> */}
          <motion.h2
            variants={slideFromLeft}
            className="mt-5 font-display text-4xl font-black uppercase leading-[0.95] text-slate-900 sm:text-5xl lg:text-5xl"
          >
            Our Global{" "}
            <span className="bg-gradient-to-r from-blue-900 to-blue-500 bg-clip-text text-transparent">
              Presence
            </span>{" "}
            {/* Across Industries */}
          </motion.h2>
          {/* Styled Subtitle */}
          {/* <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-3 max-w-xl text-base sm:text-lg text-[#64748B] font-normal"
          >
            Connecting teams and operations seamlessly across borders in real time.
          </motion.p> */}
        </div>

        {/* Map Container */}
        <div className="relative mt-10 aspect-[16/10] sm:aspect-[21/9] w-full select-none">
          <ComposableMap
            projection="geoEqualEarth"
            projectionConfig={{ scale: 210, center: [12, 8] }}
            className="w-full h-full drop-shadow-sm"
            role="img"
            aria-label="World map showing our global presence"
          >
            <Geographies geography={GEO_URL}>
              {({ geographies }) =>
                geographies.map((geo) => (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    fill="#70747946"
                    stroke="#dfe3eafa"
                    strokeWidth={1}
                    style={{
                      default: { outline: "none" },
                      hover: { fill: "#CBD5E1", outline: "none" },
                      pressed: { fill: "#CBD5E1", outline: "none" },
                    }}
                  />
                ))
              }
            </Geographies>

            {/* Flight Routes & Animated Airplanes */}
            {inView &&
              OFFICES.map((office, i) => (
                <g key={`route-${office.city}`}>
                  <Line
                    from={[HQ.lng, HQ.lat]}
                    to={[office.lng, office.lat]}
                    stroke="#E8823A"
                    strokeWidth={1.2}
                    strokeDasharray="4 4"
                    strokeOpacity={0.65}
                    aria-hidden="true"
                  />
                  <FlightAnimation
                    from={[HQ.lng, HQ.lat]}
                    to={[office.lng, office.lat]}
                    duration={4 + (i % 3) * 1.5}
                    delay={i * 0.4}
                  />
                </g>
              ))}

            {/* HQ Marker */}
            {inView && (
              <Marker coordinates={[HQ.lng, HQ.lat]}>
                <HqPin
                  active={active?.city === HQ.city}
                  reduceMotion={!!reduceMotion}
                  onSelect={() => setActive(HQ)}
                  onClear={() => setActive(null)}
                />
              </Marker>
            )}

            {/* Office Markers */}
            {inView &&
              OFFICES.map((loc) => (
                <Marker key={loc.city} coordinates={[loc.lng, loc.lat]}>
                  <OfficePin
                    active={active?.city === loc.city}
                    reduceMotion={!!reduceMotion}
                    onSelect={() => setActive(loc)}
                    onClear={() => setActive(null)}
                  />
                </Marker>
              ))}
          </ComposableMap>

          {/* Minimal Floating Tooltip */}
          {active && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 5 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 5 }}
              className="pointer-events-none absolute bottom-4 left-1/2 -translate-x-1/2 rounded-xl bg-[#0F172A]/90 px-4 py-2.5 text-center shadow-xl backdrop-blur-md border border-slate-700/50"
            >
              <p className="gp-display text-sm font-semibold text-white flex items-center justify-center gap-1.5">
                {active.city}
                {active.isHQ && (
                  <span className="rounded-full bg-[#E8823A] px-2 py-0.5 text-[9px] font-extrabold uppercase tracking-wide text-white">
                    HQ
                  </span>
                )}
              </p>
              <p className="text-xs font-medium text-slate-400">
                {active.country}
              </p>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}

// Subcomponent to animate airplane along route using SVG motionPath approximation
function FlightAnimation({
  from,
  to,
  duration,
  delay,
}: {
  from: [number, number];
  to: [number, number];
  duration: number;
  delay: number;
}) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let animationFrame: number;
    let startTime: number | null = null;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = (timestamp - startTime) / 1000;

      if (elapsed > delay) {
        const cycleTime = (elapsed - delay) % duration;
        setProgress(cycleTime / duration);
      }

      animationFrame = requestAnimationFrame(animate);
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [duration, delay]);

  const currentLng = from[0] + (to[0] - from[0]) * progress;
  const currentLat = from[1] + (to[1] - from[1]) * progress;
  const angle = (Math.atan2(to[1] - from[1], to[0] - from[0]) * 180) / Math.PI;

  return (
    <Marker coordinates={[currentLng, currentLat]}>
      <g transform={`rotate(${angle})`}>
        <path
          d="M12 2L2 7l9 3 1 11 3-8 7 2-2-4 7-2z"
          fill="#E8823A"
          transform="scale(0.6) translate(-10, -10)"
        />
      </g>
    </Marker>
  );
}

function HqPin({
  active,
  reduceMotion,
  onSelect,
  onClear,
}: {
  active: boolean;
  reduceMotion: boolean;
  onSelect: () => void;
  onClear: () => void;
}) {
  return (
    <g
      onMouseEnter={onSelect}
      onMouseLeave={onClear}
      onClick={onSelect}
      style={{ cursor: "pointer" }}
    >
      {!reduceMotion && (
        <motion.circle
          r={5}
          fill="none"
          stroke="#E8823A"
          strokeWidth={1.5}
          initial={{ opacity: 0.8, scale: 1 }}
          animate={{ opacity: 0, scale: 3.5 }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
        />
      )}
      <motion.circle
        r={6}
        fill="#E8823A"
        stroke="#fff"
        strokeWidth={1.5}
        animate={{ scale: active ? 1.4 : 1 }}
      />
    </g>
  );
}

function OfficePin({
  active,
  onSelect,
  onClear,
}: {
  active: boolean;
  reduceMotion: boolean;
  onSelect: () => void;
  onClear: () => void;
}) {
  return (
    <g
      onMouseEnter={onSelect}
      onMouseLeave={onClear}
      onClick={onSelect}
      style={{ cursor: "pointer" }}
    >
      <motion.circle
        r={4}
        fill="#0F3D5C"
        stroke="#fff"
        strokeWidth={1.2}
        animate={{ scale: active ? 1.4 : 1 }}
      />
    </g>
  );
}
