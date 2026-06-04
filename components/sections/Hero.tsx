"use client";

import { motion } from "framer-motion";
import { Marquee } from "@/components/ui/Marquee";
import { TechLogoRotator } from "@/components/ui/TechLogoRotator";
import { getTechLogo } from "@/lib/devicon";

const trustedTech = [
  "React Native",
  "Next.js",
  "NestJS",
  "TypeScript",
  "PostgreSQL",
  "Supabase",
  "Docker",
  "Stripe",
];

const chipLogos = ["React Native", "Next.js", "NestJS"];

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

const reveal = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: EASE, delay },
});

export default function Hero() {
  const scrollTo = (selector: string) =>
    document.querySelector(selector)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section className="relative flex min-h-screen flex-col justify-between overflow-hidden pt-28 md:pt-32">
      <div className="container-hanzo flex flex-1 flex-col justify-center py-12 md:py-16">
        <motion.div {...reveal(0.1)} className="mb-10 flex justify-center md:mb-14">
          <span className="badge-open">Disponible — CDI chez plüm</span>
        </motion.div>

        <motion.h1
          {...reveal(0.2)}
          className="heading-xl mx-auto max-w-5xl text-center font-display text-[var(--color-text)]"
        >
          <span className="flex flex-wrap items-baseline justify-center gap-x-3 gap-y-2 md:gap-x-4">
            <span>Développement</span>
            <motion.span
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, ease: EASE, delay: 0.5 }}
              className="inline-flex shrink-0 translate-y-[0.08em]"
            >
              <TechLogoRotator technologies={chipLogos} />
            </motion.span>
            <span className="word-muted">fullstack</span>
          </span>
          <span className="mt-2 block md:mt-3">
            pour des <span className="word-muted">produits</span> qui durent
          </span>
        </motion.h1>

        <motion.p
          {...reveal(0.35)}
          className="mx-auto mt-8 max-w-xl text-center text-base leading-relaxed text-muted md:mt-10 md:text-lg"
        >
          Je conçois et déploie des applications mobiles et web qui tiennent en production —
          du prototype au serveur, depuis La Réunion.
        </motion.p>

        <motion.div
          {...reveal(0.45)}
          className="mt-10 flex flex-wrap items-center justify-center gap-3 md:mt-12"
        >
          <button type="button" onClick={() => scrollTo("#projects")} className="btn-primary">
            Voir mes projets
          </button>
          <button type="button" onClick={() => scrollTo("#contact")} className="btn-secondary">
            Me contacter
          </button>
        </motion.div>
      </div>

      <div className="pb-6 pt-4 md:pb-8">
        <Marquee className="py-2">
          {trustedTech.map((name) => {
            const logo = getTechLogo(name);
            return (
              <span
                key={name}
                className="inline-flex items-center gap-2.5 text-base font-medium text-[var(--color-text)]"
              >
                {logo && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={logo}
                    alt=""
                    width={20}
                    height={20}
                    aria-hidden
                    style={{ objectFit: "contain" }}
                  />
                )}
                {name}
              </span>
            );
          })}
        </Marquee>
      </div>
    </section>
  );
}
