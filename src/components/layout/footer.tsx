import type { Profile } from "@/content/profile";
import { SocialLinks } from "@/components/shared/social-links";

interface FooterProps {
	profile: Profile;
}

export function Footer({ profile }: FooterProps) {
	return (
		<footer className="border-t border-border py-6 text-sm text-muted-foreground">
			<div className="mx-auto flex w-full max-w-6xl flex-col justify-between gap-4 px-5 sm:flex-row sm:items-center">
				<span>{profile.name}</span>
				<div className="flex flex-wrap items-center gap-5">
					<a className="transition-colors underline-offset-4 hover:text-primary hover:underline" href={`mailto:${profile.email}`}>
						{profile.email}
					</a>
					<SocialLinks links={profile.links} className="gap-x-4 [&_a:hover]:text-primary" />
				</div>
			</div>
		</footer>
	);
}
