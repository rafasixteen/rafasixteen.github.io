import type { ReactNode } from "react";

export function ProjectSidebar({ children }: { children: ReactNode }) {
	return (
		<aside className="h-fit border border-border bg-background/50 p-6 lg:sticky lg:top-24">
			<div className="space-y-8">{children}</div>
		</aside>
	);
}
