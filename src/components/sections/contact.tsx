import { SectionTitle } from "@/components/shared/section-title";
import { Button } from "@/components/ui";
import { site } from "@/config/site";
import { useTranslations } from "next-intl";

export function Contact() {
	const t = useTranslations();

	return (
		<section className="border-t border-border bg-card py-20" id="contact">
			<div className="mx-auto w-full max-w-6xl px-5">
				<SectionTitle>{t("section.contact")}</SectionTitle>
				<h2 className="max-w-2xl text-3xl leading-tight sm:text-4xl">{t("portfolio.profile.availability")}</h2>
				<Button asChild className="mt-8">
					<a href={`mailto:${site.author.email}`}>{t("action.email")}</a>
				</Button>
			</div>
		</section>
	);
}
