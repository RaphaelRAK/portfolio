import type { MetadataRoute } from "next";

export const dynamic = "force-static";

const BASE = "https://raphael-rakotonaivo.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${BASE}/`,
      lastModified: new Date("2025-03-22"),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${BASE}/projects/plum-services/`,
      lastModified: new Date("2025-03-22"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE}/projects/ter-suivi-etudiants/`,
      lastModified: new Date("2025-03-22"),
      changeFrequency: "yearly",
      priority: 0.6,
    },
    {
      url: `${BASE}/projects/maido-vr/`,
      lastModified: new Date("2025-03-22"),
      changeFrequency: "yearly",
      priority: 0.6,
    },
    {
      url: `${BASE}/projects/stage-esige/`,
      lastModified: new Date("2025-03-22"),
      changeFrequency: "yearly",
      priority: 0.6,
    },
  ];
}
