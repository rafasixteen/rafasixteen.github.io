import type { Profile } from "@/content/profile";
import { LinkList, type LinkListItem } from "@/components/shared/link-list";
import { Mail } from "lucide-react";

interface FooterProps {
	profile: Profile;
}

export function Footer({ profile }: FooterProps) {
	const contactLinks: LinkListItem[] = [
		{
			label: profile.email,
			url: `mailto:${profile.email}`,
			icon: Mail,
		},
		...profile.links.filter((link) => link.label !== "Portfolio"),
	];

	return (
		<footer className="border-t border-border py-6 text-sm text-muted-foreground">
			<div className="mx-auto flex w-full max-w-6xl flex-col justify-end gap-4 px-5 sm:flex-row sm:items-center">
				<LinkList links={contactLinks} className="gap-x-4 [&_a:hover]:text-primary" />
			</div>
		</footer>
	);
}
