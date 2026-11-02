import { z } from "zod";

export const dateRangeSchema = z.object({
	start: z.string().regex(/^\d{4}-\d{2}$/),
	end: z
		.string()
		.regex(/^\d{4}-\d{2}$/)
		.optional(),
});

export type DateRange = z.infer<typeof dateRangeSchema>;
