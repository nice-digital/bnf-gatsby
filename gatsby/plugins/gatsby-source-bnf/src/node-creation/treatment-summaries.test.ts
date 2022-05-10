import { type SourceNodesArgs } from "gatsby";

import { type FeedSimpleRecord } from "../downloader/types";
import { BnfNode } from "../node-types";

import {
	createTreatmentSummaryNodes,
	type TreatmentSummaryNodeInput,
} from "./treatment-summaries";
import { type TypedNodeInput } from "./utils";

const treatmentSummaries: FeedSimpleRecord[] = [
	{
		id: "_1",
		title: "Treatment summary 1",
		sections: [
			{
				id: "section_1-1",
				title: "Treatment summary 1 section 1",
				content: `<p>Treatment summary 1 section 1 content with a link to <a href="/drug/_99">drug 99</a>, <a href="/drug/_88">drug 88</a>, <a href="/drug/_99">drug 99 again</a></p>`,
			},
			{
				id: "section_1-2",
				title: "Treatment summary 1 section 2",
				content: `<p>Treatment summary 1 section 2 content with link to <a href="/treatmentSummaries/_3">Treatment summary 3</a> and <a href="/treatmentSummaries/_3">Treatment summary 3 again</a></p>`,
			},
		],
	},
	{
		id: "_2",
		title: "Treatment summary 2",
		sections: [
			{
				id: "section_2-1",
				title: "Treatment summary 2 section 1",
				content: `<p>Treatment summary 2 section 1 content with link to <a href="/treatmentSummaries/_1">Treatment summary 1</a></p>`,
			},
		],
	},
	{
		id: "_3",
		title: "Treatment summary 3",
		sections: [],
	},
];

describe("createTreatmentSummaryNodes", () => {
	const createNode = jest.fn();

	const sourceNodesArgs: SourceNodesArgs = {
		createContentDigest: jest.fn(() => `digest`),
		actions: {
			createNode,
		},
	} as unknown as SourceNodesArgs;

	it("should create graphql node for each treatment summary", () => {
		createTreatmentSummaryNodes(treatmentSummaries, sourceNodesArgs);

		expect(createNode).toHaveBeenCalledTimes(3);
	});

	it("should create treatment summary node with correct fields", () => {
		createTreatmentSummaryNodes(treatmentSummaries, sourceNodesArgs);

		const nodeInput = createNode.mock.calls[0][0] as TypedNodeInput<
			typeof BnfNode.TreatmentSummary,
			TreatmentSummaryNodeInput
		>;

		expect(nodeInput).toStrictEqual({
			...treatmentSummaries[0],
			relatedDrugs: expect.any(Array),
			relatedTreatmentSummaries: expect.any(Array),
			internal: {
				content: expect.any(String),
				type: BnfNode.TreatmentSummary,
				contentDigest: "digest",
			},
		});
	});

	it("should create related drugs field with deduped array of drug ids from linked drugs", () => {
		createTreatmentSummaryNodes(treatmentSummaries, sourceNodesArgs);

		const nodeInput = createNode.mock.calls[0][0] as TypedNodeInput<
			typeof BnfNode.TreatmentSummary,
			TreatmentSummaryNodeInput
		>;

		expect(nodeInput.relatedDrugs).toStrictEqual(["_99", "_88"]);
	});

	it("should create related treatment summaries field with deduped array of treatment summary ids from treatment summaries", () => {
		createTreatmentSummaryNodes(treatmentSummaries, sourceNodesArgs);

		const nodeInput = createNode.mock.calls[0][0] as TypedNodeInput<
			typeof BnfNode.TreatmentSummary,
			TreatmentSummaryNodeInput
		>;

		expect(nodeInput.relatedTreatmentSummaries).toStrictEqual(["_2", "_3"]);
	});
});
