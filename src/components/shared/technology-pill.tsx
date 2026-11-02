import { Badge } from "@/components/ui";
import type { Project } from "@/content/project";

export function TechnologyPill({ technology }: { technology: Project["technologies"][number] }) {
	return (
		<Badge variant="secondary">
			{technology.icon}
			{technology.name}
		</Badge>
	);
}
