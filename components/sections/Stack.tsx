"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import { getTechLogo } from "@/lib/devicon";

const categories = [
  {
    label: "Frontend",
    techs: [
      { name: "React Native", level: "Expert" },
      { name: "Next.js", level: "Expert" },
      { name: "React", level: "Expert" },
      { name: "TypeScript", level: "Expert" },
      { name: "Tailwind CSS", level: "Expert" },
      { name: "Redux Toolkit", level: "Intermédiaire" },
      { name: "React Query", level: "Intermédiaire" },
    ],
  },
  {
    label: "Backend",
    techs: [
      { name: "NestJS", level: "Expert" },
      { name: "REST API", level: "Expert" },
      { name: "PostgreSQL", level: "Intermédiaire" },
      { name: "Supabase", level: "Expert" },
      { name: "Python", level: "Intermédiaire" },
      { name: "Laravel", level: "Intermédiaire" },
    ],
  },
  {
    label: "DevOps",
    techs: [
      { name: "Docker", level: "Avancé" },
      { name: "Docker Compose", level: "Avancé" },
      { name: "Nginx", level: "Intermédiaire" },
      { name: "Scaleway", level: "Avancé" },
      { name: "GitHub Actions", level: "Intermédiaire" },
      { name: "Serveur dédié", level: "Intermédiaire" },
    ],
  },
  {
    label: "Outils",
    techs: [
      { name: "Stripe", level: "Avancé" },
      { name: "Firebase/FCM", level: "Avancé" },
      { name: "Mailjet", level: "Avancé" },
      { name: "n8n", level: "Avancé" },
      { name: "ElevenLabs", level: "Intermédiaire" },
      { name: "Figma", level: "Intermédiaire" },
      { name: "Storybook", level: "Intermédiaire" },
    ],
  },
  {
    label: "Divers",
    techs: [
      { name: "JavaScript", level: "Intermédiaire" },
      { name: "Java", level: "Intermédiaire" },
      { name: "C", level: "Intermédiaire" },
      { name: "Bash", level: "Intermédiaire" },
      { name: "Git", level: "Avancé" },
    ],
  },
];

const pipeline = [
  { layer: "Mobile", tech: "React Native" },
  { layer: "Web", tech: "Next.js" },
  { layer: "API", tech: "NestJS" },
  { layer: "Data", tech: "PostgreSQL / Supabase" },
  { layer: "Infra", tech: "Docker / Scaleway" },
];

const levelColor: Record<string, string> = {
  Expert: "var(--color-accent)",
  Avancé: "var(--color-text)",
  Intermédiaire: "var(--color-text-muted)",
};

export default function Stack() {
  const ref = useRef<HTMLElement>(null);
  const pipelineRef = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const pipelineInView = useInView(pipelineRef, { once: true, margin: "-80px" });
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const displayed = activeCategory
    ? categories.filter((c) => c.label === activeCategory)
    : categories;

  return (
    <section id="stack" ref={ref} className="py-0">
      <div
        className="py-20 px-6 md:px-12"
        style={{ backgroundColor: "var(--color-surface)" }}
      >
        <div className="max-w-7xl mx-auto">

          {/* Section header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="mb-16"
          >
            <span className="section-label block mb-3">Stack technique</span>
            <div className="flex items-end gap-6">
              <h2
                className="font-display font-light leading-none"
                style={{ fontSize: "clamp(2.5rem, 5vw, 4.5rem)", color: "var(--color-text)" }}
              >
                Ce que je maîtrise
              </h2>
              <span
                className="font-display italic leading-none mb-1"
                style={{
                  fontSize: "clamp(2.5rem, 5vw, 4.5rem)",
                  color: "transparent",
                  WebkitTextStroke: "1px var(--color-border)",
                }}
              >
                en prod
              </span>
            </div>
          </motion.div>

          {/* Pipeline display */}
          <div
            ref={pipelineRef}
            className="mb-16 p-6 md:p-8"
            style={{
              border: "1px solid var(--color-border)",
              backgroundColor: "var(--color-bg)",
            }}
          >
            <p
              className="font-mono text-[0.6rem] tracking-widest uppercase mb-6"
              style={{ color: "var(--color-text-muted)" }}
            >
              Architecture type
            </p>
            <div className="flex flex-wrap items-center gap-2 md:gap-0">
              {pipeline.map((node, i) => (
                <motion.div
                  key={node.layer}
                  initial={{ opacity: 0, x: -10 }}
                  animate={pipelineInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  className="flex items-center gap-2 md:gap-3"
                >
                  <div>
                    <div
                      className="font-mono text-[0.55rem] tracking-widest uppercase mb-0.5"
                      style={{ color: "var(--color-accent)" }}
                    >
                      {node.layer}
                    </div>
                    <div
                      className="font-mono text-[0.72rem]"
                      style={{ color: "var(--color-text)" }}
                    >
                      {node.tech}
                    </div>
                  </div>
                  {i < pipeline.length - 1 && (
                    <span
                      className="font-mono text-sm mx-1 hidden md:inline"
                      style={{ color: "var(--color-accent)", opacity: 0.6 }}
                    >
                      →
                    </span>
                  )}
                </motion.div>
              ))}
            </div>
          </div>

          {/* Category filter */}
          <div className="flex flex-wrap gap-2 mb-12">
            {[null, ...categories.map((c) => c.label)].map((cat) => (
              <button
                key={cat ?? "all"}
                onClick={() => setActiveCategory(cat)}
                className="font-mono text-[0.6rem] tracking-widest uppercase px-4 py-2 border transition-all duration-200"
                style={{
                  borderColor:
                    activeCategory === cat ? "var(--color-text)" : "var(--color-border)",
                  color:
                    activeCategory === cat ? "var(--color-text)" : "var(--color-text-muted)",
                  backgroundColor:
                    activeCategory === cat ? "var(--color-text)" : "transparent",
                }}
                onMouseEnter={e => {
                  if (activeCategory !== cat) {
                    (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--color-text-muted)";
                  }
                }}
                onMouseLeave={e => {
                  if (activeCategory !== cat) {
                    (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--color-border)";
                  }
                }}
              >
                <span style={{ color: activeCategory === cat ? "var(--color-bg)" : "var(--color-text-muted)" }}>
                  {cat ?? "Tout"}
                </span>
              </button>
            ))}
          </div>

          {/* Tech grid */}
          <div className="space-y-10">
            <AnimatePresence mode="popLayout">
              {displayed.map((category, ci) => (
                <motion.div
                  key={category.label}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.35, delay: ci * 0.05, ease: [0.25, 0.1, 0.25, 1] }}
                  layout
                >
                  <div className="flex items-center gap-4 mb-5">
                    <p
                      className="font-mono text-[0.6rem] tracking-widest uppercase"
                      style={{ color: "var(--color-accent)" }}
                    >
                      {category.label}
                    </p>
                    <span className="flex-1 h-px" style={{ backgroundColor: "var(--color-border)" }} />
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {category.techs.map((tech) => (
                      <TechPill key={tech.name} tech={tech} />
                    ))}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Legend */}
          <div
            className="flex items-center gap-6 mt-10 pt-8"
            style={{ borderTop: "1px solid var(--color-border)" }}
          >
            {Object.entries(levelColor).map(([level, color]) => (
              <div key={level} className="flex items-center gap-2">
                <span
                  className="block w-1.5 h-1.5 rounded-full"
                  style={{ backgroundColor: color }}
                />
                <span
                  className="font-mono text-[0.6rem] tracking-widest uppercase"
                  style={{ color }}
                >
                  {level}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function TechPill({ tech }: { tech: { name: string; level: string } }) {
  const [hovered, setHovered] = useState(false);
  const logo = getTechLogo(tech.name);
  const levelCol = levelColor[tech.level];

  return (
    <motion.div
      whileHover={{ y: -2 }}
      transition={{ type: "spring", stiffness: 400, damping: 20 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="flex items-center gap-2 px-3 py-1.5 border cursor-default transition-all duration-200"
      style={{
        borderColor: hovered ? "var(--color-text)" : "var(--color-border)",
        backgroundColor: hovered ? "var(--color-text)" : "transparent",
      }}
    >
      {logo && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={logo}
          alt=""
          aria-hidden
          width={12}
          height={12}
          style={{
            objectFit: "contain",
            flexShrink: 0,
            opacity: hovered ? 0 : 0.7,
          }}
        />
      )}
      <span
        className="font-mono text-[0.62rem] tracking-wide"
        style={{ color: hovered ? "var(--color-bg)" : levelCol }}
      >
        {tech.name}
      </span>
    </motion.div>
  );
}
