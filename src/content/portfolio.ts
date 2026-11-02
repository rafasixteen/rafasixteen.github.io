import type { Locale } from "@/i18n/routing";
import { routing } from "@/i18n/routing";
import { readFileSync, readdirSync } from "node:fs";
import path from "node:path";
import { education, type EducationTranslations } from "./education";
import { experience, type ExperienceTranslations } from "./experience";
import type { PortfolioContent } from "./portfolio-content";
import { profile, type ProfileTranslation } from "./profile";
import { projects, type ProjectTranslations } from "./project";
import { skillGroups, type SkillGroupTranslations } from "./skill-group";

type PortfolioTranslations = {
	profile: ProfileTranslation;
	experience: ExperienceTranslations;
	education: EducationTranslations;
	projects: ProjectTranslations;
	skills: SkillGroupTranslations;
};

function loadLocalizedContent(): Record<Locale, PortfolioTranslations> {
	const translationsDirectory = path.join(process.cwd(), "src/translations");
	const translationFiles = readdirSync(translationsDirectory, { withFileTypes: true })
		.filter((entry) => entry.isFile() && entry.name.endsWith(".json"))
		.map((entry) => entry.name);

	const filesByLocale = new Map(translationFiles.map((file) => [file.replace(/\.json$/, ""), file]));

	for (const locale of filesByLocale.keys()) {
		if (!routing.locales.includes(locale as Locale)) {
			throw new Error(`Translation file ${locale}.json is not declared in i18n routing`);
		}
	}

	return Object.fromEntries(
		routing.locales.map((locale) => {
			const file = filesByLocale.get(locale);

			if (!file) {
				throw new Error(`Missing translation file for configured locale ${locale}`);
			}

			const messages = JSON.parse(readFileSync(path.join(translationsDirectory, file), "utf8")) as {
				portfolio: PortfolioTranslations;
			};

			return [locale, messages.portfolio];
		}),
	) as Record<Locale, PortfolioTranslations>;
}

export const localizedContent = loadLocalizedContent();

export function assembleContent(locale: Locale): PortfolioContent {
	const translations = localizedContent[locale];

	return {
		locale,
		profile: { ...profile, ...translations.profile },
		experience: experience.map((entry) => ({ ...entry, ...translations.experience[entry.translationKey] })),
		education: education.map((entry) => ({ ...entry, ...translations.education[entry.translationKey] })),
		projects: projects.map((entry) => {
			const translation = translations.projects[entry.translationKey];

			return {
				...entry,
				...translation,
				media: entry.media.map((media) => ({ ...media, ...translation.media[media.translationKey] })),
			};
		}),
		skills: skillGroups.map((entry) => ({ ...entry, ...translations.skills[entry.translationKey] })),
	};
}
