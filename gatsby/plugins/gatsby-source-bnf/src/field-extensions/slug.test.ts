import { slugFieldExtension } from "./slug";

describe("slug field extension", () => {
	describe("slugFieldExtension", () => {
		it("should have extension name", () => {
			expect(slugFieldExtension.name).toBe("slug");
		});

		it("should have string field arg with default title value", () => {
			expect(slugFieldExtension.args).toMatchInlineSnapshot(`
			{
			  "field": {
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
