"use client";

import { Link, usePathname } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { useLocale, useTranslations } from "next-intl";

export function LocaleSwitcher() {
	const active = useLocale();
	const pathname = usePathname();

	const t = useTranslations();

	return (
		<nav aria-label={t("label.language")} className="language-switcher">
			{routing.locales.map((nextLocale) => (
				<Link
					key={nextLocale}
					href={pathname}
					locale={nextLocale}
					hrefLang={nextLocale}
					scroll={false}
					onClick={() => localStorage.setItem("portfolio-locale", nextLocale)}
					aria-current={nextLocale === active ? "page" : undefined}>
					{nextLocale.toUpperCase()}
				</Link>
			))}
		</nav>
	);
}
