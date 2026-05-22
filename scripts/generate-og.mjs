import sharp from "sharp";
import { writeFileSync, mkdirSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT = join(__dirname, "../public/og-image.png");

const svg = `
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
  <defs>
    <style>
      @font-face { font-family: 'sans'; }
    </style>
  </defs>

  <!-- Background -->
  <rect width="1200" height="630" fill="#09090b"/>

  <!-- Grid texture -->
  <defs>
    <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
      <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#27272a" stroke-width="0.5" opacity="0.4"/>
    </pattern>
  </defs>
  <rect width="1200" height="630" fill="url(#grid)"/>

  <!-- Top accent line -->
  <rect x="80" y="80" width="64" height="2" fill="#d4a853"/>

  <!-- Name: Aina -->
  <text x="80" y="220" font-family="Georgia, serif" font-size="96" font-weight="300" fill="#f4f4f5" letter-spacing="-3">Aina</text>

  <!-- Name: Raphaël (outline) -->
  <text x="80" y="318" font-family="Georgia, serif" font-size="96" font-weight="300" fill="none" stroke="#d4a853" stroke-width="1.5" letter-spacing="-3">Raphaël</text>

  <!-- Subtitle -->
  <text x="80" y="378" font-family="Arial, sans-serif" font-size="22" font-weight="300" fill="#71717a" letter-spacing="3">DÉVELOPPEUR FULLSTACK</text>

  <!-- Stack badges -->
  <rect x="80" y="412" width="140" height="30" fill="none" stroke="#27272a" stroke-width="1"/>
  <text x="150" y="432" font-family="Arial, sans-serif" font-size="13" fill="#52525b" text-anchor="middle" letter-spacing="0.5">React Native</text>

  <rect x="232" y="412" width="90" height="30" fill="none" stroke="#27272a" stroke-width="1"/>
  <text x="277" y="432" font-family="Arial, sans-serif" font-size="13" fill="#52525b" text-anchor="middle" letter-spacing="0.5">Next.js</text>

  <rect x="334" y="412" width="86" height="30" fill="none" stroke="#27272a" stroke-width="1"/>
  <text x="377" y="432" font-family="Arial, sans-serif" font-size="13" fill="#52525b" text-anchor="middle" letter-spacing="0.5">NestJS</text>

  <rect x="432" y="412" width="106" height="30" fill="none" stroke="#27272a" stroke-width="1"/>
  <text x="485" y="432" font-family="Arial, sans-serif" font-size="13" fill="#52525b" text-anchor="middle" letter-spacing="0.5">TypeScript</text>

  <rect x="550" y="412" width="82" height="30" fill="none" stroke="#27272a" stroke-width="1"/>
  <text x="591" y="432" font-family="Arial, sans-serif" font-size="13" fill="#52525b" text-anchor="middle" letter-spacing="0.5">Docker</text>

  <!-- Bottom separator -->
  <line x1="80" y1="530" x2="1120" y2="530" stroke="#27272a" stroke-width="1"/>

  <!-- Location -->
  <text x="80" y="565" font-family="Arial, sans-serif" font-size="14" fill="#52525b" letter-spacing="2">LA RÉUNION · REMOTE · PARIS · LYON · TOULOUSE</text>

  <!-- Logo RAR -->
  <text x="1120" y="568" font-family="Georgia, serif" font-size="28" font-weight="300" fill="#d4a853" letter-spacing="6" text-anchor="end">RAR</text>
</svg>
`;

try {
  await sharp(Buffer.from(svg)).png().toFile(OUT);
  console.log("✓ OG image generated → public/og-image.png");
} catch (err) {
  console.error("✗ OG image generation failed:", err.message);
  process.exit(1);
}
