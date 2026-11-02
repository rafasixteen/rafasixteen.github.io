import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { renderToBuffer } from "@react-pdf/renderer";
import { createTranslator } from "next-intl";
import { createCvDocument } from "../src/components/shared/cv-document";
import { portfolioContent } from "../src/content/validation";
import { routing } from "../src/i18n/routing";

const output = path.resolve("public/cv");

await mkdir(output, { recursive: true });

for (const locale of routing.locales) {
	const messages = (await import(`../src/translations/${locale}.json`)).default;
	const t = createTranslator({ locale, messages });
	const document = createCvDocument(portfolioContent[locale], t);
	const pdf = await renderToBuffer(document);
	await writeFile(path.join(output, `cv-${locale}.pdf`), pdf);
}
