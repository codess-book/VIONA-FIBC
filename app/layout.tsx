import type { Metadata, Viewport } from "next";
import { Bebas_Neue, Inter, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import Footer from "@/components/ui/Footer";
import Navbar from "@/components/ui/Navbar";
import FloatingContact from "@/components/floatingContacts";
import { siteConfig } from "@/lib/Site";
// ---------- Fonts (self-hosted by next/font, no preconnect needed) ----------
const bebasNeue = Bebas_Neue({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-bebas-neue",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-plex-mono",
  display: "swap",
});

// ---------- Viewport / theme color ----------
export const viewport: Viewport = {
  themeColor: "#0A0A0B",
  width: "device-width",
  initialScale: 1,
};

// ---------- Metadata ----------
export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  applicationName: siteConfig.name,
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  creator: siteConfig.legalName,
  publisher: siteConfig.legalName,
  category: "Packaging",
  alternates: {
    canonical: "/",
    languages: { "en-IN": "/", "x-default": "/" },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  // Icons: app/favicon.ico, app/icon.png, app/apple-icon.png are picked up
  // automatically by Next.js. Do NOT also add manual <link rel="icon"> tags.
  manifest: "/manifest.webmanifest",
  appleWebApp: { title: siteConfig.name, capable: true },
  formatDetection: { telephone: true, email: true, address: true },
  openGraph: {
    title: siteConfig.title,
    description:
      "Premium FIBC bulk bags and industrial packaging solutions by Viona Flexible Packaging Pvt. Ltd.",
    url: siteConfig.url,
    siteName: siteConfig.name,
    type: "website",
    locale: "en_IN",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "VIONA FIBC - Premium Bulk Packaging Solutions",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description:
      "Premium FIBC bulk bags and industrial packaging solutions by Viona Flexible Packaging Pvt. Ltd.",
    images: ["/og-image.jpg"],
  },
  verification: {
    // Google Search Console -> HTML tag method: paste only the content value
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
    other: process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION
      ? { "msvalidate.01": process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION }
      : undefined,
  },
  other: {
    "geo.region": "IN-MP",
    "geo.placename": "Ujjain",
    "geo.position": `${siteConfig.geo.latitude};${siteConfig.geo.longitude}`,
    ICBM: `${siteConfig.geo.latitude}, ${siteConfig.geo.longitude}`,
  },
};

// ---------- JSON-LD Schema ----------
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${siteConfig.url}/#organization`,
      name: siteConfig.legalName,
      alternateName: siteConfig.name,
      url: siteConfig.url,
      logo: `${siteConfig.url}/icon.png`,
      image: `${siteConfig.url}/og-image.jpg`,
      description:
        "Manufacturer of premium FIBC bulk bags, woven PP bags, and industrial packaging solutions.",
      telephone: siteConfig.phone,
      email: siteConfig.email,
      address: { "@type": "PostalAddress", ...siteConfig.address },
      contactPoint: [
        {
          "@type": "ContactPoint",
          telephone: siteConfig.phone,
          email: siteConfig.email,
          contactType: "sales",
          areaServed: "Worldwide",
          availableLanguage: ["English", "Hindi"],
        },
      ],
      sameAs: siteConfig.social,
    },
    {
      "@type": "WebSite",
      "@id": `${siteConfig.url}/#website`,
      url: siteConfig.url,
      name: siteConfig.name,
      publisher: { "@id": `${siteConfig.url}/#organization` },
      inLanguage: "en-IN",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en-IN"
      suppressHydrationWarning
      className={`${bebasNeue.variable} ${inter.variable} ${plexMono.variable} h-full antialiased bg-[#0A0A0B]`}
    >
      <body className="min-h-full flex flex-col relative font-inter text-white/90">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
          }}
        />
        <Navbar />
        <main className="relative z-10 flex flex-col flex-1">{children}</main>
        <Footer />
        <FloatingContact />
      </body>
    </html>
  );
}
