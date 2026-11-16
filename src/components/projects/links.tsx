import { getTranslations } from "next-intl/server";

export interface ProjectLink {
	label: string;
	href: string;
}

export async function ProjectLinks({ links }: { links: readonly ProjectLink[] }) {
	const t = await getTranslations();
	const references = t("projectDetail.references");

	return (
		<section>
			<h2 className="text-sm font-semibold tracking-[0.18em] text-primary uppercase">{references}</h2>
			<ul className="mt-5 space-y-3 text-sm">
				{links.map((link) => (
					<li key={link.href}>
						<a
							className="text-muted-foreground underline decoration-border underline-offset-4 transition-colors hover:text-primary hover:decoration-primary"
							href={link.href}
							target="_blank"
							rel="noreferrer">
							{link.label}
						</a>
					</li>
				))}
			</ul>
		</section>
	);
}
