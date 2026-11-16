import type { ReactNode } from "react";

export function ProjectPageImpact({ children }: { children: ReactNode }) {
	return (
		<div className="border-l-2 border-primary/80 pl-5 text-sm leading-relaxed text-muted-foreground lg:mb-2">
			<p className="font-medium text-foreground">{children}</p>
		</div>
	);
}
