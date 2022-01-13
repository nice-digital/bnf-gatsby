import { SourceNodesArgs } from "gatsby";

import { FeedRecordSection, FeedSimpleRecord } from "../downloader/types";

import {
	createAboutSectionNodes,
	aboutSectionNodeType,
} from "./about-sections";

const mockRecordSection: FeedRecordSection = {
	id: "aa",
	title: "Significant changes",
	content: `<p>Significant changes made since the release of data</p>`,
};

const mockAboutSimpleRecord: FeedSimpleRecord = {
	id: "a",
	title: "Changes",
	sections: [mockRecordSection, mockRecordSection],
};

const createContentDigest = jest.fn((o: unknown) => `Digest-${o}`),
	createNode = jest.fn();

const sourceNodesArgs: SourceNodesArgs = {
	createContentDigest,
	actions: {
		createNode,
	},
} as unknown as SourceNodesArgs;

describe("createAboutSectionNodes", () => {
	it("should create 1 node for each about record", () => {
		createAboutSectionNodes(
			[mockAboutSimpleRecord, mockAboutSimpleRecord],
			sourceNodesArgs
		);

		expect(createNode).toHaveBeenCalledTimes(2);
	});

	it("should create about node with correct fields", () => {
		createAboutSectionNodes([mockAboutSimpleRecord], sourceNodesArgs);

		expect(createNode).toHaveBeenCalledWith({
			order: 0,
			id: "a",
			title: "Changes",
			reviewDate: undefined,
			sections: [
				{
					order: 0,
					...mockRecordSection,
				},
				{
					order: 1,
					...mockRecordSection,
				},
			],
			internal: {
				type: aboutSectionNodeType,
				content: expect.any(String),
				contentDigest: expect.any(String),
			},
		});
	});
});
