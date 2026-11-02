import { Badge } from "@/components/ui";
import type { SkillGroup } from "@/content/skill-group";

export function SkillPill({ skill }: { skill: SkillGroup["skills"][number] }) {
	return (
		<Badge variant="outline">
			{skill.icon}
			{skill.name}
		</Badge>
	);
}
