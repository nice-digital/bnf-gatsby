import { slugify, slugFieldExtension } from "./slug";

describe("slug field extension", () => {
	describe("slugify", () => {
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
					.resolve({ something: "A test" }, null, null, null)
			).toBe("a-test");
		});

		it("should throw if the field doesn't exist", () => {
			expect(() => {
				slugFieldExtension
					.extend({ field: "invalid" }, null)
					.resolve({ something: "A test" }, null, null, null);
			}).toThrow("Field invalid has no value so can't be stringified");
		});

		it("should throw if the field isn't of type string", () => {
			expect(() => {
				slugFieldExtension
					.extend({ field: "aNumber" }, null)
					.resolve({ aNumber: 99 }, null, null, null);
			}).toThrow("Field aNumber isn't a string value");
		});
	});
});
