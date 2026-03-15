import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Aina Raphaël Rakotonaivo — Développeur Fullstack React Native & Next.js | La Réunion",
  description:
    "Développeur Fullstack basé à La Réunion (974), disponible en CDI, CDD ou bénévolat en métropole. Spécialisé React Native, Next.js, NestJS, TypeScript, PostgreSQL. Mention Bien à chaque diplôme.",
  keywords: [
    "développeur fullstack La Réunion",
    "développeur React Native La Réunion",
    "développeur Next.js La Réunion",
    "développeur informaticien 974",
    "développeur mobile La Réunion",
    "développeur web La Réunion",
    "développeur NestJS",
    "développeur TypeScript",
    "informaticien La Réunion",
    "développeur freelance La Réunion",
    "développeur CDI La Réunion",
    "Aina Raphaël Rakotonaivo",
    "développeur fullstack France",
    "développeur React Native France",
  ],
  authors: [{ name: "Aina Raphaël Rakotonaivo", url: SITE_URL }],
  creator: "Aina Raphaël Rakotonaivo",
  openGraph: {
    title: "Aina Raphaël Rakotonaivo — Développeur Fullstack | La Réunion",
    description:
      "Développeur Fullstack basé à La Réunion, spécialisé React Native & Next.js / NestJS. Disponible en CDI, CDD ou projet bénévole.",
    siteName: "Portfolio — Aina Raphaël Rakotonaivo",
    images: [{ url: "/assets/icon.png", width: 1290, height: 1290, alt: "Aina Raphaël Rakotonaivo" }],
    locale: "fr_FR",
    type: "website",
    url: SITE_URL,
  },
  twitter: {
    card: "summary_large_image",
    title: "Aina Raphaël Rakotonaivo — Développeur Fullstack | La Réunion",
    description:
      "Développeur Fullstack basé à La Réunion, spécialisé React Native & Next.js / NestJS.",
    images: ["/assets/icon.png"],
  },
  alternates: {
    canonical: SITE_URL,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Aina Raphaël Rakotonaivo",
  jobTitle: "Développeur Fullstack",
  description:
    "Développeur Fullstack basé à La Réunion, spécialisé React Native, Next.js et NestJS. Disponible en CDI, CDD ou projet bénévole en France.",
  url: SITE_URL,
  image: `${SITE_URL}/assets/icon.png`,
  address: {
    "@type": "PostalAddress",
    addressLocality: "La Réunion",
    addressRegion: "La Réunion",
    addressCountry: "FR",
  },
  knowsAbout: [
    "React Native", "Next.js", "NestJS", "TypeScript", "JavaScript",
    "PostgreSQL", "Supabase", "Docker", "Tailwind CSS", "Redux Toolkit",
    "GitHub Actions", "Stripe", "Firebase", "Figma",
  ],
  sameAs: [
    "https://github.com/RaphaelRAK",
    "https://gitlab.com/raphael137",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
