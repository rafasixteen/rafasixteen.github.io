import { Link } from "@/i18n/navigation";
import type { Profile } from "@/content/profile";
import { navigation } from "@/config/navigation";
import { useTranslations } from "next-intl";
import { LocaleSwitcher } from "./locale-switcher";

export function Navbar({ profile }: { profile: Profile }) {
	const t = useTranslations();

	return (
		<header className="sticky top-0 z-10 border-b border-border bg-background/92 backdrop-blur">
			<div className="mx-auto flex min-h-18 w-full max-w-6xl items-center justify-between gap-4 px-5">
				<Link className="font-bold tracking-tight no-underline" href="/" aria-label={profile.name}>
					{profile.name}
				</Link>
				<nav aria-label="Primary" className="hidden items-center gap-4 sm:flex">
					{navigation.map((link) => (
						<a
							className="text-sm text-muted-foreground no-underline transition-colors hover:text-primary"
							href={link.href}
							key={link.href}>
							{t(`nav.${link.key}`)}
						</a>
					))}
				</nav>
				<LocaleSwitcher />
			</div>
		</header>
	);
}
