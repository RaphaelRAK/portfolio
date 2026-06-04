"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import { getTechLogo } from "@/lib/devicon";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Marquee } from "@/components/ui/Marquee";
import { RevealWords } from "@/components/ui/Reveal";

const categories = [
  {
    label: "Frontend",
    techs: [
      { name: "React Native", level: "Expert" },
      { name: "Next.js", level: "Expert" },
      { name: "TypeScript", level: "Expert" },
      { name: "Tailwind CSS", level: "Expert" },
    ],
  },
  {
    label: "Backend",
    techs: [
      { name: "NestJS", level: "Expert" },
      { name: "PostgreSQL", level: "Intermédiaire" },
      { name: "Supabase", level: "Expert" },
      { name: "Python", level: "Intermédiaire" },
    ],
  },
  {
    label: "DevOps",
    techs: [
      { name: "Docker", level: "Avancé" },
      { name: "Nginx", level: "Intermédiaire" },
      { name: "Scaleway", level: "Avancé" },
    ],
  },
  {
    label: "Outils",
    techs: [
      { name: "Stripe", level: "Avancé" },
      { name: "Firebase/FCM", level: "Avancé" },
      { name: "n8n", level: "Avancé" },
    ],
  },
];

const strengths = [
  "Code maintenable",
  "Pensée système",
  "Dev-friendly",
  "Process clair",
  "Livraison rapide",
  "Handoff propre",
];

const pipeline = ["React Native", "Next.js", "NestJS", "PostgreSQL", "Docker"];

export default function Stack() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const displayed = activeCategory
    ? categories.filter((category) => category.label === activeCategory)
    : categories;

  return (
    <section id="stack" ref={ref} className="py-[var(--section-padding)]">
      <div className="container-hanzo">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-[var(--section-header-gap)]"
        >
          <SectionLabel>Stack</SectionLabel>
          <h2 className="heading-lg font-display text-[var(--color-text)] mt-[var(--section-label-gap)]">
            <RevealWords text="Ce que je maîtrise en production" />
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1 }}
          className="card-hanzo p-6 md:p-8 mb-10 flex flex-wrap items-center justify-center gap-3 md:gap-6"
        >
          {pipeline.map((node, index) => (
            <span key={node} className="inline-flex items-center gap-3">
              <span className="text-sm font-medium text-[var(--color-text)]">{node}</span>
              {index < pipeline.length - 1 && (
                <span className="text-muted hidden md:inline">→</span>
              )}
            </span>
          ))}
        </motion.div>

        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {[null, ...categories.map((category) => category.label)].map((category) => (
            <button
              key={category ?? "all"}
              type="button"
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 text-sm rounded-full border transition-all cursor-pointer ${
                activeCategory === category
                  ? "bg-[var(--color-text)] text-[var(--color-bg)] border-[var(--color-text)]"
                  : "bg-transparent text-muted border-[var(--color-border)] hover:border-[var(--color-text)]"
              }`}
            >
              {category ?? "Tout"}
            </button>
          ))}
        </div>

        <div className="space-y-8 max-w-3xl mx-auto">
          <AnimatePresence mode="popLayout">
            {displayed.map((category) => (
              <motion.div
                key={category.label}
                layout
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="card-hanzo p-6 md:p-8"
              >
                <p className="text-xs uppercase tracking-widest text-muted mb-4">{category.label}</p>
                <div className="flex flex-wrap gap-2">
                  {category.techs.map((tech) => (
                    <TechPill key={tech.name} name={tech.name} level={tech.level} />
                  ))}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      <div className="mt-14 border-t border-[var(--color-border)] pt-8">
        <Marquee>
          {strengths.map((strength) => (
            <span key={strength} className="font-display text-xl text-[var(--color-text)] opacity-80">
              {strength}
            </span>
          ))}
        </Marquee>
      </div>
    </section>
  );
}

function TechPill({ name, level }: { name: string; level: string }) {
  const logo = getTechLogo(name);
  return (
    <span className="inline-flex items-center gap-2 px-3 py-2 text-sm rounded-full border border-[var(--color-border)] bg-[var(--color-bg)]">
      {logo && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={logo} alt="" width={14} height={14} aria-hidden style={{ objectFit: "contain" }} />
      )}
      <span className="text-[var(--color-text)]">{name}</span>
      <span className="text-xs text-muted">· {level}</span>
    </span>
  );
}
