import { SectionTitle } from "@/components/shared/section-title";
import type { Education } from "@/content/education";
import type { Locale } from "@/lib/locales";
import { formatDate } from "@/lib/format";
import { useTranslations } from "next-intl";

interface EducationTimelineProps {
	locale: Locale;
	education: readonly Education[];
}

export function EducationTimeline({ locale, education }: EducationTimelineProps) {
	const t = useTranslations();

	return (
		<section className="border-t border-border py-20" id="education">
			<div className="mx-auto w-full max-w-6xl px-5">
				<SectionTitle>{t("section.education")}</SectionTitle>
				<ol className="grid gap-12">
					{education.map((entry) => (
						<li
							key={entry.translationKey}
							className="grid gap-3 md:grid-cols-[minmax(9rem,.45fr)_minmax(0,1.5fr)] md:gap-6">
							<div className="text-sm text-muted-foreground">
								{formatDate(entry.start, locale)} -{" "}
								{entry.end ? formatDate(entry.end, locale) : t("label.present")}
							</div>
							<div>
								<h2 className="text-2xl">{entry.credential}</h2>
								<p className="mt-2 text-sm text-muted-foreground">
									{entry.institution} · {entry.location}
								</p>
								<p className="mt-4 text-muted-foreground">{entry.detail}</p>
							</div>
						</li>
					))}
				</ol>
			</div>
		</section>
	);
}
