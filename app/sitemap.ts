import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/Site";
// Sirf real pages (routes) daalo. #section anchors sitemap me nahi aate.
// Naya page banao (e.g. app/products/page.tsx) to yaha add kar do.
const routes: {
  path: string;
  priority: number;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
}[] = [
  { path: "", priority: 1, changeFrequency: "weekly" },
  { path: "/whoweare", priority: 0.8, changeFrequency: "monthly" },
  // { path: "/products", priority: 0.9, changeFrequency: "weekly" },
  // { path: "/contact", priority: 0.7, changeFrequency: "yearly" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return routes.map(({ path, priority, changeFrequency }) => ({
    url: `${siteConfig.url}${path}`,
    lastModified,
    changeFrequency,
    priority,
  }));
}