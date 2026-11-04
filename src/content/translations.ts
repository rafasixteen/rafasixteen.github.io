import { z } from "zod";

const text = z.string().trim().min(1);

const names = z.record(text, text);

export const commonProjectTranslationSchema = z.strictObject({
	name: text,
	summary: text,
	technologies: names,
});

const messages = z.strictObject({
	nav: z.strictObject({
		home: text,
		experience: text,
		projects: text,
	}),
	action: z.strictObject({
		downloadCv: text,
		viewDetails: text,
		backToProjects: text,
	}),
	section: z.strictObject({
		experience: text,
		projects: text,
		skills: text,
		education: text,
	}),
	label: z.strictObject({
		present: text,
		technologies: text,
		language: text,
	}),
	footer: z.strictObject({
		lastUpdated: text,
	}),
	projectDetail: z.strictObject({
		organization: text,
		overview: text,
		architecture: text,
		contributions: text,
		technologies: text,
	}),
	cv: z.strictObject({
		experience: text,
		education: text,
		skills: text,
		projects: text,
		contact: text,
	}),
	portfolio: z.strictObject({
		profile: z.strictObject({
			summary: text,
		}),
		experience: z.record(
			text,
			z.strictObject({
				summary: text,
				technologies: names,
			}),
		),
		education: z.record(
			text,
			z.strictObject({
				credential: text,
				detail: text,
			}),
		),
		projects: z.record(text, z.unknown()),
		skills: z.record(
			text,
			z.strictObject({
				name: text,
				skills: names,
			}),
		),
	}),
});

/** The validated shape of one locale JSON file. */
export type TranslationFile = z.infer<typeof messages>;

export function parseTranslationFile(value: unknown): TranslationFile {
	return messages.parse(value);
}
