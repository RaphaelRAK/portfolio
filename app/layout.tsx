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

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: "Aina Raphaël Rakotonaivo — Développeur Fullstack",
  description:
    "J'ai travaillé en cuisine et en caisse pendant que j'apprenais à coder. Mention Bien à chaque diplôme. Développeur Fullstack · React Native & Next.js / NestJS.",
  openGraph: {
    title: "Aina Raphaël Rakotonaivo — Développeur Fullstack",
    description:
      "J'ai travaillé en cuisine et en caisse pendant que j'apprenais à coder. Mention Bien à chaque diplôme.",
    siteName: "Portfolio — Aina Raphaël Rakotonaivo",
    images: [{ url: "/assets/icon.png", width: 1290, height: 1290, alt: "Aina Raphaël Rakotonaivo" }],
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Aina Raphaël Rakotonaivo — Développeur Fullstack",
    description:
      "J'ai travaillé en cuisine et en caisse pendant que j'apprenais à coder. Mention Bien à chaque diplôme.",
    images: ["/assets/icon.png"],
  },
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
        {children}
      </body>
    </html>
  );
}
