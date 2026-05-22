"use client";

import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import { TechTag } from "@/components/ui/TechTag";

export interface ProjectCardProps {
  title: string;
  description: string;
  image?: string;
  previewNotice?: string;
  technologies: string[];
  appStore?: string;
  playStore?: string;
  live?: string;
  index?: number;
}

export default function ProjectCard({
  title,
  description,
  image,
  previewNotice,
  technologies,
  appStore,
  playStore,
  live,
  index = 0,
}: ProjectCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: index * 0.07, ease: [0.25, 0.1, 0.25, 1] }}
      className="group flex flex-col h-full"
      style={{
        backgroundColor: "var(--color-surface)",
        border: "1px solid var(--color-border)",
      }}
      whileHover={{ y: -3 }}
    >
      {/* Image area */}
      {image && (
        <div
          className="relative overflow-hidden"
          style={{
            aspectRatio: "16/9",
            backgroundColor: "var(--color-surface-2)",
            borderBottom: "1px solid var(--color-border)",
          }}
        >
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover object-top"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          {previewNotice && (
            <div
              className="absolute top-3 left-3 font-mono text-[0.52rem] tracking-widest uppercase px-2 py-1"
              style={{
                backgroundColor: "var(--color-bg)",
                color: "var(--color-text-muted)",
                border: "1px solid var(--color-border)",
              }}
            >
              Aperçu
            </div>
          )}
        </div>
      )}

      {/* Content */}
      <div className="flex flex-col flex-1 p-6">
        <h3
          className="font-display font-normal leading-tight mb-2"
          style={{ fontSize: "clamp(1.1rem, 2vw, 1.35rem)", color: "var(--color-text)" }}
        >
          {title}
        </h3>

        <p
          className="text-sm leading-relaxed mb-4"
          style={{ color: "var(--color-text-muted)", flexGrow: 1 }}
        >
          {description}
        </p>

        {/* Tech tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {technologies.map((tech) => (
            <TechTag key={tech} name={tech} variant="compact" />
          ))}
        </div>

        {/* Store badges */}
        {(appStore || playStore) && (
          <div className="flex flex-wrap gap-2 pt-4" style={{ borderTop: "1px solid var(--color-border)" }}>
            {appStore && (
              <a
                href={appStore}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="inline-flex items-center gap-2 px-4 py-2 font-mono text-[0.62rem] tracking-widest uppercase transition-all duration-200"
                style={{
                  backgroundColor: "var(--color-text)",
                  color: "var(--color-bg)",
                }}
                onMouseEnter={e => (e.currentTarget.style.backgroundColor = "var(--color-accent)")}
                onMouseLeave={e => (e.currentTarget.style.backgroundColor = "var(--color-text)")}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                </svg>
                App Store
              </a>
            )}
            {playStore && (
              <a
                href={playStore}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="inline-flex items-center gap-2 px-4 py-2 font-mono text-[0.62rem] tracking-widest uppercase transition-all duration-200"
                style={{
                  backgroundColor: "var(--color-text)",
                  color: "var(--color-bg)",
                }}
                onMouseEnter={e => (e.currentTarget.style.backgroundColor = "var(--color-accent)")}
                onMouseLeave={e => (e.currentTarget.style.backgroundColor = "var(--color-text)")}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M3.18 23.76c.35.2.74.24 1.12.14L14.76 12 4.3.1c-.38-.1-.77-.06-1.12.14C2.47.67 2 1.42 2 2.28v19.44c0 .86.47 1.61 1.18 2.04zM16.34 13.58l2.55-2.55-11.43-6.6-1.12 1.12 10 8.03zm2.55-4.73L16.34 6.3 6.34 14.33l1.12 1.12 11.43-6.6zM4.3 23.9l10.46-11.9-2.55-2.55-8.03 10 .12.45z"/>
                </svg>
                Google Play
              </a>
            )}
          </div>
        )}

        {/* Live link */}
        {live && !appStore && !playStore && (
          <div className="mt-auto pt-4" style={{ borderTop: "1px solid var(--color-border)" }}>
            <a
              href={live}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="font-mono text-[0.62rem] tracking-widest uppercase link-underline"
              style={{ color: "var(--color-text-muted)" }}
            >
              Voir le site →
            </a>
          </div>
        )}
      </div>
    </motion.div>
  );
}
