import type { Profile } from "@/content/profile";

interface FooterProps {
	profile: Profile;
}

export function Footer({ profile }: FooterProps) {
	return (
		<footer className="site-footer">
			<div className="shell">
				<span>{profile.name}</span>
				<a href={`mailto:${profile.email}`}>{profile.email}</a>
			</div>
		</footer>
	);
}
