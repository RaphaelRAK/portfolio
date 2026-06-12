export interface Project {
  slug: string;
  title: string;
  category: string;
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
  /** Couleur d'accent de la carte (hex) */
  accent: string;
  /** Chiffres clés affichés sous le hero de la page projet */
  metrics?: { value: string; label: string }[];
  /** Ce que j'ai fait concrètement — liste à puces */
  highlights?: string[];
  /** Défis techniques : problème → solution → résultat */
  challenges?: {
    title: string;
    problem: string;
    solution: string;
    result?: string;
  }[];
  /** Flux d'architecture simplifié (rendu en pills reliées par des flèches) */
  architecture?: string[];
  /** Note sur l'accès au code source */
  sourceNote?: string;
  /** Type de média : oriente la mise en page des cartes et galeries */
  mediaType?: "mobile" | "web";
  /** Cover affichée sur la carte quand le projet n'a pas de captures */
  cover?: { title: string; subtitle: string };
}

export const projects: Project[] = [
  {
    slug: "plum-services",
    mediaType: "mobile",
    accent: "#f43f5e",
    title: "Plüm Services",
    category: "Professionnel · CDI",
    shortDesc:
      "Application mobile & plateforme SaaS de gestion de services à domicile — React Native, Next.js, NestJS.",
    longDesc:
      "Chez plüm depuis septembre 2024 — d'abord en alternance, puis en CDI depuis octobre 2025 — je développe et maintiens une application mobile React Native et une plateforme web Next.js dédiées à la mise en relation entre prestataires de services à domicile et clients. Architecture microservices avec NestJS, base de données PostgreSQL gérée via Supabase, paiements intégrés via Stripe, notifications push Firebase/FCM, emails transactionnels Mailjet. Déploiement sur serveur dédié Scaleway avec Docker Compose et Nginx. Intégration de workflows d'automatisation n8n et d'un agent vocal IA via ElevenLabs.",
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
    context: "plüm — alternance puis CDI (oct. 2025)",
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
    // TODO: remplacer/compléter par les vrais chiffres (utilisateurs actifs,
    // volume de réservations/transactions, uptime…) quand disponibles
    metrics: [
      { value: "iOS + Android", label: "publiée sur les deux stores" },
      { value: "10+", label: "services tiers intégrés" },
      { value: "0 → 1", label: "produit lancé en production" },
    ],
    highlights: [
      "Développé et publié l'application React Native sur l'App Store et Google Play",
      "Conçu l'architecture microservices NestJS : auth, réservations, paiements, notifications",
      "Intégré Stripe (paiements clients et reversements prestataires), Firebase/FCM et Mailjet",
      "Monté l'infrastructure de production : Docker Compose, Nginx, serveur dédié Scaleway",
      "Automatisé les processus métier avec n8n et intégré un agent vocal IA ElevenLabs",
    ],
    challenges: [
      {
        title: "Double encodage JSONB en base",
        problem:
          "Des payloads étaient sérialisés deux fois avant insertion : les colonnes JSONB contenaient des chaînes JSON échappées au lieu d'objets, ce qui cassait les lectures côté mobile.",
        solution:
          "Audit de toutes les écritures, normalisation de la sérialisation dans la couche service NestJS, puis migration SQL pour réparer les lignes existantes sans interruption de service.",
        result: "Lectures fiables sur toutes les plateformes, plus aucune erreur de parsing.",
      },
      {
        title: "Décalages horaires UTC+4",
        problem:
          "Les créneaux de réservation s'affichaient décalés : le serveur raisonnait en UTC alors que les utilisateurs sont à La Réunion (UTC+4), avec des cas limites autour de minuit.",
        solution:
          "Normalisation de tous les horodatages en UTC en base, conversion systématique au fuseau du client à l'affichage, et tests dédiés sur les cas limites.",
        result: "Zéro réservation décalée depuis le correctif.",
      },
      {
        title: "Race condition au déploiement",
        problem:
          "Lors des redéploiements Docker Compose sur Scaleway, deux instances pouvaient traiter les mêmes tâches ou exécuter les migrations en parallèle.",
        solution:
          "Verrouillage des migrations, healthchecks et ordre de démarrage des conteneurs maîtrisé pour fiabiliser les mises en production.",
        result: "Déploiements reproductibles, sans doublons ni état corrompu.",
      },
    ],
    architecture: [
      "App React Native",
      "API NestJS (microservices)",
      "PostgreSQL · Supabase",
      "Docker · Nginx · Scaleway",
    ],
    sourceNote:
      "Code source propriété de plüm (dépôt privé). Architecture et extraits présentables en entretien.",
  },
  {
    slug: "plum-pro",
    mediaType: "web",
    accent: "#6366f1",
    title: "Plüm BnB — Espace professionnel",
    category: "Professionnel · B2B",
    shortDesc:
      "Web app B2B pour les pros de la location courte durée — biens, prestations de ménage, agenda et facturation.",
    longDesc:
      "Plateforme web responsive destinée aux professionnels de la location courte durée (conciergeries, propriétaires multi-biens). Elle reprend la logique de l'application mobile plüm dans une version pensée pour le B2B : gestion du parc de biens, réservation et suivi des prestations de ménage, agenda, messagerie intégrée avec les prestataires, factures et paiements. Construite sur la même API NestJS que l'app mobile : la logique métier n'existe qu'une seule fois côté serveur, les deux clients restent automatiquement cohérents.",
    stack: [
      "Next.js",
      "TypeScript",
      "NestJS",
      "PostgreSQL",
      "Supabase",
      "Docker",
    ],
    period: "Sept. 2024 — présent",
    context: "plüm — alternance puis CDI (oct. 2025)",
    role: "Développeur Fullstack",
    links: {
      live: "https://bnb.plumservices.co/",
    },
    images: [
      "/images/bnb-profile/bnb-biens.png",
      "/images/bnb-profile/bnb-presta.png",
      "/images/bnb-profile/bnb-calendrier.png",
      "/images/bnb-profile/bnb-connexion.png",
    ],
    featured: true,
    highlights: [
      "Développé la web app responsive Next.js dédiée aux comptes professionnels",
      "Gestion du parc de biens et réservation des prestations de ménage",
      "Messagerie intégrée entre professionnels et prestataires",
      "Même API NestJS partagée entre mobile et web — une seule source de vérité",
    ],
    challenges: [
      {
        title: "Parité mobile / web sans duplication",
        problem:
          "Deux clients (app mobile grand public, web app pro) couvrent des fonctionnalités proches : le risque classique est de dupliquer la logique et de voir les deux diverger à chaque évolution.",
        solution:
          "Toute la logique métier vit dans l'API NestJS partagée, avec des types TypeScript communs. Les clients ne font que de l'affichage et de l'orchestration.",
        result: "Une fonctionnalité développée côté serveur est disponible sur les deux clients.",
      },
      {
        title: "Une interface pro du desktop au téléphone",
        problem:
          "Les prestataires utilisent la plateforme au bureau sur grand écran, mais aussi en déplacement sur mobile — les mêmes écrans devaient rester efficaces partout.",
        solution:
          "Design responsive mobile-first : tableaux qui se replient en cartes, navigation adaptée au pouce, actions critiques toujours accessibles.",
        result: "Un seul code, une expérience adaptée à chaque écran.",
      },
    ],
    architecture: [
      "Web app Next.js (B2B)",
      "API NestJS partagée",
      "PostgreSQL · Supabase",
      "Docker · Nginx · Scaleway",
    ],
    sourceNote:
      "Code source propriété de plüm (dépôt privé). Architecture et extraits présentables en entretien.",
  },
  {
    slug: "plum-dashboard",
    mediaType: "web",
    accent: "#0ea5e9",
    title: "Dashboard de pilotage plüm",
    category: "Professionnel · Interne",
    shortDesc:
      "Outil interne de pilotage de la startup — données, règles métier, documents et opérations centralisés.",
    longDesc:
      "Dashboard d'administration interne qui centralise le pilotage de la startup : données opérationnelles, application des règles métier, gestion documentaire et suivi de l'activité. C'est l'outil quotidien de l'équipe pour opérer la plateforme — là où se prennent les décisions et où s'appliquent les règles qui gouvernent l'app mobile et l'espace pro. Pour des raisons de sécurité, ni lien ni captures d'écran publiques.",
    stack: [
      "Next.js",
      "TypeScript",
      "NestJS",
      "PostgreSQL",
      "Supabase",
    ],
    period: "2025 — présent",
    context: "plüm — outil interne",
    role: "Développeur Fullstack",
    links: {},
    images: [],
    cover: {
      title: "Outil interne",
      subtitle: "Captures non publiques — démo sur demande",
    },
    featured: true,
    highlights: [
      "Centralisé les données opérationnelles et le suivi d'activité de la startup",
      "Implémenté les règles métier de bout en bout, appliquées à toute la plateforme",
      "Mis en place la gestion documentaire interne",
      "Sécurisé l'accès par rôles et permissions — l'outil n'est pas exposé publiquement",
    ],
    challenges: [
      {
        title: "Une seule source de vérité pour le pilotage",
        problem:
          "Les informations nécessaires au pilotage étaient dispersées entre plusieurs outils, avec un risque permanent de décisions prises sur des données obsolètes.",
        solution:
          "Un dashboard unique branché directement sur la base de production, qui agrège données, documents et règles métier au même endroit.",
        result: "L'équipe pilote la startup sur des données à jour, dans un seul outil.",
      },
      {
        title: "Sécuriser un outil très privilégié",
        problem:
          "Un dashboard d'administration accède à tout : données clients, documents, règles métier. C'est la surface d'attaque la plus sensible de la plateforme.",
        solution:
          "Accès restreint par rôles et permissions, aucune exposition publique de l'outil, et traçabilité des actions sensibles.",
      },
    ],
    architecture: [
      "Dashboard Next.js",
      "API NestJS",
      "PostgreSQL · Supabase",
      "Accès restreint par rôles",
    ],
    sourceNote:
      "Outil interne — ni lien ni captures publiques pour des raisons de sécurité. Démonstration possible en entretien.",
  },
  {
    slug: "revo",
    mediaType: "web",
    accent: "#f97316",
    title: "Revo",
    category: "Projet personnel",
    shortDesc:
      "SaaS pour coachs sportifs — gestion clients, séances, programmes et suivi de progression.",
    longDesc:
      "Mon projet entrepreneurial, conçu, développé et déployé entièrement en solo sur mon temps libre. Revo centralise l'activité des coachs sportifs : profils clients, saisie rapide des séances, programmes assignables, bibliothèque d'exercices illustrés et détection automatique des records personnels. Interface pensée pour une utilisation sur le terrain — un coach saisit une série en quelques secondes entre deux exercices. Modèle freemium avec essai Pro.",
    stack: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Supabase",
      "PostgreSQL",
      "Vercel",
    ],
    period: "2025 — présent",
    context: "Projet personnel",
    role: "Créateur & Développeur Fullstack",
    links: {
      live: "https://coach-track.vercel.app/",
    },
    images: [
      "/images/revo-capture/revo-hero.png",
      "/images/revo-capture/revo-dashboard.png",
      "/images/revo-capture/revo-exercice.png",
      "/images/revo-capture/revo-client.png",
      "/images/revo-capture/revo-cta.png",
    ],
    featured: true,
    // TODO: compléter avec les vrais chiffres (coachs inscrits, séances
    // enregistrées…) quand disponibles
    metrics: [
      { value: "100%", label: "conçu et développé en solo" },
      { value: "< 5 s", label: "pour saisir une série en séance" },
      { value: "Freemium", label: "+ essai Pro intégré" },
    ],
    highlights: [
      "Produit imaginé, designé, développé et déployé seul — de l'étude du besoin au lancement",
      "Détection automatique des records personnels calculée en SQL côté Supabase",
      "Saisie de séance optimisée terrain : ajout d'une série en quelques secondes",
      "Multi-tenancy coach/clients sécurisé par Row Level Security Supabase",
      "Déploiement continu sur Vercel avec environnement de préproduction",
    ],
    challenges: [
      {
        title: "Saisie ultra-rapide sur le terrain",
        problem:
          "Un coach n'a que quelques secondes entre deux exercices : un formulaire classique rendait la saisie de séance inutilisable en conditions réelles.",
        solution:
          "Interface optimisée mobile-first avec valeurs pré-remplies depuis l'historique, mises à jour optimistes et navigation au pouce.",
        result: "Une série se saisit en moins de cinq secondes, sans quitter l'écran.",
      },
      {
        title: "Détection automatique des records",
        problem:
          "Identifier un record personnel (poids, répétitions, volume) à chaque saisie sans dégrader les performances ni dupliquer la logique côté client.",
        solution:
          "Calcul des records directement en SQL dans Supabase, déclenché à l'insertion de la série — une seule source de vérité.",
        result: "Les records s'affichent instantanément et restent cohérents sur tout l'historique.",
      },
      {
        title: "Isolation des données par coach",
        problem:
          "Chaque coach ne doit voir que ses clients et ses séances, sans qu'aucune requête mal écrite côté client ne puisse fuiter des données.",
        solution:
          "Row Level Security PostgreSQL activée sur toutes les tables, avec politiques par rôle testées — la sécurité est garantie par la base, pas par le code applicatif.",
      },
    ],
    architecture: [
      "Next.js (App Router)",
      "Supabase Auth + RLS",
      "PostgreSQL (records en SQL)",
      "Vercel (CI/CD)",
    ],
    sourceNote:
      "Dépôt privé — démonstration du code et de l'architecture possible sur demande.",
  },
  {
    slug: "ter-suivi-etudiants",
    mediaType: "web",
    accent: "#10b981",
    title: "TER — Suivi Activité Étudiants",
    category: "Recherche · Université",
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
    featured: false,
  },
  {
    slug: "maido-vr",
    mediaType: "web",
    accent: "#8b5cf6",
    title: "Maïdo VR",
    category: "Recherche · Université",
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
    mediaType: "web",
    accent: "#f59e0b",
    title: "Plateforme de gestion universitaire",
    category: "Stage · Madagascar",
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

export function getFeaturedProjects(): Project[] {
  return projects.filter((project) => project.featured);
}

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getAllSlugs(): string[] {
  return projects.map((p) => p.slug);
}
