import type { NodeInput, SourceNodesArgs } from "gatsby";

export type BnfNodeType = `Bnf${string}`;

export type TypedNodeInput<
	TNodeType extends BnfNodeType,
	TNodeContent
> = NodeInput &
	TNodeContent & {
		// Internal Gatsby node stuff
		internal: {
			type: TNodeType;
		} & NodeInput["internal"];
	};

/**
 * Helper method to create a BNF-specific Gatsby GraphQL Node, that is, a node with a type starting with `Bnf`.
 *
 * @param nodeContent The content of the node to create, without any of the Gatsby internals
 * @param type The name of the node type, starting with `Bnf` e.g. `BnfDrug`
 * @param sourceNodesArgs The arguments to `sourceNodes` from Gatsby
 * @template TNodeContent The type of the node content
 */
export const createBnfNode = <TNodeContent extends { id: string }>(
	nodeContent: TNodeContent,
	type: BnfNodeType,
	{ createContentDigest, actions: { createNode } }: SourceNodesArgs
): void => {
	const content = JSON.stringify(nodeContent),
		contentDigest = createContentDigest(content);

	const node: TypedNodeInput<typeof type, TNodeContent> = {
		...nodeContent,
		internal: {
			type,
			content,
			contentDigest,
		},
	};

	createNode(node);
};
