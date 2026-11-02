import { projectRouteParams, projectSlug } from "@/content/project";
import { portfolioContent } from "@/content/validation";
import { site } from "@/config/site";
import { localeAlternates, routing } from "@/i18n/routing";
import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";

export const dynamicParams = false;
export const generateStaticParams = projectRouteParams;

interface ProjectPageProps {
	params: Promise<{ locale: string; slug: string }>;
}

function getProject(locale: string, slug: string) {
	if (!hasLocale(routing.locales, locale)) {
		notFound();
	}

	const project = portfolioContent[locale].projects.find((entry) => projectSlug(entry) === slug);

	if (!project) {
		notFound();
	}

	return { locale, project };
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
	const { locale: value, slug } = await params;
	const { locale, project } = getProject(value, slug);

	return {
		title: `${project.name} - ${site.name}`,
		description: project.summary,
		alternates: localeAlternates(locale, `/projects/${slug}`),
	};
}

export default async function ProjectPage({ params }: ProjectPageProps) {
	const { locale: value, slug } = await params;
	const { project } = getProject(value, slug);
	const Details = project.details;

	return <Details />;
}
