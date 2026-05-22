/** Slug Simple Icons (cdn.simpleicons.org/{slug}) pour chaque libellé de stack. */
const STACK_ICON_SLUG: Record<string, string> = {
  "React Native": "react",
  "Next.js": "nextdotjs",
  NestJS: "nestjs",
  TypeScript: "typescript",
  PostgreSQL: "postgresql",
  Supabase: "supabase",
  Stripe: "stripe",
  "Firebase/FCM": "firebase",
  Docker: "docker",
  Nginx: "nginx",
  Scaleway: "scaleway",
  n8n: "n8n",
  ElevenLabs: "elevenlabs",
  Python: "python",
  Dash: "plotly",
  Bash: "gnubash",
  Linux: "linux",
  JavaScript: "javascript",
  "Three.js": "threedotjs",
  Laravel: "laravel",
  PHP: "php",
  MySQL: "mysql",
  "HTML/CSS": "html5",
};

const CDN = "https://cdn.simpleicons.org";

export function getStackIconUrl(tech: string): string | undefined {
  const slug = STACK_ICON_SLUG[tech];
  if (!slug) return undefined;
  return `${CDN}/${slug}`;
}
