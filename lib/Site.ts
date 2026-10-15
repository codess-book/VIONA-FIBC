export const siteConfig = {
  name: "VIONA FIBC",
  legalName: "VIONA Flexible Packaging Pvt. Ltd.",
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "https://vionafibc.com").replace(/\/$/, ""),
  title: "VIONA FIBC | Premium Bulk Packaging Solutions",
  description:
    "Viona Flexible Packaging Pvt. Ltd. manufactures premium FIBC bulk bags, woven PP bags, and industrial packaging solutions. ISO certified, trusted worldwide.",
  keywords: [
    "FIBC bags",
    "bulk bags",
    "jumbo bags",
    "flexible packaging",
    "woven PP bags",
    "industrial packaging",
    "FIBC manufacturer India",
    "VIONA FIBC",
  ],
  phone: "+91-7992392070",
  email: "info@vionafibc.com",
  address: {
    streetAddress: "15/2 Tatya Tope Marg, Freeganj",
    addressLocality: "Ujjain",
    addressRegion: "Madhya Pradesh",
    postalCode: "456010",
    addressCountry: "IN",
  },
  geo: { latitude: 23.1793, longitude: 75.7849 },
  social: [
    "https://linkedin.com/company/vionafibc",
    "https://instagram.com/vionafibc",
    "https://facebook.com/vionafibc",
  ],
};