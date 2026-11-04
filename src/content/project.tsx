import { Atom, Braces, Database, FileCode2, Network, Server } from "lucide-react";
import { CalPlatformDetail, calPlatformTranslationSchema } from "@/components/projects/details/cal-platform-details";
import { CalJudgeDetail, calJudgeTranslationSchema } from "@/components/projects/details/cal-judge-details";
import { locales, type Locale } from "@/lib/locales";
import type { ReactNode } from "react";
import type { z } from "zod";
import type { IconItem, IconItemSource } from "./icon-item";
import type { commonProjectTranslationSchema } from "./translations";

/** A fully assembled project consumed by routes and components. */
export interface Project {
	translationKey: string;
	name: string;
	technologies: IconItem[];
	summary: string;
	details: () => Promise<ReactNode>;
}

/** Parsed common project translations plus the renderer bound to project-specific content. */
type ParsedProjectTranslation = z.infer<typeof commonProjectTranslationSchema> & {
	render: (project: Project) => Promise<ReactNode>;
};

/** Project data and parser used to create a localized project at build time. */
interface ProjectDefinition {
	translationKey: string;
	technologies: IconItemSource[];
	parse: (value: unknown) => ParsedProjectTranslation;
}

export const projects: ProjectDefinition[] = [
	{
		translationKey: "cal-platform",
		parse: (value) => {
			const content = calPlatformTranslationSchema.parse(value);
			return {
				...content,
				render: async (project) => <CalPlatformDetail project={project} content={content} />,
			};
		},
		technologies: [
			{ id: "go", icon: <Server aria-hidden="true" size={16} strokeWidth={1.8} /> },
			{ id: "postgresql", icon: <Database aria-hidden="true" size={16} strokeWidth={1.8} /> },
			{ id: "datastar", icon: <Network aria-hidden="true" size={16} strokeWidth={1.8} /> },
			{ id: "docker", icon: <Server aria-hidden="true" size={16} strokeWidth={1.8} /> },
		],
	},
	{
		translationKey: "cal-judge",
		parse: (value) => {
			const content = calJudgeTranslationSchema.parse(value);
			return {
				...content,
				render: async (project) => <CalJudgeDetail project={project} content={content} />,
			};
		},
		technologies: [
			{ id: "kotlin-multiplatform", icon: <FileCode2 aria-hidden="true" size={16} strokeWidth={1.8} /> },
			{ id: "android", icon: <Atom aria-hidden="true" size={16} strokeWidth={1.8} /> },
			{ id: "gradle", icon: <Braces aria-hidden="true" size={16} strokeWidth={1.8} /> },
			{ id: "go-api", icon: <Server aria-hidden="true" size={16} strokeWidth={1.8} /> },
		],
	},
] satisfies ProjectDefinition[];

export function projectSlug(project: Pick<Project, "translationKey">): string {
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
