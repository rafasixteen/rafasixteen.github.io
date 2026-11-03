import type { MetadataRoute } from "next";
import { site } from "@/config/site";
import { locales } from "@/lib/locales";

// required for output: export
export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
	return locales.map((locale) => ({
		url: new URL(`/${locale}/`, site.url).toString(),
		changeFrequency: "monthly",
		priority: 1,
		alternates: {
			languages: Object.fromEntries(locales.map((item) => [item, new URL(`/${item}/`, site.url).toString()])),
		},
	}));
}
