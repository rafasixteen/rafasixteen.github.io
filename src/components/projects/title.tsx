import type { ReactNode } from "react";
import type { Project } from "@/content/project";

export function ProjectPageTitle({ project, children }: { project: Project; children: ReactNode }) {
	return (
		<div>
			<h1 className="max-w-4xl text-4xl leading-[0.98] font-semibold tracking-[-0.04em] sm:text-6xl">
				{project.name}
			</h1>
			{children}
		</div>
	);
}
