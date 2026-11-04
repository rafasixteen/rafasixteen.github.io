import { faGithub, faInstagram, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { faGlobe } from "@fortawesome/free-solid-svg-icons";
import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";

/** A profile link rendered with a Font Awesome icon. */
export interface Link {
	label: string;
	url: string;
	icon: IconDefinition;
}

/** The profile fields authored in TypeScript before its summary is translated. */
export interface ProfileSource {
	name: string;
	location: string;
	email: string;
	links: Link[];
}

/** The complete localized profile consumed by the site. */
export interface Profile {
	name: string;
	location: string;
	email: string;
	links: Link[];
	summary: string;
}

export const profile = {
	name: "Rafael Da Silva Rego",
	location: "Bombarral, Portugal",
	email: "rafaelrego16@gmail.com",
	links: [
		{ label: "LinkedIn", url: "https://www.linkedin.com/in/rafasixteen", icon: faLinkedin },
		{ label: "GitHub", url: "https://github.com/rafasixteen", icon: faGithub },
		{ label: "Instagram", url: "https://www.instagram.com/rafasixteen", icon: faInstagram },
		{ label: "Portfolio", url: "https://rafasixteen.github.io/portfolio/", icon: faGlobe },
	],
} satisfies ProfileSource;

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
