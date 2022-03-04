import { NodeModel } from "../../node-model";
import { BnfNode } from "../../node-types";

import { replaceInternalAnchors } from "./anchor-replacer";

describe("replaceInternalAnchors", () => {
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
		[BnfNode.Drug, "drugs", "bnf"],
		[BnfNode.Drug, "drugs", "bnfc"],
		[BnfNode.TreatmentSummary, "treatment-summaries", "bnf"],
		[BnfNode.TreatmentSummary, "treatment-summaries", "bnfc"],
		[BnfNode.AboutSection, "about", "bnf"],
		[BnfNode.AboutSection, "about", "bnfc"],
		[BnfNode.CautionaryAndAdvisoryGuidance, "about", "bnf"],
		[BnfNode.CautionaryAndAdvisoryGuidance, "about", "bnfc"],
		[BnfNode.Guidance, "medicines-guidance", "bnf"],
		[BnfNode.Guidance, "medicines-guidance", "bnfc"],
		[BnfNode.MedicalDevice, "medical-devices", "bnf"],
		[BnfNode.MedicalDevice, "medical-devices", "bnfc"],
	])(
		"should replace link to %s with base path of %s based on id",
		(nodeType, path, site) => {
			getNodeById.mockReturnValueOnce({
				title: "A thing",
				internal: { type: nodeType },
			});
			expect(
				replaceInternalAnchors(
					`a <a href="/#/content/${site}/_123" title="A thing">thing</a> link`,
					nodeModel
				)
			).toBe(`a <a href="/${path}/a-thing/" title="A thing">thing</a> link`);
		}
	);

	it("should replace multiple internal anchors", () => {
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
			replaceInternalAnchors(
				`<a href="/#/content/bnf/_123" title="A drug">drug</a><a href="/#/content/bnf/_123" title="A treatment summary">treatment summary</a>`,
				nodeModel
			)
		).toBe(
			`<a href="/drugs/a-drug/" title="A drug">drug</a><a href="/treatment-summaries/a-treatment-summary/" title="A treatment summary">treatment summary</a>`
		);
	});

	it("should ignore external anchors", () => {
		getNodeById.mockReturnValueOnce({
			title: "A drug",
			internal: { type: BnfNode.Drug },
		});
		expect(
			replaceInternalAnchors(
				[
					`<a href="https://www.nice.org.uk">external</a>`,
					`<a href="/drugs/a-drug/" title="A drug">drug</a>`,
					`<a href="https://www.nice.org.uk">external</a>`,
				].join(""),
				nodeModel
			)
		).toBe(
			`<a href="https://www.nice.org.uk">external</a><a href="/drugs/a-drug/" title="A drug">drug</a><a href="https://www.nice.org.uk">external</a>`
		);
	});

	it("should throw if node can't be found by id", () => {
		getNodeById.mockReturnValueOnce(null);
		expect(() => {
			replaceInternalAnchors(
				`a <a href="/#/content/bnf/_123" title="A drug">drug</a> link`,
				nodeModel
			);
		}).toThrow(
			`Couldn't find node with id _123 in anchor <a href="/#/content/bnf/_123" title="A drug">drug</a>`
		);
	});

	it("should throw if node type doesn't map to a path", () => {
		getNodeById.mockReturnValueOnce({
			title: "A test",
			internal: { type: "SomeInvalidType" },
		});
		expect(() => {
			replaceInternalAnchors(
				`a <a href="/#/content/bnf/_123" title="A drug">drug</a> link`,
				nodeModel
			);
		}).toThrow(
			"Node 'A test' has unsupported type 'SomeInvalidType' for mapping to a path"
		);
	});
});
