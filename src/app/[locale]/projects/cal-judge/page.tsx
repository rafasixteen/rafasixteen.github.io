import { getTranslations } from "next-intl/server";
import { ProjectCallout } from "@/components/projects/project-callout";
import { ProjectHighlights } from "@/components/projects/project-highlights";
import { ProjectPageLayout } from "@/components/projects/project-page-layout";
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

	const content = calJudgeTranslationSchema.parse(await getProjectTranslation("cal-judge"));

	const t = await getTranslations();

	return (
		<ProjectPageLayout project={project} summary={project.summary} impact={content.impact}>
			{content.organization ? (
				<ProjectSection eyebrow={t("projectDetail.organization")}>
					<ProjectCallout>
						<p>{content.organization}</p>
						<a
							className="mt-3 inline-flex text-sm font-medium text-primary hover:underline"
							href="https://calisthenicsalliance.com/"
							target="_blank"
							rel="noreferrer">
							calisthenicsalliance.com
						</a>
					</ProjectCallout>
				</ProjectSection>
			) : null}
			{content.overview ? (
				<ProjectSection eyebrow={t("projectDetail.overview")}>
					<p className="max-w-3xl text-lg leading-relaxed text-muted-foreground">{content.overview}</p>
				</ProjectSection>
			) : null}
			{content.architecture.length > 0 ? (
				<ProjectSection eyebrow={t("projectDetail.architecture")}>
					<div className="grid gap-5 sm:grid-cols-2">
						{content.architecture.map((item) => (
							<article key={item.title} className="border-t border-border pt-4">
								<h2 className="font-medium text-foreground">{item.title}</h2>
								<p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.description}</p>
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
		</ProjectPageLayout>
	);
}
