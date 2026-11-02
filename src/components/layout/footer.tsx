import type { Profile } from "@/content/profile";

interface FooterProps {
	profile: Profile;
}

export function Footer({ profile }: FooterProps) {
	return (
		<footer className="border-t border-border py-6 text-sm text-muted-foreground">
			<div className="mx-auto flex w-full max-w-6xl flex-col justify-between gap-2 px-5 sm:flex-row">
				<span>{profile.name}</span>
				<a href={`mailto:${profile.email}`}>{profile.email}</a>
			</div>
		</footer>
	);
}
