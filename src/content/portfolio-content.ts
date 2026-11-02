import { z } from "zod";
import { educationSchema } from "./education";
import { experienceSchema } from "./experience";
import { profileSchema } from "./profile";
import { projectSchema } from "./project";
import { skillGroupSchema } from "./skill-group";

export const portfolioContentSchema = z.object({
	locale: z.enum(["en", "pt"]),
	profile: profileSchema,
	experience: z.array(experienceSchema),
	education: z.array(educationSchema),
	projects: z.array(projectSchema),
	skills: z.array(skillGroupSchema),
});

export type PortfolioContent = z.infer<typeof portfolioContentSchema>;
