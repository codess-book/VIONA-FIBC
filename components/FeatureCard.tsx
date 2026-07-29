import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface FeatureCardProps {
  feature: {
    title: string;
    description: string;
    icon: LucideIcon;
  };
  index: number;
}

export function FeatureCard({ feature, index }: FeatureCardProps) {
  const Icon = feature.icon;

  return (
    <motion.div
      className="group relative cursor-default overflow-hidden border-l-2 border-white/10 bg-card/40 p-8 transition-all hover:border-brand-primary hover:bg-card"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <span className="absolute right-6 top-6 font-display text-4xl text-white/5 transition-colors group-hover:text-brand-primary/25">
        {String(index + 1).padStart(2, "0")}
      </span>
      <div className="mb-6 flex size-12 items-center justify-center border border-white/10 bg-white/5 transition-colors group-hover:border-brand-primary/60 group-hover:bg-brand-primary/10">
        <Icon className="size-5 text-brand-primary" />
      </div>
      <h3 className="mb-3 font-display text-2xl tracking-wide text-foreground">{feature.title}</h3>
      <p className="text-sm leading-relaxed text-muted-foreground">{feature.description}</p>
    </motion.div>
  );
}