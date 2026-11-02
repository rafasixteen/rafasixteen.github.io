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
		<section className="section shell" id="experience">
			<SectionTitle>{t("section.experience")}</SectionTitle>
			<ol className="timeline">
				{experience.map((entry) => (
					<li key={entry.translationKey}>
						<div className="timeline-date">
							{formatDate(entry.start, locale)} —{" "}
							{entry.end ? formatDate(entry.end, locale) : t("label.present")}
						</div>
						<div>
							<h2>{entry.role}</h2>
							<p className="meta">
								{entry.company} · {entry.location}
							</p>
							<p>{entry.summary}</p>
							<ul>
								{entry.highlights.map((item) => (
									<li key={item}>{item}</li>
								))}
							</ul>
						</div>
					</li>
				))}
			</ol>
		</section>
	);
}
