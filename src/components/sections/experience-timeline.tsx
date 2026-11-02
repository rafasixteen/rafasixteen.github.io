import { SectionTitle } from "@/components/shared/section-title";
import type { Experience } from "@/content/experience";
import { formatDate } from "@/lib/format";
import type { Locale } from "@/i18n/routing";
import { useTranslations } from "next-intl";

interface ExperienceTimelineProps {
	locale: Locale;
	experience: readonly Experience[];
}

export function ExperienceTimeline({ locale, experience }: ExperienceTimelineProps) {
	const t = useTranslations();

	return (
		<section className="border-t border-border py-20" id="experience">
			<div className="mx-auto w-full max-w-6xl px-5">
				<SectionTitle>{t("section.experience")}</SectionTitle>
				<ol className="grid gap-12">
					{experience.map((entry) => (
						<li
							key={entry.translationKey}
							className="grid gap-3 md:grid-cols-[minmax(9rem,.45fr)_minmax(0,1.5fr)] md:gap-6">
							<div className="text-sm text-muted-foreground">
								{formatDate(entry.start, locale)} —{" "}
								{entry.end ? formatDate(entry.end, locale) : t("label.present")}
							</div>
							<div>
								<h2 className="text-2xl">{entry.role}</h2>
								<p className="mt-2 text-sm text-muted-foreground">
									{entry.company} · {entry.location}
								</p>
								<p className="mt-4 text-muted-foreground">{entry.summary}</p>
								<ul className="mt-4 list-disc space-y-1 pl-5 text-muted-foreground">
									{entry.highlights.map((item) => (
										<li className="pl-1" key={item}>
											{item}
										</li>
									))}
								</ul>
							</div>
						</li>
					))}
				</ol>
			</div>
		</section>
	);
}
