import sharp from "sharp";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT = join(__dirname, "../public/og-image.png");

const svg = `
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
  <defs>
    <radialGradient id="halo-blue" cx="18%" cy="0%" r="65%">
      <stop offset="0%" stop-color="#2e5bff" stop-opacity="0.14"/>
      <stop offset="100%" stop-color="#2e5bff" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="halo-rose" cx="88%" cy="8%" r="55%">
      <stop offset="0%" stop-color="#f43f5e" stop-opacity="0.10"/>
      <stop offset="100%" stop-color="#f43f5e" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="accent" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#2e5bff"/>
      <stop offset="55%" stop-color="#0ea5e9"/>
      <stop offset="100%" stop-color="#10b981"/>
    </linearGradient>
    <pattern id="grid" width="48" height="48" patternUnits="userSpaceOnUse">
      <path d="M 48 0 L 0 0 0 48" fill="none" stroke="#0a0a0c" stroke-width="0.5" opacity="0.05"/>
    </pattern>
  </defs>

  <!-- Fond blanc + halos -->
  <rect width="1200" height="630" fill="#ffffff"/>
  <rect width="1200" height="630" fill="url(#grid)"/>
  <rect width="1200" height="630" fill="url(#halo-blue)"/>
  <rect width="1200" height="630" fill="url(#halo-rose)"/>

  <!-- Badge dispo -->
  <rect x="80" y="86" width="310" height="42" rx="21" fill="#ffffff" stroke="#e4e4e9" stroke-width="1.5"/>
  <circle cx="108" cy="107" r="5" fill="#16a34a"/>
  <text x="124" y="113" font-family="Helvetica, Arial, sans-serif" font-size="17" font-weight="500" fill="#0a0a0c">Disponible — CDI chez plüm</text>

  <!-- Accroche -->
  <text x="80" y="248" font-family="Helvetica, Arial, sans-serif" font-size="86" font-weight="700" fill="#0a0a0c" letter-spacing="-3">Apps mobiles &amp; web</text>
  <text x="80" y="348" font-family="Helvetica, Arial, sans-serif" font-size="86" font-weight="700" letter-spacing="-3" xml:space="preserve"><tspan fill="#0a0a0c">livrées&#160;</tspan><tspan fill="url(#accent)">en production.</tspan></text>
  <rect x="404" y="372" width="478" height="5" rx="2.5" fill="url(#accent)"/>

  <!-- Nom + rôle -->
  <text x="80" y="442" font-family="Helvetica, Arial, sans-serif" font-size="26" font-weight="600" fill="#0a0a0c">Aina Raphaël Rakotonaivo</text>
  <text x="80" y="476" font-family="Helvetica, Arial, sans-serif" font-size="19" fill="#6b6b76">Développeur Fullstack — React Native · Next.js · NestJS</text>

  <!-- Séparateur -->
  <line x1="80" y1="530" x2="1120" y2="530" stroke="#e4e4e9" stroke-width="1.5"/>

  <!-- Localisation -->
  <text x="80" y="568" font-family="Helvetica, Arial, sans-serif" font-size="15" fill="#6b6b76" letter-spacing="2">LA RÉUNION · REMOTE · PARIS · LYON · TOULOUSE</text>

  <!-- Logo -->
  <text x="1120" y="570" font-family="Helvetica, Arial, sans-serif" font-size="26" font-weight="700" fill="#2e5bff" letter-spacing="3" text-anchor="end">RAR.dev</text>
</svg>
`;

try {
  await sharp(Buffer.from(svg)).png().toFile(OUT);
  console.log("✓ OG image generated → public/og-image.png");
} catch (err) {
  console.error("✗ OG image generation failed:", err.message);
  process.exit(1);
}
