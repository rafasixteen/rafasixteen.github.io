import { getTranslations } from "next-intl/server";
import { ProjectPageLayout } from "@/components/projects/project-page-layout";
import { ProjectSection } from "@/components/projects/project-section";
import {
	getProjectMetadata,
	getProjectPage,
	getProjectTranslation,
	type ProjectPageProps,
} from "@/app/[locale]/projects/_lib/project-route";
import { MinecraftServerArchitecture } from "@/app/[locale]/projects/minecraft-server/_components/architecture";
import { minecraftServerTranslationSchema } from "@/app/[locale]/projects/minecraft-server/_lib/translation-schema";

export const generateMetadata = getProjectMetadata("minecraft-server");

function DetailCards({ items }: { items: readonly { title: string; description: string }[] }) {
	return (
		<div className="grid gap-5 sm:grid-cols-2">
			{items.map((item) => (
				<article key={item.title} className="border-t border-border pt-4">
					<h2 className="font-medium text-foreground">{item.title}</h2>
					<p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.description}</p>
				</article>
			))}
		</div>
	);
}

export default async function MinecraftServerPage({ params }: ProjectPageProps) {
	const { project } = await getProjectPage("minecraft-server", params);

	const content = minecraftServerTranslationSchema.parse(await getProjectTranslation("minecraft-server"));
	const t = await getTranslations();

	return (
		<ProjectPageLayout project={project} summary={project.summary} impact={content.impact}>
			<ProjectSection eyebrow={t("projectDetail.overview")}>
				<p className="max-w-3xl text-lg leading-relaxed text-muted-foreground">{content.overview}</p>
			</ProjectSection>

			<ProjectSection eyebrow={t("projectDetail.architecture")}>
				<MinecraftServerArchitecture labels={content.diagram} />
				<DetailCards items={content.architecture} />
			</ProjectSection>
		</ProjectPageLayout>
	);
}
