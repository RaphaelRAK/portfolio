"use client";

import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import { getTechLogo } from "@/lib/devicon";

export interface ProjectCardProps {
  title: string;
  category: string;
  description: string;
  period?: string;
  image?: string;
  previewNotice?: string;
  technologies: string[];
  reversed?: boolean;
  index?: number;
}

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

export default function ProjectCard({
  title,
  category,
  description,
  period,
  image,
  previewNotice,
  technologies,
  reversed = false,
  index = 0,
}: ProjectCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const orderNumber = String(index + 1).padStart(2, "0");

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: EASE }}
      className="group card-hanzo grid grid-cols-1 lg:grid-cols-2 overflow-hidden transition-shadow duration-500 hover:shadow-[0_24px_60px_-24px_rgba(0,0,0,0.35)]"
    >
      {/* Image panel */}
      <div
        className={`relative flex items-center justify-center p-6 md:p-10 overflow-hidden ${
          reversed ? "lg:order-2" : "lg:order-1"
        }`}
        style={{
          minHeight: "22rem",
          background:
            "radial-gradient(circle at 50% 0%, rgba(0,0,0,0.06), transparent 60%), linear-gradient(160deg, var(--color-surface-2), #e4e2dc)",
        }}
      >
        {previewNotice && (
          <span className="absolute top-5 left-5 z-10 text-[0.62rem] font-semibold uppercase tracking-wider px-3 py-1 rounded-full bg-[var(--color-surface)]/90 text-muted backdrop-blur-md">
            Aperçu
          </span>
        )}
        {image && (
          <div className="relative w-full h-full min-h-[18rem] flex items-center justify-center">
            <Image
              src={image}
              alt={title}
              fill
              className="object-contain transition-transform duration-700 group-hover:scale-[1.03] drop-shadow-2xl"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        )}
      </div>

      {/* Content panel */}
      <div
        className={`flex flex-col justify-center p-8 md:p-12 ${
          reversed ? "lg:order-1" : "lg:order-2"
        }`}
      >
        <div className="flex items-center gap-3 mb-5">
          <span className="font-display text-2xl font-semibold text-[var(--color-border)] tracking-tight">
            {orderNumber}
          </span>
          <span className="text-[0.7rem] font-semibold uppercase tracking-wider px-3 py-1 rounded-full bg-[var(--color-surface-2)] text-[var(--color-text)]">
            {category}
          </span>
          {period && <span className="text-xs text-muted">{period}</span>}
        </div>

        <h3 className="font-display text-3xl md:text-4xl font-semibold text-[var(--color-text)] tracking-tight leading-tight mb-3">
          {title}
        </h3>

        <p className="text-muted text-sm md:text-base leading-relaxed mb-6 max-w-md">
          {description}
        </p>

        <div className="flex flex-wrap gap-2 mb-8">
          {technologies.slice(0, 6).map((tech) => {
            const logo = getTechLogo(tech);
            return (
              <span
                key={tech}
                className="inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full border border-[var(--color-border)] text-muted"
              >
                {logo && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={logo}
                    alt=""
                    width={14}
                    height={14}
                    aria-hidden
                    style={{ objectFit: "contain" }}
                  />
                )}
                {tech}
              </span>
            );
          })}
        </div>

        <span className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--color-text)]">
          Voir l&apos;étude de cas
          <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-[var(--color-text)] text-[var(--color-bg)] transition-transform duration-300 group-hover:translate-x-1">
            →
          </span>
        </span>
      </div>
    </motion.article>
  );
}
