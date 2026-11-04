import type { ReactElement, ReactNode } from "react";
import { Atom, Braces, Database, FileCode2, Network, Server } from "lucide-react";
import { z } from "zod";
import { CalPlatformDetail, CalJudgeDetail } from "@/components/projects/cal-details";
import { locales, type Locale } from "@/lib/locales";

const technologySharedSchema = z.object({
	id: z.string().min(1),
	icon: z.custom<ReactElement>(),
});

export const technologySchema = technologySharedSchema.extend({
	name: z.string().min(1),
});

export const technologyTranslationSchema = z.object({
	id: z.string().min(1),
	name: z.string().min(1),
});

export const projectMediaSharedSchema = z.discriminatedUnion("type", [
	z.object({
		translationKey: z.string().min(1),
		type: z.literal("image"),
		src: z.string().min(1),
	}),
	z.object({
		translationKey: z.string().min(1),
		type: z.literal("video"),
		src: z.string().min(1),
		poster: z.string().min(1).optional(),
	}),
]);

export const projectSharedDataSchema = z.object({
	translationKey: z.string().min(1),
	name: z.string().min(1),
	url: z.url().optional(),
	repository: z.url().optional(),
	technologies: z.array(technologySharedSchema).min(1),
	media: z.array(projectMediaSharedSchema).default([]),
	details: z.custom<() => Promise<ReactNode>>((value) => typeof value === "function"),
});

export type ProjectSharedData = z.infer<typeof projectSharedDataSchema>;

export type Technology = z.infer<typeof technologySchema>;

export type TechnologyTranslation = z.infer<typeof technologyTranslationSchema>;

export type ProjectMediaShared = z.infer<typeof projectMediaSharedSchema>;

export type Project = Omit<ProjectSharedData, "technologies"> & {
	technologies: Technology[];
};

export const projects: ProjectSharedData[] = [
	{
		translationKey: "cal-platform",
		name: "CAL Platform",
		details: CalPlatformDetail,
		technologies: [
			{ id: "go", icon: <Server aria-hidden="true" size={16} strokeWidth={1.8} /> },
			{ id: "postgresql", icon: <Database aria-hidden="true" size={16} strokeWidth={1.8} /> },
			{ id: "datastar", icon: <Network aria-hidden="true" size={16} strokeWidth={1.8} /> },
			{ id: "docker", icon: <Server aria-hidden="true" size={16} strokeWidth={1.8} /> },
		],
		media: [],
	},
	{
		translationKey: "cal-judge",
		name: "CAL Judge",
		details: CalJudgeDetail,
		technologies: [
			{ id: "kotlin-multiplatform", icon: <FileCode2 aria-hidden="true" size={16} strokeWidth={1.8} /> },
			{ id: "android", icon: <Atom aria-hidden="true" size={16} strokeWidth={1.8} /> },
			{ id: "gradle", icon: <Braces aria-hidden="true" size={16} strokeWidth={1.8} /> },
			{ id: "go-api", icon: <Server aria-hidden="true" size={16} strokeWidth={1.8} /> },
		],
		media: [],
	},
];

export function projectSlug(project: Pick<ProjectSharedData, "translationKey">): string {
	return project.translationKey;
}

export function projectRouteParams(): Array<{ locale: Locale; slug: string }> {
	return locales.flatMap((locale) =>
		projects.map((project) => ({
			locale: locale,
			slug: projectSlug(project),
		})),
	);
}
