import type { Metadata } from "next";
import Hero from "@/components/Hero";
import AboutSection from "@/components/About";
import ProductsSection from "@/components/product-card";
import IndustriesSection from "@/components/industryServed";
import TeamAndCertificatesPage from "@/components/ourTeam";
import GlobalPresence from "@/components/GlobalPresence";
import ContactSection from "@/components/contact";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function Home() {
  // NOTE: layout.tsx already renders <main>. Never nest another <main> here.
  return (
    <div className="pt-16">
      <Hero />
      <AboutSection />
      <ProductsSection />
      <IndustriesSection />
      <TeamAndCertificatesPage />
      <GlobalPresence />
      <ContactSection />
    </div>
  );
}