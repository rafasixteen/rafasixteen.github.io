import type { ReactNode } from "react";

export function ProjectPageLayout({ children }: { children: ReactNode }) {
	return <main className="border-t border-border">{children}</main>;
}
