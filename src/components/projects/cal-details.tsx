import { getTranslations } from "next-intl/server";
import { ProjectCallout } from "./project-callout";
import { ProjectHighlights } from "./project-highlights";
import { ProjectPageLayout } from "./project-page-layout";
import { ProjectSection } from "./project-section";
import { getProjectContent } from "./project-content";

const organizationUrl = "https://calisthenicsalliance.com/";

interface ArchitectureItem {
	title: string;
	description: string;
}

async function CalDetail({ projectKey }: { projectKey: string }) {
	const [project, t, projectT] = await Promise.all([
		getProjectContent(projectKey),
		getTranslations(),
		getTranslations(`portfolio.projects.${projectKey}`),
	]);

	const organization = projectT("organization");
	const overview = projectT("overview");
	const contributions = projectT.raw("contributions") as string[];
	const architecture = (projectT.has("architecture") ? projectT.raw("architecture") : []) as ArchitectureItem[];

	return (
		<ProjectPageLayout project={project} summary={projectT("summary")} impact={projectT("impact")}>
			{organization ? (
				<ProjectSection eyebrow={t("projectDetail.organization")}>
					<ProjectCallout>
						<p>{organization}</p>
						<a
							className="mt-3 inline-flex text-sm font-medium text-primary hover:underline"
							href={organizationUrl}
							target="_blank"
							rel="noreferrer">
							calisthenicsalliance.com
						</a>
					</ProjectCallout>
				</ProjectSection>
			) : null}
			{overview ? (
				<ProjectSection eyebrow={t("projectDetail.overview")}>
					<p className="max-w-3xl text-lg leading-relaxed text-muted-foreground">{overview}</p>
				</ProjectSection>
			) : null}
			{architecture.length > 0 ? (
				<ProjectSection eyebrow={t("projectDetail.architecture")}>
					<div className="grid gap-5 sm:grid-cols-2">
						{architecture.map((item) => (
							<article key={item.title} className="border-t border-border pt-4">
								<h3 className="font-medium text-foreground">{item.title}</h3>
								<p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.description}</p>
							</article>
						))}
					</div>
				</ProjectSection>
			) : null}
			{contributions.length > 0 ? (
				<ProjectSection eyebrow={t("projectDetail.contributions")}>
					<ProjectHighlights items={contributions} />
				</ProjectSection>
			) : null}
		</ProjectPageLayout>
	);
}

export async function CalPlatformDetail() {
	return <CalDetail projectKey="cal-platform" />;
}

export async function CalJudgeDetail() {
	return <CalDetail projectKey="cal-judge" />;
}
