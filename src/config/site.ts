import { profile } from "@/content/profile";

function profileLink(label: string): string | undefined {
	return profile.links.find((link) => link.label === label)?.url;
}

export const site = {
	name: profile.name,
	shortName: "RR",
	// TODO: Set NEXT_PUBLIC_SITE_URL for the production deployment.
	url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.github.io",
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
