import { Braces, Database, FileCode2, GitBranch, Network, Server } from "lucide-react";
import type { IconItem, IconItemSource } from "./icon-item";

/** A complete localized work-experience entry. */
export interface Experience {
	translationKey: string;
	company: string;
	location: string;
	url?: string;
	start: `${number}-${number}`;
	end?: `${number}-${number}`;
	technologies: IconItem[];
	summary: string;
}

/** Work-experience fields authored in TypeScript before summary and technology names are translated. */
export interface ExperienceDefinition {
	translationKey: string;
	company: string;
	location: string;
	url?: string;
	start: `${number}-${number}`;
	end?: `${number}-${number}`;
	technologies: IconItemSource[];
}

export const experience = [
	{
		translationKey: "vitalis",
		company: "VITALIS GmbH",
		location: "Schkeuditz, Germany",
		start: "2025-01",
		end: "2025-03",
		technologies: [
			{ id: "html-css", icon: <Braces aria-hidden="true" size={16} strokeWidth={1.8} /> },
			{ id: "networking", icon: <Network aria-hidden="true" size={16} strokeWidth={1.8} /> },
			{ id: "smart-home-automation", icon: <Network aria-hidden="true" size={16} strokeWidth={1.8} /> },
			{ id: "3d-modeling-printing", icon: <FileCode2 aria-hidden="true" size={16} strokeWidth={1.8} /> },
			{ id: "electronics", icon: <Database aria-hidden="true" size={16} strokeWidth={1.8} /> },
			{ id: "filemaker-pro", icon: <Database aria-hidden="true" size={16} strokeWidth={1.8} /> },
		],
	},
	{
		translationKey: "janela-digital",
		company: "Janela Digital Informática e Telecomunicações S.A.",
		location: "Óbidos, Portugal",
		start: "2024-04",
		end: "2024-06",
		technologies: [
			{ id: "aspnet-core-mvc", icon: <Server aria-hidden="true" size={16} strokeWidth={1.8} /> },
			{ id: "razor-pages", icon: <FileCode2 aria-hidden="true" size={16} strokeWidth={1.8} /> },
			{ id: "bootstrap", icon: <Braces aria-hidden="true" size={16} strokeWidth={1.8} /> },
			{ id: "git", icon: <GitBranch aria-hidden="true" size={16} strokeWidth={1.8} /> },
		],
	},
] satisfies ExperienceDefinition[];
