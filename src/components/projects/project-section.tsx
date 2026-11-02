import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ProjectSectionProps {
	eyebrow: string;
	children: ReactNode;
	className?: string;
}

export function ProjectSection({ eyebrow, children, className }: ProjectSectionProps) {
	return (
		<section className={cn("space-y-5", className)}>
			<h2 className="text-sm font-semibold tracking-[0.18em] text-primary uppercase">{eyebrow}</h2>
			{children}
		</section>
	);
}
