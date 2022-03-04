import { NodeModel } from "../../node-model";
import { BnfNode } from "../../node-types";

import { replaceXRefs } from "./xref-replacer";

describe("replaceXRefs", () => {
	const getNodeById = jest.fn();

	const nodeModel: NodeModel = {
		getNodeById,
		findOne: jest.fn(),
		getAllNodes: jest.fn(),
		getNodesByIds: jest.fn(),
		runQuery: jest.fn(),
	};

	afterEach(() => {
		getNodeById.mockReset();
	});

	it.each([
		[BnfNode.Drug, "drugs"],
		[BnfNode.TreatmentSummary, "treatment-summaries"],
		[BnfNode.AboutSection, "about"],
		[BnfNode.CautionaryAndAdvisoryGuidance, "about"],
		[BnfNode.Guidance, "medicines-guidance"],
	])(
		"should replace link to %s with base path of %s based on id",
		(nodeType, path) => {
			getNodeById.mockReturnValueOnce({
				title: "A thing",
				internal: { type: nodeType },
			});
			expect(
				replaceXRefs(
					`a <xref type="bookmark" idref="123">thing</xref> link`,
					nodeModel
				)
			).toBe(
				`a <a data-type="bookmark" data-idref="123" href="/${path}/a-thing/">thing</a> link`
			);
		}
	);

	it("should replace multiple xrefs", () => {
		getNodeById
			.mockReturnValueOnce({
				title: "A drug",
				internal: { type: BnfNode.Drug },
			})
			.mockReturnValueOnce({
				title: "A treatment summary",
				internal: { type: BnfNode.TreatmentSummary },
			});
		expect(
			replaceXRefs(
				`<xref type="drug" idref="123">drug</xref><xref type="bookmark" idref="789">treatment summary</xref>`,
				nodeModel
			)
		).toBe(
			`<a data-type="drug" data-idref="123" href="/drugs/a-drug/">drug</a><a data-type="bookmark" data-idref="789" href="/treatment-summaries/a-treatment-summary/">treatment summary</a>`
		);
	});

	it("should lookup node from xref sid as fallback for id", () => {
		getNodeById.mockReturnValueOnce(null).mockReturnValueOnce({
			title: "A drug",
			internal: { type: BnfNode.Drug },
		});

		const result = replaceXRefs(
			`<xref type="drug" idref="NOTFOUND" sid="123">drug</xref>`,
			nodeModel
		);

		expect(getNodeById).toHaveBeenCalledTimes(2);
		expect(getNodeById.mock.calls).toEqual([
			[{ id: "NOTFOUND" }],
			[{ id: "123" }],
		]);

		expect(result).toBe(
			`<a data-type="drug" data-idref="NOTFOUND" data-sid="123" href="/drugs/a-drug/">drug</a>`
		);
	});

	it("should throw if node can't be found by id", () => {
		getNodeById.mockReturnValueOnce(null);
		expect(() => {
			replaceXRefs(
				`a <xref type="bookmark" idref="123" sid="789">drug</xref> link`,
				nodeModel
			);
		}).toThrow(
			`Couldn't find node with id '123' or sid '789' in xref <xref type="bookmark" idref="123" sid="789">drug</xref>`
		);
	});

	it("should throw if node type doesn't map to a path", () => {
		getNodeById.mockReturnValueOnce({
			title: "A test",
			internal: { type: "SomeInvalidType" },
		});
		expect(() => {
			replaceXRefs(
				`a <xref type="bookmark" idref="123">drug</xref> link`,
				nodeModel
			);
		}).toThrow(
			"Node 'A test' has unsupported type 'SomeInvalidType' for mapping to a path"
		);
	});
});
