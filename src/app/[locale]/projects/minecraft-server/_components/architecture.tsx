"use client";

import { Handle, MarkerType, Position, ReactFlow, type Edge, type Node, type NodeProps } from "@xyflow/react";

export interface MinecraftServerArchitectureLabels {
	ariaLabel: string;
	accessPaths: string;
	localhost: string;
	lan: string;
	privateVpn: string;
	publicTunnel: string;
	crafty: string;
	minecraft: string;
}

interface Props {
	labels: MinecraftServerArchitectureLabels;
}

type NodeKind = "access" | "admin" | "service";

interface DiagramData extends Record<string, unknown> {
	kind: NodeKind;
	title: string;
	ariaLabel: string;
}

type DiagramNode = Node<DiagramData>;

const nodeTypes = { architecture: ArchitectureNode };
const arrow = { type: MarkerType.ArrowClosed, color: "var(--primary)" };
const mutedArrow = { type: MarkerType.ArrowClosed, color: "var(--muted-foreground)" };

function Handles() {
	return (
		<>
			<Handle className="!pointer-events-none !opacity-0" id="top" position={Position.Top} type="target" />
			<Handle
				className="!pointer-events-none !opacity-0"
				id="top-far-left"
				position={Position.Top}
				style={{ left: "15%" }}
				type="target"
			/>
			<Handle
				className="!pointer-events-none !opacity-0"
				id="top-left"
				position={Position.Top}
				style={{ left: "30%" }}
				type="target"
			/>
			<Handle
				className="!pointer-events-none !opacity-0"
				id="top-right"
				position={Position.Top}
				style={{ left: "70%" }}
				type="target"
			/>
			<Handle
				className="!pointer-events-none !opacity-0"
				id="top-far-right"
				position={Position.Top}
				style={{ left: "85%" }}
				type="target"
			/>
			<Handle className="!pointer-events-none !opacity-0" id="bottom" position={Position.Bottom} type="source" />
			<Handle
				className="!pointer-events-none !opacity-0"
				id="bottom-right"
				position={Position.Bottom}
				style={{ left: "65%" }}
				type="source"
			/>
			<Handle
				className="!pointer-events-none !opacity-0"
				id="left-target"
				position={Position.Left}
				type="target"
			/>
			<Handle
				className="!pointer-events-none !opacity-0"
				id="right-source"
				position={Position.Right}
				type="source"
			/>
		</>
	);
}

function ArchitectureNode({ data }: NodeProps<DiagramNode>) {
	const tone =
		data.kind === "access"
			? "border-primary/60 bg-card/95"
			: data.kind === "admin"
				? "border-primary/55 bg-accent/25"
				: "border-primary/45 bg-card";

	return (
		<div
			aria-label={data.ariaLabel}
			className={`relative flex h-full w-full items-center justify-center overflow-hidden rounded-xl border px-4 py-3 text-center transition-colors ${tone}`}
			role="group">
			<Handles />
			<p className="text-sm leading-tight font-semibold text-foreground">{data.title}</p>
		</div>
	);
}

function node(id: string, x: number, y: number, width: number, height: number, data: DiagramData): DiagramNode {
	return {
		id,
		type: "architecture",
		position: { x, y },
		data,
		draggable: false,
		selectable: false,
		connectable: false,
		style: { width, height },
	};
}

function createNodes(labels: MinecraftServerArchitectureLabels): DiagramNode[] {
	return [
		node("access-paths", 300, 0, 180, 56, {
			kind: "access",
			title: labels.accessPaths,
			ariaLabel: labels.accessPaths,
		}),
		node("localhost", 0, 100, 180, 64, {
			kind: "admin",
			title: labels.localhost,
			ariaLabel: labels.localhost,
		}),
		node("tailscale", 200, 100, 180, 64, {
			kind: "access",
			title: labels.privateVpn,
			ariaLabel: labels.privateVpn,
		}),
		node("lan", 400, 100, 180, 64, {
			kind: "access",
			title: labels.lan,
			ariaLabel: labels.lan,
		}),
		node("public", 600, 100, 180, 64, {
			kind: "access",
			title: labels.publicTunnel,
			ariaLabel: labels.publicTunnel,
		}),
		node("crafty", 70, 250, 220, 72, {
			kind: "admin",
			title: labels.crafty,
			ariaLabel: labels.crafty,
		}),
		node("minecraft", 440, 250, 260, 72, {
			kind: "service",
			title: labels.minecraft,
			ariaLabel: labels.minecraft,
		}),
	];
}

function createEdges(): Edge[] {
	const access = { stroke: "var(--primary)", strokeWidth: 2 };
	const internal = { stroke: "var(--muted-foreground)", strokeWidth: 1.8 };
	const administration = { ...internal, strokeDasharray: "6 4" };
	const edge = (
		id: string,
		source: string,
		target: string,
		sourceHandle: string,
		targetHandle: string,
		style: Edge["style"],
		markerEnd: Edge["markerEnd"],
	): Edge => ({
		id,
		source,
		target,
		sourceHandle,
		targetHandle,
		type: "straight",
		style,
		markerEnd,
	});

	return [
		edge("access-localhost", "access-paths", "localhost", "bottom", "top-far-left", access, arrow),
		edge("access-tailscale", "access-paths", "tailscale", "bottom", "top-left", access, arrow),
		edge("access-lan", "access-paths", "lan", "bottom", "top-right", access, arrow),
		edge("access-public", "access-paths", "public", "bottom", "top-far-right", access, arrow),
		edge("localhost-crafty", "localhost", "crafty", "bottom", "top", administration, mutedArrow),
		edge("tailscale-crafty", "tailscale", "crafty", "bottom", "top", administration, mutedArrow),
		edge("localhost-minecraft", "localhost", "minecraft", "bottom-right", "top-far-left", access, arrow),
		edge("tailscale-minecraft", "tailscale", "minecraft", "bottom-right", "top-left", access, arrow),
		edge("lan-minecraft", "lan", "minecraft", "bottom", "top-right", access, arrow),
		edge("public-minecraft", "public", "minecraft", "bottom", "top-far-right", access, arrow),
		edge("crafty-minecraft", "crafty", "minecraft", "right-source", "left-target", internal, mutedArrow),
	];
}

export function MinecraftServerArchitecture({ labels }: Props) {
	return (
		<figure className="overflow-hidden border border-border bg-background/50">
			<figcaption className="sr-only">{labels.ariaLabel}</figcaption>
			<div
				className="minecraft-flow h-[420px] w-full overflow-hidden bg-background"
				role="group"
				aria-label={labels.ariaLabel}>
				<ReactFlow
					edges={createEdges()}
					fitView
					fitViewOptions={{ padding: 0.06 }}
					nodeTypes={nodeTypes}
					nodes={createNodes(labels)}
					nodesConnectable={false}
					nodesDraggable={false}
					nodesFocusable={false}
					edgesFocusable={false}
					edgesReconnectable={false}
					elementsSelectable={false}
					disableKeyboardA11y
					minZoom={0.45}
					maxZoom={1.25}
					panOnDrag={false}
					panOnScroll={false}
					preventScrolling={false}
					zoomOnDoubleClick={false}
					zoomOnPinch={false}
					zoomOnScroll={false}
				/>
			</div>
		</figure>
	);
}
