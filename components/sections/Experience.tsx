"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal, RevealWords } from "@/components/ui/Reveal";
import { TechTag } from "@/components/ui/TechTag";

type ItemKind = "study" | "dev" | "job";

type TimelineItem = {
  period: string;
  title: string;
  place: string;
  description?: string;
  stack?: string[];
  kind: ItemKind;
  tag: string;
};

type TimelineRow = {
  year: string;
  left: TimelineItem[];
  right: TimelineItem[];
};

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

const kindStyle: Record<ItemKind, { dot: string; pillBg: string; pillText: string }> = {
  study: { dot: "#6366f1", pillBg: "#eef2ff", pillText: "#3730a3" },
  dev: { dot: "#000000", pillBg: "#000000", pillText: "#ffffff" },
  job: { dot: "#16a34a", pillBg: "#e8f5e9", pillText: "#166534" },
};

const plumRoles = [
  {
    period: "Oct. 2025 — Présent",
    role: "Développeur Fullstack",
    tag: "CDI",
    description:
      "Évolution naturelle après le Master 2. Prise en charge du front React Native et Next.js en plus du backend.",
    stack: ["React Native", "Next.js", "NestJS", "TypeScript"],
  },
  {
    period: "Sept. 2024 — Oct. 2025",
    role: "Développeur Backend",
    tag: "Alternance",
    description:
      "Architecture NestJS, REST API, PostgreSQL/Supabase, Docker, Mailjet, n8n.",
    stack: ["NestJS", "TypeScript", "PostgreSQL", "Docker"],
  },
];

const timelineRows: TimelineRow[] = [
  {
    year: "2024 — 2025",
    left: [
      {
        period: "2025 · Mention Bien",
        title: "Master 2 Informatique",
        place: "Université de La Réunion",
        kind: "study",
        tag: "Diplôme",
      },
      {
        period: "Jan. — Juin 2024",
        title: "Développeur TER",
        place: "LIM · Université de La Réunion",
        description:
          "Suivi d'activité étudiants sur serveurs TP — Bash, PostgreSQL, dashboards Dash/Python.",
        stack: ["Python", "Dash", "Bash", "PostgreSQL"],
        kind: "dev",
        tag: "Recherche",
      },
    ],
    right: [
      {
        period: "Avr. 2024 — présent",
        title: "Cuisinier",
        place: "Shiso Burger Saint-Denis",
        kind: "job",
        tag: "Job étudiant",
      },
    ],
  },
  {
    year: "2022 — 2023",
    left: [
      {
        period: "2023 · Mention Bien",
        title: "Licence Informatique",
        place: "Université de La Réunion",
        kind: "study",
        tag: "Diplôme",
      },
      {
        period: "Sept. — Déc. 2023",
        title: "Développeur TER",
        place: "LIM · Université de La Réunion",
        description: "Mise à jour du prototype Maïdo VR — refactorisation, WebXR.",
        stack: ["JavaScript", "WebXR"],
        kind: "dev",
        tag: "Recherche",
      },
    ],
    right: [
      {
        period: "Oct. 2022 — Août 2023",
        title: "Employé de restaurant",
        place: "Restaurant universitaire",
        kind: "job",
        tag: "Job étudiant",
      },
    ],
  },
  {
    year: "2021 — 2022",
    left: [
      {
        period: "2021 · Mention Bien",
        title: "Commerce électronique & e-business",
        place: "CNFDI",
        kind: "study",
        tag: "Certif.",
      },
      {
        period: "Déc. 2022 — Jan. 2023",
        title: "Développeur Web Stagiaire",
        place: "ESIGE · Madagascar",
        description: "Plateforme de gestion universitaire — cours en ligne, examens. Laravel full-stack.",
        stack: ["Laravel", "PHP", "MySQL"],
        kind: "dev",
        tag: "Stage",
      },
    ],
    right: [
      {
        period: "Juin — Oct. 2022",
        title: "Cuisinier intérimaire",
        place: "SHISO Burger Sainte-Marie",
        kind: "job",
        tag: "Job étudiant",
      },
      {
        period: "Avr. — Juin 2022",
        title: "Inventoriste",
        place: "IVALIS",
        kind: "job",
        tag: "Job étudiant",
      },
      {
        period: "2021 — 2022",
        title: "Caissier — Service Civique",
        place: "Solidarité étudiante",
        kind: "job",
        tag: "Job étudiant",
      },
    ],
  },
  {
    year: "2017 — 2020",
    left: [
      {
        period: "2017 · Mention Bien",
        title: "Baccalauréat Scientifique Série C",
        place: "Lycée Notre Dame · Majunga, Madagascar",
        kind: "study",
        tag: "Diplôme",
      },
    ],
    right: [
      {
        period: "2019 — 2020",
        title: "Employé polyvalent",
        place: "Burger King Chaudron",
        kind: "job",
        tag: "Job étudiant",
      },
    ],
  },
];

const languages = [
  { lang: "Français", level: "Courant" },
  { lang: "Anglais", level: "Professionnel" },
  { lang: "Malagasy", level: "Courant" },
];

function ItemCard({ item, align = "left" }: { item: TimelineItem; align?: "left" | "right" }) {
  const style = kindStyle[item.kind];
  return (
    <div className={`card-hanzo p-5 ${align === "right" ? "lg:text-right" : ""}`}>
      <div className={`flex flex-wrap items-center gap-2 mb-2 ${align === "right" ? "lg:justify-end" : ""}`}>
        <span
          className="text-[0.68rem] font-semibold px-2.5 py-0.5 rounded-full"
          style={{ backgroundColor: style.pillBg, color: style.pillText }}
        >
          {item.tag}
        </span>
        <span className="text-xs text-muted">{item.period}</span>
      </div>
      <h4 className="font-display text-lg font-semibold text-[var(--color-text)] tracking-tight leading-tight">
        {item.title}
      </h4>
      <p className="text-sm text-muted mt-0.5">{item.place}</p>
      {item.description && (
        <p className="text-sm text-muted mt-3 leading-relaxed">{item.description}</p>
      )}
      {item.stack && (
        <div className={`flex flex-wrap gap-2 mt-4 ${align === "right" ? "lg:justify-end" : ""}`}>
          {item.stack.map((tech) => (
            <TechTag key={tech} name={tech} variant="compact" />
          ))}
        </div>
      )}
    </div>
  );
}

export default function Experience() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="experience" ref={ref} className="py-[var(--section-padding)]">
      <div className="container-hanzo">
        <div className="text-center mb-[var(--section-header-gap)]">
          <Reveal>
            <SectionLabel>Parcours</SectionLabel>
          </Reveal>
          <h2 className="heading-lg font-display text-[var(--color-text)] mt-[var(--section-label-gap)]">
            <RevealWords text="Cinq ans de double vie" />
          </h2>
          <Reveal delay={0.15}>
            <p className="mt-5 text-muted text-base max-w-2xl mx-auto leading-relaxed">
              Pendant que j&apos;étudiais à l&apos;université, je travaillais en parallèle en
              restauration pour financer mes études. À gauche les diplômes et le code, à droite
              les jobs étudiants — sur les mêmes années.
            </p>
          </Reveal>

          <Reveal delay={0.25}>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              {(["study", "dev", "job"] as ItemKind[]).map((kind) => {
                const labels = { study: "Études", dev: "Code / Stage", job: "Job étudiant" };
                const style = kindStyle[kind];
                return (
                  <span
                    key={kind}
                    className="inline-flex items-center gap-2 text-sm px-3 py-1 rounded-full"
                    style={{ backgroundColor: style.pillBg, color: style.pillText }}
                  >
                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: style.dot }} />
                    {labels[kind]}
                  </span>
                );
              })}
            </div>
          </Reveal>
        </div>

        {/* plüm — featured */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: EASE }}
          className="card-hanzo p-8 mb-16 max-w-3xl mx-auto"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="w-2.5 h-2.5 rounded-full bg-[var(--color-accent)]" />
            <p className="font-display text-2xl font-semibold tracking-tight">plüm</p>
            <span className="text-sm text-muted">— aujourd&apos;hui</span>
          </div>
          <div className="space-y-6">
            {plumRoles.map((role, index) => (
              <motion.div
                key={role.period}
                initial={{ opacity: 0, y: 12 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.15 + index * 0.1 }}
                className={index > 0 ? "pt-6 border-t border-[var(--color-border)]" : ""}
              >
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <span className="text-[0.68rem] font-semibold px-2.5 py-0.5 rounded-full bg-black text-white">
                    {role.tag}
                  </span>
                  <span className="text-xs text-muted">{role.period}</span>
                </div>
                <h3 className="font-display text-xl font-semibold text-[var(--color-text)] tracking-tight">
                  {role.role}
                </h3>
                <p className="text-sm text-muted mt-2 leading-relaxed">{role.description}</p>
                <div className="flex flex-wrap gap-2 mt-4">
                  {role.stack.map((tech) => (
                    <TechTag key={tech} name={tech} variant="compact" />
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Parallel timeline */}
        <div className="relative">
          {/* Column headers */}
          <div className="hidden lg:grid grid-cols-2 gap-16 mb-4">
            <p className="text-right text-sm font-medium text-muted">Études &amp; développement</p>
            <p className="text-sm font-medium text-muted">En parallèle — jobs étudiants</p>
          </div>

          {/* Center line */}
          <span className="hidden lg:block absolute top-12 bottom-0 left-1/2 w-px bg-[var(--color-border)]" />

          <div className="space-y-4">
            {timelineRows.map((row, rowIndex) => (
              <div key={row.year} className="relative">
                {/* Year marker */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.4, delay: rowIndex * 0.1 }}
                  className="flex lg:justify-center mb-4 lg:mb-6"
                >
                  <span className="badge-open before:!hidden text-sm px-4 py-1.5 shadow-sm relative z-10">
                    {row.year}
                  </span>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-16">
                  <div className="flex flex-col gap-4 lg:items-end">
                    {row.left.length > 0 ? (
                      row.left.map((item, index) => (
                        <motion.div
                          key={item.title}
                          initial={{ opacity: 0, x: -24 }}
                          animate={inView ? { opacity: 1, x: 0 } : {}}
                          transition={{ duration: 0.5, delay: rowIndex * 0.1 + index * 0.08, ease: EASE }}
                          className="w-full"
                        >
                          <ItemCard item={item} align="right" />
                        </motion.div>
                      ))
                    ) : (
                      <span className="hidden lg:block text-muted text-sm pt-4">—</span>
                    )}
                  </div>

                  <div className="flex flex-col gap-4">
                    {row.right.map((item, index) => (
                      <motion.div
                        key={item.title}
                        initial={{ opacity: 0, x: 24 }}
                        animate={inView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.5, delay: rowIndex * 0.1 + index * 0.08, ease: EASE }}
                      >
                        <ItemCard item={item} align="left" />
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Languages */}
        <Reveal delay={0.1}>
          <div className="card-hanzo p-8 mt-16 max-w-3xl mx-auto">
            <p className="text-sm text-muted mb-6">Langues</p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {languages.map((language) => (
                <div key={language.lang} className="flex items-baseline justify-between gap-3">
                  <span className="font-display text-lg font-semibold tracking-tight">
                    {language.lang}
                  </span>
                  <span className="text-sm text-muted">{language.level}</span>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
