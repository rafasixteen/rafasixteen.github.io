import type { ReactElement, ReactNode } from "react";
import { Atom, Braces, Database, FileCode2, Network, Server } from "lucide-react";
import { z } from "zod";
import { CalPlatformDetail, CalJudgeDetail } from "@/components/projects/cal-details";
import { routing, type Locale } from "@/i18n/routing";

const technologySchema = z.object({
	name: z.string().min(1),
	icon: z.custom<ReactElement>(),
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
	technologies: z.array(technologySchema).min(1),
	media: z.array(projectMediaSharedSchema).default([]),
	details: z.custom<() => Promise<ReactNode>>((value) => typeof value === "function"),
});

export type ProjectSharedData = z.infer<typeof projectSharedDataSchema>;

export type ProjectMediaShared = z.infer<typeof projectMediaSharedSchema>;

export type Project = ProjectSharedData;

export const projects: ProjectSharedData[] = [
	{
		translationKey: "cal-platform",
		name: "CAL Platform",
		details: CalPlatformDetail,
		technologies: [
			{ name: "Go", icon: <Server aria-hidden="true" size={16} strokeWidth={1.8} /> },
			{ name: "PostgreSQL", icon: <Database aria-hidden="true" size={16} strokeWidth={1.8} /> },
			{ name: "Datastar", icon: <Network aria-hidden="true" size={16} strokeWidth={1.8} /> },
			{ name: "Docker", icon: <Server aria-hidden="true" size={16} strokeWidth={1.8} /> },
		],
		media: [],
	},
	{
		translationKey: "cal-judge",
		name: "CAL Judge",
		details: CalJudgeDetail,
		technologies: [
			{ name: "Kotlin Multiplatform", icon: <FileCode2 aria-hidden="true" size={16} strokeWidth={1.8} /> },
			{ name: "Android", icon: <Atom aria-hidden="true" size={16} strokeWidth={1.8} /> },
			{ name: "Gradle", icon: <Braces aria-hidden="true" size={16} strokeWidth={1.8} /> },
			{ name: "Go API", icon: <Server aria-hidden="true" size={16} strokeWidth={1.8} /> },
		],
		media: [],
	},
];

export function projectSlug(project: Pick<ProjectSharedData, "translationKey">): string {
	return project.translationKey;
}

export function projectRouteParams(): Array<{ locale: Locale; slug: string }> {
	return routing.locales.flatMap((locale) =>
		projects.map((project) => ({
			locale: locale,
			slug: projectSlug(project),
		})),
	);
}
