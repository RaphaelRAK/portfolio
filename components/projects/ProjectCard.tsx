"use client";

import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

export interface ProjectCardProps {
  title: string;
  category: string;
  description: string;
  period?: string;
  image?: string;
  previewNotice?: string;
  accent?: string;
  featured?: boolean;
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
  accent = "#2e5bff",
  featured = false,
  index = 0,
}: ProjectCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay: (index % 2) * 0.1, ease: EASE }}
      style={{ "--card-accent": accent } as React.CSSProperties}
      className="group flex h-full flex-col overflow-hidden rounded-[2rem] border border-[var(--color-border)] bg-white shadow-[0_1px_3px_rgba(10,10,20,0.05)] transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_24px_60px_-24px_rgba(10,10,20,0.18)]"
    >
      {/* Zone média — fond gris sombre neutre, comme les mockups de la référence */}
      <div
        className={`relative w-full overflow-hidden bg-[#f0f1f3] ${
          featured ? "aspect-[16/8]" : "aspect-[4/3]"
        }`}
      >
        {previewNotice && (
          <span className="absolute top-4 left-4 z-10 rounded-full bg-black/60 px-3 py-1 text-[0.62rem] font-semibold uppercase tracking-wider text-white backdrop-blur-sm">
            Aperçu
          </span>
        )}

        {image && (
          <div className="absolute inset-0 flex items-end justify-center px-6 pt-6">
            <Image
              src={image}
              alt={title}
              fill
              className="object-contain object-bottom transition-transform duration-700 ease-out group-hover:scale-[1.04]"
              sizes={featured ? "(max-width: 1024px) 100vw, 75vw" : "(max-width: 768px) 100vw, 50vw"}
            />
          </div>
        )}

        {/* CTA pill au survol — desktop */}
        <div className="absolute inset-0 hidden items-center justify-center md:flex">
          <span
            className="inline-flex translate-y-4 items-center gap-3 rounded-full bg-white py-2.5 pl-6 pr-2.5 text-sm font-semibold text-[var(--color-text)] opacity-0 shadow-[0_20px_48px_-12px_rgba(10,10,20,0.35)] transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100"
          >
            Voir le projet
            <span
              className="inline-flex h-9 w-9 items-center justify-center rounded-full text-sm text-white"
              style={{ background: accent }}
            >
              →
            </span>
          </span>
        </div>
      </div>

      {/* Contenu */}
      <div className="flex flex-1 flex-col px-6 pb-6 pt-5 md:px-7 md:pb-7 md:pt-6">
        <div className="mb-2 flex items-center justify-between gap-3">
          <span
            className="text-[0.68rem] font-bold uppercase tracking-[0.14em]"
            style={{ color: `color-mix(in srgb, ${accent} 85%, black)` }}
          >
            {category}
          </span>
          {period && (
            <span className="shrink-0 text-xs text-[var(--color-text-faint)]">{period}</span>
          )}
        </div>

        <h3 className="font-display text-xl font-semibold tracking-tight text-[var(--color-text)] md:text-2xl">
          {title}
          {/* Flèche visible sur mobile (le hover pill ne s'affiche pas) */}
          <span
            className="ml-2 inline-flex h-6 w-6 translate-y-0.5 items-center justify-center rounded-full text-xs text-white transition-transform duration-300 group-hover:translate-x-0.5 md:hidden"
            style={{ background: accent }}
            aria-hidden
          >
            →
          </span>
        </h3>

        <p className="mt-2 text-sm leading-relaxed text-[var(--color-text-muted)] md:text-[0.9375rem]">
          {description}
        </p>
      </div>
    </motion.article>
  );
}
