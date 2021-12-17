import slugify from "@sindresorhus/slugify";

import type { FeedDrug } from "../downloader/types";
import type { SourceNodesArgs, NodeInput } from "gatsby";

export const drugNodeType = "BnfDrug";

export interface DrugNode
	extends NodeInput,
		Omit<FeedDrug, "primaryClassification" | "secondaryClassifications"> {
	initial: string;
	// Internal Gatsby node stuff
	internal: {
		type: typeof drugNodeType;
	} & NodeInput["internal"];
}

export const createDrugNodes = (
	drugs: FeedDrug[],
	sourceNodesArgs: SourceNodesArgs
): void => {
	const { createNodeId, createContentDigest, actions } = sourceNodesArgs;
	const { createNode } = actions;

	drugs.forEach(({ id, sid, title }: FeedDrug) => {
		const nodeContent = {
			bnfId: id,
			sid,
			title,
			initial: title[0].toLowerCase(),
			slug: slugify(title),
		};

		const drugNode: DrugNode = {
			...nodeContent,
			id: createNodeId(id),
			children: [],
			internal: {
				type: drugNodeType,
				content: JSON.stringify(nodeContent),
				contentDigest: createContentDigest(nodeContent),
			},
		};

		createNode(drugNode);
	});
};
