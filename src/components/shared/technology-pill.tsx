import type { ReactElement } from "react";
import { Badge } from "@/components/ui";

interface TechnologyPillProps {
	technology: {
		name: string;
		icon: ReactElement;
	};
}

export function TechnologyPill({ technology }: TechnologyPillProps) {
	return (
		<Badge variant="secondary">
			{technology.icon}
			{technology.name}
		</Badge>
	);
}
