import { getTranslations } from "next-intl/server";
import { ProjectCallout } from "../project-callout";
import { ProjectHighlights } from "../project-highlights";
import { ProjectPageLayout } from "../project-page-layout";
import { ProjectSection } from "../project-section";
import type { Project } from "@/content/project";
import { commonProjectTranslationSchema } from "@/content/translations";
import { z } from "zod";

const text = z.string().trim().min(1);

export const calJudgeTranslationSchema = commonProjectTranslationSchema.extend({
	impact: text,
	organization: text.optional(),
	overview: text.optional(),
	contributions: z.array(text).default([]),
	architecture: z.array(z.strictObject({ title: text, description: text })).default([]),
});

interface Props {
	project: Project;
	content: z.infer<typeof calJudgeTranslationSchema>;
}

export async function CalJudgeDetail({ project, content }: Props) {
	const t = await getTranslations();
	const { organization, overview, contributions, architecture } = content;

	return (
		<ProjectPageLayout project={project} summary={project.summary} impact={content.impact}>
			{organization ? (
				<ProjectSection eyebrow={t("projectDetail.organization")}>
					<ProjectCallout>
						<p>{organization}</p>
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
