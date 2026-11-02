import type { ProjectMedia } from "@/content/project";
import { url } from "@/lib/url";

interface ProjectPosterProps {
	media: ProjectMedia;
}

function mediaSource(source: string): string {
	return source.startsWith("http://") || source.startsWith("https://") ? source : url(source);
}

export function ProjectPoster({ media }: ProjectPosterProps) {
	const source = mediaSource(media.src);

	if (media.type === "video") {
		return (
		<video
			className="size-full object-cover"
			muted
			loop
			playsInline
			autoPlay
			preload="metadata"
			poster={media.poster ? mediaSource(media.poster) : undefined}
			aria-label={media.alt}>
			<source src={source} />
		</video>
		);
	}

	return <img className="size-full object-cover" src={source} alt={media.alt} loading="lazy" />;
}
