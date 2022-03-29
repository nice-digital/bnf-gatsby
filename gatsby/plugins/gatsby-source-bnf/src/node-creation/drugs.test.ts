import { type SourceNodesArgs } from "gatsby";

import { type FeedDrug } from "../downloader/types";

import { createDrugNodes, type DrugNodeInput } from "./drugs";

const drugs: FeedDrug[] = [
	{
		title: "Drug 1",
		id: "PHP123",
		sid: "_234",
		medicinalForms: {
			initialStatement: "No forms listed",
		},
	},
	{
		title: "Drug 2",
		id: "PHP987",
		sid: "_876",
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
		createDrugNodes(drugs, sourceNodesArgs);

		expect(createNode).toHaveBeenCalledTimes(2);
	});

	it("should use drug id as phpid and sid as node id", () => {
		createDrugNodes(drugs, sourceNodesArgs);

		const nodeInput = createNode.mock.calls[0][0] as DrugNodeInput;

		expect(nodeInput.id).toBe("_234");
		expect(nodeInput.phpid).toBe("PHP123");
	});

	it("should map constituents to sid and exclude constituents that aren't drug monographs", () => {
		createDrugNodes(drugs, sourceNodesArgs);

		const nodeInput = createNode.mock.calls[1][0] as DrugNodeInput;

		expect(nodeInput.constituentDrugs).toStrictEqual({
			constituents: ["_234"],
			message:
				"The properties listed below are those particular to the combination only. For the properties of the components please consider",
		});
	});
});
