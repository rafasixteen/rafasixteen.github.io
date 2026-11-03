import { defineRouting } from "next-intl/routing";
import { defaultLocale, locales } from "@/lib/locales";

export const routing = defineRouting({
	locales: locales,
	defaultLocale: defaultLocale,
	// No middleware in a static export, so every locale is addressed explicitly.
	localePrefix: "always",
});
