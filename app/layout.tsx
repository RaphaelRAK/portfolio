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
  title: "Développeur Fullstack React Native & Next.js | La Réunion & France — Aina Raphaël Rakotonaivo",
  description:
    "Développeur Fullstack basé à La Réunion (974), disponible en CDI ou CDD en France — La Réunion, Paris, Lyon, Toulouse ou remote. React Native, Next.js, NestJS, TypeScript. Mention Bien à chaque diplôme. Portfolio et contact.",
  keywords: [
    "développeur fullstack France",
    "développeur fullstack La Réunion",
    "développeur React Native France",
    "développeur React Native La Réunion",
    "développeur Next.js France",
    "développeur Next.js La Réunion",
    "développeur web France",
    "développeur web La Réunion",
    "développeur mobile France",
    "développeur mobile La Réunion",
    "développeur 974",
    "développeur informaticien La Réunion",
    "développeur CDI France",
    "développeur CDI La Réunion",
    "développeur remote France",
    "développeur Toulouse",
    "développeur Lyon",
    "développeur Paris",
    "ingénieur logiciel France",
    "développeur NestJS",
    "développeur TypeScript",
    "informaticien La Réunion",
    "Aina Raphaël Rakotonaivo",
  ],
  authors: [{ name: "Aina Raphaël Rakotonaivo", url: SITE_URL }],
  creator: "Aina Raphaël Rakotonaivo",
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  openGraph: {
    title: "Développeur Fullstack React Native & Next.js | La Réunion & France",
    description:
      "Développeur Fullstack basé à La Réunion, disponible en France (Paris, Lyon, Toulouse, remote). React Native, Next.js, NestJS. CDI, CDD ou projet bénévole.",
    siteName: "Portfolio — Aina Raphaël Rakotonaivo",
    images: [{ url: "/assets/icon.png", width: 1290, height: 1290, alt: "Aina Raphaël Rakotonaivo — Développeur Fullstack La Réunion France" }],
    locale: "fr_FR",
    type: "website",
    url: SITE_URL,
  },
  twitter: {
    card: "summary_large_image",
    title: "Développeur Fullstack | La Réunion & France — Aina Raphaël Rakotonaivo",
    description:
      "Développeur Fullstack React Native & Next.js, basé à La Réunion, disponible en CDI/CDD en France.",
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
    "Développeur Fullstack basé à La Réunion, spécialisé React Native, Next.js et NestJS. Disponible en CDI, CDD ou projet bénévole en France — La Réunion, Paris, Lyon, Toulouse ou remote.",
  url: SITE_URL,
  image: `${SITE_URL}/assets/icon.png`,
  address: {
    "@type": "PostalAddress",
    addressLocality: "La Réunion",
    addressRegion: "La Réunion",
    addressCountry: "FR",
  },
  areaServed: [
    { "@type": "Place", name: "La Réunion", addressCountry: "FR" },
    { "@type": "Place", name: "France", addressCountry: "FR" },
    { "@type": "Place", name: "Remote France" },
  ],
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
