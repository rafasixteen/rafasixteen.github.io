import { ArrowUpRight } from "lucide-react";
import { ProjectPoster } from "@/components/projects/project-poster";
import { SectionTitle } from "@/components/shared/section-title";
import { TechnologyPill } from "@/components/shared/technology-pill";
import { AspectRatio, Button, Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui";
import { projectSlug } from "@/content/project";
import type { LocalizedProject } from "@/content/portfolio-content";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

interface ProjectsGridProps {
	projects: readonly LocalizedProject[];
}

function ProjectCard({ project }: { project: LocalizedProject }) {
	const t = useTranslations();
	const projectT = useTranslations(`portfolio.projects.${project.translationKey}`);

	const href = `/projects/${projectSlug(project)}`;
	const poster = project.media[0];

	return (
		<Card className="group h-full gap-0 overflow-hidden py-0 transition-colors hover:border-primary/60">
			{poster ? (
				<Link
					href={href}
					className="block overflow-hidden border-b border-border focus-visible:ring-inset"
					aria-label={`${t("action.viewDetails")}: ${project.name}`}>
					<AspectRatio ratio={16 / 10} className="bg-muted">
						<ProjectPoster media={poster} />
						<div className="pointer-events-none absolute inset-0 bg-linear-to-t from-background/70 via-transparent to-transparent" />
					</AspectRatio>
				</Link>
			) : null}
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
				<p>{projectT("summary")}</p>
				<ul className="mt-5 flex flex-wrap gap-2" aria-label={t("label.technologies")}>
					{project.technologies.map((technology) => (
						<li key={technology.name}>
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
