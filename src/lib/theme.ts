import { readFileSync } from "node:fs";
import path from "node:path";

const globalsCssPath = path.resolve(process.cwd(), "src/app/globals.css");

export function parsePrimaryColor(themeCss: string): string {
	const primaryToken = themeCss.match(/--primary\s*:\s*([^;]+);/)?.[1]?.trim();

	if (!primaryToken) {
		throw new Error("Theme CSS does not define a --primary color.");
	}

	if (primaryToken.startsWith("#")) {
		return primaryToken;
	}

	const hslMatch = primaryToken.match(
		/^hsl\(\s*([+-]?(?:\d*\.)?\d+)\s+([+-]?(?:\d*\.)?\d+)%\s+([+-]?(?:\d*\.)?\d+)%\s*\)$/,
	);

	if (!hslMatch) {
		throw new Error(`Unsupported --primary color format: ${primaryToken}`);
	}

	const [, hue, saturation, lightness] = hslMatch;
	return hslToHex(Number(hue), Number(saturation), Number(lightness));
}

export function getActivePrimaryColor(): string {
	const globalsCss = readFileSync(globalsCssPath, "utf8");
	return parsePrimaryColor(globalsCss);
}

function hslToHex(hue: number, saturation: number, lightness: number): string {
	const h = ((hue % 360) + 360) % 360;
	const s = clamp(saturation / 100);
	const l = clamp(lightness / 100);

	const chroma = (1 - Math.abs(2 * l - 1)) * s;
	const x = chroma * (1 - Math.abs(((h / 60) % 2) - 1));
	const offset = l - chroma / 2;

	let r = 0;
	let g = 0;
	let b = 0;

	switch (Math.floor(h / 60)) {
		case 0:
			[r, g, b] = [chroma, x, 0];
			break;
		case 1:
			[r, g, b] = [x, chroma, 0];
			break;
		case 2:
			[r, g, b] = [0, chroma, x];
			break;
		case 3:
			[r, g, b] = [0, x, chroma];
			break;
		case 4:
			[r, g, b] = [x, 0, chroma];
			break;
		default:
			[r, g, b] = [chroma, 0, x];
	}

	return `#${[r, g, b].map((channel) => toHex(channel + offset)).join("")}`;
}

function clamp(value: number): number {
	return Math.min(1, Math.max(0, value));
}

function toHex(value: number): string {
	return Math.round(value * 255)
		.toString(16)
		.padStart(2, "0");
}
