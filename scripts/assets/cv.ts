import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { renderToBuffer } from "@react-pdf/renderer";
import { createTranslator } from "next-intl";
import { createCvDocument } from "@/components/shared/cv-document";
import { portfolioContent } from "@/content/portfolio";
import { locales } from "@/lib/locales";

export async function generateCvDocuments(): Promise<void> {
	const output = path.join(process.cwd(), "public", "cv");

	await mkdir(output, { recursive: true });

	for (const locale of locales) {
		const messages = (await import(`../../src/translations/${locale}.json`)).default;

		const translator = createTranslator({ locale, messages });
		const document = createCvDocument(portfolioContent[locale], translator);

		const pdf = await renderToBuffer(document);
		await writeFile(path.join(output, `cv-${locale}.pdf`), pdf);

		console.log(`Generated CV: public/cv/cv-${locale}.pdf`);
	}
}
