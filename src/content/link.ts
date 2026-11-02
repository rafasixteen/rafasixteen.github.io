import { z } from "zod";

export const linkSchema = z.object({
	label: z.string().min(1),
	url: z.url(),
});

export type Link = z.infer<typeof linkSchema>;
