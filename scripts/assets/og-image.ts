import sharp from "sharp";
import type { OgImageProcessing } from "./definitions";

const WIDTH = 1200;
const HEIGHT = 630;
const MARGIN = 80;

const NAME = "Rafael Rego";
const EYEBROW = "PORTFOLIO";
const ROLE = "Full-Stack Developer";

const AVATAR_CENTER = { x: 920, y: 315 };
const AVATAR_RADIUS = 175;

export async function createOgImage(source: Buffer, processing: OgImageProcessing): Promise<Buffer> {
	const avatar = await sharp(source)
		.resize(AVATAR_RADIUS * 2, AVATAR_RADIUS * 2, { fit: "cover", position: "attention" })
		.png()
		.toBuffer();

	const svg = createOgImageSvg({
		avatarDataUri: `data:image/png;base64,${avatar.toString("base64")}`,
		primaryColor: processing.primaryColor,
		title: processing.title,
	});

	return sharp(Buffer.from(svg)).png().toBuffer();
}

function createOgImageSvg({
	avatarDataUri,
	primaryColor,
	title,
}: {
	avatarDataUri: string;
	primaryColor: string;
	title: string;
}): string {
	const color = escapeXml(primaryColor);
	const { x: cx, y: cy } = AVATAR_CENTER;
	const r = AVATAR_RADIUS;

	return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="${WIDTH}" height="${HEIGHT}" viewBox="0 0 ${WIDTH} ${HEIGHT}">
  <title>${escapeXml(title)}</title>
  <defs>
    <linearGradient id="background" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#0d1016" />
      <stop offset="1" stop-color="#14212e" />
    </linearGradient>
    <radialGradient id="glow" cx="${cx}" cy="${cy}" r="420" gradientUnits="userSpaceOnUse">
      <stop offset="0" stop-color="${color}" stop-opacity="0.35" />
      <stop offset="0.5" stop-color="${color}" stop-opacity="0.08" />
      <stop offset="1" stop-color="${color}" stop-opacity="0" />
    </radialGradient>
    <pattern id="dots" width="32" height="32" patternUnits="userSpaceOnUse">
      <circle cx="2" cy="2" r="1.5" fill="#ffffff" fill-opacity="0.07" />
    </pattern>
    <linearGradient id="dotsFade" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="#fff" stop-opacity="1" />
      <stop offset="0.6" stop-color="#fff" stop-opacity="0.2" />
      <stop offset="1" stop-color="#fff" stop-opacity="0" />
    </linearGradient>
    <mask id="dotsMask">
      <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#dotsFade)" />
    </mask>
    <clipPath id="avatarClip">
      <circle cx="${cx}" cy="${cy}" r="${r}" />
    </clipPath>
  </defs>

  <!-- Background -->
  <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#background)" />
  <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#dots)" mask="url(#dotsMask)" />
  <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#glow)" />

  <!-- Avatar: circular crop, ring, outer halo -->
  <circle cx="${cx}" cy="${cy}" r="${r + 38}" fill="none" stroke="${color}" stroke-opacity="0.18" stroke-width="2" />
  <circle cx="${cx}" cy="${cy}" r="${r + 14}" fill="none" stroke="${color}" stroke-opacity="0.9" stroke-width="4" />
  <image x="${cx - r}" y="${cy - r}" width="${r * 2}" height="${r * 2}" preserveAspectRatio="xMidYMid slice" clip-path="url(#avatarClip)" href="${avatarDataUri}" xlink:href="${avatarDataUri}" />

  <!-- Eyebrow -->
  <rect x="${MARGIN}" y="150" width="56" height="4" rx="2" fill="${color}" />
  <text x="${MARGIN}" y="192" fill="${color}" font-family="Arial, Helvetica, sans-serif" font-size="26" font-weight="700" letter-spacing="8">${escapeXml(EYEBROW)}</text>

  <!-- Name + role -->
  <text x="${MARGIN}" y="304" fill="#f3f6fa" font-family="Arial, Helvetica, sans-serif" font-size="96" font-weight="700" letter-spacing="-2">${escapeXml(NAME)}</text>
  <text x="${MARGIN}" y="366" fill="#aab4c2" font-family="Arial, Helvetica, sans-serif" font-size="38" font-weight="400">${escapeXml(ROLE)}</text>

</svg>`;
}

function escapeXml(value: string): string {
	const entities: Record<string, string> = {
		"&": "&amp;",
		"<": "&lt;",
		">": "&gt;",
		'"': "&quot;",
		"'": "&apos;",
	};

	return value.replace(/[<>&'"]/g, (character) => entities[character]);
}
