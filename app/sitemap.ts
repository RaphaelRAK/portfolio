import type { MetadataRoute } from "next";

function getBaseUrl(): string {
  if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL;
  // Vercel fournit VERCEL_URL en prod (ex: raphael-rakotonaivo.vercel.app)
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return "https://raphael-rakotonaivo.vercel.app";
}

export default function sitemap(): MetadataRoute.Sitemap {
  const base = getBaseUrl();
  return [
    {
      url: base,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 1,
    },
  ];
}
