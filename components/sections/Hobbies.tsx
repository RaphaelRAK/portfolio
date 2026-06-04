"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import { SectionHeader } from "@/components/ui/SectionHeader";

const hobbies = [
  {
    title: "Voitures",
    desc: "Passion héritée de mon père mécanicien.",
    image: "/images/car.png",
    layout: "col-span-2 row-span-2",
    gradient: "linear-gradient(160deg, #f0ede8 0%, #e8e4dc 100%)",
  },
  {
    title: "Sport",
    desc: "Musculation et marche — discipline corps et esprit.",
    image: "/images/sports.png",
    layout: "col-span-1 row-span-1",
    gradient: "linear-gradient(160deg, #eceef0 0%, #e2e6ea 100%)",
  },
  {
    title: "Voyages",
    desc: "Madagascar, La Réunion, Paris, Genève…",
    image: "/images/voyage.png",
    layout: "col-span-1 row-span-1",
    gradient: "linear-gradient(160deg, #eef0ec 0%, #e4e8e0 100%)",
  },
  {
    title: "Vélo & Rando",
    desc: "Explorer les hauts de l'île à pied ou à vélo.",
    image: "/images/velo.png",
    layout: "col-span-2 row-span-1",
    gradient: "linear-gradient(160deg, #eaede8 0%, #dfe5dc 100%)",
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
              className={`group relative overflow-hidden rounded-[var(--radius-card)] ${hobby.layout} min-h-[11rem]`}
              style={{ background: hobby.gradient }}
            >
              {/* Image — full bleed, no white box */}
              <div className="absolute inset-0 flex items-center justify-center p-5 md:p-6">
                <div className="relative h-full w-full transition-transform duration-700 group-hover:scale-105">
                  <Image
                    src={hobby.image}
                    alt=""
                    fill
                    className="object-contain drop-shadow-lg"
                    sizes="(max-width: 640px) 50vw, 25vw"
                    aria-hidden
                  />
                </div>
              </div>

              {/* Gradient overlay for text legibility */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-90" />

              {/* Text overlay */}
              <div className="absolute inset-x-0 bottom-0 p-5 md:p-6">
                <h3 className="font-display text-lg md:text-xl font-semibold tracking-tight text-white">
                  {hobby.title}
                </h3>
                <p className="mt-1 max-w-xs text-xs leading-relaxed text-white/75 md:text-sm md:opacity-0 md:translate-y-2 md:transition-all md:duration-500 md:group-hover:opacity-100 md:group-hover:translate-y-0">
                  {hobby.desc}
                </p>
              </div>

              {/* Corner accent */}
              <div className="absolute top-4 right-4 h-8 w-8 rounded-full border border-white/20 opacity-0 transition-all duration-500 group-hover:opacity-100 group-hover:scale-100 scale-75" />
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
