"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import { SectionHeader } from "@/components/ui/SectionHeader";

const hobbies = [
  {
    title: "Voitures",
    desc: "Passion héritée de mon père mécanicien.",
    image: "/images/hobbies/car.jpg",
    layout: "col-span-2 row-span-2",
    tint: "linear-gradient(to top, rgba(225,29,72,0.55), rgba(225,29,72,0) 55%)",
    glow: "rgba(225, 29, 72, 0.4)",
  },
  {
    title: "Sport",
    desc: "Musculation et marche — discipline corps et esprit.",
    image: "/images/hobbies/sport.jpg",
    layout: "col-span-1 row-span-1",
    tint: "linear-gradient(to top, rgba(35,54,201,0.6), rgba(35,54,201,0) 55%)",
    glow: "rgba(46, 91, 255, 0.4)",
  },
  {
    title: "Voyages",
    desc: "Madagascar, La Réunion, Paris, Genève…",
    image: "/images/hobbies/voyage.jpg",
    layout: "col-span-1 row-span-1",
    tint: "linear-gradient(to top, rgba(234,122,12,0.55), rgba(234,122,12,0) 55%)",
    glow: "rgba(245, 158, 11, 0.4)",
  },
  {
    title: "Vélo & Rando",
    desc: "Explorer les hauts de l'île à pied ou à vélo.",
    image: "/images/hobbies/rando.jpg",
    layout: "col-span-2 row-span-1",
    tint: "linear-gradient(to top, rgba(13,138,96,0.55), rgba(13,138,96,0) 55%)",
    glow: "rgba(16, 185, 129, 0.4)",
  },
];

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

export default function Hobbies() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="hobbies" ref={ref} className="py-[var(--section-padding)]">
      <div className="container-hanzo">
        <SectionHeader label="Hors du code" title="Centres d'intérêt" />

        <div className="grid grid-cols-2 lg:grid-cols-4 auto-rows-[minmax(11rem,1fr)] gap-4 md:gap-5">
          {hobbies.map((hobby, index) => (
            <motion.article
              key={hobby.title}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.08, duration: 0.55, ease: EASE }}
              className={`group relative overflow-hidden rounded-[var(--radius-card)] ${hobby.layout} min-h-[11rem] transition-all duration-500 hover:-translate-y-1`}
              style={{
                boxShadow: `0 1px 2px rgba(10,10,20,0.06), 0 20px 44px -20px ${hobby.glow}`,
              }}
            >
              {/* Photo plein cadre */}
              <Image
                src={hobby.image}
                alt={hobby.title}
                fill
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              />

              {/* Teinte colorée + assombrissement pour le texte */}
              <div className="absolute inset-0" style={{ background: hobby.tint }} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/5 to-transparent" />

              {/* Texte */}
              <div className="absolute inset-x-0 bottom-0 p-5 md:p-6">
                <h3 className="font-display text-lg md:text-xl font-semibold tracking-tight text-white drop-shadow-sm">
                  {hobby.title}
                </h3>
                <p className="mt-1 max-w-xs text-xs leading-relaxed text-white/85 md:text-sm md:opacity-0 md:translate-y-2 md:transition-all md:duration-500 md:group-hover:opacity-100 md:group-hover:translate-y-0">
                  {hobby.desc}
                </p>
              </div>

              {/* Liseré intérieur lumineux */}
              <div className="pointer-events-none absolute inset-0 rounded-[var(--radius-card)] ring-1 ring-inset ring-white/20" />
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
