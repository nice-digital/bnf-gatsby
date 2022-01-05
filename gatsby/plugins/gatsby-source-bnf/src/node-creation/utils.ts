import type { NodeInput, SourceNodesArgs } from "gatsby";
import type { ConditionalKeys } from "type-fest";

type BnfNodeType = `Bnf${string}`;

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
 * @param idField The property within `nodeContent`, that returns a string value, that's used internally for the generated node id via Gatsby's `createNodeId`
 * @param type The name of the node type, starting with `Bnf` e.g. `BnfDrug`
 * @template TNodeContent The type of the node content
 */
export const createBnfNode = <TNodeContent>(
	nodeContent: TNodeContent,
	idField: ConditionalKeys<TNodeContent, string>,
	type: BnfNodeType,
	{
		createNodeId,
		createContentDigest,
		actions: { createNode },
	}: SourceNodesArgs
): void => {
	const id = createNodeId(nodeContent[idField] as unknown as string),
		content = JSON.stringify(nodeContent),
		contentDigest = createContentDigest(content);

	const node: TypedNodeInput<typeof type, TNodeContent> = {
		...nodeContent,
		id,
		internal: {
			type,
			content,
			contentDigest,
		},
	};

	createNode(node);
};
