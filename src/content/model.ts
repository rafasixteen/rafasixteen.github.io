import type { Locale } from "@/lib/locales";
import type { Education } from "./education";
import type { Experience } from "./experience";
import type { Profile } from "./profile";
import type { Project } from "./project";
import type { SkillGroup } from "./skill-group";

/** The complete localized portfolio model passed to pages, components, and the CV generator. */
export interface PortfolioContent {
	locale: Locale;
	profile: Profile;
	experience: Experience[];
	education: Education[];
	projects: Project[];
	skills: SkillGroup[];
}
