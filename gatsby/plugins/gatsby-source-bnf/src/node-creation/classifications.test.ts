import { type SourceNodesArgs } from "gatsby";

import { type FeedClassification, type FeedDrug } from "../downloader/types";

import {
	createClassificationNodes,
	type ClassificationNodeInput,
} from "./classifications";

describe("createClassificationNodes", () => {
	const createNode = jest.fn();

	const sourceNodesArgs: SourceNodesArgs = {
		createContentDigest: jest.fn(),
		actions: {
			createNode,
		},
	} as unknown as SourceNodesArgs;

	const classifications: FeedClassification[] = [
		{
			id: "_123",
			name: "Root",
		},
		{
			id: "_456",
			name: "Root with children",
			moreSpecificClassifications: [
				{
					id: "_789",
					name: "Sub",
				},
			],
		},
	];

	const drugs = [
		{
			sid: "_543",
			primaryClassification: classifications[1],
		} as unknown as FeedDrug,
	];

	it("should create root node", () => {
		createClassificationNodes({ drugs, classifications }, sourceNodesArgs);

		const nodeInput = createNode.mock.calls[0][0] as ClassificationNodeInput;

		expect(nodeInput).toMatchInlineSnapshot(`
		{
		  "drugs": [],
		  "id": "_123",
		  "internal": {
		    "content": "{"id":"_123","order":0,"name":"Root","moreSpecificClassifications":[],"parentClassification":null,"rootClassification":"_123","drugs":[]}",
		    "contentDigest": undefined,
		    "type": "BnfClassification",
		  },
		  "moreSpecificClassifications": [],
		  "name": "Root",
		  "order": 0,
		  "parentClassification": null,
		  "rootClassification": "_123",
		}
	`);
	});

	it("should create root node with children", () => {
		createClassificationNodes({ drugs, classifications }, sourceNodesArgs);

		const nodeInput = createNode.mock.calls[1][0] as ClassificationNodeInput;

		expect(nodeInput).toMatchInlineSnapshot(`
		{
		  "drugs": [],
		  "id": "_456",
		  "internal": {
		    "content": "{"id":"_456","order":1,"name":"Root with children","moreSpecificClassifications":["_789"],"parentClassification":null,"rootClassification":"_456","drugs":[]}",
		    "contentDigest": undefined,
		    "type": "BnfClassification",
		  },
		  "moreSpecificClassifications": [
		    "_789",
		  ],
		  "name": "Root with children",
		  "order": 1,
		  "parentClassification": null,
		  "rootClassification": "_456",
		}
	`);
	});

	it("should create child node", () => {
		createClassificationNodes({ drugs, classifications }, sourceNodesArgs);

		const nodeInput = createNode.mock.calls[2][0] as ClassificationNodeInput;

		expect(nodeInput).toMatchInlineSnapshot(`
		{
		  "drugs": [
		    "_543",
		  ],
		  "id": "_789",
		  "internal": {
		    "content": "{"id":"_789","order":2,"name":"Sub","moreSpecificClassifications":[],"parentClassification":"_456","rootClassification":"_456","drugs":["_543"]}",
		    "contentDigest": undefined,
		    "type": "BnfClassification",
		  },
		  "moreSpecificClassifications": [],
		  "name": "Sub",
		  "order": 2,
		  "parentClassification": "_456",
		  "rootClassification": "_456",
		}
	`);
	});
});
