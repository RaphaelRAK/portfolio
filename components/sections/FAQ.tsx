"use client";

import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { RevealWords } from "@/components/ui/Reveal";
import { siteConfig } from "@/lib/metadata";

const faqItems = [
  {
    question: "Quels types de projets prenez-vous en charge ?",
    answer:
      "Applications mobiles (React Native), plateformes web (Next.js), APIs backend (NestJS), intégrations paiement (Stripe), bases de données PostgreSQL/Supabase et déploiement Docker.",
  },
  {
    question: "Travaillez-vous en remote ?",
    answer:
      "Oui. Basé à La Réunion, je suis ouvert au remote vers Paris, Lyon, Toulouse ou toute structure française compatible.",
  },
  {
    question: "Quel est votre stack principal ?",
    answer:
      "React Native et Next.js côté front, NestJS et TypeScript côté back, PostgreSQL via Supabase, Docker/Scaleway pour l'infra, plus Stripe, Firebase et n8n selon les besoins.",
  },
  {
    question: "Où peut-on voir votre code ?",
    answer:
      "L'essentiel de mon travail (plüm, Revo) est en dépôt privé — code propriétaire d'entreprise ou produit commercial. Je présente volontiers l'architecture et des extraits de code en entretien, et mon profil GitLab est ouvert pour échanger.",
  },
  {
    question: "Êtes-vous disponible pour de nouvelles opportunités ?",
    answer:
      "Actuellement en CDI chez plüm. Je reste ouvert aux échanges pour des projets formateurs, collaborations ou opportunités futures — n'hésitez pas à me contacter.",
  },
  {
    question: "Comment puis-je vous contacter ?",
    answer: `Par email à ${siteConfig.email}, via LinkedIn ou GitLab. Je réponds généralement sous 48h.`,
  },
];

export default function FAQ() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" ref={ref} className="py-[var(--section-padding)]">
      <div className="container-hanzo max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-[var(--section-header-gap)]"
        >
          <SectionLabel>FAQ</SectionLabel>
          <h2 className="heading-lg font-display text-[var(--color-text)] mt-[var(--section-label-gap)]">
            <RevealWords text="Vos questions, répondues" />
          </h2>
        </motion.div>

        <div className="space-y-3">
          {faqItems.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <motion.div
                key={item.question}
                initial={{ opacity: 0, y: 12 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: index * 0.06, duration: 0.4 }}
                className="card-hanzo overflow-hidden"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full flex items-center justify-between gap-4 p-6 text-left cursor-pointer"
                >
                  <span className="font-medium text-[var(--color-text)] text-base md:text-lg">
                    {item.question}
                  </span>
                  <span className="faq-chevron text-muted text-xl shrink-0" data-open={isOpen}>
                    ↓
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                    >
                      <p className="px-6 pb-6 text-muted text-sm leading-relaxed border-t border-[var(--color-border)] pt-4">
                        {item.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.4 }}
          className="mt-10 text-center"
        >
          <p className="text-muted text-sm mb-4">Une autre question ?</p>
          <a href={`mailto:${siteConfig.email}`} className="btn-primary">
            M&apos;écrire un email
          </a>
        </motion.div>
      </div>
    </section>
  );
}
