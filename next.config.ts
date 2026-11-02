import createNextIntlPlugin from "next-intl/plugin";
import type { NextConfig } from "next";

const withNextIntl = createNextIntlPlugin();

const [owner, repository] = (process.env.GITHUB_REPOSITORY ?? "/").split("/");
const isUserSite = Boolean(owner && repository && repository === `${owner}.github.io`);
const basePath = process.env.GITHUB_ACTIONS === "true" && repository && !isUserSite ? `/${repository}` : "";

const nextConfig: NextConfig = {
	output: "export",
	trailingSlash: true,
	images: { unoptimized: true },
	basePath,
	assetPrefix: basePath || undefined,
	env: { NEXT_PUBLIC_BASE_PATH: basePath },
};

export default withNextIntl(nextConfig);
