import { Link } from "@/i18n/navigation";
import type { Profile } from "@/content/profile";
import { navigation } from "@/config/navigation";
import { useTranslations } from "next-intl";
import { LocaleSwitcher } from "./locale-switcher";

export function Navbar({ profile }: { profile: Profile }) {
	const t = useTranslations();

	return (
		<header className="site-header">
			<div className="shell header-inner">
				<Link className="wordmark" href="/" aria-label={profile.name}>
					{profile.name}
				</Link>
				<nav aria-label="Primary">
					{navigation.map((link) => (
						<a href={link.href} key={link.href}>
							{t(`nav.${link.key}`)}
						</a>
					))}
				</nav>
				<LocaleSwitcher />
			</div>
		</header>
	);
}
