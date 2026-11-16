import { getMessages } from "next-intl/server";
import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { site } from "@/config/site";
import type { Project } from "@/content/project";
import { portfolioContent } from "@/content/portfolio";
import { localeAlternates, locales, type Locale } from "@/lib/locales";

export interface ProjectPageProps {
	params: Promise<{ locale: string }>;
}

interface ProjectMessages {
	portfolio: {
		projects: Record<string, unknown>;
	};
}

export async function getProjectPage(
	slug: string,
	params: ProjectPageProps["params"],
): Promise<{ locale: Locale; project: Project }> {
	const { locale: value } = await params;

	if (!hasLocale(locales, value)) {
		notFound();
	}

	const project = portfolioContent[value].projects.find((entry) => entry.translationKey === slug);

	if (!project) {
		notFound();
	}

	return {
		locale: value,
		project: project,
	};
}

export function getProjectMetadata(slug: string) {
	return async ({ params }: ProjectPageProps): Promise<Metadata> => {
		const { locale, project } = await getProjectPage(slug, params);

		return {
			title: `${project.name} - ${site.name}`,
			description: project.summary,
			alternates: localeAlternates(locale, `/projects/${slug}`),
		};
	};
}

export async function getProjectTranslation(slug: string): Promise<unknown> {
	const messages = (await getMessages()) as ProjectMessages;
	return messages.portfolio.projects[slug];
}
