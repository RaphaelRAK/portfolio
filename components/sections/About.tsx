"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal, RevealWords } from "@/components/ui/Reveal";

const highlights = [
  { value: "4×", label: "Mention Bien" },
  { value: "5 ans", label: "double vie" },
  { value: "10+", label: "technos en prod" },
  { value: "CDI", label: "depuis 2025" },
];

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

export default function About() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" ref={ref} className="py-[var(--section-padding)]">
      <div className="container-hanzo">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          <div className="lg:col-span-7">
            <Reveal>
              <SectionLabel>À propos</SectionLabel>
            </Reveal>
            <h2 className="heading-lg font-display text-[var(--color-text)] mt-4 mb-8">
              <RevealWords text="Né à Madagascar," />
              <br />
              <RevealWords text="construit à La Réunion." className="word-muted" delay={0.15} />
            </h2>

            <div className="space-y-5 text-muted text-base leading-relaxed">
              <Reveal delay={0.1}>
                <p>
                  Développeur fullstack formé à l&apos;Université de La Réunion — Master 2
                  Informatique 2025, Mention Bien. Pendant 5 ans, j&apos;ai mené de front études
                  et emplois alimentaires : restaurant universitaire, Burger King, SHISO Burger,
                  inventoriste. Cette double vie m&apos;a appris la discipline, la résistance et
                  l&apos;efficacité.
                </p>
              </Reveal>
              <Reveal delay={0.2}>
                <p>
                  Aujourd&apos;hui en CDI chez{" "}
                  <strong className="text-[var(--color-text)] font-medium">plüm</strong>, je conçois
                  et déploie des applications mobiles React Native et des plateformes web Next.js —
                  du prototype au serveur de production.
                </p>
              </Reveal>
            </div>

            <Reveal delay={0.25}>
              <blockquote className="mt-10 pl-6 border-l-[3px] border-[var(--color-primary)]">
                <p className="font-serif italic text-2xl md:text-3xl text-[var(--color-text)] leading-snug">
                  &ldquo;Jongler avec plusieurs responsabilités n&apos;est pas une contrainte —
                  c&apos;est une compétence.&rdquo;
                </p>
              </blockquote>
            </Reveal>
          </div>

          <div className="lg:col-span-5 flex flex-col gap-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.7, ease: EASE }}
              className="relative w-full overflow-hidden rounded-[var(--radius-card)]"
              style={{ aspectRatio: "4/5" }}
            >
              <Image
                src="/images/raph.jpeg"
                alt="Aina Raphaël Rakotonaivo"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 40vw"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2, ease: EASE }}
              className="card-hanzo p-8"
            >
              <p className="text-sm text-muted mb-6">En chiffres</p>
              <div className="grid grid-cols-2 gap-6">
                {highlights.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, scale: 0.85, y: 16 }}
                    animate={inView ? { opacity: 1, scale: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.3 + index * 0.1, ease: EASE }}
                  >
                    <p className="font-display text-4xl font-bold text-[var(--color-text)] leading-none tracking-tight">
                      {stat.value}
                    </p>
                    <p className="text-sm text-muted mt-2">{stat.label}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
