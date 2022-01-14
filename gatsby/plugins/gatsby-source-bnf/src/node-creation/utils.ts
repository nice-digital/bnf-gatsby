import { type NodeInput, type SourceNodesArgs } from "gatsby";
import { type Except } from "type-fest";

import { FeedRecordSection, FeedSimpleRecord } from "../downloader/types";
import { BnfNodeTypes, type BnfNodeType } from "../node-types";

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
	type: BnfNodeTypes,
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

export interface SimpleRecordNodeInput
	extends Except<FeedSimpleRecord, "sections"> {
	order: number;
	sections: ({ order: number } & FeedRecordSection)[];
}

/**
 * Create nodes from simple records, for sections like about, guidance etc
 *
 * @param simpleRecords The list of simple records from the feed from which to create nodes
 * @param nodeType The type of node E.g. `BnfAboutSection`
 * @param sourceNodesArgs The arguments passed to Gatsby's `sourceNodes` function
 */
export const createSimpleRecordNodes = (
	simpleRecords: FeedSimpleRecord[],
	nodeType: BnfNodeTypes,
	sourceNodesArgs: SourceNodesArgs
): void => {
	simpleRecords.forEach(({ id, title, reviewDate, sections }, order) => {
		const nodeContent: SimpleRecordNodeInput = {
			order,
			id,
			title,
			reviewDate,
			sections: sections.map((section, order) => ({
				...section,
				order,
			})),
		};

		createBnfNode(nodeContent, nodeType, sourceNodesArgs);
	});
};
