import "@/app/globals.css";

import Script from "next/script";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { Footer, Navbar } from "@/components/layout";
import { EngagementTracker } from "@/components/analytics/engagement-tracker";
import { site } from "@/config/site";
import { portfolioContent } from "@/content/portfolio";
import { goatCounter } from "@/lib/goatcounter";
import { url } from "@/lib/url";
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

	const socialImage = {
		url: url(site.socialImage),
		width: 1200,
		height: 630,
		alt: site.name,
	};

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
			title: site.name,
			description: profile.summary,
			url: `/${locale}/`,
			images: [socialImage],
		},
		twitter: {
			card: "summary_large_image",
			title: site.name,
			description: profile.summary,
			images: [socialImage.url],
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
					data-goatcounter={goatCounter.endpoint}
					data-goatcounter-settings={goatCounter.settings}
					src={goatCounter.scriptUrl}
					strategy="afterInteractive"
				/>
				<NextIntlClientProvider locale={value} messages={messages}>
					<EngagementTracker />
					<Navbar />
					<main>{children}</main>
					<Footer profile={content.profile} />
				</NextIntlClientProvider>
			</body>
		</html>
	);
}
