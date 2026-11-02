/**
 * Resolves a root-relative URL for a public asset.
 *
 * Plain anchors do not receive Next.js's `basePath` automatically. This keeps
 * static assets, such as downloadable CV PDFs, reachable when the portfolio
 * is deployed to a GitHub Pages project site. Both values are normalized, so
 * callers can omit their leading slash without creating a relative URL.
 */
export function url(path: string): string {
	const basePath = (process.env.NEXT_PUBLIC_BASE_PATH ?? "").replace(/^\/+|\/+$/g, "");
	const normalizedPath = path.replace(/^\/+/, "");

	return `/${[basePath, normalizedPath].filter(Boolean).join("/")}`;
}
