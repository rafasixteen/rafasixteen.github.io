import { expect, test } from "vitest";
import { url } from "./url";

function withBasePath(basePath: string | undefined, callback: () => void): void {
	const previousBasePath = process.env.NEXT_PUBLIC_BASE_PATH;

	if (basePath === undefined) {
		delete process.env.NEXT_PUBLIC_BASE_PATH;
	} else {
		process.env.NEXT_PUBLIC_BASE_PATH = basePath;
	}

	try {
		callback();
	} finally {
		if (previousBasePath === undefined) {
			delete process.env.NEXT_PUBLIC_BASE_PATH;
		} else {
			process.env.NEXT_PUBLIC_BASE_PATH = previousBasePath;
		}
	}
}

test("joins a project base path and asset path with one slash", () => {
	withBasePath("/portfolio", () => {
		expect(url("/cv/cv-pt.pdf")).toBe("/portfolio/cv/cv-pt.pdf");
		expect(url("cv/cv-pt.pdf")).toBe("/portfolio/cv/cv-pt.pdf");
	});
});

test("normalizes a trailing slash on the project base path", () => {
	withBasePath("/portfolio/", () => {
		expect(url("/cv/cv-pt.pdf")).toBe("/portfolio/cv/cv-pt.pdf");
		expect(url("cv/cv-pt.pdf")).toBe("/portfolio/cv/cv-pt.pdf");
	});
});

test("adds a missing leading slash to the project base path", () => {
	withBasePath("portfolio", () => {
		expect(url("cv/cv-pt.pdf")).toBe("/portfolio/cv/cv-pt.pdf");
	});
});

test("creates a root-relative URL without a project base path", () => {
	withBasePath(undefined, () => {
		expect(url("cv/")).toBe("/cv/");
		expect(url("/cv/")).toBe("/cv/");
	});
});
