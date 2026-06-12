"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { siteConfig } from "@/lib/metadata";
import { SiGitlab } from "react-icons/si";
import { FaLinkedinIn } from "react-icons/fa";
import posthog from "posthog-js";

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

export default function Contact() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText(siteConfig.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const reveal = (delay = 0) => ({
    initial: { opacity: 0, y: 24 },
    animate: inView ? { opacity: 1, y: 0 } : {},
    transition: { duration: 0.65, ease: EASE, delay },
  });

  return (
    <section id="contact" ref={ref} className="py-[var(--section-padding)]">
      <div className="container-hanzo">
        {/* Split layout */}
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:gap-24">

          {/* Colonne gauche — typographie éditoriale */}
          <div className="flex flex-col justify-center">
            <motion.span {...reveal(0)} className="section-label mb-4 block">
              Contact
            </motion.span>

            <motion.h2
              {...reveal(0.08)}
              className="heading-lg font-display text-[var(--color-text)] mb-6 leading-[0.98]"
            >
              Travaillons
              <br />
              <span
                className="bg-clip-text text-transparent"
                style={{
                  backgroundImage: "linear-gradient(92deg, #2e5bff 15%, #10b981 100%)",
                }}
              >
                ensemble.
              </span>
            </motion.h2>

            <motion.p {...reveal(0.16)} className="text-base leading-relaxed text-muted max-w-sm mb-10">
              Disponible pour des opportunités CDI, remote ou des projets ambitieux.
              La Réunion, Paris, Lyon, Toulouse — ou derrière un écran.
            </motion.p>

            {/* Email cliquable + copie */}
            <motion.div {...reveal(0.22)} className="mb-8">
              <button
                type="button"
                onClick={copyEmail}
                className="group inline-flex items-center gap-3 text-left"
              >
                <span className="font-display text-lg font-medium tracking-tight text-[var(--color-text)] transition-colors duration-200 group-hover:text-[var(--color-primary)] md:text-xl">
                  {siteConfig.email}
                </span>
                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold transition-all duration-300 ${
                    copied
                      ? "bg-[#10b981] text-white"
                      : "bg-[var(--color-surface-2)] text-muted group-hover:bg-[var(--color-secondary)] group-hover:text-[var(--color-primary)]"
                  }`}
                >
                  {copied ? "Copié ✓" : "Copier"}
                </span>
              </button>
            </motion.div>

            {/* Réseaux sociaux — pills plates */}
            <motion.div {...reveal(0.28)} className="flex flex-wrap gap-3">
              <a
                href={siteConfig.gitlab}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => posthog.capture("social_clicked", { network: "gitlab", source: "contact" })}
                className="group inline-flex items-center gap-2.5 rounded-full border border-[var(--color-border)] bg-white px-5 py-2.5 text-sm font-semibold text-[var(--color-text)] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#FC6D26] hover:text-[#FC6D26] hover:shadow-[0_8px_20px_-8px_rgba(252,109,38,0.4)]"
              >
                <SiGitlab
                  size={16}
                  className="transition-colors duration-300 group-hover:text-[#FC6D26]"
                />
                GitLab
              </a>
              <a
                href={siteConfig.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => posthog.capture("social_clicked", { network: "linkedin", source: "contact" })}
                className="group inline-flex items-center gap-2.5 rounded-full border border-[var(--color-border)] bg-white px-5 py-2.5 text-sm font-semibold text-[var(--color-text)] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#0A66C2] hover:text-[#0A66C2] hover:shadow-[0_8px_20px_-8px_rgba(10,102,194,0.4)]"
              >
                <FaLinkedinIn
                  size={16}
                  className="transition-colors duration-300 group-hover:text-[#0A66C2]"
                />
                LinkedIn
              </a>
            </motion.div>
          </div>

          {/* Colonne droite — card "Prendre contact" */}
          <motion.div
            initial={{ opacity: 0, y: 32, scale: 0.98 }}
            animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{ duration: 0.7, ease: EASE, delay: 0.18 }}
            className="relative overflow-hidden rounded-3xl border border-[var(--color-border)] bg-white p-8 shadow-[0_1px_3px_rgba(10,10,20,0.04),0_20px_50px_-24px_rgba(10,10,20,0.14)] md:p-10"
          >
            {/* Halo décoratif */}
            <div
              aria-hidden
              className="pointer-events-none absolute -top-20 -right-20 h-64 w-64 rounded-full opacity-30 blur-3xl"
              style={{ background: "radial-gradient(circle, rgba(46,91,255,0.35), transparent 65%)" }}
            />

            <div className="relative flex flex-col gap-6">
              {/* Disponibilité */}
              <span className="badge-open self-start">Ouvert aux échanges</span>

              <div>
                <p className="text-sm font-medium text-muted mb-1">Me répondre sous 24h</p>
                <p className="font-display text-2xl font-semibold tracking-tight text-[var(--color-text)]">
                  Prêt à démarrer dès maintenant.
                </p>
              </div>

              <p className="text-sm leading-relaxed text-muted">
                CDI, freelance, mission courte ou longue — parlons-en autour d&apos;un café
                virtuel. Je réponds toujours.
              </p>

              <div className="flex flex-col gap-3 sm:flex-row">
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="flex-1 rounded-full bg-[var(--color-primary)] px-6 py-3.5 text-center text-sm font-semibold text-white shadow-[0_8px_20px_-8px_rgba(46,91,255,0.6)] transition-all duration-300 hover:-translate-y-0.5 hover:brightness-110"
                >
                  M&apos;envoyer un email
                </a>
                <a
                  href="/CV_Raphael_Rakotonaivo.pdf"
                  download
                  onClick={() => posthog.capture("cv_downloaded", { source: "contact" })}
                  className="flex-1 rounded-full border border-[var(--color-border)] bg-white px-6 py-3.5 text-center text-sm font-semibold text-[var(--color-text)] transition-all duration-300 hover:-translate-y-0.5 hover:border-[var(--color-primary)] hover:text-[var(--color-primary)]"
                >
                  Télécharger le CV
                </a>
              </div>

              {/* Localisation */}
              <div className="flex items-center gap-2 pt-2 border-t border-[var(--color-border)]">
  
                <span className="text-sm text-muted">
                  La Réunion · Remote OK · Paris / Lyon / Toulouse
                </span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Footer */}
        <footer className="mt-20 pt-8 border-t border-[var(--color-border)] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-display text-lg font-light tracking-widest text-muted">RAR</p>
          <p className="text-sm text-muted text-center">
            © {new Date().getFullYear()} Aina Raphaël Rakotonaivo — La Réunion
          </p>
        </footer>
      </div>
    </section>
  );
}
