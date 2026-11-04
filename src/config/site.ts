import { getFirstAndLastName, getInitials, profile } from "@/content/profile";

export const site = {
	name: `${getFirstAndLastName(profile.name)} - Portfolio`,
	shortName: getInitials(profile.name),
	url: getSiteUrl(),
	lastUpdatedAt: process.env.NEXT_PUBLIC_LAST_UPDATED ?? new Date().toISOString(),
	author: {
		name: profile.name,
		email: profile.email,
	},
	social: {
		github: profileLink("GitHub"),
		linkedin: profileLink("LinkedIn"),
		instagram: profileLink("Instagram"),
		portfolio: profileLink("Portfolio"),
	},
} as const;

function getSiteUrl(): string {
	const configuredSiteUrl = process.env.NEXT_PUBLIC_SITE_URL;

	if (configuredSiteUrl) {
		return configuredSiteUrl;
	}

	if (process.env.GITHUB_ACTIONS === "true") {
		throw new Error("NEXT_PUBLIC_SITE_URL must be configured for GitHub Pages builds.");
	}

	return "http://localhost";
}

function profileLink(label: string): string | undefined {
	return profile.links.find((link) => link.label === label)?.url;
}
