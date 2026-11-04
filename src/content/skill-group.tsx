import type { ReactElement } from "react";
import { Braces, Database, FileCode2, GitBranch, Languages, Network, Server } from "lucide-react";
import { z } from "zod";

const skillSharedSchema = z.object({
	id: z.string().min(1),
	icon: z.custom<ReactElement>(),
});

const skillSchema = skillSharedSchema.extend({
	name: z.string().min(1),
});

const skillTranslationSchema = z.object({
	id: z.string().min(1),
	name: z.string().min(1),
});

export const skillGroupSharedDataSchema = z.object({
	translationKey: z.string().min(1),
	skills: z.array(skillSharedSchema).min(1),
});

export const skillGroupTranslationSchema = z.object({
	id: z.string().min(1),
	name: z.string().min(1),
	skills: z.array(skillTranslationSchema).min(1),
});

export const skillGroupSchema = skillGroupSharedDataSchema.extend({
	skills: z.array(skillSchema).min(1),
	id: z.string().min(1),
	name: z.string().min(1),
});

export type SkillGroupSharedData = z.infer<typeof skillGroupSharedDataSchema>;

export type SkillGroupTranslation = z.infer<typeof skillGroupTranslationSchema>;

export type SkillGroup = z.infer<typeof skillGroupSchema>;

export type SkillGroupTranslations = SkillGroupTranslation[];

export const skillGroups: SkillGroupSharedData[] = [
	{
		translationKey: "backend",
		skills: [
			{ id: "go", icon: <Server size={16} /> },
			{ id: "rest-apis", icon: <Network size={16} /> },
			{ id: "postgresql", icon: <Database size={16} /> },
			{ id: "sqlite", icon: <Database size={16} /> },
			{ id: "sql", icon: <Database size={16} /> },
			{ id: "aspnet-core-mvc", icon: <Server size={16} /> },
		],
	},
	{
		translationKey: "frontend",
		skills: [
			{ id: "typescript", icon: <Braces size={16} /> },
			{ id: "react-next", icon: <FileCode2 size={16} /> },
			{ id: "html-css-tailwind", icon: <Braces size={16} /> },
			{ id: "go-templ-datastar", icon: <FileCode2 size={16} /> },
			{ id: "razor-pages", icon: <FileCode2 size={16} /> },
		],
	},
	{
		translationKey: "mobile",
		skills: [
			{ id: "kotlin-multiplatform", icon: <FileCode2 size={16} /> },
			{ id: "android-development", icon: <FileCode2 size={16} /> },
		],
	},
	{
		translationKey: "devops",
		skills: [
			{ id: "linux", icon: <Server size={16} /> },
			{ id: "docker", icon: <Server size={16} /> },
			{ id: "networking", icon: <Network size={16} /> },
			{ id: "git-github-actions", icon: <GitBranch size={16} /> },
		],
	},
	{
		translationKey: "technical-practice",
		skills: [
			{ id: "electronics-arduino", icon: <Database size={16} /> },
			{ id: "3d-modeling-printing", icon: <FileCode2 size={16} /> },
			{ id: "smart-home-automation", icon: <Network size={16} /> },
		],
	},
	{
		translationKey: "languages",
		skills: [
			{ id: "portuguese", icon: <Languages size={16} /> },
			{ id: "english", icon: <Languages size={16} /> },
		],
	},
];
