import type { ReactNode } from "react";

export function ProjectPageColumns({ children }: { children: ReactNode }) {
	return <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_20rem]">{children}</div>;
}
