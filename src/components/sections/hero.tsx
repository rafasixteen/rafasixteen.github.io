import { Button } from "@/components/ui";
import { LinkList, type LinkListItem } from "@/components/shared/link-list";
import type { Profile } from "@/content/profile";
import type { Locale } from "@/i18n/routing";
import { Mail } from "lucide-react";
import { url } from "@/lib/url";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";

interface HeroProps {
	locale: Locale;
	profile: Profile;
}

export function Hero({ locale, profile }: HeroProps) {
	const t = useTranslations();

	const { nameLines, accentIndex } = getHeroNameLayout(profile.name);

	const contactLinks: LinkListItem[] = [
		...profile.links.filter((link) => link.label !== "Portfolio"),
		{
			label: profile.email,
			url: `mailto:${profile.email}`,
			icon: Mail,
		},
	];

	return (
		<section className="relative isolate overflow-hidden bg-background text-foreground" id="home">
			<div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_72%_42%,hsl(3_85%_62%_/_0.2),transparent_30%),linear-gradient(120deg,transparent_38%,hsl(3_85%_62%_/_0.08)_38%,transparent_67%)]" />
			<div className="pointer-events-none absolute inset-x-0 top-1/2 -z-10 h-px bg-primary/20" />
			<div className="mx-auto grid min-h-[min(52rem,calc(100vh-4.5rem))] w-full max-w-7xl items-center gap-8 px-5 py-14 sm:px-8 sm:py-20 lg:grid-cols-[minmax(0,0.9fr)_minmax(22rem,1.1fr)] lg:gap-4 lg:px-10 lg:py-16">
				<div className="relative z-10 max-w-2xl">
					<div className="mb-8 flex items-center gap-3 text-xs font-semibold tracking-[0.24em] text-primary uppercase sm:mb-10">
						<span className="h-px w-10 bg-primary" />
						<p>{profile.location}</p>
					</div>
					<h1 className="max-w-[8ch] text-[clamp(4rem,13vw,9.5rem)] leading-[0.78] font-black tracking-[-0.08em] uppercase">
						{nameLines.map((line, index) => (
							<span
								className={cn("block", index === accentIndex && "text-primary")}
								key={`${line}-${index}`}>
								{line}
							</span>
						))}
					</h1>
					<p className="mt-8 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
						{t("portfolio.profile.summary")}
					</p>
					<div className="mt-9 flex flex-wrap items-center gap-3">
						<Button asChild className="bg-primary text-primary-foreground hover:bg-primary">
							<a href={url(`/cv/cv-${locale}.pdf`)}>{t("action.downloadCv")}</a>
						</Button>
					</div>
				</div>

				<div className="relative flex min-h-[22rem] items-end justify-center sm:min-h-[30rem] lg:min-h-[42rem]">
					<div
						aria-hidden="true"
						className="pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 text-center text-[clamp(4.5rem,13vw,12rem)] leading-none font-black tracking-[-0.1em] text-primary/15 uppercase select-none">
						Portfolio
					</div>
					<div aria-hidden="true" className="absolute top-[18%] right-0 h-px w-2/3 bg-primary/60" />
					<img
						className="relative z-10 max-h-[min(70vh,48rem)] w-full max-w-[34rem] object-contain object-bottom"
						src={url("/images/avatar-cutout.png")}
						alt={profile.name}
					/>
				</div>

				<div className="col-span-full flex flex-wrap items-center justify-end gap-4 border-t border-foreground/15 pt-5 text-xs font-semibold tracking-[0.16em] text-muted-foreground uppercase">
					<LinkList links={contactLinks} className="text-foreground/70 [&_a:hover]:text-primary" />
				</div>
			</div>
		</section>
	);
}

interface HeroNameLayout {
	nameWords: string[];
	nameLines: string[];
	accentIndex: number;
}

/**
 * Converts a profile name into the editorial hero layout.
 *
 * Names with three or more words keep the first word and surname on their
 * own lines, grouping any middle names together. The middle display line is
 * selected as the accent line.
 *
 * @example
 * const { nameWords, nameLines, accentIndex } = getHeroNameLayout("Rafael Da Silva Rego");
 * // nameWords: ["Rafael", "Da", "Silva", "Rego"]
 * // nameLines: ["Rafael", "Da Silva", "Rego"]
 * // accentIndex: 1
 */
export function getHeroNameLayout(name: string): HeroNameLayout {
	const nameWords = name.trim().split(/\s+/).filter(Boolean);
	const nameLines =
		nameWords.length > 2
			? [nameWords[0], nameWords.slice(1, -1).join(" "), nameWords[nameWords.length - 1]]
			: nameWords;

	return {
		nameWords,
		nameLines,
		accentIndex: Math.floor(nameLines.length / 2),
	};
}
