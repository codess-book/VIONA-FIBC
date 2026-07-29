export function BackgroundFX() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* Ember glow from the lower left, like heat from a press line */}
      <div className="absolute inset-0 bg-[radial-gradient(70%_60%_at_15%_85%,_color-mix(in_oklab,var(--brand-primary)_22%,transparent)_0%,_transparent_70%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(50%_50%_at_85%_10%,_color-mix(in_oklab,var(--brand-accent)_12%,transparent)_0%,_transparent_70%)]" />

      {/* Engineering rule grid */}
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.6) 1px, transparent 1px)",
          backgroundSize: "88px 88px",
        }}
      />

      {/* Diagonal hazard hatch band */}
      <div
        className="absolute -left-1/4 top-1/3 h-40 w-[150%] -rotate-6 opacity-[0.05]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(45deg, rgba(255,255,255,0.9) 0 2px, transparent 2px 14px)",
        }}
      />

      <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-background to-transparent" />
    </div>
  );
}
