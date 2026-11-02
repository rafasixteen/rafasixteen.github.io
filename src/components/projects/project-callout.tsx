import type { ReactNode } from "react";

export function ProjectCallout({ children }: { children: ReactNode }) {
	return <aside className="border-l-2 border-primary/80 bg-primary/5 px-5 py-4 text-sm leading-relaxed text-foreground">{children}</aside>;
}
