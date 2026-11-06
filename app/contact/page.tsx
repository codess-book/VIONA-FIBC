import type { Metadata } from "next";
import ContactSection from "@/components/contact";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Contact VIONA FIBC in Ujjain for FIBC bulk bag, jumbo bag and woven PP bag enquiries and quotes.",
  alternates: { canonical: "/contact" },
};

export default function Contact() {
  return <ContactSection />;
}