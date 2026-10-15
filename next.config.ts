import type { NextConfig } from "next";

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-DNS-Prefetch-Control", value: "on" },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=()",
  },
];

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  images: {
    formats: ["image/avif", "image/webp"],
    // remotePatterns: [{ protocol: "https", hostname: "your-cdn.com" }],
  },
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
  // www -> non-www redirect (agar domain pe www bhi chalta hai)
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.vionafibc.com" }],
        destination: "https://vionafibc.com/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;