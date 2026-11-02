import type { ProjectMedia } from "@/content/project";
import { ProjectMediaItem } from "./project-media";

interface ProjectGalleryProps {
	items: readonly ProjectMedia[];
}

export function ProjectGallery({ items }: ProjectGalleryProps) {
	if (items.length === 0) {
		return null;
	}

	return (
		<div className="grid gap-5 md:grid-cols-2">
			{items.map((media) => (
				<ProjectMediaItem key={media.src} media={media} />
			))}
		</div>
	);
}
