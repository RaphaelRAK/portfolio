"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/lib/projects";
import ProjectStack from "@/components/projects/ProjectStack";
import ProjectExternalLink from "@/components/projects/ProjectExternalLink";
import { SiGitlab } from "react-icons/si";

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

const reveal = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, ease: EASE, delay },
});

interface Props {
  project: Project;
  slug: string;
}

export default function ProjectDetail({ project, slug }: Props) {
  const accent = project.accent ?? "#2e5bff";

  const links = [
    project.links.live && { href: project.links.live, label: "Voir le site →", type: "live_site" },
    project.links.appStore && { href: project.links.appStore, label: "App Store →", type: "app_store" },
    project.links.playStore && { href: project.links.playStore, label: "Google Play →", type: "play_store" },
    project.links.github && { href: project.links.github, label: "GitHub →", type: "github" },
    project.links.gitlab && { href: project.links.gitlab, label: "GitLab →", type: "gitlab" },
  ].filter(Boolean) as { href: string; label: string; type: string }[];

  return (
    <main className="min-h-screen pt-24 pb-28">
      {/* ── Hero ── */}
      <section
        className="relative overflow-hidden pt-12 pb-16 md:pt-16 md:pb-20"
        style={{
          background: `radial-gradient(ellipse 70% 80% at 50% -10%, color-mix(in srgb, ${accent} 14%, white), transparent 70%)`,
        }}
      >
        <div className="container-hanzo max-w-5xl">
          {/* Retour */}
          <motion.div {...reveal(0)} className="mb-10">
            <Link
              href="/#projects"
              className="inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] bg-white px-4 py-2 text-sm font-medium text-muted transition-all duration-200 hover:-translate-x-0.5 hover:border-[var(--color-primary)] hover:text-[var(--color-primary)]"
            >
              ← Tous les projets
            </Link>
          </motion.div>

          {/* Badges */}
          <motion.div {...reveal(0.06)} className="mb-5 flex flex-wrap items-center gap-3">
            <span
              className="rounded-full px-3.5 py-1 text-[0.7rem] font-bold uppercase tracking-[0.14em]"
              style={{
                color: `color-mix(in srgb, ${accent} 85%, black)`,
                background: `color-mix(in srgb, ${accent} 12%, white)`,
                border: `1px solid color-mix(in srgb, ${accent} 24%, transparent)`,
              }}
            >
              {project.category}
            </span>
            <span className="text-xs text-[var(--color-text-muted)]">{project.period}</span>
          </motion.div>

          {/* Titre */}
          <motion.h1
            {...reveal(0.12)}
            className="heading-lg font-display text-[var(--color-text)] mb-5 max-w-3xl"
          >
            {project.title}
          </motion.h1>

          <motion.p
            {...reveal(0.18)}
            className="text-base leading-relaxed text-muted max-w-2xl md:text-lg mb-10"
          >
            {project.shortDesc}
          </motion.p>

          {/* CTA links */}
          {links.length > 0 && (
            <motion.div {...reveal(0.24)} className="flex flex-wrap gap-3">
              {links.map((link) => (
                <ProjectExternalLink
                  key={link.type}
                  href={link.href}
                  linkType={link.type}
                  projectSlug={slug}
                  className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:brightness-110"
                  style={{
                    background: `linear-gradient(to top, ${accent}, color-mix(in srgb, ${accent} 75%, white))`,
                    boxShadow: `0 8px 20px -8px color-mix(in srgb, ${accent} 65%, transparent)`,
                  }}
                >
                  {link.type === "gitlab" && <SiGitlab size={14} />}
                  {link.label}
                </ProjectExternalLink>
              ))}
            </motion.div>
          )}

          {/* Chiffres clés */}
          {project.metrics && project.metrics.length > 0 && (
            <motion.div
              {...reveal(0.32)}
              className="mt-10 flex flex-col items-stretch divide-y divide-[var(--color-border)] rounded-2xl border border-[var(--color-border)] bg-white/80 backdrop-blur-sm sm:max-w-2xl sm:flex-row sm:divide-x sm:divide-y-0"
            >
              {project.metrics.map((metric) => (
                <div
                  key={metric.label}
                  className="flex flex-1 flex-col items-center gap-0.5 px-5 py-4 text-center"
                >
                  <span
                    className="font-display text-xl font-bold tracking-tight md:text-2xl"
                    style={{ color: `color-mix(in srgb, ${accent} 80%, black)` }}
                  >
                    {metric.value}
                  </span>
                  <span className="text-xs text-muted">{metric.label}</span>
                </div>
              ))}
            </motion.div>
          )}
        </div>
      </section>

      {/* ── Galerie images ── */}
      {project.images && project.images.length > 0 && (
        <section
          className="py-14 md:py-18"
          style={{
            background: `linear-gradient(180deg, color-mix(in srgb, ${accent} 7%, white) 0%, white 100%)`,
          }}
        >
          <div className="container-hanzo max-w-5xl mb-5">
            {project.previewNotice && (
              <motion.p
                {...reveal(0)}
                className="mb-5 inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] bg-white px-4 py-2 text-xs text-muted"
              >
                <span>ℹ️</span>
                {project.previewNotice}
              </motion.p>
            )}
          </div>

          {/* Scroll horizontal — screenshots */}
          <div className="pl-[clamp(1.25rem,4vw,3.5rem)] overflow-x-auto">
            <motion.div
              initial={{ opacity: 0, x: 32 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, ease: EASE }}
              className="flex gap-5 pb-4 w-max"
            >
              {project.images.map((src, index) => {
                const isMobile = project.mediaType === "mobile";
                return (
                  <motion.div
                    key={src}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.55, delay: index * 0.07, ease: EASE }}
                    className="relative shrink-0 overflow-hidden rounded-2xl border border-[var(--color-border)] bg-white shadow-[0_4px_16px_-8px_rgba(10,10,20,0.15)]"
                    style={
                      isMobile
                        ? { width: 220, height: 460 }
                        : { width: 640, height: 400 }
                    }
                  >
                    <Image
                      src={src}
                      alt={`${project.title} — aperçu ${index + 1}`}
                      fill
                      className="object-contain"
                      sizes={isMobile ? "220px" : "640px"}
                    />
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </section>
      )}

      {/* ── Corps — 2 colonnes ── */}
      <div className="container-hanzo max-w-5xl mt-14">
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-3 lg:gap-16">

          {/* Colonne principale — description + stack */}
          <div className="lg:col-span-2 space-y-12">

            {/* Description détaillée */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: EASE }}
            >
              <h2
                className="mb-1 text-[0.68rem] font-bold uppercase tracking-[0.14em]"
                style={{ color: `color-mix(in srgb, ${accent} 85%, black)` }}
              >
                Description
              </h2>
              <div className="mt-4 h-0.5 w-10 mb-6" style={{ background: accent }} />
              <p className="text-base leading-[1.85] text-muted">{project.longDesc}</p>
            </motion.section>

            {/* Ce que j'ai fait */}
            {project.highlights && project.highlights.length > 0 && (
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: EASE }}
              >
                <h2
                  className="mb-1 text-[0.68rem] font-bold uppercase tracking-[0.14em]"
                  style={{ color: `color-mix(in srgb, ${accent} 85%, black)` }}
                >
                  Ce que j&apos;ai fait
                </h2>
                <div className="mt-4 h-0.5 w-10 mb-6" style={{ background: accent }} />
                <ul className="space-y-3">
                  {project.highlights.map((item, index) => (
                    <motion.li
                      key={item}
                      initial={{ opacity: 0, x: -16 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.45, delay: index * 0.07, ease: EASE }}
                      className="flex items-start gap-3 text-[0.9375rem] leading-relaxed text-muted"
                    >
                      <span
                        className="mt-1 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[0.6rem] font-bold text-white"
                        style={{ background: accent }}
                        aria-hidden
                      >
                        ✓
                      </span>
                      {item}
                    </motion.li>
                  ))}
                </ul>
              </motion.section>
            )}

            {/* Défis techniques — problème / solution / résultat */}
            {project.challenges && project.challenges.length > 0 && (
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: EASE }}
              >
                <h2
                  className="mb-1 text-[0.68rem] font-bold uppercase tracking-[0.14em]"
                  style={{ color: `color-mix(in srgb, ${accent} 85%, black)` }}
                >
                  Défis techniques
                </h2>
                <div className="mt-4 h-0.5 w-10 mb-6" style={{ background: accent }} />
                <div className="space-y-5">
                  {project.challenges.map((challenge, index) => (
                    <motion.article
                      key={challenge.title}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.55, delay: index * 0.08, ease: EASE }}
                      className="overflow-hidden rounded-2xl border border-[var(--color-border)] bg-white shadow-[0_1px_3px_rgba(10,10,20,0.04)]"
                    >
                      <div
                        className="border-b px-6 py-4"
                        style={{
                          background: `color-mix(in srgb, ${accent} 6%, white)`,
                          borderColor: `color-mix(in srgb, ${accent} 15%, transparent)`,
                        }}
                      >
                        <h3 className="font-display text-base font-semibold tracking-tight text-[var(--color-text)] md:text-lg">
                          {challenge.title}
                        </h3>
                      </div>
                      <div className="space-y-4 px-6 py-5">
                        <div>
                          <p className="mb-1 text-[0.65rem] font-bold uppercase tracking-[0.12em] text-[#ef4444]">
                            Problème
                          </p>
                          <p className="text-sm leading-relaxed text-muted">{challenge.problem}</p>
                        </div>
                        <div>
                          <p className="mb-1 text-[0.65rem] font-bold uppercase tracking-[0.12em] text-[var(--color-primary)]">
                            Solution
                          </p>
                          <p className="text-sm leading-relaxed text-muted">{challenge.solution}</p>
                        </div>
                        {challenge.result && (
                          <div>
                            <p className="mb-1 text-[0.65rem] font-bold uppercase tracking-[0.12em] text-[#10b981]">
                              Résultat
                            </p>
                            <p className="text-sm leading-relaxed text-muted">{challenge.result}</p>
                          </div>
                        )}
                      </div>
                    </motion.article>
                  ))}
                </div>
              </motion.section>
            )}

            {/* Architecture */}
            {project.architecture && project.architecture.length > 0 && (
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: EASE }}
              >
                <h2
                  className="mb-1 text-[0.68rem] font-bold uppercase tracking-[0.14em]"
                  style={{ color: `color-mix(in srgb, ${accent} 85%, black)` }}
                >
                  Architecture
                </h2>
                <div className="mt-4 h-0.5 w-10 mb-6" style={{ background: accent }} />
                <div className="flex flex-col items-stretch gap-2 sm:flex-row sm:items-center sm:flex-wrap">
                  {project.architecture.map((node, index) => (
                    <motion.div
                      key={node}
                      initial={{ opacity: 0, scale: 0.92 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: index * 0.12, ease: EASE }}
                      className="flex items-center gap-2"
                    >
                      <span
                        className="flex-1 rounded-xl border px-4 py-3 text-center text-sm font-semibold text-[var(--color-text)] sm:flex-none"
                        style={{
                          background: `color-mix(in srgb, ${accent} 7%, white)`,
                          borderColor: `color-mix(in srgb, ${accent} 22%, transparent)`,
                        }}
                      >
                        {node}
                      </span>
                      {index < project.architecture!.length - 1 && (
                        <span
                          className="hidden text-lg sm:block"
                          style={{ color: accent }}
                          aria-hidden
                        >
                          →
                        </span>
                      )}
                    </motion.div>
                  ))}
                </div>
              </motion.section>
            )}

            {/* Stack */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: EASE, delay: 0.06 }}
            >
              <h2
                className="mb-1 text-[0.68rem] font-bold uppercase tracking-[0.14em]"
                style={{ color: `color-mix(in srgb, ${accent} 85%, black)` }}
              >
                Stack technique
              </h2>
              <div className="mt-4 h-0.5 w-10 mb-6" style={{ background: accent }} />
              <ProjectStack items={project.stack} />
            </motion.section>
          </div>

          {/* Sidebar — méta */}
          <aside className="space-y-5">
            {[
              { label: "Contexte", value: project.context },
              { label: "Rôle", value: project.role },
              { label: "Période", value: project.period },
            ].map((meta, index) => (
              <motion.div
                key={meta.label}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08, ease: EASE }}
                className="rounded-2xl border border-[var(--color-border)] bg-white p-5 shadow-[0_1px_3px_rgba(10,10,20,0.04)]"
              >
                <p
                  className="mb-1.5 text-[0.65rem] font-bold uppercase tracking-[0.14em]"
                  style={{ color: `color-mix(in srgb, ${accent} 85%, black)` }}
                >
                  {meta.label}
                </p>
                <p className="text-sm font-semibold text-[var(--color-text)]">{meta.value}</p>
              </motion.div>
            ))}

            {/* Liens — sidebar */}
            {(links.length > 0 || project.sourceNote) && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.25, ease: EASE }}
                className="rounded-2xl border border-[var(--color-border)] bg-white p-5 shadow-[0_1px_3px_rgba(10,10,20,0.04)]"
              >
                <p
                  className="mb-3 text-[0.65rem] font-bold uppercase tracking-[0.14em]"
                  style={{ color: `color-mix(in srgb, ${accent} 85%, black)` }}
                >
                  {links.length > 0 ? "Liens" : "Accès"}
                </p>
                <div className="flex flex-col gap-2">
                  {links.map((link) => (
                    <ProjectExternalLink
                      key={link.type}
                      href={link.href}
                      linkType={link.type}
                      projectSlug={slug}
                      className="inline-flex items-center justify-between gap-2 rounded-xl border border-[var(--color-border)] px-4 py-3 text-sm font-medium text-[var(--color-text)] transition-all duration-200 hover:-translate-y-0.5 hover:border-[var(--color-primary)] hover:text-[var(--color-primary)]"
                    >
                      <span>{link.label.replace(" →", "")}</span>
                      <span className="text-xs">→</span>
                    </ProjectExternalLink>
                  ))}
                </div>
                {project.sourceNote && (
                  <p
                    className={`text-xs leading-relaxed text-muted ${
                      links.length > 0 ? "mt-4 border-t border-[var(--color-border)] pt-3" : ""
                    }`}
                  >
                    🔒 {project.sourceNote}
                  </p>
                )}
              </motion.div>
            )}
          </aside>
        </div>

        {/* Navigation bas de page */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-20 pt-10 border-t border-[var(--color-border)] flex items-center justify-between"
        >
          <Link
            href="/#projects"
            className="inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] bg-white px-5 py-2.5 text-sm font-medium text-muted transition-all duration-200 hover:-translate-x-0.5 hover:border-[var(--color-primary)] hover:text-[var(--color-primary)]"
          >
            ← Tous les projets
          </Link>
          <span className="font-display text-sm text-[var(--color-text-faint)]">RAR.dev</span>
        </motion.div>
      </div>
    </main>
  );
}
