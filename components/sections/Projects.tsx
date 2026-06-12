"use client";

import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { getFeaturedProjects } from "@/lib/projects";
import ProjectCard from "@/components/projects/ProjectCard";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { RevealWords } from "@/components/ui/Reveal";

export default function Projects() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const featuredProjects = getFeaturedProjects();

  return (
    <section id="projects" ref={ref} className="py-[var(--section-padding)]">
      <div className="container-hanzo">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-[var(--section-header-gap)] flex flex-col gap-6 md:flex-row md:items-end md:justify-between"
        >
          <div>
            <SectionLabel>Projets</SectionLabel>
            <h2 className="heading-lg font-display text-[var(--color-text)] mt-[var(--section-label-gap)]">
              <RevealWords text="Études de cas récentes" />
            </h2>
          </div>
          <p className="text-muted text-sm max-w-sm leading-relaxed">
            Des produits que je construis et maintiens en production —
            défis techniques, architecture et résultats en détail.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
          {featuredProjects.map((project, index) => {
            // Pleine largeur pour le 1er projet et pour la dernière carte
            // quand elle serait orpheline dans la grille à 2 colonnes
            const featured =
              index === 0 ||
              (index === featuredProjects.length - 1 &&
                featuredProjects.length % 2 === 0);
            return (
              <Link
                key={project.slug}
                href={`/projects/${project.slug}/`}
                className={`block h-full ${featured ? "md:col-span-2" : ""}`}
              >
                <ProjectCard
                  title={project.title}
                  category={project.category}
                  description={project.shortDesc}
                  period={project.period}
                  images={project.images}
                  mediaType={project.mediaType}
                  previewNotice={project.previewNotice}
                  accent={project.accent}
                  featured={featured}
                  index={index}
                  cover={project.cover}
                />
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
