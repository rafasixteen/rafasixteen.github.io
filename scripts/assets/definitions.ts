import { site } from "@/config/site";
import { getActivePrimaryColor } from "@/lib/theme";

export interface CropOperation {
	type: "crop";
	region: {
		left: number;
		top: number;
		width: number;
		height: number;
	};
}

export interface ResizeOperation {
	type: "resize";
	width: number;
	height: number;
	fit: "contain" | "cover";
	position?: "center" | "top";
}

export interface OutputOperation {
	type: "output";
	format: "png" | "webp";
	quality?: number;
}

export type TransformOperation = CropOperation | ResizeOperation | OutputOperation;

export interface OgImageProcessing {
	type: "og-image";
	primaryColor: string;
	title: string;
}

export type AssetProcessing = { type: "transform"; operations: readonly TransformOperation[] } | OgImageProcessing;

export interface AssetDefinition {
	name: string;
	source: string;
	destination: string;
	processing: AssetProcessing;
}

export const assetDefinitions: readonly AssetDefinition[] = [
	{
		name: "hero avatar",
		source: "assets/avatar-cutout.png",
		destination: "public/images/avatar-cutout.webp",
		processing: {
			type: "transform",
			operations: [
				{
					type: "output",
					format: "webp",
					quality: 85,
				},
			],
		},
	},
	{
		name: "CV avatar",
		source: "assets/avatar-cutout.png",
		destination: "public/images/avatar-face.png",
		processing: {
			type: "transform",
			operations: [
				{
					type: "crop",
					region: {
						left: 327,
						top: 100,
						width: 600,
						height: 600,
					},
				},
				{
					type: "resize",
					width: 1254,
					height: 1254,
					fit: "cover",
					position: "top",
				},
				{
					type: "output",
					format: "png",
				},
			],
		},
	},
	{
		name: "social preview",
		source: "public/images/avatar-face.png",
		destination: "public/images/og-image.png",
		processing: {
			type: "og-image",
			primaryColor: getActivePrimaryColor(),
			title: site.name,
		},
	},
];
