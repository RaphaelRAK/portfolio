import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { getAllSlugs, getProjectBySlug } from "@/lib/projects";
import ProjectStack from "@/components/projects/ProjectStack";
import ProjectExternalLink from "@/components/projects/ProjectExternalLink";
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
    <main
      className="min-h-screen py-24 px-6 md:px-12"
      style={{ backgroundColor: "var(--color-bg)" }}
    >
      <div className="max-w-4xl mx-auto">
        {/* Back */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 section-label text-[var(--color-text-muted)] hover:text-[var(--color-accent)] transition-colors mb-16 group"
        >
          <span className="transition-transform group-hover:-translate-x-1">←</span>
          Retour
        </Link>

        {/* Header */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <span className="section-label text-[var(--color-accent)]">{project.context}</span>
            <span className="block h-px w-8 bg-[var(--color-accent)]" />
            <span className="section-label text-[var(--color-text-muted)]">{project.period}</span>
          </div>

          <h1
            className="font-display font-light text-[var(--color-text)] leading-tight mb-4"
            style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)" }}
          >
            {project.title}
          </h1>

          <p className="text-[var(--color-text-muted)] text-lg md:text-xl leading-relaxed max-w-2xl">
            {project.shortDesc}
          </p>
        </div>

        {/* Divider */}
        <div className="h-px bg-[var(--color-border)] mb-12" />

        {/* Meta grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-16">
          <div>
            <p className="section-label text-[var(--color-accent)] mb-2">Contexte</p>
            <p className="font-display text-base font-light text-[var(--color-text)]">
              {project.context}
            </p>
          </div>
          <div>
            <p className="section-label text-[var(--color-accent)] mb-2">Rôle</p>
            <p className="font-display text-base font-light text-[var(--color-text)]">
              {project.role}
            </p>
          </div>
          <div>
            <p className="section-label text-[var(--color-accent)] mb-2">Période</p>
            <p className="font-display text-base font-light text-[var(--color-text)]">
              {project.period}
            </p>
          </div>
        </div>

        {/* Description */}
        <div className="mb-16">
          <p className="section-label text-[var(--color-accent)] mb-6">Description</p>
          <p className="text-[var(--color-text-muted)] leading-relaxed text-base md:text-lg">
            {project.longDesc}
          </p>
        </div>

        {/* Screenshots */}
        {project.images && project.images.length > 0 && (
          <div className="mb-16">
            <p className="section-label text-[var(--color-accent)] mb-6">Aperçu</p>
            {project.previewNotice && (
              <div className="mb-4 rounded-md border border-[var(--color-accent)]/30 bg-[var(--color-surface)] px-4 py-3">
                <p className="text-sm text-[var(--color-text-muted)]">
                  {project.previewNotice}
                </p>
              </div>
            )}
            <div className="flex gap-4 overflow-x-auto pb-4" style={{ scrollSnapType: "x mandatory" }}>
              {project.images.map((src, i) => (
                <div
                  key={i}
                  className="flex-shrink-0 relative overflow-hidden border border-[var(--color-border)]"
                  style={{ width: 200, height: 432, scrollSnapAlign: "start" }}
                >
                  <Image
                    src={src}
                    alt={`${project.title} — écran ${i + 1}`}
                    fill
                    className="object-cover"
                    sizes="200px"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Stack */}
        <div className="mb-16">
          <p className="section-label text-[var(--color-accent)] mb-6">Stack</p>
          <ProjectStack items={project.stack} />
        </div>

        {/* Live site preview */}
        {project.links.live && (
          <div className="mb-16">
            <p className="section-label text-[var(--color-accent)] mb-6">Site web</p>
            <ProjectExternalLink
              href={project.links.live}
              linkType="live_site"
              projectSlug={slug}
              className="group block border border-[var(--color-border)] hover:border-[var(--color-accent)] transition-colors duration-300"
              style={{ backgroundColor: "var(--color-surface)" }}
            >
              {/* Browser chrome */}
              <div
                className="flex items-center gap-3 px-4 py-3 border-b border-[var(--color-border)]"
                style={{ backgroundColor: "var(--color-surface-2)" }}
              >
                <span className="flex gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[var(--color-border)]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[var(--color-border)]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[var(--color-border)]" />
                </span>
                <span
                  className="flex-1 text-center section-label text-[var(--color-text-muted)] px-4 py-1 rounded-sm text-xs"
                  style={{ backgroundColor: "var(--color-bg)" }}
                >
                  {project.links.live.replace(/^https?:\/\//, "").replace(/\/$/, "")}
                </span>
              </div>
              {/* Content */}
              <div className="px-8 py-10 flex items-center justify-between">
                <div>
                  <p className="font-display text-2xl font-light text-[var(--color-text)] mb-1 group-hover:text-[var(--color-accent)] transition-colors">
                    {project.title}
                  </p>
                  <p className="section-label text-[var(--color-text-muted)]">
                    Visiter le site
                  </p>
                </div>
                <span className="text-[var(--color-accent)] text-2xl transition-transform group-hover:translate-x-1 group-hover:-translate-y-1">
                  ↗
                </span>
              </div>
            </ProjectExternalLink>
          </div>
        )}

        {/* Store links */}
        {(project.links.appStore || project.links.playStore) && (
          <div className="mb-16">
            <p className="section-label text-[var(--color-accent)] mb-6">
              Télécharger l&apos;application
            </p>
            <div className="flex flex-wrap gap-4">
              {project.links.appStore && (
                <ProjectExternalLink
                  href={project.links.appStore}
                  linkType="app_store"
                  projectSlug={slug}
                  className="group flex items-center gap-4 border border-[var(--color-border)] hover:border-[var(--color-accent)] px-6 py-4 transition-all duration-200 min-w-48"
                  style={{ backgroundColor: "var(--color-surface)" }}
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="w-7 h-7 text-[var(--color-text)] group-hover:text-[var(--color-accent)] transition-colors flex-shrink-0"
                    fill="currentColor"
                  >
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                  </svg>
                  <div>
                    <p className="section-label text-[var(--color-text-muted)] text-xs leading-none mb-1">
                      Disponible sur
                    </p>
                    <p className="font-display font-light text-[var(--color-text)] group-hover:text-[var(--color-accent)] transition-colors leading-tight">
                      App Store
                    </p>
                  </div>
                </ProjectExternalLink>
              )}
              {project.links.playStore && (
                <ProjectExternalLink
                  href={project.links.playStore}
                  linkType="play_store"
                  projectSlug={slug}
                  className="group flex items-center gap-4 border border-[var(--color-border)] hover:border-[var(--color-accent)] px-6 py-4 transition-all duration-200 min-w-48"
                  style={{ backgroundColor: "var(--color-surface)" }}
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="w-7 h-7 flex-shrink-0 text-[var(--color-text)] group-hover:text-[var(--color-accent)] transition-colors"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden
                  >
                    <path d="M22.018 13.298l-3.919 2.218-3.515-3.493 3.543-3.521 3.891 2.202a1.49 1.49 0 0 1 0 2.594zM1.337.924a1.486 1.486 0 0 0-.112.568v21.017c0 .217.045.419.124.6l11.155-11.087L1.337.924zm12.207 10.065l3.258-3.238L3.45.195a1.466 1.466 0 0 0-.946-.179l11.04 10.973zm0 2.067l-11 10.933c.298.036.612-.016.906-.183l13.324-7.54-3.23-3.21z" />
                  </svg>
                  <div>
                    <p className="section-label text-[var(--color-text-muted)] text-xs leading-none mb-1">
                      Disponible sur
                    </p>
                    <p className="font-display font-light text-[var(--color-text)] group-hover:text-[var(--color-accent)] transition-colors leading-tight">
                      Google Play
                    </p>
                  </div>
                </ProjectExternalLink>
              )}
            </div>
          </div>
        )}

        {/* Other links (github/gitlab) */}
        {(project.links.github || project.links.gitlab) && (
          <div className="mb-16">
            <p className="section-label text-[var(--color-accent)] mb-6">Code source</p>
            <div className="flex flex-wrap gap-4">
              {project.links.github && (
                <ProjectExternalLink
                  href={project.links.github}
                  linkType="github"
                  projectSlug={slug}
                  className="section-label border border-[var(--color-border)] text-[var(--color-text-muted)] px-6 py-3 hover:border-[var(--color-text)] hover:text-[var(--color-text)] transition-all duration-200"
                >
                  GitHub →
                </ProjectExternalLink>
              )}
              {project.links.gitlab && (
                <ProjectExternalLink
                  href={project.links.gitlab}
                  linkType="gitlab"
                  projectSlug={slug}
                  className="section-label border border-[var(--color-border)] text-[var(--color-text-muted)] px-6 py-3 hover:border-[var(--color-text)] hover:text-[var(--color-text)] transition-all duration-200"
                >
                  GitLab →
                </ProjectExternalLink>
              )}
            </div>
          </div>
        )}

        {/* Back CTA */}
        <div className="pt-12 border-t border-[var(--color-border)]">
          <Link
            href="/"
            className="inline-flex items-center gap-3 group"
          >
            <span
              className="font-display text-2xl font-light text-[var(--color-text)] group-hover:text-[var(--color-accent)] transition-colors"
            >
              ← Tous les projets
            </span>
          </Link>
        </div>
      </div>
    </main>
  );
}
