import { z } from "zod";
import { routing } from "@/i18n/routing";
import { educationSchema } from "./education";
import { experienceSchema } from "./experience";
import { profileSchema } from "./profile";
import { projectMediaSharedSchema, projectSharedDataSchema } from "./project";
import { skillGroupSchema } from "./skill-group";

const localizedProjectMediaSchema = projectMediaSharedSchema.and(
	z.object({
		alt: z.string().min(1),
		caption: z.string().min(1).optional(),
	}),
);

export const localizedProjectSchema = projectSharedDataSchema.extend({
	media: z.array(localizedProjectMediaSchema),
});

export const portfolioContentSchema = z.object({
	locale: z.enum(routing.locales),
	profile: profileSchema,
	experience: z.array(experienceSchema),
	education: z.array(educationSchema),
	projects: z.array(localizedProjectSchema),
	skills: z.array(skillGroupSchema),
});

export type PortfolioContent = z.infer<typeof portfolioContentSchema>;

export type LocalizedProjectMedia = z.infer<typeof localizedProjectMediaSchema>;

export type LocalizedProject = Omit<PortfolioContent["projects"][number], "media"> & {
	media: Array<LocalizedProjectMedia>;
};
