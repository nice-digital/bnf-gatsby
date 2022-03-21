import { NodeModel } from "../../node-model";
import { BnfNode, BnfNodeType } from "../../node-types";

import {
	replaceRelativeAnchors,
	type EntityType,
} from "./relative-anchor-replacer";

describe("replaceRelativeAnchors", () => {
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

	it("should ignore external anchors", () => {
		const html = `<a href="https://www.nice.org.uk">external</a><a href="https://www.nice.org.uk">external</a>`;
		expect(replaceRelativeAnchors(html, nodeModel)).toBe(html);
	});

	describe("Error cases", () => {
		it("should throw error if entity type isn't a known value", () => {
			expect(() => {
				replaceRelativeAnchors(
					`<a href="/something/_395033263">bob</a>`,
					nodeModel
				);
			}).toThrow(
				`Unknown type of 'something' found in link <a href="/something/_395033263">bob</a>`
			);
		});

		it("should throw if section id is in URL when it's not a treatment summary or dental practitioners", () => {
			expect(() => {
				replaceRelativeAnchors(
					`a <a href="/drug/_395033263#section_12345-1" title="A drug">drug</a> link`,
					nodeModel
				);
			}).toThrow(
				`Section id of section_12345-1 found for type of 'drug' in link <a href="/drug/_395033263#section_12345-1" title="A drug">drug</a>. Only treatment summaries and dental practitioners can have a section id hash.`
			);
		});

		it("should throw if taxonomy is found for anything other than wound management", () => {
			expect(() => {
				replaceRelativeAnchors(
					`a <a href="/drug/taxonomy/_395033263" title="A drug">drug</a> link`,
					nodeModel
				);
			}).toThrow(
				`Taxonomy found for type of 'drug' in link <a href="/drug/taxonomy/_395033263" title="A drug">drug</a>. Only wound management links can have a taxonomy path.`
			);
		});

		it("should throw if node can't be found by id", () => {
			getNodeById.mockReturnValueOnce(null);
			expect(() => {
				replaceRelativeAnchors(
					`a <a href="/drug/_395033263" title="A drug">drug</a> link`,
					nodeModel
				);
			}).toThrow(
				`Couldn't find BnfDrug node with id _395033263 in link <a href="/drug/_395033263" title="A drug">drug</a>`
			);
		});

		it("should throw if section can't be found by id", () => {
			getNodeById.mockReturnValueOnce({
				title: "A test",
				sections: [
					{
						id: "anything that isn't sectionPHP1234-1",
					},
				],
				internal: { type: BnfNode.TreatmentSummary },
			});
			expect(() => {
				replaceRelativeAnchors(
					`a <a href="/treatmentSummaries/_395033263#sectionPHP1234-1">text</a> link`,
					nodeModel
				);
			}).toThrow(
				`Couldn't find section with id sectionPHP1234-1 on node A test in link <a href="/treatmentSummaries/_395033263#sectionPHP1234-1">text</a>`
			);
		});

		it("should throw if node type doesn't map to a path", () => {
			getNodeById.mockReturnValueOnce({
				title: "A test",
				internal: { type: "SomeInvalidType" },
			});
			expect(() => {
				replaceRelativeAnchors(
					`a <a href="/drug/_395033263" title="A drug">drug</a> link`,
					nodeModel
				);
			}).toThrow(
				`Node 'A test' has unsupported type 'SomeInvalidType' for mapping to a path in link <a href="/drug/_395033263" title="A drug">drug</a>`
			);
		});
	});

	describe("Dental Practioners' Formulary", () => {
		it("should replace link to dental practitioners formulary without section hash", () => {
			getNodeById.mockReturnValueOnce({
				title: "Dental Practitioners’ Formulary",
				internal: { type: BnfNode.DentalPractitionersFormulary },
			});

			expect(
				replaceRelativeAnchors(
					`a <a href="/dentalPractitionersFormulary/_258049705" title="DPF">DPF</a> link`,
					nodeModel
				)
			).toBe(
				`a <a href="/dental-practitioners-formulary/" title="DPF">DPF</a> link`
			);
		});

		it("should replace link to dental practitioners formulary with section hash", () => {
			getNodeById.mockReturnValueOnce({
				title: "Dental Practitioners’ Formulary",
				sections: [
					{
						title: "Details of DPF preparations",
						id: "sectionPHP101868-1",
					},
				],
				internal: { type: BnfNode.DentalPractitionersFormulary },
			});
			getNodeById.mockReturnValueOnce({
				title: "Details of DPF preparations",
				internal: { type: BnfNode.RecordSection },
			});
			expect(
				replaceRelativeAnchors(
					`a <a href="/dentalPractitionersFormulary/_123#sectionPHP101868-1" title="A thing">thing</a> link`,
					nodeModel
				)
			).toBe(
				`a <a href="/dental-practitioners-formulary/#details-of-dpf-preparations" title="A thing">thing</a> link`
			);
		});
	});

	it.each<[BnfNodeType, EntityType, string]>([
		[BnfNode.AboutSection, "about", "about"],
		[
			BnfNode.CautionaryAndAdvisoryGuidance,
			"cautionaryAndAdvisoryLabels",
			"about",
		],
		[BnfNode.Drug, "drug", "drugs"],
		[BnfNode.TreatmentSummary, "treatmentSummaries", "treatment-summaries"],
		[BnfNode.Guidance, "guidance", "medicines-guidance"],
		[BnfNode.MedicalDevice, "medicalDevice", "medical-devices"],
	])(
		"should replace link to node type %s from path %s to %s",
		(nodeType, entityType, expectedBasePath) => {
			getNodeById.mockReturnValueOnce({
				title: "A thing",
				internal: { type: nodeType },
			});
			expect(
				replaceRelativeAnchors(
					`a <a href="/${entityType}/_123" title="A thing">thing</a> link`,
					nodeModel
				)
			).toBe(
				`a <a href="/${expectedBasePath}/a-thing/" title="A thing">thing</a> link`
			);
		}
	);

	it("should replace link to treatment summary with section hash", () => {
		getNodeById.mockReturnValueOnce({
			title: "Intravenous nutrition",
			sections: [
				{
					title: "Proprietary Infusion Fluids for Parenteral Feeding",
					id: "section_266958834-1",
				},
			],
			internal: { type: BnfNode.TreatmentSummary },
		});
		expect(
			replaceRelativeAnchors(
				`<a title="Proprietary Infusion Fluids for Parenteral Feeding" href="/treatmentSummaries/_266958834#section_266958834-1">Proprietary Infusion Fluids for Parenteral Feeding</a>`,
				nodeModel
			)
		).toBe(
			`<a title="Proprietary Infusion Fluids for Parenteral Feeding" href="/treatment-summaries/intravenous-nutrition/#proprietary-infusion-fluids-for-parenteral-feeding">Proprietary Infusion Fluids for Parenteral Feeding</a>`
		);
	});
});
