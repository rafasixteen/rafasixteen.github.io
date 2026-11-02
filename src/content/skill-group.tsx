import type { ReactElement } from "react";
import { Braces, Database, FileCode2, GitBranch, Network, Server } from "lucide-react";
import { z } from "zod";

const skillSchema = z.object({
	name: z.string().min(1),
	icon: z.custom<ReactElement>(),
});

export const skillGroupSharedDataSchema = z.object({
	translationKey: z.string().min(1),
	skills: z.array(skillSchema).min(1),
});

export const skillGroupTranslationSchema = z.object({
	name: z.string().min(1),
});

export const skillGroupSchema = skillGroupSharedDataSchema.extend(skillGroupTranslationSchema.shape);

export type SkillGroupSharedData = z.infer<typeof skillGroupSharedDataSchema>;

export type SkillGroupTranslation = z.infer<typeof skillGroupTranslationSchema>;

export type SkillGroup = z.infer<typeof skillGroupSchema>;

export type SkillGroupTranslations = Record<string, SkillGroupTranslation>;

export const skillGroups: SkillGroupSharedData[] = [
	{
		translationKey: "web-development",
		skills: [
			{
				name: "HTML and CSS",
				icon: <Braces aria-hidden="true" size={16} strokeWidth={1.8} />,
			},
			{
				name: "ASP.NET Core MVC",
				icon: <Server aria-hidden="true" size={16} strokeWidth={1.8} />,
			},
			{
				name: "Razor Pages",
				icon: <FileCode2 aria-hidden="true" size={16} strokeWidth={1.8} />,
			},
			{
				name: "Git",
				icon: <GitBranch aria-hidden="true" size={16} strokeWidth={1.8} />,
			},
		],
	},
	{
		translationKey: "technical-practice",
		skills: [
			{
				name: "Networking",
				icon: <Network aria-hidden="true" size={16} strokeWidth={1.8} />,
			},
			{
				name: "Smart home automation",
				icon: <Network aria-hidden="true" size={16} strokeWidth={1.8} />,
			},
			{
				name: "3D modeling and printing",
				icon: <FileCode2 aria-hidden="true" size={16} strokeWidth={1.8} />,
			},
			{
				name: "FileMaker Pro",
				icon: <Database aria-hidden="true" size={16} strokeWidth={1.8} />,
			},
		],
	},
];
