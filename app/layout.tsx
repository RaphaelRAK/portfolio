import type { Metadata } from "next";
import { Playfair_Display, DM_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";
import { baseMetadata } from "@/lib/metadata";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-playfair",
  display: "swap",
});

const dmMono = DM_Mono({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  style: ["normal", "italic"],
  variable: "--font-dm-mono",
  display: "swap",
});

export const metadata: Metadata = baseMetadata;

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Aina Raphaël Rakotonaivo",
  givenName: "Aina Raphaël",
  familyName: "Rakotonaivo",
  jobTitle: "Développeur Fullstack",
  description:
    "Développeur Fullstack spécialisé React Native, Next.js et NestJS, basé à La Réunion.",
  email: "raphael.rakotonaivo@gmail.com",
  url: "https://raphael-rakotonaivo.vercel.app",
  image: "https://raphael-rakotonaivo.vercel.app/og-image.png",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Saint-Denis",
    addressRegion: "La Réunion",
    addressCountry: "FR",
  },
  knowsAbout: [
    "React Native", "Next.js", "NestJS", "TypeScript",
    "PostgreSQL", "Supabase", "Docker", "Stripe", "Firebase",
  ],
  alumniOf: {
    "@type": "EducationalOrganization",
    name: "Université de La Réunion",
  },
  sameAs: [
    "https://github.com/raphael137",
    "https://gitlab.com/raphael137",
    "https://www.linkedin.com/in/aina-rapha%C3%ABl-rakotonaivo-80a821189/",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${playfair.variable} ${dmMono.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
