import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/shared/Navbar";
import { getAllSlugs, getProjectBySlug } from "@/lib/projects";
import ProjectStack from "@/components/projects/ProjectStack";
import ProjectExternalLink from "@/components/projects/ProjectExternalLink";
import { SectionLabel } from "@/components/ui/SectionLabel";
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
  const url = `https://raphael-dev.vercel.app/projects/${slug}/`;
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
        ? [{ url: `https://raphael-dev.vercel.app${project.images[0]}`, width: 800, height: 600, alt: project.title }]
        : [{ url: "https://raphael-dev.vercel.app/og-image.png", width: 1200, height: 630, alt: project.title }],
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
      <main className="min-h-screen pt-28 pb-24">
        <div className="container-hanzo max-w-4xl">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-muted hover:text-[var(--color-text)] transition-colors mb-12"
          >
            ← Retour
          </Link>

          <div className="mb-12">
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className="text-xs font-medium px-3 py-1 rounded-full bg-[var(--color-surface-2)] text-muted">
                {project.context}
              </span>
              <span className="text-xs text-muted">{project.period}</span>
            </div>

            <h1 className="heading-lg font-display text-[var(--color-text)] mb-4">
              {project.title}
            </h1>
            <p className="text-muted text-lg leading-relaxed max-w-2xl">
              {project.shortDesc}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
            {[
              { label: "Contexte", value: project.context },
              { label: "Rôle", value: project.role },
              { label: "Période", value: project.period },
            ].map((meta) => (
              <div key={meta.label} className="card-hanzo p-5">
                <SectionLabel>{meta.label}</SectionLabel>
                <p className="text-sm font-medium text-[var(--color-text)] mt-3">{meta.value}</p>
              </div>
            ))}
          </div>

          <div className="mb-12">
            <SectionLabel>Description</SectionLabel>
            <p className="text-muted leading-relaxed mt-4 text-base">{project.longDesc}</p>
          </div>

          {project.images && project.images.length > 0 && (
            <div className="mb-12">
              <SectionLabel>Aperçu</SectionLabel>
              {project.previewNotice && (
                <p className="text-sm text-muted mt-4 mb-4 p-4 rounded-[var(--radius-card)] border border-[var(--color-border)] bg-[var(--color-surface)]">
                  {project.previewNotice}
                </p>
              )}
              <div className="flex gap-4 overflow-x-auto pb-4 mt-4">
                {project.images.map((src, index) => (
                  <div
                    key={src}
                    className="relative shrink-0 overflow-hidden rounded-[var(--radius-card)] border border-[var(--color-border)]"
                    style={{ width: 200, height: 432 }}
                  >
                    <Image
                      src={src}
                      alt={`${project.title} — écran ${index + 1}`}
                      fill
                      className="object-cover"
                      sizes="200px"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="mb-12">
            <SectionLabel>Stack</SectionLabel>
            <div className="mt-4">
              <ProjectStack items={project.stack} />
            </div>
          </div>

          {project.links.live && (
            <div className="mb-12">
              <SectionLabel>Site web</SectionLabel>
              <ProjectExternalLink
                href={project.links.live}
                linkType="live_site"
                projectSlug={slug}
                className="group block card-hanzo mt-4 p-8 hover:-translate-y-0.5 transition-transform"
              >
                <p className="font-display text-xl text-[var(--color-text)] group-hover:opacity-80">
                  Visiter le site →
                </p>
                <p className="text-sm text-muted mt-1">
                  {project.links.live.replace(/^https?:\/\//, "").replace(/\/$/, "")}
                </p>
              </ProjectExternalLink>
            </div>
          )}

          {(project.links.appStore || project.links.playStore) && (
            <div className="mb-12 flex flex-wrap gap-4">
              {project.links.appStore && (
                <ProjectExternalLink
                  href={project.links.appStore}
                  linkType="app_store"
                  projectSlug={slug}
                  className="btn-primary"
                >
                  App Store
                </ProjectExternalLink>
              )}
              {project.links.playStore && (
                <ProjectExternalLink
                  href={project.links.playStore}
                  linkType="play_store"
                  projectSlug={slug}
                  className="btn-primary"
                >
                  Google Play
                </ProjectExternalLink>
              )}
            </div>
          )}

          <div className="pt-10 border-t border-[var(--color-border)]">
            <Link href="/#projects" className="btn-secondary">
              ← Tous les projets
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
