import { z } from "zod";
import { dateRangeSchema } from "./date-range";

export const experienceSharedDataSchema = dateRangeSchema.extend({
	translationKey: z.string().min(1),
	company: z.string().min(1),
	location: z.string().min(1),
	url: z.url().optional(),
	start: z.string().regex(/^\d{4}-\d{2}$/),
});

export const experienceTranslationSchema = z.object({
	role: z.string().min(1),
	summary: z.string().min(1),
	highlights: z.array(z.string().min(1)).min(1),
});

export const experienceSchema = experienceSharedDataSchema.extend(experienceTranslationSchema.shape);

export type ExperienceSharedData = z.infer<typeof experienceSharedDataSchema>;

export type ExperienceTranslation = z.infer<typeof experienceTranslationSchema>;

export type Experience = z.infer<typeof experienceSchema>;

export type ExperienceTranslations = Record<string, ExperienceTranslation>;

export const experience: ExperienceSharedData[] = [
	{
		translationKey: "vitalis",
		company: "VITALIS GmbH",
		location: "Schkeuditz, Germany",
		start: "2025-01",
		end: "2025-03",
	},
	{
		translationKey: "janela-digital",
		company: "Janela Digital Informática e Telecomunicações S.A.",
		location: "Óbidos, Portugal",
		start: "2024-04",
		end: "2024-06",
	},
];
