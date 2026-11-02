import type { ReactElement } from "react";
import { Braces, Database, FileCode2, GitBranch, Network, Server } from "lucide-react";
import { z } from "zod";
import { dateRangeSchema } from "./date-range";

const experienceTechnologySchema = z.object({
	name: z.string().min(1),
	icon: z.custom<ReactElement>(),
});

export const experienceSharedDataSchema = dateRangeSchema.extend({
	translationKey: z.string().min(1),
	company: z.string().min(1),
	location: z.string().min(1),
	url: z.url().optional(),
	start: z.string().regex(/^\d{4}-\d{2}$/),
	technologies: z.array(experienceTechnologySchema).min(1),
});

export const experienceTranslationSchema = z.object({
	summary: z.string().min(1),
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
		technologies: [
			{ name: "HTML and CSS", icon: <Braces aria-hidden="true" size={16} strokeWidth={1.8} /> },
			{ name: "Networking", icon: <Network aria-hidden="true" size={16} strokeWidth={1.8} /> },
			{ name: "Smart home automation", icon: <Network aria-hidden="true" size={16} strokeWidth={1.8} /> },
			{ name: "3D modeling and printing", icon: <FileCode2 aria-hidden="true" size={16} strokeWidth={1.8} /> },
			{ name: "Electronics", icon: <Database aria-hidden="true" size={16} strokeWidth={1.8} /> },
			{ name: "FileMaker Pro", icon: <Database aria-hidden="true" size={16} strokeWidth={1.8} /> },
		],
	},
	{
		translationKey: "janela-digital",
		company: "Janela Digital Informática e Telecomunicações S.A.",
		location: "Óbidos, Portugal",
		start: "2024-04",
		end: "2024-06",
		technologies: [
			{ name: "ASP.NET Core MVC", icon: <Server aria-hidden="true" size={16} strokeWidth={1.8} /> },
			{ name: "Razor Pages", icon: <FileCode2 aria-hidden="true" size={16} strokeWidth={1.8} /> },
			{ name: "Bootstrap", icon: <Braces aria-hidden="true" size={16} strokeWidth={1.8} /> },
			{ name: "Git", icon: <GitBranch aria-hidden="true" size={16} strokeWidth={1.8} /> },
		],
	},
];
