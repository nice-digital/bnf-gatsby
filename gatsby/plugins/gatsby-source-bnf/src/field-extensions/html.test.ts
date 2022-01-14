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

		it("should replace link to drug", () => {
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
			).toBe(`a <a href="/drugs/a-test/">drug</a> link`);
		});
	});
});
