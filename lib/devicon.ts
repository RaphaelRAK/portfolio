const B = "https://cdn.jsdelivr.net/gh/devicons/devicon/icons";

/**
 * Devicon SVG URL for each tech label used in the project.
 * Undefined = no devicon exists → renders text-only.
 */
export const TECH_LOGO: Record<string, string> = {
  // Frontend
  "React Native":   `${B}/react/react-original.svg`,
  "React":          `${B}/react/react-original.svg`,
  "Next.js":        `${B}/nextjs/nextjs-original.svg`,
  "TypeScript":     `${B}/typescript/typescript-original.svg`,
  "JavaScript":     `${B}/javascript/javascript-original.svg`,
  "Tailwind CSS":   `${B}/tailwindcss/tailwindcss-original.svg`,
  "Redux Toolkit":  `${B}/redux/redux-original.svg`,
  "HTML/CSS":       `${B}/html5/html5-original.svg`,
  "Three.js":       `${B}/threejs/threejs-original.svg`,

  // Backend
  "NestJS":         `${B}/nestjs/nestjs-original.svg`,
  "Laravel":        `${B}/laravel/laravel-original.svg`,
  "PHP":            `${B}/php/php-original.svg`,
  "Python":         `${B}/python/python-original.svg`,
  "Java":           `${B}/java/java-original.svg`,
  "C":              `${B}/c/c-original.svg`,

  // Data
  "PostgreSQL":     `${B}/postgresql/postgresql-original.svg`,
  "MySQL":          `${B}/mysql/mysql-original.svg`,
  "Supabase":       `${B}/supabase/supabase-original.svg`,

  // DevOps / Infra
  "Docker":         `${B}/docker/docker-original.svg`,
  "Docker Compose": `${B}/docker/docker-original.svg`,
  "Nginx":          `${B}/nginx/nginx-original.svg`,
  "Linux":          `${B}/linux/linux-original.svg`,
  "Serveur dédié":  `${B}/linux/linux-original.svg`,
  "GitHub Actions": `${B}/github/github-original.svg`,

  // Services
  "Firebase/FCM":   `${B}/firebase/firebase-original.svg`,
  "Firebase":       `${B}/firebase/firebase-original.svg`,

  // Tools
  "GitHub":         `${B}/github/github-original.svg`,
  "GitLab":         `${B}/gitlab/gitlab-original.svg`,
  "Figma":          `${B}/figma/figma-original.svg`,
  "Storybook":      `${B}/storybook/storybook-original.svg`,
  "Git":            `${B}/git/git-original.svg`,
  "Bash":           `${B}/bash/bash-original.svg`,

  // No devicon → text-only:
  // REST API, React Query, Scaleway, Stripe, Mailjet, n8n,
  // ElevenLabs, WebXR, Dash
};

export function getTechLogo(name: string): string | undefined {
  return TECH_LOGO[name];
}
