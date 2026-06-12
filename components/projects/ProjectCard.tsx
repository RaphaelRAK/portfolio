"use client";

import { AnimatePresence, motion, useInView, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export interface ProjectCardProps {
  title: string;
  category: string;
  description: string;
  period?: string;
  images?: string[];
  mediaType?: "mobile" | "web";
  previewNotice?: string;
  accent?: string;
  featured?: boolean;
  index?: number;
  cover?: { title: string; subtitle: string };
}

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];
const SLIDE_MS = 3800;

function CrossfadeImage({ src, alt, sizes, className }: {
  src: string;
  alt: string;
  sizes: string;
  className?: string;
}) {
  return (
    <AnimatePresence mode="popLayout" initial={false}>
      <motion.div
        key={src}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.7, ease: "easeInOut" }}
        className="absolute inset-0"
      >
        <Image src={src} alt={alt} fill className={className} sizes={sizes} />
      </motion.div>
    </AnimatePresence>
  );
}

export default function ProjectCard({
  title,
  category,
  description,
  period,
  images = [],
  mediaType = "web",
  previewNotice,
  accent = "#2e5bff",
  featured = false,
  index = 0,
  cover,
}: ProjectCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const reducedMotion = useReducedMotion();
  const [slide, setSlide] = useState(0);
  const [paused, setPaused] = useState(false);
  const count = images.length;
  const phoneSlots = featured ? 3 : 2;
  const hasCarousel = mediaType === "mobile" ? count > phoneSlots : count > 1;

  useEffect(() => {
    if (!hasCarousel || !inView || paused || reducedMotion) return;
    const timer = setInterval(() => setSlide((s) => s + 1), SLIDE_MS);
    return () => clearInterval(timer);
  }, [hasCarousel, inView, paused, reducedMotion]);

  const dotCount = count;
  const activeDot = count > 0 ? slide % count : 0;

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay: (index % 2) * 0.1, ease: EASE }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      className="group flex h-full flex-col overflow-hidden rounded-[2rem] border border-[var(--color-border)] bg-white shadow-[0_1px_3px_rgba(10,10,20,0.05)] transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_24px_60px_-24px_rgba(10,10,20,0.18)]"
    >
      {/* ── Zone média ── */}
      <div
        className={`relative w-full overflow-hidden ${
          featured ? "aspect-[4/3] sm:aspect-[16/8]" : "aspect-[4/3]"
        }`}
      >
        {previewNotice && (
          <span className="absolute top-4 left-4 z-20 rounded-full bg-black/60 px-3 py-1 text-[0.62rem] font-semibold uppercase tracking-wider text-white backdrop-blur-sm">
            Aperçu
          </span>
        )}

        {count === 0 ? (
          /* Cover stylisée — projets sans captures (outil interne, etc.) */
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-gradient-to-br from-[#101522] to-[#1d2436]">
            {/* Grille décorative */}
            <div
              aria-hidden
              className="absolute inset-0 opacity-[0.13]"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)",
                backgroundSize: "36px 36px",
              }}
            />
            <div
              aria-hidden
              className="absolute inset-0"
              style={{
                background: `radial-gradient(ellipse 60% 50% at 50% 0%, color-mix(in srgb, ${accent} 30%, transparent), transparent 70%)`,
              }}
            />
            <span
              className="relative flex h-16 w-16 items-center justify-center rounded-2xl text-2xl shadow-lg"
              style={{ background: `linear-gradient(to top, ${accent}, color-mix(in srgb, ${accent} 70%, white))` }}
              aria-hidden
            >
              🔒
            </span>
            <div className="relative px-6 text-center">
              <p className="font-display text-lg font-semibold tracking-tight text-white">
                {cover?.title ?? "Aperçu sur demande"}
              </p>
              <p className="mt-1 text-xs text-white/60">
                {cover?.subtitle ?? "Captures non publiques"}
              </p>
            </div>
          </div>
        ) : mediaType === "mobile" ? (
          /* Trio de téléphones qui défilent */
          <div className="absolute inset-0 bg-[#f0f1f3]">
            <div
              aria-hidden
              className="absolute inset-0"
              style={{
                background: `radial-gradient(ellipse 70% 60% at 50% 0%, color-mix(in srgb, ${accent} 7%, transparent), transparent 70%)`,
              }}
            />
            <div className="absolute inset-0 flex items-end justify-center gap-4 px-6 pt-8 md:gap-8 md:px-12">
              {Array.from({ length: Math.min(phoneSlots, count) }, (_, slot) => {
                const imgIndex = (slide + slot) % count;
                const isCenter = slot === Math.floor(phoneSlots / 2) && phoneSlots > 1;
                return (
                  <div
                    key={slot}
                    className={`relative h-[88%] w-[30%] max-w-[230px] transition-transform duration-700 ${
                      isCenter ? "h-[96%] -translate-y-1" : "translate-y-3"
                    }`}
                  >
                    <CrossfadeImage
                      src={images[imgIndex]}
                      alt={`${title} — écran ${imgIndex + 1}`}
                      sizes="(max-width: 768px) 33vw, 230px"
                      className="object-contain object-bottom drop-shadow-xl"
                    />
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          /* Carrousel web — plein cadre, crossfade */
          <div className="absolute inset-0 bg-[#f0f1f3]">
            <CrossfadeImage
              src={images[activeDot]}
              alt={title}
              sizes={featured ? "(max-width: 1024px) 100vw, 75vw" : "(max-width: 768px) 100vw, 50vw"}
              className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.03]"
            />
          </div>
        )}

        {/* Dots du carrousel */}
        {hasCarousel && count > 1 && (
          <div className="absolute bottom-4 left-1/2 z-20 flex -translate-x-1/2 gap-1.5">
            {Array.from({ length: dotCount }, (_, i) => (
              <span
                key={i}
                className="h-1.5 rounded-full transition-all duration-400"
                style={{
                  width: i === activeDot ? "1.25rem" : "0.375rem",
                  background: i === activeDot ? accent : "rgba(10,10,20,0.25)",
                }}
              />
            ))}
          </div>
        )}

        {/* CTA pill au survol — desktop */}
        <div className="absolute inset-0 z-10 hidden items-center justify-center md:flex">
          <span className="inline-flex translate-y-4 items-center gap-3 rounded-full bg-white py-2.5 pl-6 pr-2.5 text-sm font-semibold text-[var(--color-text)] opacity-0 shadow-[0_20px_48px_-12px_rgba(10,10,20,0.35)] transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
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

      {/* ── Contenu ── */}
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
