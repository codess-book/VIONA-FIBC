import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Team",
  description:
    "Meet the leadership and management team of VIONA FIBC, Ujjain: manufacturing, export marketing, logistics and documentation experts for FIBC bulk bags.",
  alternates: { canonical: "/team" },
};

export default function TeamLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}