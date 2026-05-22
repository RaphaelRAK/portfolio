"use client";

import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { projects } from "@/lib/projects";
import ProjectCard from "@/components/projects/ProjectCard";

export default function Projects() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const featured = projects.filter((p) => p.featured);
  const rest = projects.filter((p) => !p.featured);

  return (
    <section id="projects" ref={ref} className="py-24 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <span className="section-label block mb-3">Projets</span>
          <h2
            className="font-display font-light leading-tight"
            style={{ fontSize: "clamp(2.5rem, 5vw, 4.5rem)", color: "var(--color-text)" }}
          >
            Ce que j&apos;ai construit
          </h2>
        </motion.div>

        {/* Featured */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          {featured.map((project, i) => (
            <Link
              key={project.slug}
              href={`/projects/${project.slug}/`}
              className="block"
            >
              <ProjectCard
                title={project.title}
                description={project.shortDesc}
                image={project.images?.[0]}
                previewNotice={project.previewNotice}
                technologies={project.stack.slice(0, 6)}
                appStore={project.links.appStore}
                playStore={project.links.playStore}
                live={project.links.live}
                index={i}
              />
            </Link>
          ))}
        </div>

        {/* Secondary */}
        {rest.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {rest.map((project, i) => (
              <Link
                key={project.slug}
                href={`/projects/${project.slug}/`}
                className="block"
              >
                <ProjectCard
                  title={project.title}
                  description={project.shortDesc}
                  image={project.images?.[0]}
                  previewNotice={project.previewNotice}
                  technologies={project.stack.slice(0, 5)}
                  live={project.links.live}
                  index={featured.length + i}
                />
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
