

import Hero from "@/components/Hero";
import IndustriesSection from "@/components/industryServed";
import AboutSection from "@/components/About";
import Testimonials from "@/components/testimonial";
// import { GlobeDemo } from "@/components/globe";
import ContactSection from "@/components/contact";
import ProductsSection from "@/components/product-card";
import Navbar from "@/components/ui/Navbar";
import CompanyProfilePage from "./whoweare/page";
import TeamAndCertificatesPage from "@/components/ourTeam"
export default function Home() {
  return (
   <>
   {/* <Navbar /> */}
     <main className="pt-16">
        <Hero />
        <AboutSection />
        <ProductsSection />
        <IndustriesSection />
        <TeamAndCertificatesPage />
        <Testimonials />
        {/* <GlobeDemo /> */}
        
        <ContactSection />
        
      </main>
   
   </>
  );
}
