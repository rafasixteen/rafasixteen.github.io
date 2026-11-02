import { routing } from "@/i18n/routing";
import { hasLocale } from "next-intl";
import { getLocale } from "next-intl/server";

export async function getProjectContent(projectKey: string) {
	const locale = await getLocale();

	if (!hasLocale(routing.locales, locale)) {
		throw new Error(`Unsupported locale ${locale}`);
	}

	const { portfolioContent } = await import("@/content/validation");
	const project = portfolioContent[locale].projects.find((entry) => entry.translationKey === projectKey);

	if (!project) {
		throw new Error(`Missing project content for ${projectKey}`);
	}

	return project;
}
