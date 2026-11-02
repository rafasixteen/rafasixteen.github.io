import { profile } from "@/content/profile";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;

if (!siteUrl) {
	throw new Error("NEXT_PUBLIC_SITE_URL must be configured before building the site.");
}

function profileLink(label: string): string | undefined {
	return profile.links.find((link) => link.label === label)?.url;
}

export const site = {
	name: profile.name,
	shortName: "RR",
	url: siteUrl,
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
