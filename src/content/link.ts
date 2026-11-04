import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { z } from "zod";

export const linkSchema = z.object({
	label: z.string().min(1),
	url: z.url(),
	icon: z.custom<IconDefinition>(),
});

export type Link = z.infer<typeof linkSchema>;
