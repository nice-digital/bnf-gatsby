import { NodeModel } from "../../node-model";
import { BnfNode, BnfNodeType } from "../../node-types";

import { replaceRelativeAnchors } from "./anchor-replacer";

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
					`<a href="/dentalPractitionersFormulary/_258049705" title="DPF">DPF</a>`,
					nodeModel
				)
			).toBe(`<a href="/dental-practitioners-formulary/" title="DPF">DPF</a>`);
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
			expect(
				replaceRelativeAnchors(
					`<a href="/dentalPractitionersFormulary/_123#sectionPHP101868-1" title="A thing">thing</a>`,
					nodeModel
				)
			).toBe(
				`<a href="/dental-practitioners-formulary/#details-of-dpf-preparations" title="A thing">thing</a>`
			);
		});
	});

	describe("Nurse Prescribers' Formulary", () => {
		it("should replace link to nurse prescribers approved list without section hash", () => {
			getNodeById.mockReturnValueOnce({
				title: "Nurse Prescribers' Formulary",
				internal: { type: BnfNode.NursePrescribersFormularyIntroduction },
			});

			expect(
				replaceRelativeAnchors(
					`<a href="/nursePrescribersFormulary/_129024858" title="NPF">NPF</a>`,
					nodeModel
				)
			).toBe(
				`<a href="/nurse-prescribers-formulary/approved-list-for-prescribing-by-community-practitioner-nurse-prescribers-npf/" title="NPF">NPF</a>`
			);
		});

		it("should replace link to nurse practitioners formulary approved list with section hash", () => {
			getNodeById.mockReturnValueOnce({
				title: "Nurse Prescribers' Formulary",
				sections: [
					{
						title: "Medicinal Preparations",
						id: "sectionPHP101869-1",
					},
				],
				internal: { type: BnfNode.NursePrescribersFormularyIntroduction },
			});
			expect(
				replaceRelativeAnchors(
					`<a href="/nursePrescribersFormulary/_129024858#sectionPHP101869-1" title="NPF Medicinal Preparations">NPF Medicinal Preparations</a>`,
					nodeModel
				)
			).toBe(
				`<a href="/nurse-prescribers-formulary/approved-list-for-prescribing-by-community-practitioner-nurse-prescribers-npf/#medicinal-preparations" title="NPF Medicinal Preparations">NPF Medicinal Preparations</a>`
			);
		});
	});

	describe("Wound management", () => {
		it("should replace link to wound management index without section hash", () => {
			getNodeById.mockReturnValueOnce({
				title: "Wound management products and elasticated garments",
				internal: { type: BnfNode.WoundManagementIntroduction },
			});

			expect(
				replaceRelativeAnchors(
					`<a title="Wound management products and elasticated garments" href="/woundManagement/_320704649">Wound management products and elasticated garments</a>`,
					nodeModel
				)
			).toBe(
				`<a title="Wound management products and elasticated garments" href="/wound-management/">Wound management products and elasticated garments</a>`
			);
		});

		it("should replace link to wound management index with section hash", () => {
			getNodeById.mockReturnValueOnce({
				title: "Wound management products and elasticated garments",
				sections: [
					{
						title: "Introduction",
						id: "section_320704649-0",
					},
				],
				internal: { type: BnfNode.WoundManagementIntroduction },
			});
			expect(
				replaceRelativeAnchors(
					`<a title="Wound management products and elasticated garments" href="/woundManagement/_320704649#section_320704649-0">Wound management products and elasticated garments</a>`,
					nodeModel
				)
			).toBe(
				`<a title="Wound management products and elasticated garments" href="/wound-management/#introduction">Wound management products and elasticated garments</a>`
			);
		});

		it("should replace link to wound management taxonomy", () => {
			getNodeById
				.mockReturnValueOnce({
					title: "Low adherence dressing",
					internal: { type: BnfNode.WoundManagementTaxonomy },
				})
				.mockReturnValueOnce({
					title: "Basic wound contact dressings",
					internal: { type: BnfNode.WoundManagementTaxonomy },
				});

			expect(
				replaceRelativeAnchors(
					`<a href="/woundManagement/taxonomy/_870221431">Low adherence dressing</a>`,
					nodeModel
				)
			).toBe(
				`<a href="/wound-management/basic-wound-contact-dressings/#low-adherence-dressing">Low adherence dressing</a>`
			);
		});
	});

	it.each<[BnfNodeType, string, string]>([
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
