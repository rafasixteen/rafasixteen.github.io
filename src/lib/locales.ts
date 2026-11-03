const localeFormats = {
	en: {
		dateTime: "en-GB",
		openGraph: "en_GB",
	},
	pt: {
		dateTime: "pt-PT",
		openGraph: "pt_PT",
	},
} as const;

export type Locale = keyof typeof localeFormats;

export const locales = Object.keys(localeFormats) as [Locale, ...Locale[]];

export const defaultLocale: Locale = "pt";

export interface LocaleProps {
	params: Promise<{ locale: string }>;
}

function getLocaleFormat(locale: string) {
	const supportedLocale = locales.includes(locale as Locale) ? (locale as Locale) : defaultLocale;

	return localeFormats[supportedLocale];
}

export function getDateTimeLocale(locale: string): string {
	return getLocaleFormat(locale).dateTime;
}

export function getOpenGraphLocale(locale: string): string {
	return getLocaleFormat(locale).openGraph;
}

export function localeAlternates(locale: string, path = "") {
	return {
		canonical: `/${locale}${path}/`,
		languages: Object.fromEntries(locales.map((item) => [item, `/${item}${path}/`])),
	};
}

export function localeParams() {
	return locales.map((locale) => ({ locale }));
}
