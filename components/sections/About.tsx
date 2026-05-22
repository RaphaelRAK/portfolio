"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const stats = [
  { value: "4×", label: "Mention Bien", sub: "Bac · Licence · Master · CNFDI" },
  { value: "5 ans", label: "double vie", sub: "études + emploi en parallèle" },
  { value: "10+", label: "technos en prod", sub: "React Native, NestJS, Supabase…" },
  { value: "CDI", label: "depuis 2025", sub: "plüm · La Réunion" },
];

export default function About() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" ref={ref} className="py-24 px-6 md:px-12">
      <div
        className="max-w-7xl mx-auto py-16 px-8 md:px-16"
        style={{
          backgroundColor: "var(--color-surface)",
          border: "1px solid var(--color-border)",
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-16"
        >
          {/* Bio */}
          <div className="lg:col-span-7">
            <span className="section-label block mb-6">À propos</span>

            <h2
              className="font-display font-light leading-tight mb-8"
              style={{ fontSize: "clamp(2rem, 4vw, 3.2rem)", color: "var(--color-text)" }}
            >
              Né à Madagascar,
              <br />
              <span className="italic">construit à La Réunion.</span>
            </h2>

            <div
              className="space-y-4 leading-relaxed text-base"
              style={{ color: "var(--color-text-muted)" }}
            >
              <p>
                Développeur fullstack formé à l&apos;Université de La Réunion — Master 2
                Informatique 2025, Mention Bien. Pendant 5 ans, j&apos;ai mené de front études
                et emplois alimentaires : restaurant universitaire, Burger King, SHISO Burger,
                inventoriste. Cette double vie m&apos;a appris la discipline, la résistance et
                l&apos;efficacité.
              </p>
              <p>
                Aujourd&apos;hui en CDI chez{" "}
                <span style={{ color: "var(--color-text)", fontWeight: 500 }}>plüm</span>, je conçois et
                déploie des applications mobiles React Native et des plateformes web Next.js.
                Du prototype au serveur de production : je couvre l&apos;ensemble de la chaîne.
              </p>
              <p>
                Je cherche à construire des produits qui ont de l&apos;impact — en équipe,
                en remote, depuis La Réunion ou en métropole.
              </p>
            </div>

            <motion.blockquote
              initial={{ opacity: 0, x: -12 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="mt-10 pl-5"
              style={{ borderLeft: "2px solid var(--color-accent)" }}
            >
              <p
                className="font-display italic font-normal leading-snug"
                style={{ fontSize: "clamp(1rem, 2vw, 1.3rem)", color: "var(--color-text)" }}
              >
                &ldquo;Jongler avec plusieurs responsabilités n&apos;est pas une contrainte —
                c&apos;est une compétence.&rdquo;
              </p>
            </motion.blockquote>
          </div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.15, duration: 0.6 }}
            className="lg:col-span-5"
          >
            <div className="grid grid-cols-2 gap-px" style={{ backgroundColor: "var(--color-border)" }}>
              {stats.map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0 }}
                  animate={inView ? { opacity: 1 } : {}}
                  transition={{ delay: 0.3 + i * 0.1, duration: 0.5 }}
                  className="flex flex-col justify-end p-6"
                  style={{ backgroundColor: "var(--color-bg)" }}
                >
                  <p
                    className="font-display font-light leading-none mb-2"
                    style={{ fontSize: "clamp(2rem, 4vw, 3rem)", color: "var(--color-text)" }}
                  >
                    {stat.value}
                  </p>
                  <p className="font-mono text-[0.62rem] tracking-widest uppercase mb-1" style={{ color: "var(--color-accent)" }}>
                    {stat.label}
                  </p>
                  <p className="font-mono text-[0.55rem] tracking-wide" style={{ color: "var(--color-text-muted)" }}>
                    {stat.sub}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
