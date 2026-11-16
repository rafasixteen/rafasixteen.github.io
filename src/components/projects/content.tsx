import type { ReactNode } from "react";

export function ProjectPageContent({ children }: { children: ReactNode }) {
	return (
		<section className="border-y border-border bg-card/35">
			<div className="mx-auto w-full max-w-6xl px-5 py-14">{children}</div>
		</section>
	);
}
