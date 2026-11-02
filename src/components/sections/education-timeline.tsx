import { SectionTitle } from "@/components/shared/section-title";
import type { Education } from "@/content/education";
import type { Locale } from "@/i18n/routing";
import { formatDate } from "@/lib/format";
import { useTranslations } from "next-intl";

interface EducationTimelineProps {
	locale: Locale;
	education: readonly Education[];
}

export function EducationTimeline({ locale, education }: EducationTimelineProps) {
	const t = useTranslations();

	return (
		<section className="section shell" id="education">
			<SectionTitle>{t("section.education")}</SectionTitle>
			<ol className="timeline">
				{education.map((entry) => (
					<li key={entry.translationKey}>
						<div className="timeline-date">
							{formatDate(entry.start, locale)} —{" "}
							{entry.end ? formatDate(entry.end, locale) : t("label.present")}
						</div>
						<div>
							<h2>{entry.credential}</h2>
							<p className="meta">
								{entry.institution} · {entry.location}
							</p>
							<p>{entry.detail}</p>
						</div>
					</li>
				))}
			</ol>
		</section>
	);
}
