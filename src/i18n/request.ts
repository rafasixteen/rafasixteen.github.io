import * as rootParams from "next/root-params";
import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { getRequestConfig } from "next-intl/server";
import { locales } from "@/lib/locales";

export default getRequestConfig(async ({ locale }) => {
	if (!locale) {
		const value = await rootParams.locale();

		if (!hasLocale(locales, value)) {
			notFound();
		}

		locale = value;
	}

	return {
		locale: locale,
		messages: (await import(`../translations/${locale}.json`)).default,
	};
});
