import { type NodeInput, type SourceNodesArgs } from "gatsby";
import { type Primitive } from "type-fest";

import { type FeedSimpleRecord } from "../downloader/types";
import { BnfNodeTypes, type BnfNodeType } from "../node-types";

export type BuiltIns = Primitive | Date | RegExp;

/**
 * Add's a numeric `order` property to all objects within arrays, recursively.
 * Used for creating nodes from nested arrays when we want to keep the same order
 * as the feed.
 *
 * Based on type-fest's `ReadonlyDeep`
 *
 * @see https://github.com/sindresorhus/type-fest/blob/main/source/readonly-deep.d.ts#L37
 */
export type OrderedDeep<O> = O extends BuiltIns | BuiltIns[]
	? O
	: O extends (infer U)[]
	? (OrderedDeep<U> & { order: number })[]
	: O extends object
	? { [K in keyof O]: OrderedDeep<O[K]> }
	: O;

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

export interface SimpleRecordNodeInput extends FeedSimpleRecord {
	order: number;
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
	simpleRecords.forEach((simpleRecord, order) => {
		const nodeContent: SimpleRecordNodeInput = {
			order,
			...simpleRecord,
		};

		createBnfNode(nodeContent, nodeType, sourceNodesArgs);
	});
};
