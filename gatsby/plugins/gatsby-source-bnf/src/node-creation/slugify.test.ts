import { slugify, resetCounters } from "./slugify";

describe("slugify", () => {
	beforeEach(() => {
		resetCounters();
	});

	it("should throw error if passed an falsey string", () => {
		expect(() => {
			slugify("");
		}).toThrow("Cannot slugify an empty string");
	});

	it("should lowercase", () => {
		expect(slugify("THING")).toBe("thing");
	});

	it("should convert spaces to hyphens", () => {
		expect(slugify("a thing")).toBe("a-thing");
	});

	it("should strip tags before slugging", () => {
		expect(slugify("A <i>tag</i> here")).toBe("a-tag-here");
	});

	it("should remove diacritics", () => {
		expect(slugify("Bacillus Calmette–Guérin")).toBe(
			"bacillus-calmette-guerin"
		);
	});

	it("should replace em dashes with hyphens", () => {
		expect(slugify("Nurse Prescribers' Formulary—Analgesics")).toBe(
			"nurse-prescribers-formulary-analgesics"
		);
	});

	it("should strip HTML and brackets", () => {
		expect(slugify("<span>Anti-D (Rh<sub>0</sub>) immunoglobulin</span>")).toBe(
			"anti-d-rh0-immunoglobulin"
		);
	});

	it("should retain letter number combos", () => {
		expect(slugify("C1-esterase inhibitor")).toBe("c1-esterase-inhibitor");
	});

	it("should remove apostrophes", () => {
		expect(slugify("Parkinson's disease")).toBe("parkinsons-disease");
	});

	it("should remove apostrophes", () => {
		expect(slugify("Parkinson’s disease")).toBe("parkinsons-disease");
	});

	it("should replace commas with hyphens", () => {
		expect(slugify("Pain, Chronic")).toBe("pain-chronic");
	});

	it("should replace roman numerals without hyphens", () => {
		expect(slugify("Factor VIIa (recombinant)")).toBe(
			"factor-viia-recombinant"
		);
	});

	it("should replace roman numerals without hyphens", () => {
		expect(slugify("Factor VIIa (recombinant)")).toBe(
			"factor-viia-recombinant"
		);
	});

	it("should return the same slug when called multiple times without a key", () => {
		expect(slugify("A title")).toBe("a-title");
		expect(slugify("A title")).toBe("a-title");
	});

	it("should return the same slug when called multiple times with unique keys", () => {
		expect(slugify("A title", "BnfKey1")).toBe("a-title");
		expect(slugify("A title", "BnfKey2")).toBe("a-title");
	});

	it("should return a slug with counter when called multiple times with the same key", () => {
		expect(slugify("A title", "BnfKey")).toBe("a-title");
		expect(slugify("A title", "BnfKey")).toBe("a-title-2");
	});

	it("should return multiple slugs with counter when called multiple times with different keys", () => {
		expect(slugify("A title", "BnfKey1")).toBe("a-title");
		expect(slugify("A title", "BnfKey1")).toBe("a-title-2");
		expect(slugify("A title", "BnfKey2")).toBe("a-title");
		expect(slugify("A title", "BnfKey2")).toBe("a-title-2");
	});
});
