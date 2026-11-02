import type { ReactNode } from "react";
import { ArrowUpRight, GitBranch } from "lucide-react";
import { TechnologyPill } from "@/components/shared/technology-pill";
import { Button, Separator } from "@/components/ui";
import type { Project } from "@/content/project";
import { url } from "@/lib/url";
import { getLocale, getTranslations } from "next-intl/server";

interface ProjectPageLayoutProps {
	project: Project;
	children: ReactNode;
	sidebar?: ReactNode;
	summary?: string;
	impact?: string;
}

function ProjectSidebar({
	project,
	technologies,
	links,
	visit,
	viewRepository,
}: {
	project: Project;
	technologies: string;
	links: string;
	visit: string;
	viewRepository: string;
}) {
	return (
		<aside className="h-fit border border-border bg-background/50 p-6 lg:sticky lg:top-24">
			<h2 className="text-sm font-semibold tracking-[0.18em] text-primary uppercase">{technologies}</h2>
			<ul className="mt-5 flex flex-wrap gap-2" aria-label={technologies}>
				{project.technologies.map((technology) => (
					<li key={technology.name}>
						<TechnologyPill technology={technology} />
					</li>
				))}
			</ul>
			<div className="mt-8">
				<Separator />
				<div className="pt-5">
					<h2 className="text-sm font-semibold tracking-[0.18em] text-primary uppercase">{links}</h2>
					{project.url ? (
						<a
							className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-foreground hover:text-primary"
							href={project.url}
							target="_blank"
							rel="noreferrer">
							{visit} <ArrowUpRight aria-hidden="true" className="size-4" />
						</a>
					) : null}
					{project.repository ? (
						<a
							className="mt-3 flex items-center gap-2 text-sm font-medium text-foreground hover:text-primary"
							href={project.repository}
							target="_blank"
							rel="noreferrer">
							<GitBranch aria-hidden="true" className="size-4" /> {viewRepository}
						</a>
					) : null}
				</div>
			</div>
		</aside>
	);
}

export async function ProjectPageLayout({ project, children, sidebar, summary, impact }: ProjectPageLayoutProps) {
	const [locale, t] = await Promise.all([getLocale(), getTranslations()]);
	const backToProjects = t("action.backToProjects");
	const visit = t("action.visit");
	const viewRepository = t("action.viewRepository");
	const technologies = t("projectDetail.technologies");
	const links = t("projectDetail.links");

	return (
		<main className="border-t border-border">
			<section className="relative overflow-hidden">
				<div className="pointer-events-none absolute inset-x-0 top-0 h-96 bg-[radial-gradient(ellipse_at_top,hsl(3_85%_62%_/_0.16),transparent_70%)]" />
				<div className="relative mx-auto w-full max-w-6xl px-5 py-12 sm:py-16">
					<Button asChild variant="ghost" className="mb-12 -ml-3">
						<a href={url(`/${locale}/#projects`)}>← {backToProjects}</a>
					</Button>
					<div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_20rem] lg:items-end">
						<div>
							<h1 className="max-w-4xl text-4xl leading-[0.98] font-semibold tracking-[-0.04em] sm:text-6xl">
								{project.name}
							</h1>
							{summary ? (
								<p className="mt-7 max-w-3xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
									{summary}
								</p>
							) : null}
							<div className="mt-9 flex flex-wrap gap-3">
								{project.url ? (
									<Button asChild>
										<a href={project.url} target="_blank" rel="noreferrer">
											{visit} <ArrowUpRight aria-hidden="true" />
										</a>
									</Button>
								) : null}
								{project.repository ? (
									<Button asChild variant="outline">
										<a href={project.repository} target="_blank" rel="noreferrer">
											<GitBranch aria-hidden="true" /> {viewRepository}
										</a>
									</Button>
								) : null}
							</div>
						</div>
						<div className="border-l-2 border-primary/80 pl-5 text-sm leading-relaxed text-muted-foreground lg:mb-2">
							{impact ? <p className="font-medium text-foreground">{impact}</p> : null}
						</div>
					</div>
				</div>
			</section>

			<section className="border-y border-border bg-card/35">
				<div className="mx-auto grid w-full max-w-6xl gap-12 px-5 py-14 lg:grid-cols-[minmax(0,1fr)_20rem]">
					<div className="space-y-14">{children}</div>
					{sidebar ?? (
						<ProjectSidebar
							project={project}
							technologies={technologies}
							links={links}
							visit={visit}
							viewRepository={viewRepository}
						/>
					)}
				</div>
			</section>
		</main>
	);
}
