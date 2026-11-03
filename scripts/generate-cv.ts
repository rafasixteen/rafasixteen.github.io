import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { renderToBuffer } from "@react-pdf/renderer";
import { createTranslator } from "next-intl";
import { createCvDocument } from "@/components/shared/cv-document";
import { portfolioContent } from "@/content/validation";
import { locales } from "@/lib/locales";

const output = path.resolve("public/cv");

await mkdir(output, { recursive: true });

for (const locale of locales) {
	const messages = (await import(`../src/translations/${locale}.json`)).default;

	const t = createTranslator({
		locale,
		messages,
	});

	const projectT = createTranslator({
		locale,
		messages,
		namespace: "portfolio.projects",
	});

	const document = createCvDocument(portfolioContent[locale], t, projectT);
	const pdf = await renderToBuffer(document);

	await writeFile(path.join(output, `cv-${locale}.pdf`), pdf);
}
