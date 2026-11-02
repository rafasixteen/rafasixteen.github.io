import type { ReactElement, ReactNode } from "react";
import { Atom, Braces, Database, FileCode2, Network, Server } from "lucide-react";
import { z } from "zod";
import { CalPlatformDetail, CalJudgeDetail } from "@/components/projects/cal-details";
import { routing, type Locale } from "@/i18n/routing";

const technologySchema = z.object({
	name: z.string().min(1),
	icon: z.custom<ReactElement>(),
});

const projectMediaSharedSchema = z.discriminatedUnion("type", [
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

const projectMediaTranslationSchema = z.object({
	alt: z.string().min(1),
	caption: z.string().min(1).optional(),
});

const projectMediaSchema = projectMediaSharedSchema.and(projectMediaTranslationSchema);

export const projectSharedDataSchema = z.object({
	translationKey: z.string().min(1),
	name: z.string().min(1),
	url: z.url().optional(),
	organizationUrl: z.url().optional(),
	repository: z.url().optional(),
	technologies: z.array(technologySchema).min(1),
	media: z.array(projectMediaSharedSchema).default([]),
	details: z.custom<() => Promise<ReactNode>>((value) => typeof value === "function"),
});

export const projectTranslationSchema = z.object({
	summary: z.string().min(1),
	impact: z.string().min(1),
	organization: z.string().min(1),
	overview: z.string().min(1),
	contributions: z.array(z.string().min(1)).min(1),
	architecture: z
		.array(
			z.object({
				title: z.string().min(1),
				description: z.string().min(1),
			}),
		)
		.min(1)
		.optional(),
	media: z.record(z.string().min(1), projectMediaTranslationSchema),
});

export const projectSchema = projectSharedDataSchema
	.omit({ media: true })
	.extend(projectTranslationSchema.omit({ media: true }).shape)
	.extend({ media: z.array(projectMediaSchema) });

export type ProjectSharedData = z.infer<typeof projectSharedDataSchema>;

export type ProjectTranslation = z.infer<typeof projectTranslationSchema>;

export type ProjectMedia = z.infer<typeof projectMediaSchema>;

export type Project = z.infer<typeof projectSchema>;

export type ProjectTranslations = Record<string, ProjectTranslation>;

export const projects: ProjectSharedData[] = [
	{
		translationKey: "cal-platform",
		name: "Calisthenics Alliance - Event Platform",
		details: CalPlatformDetail,
		organizationUrl: "https://calisthenicsalliance.com/",
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
		name: "CAL Judge - Native Judging App",
		details: CalJudgeDetail,
		organizationUrl: "https://calisthenicsalliance.com/",
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
	return routing.locales.flatMap((locale) => projects.map((project) => ({ locale, slug: projectSlug(project) })));
}
