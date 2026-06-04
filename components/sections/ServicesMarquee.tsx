"use client";

import { useRef } from "react";
import { Marquee } from "@/components/ui/Marquee";
import { SectionHeader } from "@/components/ui/SectionHeader";

const services = [
  "React Native",
  "Next.js",
  "NestJS",
  "TypeScript",
  "PostgreSQL",
  "Supabase",
  "Docker",
  "Stripe",
  "Firebase",
];

export default function ServicesMarquee() {
  const ref = useRef<HTMLElement>(null);

  return (
    <section ref={ref} className="py-[var(--section-padding)]">
      <div className="container-hanzo">
        <SectionHeader
          label="Hello"
          title="Du prototype au déploiement, je couvre toute la chaîne technique."
          description="Mobile, web, backend et infrastructure — des produits pensés pour durer, avec une attention particulière à la qualité du code et à l'expérience utilisateur."
        />
      </div>

      <Marquee wide className="py-3">
        {services.map((service) => (
          <span
            key={service}
            className="inline-flex items-center font-display text-2xl md:text-4xl font-semibold tracking-tight text-[var(--color-text)]"
          >
            {service}
            <span className="mx-6 md:mx-10 text-[var(--color-border)] font-light" aria-hidden>
              ·
            </span>
          </span>
        ))}
      </Marquee>
    </section>
  );
}
