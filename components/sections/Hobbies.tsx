"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

const hobbies = [
  {
    title: "Voitures",
    desc: "Passion héritée de mon père mécanicien. Les voitures, c'est une histoire de famille.",
    image: "/images/car.png",
    wide: true,
  },
  {
    title: "Musculation & Marche",
    desc: "L'effort physique régulier — pour la discipline autant que pour la tête.",
    image: "/images/sports.png",
    wide: false,
  },
  {
    title: "Voyages",
    desc: "Madagascar, La Réunion, Île Maurice, Paris, Toulouse, Genève.",
    image: "/images/voyage.png",
    wide: false,
  },
  {
    title: "Vélo & Randonnée",
    desc: "Explorer l'île à vélo ou à pied — les hauts de La Réunion n'ont pas fini de me surprendre.",
    image: "/images/velo.png",
    wide: true,
  },
];

export default function Hobbies() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="hobbies" ref={ref} className="py-32 px-6 md:px-12">
      <div
        className="py-20 px-6 md:px-12"
        style={{ backgroundColor: "var(--color-surface)" }}
      >
        <div className="max-w-7xl mx-auto">
          {/* Section header */}
          <div className="flex items-center gap-4 mb-16">
            <span className="font-display text-7xl font-light text-[var(--color-surface-2)] select-none">
              07
            </span>
            <div>
              <span className="rule-line mb-2" />
              <p className="section-label text-[var(--color-accent)]">Centres d&apos;intérêt</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-[var(--color-border)]">
            {hobbies.map((hobby, i) => (
              <motion.div
                key={hobby.title}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.1, duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
                className="group relative overflow-hidden"
                style={{ backgroundColor: "var(--color-bg)", minHeight: 320 }}
              >
                {/* Background image */}
                <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-105">
                  <Image
                    src={hobby.image}
                    alt={hobby.title}
                    fill
                    className="object-contain object-center opacity-70 group-hover:opacity-90 transition-opacity duration-500"
                    style={{ paddingBottom: "6rem", paddingTop: "1rem" }}
                    sizes="(max-width: 768px) 100vw, 25vw"
                  />
                </div>

                {/* Gradient overlay — only bottom third so image stays visible */}
                <div
                  className="absolute inset-0"
                  style={{
                    background: "linear-gradient(to top, var(--color-bg) 32%, rgba(0,0,0,0.15) 65%, transparent 100%)",
                  }}
                />

                {/* Content */}
                <div className="relative h-full flex flex-col justify-end p-6" style={{ minHeight: 320 }}>
                  {/* Gold accent line */}
                  <div
                    className="w-8 h-0.5 mb-4 transition-all duration-300 group-hover:w-12"
                    style={{ backgroundColor: "var(--color-accent)" }}
                  />
                  <h3 className="font-display text-xl font-light text-[var(--color-text)] mb-2">
                    {hobby.title}
                  </h3>
                  <p className="text-[var(--color-text-muted)] text-sm leading-relaxed">
                    {hobby.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
