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

		it("should throw if xref type is not a known value", () => {
			const mockResolveContext = {
				defaultFieldResolver: () =>
					`a <xref type="INVALID" idref="123">drug</xref> link`,
				nodeModel: null as unknown as NodeModel,
			};
			expect(() => {
				htmlFieldExtension
					.extend({ field: "something" }, null)
					.resolve({}, null, mockResolveContext, null);
			}).toThrow(
				"Unexpected xref type of INVALID found. Expected one of drug,bookmark"
			);
		});

		// Test commented out until we throw an error instead of logging on the console
		// it("should throw if node is not found", () => {
		// 	const mockResolveContext = {
		// 		defaultFieldResolver: () =>
		// 			`a <xref type="drug" idref="123">drug</xref> link`,
		// 		nodeModel: {
		// 			getNodeById: () => null,
		// 		} as unknown as NodeModel,
		// 	};
		// 	expect(() => {
		// 		htmlFieldExtension
		// 			.extend({ field: "something" }, null)
		// 			.resolve({}, null, mockResolveContext, null);
		// 	}).toThrow("Couldn't find node with id 123");
		// });

		it("should replace link to drug based on idref", () => {
			const mockResolveContext = {
				defaultFieldResolver: () =>
					`a <xref type="drug" idref="123">drug</xref> link`,
				nodeModel: {
					getNodeById: () => ({
						title: "A test",
						internal: { type: BnfNode.Drug },
					}),
				} as unknown as NodeModel,
			};

			expect(
				htmlFieldExtension
					.extend({ field: "something" }, null)
					.resolve({}, null, mockResolveContext, null)
			).toBe(
				`a <a data-type="drug" data-idref="123" href="/drugs/a-test/">drug</a> link`
			);
		});

		it("should lookup node from xref sid as fallback for id", () => {
			const getNodeById = jest
				.fn()
				.mockImplementationOnce(() => null)
				.mockImplementationOnce(() => ({
					title: "Test <b>thing</b>",
					internal: { type: BnfNode.TreatmentSummary },
				}));
			const mockResolveContext = {
				defaultFieldResolver: () =>
					`a <xref type="bookmark" sid="123" idref="NOTFOUND">acne</xref> link`,
				nodeModel: {
					getNodeById,
				} as unknown as NodeModel,
			};

			const htmlResult = htmlFieldExtension
				.extend({ field: "something" }, null)
				.resolve({}, null, mockResolveContext, null);

			expect(getNodeById).toHaveBeenCalledTimes(2);
			expect(getNodeById.mock.calls).toEqual([
				[{ id: "NOTFOUND" }],
				[{ id: "123" }],
			]);

			expect(htmlResult).toBe(
				`a <a data-type="bookmark" data-sid="123" data-idref="NOTFOUND" href="/treatment-summaries/test-thing/">acne</a> link`
			);
		});

		it("should throw if node doesn't map to a path", () => {
			const mockResolveContext = {
				defaultFieldResolver: () =>
					`a <xref type="bookmark" idref="123">drug</xref> link`,
				nodeModel: {
					getNodeById: () => ({
						title: "A test",
						internal: { type: "SomeInvalidType" },
					}),
				} as unknown as NodeModel,
			};
			expect(() => {
				htmlFieldExtension
					.extend({ field: "something" }, null)
					.resolve({}, null, mockResolveContext, null);
			}).toThrow("Unsupported node type SomeInvalidType for mapping to a path");
		});
	});
});
