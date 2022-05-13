import { slugify, slugFieldExtension, resetAllCounters } from "./slug";

describe("slug field extension", () => {
	beforeEach(() => {
		resetAllCounters();
	});

	describe("slugify", () => {
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
			expect(
				slugify("<span>Anti-D (Rh<sub>0</sub>) immunoglobulin</span>")
			).toBe("anti-d-rh0-immunoglobulin");
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

	describe("slugFieldExtension", () => {
		it("should have extension name", () => {
			expect(slugFieldExtension.name).toBe("slug");
		});

		it("should have string field arg with default title value", () => {
			expect(slugFieldExtension.args).toMatchInlineSnapshot(`
			Object {
			  "field": Object {
			    "defaultValue": "title",
			    "type": "String",
			  },
			}
		`);
		});

		it("should return slugified field", () => {
			expect(
				slugFieldExtension
					.extend({ field: "something" }, null)
					.resolve({ something: "A test" }, null, null, {
						path: { typename: "BnfSomething" },
					})
			).toBe("a-test");
		});

		it("should return same slug when called multiple times for the same node id, type and title", () => {
			const extension = slugFieldExtension.extend({ field: "something" }, null);
			expect(
				extension.resolve({ id: "123", something: "A test" }, null, null, {
					path: { typename: "BnfSomething" },
				})
			).toBe("a-test");
			expect(
				extension.resolve({ id: "123", something: "A test" }, null, null, {
					path: { typename: "BnfSomething" },
				})
			).toBe("a-test");
		});

		it("should return unique slug with counter when called multiple times for the same node type and title but different id", () => {
			const extension = slugFieldExtension.extend({ field: "something" }, null);
			expect(
				extension.resolve({ id: "123", something: "A test" }, null, null, {
					path: { typename: "BnfSomething" },
				})
			).toBe("a-test");
			expect(
				extension.resolve({ id: "456", something: "A test" }, null, null, {
					path: { typename: "BnfSomething" },
				})
			).toBe("a-test-2");
		});

		it("should return same slug when called multiple times with same title but different type", () => {
			const extension = slugFieldExtension.extend({ field: "something" }, null);
			expect(
				extension.resolve({ something: "A test" }, null, null, {
					path: { typename: "BnfSomething1" },
				})
			).toBe("a-test");
			expect(
				extension.resolve({ something: "A test" }, null, null, {
					path: { typename: "BnfSomething2" },
				})
			).toBe("a-test");
		});

		it("should throw if the field doesn't exist", () => {
			expect(() => {
				slugFieldExtension
					.extend({ field: "invalid" }, null)
					.resolve({ something: "A test" }, null, null, {
						path: { typename: "BnfSomething" },
					});
			}).toThrow("Field invalid has no value so can't be stringified");
		});

		it("should throw if the field isn't of type string", () => {
			expect(() => {
				slugFieldExtension
					.extend({ field: "aNumber" }, null)
					.resolve({ aNumber: 99 }, null, null, {
						path: { typename: "BnfSomething" },
					});
			}).toThrow("Field aNumber isn't a string value");
		});
	});
});
