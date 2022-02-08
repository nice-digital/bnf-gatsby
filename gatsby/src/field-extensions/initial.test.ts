import { initialFieldExtension } from "./initial";

describe("initial field extension", () => {
	describe("initialFieldExtension", () => {
		it("should have extension name", () => {
			expect(initialFieldExtension.name).toBe("initial");
		});

		it("should have string field arg with default title value", () => {
			expect(initialFieldExtension.args).toMatchInlineSnapshot(`
			Object {
			  "field": Object {
			    "defaultValue": "title",
			    "type": "String",
			  },
			}
		`);
		});

		it("should return lowercase initial from title field", () => {
			expect(
				initialFieldExtension
					.extend({ field: "something" }, null)
					.resolve({ something: "Mmmmm" }, null, null, null)
			).toBe("m");
		});

		it("should throw if the field doesn't exist", () => {
			expect(() => {
				initialFieldExtension
					.extend({ field: "invalid" }, null)
					.resolve({ something: "A test" }, null, null, null);
			}).toThrow("Field invalid has no value so doesn't have an initial");
		});

		it("should throw if the field is an empty string", () => {
			expect(() => {
				initialFieldExtension
					.extend({ field: "anEmptyString" }, null)
					.resolve({ anEmptyString: "" }, null, null, null);
			}).toThrow("Field anEmptyString has no value so doesn't have an initial");
		});

		it("should throw if the field isn't of type string", () => {
			expect(() => {
				initialFieldExtension
					.extend({ field: "aNumber" }, null)
					.resolve({ aNumber: 99 }, null, null, null);
			}).toThrow("Field aNumber isn't a string value");
		});
	});
});
