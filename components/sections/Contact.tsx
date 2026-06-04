"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { siteConfig } from "@/lib/metadata";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { RevealWords } from "@/components/ui/Reveal";
import { SiGithub, SiGitlab } from "react-icons/si";
import { FaLinkedinIn } from "react-icons/fa";
import posthog from "posthog-js";

const socialLinks = [
  { label: "GitHub", href: siteConfig.github, Icon: SiGithub },
  { label: "GitLab", href: siteConfig.gitlab, Icon: SiGitlab },
  { label: "LinkedIn", href: siteConfig.linkedin, Icon: FaLinkedinIn },
];

export default function Contact() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="contact" ref={ref} className="py-[var(--section-padding)]">
      <div className="container-hanzo">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="card-hanzo p-10 md:p-16 text-center max-w-3xl mx-auto"
        >
          <span className="badge-open mb-8">Ouvert aux échanges</span>

          <SectionLabel>Contact</SectionLabel>
          <h2 className="heading-lg font-display text-[var(--color-text)] mt-4 mb-6">
            <RevealWords text="Restons en contact" />
          </h2>

          <p className="text-muted text-base leading-relaxed max-w-md mx-auto mb-10">
            Disponible pour des opportunités CDI, remote ou des projets formateurs.
            La Réunion, Paris, Lyon, Toulouse — ou derrière un écran.
          </p>

          <div className="flex flex-wrap justify-center gap-4 mb-10">
            <a href={`mailto:${siteConfig.email}`} className="btn-primary">
              M&apos;envoyer un email
            </a>
            <a
              href="/CV_Raphael_Rakotonaivo.pdf"
              download
              className="btn-secondary"
              onClick={() => posthog.capture("cv_downloaded", { source: "contact" })}
            >
              Télécharger le CV
            </a>
          </div>

          <div className="flex flex-wrap justify-center gap-6">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-muted hover:text-[var(--color-text)] transition-colors"
              >
                <link.Icon size={16} />
                {link.label}
              </a>
            ))}
          </div>
        </motion.div>

        <footer className="mt-16 pt-8 border-t border-[var(--color-border)] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-display text-lg text-[var(--color-text)]">RAR</p>
          <p className="text-sm text-muted">
            © {new Date().getFullYear()} Aina Raphaël Rakotonaivo — La Réunion
          </p>
        </footer>
      </div>
    </section>
  );
}
