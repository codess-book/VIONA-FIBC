import type { Metadata } from "next";
import { Bebas_Neue, Inter, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import WhatsAppFloat from "@/components/watsappfloating";
import InstagramFloat from "@/components/instagramfloats";
import Footer from "@/components/ui/Footer";
import Navbar from "@/components/ui/Navbar";

// ---------- Fonts ----------
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

// ---------- Basic Metadata ----------
export const metadata: Metadata = {
  title: {
    default: "VIONA FIBC | Premium Bulk Packaging Solutions",
    template: "%s | VIONA FIBC",
  },
  description:
    "Viona Flexible Packaging Pvt. Ltd. manufactures premium FIBC bulk bags, woven PP bags, and industrial packaging solutions. ISO certified, trusted worldwide.",
  keywords:
    "FIBC bags, bulk bags, flexible packaging, woven PP bags, industrial packaging, VIONA FIBC",
  authors: [{ name: "VIONA FIBC" }],
  creator: "VIONA Flexible Packaging Pvt. Ltd.",
  publisher: "VIONA Flexible Packaging Pvt. Ltd.",
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-icon.png",
  },
  openGraph: {
    title: "VIONA FIBC | Premium Bulk Packaging Solutions",
    description:
      "Premium FIBC bulk bags and industrial packaging solutions by Viona Flexible Packaging Pvt. Ltd.",
    url: "https://vionafibc.com",
    siteName: "VIONA FIBC",
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
    title: "VIONA FIBC | Premium Bulk Packaging Solutions",
    description:
      "Premium FIBC bulk bags and industrial packaging solutions by Viona Flexible Packaging Pvt. Ltd.",
    images: ["/og-image.jpg"],
  },
};

// ---------- JSON-LD Schema ----------
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Corporation",
  name: "VIONA Flexible Packaging Pvt. Ltd.",
  description:
    "Premium FIBC bulk bags, woven PP bags, and industrial packaging solutions manufacturer.",
  url: "https://vionafibc.com",
  telephone: "+91-7992392070",
  email: "info@vionafibc.com",
  address: {
    "@type": "PostalAddress",
    streetAddress: "15/2 Tatya Tope Marg, Freeganj",
    addressLocality: "Ujjain",
    addressRegion: "Madhya Pradesh",
    postalCode: "456010",
    addressCountry: "IN",
  },
  sameAs: [
    "https://linkedin.com/company/vionafibc",
    "https://instagram.com/vionafibc",
    "https://facebook.com/vionafibc",
  ],
  areaServed: "Worldwide",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${bebasNeue.variable} ${inter.variable} ${plexMono.variable} h-full antialiased bg-[#0A0A0B]`}
    >
      <head>
        {/* JSON-LD Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        {/* Preconnect for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* Favicon */}
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#0A0A0B" />
        
        {/* Basic Meta Tags */}
        <meta name="application-name" content="VIONA FIBC" />
        <meta name="apple-mobile-web-app-title" content="VIONA FIBC" />
        <meta name="format-detection" content="telephone=yes" />
        <meta name="mobile-web-app-capable" content="yes" />
        
        {/* Geo Tags */}
        <meta name="geo.region" content="IN-MP" />
        <meta name="geo.placename" content="Ujjain" />
        <meta name="geo.position" content="23.1793;75.7849" />
        <meta name="ICBM" content="23.1793, 75.7849" />
        
        {/* hreflang for international SEO */}
        <link rel="alternate" hrefLang="en" href="https://vionafibc.com" />
        <link rel="alternate" hrefLang="x-default" href="https://vionafibc.com" />
      </head>
      <body className="min-h-full flex flex-col relative font-inter text-white/90">
        <Navbar />

        <main className="relative z-10 flex flex-col flex-1">
          {children}
        </main>

        <Footer />

        <WhatsAppFloat />
        <InstagramFloat />
      </body>
    </html>
  );
}