import { SectionTitle } from "@/components/shared/section-title";
import { useTranslations } from "next-intl";

export function About() {
	const t = useTranslations();

	return (
		<section className="border-t border-border py-20" id="about">
			<div className="mx-auto w-full max-w-6xl px-5">
				<SectionTitle>{t("section.about")}</SectionTitle>
				<div className="grid max-w-5xl gap-6 text-lg text-muted-foreground md:grid-cols-2">
					<p>{t("portfolio.profile.summary")}</p>
					<p>{t("portfolio.profile.availability")}</p>
				</div>
			</div>
		</section>
	);
}
