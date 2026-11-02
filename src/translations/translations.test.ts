import { createTranslator } from "next-intl";
import { expect, test } from "vitest";
import pt from "./pt.json";

test("translates Portuguese UI strings from the JSON dictionary", () => {
	const t = createTranslator({ locale: "pt", messages: pt });
	expect(t("cv.skills")).toBe("Competências");
});
