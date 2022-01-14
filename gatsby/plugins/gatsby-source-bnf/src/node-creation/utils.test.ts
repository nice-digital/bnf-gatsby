import { type SourceNodesArgs } from "gatsby";

import {
	type FeedSimpleRecord,
	type FeedRecordSection,
} from "../downloader/types";
import { BnfNode } from "../node-types";

import { createBnfNode, createSimpleRecordNodes } from "./utils";

describe("utils", () => {
	const createContentDigest = jest.fn((o: unknown) => `Digest-${o}`),
		createNode = jest.fn();

	const sourceNodesArgs: SourceNodesArgs = {
		createContentDigest,
		actions: {
			createNode,
		},
	} as unknown as SourceNodesArgs;

	describe("createBnfNode", () => {
		it("should call gatsby's createNode action", () => {
			createBnfNode({ id: "123" }, BnfNode.Drug, sourceNodesArgs);

			expect(createNode).toHaveBeenCalledTimes(1);
		});

		it("should create node id from given id field", () => {
			createBnfNode({ id: "123" }, BnfNode.Drug, sourceNodesArgs);

			expect(createNode).toHaveBeenCalledWith(
				expect.objectContaining({ id: "123" })
			);
		});

		it("should save given object's fields as node fields", () => {
			const nodeContent = { id: "abc", a: "1", b: 2 };

			createBnfNode(nodeContent, BnfNode.Drug, sourceNodesArgs);

			expect(createNode).toHaveBeenCalledWith(
				expect.objectContaining(nodeContent)
			);
		});

		it("should stringify given object as Gatsby internal content property", () => {
			createBnfNode({ id: "99" }, BnfNode.Drug, sourceNodesArgs);

			expect(createNode).toHaveBeenCalledWith(
				expect.objectContaining({
					internal: expect.objectContaining({ content: `{"id":"99"}` }),
				})
			);
		});

		it("should create internal Gatsby digest from stringified node content", () => {
			createBnfNode({ id: "99" }, BnfNode.Drug, sourceNodesArgs);

			expect(createNode).toHaveBeenCalledWith(
				expect.objectContaining({
					internal: expect.objectContaining({
						contentDigest: `Digest-{"id":"99"}`,
					}),
				})
			);
		});

		it("should use given node type in Gatsby's internal type property", () => {
			createBnfNode({ id: "99" }, BnfNode.Drug, sourceNodesArgs);

			expect(createNode).toHaveBeenCalledWith(
				expect.objectContaining({
					internal: expect.objectContaining({
						type: BnfNode.Drug,
					}),
				})
			);
		});
	});

	describe("createSimpleRecordNodes", () => {
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

		it("should create 1 node for each about record", () => {
			createSimpleRecordNodes(
				[mockAboutSimpleRecord, mockAboutSimpleRecord],
				BnfNode.AboutSection,
				sourceNodesArgs
			);

			expect(createNode).toHaveBeenCalledTimes(2);
		});

		it("should create about node with correct fields", () => {
			createSimpleRecordNodes(
				[mockAboutSimpleRecord],
				BnfNode.AboutSection,
				sourceNodesArgs
			);

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
					type: BnfNode.AboutSection,
					content: expect.any(String),
					contentDigest: expect.any(String),
				},
			});
		});
	});
});
