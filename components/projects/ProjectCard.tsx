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
  accent?: string;
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
  accent = "#2e5bff",
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
      style={
        {
          "--card-accent": accent,
          border: "1px solid color-mix(in srgb, var(--card-accent) 18%, rgba(10,10,20,0.06))",
        } as React.CSSProperties
      }
      className="group relative grid grid-cols-1 overflow-hidden rounded-[var(--radius-card)] bg-[var(--color-surface)] shadow-[0_1px_2px_rgba(10,10,20,0.04),0_16px_40px_-24px_rgba(10,10,20,0.12)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_2px_4px_rgba(10,10,20,0.04),0_32px_64px_-24px_color-mix(in_srgb,var(--card-accent)_35%,transparent)] lg:grid-cols-2"
    >
      {/* Liseré accent en haut de carte */}
      <div
        className="absolute inset-x-0 top-0 z-10 h-1"
        style={{
          background: `linear-gradient(90deg, transparent, ${accent}, transparent)`,
          opacity: 0.85,
        }}
      />

      {/* Panneau image */}
      <div
        className={`relative flex items-center justify-center overflow-hidden p-6 md:p-10 ${
          reversed ? "lg:order-2" : "lg:order-1"
        }`}
        style={{
          minHeight: "22rem",
          background: `radial-gradient(circle at ${reversed ? "85%" : "15%"} 0%, color-mix(in srgb, ${accent} 26%, white), transparent 65%), linear-gradient(160deg, color-mix(in srgb, ${accent} 10%, white), color-mix(in srgb, ${accent} 20%, white))`,
        }}
      >
        {/* Numéro filigrane */}
        <span
          aria-hidden
          className="pointer-events-none absolute -bottom-8 right-2 select-none font-display text-[11rem] font-bold leading-none tracking-tighter"
          style={{ color: `color-mix(in srgb, ${accent} 16%, transparent)` }}
        >
          {orderNumber}
        </span>

        {previewNotice && (
          <span className="absolute top-5 left-5 z-10 rounded-full bg-white/85 px-3 py-1 text-[0.62rem] font-semibold uppercase tracking-wider text-muted backdrop-blur-md">
            Aperçu
          </span>
        )}
        {image && (
          <div className="relative flex h-full min-h-[18rem] w-full items-center justify-center">
            <Image
              src={image}
              alt={title}
              fill
              className="object-contain drop-shadow-2xl transition-transform duration-700 group-hover:scale-[1.04] group-hover:-rotate-1"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        )}
      </div>

      {/* Panneau contenu */}
      <div
        className={`flex flex-col justify-center p-8 md:p-12 ${
          reversed ? "lg:order-1" : "lg:order-2"
        }`}
      >
        <div className="mb-5 flex items-center gap-3">
          <span
            className="font-display text-2xl font-bold tracking-tight"
            style={{ color: accent }}
          >
            {orderNumber}
          </span>
          <span
            className="rounded-full px-3 py-1 text-[0.7rem] font-semibold uppercase tracking-wider"
            style={{
              color: `color-mix(in srgb, ${accent} 85%, black)`,
              background: `color-mix(in srgb, ${accent} 12%, white)`,
              border: `1px solid color-mix(in srgb, ${accent} 25%, transparent)`,
            }}
          >
            {category}
          </span>
          {period && <span className="text-xs text-muted">{period}</span>}
        </div>

        <h3 className="mb-3 font-display text-3xl font-semibold leading-tight tracking-tight text-[var(--color-text)] md:text-4xl">
          {title}
        </h3>

        <p className="mb-6 max-w-md text-sm leading-relaxed text-muted md:text-base">
          {description}
        </p>

        <div className="mb-8 flex flex-wrap gap-2">
          {technologies.slice(0, 6).map((tech) => {
            const logo = getTechLogo(tech);
            return (
              <span
                key={tech}
                className="inline-flex items-center gap-1.5 rounded-full border border-[var(--color-border)] bg-[var(--color-bg-light)] px-2.5 py-1 text-xs font-medium text-muted transition-colors duration-300 group-hover:border-[color-mix(in_srgb,var(--card-accent)_35%,transparent)]"
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

        <span
          className="inline-flex items-center gap-2 text-sm font-semibold"
          style={{ color: `color-mix(in srgb, ${accent} 85%, black)` }}
        >
          Voir l&apos;étude de cas
          <span
            className="inline-flex h-8 w-8 items-center justify-center rounded-full text-white transition-transform duration-300 group-hover:translate-x-1"
            style={{
              background: `linear-gradient(to top, ${accent}, color-mix(in srgb, ${accent} 75%, white))`,
              boxShadow: `0 6px 16px -6px color-mix(in srgb, ${accent} 70%, transparent)`,
            }}
          >
            →
          </span>
        </span>
      </div>
    </motion.article>
  );
}
