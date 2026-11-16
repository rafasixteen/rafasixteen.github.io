import { z } from "zod";
import { commonProjectTranslationSchema } from "@/content/translations";

const text = z.string().trim().min(1);

const architectureItems = z.array(z.strictObject({ title: text, description: text }));

export const minecraftServerTranslationSchema = commonProjectTranslationSchema.extend({
	impact: text,
	overview: text,
	architecture: architectureItems,
	diagram: z.strictObject({
		ariaLabel: text,
		accessPaths: text,
		localhost: text,
		lan: text,
		privateVpn: text,
		publicTunnel: text,
		crafty: text,
		minecraft: text,
	}),
});
