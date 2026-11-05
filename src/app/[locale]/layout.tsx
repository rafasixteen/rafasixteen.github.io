import "@/app/globals.css";

import Script from "next/script";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { Footer, Navbar } from "@/components/layout";
import { site } from "@/config/site";
import { portfolioContent } from "@/content/portfolio";
import {
	defaultLocale,
	getOpenGraphLocale,
	localeAlternates,
	localeParams,
	locales,
	type LocaleProps,
} from "@/lib/locales";

export const dynamicParams = false;
export const generateStaticParams = localeParams;

export async function generateMetadata({ params }: LocaleProps): Promise<Metadata> {
	const { locale: value } = await params;

	const locale = hasLocale(locales, value) ? value : defaultLocale;
	const profile = portfolioContent[locale].profile;

	return {
		title: site.name,
		description: profile.summary,
		metadataBase: new URL(site.url),
		applicationName: site.name,
		authors: [
			{
				name: site.author.name,
				url: site.url,
			},
		],
		creator: site.author.name,
		publisher: site.name,
		alternates: localeAlternates(locale),
		openGraph: {
			type: "website",
			siteName: site.name,
			locale: getOpenGraphLocale(locale),
			title: profile.name,
			description: profile.summary,
			url: `/${locale}/`,
		},
		twitter: {
			card: "summary",
			title: profile.name,
			description: profile.summary,
		},
		robots: {
			index: true,
			follow: true,
		},
	};
}

export default async function LocaleLayout({ children, params }: { children: ReactNode } & LocaleProps) {
	const { locale: value } = await params;

	if (!hasLocale(locales, value)) {
		notFound();
	}

	const content = portfolioContent[value];
	const messages = await getMessages();

	return (
		<html lang={value}>
			<body>
				<Script
					data-goatcounter="https://rafasixteen.goatcounter.com/count"
					src="https://gc.zgo.at/count.js"
					strategy="afterInteractive"
				/>
				<NextIntlClientProvider locale={value} messages={messages}>
					<Navbar />
					<main>{children}</main>
					<Footer profile={content.profile} />
				</NextIntlClientProvider>
			</body>
		</html>
	);
}
