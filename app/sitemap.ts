import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/Site";
import { PRODUCTS } from "@/lib/data/product";

// Sirf real pages (routes) daalo. #section anchors sitemap me nahi aate.
// Naya page banao to yaha add kar do.
const routes: {
  path: string;
  priority: number;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
}[] = [
  { path: "", priority: 1, changeFrequency: "weekly" },
  { path: "/about", priority: 0.8, changeFrequency: "monthly" },
  { path: "/allProducts", priority: 0.9, changeFrequency: "weekly" },
  // { path: "/products", priority: 0.9, changeFrequency: "weekly" },
  // { path: "/quality", priority: 0.7, changeFrequency: "monthly" },
  { path: "/Team", priority: 0.6, changeFrequency: "monthly" },
  { path: "/contact", priority: 0.7, changeFrequency: "yearly" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const pages: MetadataRoute.Sitemap = routes.map(
    ({ path, priority, changeFrequency }) => ({
      url: `${siteConfig.url}${path}`,
      lastModified,
      changeFrequency,
      priority,
    })
  );

  const productPages: MetadataRoute.Sitemap = PRODUCTS.map((p) => ({
    url: `${siteConfig.url}/products/${p.slug}`,
    lastModified,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [...pages, ...productPages];
}