import { SectionTitle } from "@/components/shared/section-title";
import { ButtonLink, buttonClassName } from "@/components/ui";
import type { Profile } from "@/content/profile";
import type { Locale } from "@/i18n/routing";
import { url } from "@/lib/url";
import { useTranslations } from "next-intl";

interface HeroProps {
	locale: Locale;
	profile: Profile;
}

export function Hero({ locale, profile }: HeroProps) {
	const t = useTranslations();

	return (
		<section className="hero shell" id="home">
			<div>
				<SectionTitle>{profile.location}</SectionTitle>
				<h1>{t("portfolio.profile.role")}</h1>
				<p className="hero-summary">{t("portfolio.profile.summary")}</p>
				<div className="hero-actions">
					<a className={buttonClassName()} href={url(`/cv/cv-${locale}.pdf`)}>
						{t("action.downloadCv")}
					</a>
					<ButtonLink className="text-link" href={`mailto:${profile.email}`}>
						{t("action.email")}
					</ButtonLink>
				</div>
			</div>
			<aside>
				<img className="hero-photo" src={url("/images/avatar.jpg")} alt={profile.name} />
				<p>{t("portfolio.profile.availability")}</p>
				<ul>
					{profile.links.map((link) => (
						<li key={link.url}>
							<a href={link.url}>{link.label}</a>
						</li>
					))}
				</ul>
			</aside>
		</section>
	);
}
