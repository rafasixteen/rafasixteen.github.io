import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { Link } from "@/content/link";
import { cn } from "@/lib/utils";

interface LinkListProps {
	links: readonly Link[];
	className?: string;
}

export function LinkList({ links, className }: LinkListProps) {
	return (
		<ul className={cn("flex flex-wrap items-center gap-x-5 gap-y-2", className)}>
			{links.map((link) => (
				<li key={link.url}>
					<a
						className="inline-flex items-center gap-2 transition-colors"
						href={link.url}
						target="_blank"
						rel="noreferrer"
						aria-label={link.label}>
						<FontAwesomeIcon className="size-4" icon={link.icon} />
						<span>{link.label}</span>
					</a>
				</li>
			))}
		</ul>
	);
}
