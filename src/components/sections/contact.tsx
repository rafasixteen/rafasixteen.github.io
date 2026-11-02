import { SectionTitle } from "@/components/shared/section-title";
import { ButtonLink } from "@/components/ui";
import { site } from "@/config/site";
import { useTranslations } from "next-intl";

export function Contact() {
	const t = useTranslations();

	return (
		<section className="contact-section" id="contact">
			<div className="shell">
				<SectionTitle>{t("section.contact")}</SectionTitle>
				<h2>{t("portfolio.profile.availability")}</h2>
				<ButtonLink href={`mailto:${site.author.email}`}>{t("action.email")}</ButtonLink>
			</div>
		</section>
	);
}
