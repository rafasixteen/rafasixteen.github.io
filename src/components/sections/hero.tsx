import { SectionTitle } from "@/components/shared/section-title";
import { Button, Card, CardContent } from "@/components/ui";
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
		<section
			className="mx-auto grid min-h-[min(44rem,calc(100vh-4.5rem))] w-full max-w-6xl items-end gap-12 px-5 py-20 lg:grid-cols-[minmax(0,1.8fr)_minmax(15rem,.7fr)]"
			id="home">
			<div>
				<SectionTitle>{profile.location}</SectionTitle>
				<h1 className="max-w-[13ch] text-5xl leading-none font-semibold tracking-[-0.04em] sm:text-7xl lg:text-8xl">
					{t("portfolio.profile.role")}
				</h1>
				<p className="mt-6 max-w-2xl text-lg text-muted-foreground sm:text-xl">
					{t("portfolio.profile.summary")}
				</p>
				<div className="mt-12 flex flex-wrap items-center gap-4">
					<Button asChild>
						<a href={url(`/cv/cv-${locale}.pdf`)}>{t("action.downloadCv")}</a>
					</Button>
					<Button asChild variant="ghost">
						<a href={`mailto:${profile.email}`}>{t("action.email")}</a>
					</Button>
				</div>
			</div>
			<Card className="py-0">
				<CardContent className="p-4">
					<img
						className="aspect-square w-full rounded-lg object-cover"
						src={url("/images/avatar.jpg")}
						alt={profile.name}
					/>
					<p className="mt-6 text-sm text-muted-foreground">{t("portfolio.profile.availability")}</p>
					<ul className="mt-5 flex flex-wrap gap-x-4 gap-y-2 text-sm font-medium">
						{profile.links.map((link) => (
							<li key={link.url}>
								<a className="text-primary underline-offset-4 hover:underline" href={link.url}>
									{link.label}
								</a>
							</li>
						))}
					</ul>
				</CardContent>
			</Card>
		</section>
	);
}
