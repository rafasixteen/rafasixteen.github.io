import { getTranslations } from "next-intl/server";
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

	const projectT = await getProjectTranslation("minecraft-server");
	const content = minecraftServerTranslationSchema.parse(projectT);

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
						<ProjectSection eyebrow={t("projectDetail.overview")}>
							<p className="max-w-3xl text-lg leading-relaxed text-muted-foreground">
								{content.overview}
							</p>
						</ProjectSection>

						<ProjectSection eyebrow={t("projectDetail.architecture")}>
							<MinecraftServerArchitecture labels={content.diagram} />
							<DetailCards items={content.architecture} />
						</ProjectSection>
					</ProjectPageMain>
					<ProjectSidebar>
						<TechnologyStack project={project} />
						<ProjectLinks
							links={[
								{ label: "Crafty Controller", href: "https://craftycontrol.com/" },
								{ label: "Tailscale", href: "https://tailscale.com/" },
								{ label: "Playit.gg", href: "https://playit.gg/" },
							]}
						/>
					</ProjectSidebar>
				</ProjectPageColumns>
			</ProjectPageContent>
		</ProjectPageLayout>
	);
}
