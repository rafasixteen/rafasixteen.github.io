"use client";

import { Link, usePathname } from "@/i18n/navigation";
import { buttonVariants } from "@/components/ui";
import { locales } from "@/lib/locales";
import { cn } from "@/lib/utils";
import { useLocale, useTranslations } from "next-intl";

export function LocaleSwitcher() {
	const active = useLocale();
	const pathname = usePathname();

	const t = useTranslations();

	return (
		<nav aria-label={t("label.language")} className="flex items-center gap-1">
			{locales.map((nextLocale) => (
				<Link
					key={nextLocale}
					href={pathname}
					locale={nextLocale}
					hrefLang={nextLocale}
					scroll={false}
					onClick={() => localStorage.setItem("portfolio-locale", nextLocale)}
					aria-current={nextLocale === active ? "page" : undefined}
					className={cn(
						buttonVariants({ variant: nextLocale === active ? "secondary" : "ghost", size: "sm" }),
						"h-8 px-2 text-xs no-underline",
					)}>
					{nextLocale.toUpperCase()}
				</Link>
			))}
		</nav>
	);
}
