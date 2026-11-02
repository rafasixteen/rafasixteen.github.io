import { CardGrid } from "@/components/sections/card-grid";
import { EducationTimeline } from "@/components/sections/education-timeline";
import { ExperienceTimeline } from "@/components/sections/experience-timeline";
import { Hero } from "@/components/sections/hero";
import { SkillGroups } from "@/components/sections/skill-groups";
import { portfolioContent } from "@/content/validation";
import { routing } from "@/i18n/routing";
import { hasLocale } from "next-intl";

export default async function PortfolioPage({ params }: { params: Promise<{ locale: string }> }) {
	const { locale: value } = await params;
	const locale = hasLocale(routing.locales, value) ? value : routing.defaultLocale;
	const content = portfolioContent[locale];

	return (
		<>
			<Hero locale={content.locale} profile={content.profile} />
			<ExperienceTimeline locale={content.locale} experience={content.experience} />
			<CardGrid projects={content.projects} />
			<SkillGroups skills={content.skills} />
			<EducationTimeline locale={content.locale} education={content.education} />
		</>
	);
}
