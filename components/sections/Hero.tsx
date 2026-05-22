"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { siteConfig } from "@/lib/metadata";
import { getTechLogo } from "@/lib/devicon";
import { SiGithub, SiGitlab } from "react-icons/si";
import { FaLinkedinIn } from "react-icons/fa";

const techMarqueeItems = [
  "React Native", "Next.js", "NestJS", "TypeScript",
  "PostgreSQL", "Supabase", "Docker", "Tailwind CSS",
  "Stripe", "Firebase", "n8n", "Scaleway", "Redux Toolkit",
];

const techMarquee = [...techMarqueeItems, ...techMarqueeItems];

const socialLinks = [
  { label: "GitHub",   href: siteConfig.github,   Icon: SiGithub   },
  { label: "GitLab",   href: siteConfig.gitlab,    Icon: SiGitlab   },
  { label: "LinkedIn", href: siteConfig.linkedin,  Icon: FaLinkedinIn },
];

const EASE = [0.25, 0.1, 0.25, 1] as [number, number, number, number];
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, ease: EASE, delay },
});

export default function Hero() {
  const scrollToContact = () =>
    document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
  const scrollToExperience = () =>
    document.querySelector("#experience")?.scrollIntoView({ behavior: "smooth" });

  return (
    <section className="relative min-h-screen flex flex-col justify-between pt-28 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full flex-1 flex flex-col justify-center">

        {/* Top label row */}
        <motion.div {...fadeUp(0.1)} className="flex items-center gap-3 mb-10">
          <span className="section-label">Portfolio 2025</span>
          <span className="block h-px w-10" style={{ backgroundColor: "var(--color-border)" }} />
          <span
            className="font-mono text-[0.65rem] tracking-widest uppercase"
            style={{ color: "var(--color-text-muted)" }}
          >
            La Réunion · Remote
          </span>
        </motion.div>

        {/* Main grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">

          {/* Name block — left */}
          <div className="lg:col-span-8">
            {/* Role label */}
            <motion.p
              {...fadeUp(0.2)}
              className="font-mono text-[0.68rem] tracking-[0.22em] uppercase mb-5"
              style={{ color: "var(--color-accent)" }}
            >
              Fullstack Developer
            </motion.p>

            {/* Massive name */}
            <div className="overflow-visible">
              <motion.h1
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.9, delay: 0.25 }}
                className="font-display leading-[0.88] tracking-tight"
                style={{ fontSize: "clamp(3.8rem, 10vw, 10rem)" }}
              >
                <span className="block" style={{ color: "var(--color-text)" }}>Aina</span>
                <span className="block" style={{ color: "var(--color-text)" }}>Raphaël</span>
                {/* Last name — outlined, slightly overflows */}
                <span
                  className="block font-display italic"
                  style={{
                    color: "transparent",
                    WebkitTextStroke: "1.5px var(--color-text)",
                    letterSpacing: "-0.02em",
                    marginLeft: "-0.04em",
                  }}
                >
                  Rakotonaivo
                </span>
              </motion.h1>
            </div>

            {/* Tagline */}
            <motion.p
              {...fadeUp(0.55)}
              className="mt-8 max-w-md text-sm leading-relaxed"
              style={{ color: "var(--color-text-muted)" }}
            >
              5 ans à jongler entre les études et la vraie vie.
              Aujourd&apos;hui en CDI, je construis des produits
              qui tiennent en prod — mobile, web, infrastructure.
            </motion.p>

            {/* CTAs */}
            <motion.div {...fadeUp(0.65)} className="mt-8 flex flex-wrap items-center gap-8">
              <button
                onClick={scrollToExperience}
                className="font-mono text-[0.7rem] tracking-widest uppercase link-underline"
                style={{ color: "var(--color-text)" }}
              >
                Mon parcours ↓
              </button>
              <button
                onClick={scrollToContact}
                className="font-mono text-[0.7rem] tracking-widest uppercase"
                style={{ color: "var(--color-accent)", textDecoration: "underline", textUnderlineOffset: "4px" }}
              >
                Me contacter →
              </button>
            </motion.div>

            {/* Social */}
            <motion.div {...fadeUp(0.75)} className="mt-8 flex items-center gap-5 pb-12">
              {socialLinks.map((s, i) => (
                <span key={s.label} className="flex items-center gap-5">
                  {i > 0 && (
                    <span
                      className="block w-3 h-px"
                      style={{ backgroundColor: "var(--color-border)" }}
                    />
                  )}
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 font-mono text-[0.65rem] tracking-widest uppercase transition-colors"
                    style={{ color: "var(--color-text-muted)" }}
                    onMouseEnter={e => (e.currentTarget.style.color = "var(--color-accent)")}
                    onMouseLeave={e => (e.currentTarget.style.color = "var(--color-text-muted)")}
                  >
                    <s.Icon size={11} />
                    {s.label}
                  </a>
                </span>
              ))}
            </motion.div>
          </div>

          {/* Photo — right */}
          <motion.div
            {...fadeUp(0.35)}
            className="lg:col-span-4 flex justify-end items-end pb-12"
          >
            <div className="relative">
              <div
                className="absolute -top-4 -right-4 w-full h-full pointer-events-none"
                style={{ border: "1px solid var(--color-border)" }}
              />
              <div
                className="relative overflow-hidden"
                style={{ width: 240, height: 300 }}
              >
                <Image
                  src="/images/raph.jpeg"
                  alt="Aina Raphaël Rakotonaivo"
                  fill
                  className="object-cover photo-treatment"
                  priority
                  sizes="240px"
                />
                <div
                  className="absolute bottom-0 left-0 right-0 h-[3px]"
                  style={{ backgroundColor: "var(--color-accent)" }}
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Marquee band */}
      <div
        className="border-t border-b py-3 overflow-hidden"
        style={{
          borderColor: "var(--color-border)",
          backgroundColor: "var(--color-surface)",
        }}
        aria-hidden
      >
        <div className="flex">
          <div className="marquee-track">
            {techMarquee.map((name, i) => {
              const logo = getTechLogo(name);
              return (
                <span
                  key={i}
                  className="font-mono text-[0.6rem] tracking-widest uppercase flex items-center gap-2"
                  style={{ color: "var(--color-text-muted)" }}
                >
                  {logo
                    ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={logo} alt="" aria-hidden width={12} height={12}
                           style={{ objectFit: "contain", opacity: 0.5, flexShrink: 0 }} />
                    )
                    : <span className="block w-3 h-3" />
                  }
                  {name}
                  <span style={{ color: "var(--color-accent)", opacity: 0.5 }}>·</span>
                </span>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
