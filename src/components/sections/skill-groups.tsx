import { SectionTitle } from "@/components/shared/section-title";
import { SkillPill } from "@/components/shared/skill-pill";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui";
import type { SkillGroup } from "@/content/skill-group";
import { useTranslations } from "next-intl";

interface SkillGroupsProps {
	skills: readonly SkillGroup[];
}

export function SkillGroups({ skills }: SkillGroupsProps) {
	const t = useTranslations();

	return (
		<section className="border-t border-border py-20" id="skills">
			<div className="mx-auto w-full max-w-6xl px-5">
				<SectionTitle>{t("section.skills")}</SectionTitle>
				<div className="grid gap-6 md:grid-cols-2">
					{skills.map((group) => (
						<Card key={group.translationKey} className="gap-4 p-6">
							<CardHeader className="px-0">
								<CardTitle className="text-2xl">{group.name}</CardTitle>
							</CardHeader>
							<CardContent className="px-0">
								<ul className="flex flex-wrap gap-2">
									{group.skills.map((skill) => (
										<li key={skill.id}>
											<SkillPill skill={skill} />
										</li>
									))}
								</ul>
							</CardContent>
						</Card>
					))}
				</div>
			</div>
		</section>
	);
}
