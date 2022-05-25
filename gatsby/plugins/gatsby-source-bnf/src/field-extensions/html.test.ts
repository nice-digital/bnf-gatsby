import { NodeModel } from "../node-model";
import { BnfNode } from "../node-types";

import { htmlFieldExtension } from "./html";

describe("HTML field extension", () => {
	describe("htmlFieldExtension", () => {
		it("should have extension name", () => {
			expect(htmlFieldExtension.name).toBe("html");
		});

		it("should have no args", () => {
			expect(htmlFieldExtension).not.toHaveProperty("args");
		});

		it("should throw if field is not a string value", () => {
			const mockResolveContext = {
				defaultFieldResolver: () => 999,
				nodeModel: null as unknown as NodeModel,
			};
			expect(() => {
				htmlFieldExtension
					.extend({ field: "something" }, null)
					.resolve({}, null, mockResolveContext, null);
			}).toThrow("Expected HTML content field value to be a string");
		});

		it("should return value as-is for falsey value", () => {
			const mockResolveContext = {
				defaultFieldResolver: () => undefined,
				nodeModel: null as unknown as NodeModel,
			};
			expect(
				htmlFieldExtension
					.extend({ field: "something" }, null)
					.resolve({}, null, mockResolveContext, null)
			).toBeUndefined();
		});

		it("should replace internal anchors and xrefs in string", () => {
			const mockResolveContext = {
				defaultFieldResolver: () =>
					`a <a href="/treatmentSummaries/_123" title="A treatment summary">treatment summary</a><xref type="drug" idref="123">drug</xref> link`,
				nodeModel: {
					getNodeById: jest
						.fn()
						.mockReturnValueOnce({
							title: "A treatment summary",
							internal: { type: BnfNode.TreatmentSummary },
						})
						.mockReturnValueOnce({
							title: "A drug",
							internal: { type: BnfNode.Drug },
						}),
				} as unknown as NodeModel,
			};

			expect(
				htmlFieldExtension
					.extend({ field: "something" }, null)
					.resolve({}, null, mockResolveContext, null)
			).toBe(
				`a <a href="/treatment-summaries/a-treatment-summary/" title="A treatment summary">treatment summary</a><a data-type="drug" data-idref="123" href="/drugs/a-drug/">drug</a> link`
			);
		});

		it("should replace internal anchors in array of strings", () => {
			const mockResolveContext = {
				defaultFieldResolver: () => [
					`<a href="/treatmentSummaries/_123" title="A treatment summary">treatment summary</a>`,
					`<a href="/drug/_987">drug</a>`,
				],
				nodeModel: {
					getNodeById: jest
						.fn()
						.mockReturnValueOnce({
							title: "A treatment summary",
							internal: { type: BnfNode.TreatmentSummary },
						})
						.mockReturnValueOnce({
							title: "A drug",
							slug: "the-drugs-slug",
							internal: { type: BnfNode.Drug },
						}),
				} as unknown as NodeModel,
			};

			expect(
				htmlFieldExtension
					.extend({ field: "something" }, null)
					.resolve({}, null, mockResolveContext, null)
			).toStrictEqual([
				`<a href="/treatment-summaries/a-treatment-summary/" title="A treatment summary">treatment summary</a>`,
				`<a href="/drugs/the-drugs-slug/">drug</a>`,
			]);
		});
	});
});
