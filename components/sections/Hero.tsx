"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { LiquidButton } from "@/components/ui/liquid-glass-button";
import { TechLogoRotator } from "@/components/ui/TechLogoRotator";
import { siteConfig } from "@/lib/metadata";
import { SiGitlab } from "react-icons/si";
import { FaLinkedinIn } from "react-icons/fa";
import posthog from "posthog-js";

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

const chipLogos = ["React Native", "Next.js", "NestJS"];

const stats = [
  { value: "2", label: "apps en production" },
  { value: "M2", label: "Mention Bien — 2025" },
  { value: "CDI", label: "plüm · sept. 2024" },
];

const reveal = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: EASE, delay },
});

export default function Hero() {
  const scrollTo = (selector: string) =>
    document.querySelector(selector)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section className="relative flex min-h-screen flex-col justify-between overflow-hidden pt-28 md:pt-32">
      {/* Halos d'ambiance */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 -z-10 h-[36rem] w-full max-w-5xl -translate-x-1/2"
        style={{
          background:
            "radial-gradient(ellipse 55% 65% at 20% 30%, rgba(46,91,255,0.13), transparent 65%), radial-gradient(ellipse 45% 55% at 80% 25%, rgba(244,63,94,0.09), transparent 65%)",
        }}
      />

      <div className="container-hanzo flex flex-1 flex-col items-center justify-center py-12 md:py-16">
        {/* Badge disponibilité */}
        <motion.div {...reveal(0.05)} className="mb-10 md:mb-14">
          <span className="badge-open">Disponible — CDI chez plüm</span>
        </motion.div>

        {/* H1 — accroche principale */}
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="heading-xl mx-auto max-w-5xl text-center font-display text-[var(--color-text)]"
        >
          {/* Ligne 1 — ce que je fais */}
          <span className="flex flex-wrap items-baseline justify-center gap-x-3 gap-y-2 md:gap-x-4">
            <motion.span
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: EASE, delay: 0.15 }}
            >
              Apps mobiles
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: EASE, delay: 0.22 }}
              className="word-muted"
            >
              &amp;
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: EASE, delay: 0.28 }}
            >
              web
            </motion.span>
            {/* Chip logo animé */}
            <motion.span
              initial={{ scale: 0.7, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.55, ease: EASE, delay: 0.45 }}
              className="inline-flex shrink-0 translate-y-[0.08em]"
            >
              <TechLogoRotator technologies={chipLogos} />
            </motion.span>
          </span>

          {/* Ligne 2 — le résultat, accroche forte */}
          <span className="mt-2 block md:mt-3">
            <motion.span
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: EASE, delay: 0.38 }}
              className="inline-block"
            >
              livrées{" "}
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: EASE, delay: 0.46 }}
              className="inline-block"
            >
              <span
                className="relative inline-block bg-clip-text text-transparent"
                style={{
                  backgroundImage: "linear-gradient(92deg, #2e5bff 15%, #0ea5e9 60%, #10b981 100%)",
                }}
              >
                en production.
                {/* soulignement animé */}
                <motion.span
                  aria-hidden
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.7, ease: EASE, delay: 0.85 }}
                  className="absolute -bottom-2 left-0 h-0.5 w-full origin-left"
                  style={{
                    background: "linear-gradient(90deg, #2e5bff, #10b981)",
                    borderRadius: "2px",
                  }}
                />
              </span>
            </motion.span>
          </span>
        </motion.h1>

        {/* Sous-titre */}
        <motion.p
          {...reveal(0.52)}
          className="mx-auto mt-8 max-w-lg text-center text-base leading-relaxed text-muted md:mt-10 md:text-[1.05rem]"
        >
          Développeur fullstack depuis La Réunion — je prends votre projet de l&apos;idée jusqu&apos;au
          store et aux serveurs, sans rien déléguer.
        </motion.p>

        {/* CTAs + social */}
        <motion.div
          {...reveal(0.62)}
          className="mt-10 flex flex-wrap items-center justify-center gap-3 md:mt-12"
        >
          <Button
            type="button"
            variant="cool"
            onClick={() => scrollTo("#projects")}
            className="h-12 rounded-full px-8 text-[0.95rem]"
          >
            Voir mes projets
          </Button>
          <LiquidButton
            type="button"
            size="xl"
            onClick={() => scrollTo("#contact")}
            className="px-8 text-[0.95rem] font-semibold"
          >
            Me contacter
          </LiquidButton>

          <span className="mx-1 hidden h-8 w-px bg-[var(--color-border)] sm:block" aria-hidden />

          <a
            href={siteConfig.gitlab}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitLab"
            onClick={() => posthog.capture("social_clicked", { network: "gitlab", source: "hero" })}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[var(--color-border)] bg-white text-[#FC6D26] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#FC6D26] hover:shadow-[0_8px_20px_-8px_rgba(252,109,38,0.55)]"
          >
            <SiGitlab size={19} />
          </a>
          <a
            href={siteConfig.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            onClick={() => posthog.capture("social_clicked", { network: "linkedin", source: "hero" })}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[var(--color-border)] bg-white text-[#0A66C2] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#0A66C2] hover:shadow-[0_8px_20px_-8px_rgba(10,102,194,0.55)]"
          >
            <FaLinkedinIn size={19} />
          </a>
        </motion.div>
      </div>

      {/* Bande de preuves */}
      <motion.div {...reveal(0.72)} className="pb-10 pt-4 md:pb-14">
        <div className="container-hanzo">
          <div className="mx-auto flex max-w-2xl flex-col items-center justify-center divide-y divide-[var(--color-border)] rounded-2xl border border-[var(--color-border)] bg-white/70 backdrop-blur-sm sm:flex-row sm:divide-x sm:divide-y-0">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="flex flex-1 flex-col items-center gap-0.5 px-6 py-4 text-center"
              >
                <span className="font-display text-2xl font-bold tracking-tight text-[var(--color-text)]">
                  {stat.value}
                </span>
                <span className="text-xs text-muted">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
