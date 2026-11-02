import { ProjectGallery } from "./project-gallery";
import { getProjectContent } from "./project-content";
import { ProjectHighlights } from "./project-highlights";
import { ProjectPageLayout } from "./project-page-layout";
import { ProjectSection } from "./project-section";
import { getTranslations } from "next-intl/server";

const projectKey = "personal-portfolio";

export async function PersonalPortfolioDetail() {
	const [project, t] = await Promise.all([getProjectContent(projectKey), getTranslations()]);

	return (
		<ProjectPageLayout project={project}>
			<ProjectSection eyebrow={t("projectDetail.overview")}>
				<p className="max-w-3xl text-lg leading-relaxed text-muted-foreground">{project.overview}</p>
			</ProjectSection>
			<ProjectSection eyebrow={t("projectDetail.contributions")}>
				<ProjectHighlights items={project.contributions} />
			</ProjectSection>
			<ProjectSection eyebrow={t("projectDetail.media")}>
				<ProjectGallery items={project.media} />
			</ProjectSection>
		</ProjectPageLayout>
	);
}
