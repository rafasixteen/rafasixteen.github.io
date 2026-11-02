import { z } from "zod";
import { dateRangeSchema } from "./date-range";

export const educationSharedDataSchema = dateRangeSchema.extend({
	translationKey: z.string().min(1),
	institution: z.string().min(1),
	location: z.string().min(1),
});

export const educationTranslationSchema = z.object({
	credential: z.string().min(1),
	detail: z.string().min(1),
});

export const educationSchema = educationSharedDataSchema.extend(educationTranslationSchema.shape);

export type EducationSharedData = z.infer<typeof educationSharedDataSchema>;

export type EducationTranslation = z.infer<typeof educationTranslationSchema>;

export type Education = z.infer<typeof educationSchema>;

export type EducationTranslations = Record<string, EducationTranslation>;

export const education: EducationSharedData[] = [
	{
		translationKey: "ulo-tesp",
		institution: "Universidade de Leiria e Oeste (ULO)",
		location: "Campus 2, Morro do Lena, Alto do Vieiro, Leiria, Portugal",
		start: "2025-09",
	},
	{
		translationKey: "raul-proenca",
		institution: "Escola Secundária Raúl Proença",
		location: "Caldas da Rainha, Portugal",
		start: "2022-09",
		end: "2025-06",
	},
];
