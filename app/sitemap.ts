import type { MetadataRoute } from "next";
import { projects } from "@/lib/projects";

export const dynamic = "force-static";

const BASE = "https://raphael-rakotonaivo.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    {
      url: `${BASE}/`,
      lastModified,
      changeFrequency: "monthly",
      priority: 1,
    },
    ...projects.map((project) => ({
      url: `${BASE}/projects/${project.slug}/`,
      lastModified,
      changeFrequency: (project.featured ? "monthly" : "yearly") as "monthly" | "yearly",
      priority: project.featured ? 0.8 : 0.5,
    })),
  ];
}
