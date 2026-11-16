import { Atom, Braces, Database, FileCode2, Network, Server } from "lucide-react";
import type { IconItem, IconItemSource } from "@/content/icon-item";

/** A fully assembled project consumed by routes and components. */
export interface Project {
	translationKey: string;
	name: string;
	technologies: IconItem[];
	summary: string;
}

/** Project metadata authored in TypeScript before names and summaries are translated. */
interface ProjectDefinition {
	translationKey: string;
	technologies: IconItemSource[];
}

export const projects = [
	{
		translationKey: "cal-platform",
		technologies: [
			{ id: "go", icon: <Server aria-hidden="true" size={16} strokeWidth={1.8} /> },
			{ id: "postgresql", icon: <Database aria-hidden="true" size={16} strokeWidth={1.8} /> },
			{ id: "datastar", icon: <Network aria-hidden="true" size={16} strokeWidth={1.8} /> },
			{ id: "docker", icon: <Server aria-hidden="true" size={16} strokeWidth={1.8} /> },
		],
	},
	{
		translationKey: "cal-judge",
		technologies: [
			{ id: "kotlin-multiplatform", icon: <FileCode2 aria-hidden="true" size={16} strokeWidth={1.8} /> },
			{ id: "android", icon: <Atom aria-hidden="true" size={16} strokeWidth={1.8} /> },
			{ id: "gradle", icon: <Braces aria-hidden="true" size={16} strokeWidth={1.8} /> },
			{ id: "go-api", icon: <Server aria-hidden="true" size={16} strokeWidth={1.8} /> },
		],
	},
	{
		translationKey: "minecraft-server",
		technologies: [
			{ id: "docker", icon: <Server aria-hidden="true" size={16} strokeWidth={1.8} /> },
			{ id: "linux", icon: <Server aria-hidden="true" size={16} strokeWidth={1.8} /> },
			{ id: "tailscale", icon: <Network aria-hidden="true" size={16} strokeWidth={1.8} /> },
			{ id: "playit", icon: <Network aria-hidden="true" size={16} strokeWidth={1.8} /> },
			{ id: "crafty-controller", icon: <Server aria-hidden="true" size={16} strokeWidth={1.8} /> },
		],
	},
] satisfies ProjectDefinition[];

export function projectSlug(project: Pick<Project, "translationKey">): string {
	return project.translationKey;
}
