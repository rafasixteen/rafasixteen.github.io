import { SectionTitle } from "@/components/shared/section-title";
import { Card } from "@/components/ui";
import type { Project } from "@/content/project";
import { useTranslations } from "next-intl";

interface CardGridProps {
	projects: readonly Project[];
}

export function CardGrid({ projects }: CardGridProps) {
	const t = useTranslations();

	return (
		<section className="section shell" id="projects">
			<SectionTitle>{t("section.projects")}</SectionTitle>
			<div className="card-grid">
				{projects.map((project) => (
					<Card key={project.translationKey}>
						<ul className="content-tags" aria-label={t("label.technologies")}>
							{project.technologies.map((technology) => (
								<li key={technology.name}>
									{technology.icon}
									{technology.name}
								</li>
							))}
						</ul>
						<h2>{project.name}</h2>
						<p>{project.summary}</p>
						<p className="impact">{project.impact}</p>
						<a href={project.url}>
							{t("action.visit")}
							<span className="sr-only">: {project.name}</span> →
						</a>
					</Card>
				))}
			</div>
		</section>
	);
}
