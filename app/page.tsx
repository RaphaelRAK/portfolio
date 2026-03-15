"use client";

import { motion } from "framer-motion";
import { StoreButtons } from "@/components/StoreButtons";
import { KeyboardSkills } from "@/components/KeyboardSkills";
import { BrowserPreview } from "@/components/BrowserPreview";

// ─── Animation helpers ────────────────────────────────────────────────────────
const ease = [0.22, 1, 0.36, 1] as const;

const vp = { once: true, margin: "-60px" } as const;

/** Hero: plays on mount */
function up(delay = 0) {
  return {
    initial: { opacity: 0, y: 28 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.7, ease, delay },
  };
}

/** Sections: plays when scrolled into view */
function scroll(delay = 0) {
  return {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: vp,
    transition: { duration: 0.6, ease, delay },
  };
}

/** Sections: fade only (for text blocks) */
function fade(delay = 0) {
  return {
    initial: { opacity: 0 },
    whileInView: { opacity: 1 },
    viewport: vp,
    transition: { duration: 0.5, delay },
  };
}

/** From left (timeline items) */
function fromLeft(delay = 0) {
  return {
    initial: { opacity: 0, x: -16 },
    whileInView: { opacity: 1, x: 0 },
    viewport: vp,
    transition: { duration: 0.5, ease, delay },
  };
}

/** Scale in (cards) */
function scaleIn(delay = 0) {
  return {
    initial: { opacity: 0, scale: 0.96 },
    whileInView: { opacity: 1, scale: 1 },
    viewport: vp,
    transition: { duration: 0.45, ease, delay },
  };
}

// ─── Data ─────────────────────────────────────────────────────────────────────
const parallelJobs = [
  { period: "2019 — 2020", role: "Employé polyvalent", company: "Burger King Chaudron" },
  { period: "2021 — 2022", role: "Caissier — Service Civique", company: "Solidarité étudiante" },
  { period: "Avr. — Juin 2022", role: "Inventoriste", company: "IVALIS" },
  { period: "Juin — Oct. 2022", role: "Cuisinier intérimaire", company: "SHISO Burger Sainte Marie" },
  { period: "Oct. 2022 — Août 2023", role: "Employé de restaurant", company: "Restaurant universitaire" },
  { period: "Avr. 2024 — ...", role: "Cuisinier", company: "Shiso Burger Saint Denis" },
];

const diplomas = [
  { year: "2017", degree: "Baccalauréat Scientifique Série C", mention: "Mention Bien" },
  { year: "2021", degree: "Commerce électronique et e-business", sub: "CNFDI", mention: "Mention Bien" },
  { year: "2023", degree: "Licence Informatique", sub: "Université de La Réunion", mention: "Mention Bien" },
  { year: "2025", degree: "Master 2 Informatique", sub: "Université de La Réunion", mention: "Mention Bien" },
];

const prevXp = [
  {
    period: "Jan. — Juin 2024",
    role: "Développeur — TER",
    description:
      "Service de suivi des activités étudiants sur l'UE de Systèmes d'Exploitation. Visualisation via tableaux de bord interactifs (Dash, Python, PostgreSQL).",
    company: "LIM · Université de La Réunion",
  },
  {
    period: "Sept. — Déc. 2023",
    role: "Développeur — TER",
    description:
      "Mise à jour du prototype Maïdo VR, visite virtuelle du laboratoire atmosphérique du Maïdo. Collaboration en équipe, intégration de nouvelles fonctionnalités.",
    company: "LIM · Université de La Réunion",
  },
  {
    period: "Déc. 2022 — Jan. 2023",
    role: "Développeur web — Stage",
    description:
      "Application web de gestion numérique pour une université privée : gestion des cours en ligne et du processus d'examen.",
    company: "ESIGE · Madagascar",
  },
];

// ─── Phone Mockup ─────────────────────────────────────────────────────────────

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function Home() {
  return (
    <div className="min-h-screen bg-white text-zinc-900">

      {/* Navigation */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-zinc-100">
        <nav className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <span className="text-sm font-bold tracking-tight text-indigo-600">ARR</span>
          <div className="flex items-center gap-6 text-sm text-zinc-600">
            <a href="#histoire" className="hover:text-zinc-900 transition-colors hidden sm:block">Parcours</a>
            <a href="#projet" className="hover:text-zinc-900 transition-colors hidden sm:block">Projet</a>
            <a href="#competences" className="hover:text-zinc-900 transition-colors hidden sm:block">Stack</a>
            <a
              href="#contact"
              className="text-zinc-900 font-semibold border border-zinc-900 rounded-full px-4 py-1.5 text-xs hover:bg-zinc-900 hover:text-white transition-colors"
            >
              Me contacter
            </a>
          </div>
        </nav>
      </header>

      {/* ——— HERO ——— */}
      <section className="relative overflow-hidden max-w-4xl mx-auto px-6 pt-16 pb-20 sm:pt-24 sm:pb-28">
        <div className="pointer-events-none absolute -top-20 -right-20 w-[500px] h-[500px] rounded-full bg-indigo-100/60 blur-3xl" />
        <div
          className="pointer-events-none absolute inset-0 opacity-30"
          style={{
            backgroundImage: "radial-gradient(circle, #a5b4fc 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />

        <div className="relative">
          <motion.div {...up(0)} className="flex items-center gap-2 mb-10">
            <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-sm shadow-emerald-300" />
            <p className="text-sm text-zinc-500 tracking-wide">En poste · La Réunion</p>
          </motion.div>

          <motion.h1
            {...up(0.12)}
            className="text-5xl sm:text-7xl lg:text-8xl font-bold tracking-tighter text-zinc-900 leading-none mb-6"
          >
            Aina Raphaël
            <br />
            <span className="text-indigo-600">Rakotonaivo</span>
          </motion.h1>

          <motion.p
            {...up(0.3)}
            className="text-xl sm:text-2xl font-semibold text-zinc-800 max-w-xl leading-snug mb-5"
          >
            J&apos;ai travaillé en cuisine et en caisse pendant que j&apos;apprenais à coder.
            Mention Bien à chaque diplôme.
          </motion.p>

          <motion.p
            {...up(0.45)}
            className="text-base text-zinc-500 max-w-lg leading-relaxed mb-12"
          >
            Développeur fullstack basé à La Réunion chez <span className="text-zinc-700 font-medium">plüm</span>. Je construis des applications mobiles et
            web de bout en bout — de l&apos;architecture backend aux interfaces utilisateurs.
          </motion.p>

          <motion.div {...up(0.58)} className="flex flex-wrap gap-3">
            <a
              href="#histoire"
              className="inline-flex items-center gap-2 text-sm font-semibold bg-indigo-600 text-white px-6 py-3 rounded-full hover:bg-indigo-700 transition-colors shadow-md shadow-indigo-200"
            >
              Mon parcours <span aria-hidden>↓</span>
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 text-sm font-semibold text-zinc-700 border border-zinc-300 px-6 py-3 rounded-full hover:border-zinc-600 hover:bg-zinc-50 transition-colors"
            >
              Me contacter
            </a>
          </motion.div>
        </div>
      </section>

      {/* ——— STATS BANNER ——— */}
      <section className="bg-zinc-950 py-14">
        <div className="max-w-4xl mx-auto px-6 grid grid-cols-2 sm:grid-cols-4 gap-8">
          {[
            { value: "4×", label: "Mention Bien", sub: "Bac · Licence · Master 2 · CNFDI" },
            { value: "5 ans", label: "en double vie", sub: "études + emploi en parallèle" },
            { value: "10+", label: "technos en prod", sub: "React Native, NestJS, Supabase…" },
            { value: "CDI", label: "Fullstack depuis 2025", sub: "plüm · La Réunion" },
          ].map((s, i) => (
            <motion.div key={s.value} {...scroll(i * 0.1)}>
              <p className="text-4xl sm:text-5xl font-bold text-indigo-400 leading-none mb-1">{s.value}</p>
              <p className="text-sm font-semibold text-zinc-100 mb-0.5">{s.label}</p>
              <p className="text-xs text-zinc-400">{s.sub}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ——— L'HISTOIRE ——— */}
      <section id="histoire" className="max-w-4xl mx-auto px-6 py-20 sm:py-28">
        <motion.p {...fade(0)} className="text-xs font-semibold tracking-widest text-indigo-500 uppercase mb-4">
          Ce que mon CV ne dit pas
        </motion.p>
        <motion.h2 {...scroll(0.05)} className="text-3xl sm:text-4xl font-bold text-zinc-900 leading-tight max-w-2xl mb-6">
          Pendant que j&apos;apprenais à coder,
          <br />
          je travaillais pour financer mes études.
        </motion.h2>
        <motion.p {...fade(0.15)} className="text-base text-zinc-600 leading-relaxed max-w-xl mb-16">
          Un uniforme le matin, un terminal le soir. De 2019 à aujourd&apos;hui, j&apos;ai cumulé
          emplois alimentaires et formation. Ce n&apos;est pas anecdotique — c&apos;est ce qui
          m&apos;a appris à livrer sous contrainte et à ne jamais lâcher.
        </motion.p>

        <div className="grid sm:grid-cols-2 gap-10 sm:gap-16">
          {/* Jobs */}
          <div>
            <motion.p {...fade(0)} className="text-xs font-semibold tracking-widest text-zinc-500 uppercase mb-7">
              Les jobs en parallèle
            </motion.p>
            <div className="space-y-5">
              {parallelJobs.map((j, i) => (
                <motion.div key={i} {...fromLeft(i * 0.07)} className="flex gap-4">
                  <div className="flex flex-col items-center pt-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-zinc-400 shrink-0" />
                    {i < parallelJobs.length - 1 && <span className="w-px grow bg-zinc-200 mt-1" />}
                  </div>
                  <div className="pb-4">
                    <p className="text-xs text-zinc-500 mb-0.5">{j.period}</p>
                    <p className="text-sm font-semibold text-zinc-800">{j.role}</p>
                    <p className="text-sm text-zinc-500">{j.company}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Diplomas */}
          <div>
            <motion.p {...fade(0)} className="text-xs font-semibold tracking-widest text-zinc-500 uppercase mb-7">
              Les diplômes obtenus
            </motion.p>
            <div className="space-y-4">
              {diplomas.map((d, i) => (
                <motion.div
                  key={i}
                  {...scaleIn(i * 0.1)}
                  className="flex gap-4 p-4 rounded-2xl border border-zinc-100 bg-zinc-50 hover:border-indigo-100 hover:bg-indigo-50/30 transition-colors"
                >
                  <span className="text-2xl font-bold text-zinc-300 shrink-0 leading-none pt-0.5 tabular-nums">
                    {d.year}
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-zinc-800">{d.degree}</p>
                    {d.sub && <p className="text-xs text-zinc-500 mt-0.5 mb-1.5">{d.sub}</p>}
                    <span className="inline-block text-xs font-semibold text-indigo-600 bg-indigo-50 border border-indigo-100 px-2.5 py-0.5 rounded-full">
                      {d.mention}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Punchline */}
        <motion.div {...scroll(0)} className="mt-16 pt-12 border-t border-zinc-100">
          <p className="text-2xl sm:text-3xl font-bold text-zinc-900 leading-tight">
            Les deux en même temps.
            <br />
            <span className="text-indigo-600">Mention Bien à chaque étape.</span>
          </p>
        </motion.div>
      </section>

      {/* ——— PLÜM SERVICE ——— */}
      <section id="projet" className="bg-zinc-950 py-20">
        <div className="max-w-4xl mx-auto px-6">
          <motion.p {...fade(0)} className="text-xs font-semibold tracking-widest text-indigo-400 uppercase mb-10">
            Ce que je construis
          </motion.p>

          <div className="grid lg:grid-cols-[1fr_220px] gap-10 items-start">
            <div>
              <motion.div {...scroll(0)} className="flex items-center gap-3 mb-3">
                <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-sm shadow-emerald-500/50" />
                <span className="text-sm text-zinc-400 tracking-wide">
                  En production · CDI depuis sept. 2024
                </span>
              </motion.div>

              <motion.h2 {...scroll(0.08)} className="text-4xl sm:text-5xl font-bold text-white tracking-tight mb-2">
                Plüm Services
              </motion.h2>
              <motion.span
                {...fade(0.15)}
                className="inline-block text-xs font-semibold text-indigo-300 bg-indigo-400/10 border border-indigo-400/20 px-3 py-1 rounded-full mb-6"
              >
                Fullstack · Mobile + Web + API
              </motion.span>

              <motion.p {...fade(0.2)} className="text-zinc-300 text-base leading-relaxed max-w-xl mb-8">
                Une plateforme qui met en relation des particuliers avec des prestataires de
                services à domicile — ménage, garde d&apos;enfant, bricolage... J&apos;en assure
                le développement fullstack complet : de l&apos;architecture technique aux
                interfaces utilisateurs, en passant par les intégrations tierces et le pipeline
                de livraison.
              </motion.p>

              <div className="grid sm:grid-cols-2 gap-3 mb-8">
                {[
                  {
                    cat: "Application mobile",
                    detail: "React Native · React Navigation, notifications push FCM, paiement Stripe, auth JWT / Magic Link, Redux Toolkit, React Query",
                  },
                  {
                    cat: "Site web & Back-office",
                    detail: "Next.js SSR/SSG · interface gestionnaires, tableaux de bord temps réel, Supabase Realtime, intégrations Figma pixel-perfect",
                  },
                  {
                    cat: "API & Infrastructure",
                    detail: "NestJS · REST, PostgreSQL, Supabase Auth & Serverless, Docker, Docker Compose, Nginx, Scaleway",
                  },
                  {
                    cat: "CI/CD & documentation",
                    detail: "GitHub Actions · pipeline CI/CD, migrations Supabase, Storybook, OpenAPI/Swagger, ADR, Mermaid.js",
                  },
                ].map((item, i) => (
                  <motion.div
                    key={item.cat}
                    {...scaleIn(i * 0.08)}
                    className="bg-zinc-900 rounded-2xl p-5 border border-zinc-800 hover:border-zinc-600 transition-colors"
                  >
                    <p className="text-xs font-semibold text-zinc-400 uppercase tracking-wide mb-2">{item.cat}</p>
                    <p className="text-sm text-zinc-300 leading-relaxed">{item.detail}</p>
                  </motion.div>
                ))}
              </div>

              <motion.div {...fade(0.3)} className="flex flex-wrap gap-2 mb-2">
                {["React Native", "Next.js", "NestJS", "TypeScript", "Supabase", "PostgreSQL", "Docker", "Nginx", "Scaleway", "Stripe", "Redux Toolkit", "React Query"].map((tag) => (
                  <span key={tag} className="text-xs px-3 py-1.5 bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 rounded-full">
                    {tag}
                  </span>
                ))}
              </motion.div>

              <StoreButtons />
            </div>

            <BrowserPreview
              url="https://www.plumservices.co/"
              displayUrl="plumservices.co"
            />
          </div>
        </div>
      </section>

      {/* ——— EXPÉRIENCES PRÉCÉDENTES ——— */}
      <section className="max-w-4xl mx-auto px-6 py-20">
        <motion.p {...fade(0)} className="text-xs font-semibold tracking-widest text-zinc-500 uppercase mb-12">
          Expériences précédentes
        </motion.p>
        <div className="space-y-10">
          {prevXp.map((x, i) => (
            <motion.div key={i} {...scroll(i * 0.1)} className="grid sm:grid-cols-[200px_1fr] gap-2 sm:gap-10">
              <div>
                <p className="text-sm text-zinc-600 font-medium">{x.period}</p>
                <p className="text-xs text-zinc-500 mt-0.5">{x.company}</p>
              </div>
              <div>
                <h3 className="text-base font-semibold text-zinc-900 mb-2">{x.role}</h3>
                <p className="text-sm text-zinc-600 leading-relaxed">{x.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ——— COMPÉTENCES ——— */}
      <section id="competences" className="bg-zinc-50 py-20">
        <div className="max-w-4xl mx-auto px-6">
          <motion.p {...fade(0)} className="text-xs font-semibold tracking-widest text-zinc-500 uppercase mb-2">
            Stack technique
          </motion.p>
          <motion.p {...fade(0.1)} className="text-sm text-zinc-400 mb-12">
            Passe sur les touches pour les enfoncer.
          </motion.p>
          <KeyboardSkills />
        </div>
      </section>

      {/* ——— CONTACT ——— */}
      <section id="contact" className="relative overflow-hidden max-w-4xl mx-auto px-6 py-20 sm:py-28">
        <div className="pointer-events-none absolute -bottom-20 -left-20 w-96 h-96 rounded-full bg-indigo-100/50 blur-3xl" />
        <div className="relative">
          <motion.p {...fade(0)} className="text-xs font-semibold tracking-widest text-indigo-500 uppercase mb-6">
            Contact
          </motion.p>
          <motion.h2 {...scroll(0.05)} className="text-4xl sm:text-5xl font-bold text-zinc-900 tracking-tight leading-tight mb-6">
            On discute ?
          </motion.h2>
          <motion.p {...fade(0.15)} className="text-base text-zinc-600 leading-relaxed max-w-md mb-12">
            Disponible pour des échanges sur des projets ambitieux, des opportunités en CDI ou
            en freelance. Je réponds vite.
          </motion.p>
          <motion.div {...scroll(0.2)} className="flex flex-col sm:flex-row gap-4">
            <a
              href="mailto:raphael.rakotonaivo@gmail.com"
              className="inline-flex items-center justify-center gap-2 text-sm font-semibold bg-indigo-600 text-white px-7 py-3.5 rounded-full hover:bg-indigo-700 transition-colors shadow-md shadow-indigo-200"
            >
              raphael.rakotonaivo@gmail.com
            </a>
            <a
              href="tel:0692828074"
              className="inline-flex items-center justify-center gap-2 text-sm font-semibold text-zinc-700 border border-zinc-300 px-7 py-3.5 rounded-full hover:border-zinc-600 hover:bg-zinc-50 transition-colors"
            >
              06 92 82 80 74
            </a>
          </motion.div>
        </div>
      </section>

      <footer className="border-t border-zinc-100 py-6">
        <div className="max-w-4xl mx-auto px-6 flex items-center justify-between">
          <p className="text-xs text-zinc-400">© 2025 Aina Raphaël Rakotonaivo</p>
          <p className="text-xs text-zinc-400">La Réunion</p>
        </div>
      </footer>
    </div>
  );
}
