import type { ReactNode } from "react";

export function ProjectPageSummary({ children }: { children: ReactNode }) {
	return <p className="mt-7 max-w-3xl text-lg leading-relaxed text-muted-foreground sm:text-xl">{children}</p>;
}
