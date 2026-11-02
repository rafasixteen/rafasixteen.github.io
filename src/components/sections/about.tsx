import { SectionTitle } from "@/components/shared/section-title";
import { useTranslations } from "next-intl";

export function About() {
	const t = useTranslations();

	return (
		<section className="border-t border-border py-20" id="about">
			<div className="mx-auto w-full max-w-6xl px-5">
				<SectionTitle>{t("section.about")}</SectionTitle>
				<p className="max-w-3xl text-lg text-muted-foreground">{t("portfolio.profile.summary")}</p>
			</div>
		</section>
	);
}
