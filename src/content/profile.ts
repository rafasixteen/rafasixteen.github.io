import { z } from "zod";
import { linkSchema } from "./link";

export const profileSharedDataSchema = z.object({
	name: z.string().min(1),
	location: z.string().min(1),
	email: z.email(),
	links: z.array(linkSchema),
});

export const profileTranslationSchema = z.object({
	summary: z.string().min(1),
});

export const profileSchema = profileSharedDataSchema.extend(profileTranslationSchema.shape);

export type ProfileSharedData = z.infer<typeof profileSharedDataSchema>;

export type ProfileTranslation = z.infer<typeof profileTranslationSchema>;

export type Profile = z.infer<typeof profileSchema>;

export const profile: ProfileSharedData = {
	name: "Rafael Da Silva Rego",
	location: "Bombarral, Portugal",
	email: "rafaelrego16@gmail.com",
	links: [
		{ label: "LinkedIn", url: "https://www.linkedin.com/in/rafasixteen" },
		{ label: "GitHub", url: "https://github.com/rafasixteen" },
		{ label: "Instagram", url: "https://www.instagram.com/rafasixteen" },
		{ label: "Portfolio", url: "https://rafasixteen.github.io/portfolio/" },
	],
};

export function getFirstAndLastName(name: string): string {
	const nameParts = name.trim().split(/\s+/).filter(Boolean);

	if (nameParts.length < 2) {
		return nameParts[0] ?? "";
	}

	return `${nameParts[0]} ${nameParts.at(-1)}`;
}

export function getInitials(name: string): string {
	return getFirstAndLastName(name)
		.split(" ")
		.map((namePart) => namePart[0]?.toUpperCase() ?? "")
		.join("");
}
