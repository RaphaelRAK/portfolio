# Portfolio — Next.js

Site vitrine personnel d’**Aina Raphaël Rakotonaivo**, développeur fullstack (React Native & Next.js), déployable en **export statique** pour un hébergement simple (GitHub Pages, Vercel, etc.).

## Stack

- [Next.js](https://nextjs.org/) 15 (App Router)
- [React](https://react.dev/) 19
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/) 4
- [Framer Motion](https://www.framer.com/motion/) (animations)
- [React Icons](https://react-icons.github.io/react-icons/)

## Prérequis

- [Node.js](https://nodejs.org/) 18.18 ou supérieur (recommandé : LTS actuelle)

## Installation

```bash
npm install
```

## Scripts

| Commande      | Description                                      |
| ------------- | ------------------------------------------------ |
| `npm run dev` | Serveur de développement ([localhost:3000](http://localhost:3000)) |
| `npm run build` | Build de production + génération du dossier `out/` (export statique) |
| `npm run start` | Sert le build **non exporté** ; avec `output: "export"`, privilégier un hébergement des fichiers `out/` ou un adaptateur type `serve` |

La configuration (`next.config.ts`) utilise `output: "export"` : après `npm run build`, le site prêt à déployer se trouve dans **`out/`**.

## Structure (aperçu)

- `app/` — pages et layout (App Router)
- `components/` — sections du portfolio, navigation, projets
- `lib/` — métadonnées du site, données projets, icônes stack
- `public/` — assets statiques (images, favicon)

## Licence

MIT — voir la licence du dépôt si elle est ajoutée séparément.

---

*Projet personnel — portfolio.*
