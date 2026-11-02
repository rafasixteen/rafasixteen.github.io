import { expect, test } from "vitest";
import { assertMatchingShape, assertTranslationKeys } from "./validation";

test("reports the nested path when localized content has a missing key", () => {
	expect(() => assertMatchingShape({ profile: { summary: "English" } }, { profile: {} })).toThrow(/profile\.summary/);
});

test("reports a missing translation key referenced by shared data", () => {
	expect(() => assertTranslationKeys("en", "experience", [{ translationKey: "northstar" }], {})).toThrow(
		/experience\.northstar/,
	);
});

test("reports an unused translation entry", () => {
	expect(() => assertTranslationKeys("en", "experience", [], { northstar: {} })).toThrow(/experience\.northstar/);
});
