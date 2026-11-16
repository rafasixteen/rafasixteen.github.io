import type { ReactNode } from "react";
import { Button } from "@/components/ui";
import { url } from "@/lib/url";
import { getLocale, getTranslations } from "next-intl/server";

export async function ProjectPageHero({ children }: { children: ReactNode }) {
	const [locale, t] = await Promise.all([getLocale(), getTranslations()]);

	return (
		<section className="relative overflow-hidden">
			<div className="project-decoration pointer-events-none absolute inset-x-0 top-0 h-96" />
			<div className="relative mx-auto w-full max-w-6xl px-5 py-12 sm:py-16">
				<Button asChild variant="ghost" className="mb-12 -ml-3">
					<a href={url(`/${locale}/#projects`)}>← {t("action.backToProjects")}</a>
				</Button>
				<div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_20rem] lg:items-end">{children}</div>
			</div>
		</section>
	);
}
