import { fileURLToPath } from "node:url";
import path from "node:path";
import { assetDefinitions } from "./definitions";
import { generateCvDocuments } from "./cv";
import { generateImageAssets } from "./images";

export async function generateAssets(): Promise<void> {
	await generateImageAssets(assetDefinitions);
	await generateCvDocuments();
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
	await generateAssets();
}
