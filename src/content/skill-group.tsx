import { Braces, Database, FileCode2, GitBranch, Languages, Network, Server } from "lucide-react";
import type { IconItem, IconItemSource } from "./icon-item";

/** A complete localized group of skills. */
export interface SkillGroup {
	translationKey: string;
	name: string;
	skills: IconItem[];
}

/** Skill-group IDs and icons authored in TypeScript before names are translated. */
export interface SkillGroupDefinition {
	translationKey: string;
	skills: IconItemSource[];
}

export const skillGroups = [
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
] satisfies SkillGroupDefinition[];
