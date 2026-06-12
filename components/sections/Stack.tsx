"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { getTechLogo } from "@/lib/devicon";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Marquee } from "@/components/ui/Marquee";
import { RevealWords } from "@/components/ui/Reveal";

interface Tech {
  name: string;
  level: string;
  note: string;
  category: string;
}

const CATEGORY_COLORS: Record<string, string> = {
  Frontend: "#2e5bff",
  Backend: "#10b981",
  DevOps: "#f97316",
  Outils: "#f43f5e",
};

const techs: Tech[] = [
  { name: "React Native", level: "Expert", note: "App plüm en prod sur iOS & Android", category: "Frontend" },
  { name: "Next.js", level: "Expert", note: "Plateformes web plüm, Revo et ce portfolio", category: "Frontend" },
  { name: "TypeScript", level: "Expert", note: "Mon langage du quotidien, front & back", category: "Frontend" },
  { name: "Tailwind CSS", level: "Expert", note: "Design systems rapides et maintenables", category: "Frontend" },
  { name: "NestJS", level: "Expert", note: "API microservices de plüm", category: "Backend" },
  { name: "PostgreSQL", level: "Intermédiaire", note: "Base principale de tous mes projets", category: "Backend" },
  { name: "Supabase", level: "Expert", note: "Auth, base et storage chez plüm & Revo", category: "Backend" },
  { name: "Python", level: "Intermédiaire", note: "Dashboards Dash au LIM", category: "Backend" },
  { name: "Docker", level: "Avancé", note: "Déploiements Compose sur serveur dédié", category: "DevOps" },
  { name: "Nginx", level: "Intermédiaire", note: "Reverse proxy & SSL en production", category: "DevOps" },
  { name: "Scaleway", level: "Avancé", note: "Hébergement des services plüm", category: "DevOps" },
  { name: "Stripe", level: "Avancé", note: "Paiements intégrés chez plüm", category: "Outils" },
  { name: "Firebase/FCM", level: "Avancé", note: "Notifications push mobiles", category: "Outils" },
  { name: "n8n", level: "Avancé", note: "Workflows d'automatisation métier", category: "Outils" },
];

const strengths = [
  "Code maintenable",
  "Pensée système",
  "Dev-friendly",
  "Process clair",
  "Livraison rapide",
  "Handoff propre",
];

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

export default function Stack() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [flipped, setFlipped] = useState<string | null>(null);

  const categories = Object.keys(CATEGORY_COLORS);
  const displayed = activeCategory
    ? techs.filter((tech) => tech.category === activeCategory)
    : techs;

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
          <p className="mx-auto mt-[var(--section-desc-gap)] max-w-xl text-base leading-relaxed text-muted">
            Pas une liste de buzzwords — chaque techno tourne aujourd&apos;hui sur de vrais
            produits. Survolez une carte pour voir où.
          </p>
        </motion.div>

        <div className="mb-10 flex flex-wrap justify-center gap-2">
          {[null, ...categories].map((category) => {
            const active = activeCategory === category;
            const color = category ? CATEGORY_COLORS[category] : "var(--color-primary)";
            return (
              <button
                key={category ?? "all"}
                type="button"
                onClick={() => setActiveCategory(category)}
                className="cursor-pointer rounded-full border px-4 py-2 text-sm font-medium transition-all"
                style={
                  active
                    ? { background: color, borderColor: color, color: "#fff" }
                    : {
                        background: "transparent",
                        borderColor: "var(--color-border)",
                        color: "var(--color-text-muted)",
                      }
                }
              >
                {category ?? "Tout"}
              </button>
            );
          })}
        </div>

        <motion.div layout className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 md:gap-5">
          {displayed.map((tech, index) => {
            const logo = getTechLogo(tech.name);
            const color = CATEGORY_COLORS[tech.category];
            const isFlipped = flipped === tech.name;
            return (
              <motion.div
                key={tech.name}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.04 * index, ease: EASE }}
                className="group h-40 [perspective:1000px] md:h-44"
                onClick={() => setFlipped(isFlipped ? null : tech.name)}
              >
                <div
                  className="relative h-full w-full transition-transform duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]"
                  style={isFlipped ? { transform: "rotateY(180deg)" } : undefined}
                >
                  {/* Face avant — logo XL */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 rounded-3xl border border-[var(--color-border)] bg-white p-4 shadow-[0_1px_2px_rgba(10,10,20,0.04),0_12px_28px_-18px_rgba(10,10,20,0.12)] [backface-visibility:hidden]">
                    {logo ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={logo}
                        alt=""
                        width={48}
                        height={48}
                        aria-hidden
                        style={{ objectFit: "contain" }}
                      />
                    ) : (
                      <span
                        className="flex h-12 w-12 items-center justify-center rounded-xl text-lg font-bold text-white"
                        style={{ background: color }}
                      >
                        {tech.name[0]}
                      </span>
                    )}
                    <span className="text-center text-sm font-semibold tracking-tight text-[var(--color-text)] md:text-base">
                      {tech.name}
                    </span>
                  </div>

                  {/* Face arrière — où & comment */}
                  <div
                    className="absolute inset-0 flex flex-col items-center justify-center gap-2 rounded-3xl p-4 text-center [backface-visibility:hidden] [transform:rotateY(180deg)]"
                    style={{
                      background: `linear-gradient(160deg, color-mix(in srgb, ${color} 88%, black), ${color})`,
                      boxShadow: `0 16px 32px -16px color-mix(in srgb, ${color} 60%, transparent)`,
                    }}
                  >
                    <span className="rounded-full bg-white/20 px-3 py-0.5 text-[0.65rem] font-bold uppercase tracking-wider text-white">
                      {tech.level}
                    </span>
                    <p className="text-xs leading-relaxed text-white/95 md:text-sm">
                      {tech.note}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
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
