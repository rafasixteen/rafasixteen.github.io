import { describe, expect, it } from "vitest";
import { parsePrimaryColor } from "./theme";

describe("parsePrimaryColor", () => {
	it("converts an HSL primary token to a PDF-compatible hex color", () => {
		expect(parsePrimaryColor(":root { --primary: hsl(200 90% 60%); }")).toBe("#3db8f5");
	});
});
