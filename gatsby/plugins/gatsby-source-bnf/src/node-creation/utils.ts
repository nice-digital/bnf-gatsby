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
