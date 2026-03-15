# Analyse du portfolio — Regard recruteur

> Analyse réalisée comme si j'étais un recruteur tech (startup / ESN / scale-up)
> qui tombe sur ce portfolio pour la première fois.

---

## Ce qui fonctionne bien ✅

- **L'histoire personnelle est forte.** "J'ai travaillé en cuisine et en caisse pendant
  que j'apprenais à coder" — c'est différenciant, mémorable, humain. Ça donne
  immédiatement envie de lire la suite.
- **La section stats** (4× Mention Bien, 5 ans double vie) crédibilise le discours d'un coup d'œil.
- **Plüm Services est bien mis en valeur** : preview du site, 4 cartes techniques, store buttons.
- **Le clavier interactif** est un vrai + créatif qui montre que tu sais construire des UI.
- **Les animations** sont fluides et professionnelles, pas agressives.

---

## Points critiques à corriger 🔴

### 1. Zéro lien GitHub / portfolio de code
**Problème :** Un recruteur tech cherche TOUJOURS à voir du code. Il n'y a aucun lien
vers un GitHub, GitLab ou dépôt public. Sans ça, le portfolio reste une belle brochure
marketing sans preuve technique concrète.

**Solution :** Ajouter dans le header ET dans la section contact :
- Un lien GitHub (même si le code de Plüm est privé, avoir un profil avec
  quelques repos publics ou contributions est indispensable)
- Optionnellement : un lien LinkedIn

---

### 2. Aucun projet personnel / open source visible
**Problème :** Plüm Services est en CDI — le code est probablement privé. Si un
recruteur ne peut pas voir de code, il ne peut pas évaluer le niveau réel.
Pour un dev qui cherche un nouveau poste, ne montrer qu'un seul projet non accessible
est un frein majeur.

**Solution :**
- Créer 1 ou 2 petits projets personnels publics sur GitHub (même simples : une todo
  app avec une belle archi, un package npm, un side project) et les ajouter comme
  section "Projets" dans le portfolio.
- Ou au minimum : rendre ce portfolio lui-même open source et le lier.

---

### 3. Pas de photo / avatar
**Problème :** Le CV physique a une photo. Le portfolio n'en a pas. En 2025, une
photo professionnelle (pas selfie) dans le hero crée une connexion humaine immédiate.
Les recruteurs qui voient un visage retiennent mieux le profil.

**Solution :** Ajouter une photo ronde dans le hero, à droite du nom, ou une petite
photo dans la nav/footer.

---

### 4. La section contact est trop limitée
**Problème :** Seulement email + téléphone. Un recruteur moderne cherchera aussi :
- LinkedIn (pour vérifier le parcours et envoyer un message)
- GitHub (pour voir le code)
- Éventuellement : disponibilité explicite (cherche-t-il activement ? En veille ?)

**Solution :** Ajouter des liens LinkedIn et GitHub dans la section contact et dans
le footer. Ajouter une ligne courte sur la disponibilité :
"Ouvert aux opportunités" ou "En poste, à l'écoute d'opportunités".

---

### 5. Le titre de poste est ambigu
**Problème :** "Développeur Fullstack" est très générique. Un recruteur ne sait pas
immédiatement si tu es plutôt frontend, backend, mobile, ou réellement fullstack.
Le portfolio montre React Native + NestJS + infra — c'est du vrai fullstack, mais
ça ne se lit pas en 3 secondes.

**Solution :** Préciser le titre dans le hero :
→ "Développeur Fullstack · React Native & Next.js / NestJS"
ou ajouter une ligne très courte sous le nom avec les 3-4 spécialités clés.

---

### 6. Les expériences précédentes manquent d'impact
**Problème :** Les TER (Jan 2024, Sept 2023) et le stage ESIGE sont décrits de façon
très académique. Les recruteurs survolent — ils ne lisent pas "Mise à jour du prototype
Maïdo VR" et ne savent pas ce que ça signifie concrètement pour eux.

**Solution :** Pour chaque expérience, ajouter 1 résultat concret ou 1 apprentissage clé :
- TER Maïdo VR → "Collaboration en équipe de 4, mise en production d'une version améliorée"
- TER suivi étudiants → "Dashboard consulté par X étudiants / utilisé en production"
- Stage ESIGE → "Application déployée, utilisée par l'université depuis [date]"

---

## Points à améliorer 🟡

### 7. Pas de section "À propos" / bio courte
**Problème :** Le hero donne la promesse. Mais il manque 2-3 lignes sur :
- Qui tu es vraiment (origine, ambition)
- Ce qui te motive dans le code
- Ce que tu recherches

Un recruteur veut savoir si la personnalité matche avant d'appeler.

---

### 8. La punchline du hero peut refroidir certains recruteurs
**Problème :** "J'ai travaillé en cuisine et en caisse" est fort narrativement,
mais certains recruteurs très corporates pourraient inconsciemment le lire comme
un manque d'expérience tech. C'est un risque calculé.

**Suggestion :** Garder la punchline (elle est bonne), mais l'équilibrer avec
une ligne qui ancre immédiatement la légitimité technique :
→ Ajouter sous la punchline : "Aujourd'hui : 1 an de développement fullstack en CDI,
1 app mobile en production sur iOS et Android."

---

### 9. Le portfolio est 100% en français
**Problème :** Si tu cibles des boîtes hors de La Réunion (Paris, remote international),
un portfolio uniquement en français ferme des portes. Les recruteurs anglo-saxons
ou les startups internationales basées en métropole filtrent souvent.

**Solution :** Ajouter un toggle FR / EN simple, ou au minimum traduire les titres
de section et les CTAs en anglais.

---

### 10. Pas de métadonnées Open Graph
**Problème :** Quand un recruteur partage l'URL sur LinkedIn / Slack / email,
l'aperçu généré est générique (titre "Create Next App" ou similaire). C'est une
occasion manquée de faire une première impression.

**Solution :** Configurer dans `layout.tsx` :
- `og:title` → "Aina Raphaël Rakotonaivo — Développeur Fullstack"
- `og:description` → La punchline
- `og:image` → Une image de prévisualisation (screenshot du portfolio ou photo pro)

---

### 11. Navigation mobile incomplète
**Problème :** Sur mobile, les liens de navigation (Parcours, Projet, Stack) sont
masqués avec `hidden sm:block`. Sur téléphone, l'utilisateur ne voit que "Me contacter"
et les initiales "ARR". Il n'y a pas de menu burger ni rien pour naviguer.

**Solution :** Ajouter un menu hamburger simple sur mobile, ou au moins afficher
les liens en version condensée.

---

### 12. Aucune preuve de la qualité du code / architecture
**Problème :** Tu décris des pratiques solides (ADR, Storybook, OpenAPI, CI/CD)
mais sans preuve. Un recruteur technique peut se demander si c'est du name-dropping.

**Solution :**
- Mentionner 1 décision technique concrète prise sur Plüm Services
  (ex: "Pourquoi NestJS plutôt qu'Express ?", "Pourquoi Scaleway ?")
- Ou ajouter une courte section "Architecture" avec un diagramme Mermaid simplifié

---

## Priorité de mise en oeuvre

| Priorité | Action | Impact recruteur |
|----------|--------|-----------------|
| 🔴 P0 | Ajouter lien GitHub dans header + contact | Très élevé |
| 🔴 P0 | Créer au moins 1 projet perso public | Très élevé |
| 🔴 P0 | Ajouter lien LinkedIn | Élevé |
| 🟡 P1 | Photo dans le hero | Élevé |
| 🟡 P1 | Préciser le titre (React Native + NestJS) | Moyen |
| 🟡 P1 | Configurer Open Graph (`og:image`, `og:description`) | Élevé (partage LinkedIn) |
| 🟡 P2 | Ajouter résultats concrets aux XP précédentes | Moyen |
| 🟡 P2 | Menu mobile hamburger | Moyen |
| 🟢 P3 | Toggle FR/EN | Faible-Moyen |
| 🟢 P3 | Section "À propos" courte | Faible |

---

## Verdict global

**8/10** — Le portfolio est visuellement au-dessus de la moyenne, l'histoire personnelle
est mémorable, la stack est bien présentée. Le principal manque est l'absence de code
accessible (GitHub) et de liens sociaux, qui sont des réflexes de vérification
systématiques chez tout recruteur tech sérieux. Avec un GitHub visible et un projet
personnel, ce portfolio serait dans le top 5% de ce que reçoit un recruteur.
