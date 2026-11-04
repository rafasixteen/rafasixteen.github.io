import { ProjectsGrid } from "@/components/sections/projects-grid";
import { EducationTimeline } from "@/components/sections/education-timeline";
import { ExperienceTimeline } from "@/components/sections/experience-timeline";
import { Hero } from "@/components/sections/hero";
import { SkillGroups } from "@/components/sections/skill-groups";
import { portfolioContent } from "@/content/portfolio";
import { defaultLocale, locales } from "@/lib/locales";
import { hasLocale } from "next-intl";

export default async function PortfolioPage({ params }: { params: Promise<{ locale: string }> }) {
	const { locale: value } = await params;

	const locale = hasLocale(locales, value) ? value : defaultLocale;
	const content = portfolioContent[locale];

	return (
		<>
			<Hero locale={content.locale} profile={content.profile} />
			<EducationTimeline locale={content.locale} education={content.education} />
			<ExperienceTimeline locale={content.locale} experience={content.experience} />
			<ProjectsGrid projects={content.projects} />
			<SkillGroups skills={content.skills} />
		</>
	);
}
