import { routing, type Locale } from "@/i18n/routing";
import { education } from "./education";
import { experience } from "./experience";
import { localizedContent, assembleContent } from "./portfolio";
import { portfolioContentSchema, type PortfolioContent } from "./portfolio-content";
import { projects } from "./project";
import { skillGroups } from "./skill-group";

function asRecord(value: unknown): Record<string, unknown> | undefined {
	if (!value || typeof value !== "object" || Array.isArray(value)) {
		return undefined;
	}

	return value as Record<string, unknown>;
}

export function assertTranslationKeys(
	locale: string,
	entity: string,
	entries: readonly { translationKey: string }[],
	translations: Record<string, unknown>,
): void {
	const referencedKeys = new Set(entries.map((entry) => entry.translationKey));

	for (const translationKey of referencedKeys) {
		if (!(translationKey in translations)) {
			throw new Error(`Missing ${locale} translation at ${entity}.${translationKey}`);
		}
	}

	for (const translationKey of Object.keys(translations)) {
		if (!referencedKeys.has(translationKey)) {
			throw new Error(`Unused ${locale} translation at ${entity}.${translationKey}`);
		}
	}
}

export function assertMatchingShape(reference: unknown, candidate: unknown, path = ""): void {
	if (Array.isArray(reference)) {
		if (!Array.isArray(candidate)) {
			throw new Error(`Locale parity error at ${path || "root"}`);
		}

		return;
	}

	const referenceRecord = asRecord(reference);
	if (!referenceRecord) {
		return;
	}

	const candidateRecord = asRecord(candidate);
	if (!candidateRecord) {
		throw new Error(`Locale parity error at ${path || "root"}`);
	}

	for (const [key, value] of Object.entries(referenceRecord)) {
		const next = path ? `${path}.${key}` : key;

		if (!(key in candidateRecord)) {
			throw new Error(`Locale parity error at ${next}`);
		}

		assertMatchingShape(value, candidateRecord[key], next);
	}
}

export function validateContent(): Record<Locale, PortfolioContent> {
	const [referenceLocale, ...otherLocales] = routing.locales;

	for (const locale of otherLocales) {
		assertMatchingShape(localizedContent[referenceLocale], localizedContent[locale]);
	}

	const content = {} as Record<Locale, PortfolioContent>;

	for (const locale of routing.locales) {
		const translations = localizedContent[locale];

		assertTranslationKeys(locale, "experience", experience, translations.experience);
		assertTranslationKeys(locale, "education", education, translations.education);
		assertTranslationKeys(locale, "projects", projects, translations.projects);
		assertTranslationKeys(locale, "skills", skillGroups, translations.skills);

		content[locale] = portfolioContentSchema.parse(assembleContent(locale));
	}

	return content;
}

export const portfolioContent = validateContent();
