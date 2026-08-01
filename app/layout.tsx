import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
// import WhatsAppFloat from "@/Components/Whatsapp";
// import InstagramFloat from "@/Components/instagramfloats";
// import SiteAmbience from "@/Components/siteAmbience";

import Footer from "@/components/ui/Footer";
import Navbar from "@/components/ui/Navbar";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://growthnext.in"),
  title: "Growth Next | Digital Marketing Agency",
  description:
    "Growth Next helps businesses establish a strong digital presence through customized SEO, Social Media Marketing, Content Marketing, Blog Writing, Paid Advertising, and Content Planning strategies.",
  keywords:
    "digital marketing agency, SEO services, social media marketing, content marketing, paid advertising, Growth Next",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/icon.png",
    apple: "/apple-icon.png",
  },
    openGraph: {
    title: "Growth Next | Digital Marketing Agency",
    description: "Grow Smarter. Market Better. Customized digital marketing strategies that drive real results.",
    url: "https://growthnext.in",
    siteName: "Growth Next",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Growth Next — Digital Marketing Agency",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Growth Next | Digital Marketing Agency",
    description: "Grow Smarter. Market Better. Customized digital marketing strategies that drive real results.",
    images: ["/og-image.png"],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Growth Next",
  description:
    "Digital marketing agency offering SEO, Social Media Marketing, Content Marketing, Blog Writing, Paid Advertising, and Content Planning.",
  url: "https://growthnext.in",
  telephone: "+91-6264745500",
  email: "daswaniyukta020@gmail.com",
  sameAs: ["https://instagram.com/digitalmarketer.jivika"],
  areaServed: "IN",
  priceRange: "$$",
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
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col relative">
        <Navbar />
        
        {/* <SiteAmbience /> */}
        <div className="relative z-10 flex flex-col flex-1">
          {children}
        </div>

        <Footer />
        {/* <WhatsAppFloat />
        <InstagramFloat /> */}
      </body>
    </html>
  );
}