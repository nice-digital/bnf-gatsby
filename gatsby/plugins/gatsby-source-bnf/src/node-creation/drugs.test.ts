import { type SourceNodesArgs } from "gatsby";

import { type FeedDrug } from "../downloader/types";

import { createDrugNodes, type DrugNodeInput } from "./drugs";

const drugs: FeedDrug[] = [
	{
		title: "Drug 1",
		id: "PHP123",
		sid: "_234",
		interactants: [],
		medicinalForms: {
			initialStatement: "No forms listed",
		},
	},
	{
		title: "Drug 2",
		id: "PHP987",
		sid: "_876",
		interactants: [
			{
				sid: "_987",
				title: "An interactant",
			},
		],
		constituentDrugs: {
			message:
				"The properties listed below are those particular to the combination only. For the properties of the components please consider",
			constituents: [
				{
					id: "PHP123",
					sid: "_234",
					title: "Drug 1",
				},

				{
					id: "PHP999",
					sid: "_999",
					title: "Drug 3",
				},
			],
		},
		medicinalForms: {
			initialStatement: "No forms listed",
		},
	},
];

describe("createDrugNodes", () => {
	const createNode = jest.fn();

	const sourceNodesArgs: SourceNodesArgs = {
		createContentDigest: jest.fn(),
		actions: {
			createNode,
		},
	} as unknown as SourceNodesArgs;

	it("should create node for every drug", () => {
		createDrugNodes({ drugs, treatmentSummaries: [] }, sourceNodesArgs);

		expect(createNode).toHaveBeenCalledTimes(2);
	});

	it("should use drug id as phpid and sid as node id", () => {
		createDrugNodes({ drugs, treatmentSummaries: [] }, sourceNodesArgs);

		const nodeInput = createNode.mock.calls[0][0] as DrugNodeInput;

		expect(nodeInput.id).toBe("_234");
		expect(nodeInput.phpid).toBe("PHP123");
	});

	it("should map constituents to sid and exclude constituents that aren't drug monographs", () => {
		createDrugNodes({ drugs, treatmentSummaries: [] }, sourceNodesArgs);

		const nodeInput = createNode.mock.calls[1][0] as DrugNodeInput;

		expect(nodeInput.constituentDrugs).toStrictEqual({
			constituents: ["_234"],
			message:
				"The properties listed below are those particular to the combination only. For the properties of the components please consider",
		});
	});

	it("should map interactants to sid", () => {
		createDrugNodes({ drugs, treatmentSummaries: [] }, sourceNodesArgs);

		const nodeInput = createNode.mock.calls[1][0] as DrugNodeInput;

		expect(nodeInput.interactants).toStrictEqual(["_987"]);
	});

	it("should link treatment summaries that contain a link to the drug", () => {
		createDrugNodes(
			{
				drugs,
				treatmentSummaries: [
					{
						id: "_268814941",
						title: "Acne",
						sections: [
							{
								id: "section_268814941-0",
								title: "Description of condition",
								content: `<p><a href="/drug/_234" title="Drug 1">Drug 1</a></p>`,
							},
						],
					},
					{
						id: "_472014333",
						title: "Acute coronary syndromes",
						sections: [
							{
								id: "section_472014333-0",
								title: "Acute coronary syndromes",
								content: "<p>No links in here</p>",
							},
						],
					},
					{
						id: "_158857908",
						title: "Acute porphyrias",
						sections: [
							{
								id: "section_158857908-0",
								title: "Anything",
								content: `<p>No links in here</p>`,
							},
							{
								id: "section_158857908-1",
								title: "Overview",
								content: `<p>Something something <a href="/drug/_234" title="Drug 1">Drug 1</a> something</p>`,
							},
						],
					},
				],
			},
			sourceNodesArgs
		);

		const { relatedTreatmentSummaries } = createNode.mock
			.calls[0][0] as DrugNodeInput;

		expect(relatedTreatmentSummaries).toStrictEqual([
			"_268814941",
			"_158857908",
		]);
	});
});
