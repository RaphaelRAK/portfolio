"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { siteConfig } from "@/lib/metadata";
import { SiGithub, SiGitlab } from "react-icons/si";
import { FaLinkedinIn } from "react-icons/fa";

export default function Contact() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="contact" ref={ref} className="py-24 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">

        {/* Thin rule */}
        <div className="h-px w-full mb-16" style={{ backgroundColor: "var(--color-border)" }} />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">

          {/* Left — main CTA */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="lg:col-span-8"
          >
            <span className="section-label block mb-8">Contact</span>

            <h2
              className="font-display font-light leading-[0.9] tracking-tight mb-8"
              style={{ fontSize: "clamp(2.5rem, 6vw, 5.5rem)", color: "var(--color-text)" }}
            >
              Construisons
              <br />
              <span className="italic" style={{ color: "transparent", WebkitTextStroke: "1px var(--color-text)" }}>
                quelque chose.
              </span>
            </h2>

            <p
              className="text-sm leading-relaxed max-w-md mb-10"
              style={{ color: "var(--color-text-muted)" }}
            >
              Ouvert aux opportunités CDI, CDD, remote, et projets formateurs.
              La Réunion, Paris, Lyon, Toulouse — ou derrière un écran.
            </p>

            {/* Email — displayed large */}
            <a
              href={`mailto:${siteConfig.email}`}
              className="group inline-flex items-baseline gap-4"
            >
              <span
                className="font-display font-light leading-none"
                style={{
                  fontSize: "clamp(1.2rem, 2.5vw, 1.8rem)",
                  color: "var(--color-text)",
                  textDecoration: "underline",
                  textUnderlineOffset: "6px",
                  textDecorationColor: "var(--color-border)",
                  transition: "text-decoration-color 0.2s",
                }}
                onMouseEnter={e => ((e.currentTarget as HTMLElement).style.textDecorationColor = "var(--color-accent)")}
                onMouseLeave={e => ((e.currentTarget as HTMLElement).style.textDecorationColor = "var(--color-border)")}
              >
                {siteConfig.email}
              </span>
              <span
                className="font-mono text-lg transition-transform duration-300 group-hover:translate-x-2"
                style={{ color: "var(--color-accent)" }}
              >
                →
              </span>
            </a>

            {/* Social links */}
            <div className="mt-10 flex items-center gap-8">
              {[
                { label: "GitHub",   href: siteConfig.github,   Icon: SiGithub   },
                { label: "GitLab",   href: siteConfig.gitlab,    Icon: SiGitlab   },
                { label: "LinkedIn", href: siteConfig.linkedin,  Icon: FaLinkedinIn },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 font-mono text-[0.62rem] tracking-widest uppercase transition-colors"
                  style={{ color: "var(--color-text-muted)" }}
                  onMouseEnter={e => ((e.currentTarget as HTMLAnchorElement).style.color = "var(--color-accent)")}
                  onMouseLeave={e => ((e.currentTarget as HTMLAnchorElement).style.color = "var(--color-text-muted)")}
                >
                  <s.Icon size={12} />
                  {s.label}
                </a>
              ))}
            </div>
          </motion.div>

          {/* Right — location + CV download */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.15, duration: 0.6 }}
            className="lg:col-span-4 mt-8 lg:mt-14"
          >
            <div className="space-y-8">
              <div>
                <p className="section-label mb-2" style={{ color: "var(--color-accent)" }}>Localisation</p>
                <p className="font-display text-lg font-normal" style={{ color: "var(--color-text)" }}>
                  La Réunion
                </p>
                <p
                  className="font-mono text-[0.6rem] tracking-widest uppercase mt-1"
                  style={{ color: "var(--color-text-muted)" }}
                >
                  Remote · Paris · Lyon · Toulouse
                </p>
              </div>

              <div
                className="pt-8"
                style={{ borderTop: "1px solid var(--color-border)" }}
              >
                <p className="section-label mb-4" style={{ color: "var(--color-accent)" }}>CV</p>
                <p
                  className="text-xs leading-relaxed mb-4"
                  style={{ color: "var(--color-text-muted)" }}
                >
                  Toutes mes expériences et compétences — mis à jour en 2025.
                </p>
                <a
                  href="/CV_Raphael_Rakotonaivo.pdf"
                  download
                  className="inline-flex items-center gap-3 font-mono text-[0.62rem] tracking-widest uppercase px-5 py-2.5 transition-all duration-200"
                  style={{
                    border: "1px solid var(--color-text)",
                    color: "var(--color-text)",
                    backgroundColor: "transparent",
                  }}
                  onMouseEnter={e => {
                    const el = e.currentTarget as HTMLAnchorElement;
                    el.style.backgroundColor = "var(--color-text)";
                    el.style.color = "var(--color-bg)";
                  }}
                  onMouseLeave={e => {
                    const el = e.currentTarget as HTMLAnchorElement;
                    el.style.backgroundColor = "transparent";
                    el.style.color = "var(--color-text)";
                  }}
                >
                  Télécharger ↓
                </a>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Footer rule */}
        <div
          className="mt-16 pt-8 flex items-center justify-between"
          style={{ borderTop: "1px solid var(--color-border)" }}
        >
          <p
            className="font-display text-xl font-light tracking-widest"
            style={{ color: "var(--color-text-muted)" }}
          >
            RAR
          </p>
          <p
            className="font-mono text-[0.58rem] tracking-widest uppercase"
            style={{ color: "var(--color-text-muted)" }}
          >
            La Réunion · {new Date().getFullYear()}
          </p>
        </div>
      </div>
    </section>
  );
}
