import type { LucideIcon } from "lucide-react";
import { Cog, Trophy, Leaf, Truck } from "lucide-react";

export interface Feature {
  id: string;
  icon: LucideIcon;
  label: string;
}

export const heroFeatures: Feature[] = [
  { id: "machinery", icon: Cog, label: "Advanced Machinery" },
  { id: "quality", icon: Trophy, label: "Premium Quality" },
  { id: "sustainability", icon: Leaf, label: "Sustainable Approach" },
  { id: "delivery", icon: Truck, label: "Timely Delivery" },
];