import { getTranslations } from "next-intl/server";
import { ProjectCallout } from "./project-callout";
import { ProjectHighlights } from "./project-highlights";
import { ProjectPageLayout } from "./project-page-layout";
import { ProjectSection } from "./project-section";
import { getProjectContent } from "./project-content";

async function CalDetail({ projectKey }: { projectKey: string }) {
	const [project, t] = await Promise.all([getProjectContent(projectKey), getTranslations()]);

	return (
		<ProjectPageLayout project={project}>
			<ProjectSection eyebrow={t("projectDetail.organization")}>
				<ProjectCallout>
					<p>{project.organization}</p>
					{project.organizationUrl ? (
						<a className="mt-3 inline-flex text-sm font-medium text-primary hover:underline" href={project.organizationUrl} target="_blank" rel="noreferrer">
							calisthenicsalliance.com
						</a>
					) : null}
				</ProjectCallout>
			</ProjectSection>
			<ProjectSection eyebrow={t("projectDetail.overview")}>
				<p className="max-w-3xl text-lg leading-relaxed text-muted-foreground">{project.overview}</p>
			</ProjectSection>
			{project.architecture ? (
				<ProjectSection eyebrow={t("projectDetail.architecture")}>
					<div className="grid gap-5 sm:grid-cols-2">
						{project.architecture.map((item) => (
							<article key={item.title} className="border-t border-border pt-4">
								<h3 className="font-medium text-foreground">{item.title}</h3>
								<p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.description}</p>
							</article>
						))}
					</div>
				</ProjectSection>
			) : null}
			<ProjectSection eyebrow={t("projectDetail.contributions")}>
				<ProjectHighlights items={project.contributions} />
			</ProjectSection>
		</ProjectPageLayout>
	);
}

export async function CalPlatformDetail() {
	return <CalDetail projectKey="cal-platform" />;
}

export async function CalJudgeDetail() {
	return <CalDetail projectKey="cal-judge" />;
}
