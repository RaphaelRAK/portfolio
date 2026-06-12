import { notFound } from "next/navigation";
import Navbar from "@/components/shared/Navbar";
import { getAllSlugs, getProjectBySlug } from "@/lib/projects";
import ProjectDetail from "@/components/projects/ProjectDetail";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};
  const url = `https://raphael-rakotonaivo.vercel.app/projects/${slug}/`;
  return {
    title: project.title,
    description: project.shortDesc,
    keywords: project.stack,
    alternates: { canonical: url },
    openGraph: {
      title: `${project.title} — Aina Raphaël Rakotonaivo`,
      description: project.shortDesc,
      url,
      type: "article",
      images: project.images?.[0]
        ? [{ url: `https://raphael-rakotonaivo.vercel.app${project.images[0]}`, width: 800, height: 600, alt: project.title }]
        : [{ url: "https://raphael-rakotonaivo.vercel.app/og-image.png", width: 1200, height: 630, alt: project.title }],
    },
  };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  return (
    <>
      <Navbar />
      <ProjectDetail project={project} slug={slug} />
    </>
  );
}
