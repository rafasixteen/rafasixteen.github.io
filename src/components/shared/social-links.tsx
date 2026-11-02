import { Link2 } from "lucide-react";
import type { ComponentProps, ComponentType } from "react";
import type { Profile } from "@/content/profile";
import { cn } from "@/lib/utils";

type SocialIcon = ComponentType<ComponentProps<"svg">>;

function GithubIcon(props: ComponentProps<"svg">) {
	return (
		<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
			<path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.73.083-.73 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.108-.775.418-1.304.762-1.604-2.665-.303-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.292-1.552 3.297-1.23 3.297-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.624-5.475 5.92.43.372.81 1.102.81 2.222 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.572C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
		</svg>
	);
}

function LinkedinIcon(props: ComponentProps<"svg">) {
	return (
		<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
			<path d="M4.98 3.5A2.5 2.5 0 1 1 0 3.5a2.5 2.5 0 0 1 4.98 0ZM.5 8h4V21h-4V8Zm6.5 0h3.83v1.78h.05c.53-1 1.84-2.06 3.79-2.06 4.05 0 4.8 2.66 4.8 6.12V21h-4v-6.36c0-1.52-.03-3.47-2.12-3.47-2.12 0-2.45 1.66-2.45 3.36V21H7V8Z" />
		</svg>
	);
}

function InstagramIcon(props: ComponentProps<"svg">) {
	return (
		<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
			<rect width="18" height="18" x="3" y="3" rx="5" />
			<circle cx="12" cy="12" r="4" />
			<circle cx="17.5" cy="6.5" r="0.75" fill="currentColor" stroke="none" />
		</svg>
	);
}

const socialIcons: Record<string, SocialIcon> = {
	GitHub: GithubIcon,
	LinkedIn: LinkedinIcon,
	Instagram: InstagramIcon,
};

interface SocialLinksProps {
	links: Profile["links"];
	className?: string;
}

export function SocialLinks({ links, className }: SocialLinksProps) {
	return (
		<ul className={cn("flex flex-wrap items-center gap-x-5 gap-y-2", className)}>
			{links.map((link) => {
				const Icon = socialIcons[link.label] ?? Link2;

				return (
					<li key={link.url}>
						<a className="inline-flex items-center gap-2 transition-colors" href={link.url} target="_blank" rel="noreferrer" aria-label={link.label}>
							<Icon className="size-4" />
							<span>{link.label}</span>
						</a>
					</li>
				);
			})}
		</ul>
	);
}
