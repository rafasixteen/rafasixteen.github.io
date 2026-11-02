import { ProjectCallout } from "./project-callout";
import { getProjectContent } from "./project-content";
import { ProjectGallery } from "./project-gallery";
import { ProjectHighlights } from "./project-highlights";
import { ProjectMediaItem } from "./project-media";
import { ProjectPageLayout } from "./project-page-layout";
import { ProjectSection } from "./project-section";
import { getTranslations } from "next-intl/server";

const projectKey = "traffic-light-system";

export async function TrafficLightDetail() {
	const [project, t] = await Promise.all([getProjectContent(projectKey), getTranslations()]);

	return (
		<ProjectPageLayout project={project}>
			<ProjectSection eyebrow={t("projectDetail.media")}>
				<ProjectMediaItem media={project.media[0]} />
				<ProjectGallery items={project.media.slice(1)} />
			</ProjectSection>
			<ProjectSection eyebrow={t("projectDetail.overview")}>
				<p className="max-w-3xl text-lg leading-relaxed text-muted-foreground">{project.overview}</p>
				<ProjectCallout>{project.impact}</ProjectCallout>
			</ProjectSection>
			<ProjectSection eyebrow={t("projectDetail.contributions")}>
				<ProjectHighlights items={project.contributions} />
			</ProjectSection>
		</ProjectPageLayout>
	);
}
