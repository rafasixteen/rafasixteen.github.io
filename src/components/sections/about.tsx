import { SectionTitle } from "@/components/shared/section-title";
import { useTranslations } from "next-intl";

export function About() {
	const t = useTranslations();

	return (
		<section className="section shell" id="about">
			<SectionTitle>{t("section.about")}</SectionTitle>
			<div className="prose">
				<p>{t("portfolio.profile.summary")}</p>
				<p>{t("portfolio.profile.availability")}</p>
			</div>
		</section>
	);
}
