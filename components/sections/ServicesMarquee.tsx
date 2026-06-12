"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Marquee } from "@/components/ui/Marquee";
import { getTechLogo } from "@/lib/devicon";

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

const pills = [
  { label: "Applications mobiles React Native", icon: "📱" },
  { label: "Plateformes web Next.js", icon: "🌐" },
  { label: "APIs NestJS · TypeScript", icon: "⚙️" },
  { label: "Déploiement Docker · Scaleway", icon: "🚀" },
  { label: "Intégrations Stripe · Firebase", icon: "🔌" },
  { label: "Bases PostgreSQL · Supabase", icon: "🗄️" },
];

const marqueeLogos = [
  "React Native", "Next.js", "NestJS", "TypeScript", "PostgreSQL",
  "Supabase", "Docker", "Stripe", "Firebase/FCM", "n8n", "Scaleway", "Nginx",
];

export default function ServicesMarquee() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="py-[var(--section-padding)] overflow-hidden">
      <div className="container-hanzo mb-12">
        <div className="mx-auto max-w-3xl text-center">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: EASE }}
            className="section-label block mb-4"
          >
            Ce que je fais
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: EASE, delay: 0.06 }}
            className="heading-lg font-display text-[var(--color-text)]"
          >
            Un seul dev pour toute la stack.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: EASE, delay: 0.14 }}
            className="mt-4 text-base leading-relaxed text-muted"
          >
            Mobile, web, backend et infra — je ne sous-traite rien.
            Du prototype au serveur de production, c&apos;est moi qui livre.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: EASE, delay: 0.22 }}
          className="mt-10 flex flex-wrap justify-center gap-3"
        >
          {pills.map((pill, index) => (
            <motion.span
              key={pill.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.4, ease: EASE, delay: 0.28 + index * 0.05 }}
              className="inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] bg-white px-4 py-2 text-sm font-medium text-[var(--color-text)] shadow-sm"
            >
              <span aria-hidden>{pill.icon}</span>
              {pill.label}
            </motion.span>
          ))}
        </motion.div>
      </div>

      <div className="relative">
        {/* Fade edges */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-[var(--color-bg)] to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-[var(--color-bg)] to-transparent" />

        <Marquee wide className="py-3">
          {marqueeLogos.map((name) => {
            const logo = getTechLogo(name);
            return (
              <span
                key={name}
                className="inline-flex items-center gap-2.5 font-display text-lg font-semibold tracking-tight text-[var(--color-text)]"
              >
                {logo && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={logo} alt="" width={20} height={20} aria-hidden style={{ objectFit: "contain" }} />
                )}
                {name}
                <span className="mx-4 text-[var(--color-border)] font-light" aria-hidden>·</span>
              </span>
            );
          })}
        </Marquee>
      </div>
    </section>
  );
}
