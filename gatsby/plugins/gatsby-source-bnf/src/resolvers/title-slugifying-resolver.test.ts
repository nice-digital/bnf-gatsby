import {
	titleSlugifyingResolver,
	withSlugFieldFromTitle,
} from "./title-slugifying-resolver";

describe("title-slugifying-resolver", () => {
	describe("titleSlugifyingResolver", () => {
		it("should throw error with missing title property", async () => {
			const slugPromise = titleSlugifyingResolver(
				{} as { title: string },
				{},
				{}
			);
			expect(slugPromise).rejects.toThrow(
				"Expected node to have a title property"
			);
		});

		it("should strip tags and slugify given node's title", async () => {
			const slug = await titleSlugifyingResolver(
				{ title: "A <i>test</i> Title: For slugging!" },
				{},
				{}
			);
			expect(slug).toBe("a-test-title-for-slugging");
		});
	});

	describe("withSlugFieldFromTitle", () => {
		it("should have slug property with required string type", () => {
			expect(withSlugFieldFromTitle.slug.type).toBe(`String!`);
		});

		it("should have resolve property with title resolver", () => {
			expect(withSlugFieldFromTitle.slug.resolve).toBe(titleSlugifyingResolver);
		});
	});
});
