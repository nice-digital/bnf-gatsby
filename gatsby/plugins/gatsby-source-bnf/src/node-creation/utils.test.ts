import { SourceNodesArgs } from "gatsby";

import { createBnfNode } from "./utils";

describe("utils", () => {
	describe("createBnfNode", () => {
		const createContentDigest = jest.fn((o: unknown) => `Digest-${o}`),
			createNode = jest.fn();

		const sourceNodesArgs: SourceNodesArgs = {
			createContentDigest,
			actions: {
				createNode,
			},
		} as unknown as SourceNodesArgs;

		it("should call gatsby's createNode action", () => {
			createBnfNode({ id: "123" }, "BnfTest", sourceNodesArgs);

			expect(createNode).toHaveBeenCalledTimes(1);
		});

		it("should create node id from given id field", () => {
			createBnfNode({ id: "123" }, "BnfTest", sourceNodesArgs);

			expect(createNode).toHaveBeenCalledWith(
				expect.objectContaining({ id: "123" })
			);
		});

		it("should save given object's fields as node fields", () => {
			const nodeContent = { id: "abc", a: "1", b: 2 };

			createBnfNode(nodeContent, "BnfTest", sourceNodesArgs);

			expect(createNode).toHaveBeenCalledWith(
				expect.objectContaining(nodeContent)
			);
		});

		it("should stringify given object as Gatsby internal content property", () => {
			createBnfNode({ id: "99" }, "BnfTest", sourceNodesArgs);

			expect(createNode).toHaveBeenCalledWith(
				expect.objectContaining({
					internal: expect.objectContaining({ content: `{"id":"99"}` }),
				})
			);
		});

		it("should create internal Gatsby digest from stringified node content", () => {
			createBnfNode({ id: "99" }, "BnfTest", sourceNodesArgs);

			expect(createNode).toHaveBeenCalledWith(
				expect.objectContaining({
					internal: expect.objectContaining({
						contentDigest: `Digest-{"id":"99"}`,
					}),
				})
			);
		});

		it("should use given node type in Gatsby's internal type property", () => {
			createBnfNode({ id: "99" }, "BnfTest", sourceNodesArgs);

			expect(createNode).toHaveBeenCalledWith(
				expect.objectContaining({
					internal: expect.objectContaining({
						type: `BnfTest`,
					}),
				})
			);
		});
	});
});
