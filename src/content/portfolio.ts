import { readFileSync, readdirSync } from "node:fs";
import path from "node:path";
import { locales, type Locale } from "@/lib/locales";
import { education } from "./education";
import { experience } from "./experience";
import { profile } from "./profile";
import { projects } from "./project";
import { skillGroups } from "./skill-group";
import { parseTranslationFile, type TranslationFile } from "./translations";
import type { Profile } from "./profile";
import type { Experience } from "./experience";
import type { Education } from "./education";
import type { Project } from "./project";
import type { SkillGroup } from "./skill-group";

/** The complete localized portfolio model passed to pages, components, and the CV generator. */
export interface PortfolioContent {
	locale: Locale;
	profile: Profile;
	experience: Experience[];
	education: Education[];
	projects: Project[];
	skills: SkillGroup[];
}

export function assertExactKeys(
	locale: string,
	path: string,
	keys: readonly string[],
	translations: Record<string, unknown>,
): void {
	const expected = new Set<string>();
	for (const key of keys) {
		if (expected.has(key)) {
			throw new Error(`Duplicate shared ID at ${path}.${key}`);
		}

		expected.add(key);

		if (!Object.hasOwn(translations, key)) {
			throw new Error(`Missing ${locale} translation at ${path}.${key}`);
		}
	}

	for (const key of Object.keys(translations)) {
		if (!expected.has(key)) {
			throw new Error(`Unused ${locale} translation at ${path}.${key}`);
		}
	}
}

export function assembleContent(locale: Locale, file: TranslationFile): PortfolioContent {
	const t = file.portfolio;

	assertExactKeys(
		locale,
		"experience",
		experience.map((x) => x.translationKey),
		t.experience,
	);

	assertExactKeys(
		locale,
		"education",
		education.map((x) => x.translationKey),
		t.education,
	);

	assertExactKeys(
		locale,
		"projects",
		projects.map((x) => x.translationKey),
		t.projects,
	);

	assertExactKeys(
		locale,
		"skills",
		skillGroups.map((x) => x.translationKey),
		t.skills,
	);

	return {
		locale,
		profile: {
			...profile,
			...t.profile,
		},
		experience: experience.map((entry) => {
			const translated = t.experience[entry.translationKey];

			assertExactKeys(
				locale,
				`experience.${entry.translationKey}.technologies`,
				entry.technologies.map((technology) => technology.id),
				translated.technologies,
			);

			return {
				...entry,
				summary: translated.summary,
				technologies: entry.technologies.map((technology) => ({
					...technology,
					name: translated.technologies[technology.id],
				})),
			};
		}),

		education: education.map((entry) => ({
			...entry,
			...t.education[entry.translationKey],
		})),
		projects: projects.map((entry) => {
			const translated = entry.parse(t.projects[entry.translationKey]);
			const base = `projects.${entry.translationKey}`;

			assertExactKeys(
				locale,
				`${base}.technologies`,
				entry.technologies.map((x) => x.id),
				translated.technologies,
			);

			const project: import("./project").Project = {
				translationKey: entry.translationKey,
				name: translated.name,
				summary: translated.summary,
				details: () => translated.render(project),
				technologies: entry.technologies.map((technology) => ({
					...technology,
					name: translated.technologies[technology.id],
				})),
			};

			return project;
		}),
		skills: skillGroups.map((entry) => {
			const translated = t.skills[entry.translationKey];

			assertExactKeys(
				locale,
				`skills.${entry.translationKey}.skills`,
				entry.skills.map((x) => x.id),
				translated.skills,
			);

			return {
				...entry,
				name: translated.name,
				skills: entry.skills.map((skill) => ({
					...skill,
					name: translated.skills[skill.id],
				})),
			};
		}),
	};
}

function loadContent(): Record<Locale, PortfolioContent> {
	const directory = path.join(process.cwd(), "src/translations");
	const files = readdirSync(directory, { withFileTypes: true })
		.filter((entry) => entry.isFile() && entry.name.endsWith(".json"))
		.map((entry) => entry.name);

	for (const file of files) {
		if (!locales.some((locale) => `${locale}.json` === file)) {
			throw new Error(`Translation file ${file} is not declared in i18n routing`);
		}
	}

	return Object.fromEntries(
		locales.map((locale) => {
			const file = `${locale}.json`;
			if (!files.includes(file)) {
				throw new Error(`Missing translation file for configured locale ${locale}`);
			}

			const value: unknown = JSON.parse(readFileSync(path.join(directory, file), "utf8"));
			return [locale, assembleContent(locale, parseTranslationFile(value))];
		}),
	) as Record<Locale, PortfolioContent>;
}

export const portfolioContent = loadContent();
