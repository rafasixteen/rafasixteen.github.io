interface ProjectHighlightsProps {
	items: readonly string[];
}

export function ProjectHighlights({ items }: ProjectHighlightsProps) {
	return (
		<ol className="grid gap-5 sm:grid-cols-3">
			{items.map((item, index) => (
				<li key={item} className="border-t border-border pt-4 text-sm leading-relaxed text-muted-foreground">
					<span className="mb-3 block text-xs font-semibold tracking-[0.16em] text-primary">{String(index + 1).padStart(2, "0")}</span>
					{item}
				</li>
			))}
		</ol>
	);
}
