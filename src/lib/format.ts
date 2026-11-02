import type { Locale } from "@/i18n/routing";

export function formatDate(value: string, locale: Locale): string {
	const [year, month] = value.split("-").map(Number);
	return new Intl.DateTimeFormat(locale === "pt" ? "pt-PT" : "en-GB", {
		month: "short",
		year: "numeric",
		timeZone: "UTC",
	}).format(new Date(Date.UTC(year, month - 1, 1)));
}
