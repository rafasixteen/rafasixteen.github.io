import type { ReactElement } from "react";
import { Atom, Braces, Database, FileCode2, GitBranch, Network, Server } from "lucide-react";
import { z } from "zod";

const technologySchema = z.object({
	name: z.string().min(1),
	icon: z.custom<ReactElement>(),
});

export const projectSharedDataSchema = z.object({
	translationKey: z.string().min(1),
	name: z.string().min(1),
	url: z.url(),
	repository: z.url().optional(),
	technologies: z.array(technologySchema).min(1),
});

export const projectTranslationSchema = z.object({
	summary: z.string().min(1),
	impact: z.string().min(1),
});

export const projectSchema = projectSharedDataSchema.extend(projectTranslationSchema.shape);

export type ProjectSharedData = z.infer<typeof projectSharedDataSchema>;

export type ProjectTranslation = z.infer<typeof projectTranslationSchema>;

export type Project = z.infer<typeof projectSchema>;

export type ProjectTranslations = Record<string, ProjectTranslation>;

export const projects: ProjectSharedData[] = [
	{
		translationKey: "personal-portfolio",
		name: "Personal Portfolio",
		// TODO: Replace with Rafael's deployed portfolio URL.
		url: "https://example.com/portfolio",
		technologies: [
			{ name: "Next.js", icon: <FileCode2 aria-hidden="true" size={16} strokeWidth={1.8} /> },
			{ name: "TypeScript", icon: <Braces aria-hidden="true" size={16} strokeWidth={1.8} /> },
			{ name: "next-intl", icon: <Network aria-hidden="true" size={16} strokeWidth={1.8} /> },
		],
	},
	{
		translationKey: "real-estate-platform",
		name: "Real-estate web application",
		// TODO: Replace with a public project URL if one is available.
		url: "https://example.com/real-estate-platform",
		technologies: [
			{ name: "ASP.NET Core MVC", icon: <Server aria-hidden="true" size={16} strokeWidth={1.8} /> },
			{ name: "Razor Pages", icon: <FileCode2 aria-hidden="true" size={16} strokeWidth={1.8} /> },
			{ name: "Bootstrap", icon: <Braces aria-hidden="true" size={16} strokeWidth={1.8} /> },
			{ name: "Git", icon: <GitBranch aria-hidden="true" size={16} strokeWidth={1.8} /> },
		],
	},
	{
		translationKey: "traffic-light-system",
		name: "Arduino traffic-light system",
		// TODO: Replace with a public project URL if one is available.
		url: "https://example.com/traffic-light-system",
		technologies: [
			{ name: "Arduino Mega", icon: <Server aria-hidden="true" size={16} strokeWidth={1.8} /> },
			{ name: "FreeCAD", icon: <FileCode2 aria-hidden="true" size={16} strokeWidth={1.8} /> },
			{ name: "3D printing", icon: <Atom aria-hidden="true" size={16} strokeWidth={1.8} /> },
			{ name: "Electronics", icon: <Database aria-hidden="true" size={16} strokeWidth={1.8} /> },
		],
	},
];
