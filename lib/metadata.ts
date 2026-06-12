import type { Metadata } from "next";

export const siteConfig = {
  name: "Aina Raphaël Rakotonaivo",
  title: "Aina Raphaël Rakotonaivo — Développeur Fullstack React Native & Next.js",
  description:
    "Développeur Fullstack spécialisé React Native, Next.js et NestJS, basé à La Réunion. Master 2 Informatique, CDI chez plüm. Disponible en remote — Paris, Lyon, Toulouse.",
  url: "https://raphael-rakotonaivo.vercel.app",
  email: "raphael.rakotonaivo@gmail.com",
  location: "La Réunion",
  gitlab: "https://gitlab.com/raphael137",
  linkedin: "https://www.linkedin.com/in/aina-rapha%C3%ABl-rakotonaivo-80a821189/",
  keywords: [
    "développeur fullstack",
    "développeur React Native",
    "développeur Next.js",
    "développeur La Réunion",
    "développeur mobile",
    "NestJS",
    "TypeScript",
    "PostgreSQL",
    "Docker",
    "développeur remote",
    "Aina Raphaël Rakotonaivo",
    "portfolio développeur",
    "développeur fullstack La Réunion",
    "React Native La Réunion",
  ],
};

export const baseMetadata: Metadata = {
  title: {
    default: siteConfig.title,
    template: "%s — Aina Raphaël Rakotonaivo",
  },
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  creator: siteConfig.name,
  metadataBase: new URL(siteConfig.url),
  alternates: {
    canonical: siteConfig.url,
  },
  openGraph: {
    title: siteConfig.title,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    locale: "fr_FR",
    type: "website",
    images: [{ url: `${siteConfig.url}/og-image.png`, width: 1200, height: 630, alt: siteConfig.title }],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
    images: [`${siteConfig.url}/og-image.png`],
    creator: "@raphaelrakoto",
  },
  verification: {
    google: "o_QlIdkvF0xCIqByc3_HcfutUHMCI7HjxGcv3vpxOcI",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};
