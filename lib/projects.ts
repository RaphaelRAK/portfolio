export interface Project {
  slug: string;
  title: string;
  shortDesc: string;
  longDesc: string;
  stack: string[];
  period: string;
  context: string;
  role: string;
  links: {
    github?: string;
    gitlab?: string;
    live?: string;
    appStore?: string;
    playStore?: string;
  };
  images?: string[];
  previewNotice?: string;
  featured: boolean;
}

export const projects: Project[] = [
  {
    slug: "plum-services",
    title: "Plüm Services",
    shortDesc:
      "Application mobile & plateforme SaaS de gestion de services à domicile — React Native, Next.js, NestJS.",
    longDesc:
      "En CDI chez plüm depuis septembre 2024, je développe et maintiens une application mobile React Native et une plateforme web Next.js dédiées à la mise en relation entre prestataires de services à domicile et clients. Architecture microservices avec NestJS, base de données PostgreSQL gérée via Supabase, paiements intégrés via Stripe, notifications push Firebase/FCM, emails transactionnels Mailjet. Déploiement sur serveur dédié Scaleway avec Docker Compose et Nginx. Intégration de workflows d'automatisation n8n et d'un agent vocal IA via ElevenLabs.",
    stack: [
      "React Native",
      "Next.js",
      "NestJS",
      "TypeScript",
      "PostgreSQL",
      "Supabase",
      "Stripe",
      "Firebase/FCM",
      "Docker",
      "Nginx",
      "Scaleway",
      "n8n",
      "ElevenLabs",
    ],
    period: "Sept. 2024 — présent",
    context: "CDI — plüm",
    role: "Développeur Fullstack",
    links: {
      live: "https://www.plumservices.co/",
      playStore:
        "https://play.google.com/store/apps/details?id=com.plumservices.plum.prod&hl=fr",
      appStore: "https://apps.apple.com/fr/app/pl%C3%BCm-services/id6751805941",
    },
    images: [
      "/images/plum/plum-0.png",
      "/images/plum/plum-1.png",
      "/images/plum/plum-2.png",
      "/images/plum/plum-3.png",
      "/images/plum/plum-4.png",
    ],
    featured: true,
  },
  {
    slug: "ter-suivi-etudiants",
    title: "TER — Suivi Activité Étudiants",
    shortDesc:
      "Service de tracking et visualisation des activités étudiants sur les serveurs de travaux pratiques.",
    longDesc:
      "Projet de Travail d'Étude et de Recherche au Laboratoire d'Informatique et de Mathématiques (LIM) de l'Université de La Réunion. Développement d'un service de suivi des étudiants pour l'UE de Systèmes d'Exploitation. Le système enregistre les activités des étudiants sur un serveur de travail via des scripts Bash, stocke les données en base de données et les restitue via des tableaux de bord interactifs construits avec Dash (Python). Permet aux enseignants de superviser l'avancement et l'engagement de chaque étudiant en temps quasi-réel.",
    stack: ["Python", "Dash", "Bash", "PostgreSQL", "Linux"],
    period: "Jan. 2024 — Juin 2024",
    context: "TER — LIM, Université de La Réunion",
    role: "Développeur",
    links: {},
    images: ["/images/ter_lim_bash.png"],
    previewNotice:
      "Aperçu généré à partir du projet réel. La plateforme est réservée à un usage interne universitaire.",
    featured: true,
  },
  {
    slug: "maido-vr",
    title: "Maïdo VR",
    shortDesc:
      "Mise à jour du prototype de visite virtuelle du laboratoire atmosphérique du Maïdo.",
    longDesc:
      "Participation à la mise à jour du projet Maïdo VR, une visite virtuelle immersive du laboratoire atmosphérique du Piton Maïdo, situé à 2 200 m d'altitude à La Réunion. Travail en équipe pour refactoriser le code existant, intégrer de nouvelles fonctionnalités interactives et améliorer l'expérience utilisateur. Projet mené au sein du Laboratoire d'Informatique et de Mathématiques (LIM) de l'Université de La Réunion.",
    stack: ["JavaScript", "WebXR", "Three.js"],
    period: "Sept. 2023 — Déc. 2023",
    context: "TER — LIM, Université de La Réunion",
    role: "Développeur",
    links: {},
    images: ["/images/maido_vr.png"],
    previewNotice:
      "Aperçu généré à partir du projet réel. Le prototype complet n'est pas accessible publiquement.",
    featured: false,
  },
  {
    slug: "stage-esige",
    title: "Plateforme de gestion universitaire",
    shortDesc:
      "Application web de gestion numérique pour une université privée — cours en ligne et processus d'examen.",
    longDesc:
      "Stage de développement web à l'ESIGE (École Supérieure d'Informatique et de Gestion des Entreprises) à Madagascar. Sous la supervision de mon maître de stage, pilotage du développement d'une application web de gestion numérique destinée à une université privée. L'application optimise la gestion des cours en ligne, simplifie le processus d'examen et centralise l'administration des étudiants. Développement full-stack avec Laravel (PHP) pour le backend et une interface web responsive.",
    stack: ["Laravel", "PHP", "MySQL", "JavaScript", "HTML/CSS"],
    period: "Déc. 2022 — Jan. 2023",
    context: "Stage — ESIGE Madagascar",
    role: "Développeur web stagiaire",
    links: {},
    images: ["/images/esige.png"],
    previewNotice:
      "Aperçu généré à partir du projet réel. L'application est destinée à un usage interne.",
    featured: false,
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getAllSlugs(): string[] {
  return projects.map((p) => p.slug);
}
