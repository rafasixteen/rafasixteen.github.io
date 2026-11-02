"use client";

import type { LocalizedProjectMedia } from "@/content/portfolio-content";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui";
import { ProjectMediaItem } from "./project-media";

interface ProjectCarouselProps {
	items: readonly LocalizedProjectMedia[];
	label: string;
}

export function ProjectCarousel({ items, label }: ProjectCarouselProps) {
	if (items.length === 0) {
		return null;
	}

	return (
		<Carousel aria-label={label} opts={{ align: "start", loop: items.length > 1 }} className="mx-12">
			<CarouselContent>
				{items.map((item) => (
					<CarouselItem key={item.src}>
						<ProjectMediaItem media={item} />
					</CarouselItem>
				))}
			</CarouselContent>
			{items.length > 1 ? (
				<>
					<CarouselPrevious />
					<CarouselNext />
				</>
			) : null}
		</Carousel>
	);
}
