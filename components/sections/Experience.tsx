"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { jobsAlimentaires } from "@/lib/jobs";
import { TechTag } from "@/components/ui/TechTag";

// ─── Badge categories ────────────────────────────────────────────────────────

type BadgeCat = "enterprise" | "university" | "food";

const badgeStyle: Record<BadgeCat, { bg: string; border: string; text: string; dot: string }> = {
  enterprise: { bg: "#FFF7ED", border: "#F97316", text: "#9A3412",  dot: "#F97316" },
  university: { bg: "#EEF2FF", border: "#6366F1", text: "#3730A3",  dot: "#6366F1" },
  food:       { bg: "#F0FDF4", border: "#22C55E", text: "#14532D",  dot: "#22C55E" },
};

function catFromType(type: string): BadgeCat {
  if (type === "Stage" || type.startsWith("CDI")) return "enterprise";
  if (type === "Recherche") return "university";
  return "food";
}

// ─── Type badge ───────────────────────────────────────────────────────────────

function TypeBadge({ type }: { type: string }) {
  const cat = catFromType(type);
  const s = badgeStyle[cat];
  return (
    <span
      className="font-mono text-[0.55rem] tracking-widest uppercase px-2 py-0.5"
      style={{ backgroundColor: s.bg, border: `1px solid ${s.border}`, color: s.text, borderRadius: 4 }}
    >
      {type}
    </span>
  );
}

// ─── Data ─────────────────────────────────────────────────────────────────────

type SubRole = { period: string; role: string; type: string; desc: string; stack: string[] };
type CareerSingle = { period: string; role: string; company: string; type: string; desc: string; stack: string[] };
type CareerEvolution = { company: string; roles: SubRole[] };

const plumItem: CareerEvolution = {
  company: "plüm",
  roles: [
    {
      period: "Oct. 2025 — Présent",
      role: "Développeur Fullstack",
      type: "CDI",
      desc: "Évolution naturelle après l'obtention du Master 2. Prise en charge du front React Native et Next.js en plus du backend.",
      stack: ["React Native", "Next.js", "NestJS", "TypeScript"],
    },
    {
      period: "Sept. 2024 — Oct. 2025",
      role: "Développeur Backend",
      type: "CDI · Alternance",
      desc: "Architecture NestJS, REST API, PostgreSQL/Supabase, Docker, Mailjet, n8n.",
      stack: ["NestJS", "TypeScript", "PostgreSQL", "Docker"],
    },
  ],
};

// Rows ordered newest → oldest, paired with corresponding food jobs
const timelineRows: Array<{
  period: string;
  code?: CareerSingle;
  food: typeof jobsAlimentaires;
}> = [
  {
    period: "2024",
    code: {
      period: "Jan. — Juin 2024",
      role: "Développeur TER",
      company: "LIM · Université de La Réunion",
      type: "Recherche",
      desc: "Service de suivi d'activité étudiants sur serveurs TP. Scripts Bash, PostgreSQL, dashboards Dash/Python.",
      stack: ["Python", "Dash", "Bash", "PostgreSQL"],
    },
    food: [jobsAlimentaires[5]], // Shiso Saint-Denis Avr. 2024–présent
  },
  {
    period: "2022 — 2023",
    code: {
      period: "Sept. — Déc. 2023",
      role: "Développeur TER",
      company: "LIM · Université de La Réunion",
      type: "Recherche",
      desc: "Mise à jour du prototype Maïdo VR. Refactorisation, nouvelles fonctionnalités, WebXR.",
      stack: ["JavaScript", "WebXR"],
    },
    food: [jobsAlimentaires[4]], // Restaurant universitaire Oct. 2022–Août 2023
  },
  {
    period: "2022",
    code: {
      period: "Déc. 2022 — Jan. 2023",
      role: "Développeur Web Stagiaire",
      company: "ESIGE · Madagascar",
      type: "Stage",
      desc: "Application web de gestion universitaire — cours en ligne, examens. Laravel full-stack.",
      stack: ["Laravel", "PHP", "MySQL"],
    },
    food: [jobsAlimentaires[3], jobsAlimentaires[2]], // SHISO Ste-Marie + IVALIS
  },
  {
    period: "2021 — 2022",
    code: undefined,
    food: [jobsAlimentaires[1]], // Service Civique
  },
  {
    period: "2019 — 2020",
    code: undefined,
    food: [jobsAlimentaires[0]], // Burger King
  },
];

const education = [
  { degree: "Master 2 Informatique",              school: "Université de La Réunion",            period: "2025", mention: "Mention Bien" },
  { degree: "Licence Informatique",               school: "Université de La Réunion",            period: "2023", mention: "Mention Bien" },
  { degree: "Commerce électronique & e-business", school: "CNFDI",                               period: "2021", mention: "Mention Bien" },
  { degree: "Baccalauréat Scientifique Série C",  school: "Lycée Notre Dame · Majunga, Madagascar", period: "2017", mention: "Mention Bien" },
];

// ─── Plüm card (evolution / full-width) ──────────────────────────────────────

function PlumCard({ inView }: { inView: boolean }) {
  const dot = badgeStyle.enterprise.dot;
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: 0.15 }}
      className="relative pl-5"
      style={{ borderLeft: `2px solid var(--color-border)` }}
    >
      <span
        className="absolute -left-[5px] top-2 block w-2.5 h-2.5 rounded-full"
        style={{ backgroundColor: dot, border: "2px solid var(--color-bg)", boxShadow: `0 0 0 3px ${dot}33` }}
      />
      <p className="font-mono text-[0.6rem] tracking-wide mb-3" style={{ color: "var(--color-text-muted)" }}>
        {plumItem.company}
      </p>
      <div style={{ border: "1px solid var(--color-border)", backgroundColor: "var(--color-surface)" }}>
        {plumItem.roles.map((role, ri) => (
          <div key={ri} className="p-4" style={ri > 0 ? { borderTop: "1px dashed #D4D0C8" } : {}}>
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <span className="font-mono text-[0.58rem] tracking-widest uppercase" style={{ color: "var(--color-text-muted)" }}>
                {role.period}
              </span>
              <TypeBadge type={role.type} />
            </div>
            <h3 className="font-display font-normal text-base mb-2" style={{ color: "var(--color-text)" }}>
              {role.role}
            </h3>
            <p className="text-xs leading-relaxed mb-3" style={{ color: "var(--color-text-muted)" }}>
              {role.desc}
            </p>
            <div className="flex flex-wrap gap-2">
              {role.stack.map(s => <TechTag key={s} name={s} />)}
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

// ─── Single code card ─────────────────────────────────────────────────────────

function CodeCard({ item, delay, inView }: { item: CareerSingle; delay: number; inView: boolean }) {
  const cat = catFromType(item.type);
  const dot = badgeStyle[cat].dot;
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.45, delay }}
      className="relative pl-5 h-full"
      style={{ borderLeft: `2px solid var(--color-border)` }}
    >
      <span
        className="absolute -left-[5px] top-2 block w-2.5 h-2.5 rounded-full"
        style={{ backgroundColor: dot, border: "2px solid var(--color-bg)" }}
      />
      <div className="flex flex-wrap items-center gap-2 mb-1">
        <span className="font-mono text-[0.58rem] tracking-widest uppercase" style={{ color: "var(--color-text-muted)" }}>
          {item.period}
        </span>
        <TypeBadge type={item.type} />
      </div>
      <h3 className="font-display font-normal text-base mb-0.5" style={{ color: "var(--color-text)" }}>
        {item.role}
      </h3>
      <p className="font-mono text-[0.6rem] tracking-wide mb-2" style={{ color: "var(--color-text-muted)" }}>
        {item.company}
      </p>
      <p className="text-xs leading-relaxed mb-3" style={{ color: "var(--color-text-muted)" }}>
        {item.desc}
      </p>
      <div className="flex flex-wrap gap-2">
        {item.stack.map(s => <TechTag key={s} name={s} />)}
      </div>
    </motion.div>
  );
}

// ─── Food job item ────────────────────────────────────────────────────────────

function FoodItem({ job, delay, inView }: { job: typeof jobsAlimentaires[0]; delay: number; inView: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.4, delay }}
      className="relative pl-5"
      style={{ borderLeft: `2px solid var(--color-border)` }}
    >
      <span
        className="absolute -left-[5px] top-1.5 block w-2.5 h-2.5 rounded-full"
        style={{ backgroundColor: badgeStyle.food.dot, border: "2px solid var(--color-bg)" }}
      />
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="font-display text-sm font-normal mb-0.5" style={{ color: "var(--color-text)" }}>
            {job.role}
          </p>
          <p className="font-mono text-[0.6rem] tracking-wide" style={{ color: "var(--color-text-muted)" }}>
            {job.company}
          </p>
        </div>
        <TypeBadge type="Emploi" />
      </div>
      <p className="font-mono text-[0.58rem] tracking-widest mt-1.5" style={{ color: "var(--color-text-muted)" }}>
        {job.period}
      </p>
    </motion.div>
  );
}

// ─── Main section ─────────────────────────────────────────────────────────────

export default function Experience() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="experience" ref={ref} className="py-24 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <span className="section-label block mb-3">Parcours</span>
          <h2
            className="font-display font-light leading-tight"
            style={{ fontSize: "clamp(2.5rem, 5vw, 4.5rem)", color: "var(--color-text)" }}
          >
            La vraie histoire
          </h2>
          <p className="mt-4 text-sm max-w-lg" style={{ color: "var(--color-text-muted)" }}>
            5 ans à construire une compétence le soir après le boulot. Ci-dessous, les deux lignes de vie en parallèle.
          </p>
          {/* Legend */}
          <div className="mt-6 flex flex-wrap gap-3">
            {(["enterprise", "university", "food"] as BadgeCat[]).map(cat => {
              const s = badgeStyle[cat];
              const label = cat === "enterprise" ? "Entreprise / Stage" : cat === "university" ? "Université / Recherche" : "Emploi alimentaire";
              return (
                <span key={cat} className="inline-flex items-center gap-1.5 font-mono text-[0.58rem] tracking-widest uppercase px-2.5 py-1"
                  style={{ backgroundColor: s.bg, border: `1px solid ${s.border}`, color: s.text, borderRadius: 4 }}>
                  <span className="block w-1.5 h-1.5 rounded-full" style={{ backgroundColor: s.dot }} />
                  {label}
                </span>
              );
            })}
          </div>
        </motion.div>

        {/* ── PLÜM — centré, full-width ──────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, delay: 0.1 }}
          className="max-w-2xl mx-auto mb-12"
        >
          <PlumCard inView={inView} />
        </motion.div>

        {/* ── TIMELINE — deux colonnes avec lignes de dates correspondantes ── */}
        <div className="mb-20">

          {/* Column headers */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 mb-0">
            <motion.div
              initial={{ opacity: 0, x: -12 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="lg:pr-12 pb-4"
              style={{ borderRight: "1px solid var(--color-border)", borderBottom: "1px solid var(--color-border)" }}
            >
              <div className="flex items-center gap-3">
                <span className="section-label" style={{ color: "var(--color-accent)" }}>Le code</span>
                <span className="font-mono text-[0.6rem] tracking-widest" style={{ color: "var(--color-text-muted)" }}>
                  — formations & expériences
                </span>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 12 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.25 }}
              className="lg:pl-12 pb-4 mt-4 lg:mt-0"
              style={{ borderBottom: "1px solid var(--color-border)" }}
            >
              <div className="flex items-center gap-3">
                <span className="section-label" style={{ color: "var(--color-text-muted)" }}>En parallèle</span>
                <span className="font-mono text-[0.6rem] tracking-widest" style={{ color: "var(--color-text-muted)" }}>
                  — emplois alimentaires
                </span>
              </div>
            </motion.div>
          </div>

          {/* Paired rows */}
          {timelineRows.map((row, ri) => (
            <div key={ri}>
              {/* Period marker — spans both columns */}
              <div
                className="grid grid-cols-1 lg:grid-cols-2 gap-0"
              >
                <div
                  className="lg:pr-12 pt-5 pb-3"
                  style={{ borderRight: "1px solid var(--color-border)" }}
                >
                  <span
                    className="font-mono text-[0.52rem] tracking-widest uppercase inline-flex items-center gap-2"
                    style={{ color: "var(--color-text-muted)", opacity: 0.6 }}
                  >
                    <span className="block flex-1 h-px" style={{ backgroundColor: "var(--color-border)", maxWidth: 24 }} />
                    {row.period}
                    <span className="block flex-1 h-px" style={{ backgroundColor: "var(--color-border)", maxWidth: 24 }} />
                  </span>
                </div>
                <div className="lg:pl-12 pt-5 pb-3 hidden lg:block">
                  <span
                    className="font-mono text-[0.52rem] tracking-widest uppercase inline-flex items-center gap-2"
                    style={{ color: "var(--color-text-muted)", opacity: 0.6 }}
                  >
                    <span className="block h-px" style={{ backgroundColor: "var(--color-border)", width: 24 }} />
                    {row.period}
                  </span>
                </div>
              </div>

              {/* Items row */}
              <div
                className="grid grid-cols-1 lg:grid-cols-2 gap-0 pb-8"
                style={ri < timelineRows.length - 1 ? {} : {}}
              >
                {/* Code side */}
                <div className="lg:pr-12" style={{ borderRight: "1px solid var(--color-border)" }}>
                  {row.code ? (
                    <CodeCard item={row.code} delay={0.3 + ri * 0.08} inView={inView} />
                  ) : (
                    <div className="h-full flex items-center">
                      <span
                        className="font-mono text-[0.55rem] tracking-widest italic"
                        style={{ color: "var(--color-border)" }}
                      >
                        —
                      </span>
                    </div>
                  )}
                </div>

                {/* Food side */}
                <div className="lg:pl-12 mt-4 lg:mt-0 space-y-5">
                  {row.food.map((job, ji) => (
                    <FoodItem key={ji} job={job} delay={0.35 + ri * 0.08 + ji * 0.05} inView={inView} />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ── FORMATION + STATS ─────────────────────────────────────────────── */}
        <div
          className="grid grid-cols-1 lg:grid-cols-2 gap-0 pt-0"
          style={{ borderTop: "1px solid var(--color-border)" }}
        >
          {/* Left — Education */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.7 }}
            className="lg:pr-12 pt-10"
            style={{ borderRight: "1px solid var(--color-border)" }}
          >
            <p className="section-label mb-5" style={{ color: "var(--color-accent)" }}>Formation</p>
            <div className="space-y-5">
              {education.map((edu, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 8 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.75 + i * 0.08 }}
                  className="flex items-start justify-between gap-4"
                >
                  <div>
                    <p className="font-display text-sm font-normal" style={{ color: "var(--color-text)" }}>
                      {edu.degree}
                    </p>
                    <p className="font-mono text-[0.58rem] tracking-wide mt-0.5" style={{ color: "var(--color-text-muted)" }}>
                      {edu.school}
                    </p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="font-mono text-[0.58rem] tracking-wide" style={{ color: "var(--color-text-muted)" }}>
                      {edu.period}
                    </p>
                    <p className="font-mono text-[0.55rem] tracking-widest uppercase mt-0.5" style={{ color: "var(--color-accent)" }}>
                      {edu.mention}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right — Quote + Stats + Languages */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.75 }}
            className="lg:pl-12 pt-10"
          >
            <motion.blockquote
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.9 }}
            >
              <p
                className="font-display italic text-lg font-normal leading-snug"
                style={{ color: "var(--color-text)" }}
              >
                &ldquo;Jongler avec plusieurs responsabilités n&apos;est pas une contrainte — c&apos;est une compétence.&rdquo;
              </p>
            </motion.blockquote>

            <div className="mt-8 grid grid-cols-2 gap-4">
              {[
                { value: "4×",    label: "Mention Bien"    },
                { value: "5 ans", label: "double vie"      },
                { value: "10+",   label: "technos en prod" },
                { value: "CDI",   label: "depuis 2025"     },
              ].map(stat => (
                <div key={stat.label} className="p-4"
                  style={{ border: "1px solid var(--color-border)", backgroundColor: "var(--color-surface)" }}>
                  <p className="font-display text-2xl font-light leading-none mb-1" style={{ color: "var(--color-text)" }}>
                    {stat.value}
                  </p>
                  <p className="font-mono text-[0.58rem] tracking-widest uppercase" style={{ color: "var(--color-text-muted)" }}>
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-8 pt-8" style={{ borderTop: "1px solid var(--color-border)" }}>
              <p className="section-label mb-4" style={{ color: "var(--color-text-muted)" }}>Langues</p>
              <div className="space-y-2">
                {[
                  { lang: "Français", level: "Courant"       },
                  { lang: "Anglais",  level: "Professionnel" },
                  { lang: "Malagasy", level: "Courant"       },
                ].map(l => (
                  <div key={l.lang} className="flex items-center justify-between">
                    <span className="font-display text-sm font-normal" style={{ color: "var(--color-text)" }}>
                      {l.lang}
                    </span>
                    <span className="font-mono text-[0.58rem] tracking-widest uppercase" style={{ color: "var(--color-text-muted)" }}>
                      {l.level}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
