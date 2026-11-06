import "@/app/globals.css";

import { Button } from "@/components/ui";
import { defaultLocale } from "@/lib/locales";
import { url } from "@/lib/url";

const notFoundMessages = {
	eyebrow: "404 / Página não encontrada",
	title: "Esta página não existe.",
	description:
		"O endereço pode estar errado ou a página pode ter sido movida. Volta ao portefólio para continuares a explorar.",
	home: "Voltar ao portefólio",
} as const;

export default function NotFound() {
	return (
		<section className="relative isolate flex min-h-dvh items-center overflow-hidden bg-background text-foreground">
			<div className="linear-decoration pointer-events-none absolute inset-0 -z-10" />
			<div
				aria-hidden="true"
				className="pointer-events-none absolute inset-x-0 top-1/2 -z-10 -translate-y-1/2 text-center text-[clamp(10rem,35vw,30rem)] leading-none font-black tracking-[-0.12em] text-primary/10 select-none">
				404
			</div>
			<div className="mx-auto w-full max-w-6xl px-5 py-24 sm:px-8 lg:px-10">
				<div className="max-w-xl">
					<p className="mb-5 flex items-center gap-3 text-xs font-semibold tracking-[0.24em] text-primary uppercase">
						<span className="h-px w-10 bg-primary" />
						{notFoundMessages.eyebrow}
					</p>
					<h1 className="max-w-lg text-5xl leading-[0.95] font-black tracking-[-0.06em] uppercase sm:text-7xl">
						{notFoundMessages.title}
					</h1>
					<p className="mt-7 max-w-lg text-base leading-relaxed text-muted-foreground sm:text-lg">
						{notFoundMessages.description}
					</p>
					<div className="mt-9">
						<Button asChild size="lg">
							<a href={url(`/${defaultLocale}/`)}>{notFoundMessages.home}</a>
						</Button>
					</div>
				</div>
			</div>
		</section>
	);
}
