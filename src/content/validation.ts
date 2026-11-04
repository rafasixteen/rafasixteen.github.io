import { locales, type Locale } from "@/lib/locales";
import { education } from "./education";
import { experience } from "./experience";
import { localizedContent, assembleContent } from "./portfolio";
import { portfolioContentSchema, type PortfolioContent } from "./portfolio-content";
import { projects, technologyTranslationSchema } from "./project";
import { skillGroups } from "./skill-group";
import { asRecord } from "@/lib/record";

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

export function assertTranslationIds(
	locale: string,
	entity: string,
	entries: readonly ({ translationKey: string } | { id: string })[],
	translations: readonly { id: string }[],
): void {
	const referencedIds = new Set(entries.map((entry) => ("translationKey" in entry ? entry.translationKey : entry.id)));
	const translatedIds = new Set(translations.map((translation) => translation.id));

	for (const id of referencedIds) {
		if (!translatedIds.has(id)) {
			throw new Error(`Missing ${locale} translation at ${entity}.${id}`);
		}
	}

	for (const id of translatedIds) {
		if (!referencedIds.has(id)) {
			throw new Error(`Unused ${locale} translation at ${entity}.${id}`);
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
	const [referenceLocale, ...otherLocales] = locales;

	for (const locale of otherLocales) {
		assertMatchingShape(localizedContent[referenceLocale], localizedContent[locale]);
	}

	const content = {} as Record<Locale, PortfolioContent>;

	for (const locale of locales) {
		const translations = localizedContent[locale];

		assertTranslationKeys(locale, "experience", experience, translations.experience);
		assertTranslationKeys(locale, "education", education, translations.education);
		assertTranslationKeys(locale, "projects", projects, translations.projects);

		for (const project of projects) {
			const projectTranslation = asRecord(translations.projects[project.translationKey]);
			const technologyTranslations = technologyTranslationSchema
				.array()
				.parse(projectTranslation?.technologies);
			const mediaTranslations = asRecord(projectTranslation?.media) ?? {};

			assertTranslationIds(
				locale,
				`projects.${project.translationKey}.technologies`,
				project.technologies,
				technologyTranslations,
			);

			if (project.media.length > 0) {
				assertTranslationKeys(
					locale,
					`projects.${project.translationKey}.media`,
					project.media,
					mediaTranslations,
				);
			}
		}

		assertTranslationIds(locale, "skills", skillGroups, translations.skills);

		for (const group of skillGroups) {
			const translation = translations.skills.find(({ id }) => id === group.translationKey);

			if (!translation) {
				throw new Error(`Missing ${locale} translation at skills.${group.translationKey}`);
			}

			assertTranslationIds(locale, `skills.${group.translationKey}.skills`, group.skills, translation.skills);
		}

		content[locale] = portfolioContentSchema.parse(assembleContent(locale));
	}

	return content;
}

export const portfolioContent = validateContent();
