import type { ReactElement, ReactNode } from "react";
import { Atom, Braces, Database, FileCode2, GitBranch, Network, Server } from "lucide-react";
import { z } from "zod";
import { PersonalPortfolioDetail } from "@/components/projects/personal-portfolio-detail";
import { RealEstateDetail } from "@/components/projects/real-estate-detail";
import { TrafficLightDetail } from "@/components/projects/traffic-light-detail";
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
	url: z.url(),
	repository: z.url().optional(),
	technologies: z.array(technologySchema).min(1),
	media: z.array(projectMediaSharedSchema).default([]),
	details: z.custom<() => Promise<ReactNode>>((value) => typeof value === "function"),
});

export const projectTranslationSchema = z.object({
	summary: z.string().min(1),
	impact: z.string().min(1),
	overview: z.string().min(1),
	contributions: z.array(z.string().min(1)).min(1),
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
		translationKey: "personal-portfolio",
		name: "Personal Portfolio",
		details: PersonalPortfolioDetail,
		// TODO: Replace with Rafael's deployed portfolio URL.
		url: "https://example.com/portfolio",
		technologies: [
			{
				name: "Next.js",
				icon: <FileCode2 aria-hidden="true" size={16} strokeWidth={1.8} />,
			},
			{
				name: "TypeScript",
				icon: <Braces aria-hidden="true" size={16} strokeWidth={1.8} />,
			},
			{
				name: "next-intl",
				icon: <Network aria-hidden="true" size={16} strokeWidth={1.8} />,
			},
		],
		media: [
			{
				translationKey: "home",
				type: "image",
				src: "/images/projects/portfolio-overview.svg",
			},
			{
				translationKey: "locales",
				type: "image",
				src: "/images/projects/portfolio-locales.svg",
			},
			{
				translationKey: "cv",
				type: "image",
				src: "/images/projects/portfolio-cv.svg",
			},
		],
	},
	{
		translationKey: "real-estate-platform",
		name: "Real-estate web application",
		details: RealEstateDetail,
		// TODO: Replace with a public project URL if one is available.
		url: "https://example.com/real-estate-platform",
		technologies: [
			{
				name: "ASP.NET Core MVC",
				icon: <Server aria-hidden="true" size={16} strokeWidth={1.8} />,
			},
			{
				name: "Razor Pages",
				icon: <FileCode2 aria-hidden="true" size={16} strokeWidth={1.8} />,
			},
			{
				name: "Bootstrap",
				icon: <Braces aria-hidden="true" size={16} strokeWidth={1.8} />,
			},
			{
				name: "Git",
				icon: <GitBranch aria-hidden="true" size={16} strokeWidth={1.8} />,
			},
		],
		media: [
			{
				translationKey: "search",
				type: "image",
				src: "/images/projects/real-estate-search.svg",
			},
			{
				translationKey: "filters",
				type: "image",
				src: "https://placehold.co/1280x720/0b1f20/7de7d1.gif?text=Animated+filter+mock",
			},
			{
				translationKey: "demo",
				type: "video",
				src: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
				poster: "/images/projects/real-estate-map.svg",
			},
		],
	},
	{
		translationKey: "traffic-light-system",
		name: "Arduino traffic-light system",
		details: TrafficLightDetail,
		// TODO: Replace with a public project URL if one is available.
		url: "https://example.com/traffic-light-system",
		technologies: [
			{
				name: "Arduino Mega",
				icon: <Server aria-hidden="true" size={16} strokeWidth={1.8} />,
			},
			{
				name: "FreeCAD",
				icon: <FileCode2 aria-hidden="true" size={16} strokeWidth={1.8} />,
			},
			{
				name: "3D printing",
				icon: <Atom aria-hidden="true" size={16} strokeWidth={1.8} />,
			},
			{
				name: "Electronics",
				icon: <Database aria-hidden="true" size={16} strokeWidth={1.8} />,
			},
		],
		media: [
			{
				translationKey: "model",
				type: "image",
				src: "/images/projects/traffic-light-model.svg",
			},
			{
				translationKey: "wiring",
				type: "image",
				src: "/images/projects/traffic-light-wiring.svg",
			},
		],
	},
];

export function projectSlug(project: Pick<ProjectSharedData, "translationKey">): string {
	return project.translationKey;
}

export function projectRouteParams(): Array<{ locale: Locale; slug: string }> {
	return routing.locales.flatMap((locale) => projects.map((project) => ({ locale, slug: projectSlug(project) })));
}
