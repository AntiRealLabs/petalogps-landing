import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const root = process.cwd();
const publicDir = path.join(root, "public");
const sourceDir = path.join(root, "PetAlo-Logo-Final");

const isotipoPublic = path.join(publicDir, "petalo-isotipo.svg");
const logoPublic = path.join(publicDir, "petalo-logo-completo.svg");

async function fileExists(filePath) {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

async function copyLogoAssets() {
  await fs.mkdir(publicDir, { recursive: true });

  const assets = [
    ["petalo-isotipo.svg", isotipoPublic],
    ["petalo-logo-completo.svg", logoPublic],
  ];

  for (const [fileName, destination] of assets) {
    const source = path.join(sourceDir, fileName);
    if (await fileExists(source)) {
      await fs.copyFile(source, destination);
    } else if (!(await fileExists(destination))) {
      throw new Error(`Missing required logo asset: ${fileName}`);
    }
  }
}

function svgDataUrl(svg) {
  return `data:image/svg+xml;base64,${Buffer.from(svg).toString("base64")}`;
}

function createIco(entries) {
  const headerSize = 6;
  const directorySize = entries.length * 16;
  let offset = headerSize + directorySize;
  const directory = Buffer.alloc(directorySize);

  entries.forEach((entry, index) => {
    const position = index * 16;
    directory.writeUInt8(entry.width >= 256 ? 0 : entry.width, position);
    directory.writeUInt8(entry.height >= 256 ? 0 : entry.height, position + 1);
    directory.writeUInt8(0, position + 2);
    directory.writeUInt8(0, position + 3);
    directory.writeUInt16LE(1, position + 4);
    directory.writeUInt16LE(32, position + 6);
    directory.writeUInt32LE(entry.buffer.length, position + 8);
    directory.writeUInt32LE(offset, position + 12);
    offset += entry.buffer.length;
  });

  const header = Buffer.alloc(headerSize);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(entries.length, 4);

  return Buffer.concat([header, directory, ...entries.map((entry) => entry.buffer)]);
}

async function renderOgImage(logoSvg) {
  const ogSvg = `<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#FAFCFE"/>
      <stop offset="48%" stop-color="#EDF7FC"/>
      <stop offset="100%" stop-color="#B8E0F5"/>
    </linearGradient>
    <linearGradient id="line" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#B8E0F5" stop-opacity="0"/>
      <stop offset="50%" stop-color="#4A9FD4" stop-opacity="0.28"/>
      <stop offset="100%" stop-color="#B8E0F5" stop-opacity="0"/>
    </linearGradient>
    <filter id="softShadow" x="-30%" y="-30%" width="160%" height="160%">
      <feDropShadow dx="0" dy="24" stdDeviation="28" flood-color="#2D3748" flood-opacity="0.12"/>
    </filter>
  </defs>
  <rect width="1200" height="630" fill="url(#bg)"/>
  <path d="M80 168 C240 100 370 220 520 156 C690 84 820 182 1120 116" fill="none" stroke="url(#line)" stroke-width="3"/>
  <path d="M40 470 C210 400 370 520 548 450 C730 378 850 480 1160 410" fill="none" stroke="url(#line)" stroke-width="3"/>
  <g filter="url(#softShadow)">
    <image href="${svgDataUrl(logoSvg)}" x="405" y="46" width="390" height="482" preserveAspectRatio="xMidYMid meet"/>
  </g>
  <text x="600" y="565" text-anchor="middle" fill="#4A5568" font-family="Nunito, Arial, sans-serif" font-size="30" font-weight="700">Tecnología que cuida a tu mascota</text>
</svg>`;

  await sharp(Buffer.from(ogSvg)).png().toFile(path.join(publicDir, "og-image.png"));
}

async function renderAppleIcon(isotipoSvg) {
  const iconSvg = `<svg width="180" height="180" viewBox="0 0 180 180" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#FAFCFE"/>
      <stop offset="100%" stop-color="#B8E0F5"/>
    </linearGradient>
  </defs>
  <rect width="180" height="180" rx="34" fill="url(#bg)"/>
  <image href="${svgDataUrl(isotipoSvg)}" x="28" y="18" width="124" height="132" preserveAspectRatio="xMidYMid meet"/>
</svg>`;

  await sharp(Buffer.from(iconSvg)).png().toFile(path.join(publicDir, "apple-touch-icon.png"));
}

async function renderFavicons(isotipoSvg) {
  const favicon16 = await sharp(Buffer.from(isotipoSvg)).resize(16, 16, { fit: "contain" }).png().toBuffer();
  const favicon32 = await sharp(Buffer.from(isotipoSvg)).resize(32, 32, { fit: "contain" }).png().toBuffer();

  await fs.writeFile(
    path.join(publicDir, "favicon.ico"),
    createIco([
      { width: 16, height: 16, buffer: favicon16 },
      { width: 32, height: 32, buffer: favicon32 },
    ]),
  );
}

await copyLogoAssets();

const [isotipoSvg, logoSvg] = await Promise.all([
  fs.readFile(isotipoPublic, "utf8"),
  fs.readFile(logoPublic, "utf8"),
]);

await Promise.all([
  renderOgImage(logoSvg),
  renderAppleIcon(isotipoSvg),
  renderFavicons(isotipoSvg),
]);

console.log("PetAlo public assets generated.");
