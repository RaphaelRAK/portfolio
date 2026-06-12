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
    gradient:
      "radial-gradient(circle at 20% 0%, rgba(255,255,255,0.28), transparent 55%), linear-gradient(150deg, #ff6a3d 0%, #e11d48 100%)",
    glow: "rgba(225, 29, 72, 0.45)",
  },
  {
    title: "Sport",
    desc: "Musculation et marche — discipline corps et esprit.",
    image: "/images/sports.png",
    layout: "col-span-1 row-span-1",
    gradient:
      "radial-gradient(circle at 80% 0%, rgba(255,255,255,0.25), transparent 55%), linear-gradient(150deg, #4e74ff 0%, #2336c9 100%)",
    glow: "rgba(46, 91, 255, 0.45)",
  },
  {
    title: "Voyages",
    desc: "Madagascar, La Réunion, Paris, Genève…",
    image: "/images/voyage.png",
    layout: "col-span-1 row-span-1",
    gradient:
      "radial-gradient(circle at 20% 0%, rgba(255,255,255,0.3), transparent 55%), linear-gradient(150deg, #fbbf24 0%, #ea7a0c 100%)",
    glow: "rgba(245, 158, 11, 0.45)",
  },
  {
    title: "Vélo & Rando",
    desc: "Explorer les hauts de l'île à pied ou à vélo.",
    image: "/images/velo.png",
    layout: "col-span-2 row-span-1",
    gradient:
      "radial-gradient(circle at 85% 10%, rgba(255,255,255,0.25), transparent 55%), linear-gradient(150deg, #34d399 0%, #0d8a60 100%)",
    glow: "rgba(16, 185, 129, 0.45)",
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
                background: hobby.gradient,
                boxShadow: `0 1px 2px rgba(10,10,20,0.06), 0 20px 44px -20px ${hobby.glow}`,
              }}
            >
              {/* Image — full bleed, no white box */}
              <div className="absolute inset-0 flex items-center justify-center p-5 md:p-6">
                <div className="relative h-full w-full transition-transform duration-700 group-hover:scale-105 group-hover:-rotate-1">
                  <Image
                    src={hobby.image}
                    alt=""
                    fill
                    className="object-contain drop-shadow-xl"
                    sizes="(max-width: 640px) 50vw, 25vw"
                    aria-hidden
                  />
                </div>
              </div>

              {/* Gradient overlay for text legibility */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/5 to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-90" />

              {/* Text overlay */}
              <div className="absolute inset-x-0 bottom-0 p-5 md:p-6">
                <h3 className="font-display text-lg md:text-xl font-semibold tracking-tight text-white drop-shadow-sm">
                  {hobby.title}
                </h3>
                <p className="mt-1 max-w-xs text-xs leading-relaxed text-white/85 md:text-sm md:opacity-0 md:translate-y-2 md:transition-all md:duration-500 md:group-hover:opacity-100 md:group-hover:translate-y-0">
                  {hobby.desc}
                </p>
              </div>

              {/* Liseré intérieur lumineux */}
              <div className="pointer-events-none absolute inset-0 rounded-[var(--radius-card)] ring-1 ring-inset ring-white/25" />
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
