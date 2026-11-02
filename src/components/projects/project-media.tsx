import type { LocalizedProjectMedia } from "@/content/portfolio-content";
import { url } from "@/lib/url";
import { AspectRatio, Card, CardContent, CardFooter } from "@/components/ui";

function mediaSource(source: string): string {
	return source.startsWith("http://") || source.startsWith("https://") ? source : url(source);
}

export function ProjectMediaItem({ media }: { media: LocalizedProjectMedia }) {
	const source = mediaSource(media.src);

	return (
		<Card className="gap-0 overflow-hidden py-0">
			<CardContent className="p-0">
				<AspectRatio ratio={16 / 9}>
					{media.type === "image" ? (
						<img className="size-full object-cover" src={source} alt={media.alt} loading="lazy" />
					) : (
						<video
							className="size-full object-cover"
							controls
							preload="metadata"
							poster={media.poster ? mediaSource(media.poster) : undefined}
							aria-label={media.alt}>
							<source src={source} />
						</video>
					)}
				</AspectRatio>
			</CardContent>
			{media.caption ? (
				<CardFooter className="px-4 py-3 text-sm text-muted-foreground">{media.caption}</CardFooter>
			) : null}
		</Card>
	);
}
