import { ProjectCallout } from "./project-callout";
import { ProjectCarousel } from "./project-carousel";
import { getProjectContent } from "./project-content";
import { ProjectHighlights } from "./project-highlights";
import { ProjectPageLayout } from "./project-page-layout";
import { ProjectSection } from "./project-section";
import { getTranslations } from "next-intl/server";

const projectKey = "real-estate-platform";

export async function RealEstateDetail() {
	const [project, t] = await Promise.all([getProjectContent(projectKey), getTranslations()]);

	return (
		<ProjectPageLayout project={project}>
			<ProjectSection eyebrow={t("projectDetail.overview")}>
				<p className="max-w-3xl text-lg leading-relaxed text-muted-foreground">{project.overview}</p>
				<ProjectCallout>{project.impact}</ProjectCallout>
			</ProjectSection>
			<ProjectSection eyebrow={t("projectDetail.media")}>
				<ProjectCarousel items={project.media} label={t("projectDetail.media")} />
			</ProjectSection>
			<ProjectSection eyebrow={t("projectDetail.contributions")}>
				<ProjectHighlights items={project.contributions} />
			</ProjectSection>
		</ProjectPageLayout>
	);
}
