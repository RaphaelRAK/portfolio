"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { SectionHeader } from "@/components/ui/SectionHeader";

const steps = [
  {
    number: "01",
    title: "Comprendre",
    description:
      "Analyse du besoin, du contexte métier et des contraintes techniques avant d'écrire la première ligne.",
    accent: "rgba(22, 163, 74, 0.12)",
  },
  {
    number: "02",
    title: "Construire",
    description:
      "Développement itératif — mobile React Native, web Next.js, API NestJS — avec des livrables testables.",
    accent: "rgba(0, 0, 0, 0.04)",
  },
  {
    number: "03",
    title: "Déployer",
    description:
      "Mise en production, monitoring, Docker, CI — des produits qui tournent, pas des démos.",
    accent: "rgba(0, 0, 0, 0.06)",
  },
];

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

export default function Process() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="py-[var(--section-padding)]">
      <div className="container-hanzo">
        <SectionHeader label="Mon processus" title="Comment je travaille" />

        <div className="relative">
          {/* Connecting line — desktop only */}
          <div
            className="hidden md:block absolute top-[2.75rem] left-[calc(16.67%+1.75rem)] right-[calc(16.67%+1.75rem)] h-px"
            style={{
              background:
                "repeating-linear-gradient(to right, var(--color-border) 0, var(--color-border) 6px, transparent 6px, transparent 14px)",
            }}
            aria-hidden
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6 lg:gap-10">
            {steps.map((step, index) => (
              <motion.article
                key={step.number}
                initial={{ opacity: 0, y: 28 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.1 + index * 0.12, ease: EASE }}
                className="group relative flex flex-col items-center md:items-start text-center md:text-left"
              >
                {/* Step dot on timeline */}
                <div className="relative z-10 mb-8 flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[var(--color-text)] text-[var(--color-bg)] font-display text-sm font-semibold tracking-tight transition-transform duration-300 group-hover:scale-110">
                  {step.number}
                </div>

                <div
                  className="card-hanzo relative w-full overflow-hidden p-8 md:p-9 transition-transform duration-500 group-hover:-translate-y-1"
                  style={{ background: `linear-gradient(145deg, var(--color-surface) 60%, ${step.accent})` }}
                >
                  {/* Ghost number */}
                  <span
                    className="pointer-events-none absolute -right-2 -top-4 select-none font-display text-[7rem] font-semibold leading-none text-[var(--color-text)] opacity-[0.04] transition-opacity duration-500 group-hover:opacity-[0.07]"
                    aria-hidden
                  >
                    {step.number}
                  </span>

                  <h3 className="relative font-display text-2xl md:text-[1.65rem] font-semibold tracking-tight text-[var(--color-text)]">
                    {step.title}
                  </h3>
                  <p className="relative mt-3 text-sm leading-relaxed text-muted md:text-[0.9375rem]">
                    {step.description}
                  </p>

                  <div className="relative mt-6 h-px w-10 bg-[var(--color-border)] transition-all duration-500 group-hover:w-16 group-hover:bg-[var(--color-text)]" />
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
