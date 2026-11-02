import { navigation } from "@/config/navigation";
import type { Locale } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { LocaleSwitcher } from "./locale-switcher";

export function Navbar({ locale }: { locale: Locale }) {
	const t = useTranslations();

	return (
		<header className="sticky top-0 z-10 border-b border-border bg-background/92 backdrop-blur">
			<div className="mx-auto grid min-h-18 w-full max-w-6xl grid-cols-[1fr_auto_1fr] items-center gap-4 px-5">
				<nav aria-label="Primary" className="col-start-2 hidden items-center gap-4 sm:flex">
					{navigation.map((link) => (
						<a
							className="text-sm text-muted-foreground no-underline transition-colors hover:text-primary"
							href={`/${locale}/${link.href}`}
							key={link.href}>
							{t(`nav.${link.key}`)}
						</a>
					))}
				</nav>
				<div className="col-start-3 justify-self-end">
					<LocaleSwitcher />
				</div>
			</div>
		</header>
	);
}
