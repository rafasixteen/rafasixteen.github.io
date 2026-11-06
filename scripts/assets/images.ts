import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";
import type { AssetDefinition, TransformOperation } from "./definitions";
import { createOgImage } from "./og-image";

const projectRoot = process.cwd();

export async function generateImageAssets(assets: readonly AssetDefinition[]): Promise<void> {
	for (const asset of assets) {
		await generateImageAsset(asset);
	}
}

async function generateImageAsset(asset: AssetDefinition): Promise<void> {
	const source = await readFile(path.join(projectRoot, asset.source));
	const output =
		asset.processing.type === "og-image"
			? await createOgImage(source, asset.processing)
			: await processImage(source, asset.processing.operations);
	const destination = path.join(projectRoot, asset.destination);

	await mkdir(path.dirname(destination), { recursive: true });
	await writeFile(destination, output);

	console.log(`Generated ${asset.name}: ${asset.destination}`);
}

async function processImage(source: Buffer, operations: readonly TransformOperation[]): Promise<Buffer> {
	let image = sharp(source);

	for (const operation of operations) {
		switch (operation.type) {
			case "crop":
				image = image.extract(operation.region);
				break;
			case "resize":
				image = image.resize(operation.width, operation.height, {
					fit: operation.fit,
					position: operation.position,
				});
				break;
			case "output":
				image = operation.format === "webp" ? image.webp({ quality: operation.quality }) : image.png();
				break;
		}
	}

	return image.toBuffer();
}
