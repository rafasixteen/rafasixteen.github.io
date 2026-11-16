import { TechnologyPill } from "@/components/shared/technology-pill";
import type { Project } from "@/content/project";
import { getTranslations } from "next-intl/server";

export async function TechnologyStack({ project }: { project: Project }) {
	const t = await getTranslations();
	const technologies = t("projectDetail.technologies");

	return (
		<section>
			<h2 className="text-sm font-semibold tracking-[0.18em] text-primary uppercase">{technologies}</h2>
			<ul className="mt-5 flex flex-wrap gap-2" aria-label={technologies}>
				{project.technologies.map((technology) => (
					<li key={technology.id}>
						<TechnologyPill technology={technology} />
					</li>
				))}
			</ul>
		</section>
	);
}
