import { motion } from "framer-motion";

const loops = ["LIFT", "LOAD", "HOLD", "SHIP"];

/**
 * A load-test gauge: an ember arc that sweeps around a suspended bulk-bag
 * silhouette, like a rig pulling a lift loop until the dial locks.
 */
export function FrameVisual() {
  return (
    <div className="relative flex h-full w-full items-center justify-center py-12">
      {/* Ember heat pool */}
      <div className="absolute h-80 w-80 rounded-full bg-brand-primary/20 blur-[90px]" />

      {/* Outer measurement dial with tick marks */}
      <motion.div
        className="absolute size-[22rem] rounded-full border border-white/10 sm:size-[26rem]"
        animate={{ rotate: 360 }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
      >
        {[...Array(48)].map((_, i) => (
          <span
            key={i}
            className={`absolute left-1/2 top-0 origin-[50%_11rem] sm:origin-[50%_13rem] ${
              i % 6 === 0 ? "h-3 w-px bg-brand-primary/70" : "h-1.5 w-px bg-white/20"
            }`}
            style={{ transform: `rotate(${i * 7.5}deg)` }}
          />
        ))}
      </motion.div>

      {/* Sweeping ember arc */}
      <motion.div
        className="absolute size-[19rem] rounded-full border-2 border-transparent border-t-brand-primary border-r-brand-accent/60 sm:size-[22rem]"
        animate={{ rotate: 360 }}
        transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
        style={{ filter: "drop-shadow(0 0 14px color-mix(in oklab, var(--brand-primary) 60%, transparent))" }}
      />

      {/* Counter-rotating label ring */}
      <motion.div
        className="absolute size-[15rem] rounded-full border border-dashed border-white/15 sm:size-[17rem]"
        animate={{ rotate: -360 }}
        transition={{ duration: 26, repeat: Infinity, ease: "linear" }}
      >
        {loops.map((label, i) => (
          <span
            key={label}
            className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 rounded-sm border border-white/10 bg-card px-2 py-0.5 font-display text-[11px] tracking-[0.2em] text-brand-accent"
            style={{
              transform: `rotate(${i * 90}deg) translateY(-0.5rem)`,
              transformOrigin: "50% 7.5rem",
            }}
          >
            {label}
          </span>
        ))}
      </motion.div>

      {/* Bulk bag silhouette */}
      <motion.div
        className="relative flex h-56 w-48 flex-col items-center"
        animate={{ y: [0, -10, 0], rotate: [-1.2, 1.2, -1.2] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      >
        {/* Lift loops */}
        <div className="flex w-full justify-between px-5">
          {[0, 1].map((i) => (
            <div key={i} className="h-10 w-8 rounded-t-full border-2 border-b-0 border-brand-accent/70" />
          ))}
        </div>

        {/* Body */}
        <div className="relative flex-1 w-full overflow-hidden rounded-b-lg rounded-t-md border border-white/15 bg-gradient-to-b from-white/12 to-white/[0.03] backdrop-blur-sm">
          <div
            className="absolute inset-0 opacity-25"
            style={{
              backgroundImage:
                "repeating-linear-gradient(90deg, rgba(255,255,255,0.5) 0 1px, transparent 1px 7px), repeating-linear-gradient(0deg, rgba(255,255,255,0.5) 0 1px, transparent 1px 7px)",
            }}
          />
          {/* Scanning ember line */}
          <motion.div
            className="absolute inset-x-0 h-16 bg-gradient-to-b from-transparent via-brand-primary/35 to-transparent"
            animate={{ y: ["-20%", "160%"] }}
            transition={{ duration: 3.4, repeat: Infinity, ease: "easeInOut" }}
          />
          <div className="relative flex h-full flex-col items-center justify-center gap-1">
            <span className="font-display text-3xl tracking-[0.15em] text-foreground">VIONA</span>
            <span className="text-[10px] font-medium uppercase tracking-[0.35em] text-muted-foreground">
              FIBC 1000 KG
            </span>
          </div>
          {/* Discharge spout */}
          <div className="absolute -bottom-0 left-1/2 h-4 w-10 -translate-x-1/2 rounded-b-md border-x border-b border-white/15 bg-white/5" />
        </div>
      </motion.div>

      {/* Gauge readout */}
      <div className="absolute bottom-0 right-2 rounded-md border border-white/10 bg-card/90 px-5 py-3 backdrop-blur-md sm:right-6">
        <div className="text-[10px] font-semibold uppercase tracking-[0.3em] text-muted-foreground">
          Tensile strength
        </div>
        <div className="font-display text-3xl tracking-wide text-brand-primary">5,000+ LBS</div>
      </div>
    </div>
  );
}