"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { StoreButtons } from "@/components/StoreButtons";
import { KeyboardSkills } from "@/components/KeyboardSkills";
import { BrowserPreview } from "@/components/BrowserPreview";
import { TechMarquee } from "@/components/TechMarquee";
import { SiGithub, SiGitlab } from "react-icons/si";
import { FaLinkedin } from "react-icons/fa";
import { Menu, X, Moon, Sun } from "lucide-react";
import carImg    from "./assets/car.png";
import sportImg  from "./assets/sport.png";
import voyageImg from "./assets/voyage.png";
import veloImg   from "./assets/velo.png";

const passionImages = {
  car:    { src: carImg,    alt: "Voiture" },
  gym:    { src: sportImg,  alt: "Sport" },
  travel: { src: voyageImg, alt: "Voyage" },
  bike:   { src: veloImg,   alt: "Vélo & randonnée" },
} as const;

const passionAccents: Record<string, string> = {
  car:    "#f97316",
  gym:    "#6366f1",
  travel: "#0ea5e9",
  bike:   "#10b981",
};

type Lang  = "fr" | "en";
type Theme = "light" | "dark";

// Age dynamique — anniversaire le 2 août 1999
function getAge(): number {
  const today = new Date();
  const birth = new Date(1999, 7, 2); // mois 0-indexé → 7 = août
  let age = today.getFullYear() - birth.getFullYear();
  if (today < new Date(today.getFullYear(), 7, 2)) age--;
  return age;
}
const AGE = getAge();

// ─── Animation helpers ────────────────────────────────────────────────────────
const ease = [0.22, 1, 0.36, 1] as const;
const vp   = { once: true, margin: "-60px" } as const;

function up(delay = 0)       { return { initial: { opacity: 0, y: 28 },    animate:     { opacity: 1, y: 0 },    transition: { duration: 0.7,  ease, delay } }; }
function scroll(delay = 0)   { return { initial: { opacity: 0, y: 20 },    whileInView: { opacity: 1, y: 0 },    viewport: vp, transition: { duration: 0.6,  ease, delay } }; }
function fade(delay = 0)     { return { initial: { opacity: 0 },           whileInView: { opacity: 1 },          viewport: vp, transition: { duration: 0.5,  delay } }; }
function fromLeft(delay = 0) { return { initial: { opacity: 0, x: -16 },   whileInView: { opacity: 1, x: 0 },   viewport: vp, transition: { duration: 0.5,  ease, delay } }; }
function scaleIn(delay = 0)  { return { initial: { opacity: 0, scale: 0.96 }, whileInView: { opacity: 1, scale: 1 }, viewport: vp, transition: { duration: 0.45, ease, delay } }; }

// ─── Translations ─────────────────────────────────────────────────────────────
const T = {
  fr: {
    nav: { parcours: "Parcours", projet: "Projet", stack: "Stack", contact: "Me contacter" },
    hero: {
      status: "En poste · La Réunion",
      title: "Développeur Fullstack",
      spec: "",
      story: "J'ai travaillé en cuisine et en caisse pendant que j'apprenais à coder.",
      story2: "Mention Bien à chaque diplôme.",
      cta: "Mon parcours",
      ctaContact: "Me contacter",
      ctaGithub: "Voir mon code",
    },
    stats: [
      { value: "4×",    label: "Mention Bien",         sub: "Bac · Licence · Master 2 · CNFDI" },
      { value: "5 ans", label: "en double vie",         sub: "études + emploi en parallèle" },
      { value: "10+",   label: "technos en prod",       sub: "React Native, NestJS, Supabase…" },
      { value: "CDI",   label: "Fullstack depuis 2025", sub: "plüm · La Réunion" },
    ],
    about: {
      eyebrow: "À propos",
      heading: "Qui je suis",
      p1: "Développeur de {age} ans, j'ai grandi à Madagascar avant de rejoindre La Réunion. J'ai travaillé pour financer mes études — en cuisine, en caisse, comme inventoriste — et j'ai obtenu Mention Bien à chaque étape.",
      p2: "Ce qui me motive dans le code, c'est de construire des choses utiles, performantes et sécurisées. Chaque application est une brique que j'apporte à la société.",
      p3: "Tout seul on va vite, ensemble on va plus loin.",
      p4: "En CDI chez plüm, je cherche à continuer à grandir — à La Réunion, en métropole (Toulouse, Lyon, Paris) ou en remote.",
    },
    histoire: {
      eyebrow: "Ce que mon CV ne dit pas",
      heading: "Pendant que j'apprenais à coder,\nje travaillais pour financer mes études.",
      desc: "Un uniforme le matin, un terminal le soir. De 2019 à aujourd'hui, j'ai cumulé emplois alimentaires et formation. Ce n'est pas anecdotique — c'est ce qui m'a appris à livrer sous contrainte et à ne jamais lâcher.",
      jobsTitle: "Les jobs en parallèle",
      diplomasTitle: "Les diplômes obtenus",
      punchline: "Les deux en même temps.",
      punchlineSub: "Mention Bien à chaque étape.",
    },
    projet: {
      eyebrow: "Ce que je construis",
      status: "En production · CDI depuis sept. 2024",
      badge: "Fullstack · Mobile + Web + API",
      desc: "Une plateforme qui met en relation des particuliers avec des prestataires de services à domicile — ménage, garde d'enfant, bricolage... J'en assure le développement fullstack complet : de l'architecture technique aux interfaces utilisateurs, en passant par les intégrations tierces et le pipeline de livraison.",
    },
    plumCards: [
      { cat: "Application mobile",    detail: "React Native · React Navigation, notifications push FCM, paiement Stripe, auth JWT / Magic Link, Redux Toolkit, React Query" },
      { cat: "Site web & Back-office", detail: "Next.js SSR/SSG · interface gestionnaires, tableaux de bord temps réel, Supabase Realtime, intégrations Figma pixel-perfect" },
      { cat: "API & Infrastructure",  detail: "NestJS · REST, PostgreSQL, Supabase Auth & Serverless, Docker, Docker Compose, Nginx, Scaleway" },
      { cat: "CI/CD & documentation", detail: "GitHub Actions · pipeline CI/CD, migrations Supabase, Storybook, OpenAPI/Swagger, ADR, Mermaid.js" },
    ],
    prevXp:      { eyebrow: "Expériences précédentes" },
    competences: { eyebrow: "Stack technique", hint: "Passe sur les touches pour les enfoncer." },
    passions:    { eyebrow: "Hors du code",   heading: "Ce qui me ressource" },
    contact: {
      eyebrow: "Contact",
      heading: "On discute ?",
      desc: "Ouvert à des projets bénévoles si c'est formateur et stimulant, un CDI, ou un CDD — à La Réunion comme en métropole. Et si tu passes juste pour dire bonjour, c'est bon aussi. ☕",
      open: "Ouvert aux opportunités",
      cta: "M'envoyer un message",
    },
    footer: "La Réunion",
  },
  en: {
    nav: { parcours: "Career", projet: "Project", stack: "Stack", contact: "Contact me" },
    hero: {
      status: "Employed · Réunion Island",
      title: "Fullstack Developer",
      spec: "",
      story: "I worked in kitchens and at cash registers while learning to code.",
      story2: "Honours at every degree.",
      cta: "My journey",
      ctaContact: "Contact me",
      ctaGithub: "See my code",
    },
    stats: [
      { value: "4×",    label: "Honours",              sub: "High School · BSc · MSc · CNFDI" },
      { value: "5 yrs", label: "parallel lives",        sub: "studying + working side by side" },
      { value: "10+",   label: "techs in prod",         sub: "React Native, NestJS, Supabase…" },
      { value: "CDI",   label: "Fullstack since 2025",  sub: "plüm · Réunion Island" },
    ],
    about: {
      eyebrow: "About",
      heading: "Who I am",
      p1: "A {age}-year-old Malagasy developer, I grew up in Madagascar before moving to Réunion Island. I worked to fund my studies — in kitchens, at checkouts, as an inventory clerk — and graduated with Honours every time.",
      p2: "What drives me in coding is building things that are useful, performant, and secure. Every application is a contribution I make to society.",
      p3: "Alone you go fast, together you go further.",
      p4: "On a permanent contract at plüm, I'm looking to keep growing — on Réunion Island, in mainland France (Toulouse, Lyon, Paris) or remotely.",
    },
    histoire: {
      eyebrow: "What my CV doesn't say",
      heading: "While learning to code,\nI was working to fund my studies.",
      desc: "A uniform in the morning, a terminal in the evening. From 2019 to today, I juggled side jobs and education. That's not incidental — it taught me to deliver under pressure and never give up.",
      jobsTitle: "Side jobs",
      diplomasTitle: "Degrees obtained",
      punchline: "Both at the same time.",
      punchlineSub: "Honours at every step.",
    },
    projet: {
      eyebrow: "What I build",
      status: "In production · Permanent contract since Sept. 2024",
      badge: "Fullstack · Mobile + Web + API",
      desc: "A platform connecting individuals with home service providers — cleaning, childcare, handyman... I handle the entire fullstack development: from technical architecture to user interfaces, third-party integrations, and the delivery pipeline.",
    },
    plumCards: [
      { cat: "Mobile application",    detail: "React Native · React Navigation, FCM push notifications, Stripe payments, JWT / Magic Link auth, Redux Toolkit, React Query" },
      { cat: "Website & Back-office", detail: "Next.js SSR/SSG · manager interface, real-time dashboards, Supabase Realtime, pixel-perfect Figma integration" },
      { cat: "API & Infrastructure",  detail: "NestJS · REST, PostgreSQL, Supabase Auth & Serverless, Docker, Docker Compose, Nginx, Scaleway" },
      { cat: "CI/CD & documentation", detail: "GitHub Actions · CI/CD pipeline, Supabase migrations, Storybook, OpenAPI/Swagger, ADR, Mermaid.js" },
    ],
    prevXp:      { eyebrow: "Previous experience" },
    competences: { eyebrow: "Tech stack", hint: "Hover the keys to press them." },
    passions:    { eyebrow: "Beyond the code", heading: "What keeps me going" },
    contact: {
      eyebrow: "Contact",
      heading: "Let's talk?",
      desc: "Open to volunteer projects if they're meaningful and help me grow, a permanent role, or a fixed-term contract — in Réunion Island or mainland France. Or just drop by to say hi. ☕",
      open: "Open to opportunities",
      cta: "Send me a message",
    },
    footer: "Réunion Island",
  },
} as const;

// ─── Passions data ────────────────────────────────────────────────────────────
const passionItems = {
  fr: [
    { key: "car",    emoji: "🚗", bg: "from-orange-50  to-amber-50   dark:from-orange-950/40  dark:to-amber-950/40",   title: "Passionné de voitures", desc: "Mon père était mécanicien. Entretenir une voiture, c'est aussi entretenir les souvenirs des moments passés ensemble." },
    { key: "gym",    emoji: "💪", bg: "from-blue-50    to-indigo-50  dark:from-blue-950/40    dark:to-indigo-950/40",  title: "Musculation & marche",  desc: "Je fais de la muscu et de la marche régulièrement — pour garder la forme et vider la tête." },
    { key: "travel", emoji: "✈️", bg: "from-sky-50     to-cyan-50    dark:from-sky-950/40     dark:to-cyan-950/40",    title: "Voyager",               desc: "J'ai eu la chance de découvrir plusieurs pays et régions.", places: ["Madagascar (6 provinces)", "La Réunion", "Île Maurice", "Paris", "Toulouse", "Genève"] },
    { key: "bike",   emoji: "🚴", bg: "from-emerald-50 to-green-50   dark:from-emerald-950/40 dark:to-green-950/40",   title: "Vélo & randonnée",      desc: "De temps en temps, pour me ressourcer dans la nature de La Réunion." },
  ],
  en: [
    { key: "car",    emoji: "🚗", bg: "from-orange-50  to-amber-50   dark:from-orange-950/40  dark:to-amber-950/40",   title: "Car enthusiast",        desc: "My father was a mechanic. Working on a car is a way to keep those shared moments alive." },
    { key: "gym",    emoji: "💪", bg: "from-blue-50    to-indigo-50  dark:from-blue-950/40    dark:to-indigo-950/40",  title: "Gym & walking",         desc: "I work out and walk regularly — to stay in shape and clear my head." },
    { key: "travel", emoji: "✈️", bg: "from-sky-50     to-cyan-50    dark:from-sky-950/40     dark:to-cyan-950/40",    title: "Travelling",            desc: "I've been lucky to discover several countries and regions.", places: ["Madagascar (6 provinces)", "Réunion Island", "Mauritius", "Paris", "Toulouse", "Geneva"] },
    { key: "bike",   emoji: "🚴", bg: "from-emerald-50 to-green-50   dark:from-emerald-950/40 dark:to-green-950/40",   title: "Cycling & hiking",      desc: "Occasionally, to recharge in Réunion's nature." },
  ],
};

// ─── Data ─────────────────────────────────────────────────────────────────────
const parallelJobs = {
  fr: [
    { period: "2019 — 2020",           role: "Employé polyvalent",         company: "Burger King Chaudron" },
    { period: "2021 — 2022",           role: "Caissier — Service Civique", company: "Solidarité étudiante" },
    { period: "Avr. — Juin 2022",      role: "Inventoriste",               company: "IVALIS" },
    { period: "Juin — Oct. 2022",      role: "Cuisinier intérimaire",      company: "SHISO Burger Sainte Marie" },
    { period: "Oct. 2022 — Août 2023", role: "Employé de restaurant",      company: "Restaurant universitaire" },
    { period: "Avr. 2024 — ...",       role: "Cuisinier",                  company: "Shiso Burger Saint Denis" },
  ],
  en: [
    { period: "2019 — 2020",           role: "General staff",              company: "Burger King Chaudron" },
    { period: "2021 — 2022",           role: "Cashier — Civic Service",    company: "Student solidarity" },
    { period: "Apr. — Jun. 2022",      role: "Inventory clerk",            company: "IVALIS" },
    { period: "Jun. — Oct. 2022",      role: "Temp cook",                  company: "SHISO Burger Sainte Marie" },
    { period: "Oct. 2022 — Aug. 2023", role: "Restaurant employee",        company: "University restaurant" },
    { period: "Apr. 2024 — ...",       role: "Cook",                       company: "Shiso Burger Saint Denis" },
  ],
};

const diplomas = {
  fr: [
    { year: "2017", degree: "Baccalauréat Scientifique Série C",   mention: "Mention Bien" },
    { year: "2021", degree: "Commerce électronique et e-business", sub: "CNFDI",                    mention: "Mention Bien" },
    { year: "2023", degree: "Licence Informatique",                sub: "Université de La Réunion", mention: "Mention Bien" },
    { year: "2025", degree: "Master 2 Informatique",               sub: "Université de La Réunion", mention: "Mention Bien" },
  ],
  en: [
    { year: "2017", degree: "Scientific Baccalaureate (Series C)", mention: "Honours" },
    { year: "2021", degree: "E-commerce & E-business",             sub: "CNFDI",                   mention: "Honours" },
    { year: "2023", degree: "BSc Computer Science",                sub: "University of Réunion",   mention: "Honours" },
    { year: "2025", degree: "MSc Computer Science",                sub: "University of Réunion",   mention: "Honours" },
  ],
};

const prevXp = {
  fr: [
    { period: "Jan. — Juin 2024",       role: "Développeur — TER",          company: "LIM · Université de La Réunion", description: "À la demande du Professeur Dominique Gay, suivi de l'activité des étudiants sur l'UE de Systèmes d'Exploitation : connexions à un serveur Linux de l'Université, visualisation des tendances (avant/pendant/après les cours, avant les partiels), et prédiction des résultats à partir des patterns d'activité. Stack : Python, Dash, PostgreSQL." },
    { period: "Sept. — Déc. 2023",      role: "Développeur — TER",          company: "LIM · Université de La Réunion", description: "Mise à jour du prototype Maïdo VR (visite virtuelle du laboratoire atmosphérique du Maïdo, datant de 2012). Collaboration en équipe de 4 : migration C# / Unity vers les versions actuelles, compatibilité Windows moderne, renforcement de la sécurité, intégration temps réel de la température et de l'humidité via l'API Météo France Réunion." },
    { period: "Déc. 2022 — Jan. 2023",  role: "Développeur web — Stage",    company: "ESIGE · Madagascar",             description: "Application web de gestion numérique pour une université privée à Madagascar : gestion des cours en ligne et du processus d'examen." },
  ],
  en: [
    { period: "Jan. — Jun. 2024",       role: "Developer — Research Project", company: "LIM · University of Réunion",  description: "At the request of Professor Dominique Gay, built a student activity tracking system for the Operating Systems course: Linux server connection logs, trend visualisation (before/during/after class, before exams), and result prediction based on activity patterns. Stack: Python, Dash, PostgreSQL." },
    { period: "Sep. — Dec. 2023",       role: "Developer — Research Project", company: "LIM · University of Réunion",  description: "Updated the Maïdo VR prototype (virtual tour of the Maïdo atmospheric lab, originally from 2012). Team of 4: C# / Unity migration to current versions, modern Windows compatibility, security hardening, real-time temperature & humidity integration via the Météo France Réunion API." },
    { period: "Dec. 2022 — Jan. 2023",  role: "Web Developer — Internship",   company: "ESIGE · Madagascar",           description: "Digital management web application for a private university in Madagascar: online course management and examination process." },
  ],
};

const SOCIAL = [
  { href: "https://github.com/RaphaelRAK",                                        label: "GitHub",   Icon: SiGithub },
  { href: "https://gitlab.com/raphael137",                                         label: "GitLab",   Icon: SiGitlab },
  { href: "https://www.linkedin.com/in/aina-rapha%C3%ABl-rakotonaivo-80a821189/", label: "LinkedIn", Icon: FaLinkedin },
] as const;

const KEY_TECHS = ["React Native", "Next.js", "NestJS", "TypeScript", "Docker", "Supabase"];

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function Home() {
  const [lang,     setLang]     = useState<Lang>("fr");
  const [theme,    setTheme]    = useState<Theme>("light");
  const [menuOpen, setMenuOpen] = useState(false);
  const t = T[lang];

  // Toggles the `dark` class on <html>
  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  const navLinks = [
    { href: "#histoire",    label: t.nav.parcours },
    { href: "#projet",      label: t.nav.projet },
    { href: "#competences", label: t.nav.stack },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50 transition-colors duration-300">

      {/* ——— NAVIGATION ——— */}
      <header className="sticky top-0 z-50 bg-white/95 dark:bg-zinc-950/95 backdrop-blur-sm border-b border-zinc-100 dark:border-zinc-800 transition-colors duration-300">
        <nav className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <span className="text-sm font-bold tracking-tight text-indigo-600 dark:text-indigo-400">RAR</span>

          <div className="hidden sm:flex items-center gap-5 text-sm text-zinc-600 dark:text-zinc-400">
            {navLinks.map((l) => (
              <a key={l.href} href={l.href} className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">
                {l.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-2">
            {/* Social icons — desktop */}
            <div className="hidden sm:flex items-center gap-1">
              {SOCIAL.map(({ href, label, Icon }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
                  className="p-1.5 text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">
                  <Icon style={{ width: 16, height: 16 }} />
                </a>
              ))}
            </div>

            {/* Theme toggle */}
            <button
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
              aria-label="Toggle theme"
              className="p-1.5 text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors rounded-md border border-zinc-200 dark:border-zinc-700 hover:border-zinc-400 dark:hover:border-zinc-500"
            >
              {theme === "dark" ? <Sun size={14} /> : <Moon size={14} />}
            </button>

            {/* Lang toggle */}
            <button
              onClick={() => setLang(lang === "fr" ? "en" : "fr")}
              className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors px-2 py-1 rounded-md border border-zinc-200 dark:border-zinc-700 hover:border-zinc-400 dark:hover:border-zinc-500"
            >
              {lang === "fr" ? "EN" : "FR"}
            </button>

            {/* Contact — desktop */}
            <a href="#contact"
              className="hidden sm:inline-flex text-zinc-900 dark:text-zinc-100 font-semibold border border-zinc-900 dark:border-zinc-100 rounded-full px-4 py-1.5 text-xs hover:bg-zinc-900 dark:hover:bg-zinc-100 hover:text-white dark:hover:text-zinc-900 transition-colors">
              {t.nav.contact}
            </a>

            {/* Hamburger — mobile */}
            <button onClick={() => setMenuOpen(!menuOpen)}
              className="sm:hidden p-1.5 text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors" aria-label="Menu">
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </nav>

        {/* Mobile menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.25, ease }}
              className="sm:hidden overflow-hidden border-t border-zinc-100 dark:border-zinc-800 bg-white dark:bg-zinc-950"
            >
              <div className="px-6 py-4 flex flex-col gap-4">
                {navLinks.map((l) => (
                  <a key={l.href} href={l.href} onClick={() => setMenuOpen(false)}
                    className="text-sm font-medium text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">
                    {l.label}
                  </a>
                ))}
                <a href="#contact" onClick={() => setMenuOpen(false)}
                  className="text-sm font-semibold text-white bg-zinc-900 dark:bg-zinc-100 dark:text-zinc-900 rounded-full px-4 py-2 text-center hover:bg-indigo-600 dark:hover:bg-indigo-500 dark:hover:text-white transition-colors">
                  {t.nav.contact}
                </a>
                <div className="flex items-center gap-3 pt-1">
                  {SOCIAL.map(({ href, label, Icon }) => (
                    <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
                      className="p-1.5 text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">
                      <Icon style={{ width: 18, height: 18 }} />
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* ——— HERO ——— */}
      <section className="relative overflow-hidden max-w-4xl mx-auto px-6 pt-16 pb-20 sm:pt-24 sm:pb-28">
        <div className="pointer-events-none absolute -top-20 -right-20 w-[500px] h-[500px] rounded-full bg-indigo-100/60 dark:bg-indigo-900/20 blur-3xl" />
        <div className="pointer-events-none absolute inset-0 opacity-20 dark:opacity-10"
          style={{ backgroundImage: "radial-gradient(circle, #a5b4fc 1px, transparent 1px)", backgroundSize: "28px 28px" }}
        />

        <div className="relative grid lg:grid-cols-[1fr_auto] gap-10 items-center">
          <div>
            <motion.div {...up(0)} className="flex items-center gap-2 mb-8">
              <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-sm shadow-emerald-300" />
              <p className="text-sm text-zinc-500 dark:text-zinc-400 tracking-wide">{t.hero.status}</p>
            </motion.div>

            <motion.h1 {...up(0.1)}
              className="text-5xl sm:text-7xl lg:text-8xl font-bold tracking-tighter text-zinc-900 dark:text-zinc-50 leading-none mb-4">
              Aina Raphaël
              <br />
              <span className="text-indigo-600 dark:text-indigo-400">Rakotonaivo</span>
            </motion.h1>

            <motion.p {...up(0.22)} className="text-2xl sm:text-3xl font-bold text-zinc-800 dark:text-zinc-100 mb-1">
              {t.hero.title}
            </motion.p>
            <motion.p {...up(0.28)} className="text-base sm:text-lg font-semibold text-indigo-500 dark:text-indigo-400 mb-5">
              {t.hero.spec}
            </motion.p>

            <motion.div {...up(0.34)} className="flex flex-wrap gap-2 mb-7">
              {KEY_TECHS.map((tech) => (
                <span key={tech}
                  className="text-xs font-semibold px-3 py-1 bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 rounded-full border border-zinc-200 dark:border-zinc-700">
                  {tech}
                </span>
              ))}
            </motion.div>

            <motion.p {...up(0.42)} className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-lg mb-1">
              {t.hero.story}
            </motion.p>
            <motion.p {...up(0.46)} className="text-base sm:text-lg font-semibold text-indigo-600 dark:text-indigo-400 mb-10">
              {t.hero.story2}
            </motion.p>

            <motion.div {...up(0.54)} className="flex flex-wrap gap-3">
              <a href="#histoire"
                className="inline-flex items-center gap-2 text-sm font-semibold bg-indigo-600 text-white px-6 py-3 rounded-full hover:bg-indigo-700 transition-colors shadow-md shadow-indigo-200 dark:shadow-indigo-900/40">
                {t.hero.cta} <span aria-hidden>↓</span>
              </a>
              <a href="#contact"
                className="inline-flex items-center gap-2 text-sm font-semibold text-zinc-700 dark:text-zinc-300 border border-zinc-300 dark:border-zinc-600 px-6 py-3 rounded-full hover:border-zinc-600 dark:hover:border-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors">
                {t.hero.ctaContact}
              </a>
              <a href="https://gitlab.com/raphael137" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-semibold text-zinc-700 dark:text-zinc-300 border border-zinc-300 dark:border-zinc-600 px-5 py-3 rounded-full hover:border-orange-500 hover:bg-orange-50 dark:hover:bg-orange-950/30 transition-colors">
                <SiGitlab style={{ width: 15, height: 15, color: "#fc6d26" }} /> GitLab
              </a>
              <a href="https://github.com/RaphaelRAK" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-semibold text-zinc-700 dark:text-zinc-300 border border-zinc-300 dark:border-zinc-600 px-5 py-3 rounded-full hover:border-zinc-900 dark:hover:border-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors">
                <SiGithub style={{ width: 15, height: 15 }} /> GitHub
              </a>
            </motion.div>
          </div>

          {/* Photo */}
          <motion.div {...up(0.5)} className="flex shrink-0 justify-center">
            <div className="relative w-44 h-44 lg:w-60 lg:h-60 rounded-full overflow-hidden border-4 border-white dark:border-zinc-800 shadow-2xl shadow-indigo-200/60 dark:shadow-indigo-900/40 ring-1 ring-indigo-100 dark:ring-indigo-900">
              <Image src="/raph.jpeg" alt="Aina Raphaël Rakotonaivo" fill className="object-cover" priority />
            </div>
          </motion.div>
        </div>
      </section>

      {/* ——— TECH MARQUEE ——— */}
      <TechMarquee />

      {/* ——— À PROPOS ——— */}
      <section className="max-w-4xl mx-auto px-6 py-20 sm:py-24">
        <motion.p {...fade(0)} className="text-xs font-semibold tracking-widest text-indigo-500 dark:text-indigo-400 uppercase mb-4">
          {t.about.eyebrow}
        </motion.p>
        <motion.h2 {...scroll(0.05)} className="text-3xl sm:text-4xl font-bold text-zinc-900 dark:text-zinc-50 leading-tight mb-10">
          {t.about.heading}
        </motion.h2>
        <div className="grid sm:grid-cols-2 gap-8 max-w-3xl">
          <motion.p {...fade(0.0)} className="text-base text-zinc-600 dark:text-zinc-400 leading-relaxed">{t.about.p1.replace("{age}", String(AGE))}</motion.p>
          <motion.p {...fade(0.1)} className="text-base text-zinc-600 dark:text-zinc-400 leading-relaxed">{t.about.p2}</motion.p>
          <motion.p {...fade(0.2)} className="text-base font-semibold text-zinc-800 dark:text-zinc-200 italic border-l-4 border-indigo-200 dark:border-indigo-700 pl-4">
            &ldquo;{t.about.p3}&rdquo;
          </motion.p>
          <motion.p {...fade(0.3)} className="text-base text-zinc-600 dark:text-zinc-400 leading-relaxed">{t.about.p4}</motion.p>
        </div>
      </section>

      {/* ——— STATS BANNER ——— */}
      <section className="bg-zinc-950 py-14">
        <div className="max-w-4xl mx-auto px-6 grid grid-cols-2 sm:grid-cols-4 gap-8">
          {t.stats.map((s, i) => (
            <motion.div key={s.value} {...scroll(i * 0.1)}>
              <p className="text-4xl sm:text-5xl font-bold text-indigo-400 leading-none mb-1">{s.value}</p>
              <p className="text-sm font-semibold text-zinc-100 mb-0.5">{s.label}</p>
              <p className="text-xs text-zinc-400">{s.sub}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ——— PLÜM SERVICES ——— */}
      <section id="projet" className="bg-zinc-950 py-20">
        <div className="max-w-4xl mx-auto px-6">
          <motion.p {...fade(0)} className="text-xs font-semibold tracking-widest text-indigo-400 uppercase mb-10">
            {t.projet.eyebrow}
          </motion.p>
          <div className="grid lg:grid-cols-[1fr_360px] gap-10 items-start">
            <div>
              <motion.div {...scroll(0)} className="flex items-center gap-3 mb-3">
                <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-sm shadow-emerald-500/50" />
                <span className="text-sm text-zinc-400 tracking-wide">{t.projet.status}</span>
              </motion.div>
              <motion.h2 {...scroll(0.08)} className="text-4xl sm:text-5xl font-bold text-white tracking-tight mb-2">
                Plüm Services
              </motion.h2>
              <motion.span {...fade(0.15)}
                className="inline-block text-xs font-semibold text-indigo-300 bg-indigo-400/10 border border-indigo-400/20 px-3 py-1 rounded-full mb-6">
                {t.projet.badge}
              </motion.span>
              <motion.p {...fade(0.2)} className="text-zinc-300 text-base leading-relaxed max-w-xl mb-8">
                {t.projet.desc}
              </motion.p>
              <div className="grid sm:grid-cols-2 gap-3 mb-8">
                {t.plumCards.map((item, i) => (
                  <motion.div key={item.cat} {...scaleIn(i * 0.08)}
                    className="bg-zinc-900 rounded-2xl p-5 border border-zinc-800 hover:border-zinc-600 transition-colors">
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
            <BrowserPreview url="https://www.plumservices.co/" displayUrl="plumservices.co" />
          </div>
        </div>
      </section>

      {/* ——— L'HISTOIRE ——— */}
      <section id="histoire" className="bg-zinc-50 dark:bg-zinc-900 py-20 sm:py-28 transition-colors duration-300">
        <div className="max-w-4xl mx-auto px-6">
          <motion.p {...fade(0)} className="text-xs font-semibold tracking-widest text-indigo-500 dark:text-indigo-400 uppercase mb-4">
            {t.histoire.eyebrow}
          </motion.p>
          <motion.h2 {...scroll(0.05)} className="text-3xl sm:text-4xl font-bold text-zinc-900 dark:text-zinc-50 leading-tight max-w-2xl mb-6">
            {t.histoire.heading.split("\n").map((line, i) => (
              <span key={i}>{line}{i === 0 && <br />}</span>
            ))}
          </motion.h2>
          <motion.p {...fade(0.15)} className="text-base text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-xl mb-16">
            {t.histoire.desc}
          </motion.p>

          <div className="grid sm:grid-cols-2 gap-10 sm:gap-16">
            <div>
              <motion.p {...fade(0)} className="text-xs font-semibold tracking-widest text-zinc-500 dark:text-zinc-500 uppercase mb-7">
                {t.histoire.jobsTitle}
              </motion.p>
              <div className="space-y-5">
                {parallelJobs[lang].map((j, i) => (
                  <motion.div key={i} {...fromLeft(i * 0.07)} className="flex gap-4">
                    <div className="flex flex-col items-center pt-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-zinc-400 dark:bg-zinc-600 shrink-0" />
                      {i < parallelJobs[lang].length - 1 && <span className="w-px grow bg-zinc-200 dark:bg-zinc-700 mt-1" />}
                    </div>
                    <div className="pb-4">
                      <p className="text-xs text-zinc-500 dark:text-zinc-500 mb-0.5">{j.period}</p>
                      <p className="text-sm font-semibold text-zinc-800 dark:text-zinc-200">{j.role}</p>
                      <p className="text-sm text-zinc-500 dark:text-zinc-400">{j.company}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <div>
              <motion.p {...fade(0)} className="text-xs font-semibold tracking-widest text-zinc-500 dark:text-zinc-500 uppercase mb-7">
                {t.histoire.diplomasTitle}
              </motion.p>
              <div className="space-y-4">
                {diplomas[lang].map((d, i) => (
                  <motion.div key={i} {...scaleIn(i * 0.1)}
                    className="flex gap-4 p-4 rounded-2xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 hover:border-indigo-200 dark:hover:border-indigo-700 hover:bg-indigo-50/30 dark:hover:bg-indigo-900/20 transition-colors">
                    <span className="text-2xl font-bold text-zinc-300 dark:text-zinc-600 shrink-0 leading-none pt-0.5 tabular-nums">
                      {d.year}
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-zinc-800 dark:text-zinc-200">{d.degree}</p>
                      {"sub" in d && d.sub && <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5 mb-1.5">{d.sub}</p>}
                      <span className="inline-block text-xs font-semibold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/30 border border-indigo-100 dark:border-indigo-800 px-2.5 py-0.5 rounded-full">
                        {d.mention}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          <motion.div {...scroll(0)} className="mt-16 pt-12 border-t border-zinc-200 dark:border-zinc-700">
            <p className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-zinc-50 leading-tight">
              {t.histoire.punchline}
              <br />
              <span className="text-indigo-600 dark:text-indigo-400">{t.histoire.punchlineSub}</span>
            </p>
          </motion.div>
        </div>
      </section>

      {/* ——— EXPÉRIENCES PRÉCÉDENTES ——— */}
      <section className="max-w-4xl mx-auto px-6 py-20">
        <motion.p {...fade(0)} className="text-xs font-semibold tracking-widest text-zinc-500 dark:text-zinc-500 uppercase mb-12">
          {t.prevXp.eyebrow}
        </motion.p>
        <div className="space-y-10">
          {prevXp[lang].map((x, i) => (
            <motion.div key={i} {...scroll(i * 0.1)} className="grid sm:grid-cols-[200px_1fr] gap-2 sm:gap-10">
              <div>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 font-medium">{x.period}</p>
                <p className="text-xs text-zinc-500 dark:text-zinc-500 mt-0.5">{x.company}</p>
              </div>
              <div>
                <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-100 mb-2">{x.role}</h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">{x.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ——— STACK TECHNIQUE ——— */}
      <section id="competences" className="bg-zinc-50 dark:bg-zinc-900 py-20 transition-colors duration-300">
        <div className="max-w-4xl mx-auto px-6">
          <motion.p {...fade(0)} className="text-xs font-semibold tracking-widest text-zinc-500 dark:text-zinc-500 uppercase mb-2">
            {t.competences.eyebrow}
          </motion.p>
          <motion.p {...fade(0.1)} className="text-sm text-zinc-400 dark:text-zinc-500 mb-12">
            {t.competences.hint}
          </motion.p>
          <KeyboardSkills />
        </div>
      </section>

      {/* ——— PASSIONS ——— */}
      <section className="max-w-4xl mx-auto px-6 py-20 sm:py-24">
        <motion.p {...fade(0)} className="text-xs font-semibold tracking-widest text-indigo-500 dark:text-indigo-400 uppercase mb-4">
          {t.passions.eyebrow}
        </motion.p>
        <motion.h2 {...scroll(0.05)} className="text-3xl sm:text-4xl font-bold text-zinc-900 dark:text-zinc-50 leading-tight mb-10">
          {t.passions.heading}
        </motion.h2>
        <div className="flex flex-col gap-10">
          {passionItems[lang].map((item, i) => {
            const reversed = i % 2 === 1;
            const img = passionImages[item.key as keyof typeof passionImages];
            const accent = passionAccents[item.key] ?? "#6366f1";
            return (
              <motion.div
                key={item.key}
                {...scaleIn(i * 0.08)}
                className={`relative flex flex-col ${reversed ? "sm:flex-row-reverse" : "sm:flex-row"} items-center gap-8 rounded-3xl p-8 bg-white dark:bg-zinc-900 transition-colors duration-300`}
                style={{ boxShadow: "0 0 0 1px rgba(0,0,0,0.05), 0 8px 40px rgba(0,0,0,0.10), 0 -4px 20px rgba(0,0,0,0.04)" }}
              >
                {/* Animated border that draws around the card */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none overflow-visible">
                  <motion.rect
                    x="1.5" y="1.5"
                    width="calc(100% - 3px)" height="calc(100% - 3px)"
                    rx="22" ry="22"
                    fill="none"
                    stroke={accent}
                    strokeWidth="2"
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.6, ease: "easeInOut", delay: i * 0.15 }}
                  />
                </svg>
                {img && (
                  <div className="shrink-0 w-40 h-40 relative">
                    <Image src={img.src} alt={img.alt} fill className="object-contain drop-shadow-lg" />
                  </div>
                )}
                <div>
                  <p className="text-xl font-bold text-zinc-900 dark:text-zinc-100 mb-2">{item.title}</p>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">{item.desc}</p>
                  {"places" in item && item.places && (
                    <div className="flex flex-wrap gap-2 mt-4">
                      {item.places.map((place) => (
                        <span key={place} className="text-xs font-semibold px-3 py-1 bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 rounded-full">
                          {place}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* ——— CONTACT ——— */}
      <section id="contact" className="relative overflow-hidden max-w-4xl mx-auto px-6 py-20 sm:py-28">
        <div className="pointer-events-none absolute -bottom-20 -left-20 w-96 h-96 rounded-full bg-indigo-100/50 dark:bg-indigo-900/20 blur-3xl" />
        <div className="relative">
          <motion.p {...fade(0)} className="text-xs font-semibold tracking-widest text-indigo-500 dark:text-indigo-400 uppercase mb-6">
            {t.contact.eyebrow}
          </motion.p>
          <motion.h2 {...scroll(0.05)} className="text-4xl sm:text-5xl font-bold text-zinc-900 dark:text-zinc-50 tracking-tight leading-tight mb-4">
            {t.contact.heading}
          </motion.h2>
          <motion.p {...fade(0.1)} className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/30 border border-emerald-200 dark:border-emerald-800 px-3 py-1 rounded-full mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            {t.contact.open}
          </motion.p>
          <motion.p {...fade(0.15)} className="text-base text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-md mb-10">
            {t.contact.desc}
          </motion.p>
          <motion.div {...scroll(0.2)} className="flex flex-col sm:flex-row gap-4 mb-10">
            <a href="mailto:raphael.rakotonaivo@gmail.com"
              className="inline-flex items-center justify-center gap-2 text-sm font-semibold bg-indigo-600 text-white px-7 py-3.5 rounded-full hover:bg-indigo-700 transition-colors shadow-md shadow-indigo-200 dark:shadow-indigo-900/30">
              {t.contact.cta} →
            </a>
          </motion.div>
          <motion.div {...fade(0.3)} className="flex items-center gap-5">
            {SOCIAL.map(({ href, label, Icon }) => (
              <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">
                <Icon style={{ width: 18, height: 18 }} />
                <span className="font-medium">{label}</span>
              </a>
            ))}
          </motion.div>
        </div>
      </section>

      <footer className="border-t border-zinc-100 dark:border-zinc-800 py-6 transition-colors duration-300">
        <div className="max-w-4xl mx-auto px-6 flex items-center justify-between">
          <p className="text-xs text-zinc-400 dark:text-zinc-500">© 2025 Aina Raphaël Rakotonaivo</p>
          <div className="flex items-center gap-4">
            {SOCIAL.map(({ href, label, Icon }) => (
              <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
                className="text-zinc-400 dark:text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300 transition-colors">
                <Icon style={{ width: 14, height: 14 }} />
              </a>
            ))}
            <p className="text-xs text-zinc-400 dark:text-zinc-500">{t.footer}</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
