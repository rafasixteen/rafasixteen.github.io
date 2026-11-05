import type { Profile } from "@/content/profile";
import { LinkList } from "@/components/shared/link-list";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import type { Link } from "@/content/profile";
import { site } from "@/config/site";
import { formatDateTime } from "@/lib/format";
import { useLocale, useTranslations } from "next-intl";

interface FooterProps {
	profile: Profile;
}

export function Footer({ profile }: FooterProps) {
	const locale = useLocale();
	const t = useTranslations();

	const contactLinks: Link[] = [
		{
			label: profile.email,
			url: `mailto:${profile.email}`,
			icon: faEnvelope,
		},
		...profile.links.filter((link) => link.label !== "Portfolio"),
	];

	return (
		<footer className="border-t border-border py-6 text-sm text-muted-foreground" id="contact">
			<div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-5 sm:flex-row sm:items-center sm:justify-between">
				<LinkList links={contactLinks} className="gap-x-4 [&_a:hover]:text-primary" />
				<p className="text-xs">
					{t("footer.lastUpdated", {
						date: formatDateTime(site.lastUpdatedAt, locale),
					})}
				</p>
			</div>
		</footer>
	);
}
