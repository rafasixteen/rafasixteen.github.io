import type { Locale } from "@/lib/locales";
import { getDateTimeLocale } from "@/lib/locales";

export function formatDate(value: string, locale: Locale): string {
	const [year, month] = value.split("-").map(Number);

	return new Intl.DateTimeFormat(getDateTimeLocale(locale), {
		month: "short",
		year: "numeric",
		timeZone: "UTC",
	}).format(new Date(Date.UTC(year, month - 1, 1)));
}

export function formatDateTime(value: string, locale: string): string {
	return new Intl.DateTimeFormat(getDateTimeLocale(locale), {
		day: "numeric",
		month: "short",
		year: "numeric",
		timeZone: "UTC",
	}).format(new Date(value));
}
