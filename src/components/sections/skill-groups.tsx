import { SectionTitle } from "@/components/shared/section-title";
import type { SkillGroup } from "@/content/skill-group";
import { useTranslations } from "next-intl";

interface SkillGroupsProps {
	skills: readonly SkillGroup[];
}

export function SkillGroups({ skills }: SkillGroupsProps) {
	const t = useTranslations();

	return (
		<section className="section shell" id="skills">
			<SectionTitle>{t("section.skills")}</SectionTitle>
			<div className="skill-groups">
				{skills.map((group) => (
					<article key={group.translationKey}>
						<h2>{group.name}</h2>
						<ul>
							{group.skills.map((skill) => (
								<li key={skill.name}>
									{skill.icon}
									{skill.name}
								</li>
							))}
						</ul>
					</article>
				))}
			</div>
		</section>
	);
}
