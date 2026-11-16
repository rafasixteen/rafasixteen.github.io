import { z } from "zod";
import { commonProjectTranslationSchema } from "@/content/translations";

const text = z.string().trim().min(1);

export const calJudgeTranslationSchema = commonProjectTranslationSchema.extend({
	impact: text,
	organization: text.optional(),
	overview: text.optional(),
	contributions: z.array(text).default([]),
	architecture: z.array(z.strictObject({ title: text, description: text })).default([]),
});
