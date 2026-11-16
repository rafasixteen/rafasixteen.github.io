import { getTranslations } from "next-intl/server";
import { ProjectCallout } from "@/components/projects/project-callout";
import { ProjectHighlights } from "@/components/projects/project-highlights";
import {
	ProjectLinks,
	ProjectPageColumns,
	ProjectPageContent,
	ProjectPageHero,
	ProjectPageImpact,
	ProjectPageLayout,
	ProjectPageMain,
	ProjectPageSummary,
	ProjectPageTitle,
	ProjectSidebar,
	TechnologyStack,
} from "@/components/projects";
import { ProjectSection } from "@/components/projects/project-section";
import {
	getProjectMetadata,
	getProjectPage,
	getProjectTranslation,
	type ProjectPageProps,
} from "@/app/[locale]/projects/_lib/project-route";
import { calJudgeTranslationSchema } from "@/app/[locale]/projects/cal-judge/_lib/translation-schema";

export const generateMetadata = getProjectMetadata("cal-judge");

export default async function CalJudgePage({ params }: ProjectPageProps) {
	const { project } = await getProjectPage("cal-judge", params);

	const projectT = await getProjectTranslation("cal-judge");
	const content = calJudgeTranslationSchema.parse(projectT);

	const t = await getTranslations();

	return (
		<ProjectPageLayout>
			<ProjectPageHero>
				<ProjectPageTitle project={project}>
					<ProjectPageSummary>{project.summary}</ProjectPageSummary>
				</ProjectPageTitle>
				<ProjectPageImpact>{content.impact}</ProjectPageImpact>
			</ProjectPageHero>

			<ProjectPageContent>
				<ProjectPageColumns>
					<ProjectPageMain>
						{content.organization ? (
							<ProjectSection eyebrow={t("projectDetail.organization")}>
								<ProjectCallout>
									<p>{content.organization}</p>
								</ProjectCallout>
							</ProjectSection>
						) : null}
						{content.overview ? (
							<ProjectSection eyebrow={t("projectDetail.overview")}>
								<p className="max-w-3xl text-lg leading-relaxed text-muted-foreground">
									{content.overview}
								</p>
							</ProjectSection>
						) : null}
						{content.architecture.length > 0 ? (
							<ProjectSection eyebrow={t("projectDetail.architecture")}>
								<div className="grid gap-5 sm:grid-cols-2">
									{content.architecture.map((item) => (
										<article key={item.title} className="border-t border-border pt-4">
											<h2 className="font-medium text-foreground">{item.title}</h2>
											<p className="mt-2 text-sm leading-relaxed text-muted-foreground">
												{item.description}
											</p>
										</article>
									))}
								</div>
							</ProjectSection>
						) : null}
						{content.contributions.length > 0 ? (
							<ProjectSection eyebrow={t("projectDetail.contributions")}>
								<ProjectHighlights items={content.contributions} />
							</ProjectSection>
						) : null}
					</ProjectPageMain>
					<ProjectSidebar>
						<TechnologyStack project={project} />
						<ProjectLinks
							links={[{ label: "calisthenicsalliance.com", href: "https://calisthenicsalliance.com/" }]}
						/>
					</ProjectSidebar>
				</ProjectPageColumns>
			</ProjectPageContent>
		</ProjectPageLayout>
	);
}
