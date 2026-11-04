import { expect, test } from "vitest";
import { getFirstAndLastName, getInitials } from "./profile";

test("returns a profile's first and last name", () => {
	expect(getFirstAndLastName("Rafael Da Silva Rego")).toBe("Rafael Rego");
	expect(getFirstAndLastName("  Ada   Lovelace  ")).toBe("Ada Lovelace");
	expect(getFirstAndLastName("Madonna")).toBe("Madonna");
});

test("returns initials from a profile's first and last name", () => {
	expect(getInitials("Rafael Da Silva Rego")).toBe("RR");
	expect(getInitials("  Ada   Lovelace  ")).toBe("AL");
	expect(getInitials("Madonna")).toBe("M");
});
