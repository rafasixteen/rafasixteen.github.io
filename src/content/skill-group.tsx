import type { ReactElement } from "react";
import { Braces, Database, FileCode2, GitBranch, Languages, Network, Server } from "lucide-react";
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
		translationKey: "backend",
		skills: [
			{ name: "Go", icon: <Server size={16} /> },
			{ name: "REST APIs", icon: <Network size={16} /> },
			{ name: "PostgreSQL", icon: <Database size={16} /> },
			{ name: "SQLite", icon: <Database size={16} /> },
			{ name: "SQL", icon: <Database size={16} /> },
			{ name: "ASP.NET Core MVC", icon: <Server size={16} /> },
		],
	},
	{
		translationKey: "frontend",
		skills: [
			{ name: "TypeScript", icon: <Braces size={16} /> },
			{ name: "React / Next.js", icon: <FileCode2 size={16} /> },
			{ name: "HTML / CSS / Tailwind CSS", icon: <Braces size={16} /> },
			{ name: "Go templ / Datastar", icon: <FileCode2 size={16} /> },
			{ name: "Razor Pages", icon: <FileCode2 size={16} /> },
		],
	},
	{
		translationKey: "mobile",
		skills: [
			{ name: "Kotlin Multiplatform", icon: <FileCode2 size={16} /> },
			{ name: "Android development", icon: <FileCode2 size={16} /> },
		],
	},
	{
		translationKey: "devops",
		skills: [
			{ name: "Linux", icon: <Server size={16} /> },
			{ name: "Docker", icon: <Server size={16} /> },
			{ name: "Networking", icon: <Network size={16} /> },
			{ name: "Git / GitHub Actions", icon: <GitBranch size={16} /> },
		],
	},
	{
		translationKey: "technical-practice",
		skills: [
			{ name: "Electronics / Arduino", icon: <Database size={16} /> },
			{ name: "3D modeling / printing", icon: <FileCode2 size={16} /> },
			{ name: "Smart-home automation", icon: <Network size={16} /> },
		],
	},
	{
		translationKey: "languages",
		skills: [
			{ name: "Portuguese (native)", icon: <Languages size={16} /> },
			{ name: "English (proficient)", icon: <Languages size={16} /> },
		],
	},
];
