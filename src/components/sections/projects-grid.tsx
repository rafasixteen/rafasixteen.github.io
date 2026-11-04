import { ArrowUpRight } from "lucide-react";
import { SectionTitle } from "@/components/shared/section-title";
import { TechnologyPill } from "@/components/shared/technology-pill";
import { Button, Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui";
import { projectSlug } from "@/content/project";
import type { Project } from "@/content/project";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

interface ProjectsGridProps {
	projects: readonly Project[];
}

function ProjectCard({ project }: { project: Project }) {
	const t = useTranslations();

	const href = `/projects/${projectSlug(project)}`;

	return (
		<Card className="group h-full gap-0 overflow-hidden py-0 transition-colors hover:border-primary/60">
			<CardHeader className="gap-2 px-5 pt-5">
				<CardTitle className="text-xl leading-tight">
					<Link href={href} className="inline-flex items-center gap-2 hover:text-primary">
						{project.name}
						<ArrowUpRight
							aria-hidden="true"
							className="size-4 transition-transform motion-safe:group-hover:translate-x-0.5 motion-safe:group-hover:-translate-y-0.5"
						/>
					</Link>
				</CardTitle>
			</CardHeader>
			<CardContent className="px-5 pt-4 text-sm leading-relaxed text-muted-foreground">
				<p>{project.summary}</p>
				<ul className="mt-5 flex flex-wrap gap-2" aria-label={t("label.technologies")}>
					{project.technologies.map((technology) => (
						<li key={technology.id}>
							<TechnologyPill technology={technology} />
						</li>
					))}
				</ul>
			</CardContent>
			<CardFooter className="mt-auto px-5 pt-5 pb-5">
				<Button asChild variant="link" className="px-0">
					<Link href={href}>
						{t("action.viewDetails")}
						<span className="sr-only">: {project.name}</span> →
					</Link>
				</Button>
			</CardFooter>
		</Card>
	);
}

export function ProjectsGrid({ projects }: ProjectsGridProps) {
	const t = useTranslations();

	return (
		<section className="border-t border-border py-20" id="projects">
			<div className="mx-auto w-full max-w-6xl px-5">
				<SectionTitle>{t("section.projects")}</SectionTitle>
				<div className="grid gap-4 md:grid-cols-2">
					{projects.map((project) => (
						<ProjectCard key={project.translationKey} project={project} />
					))}
				</div>
			</div>
		</section>
	);
}
