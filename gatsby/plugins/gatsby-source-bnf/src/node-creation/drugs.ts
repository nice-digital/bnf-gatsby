/**
 * Creates Gatsby GraphQL nodes for topics from downloaded data
 */

import slugify from "@sindresorhus/slugify";
import { SourceNodesArgs, NodeInput } from "gatsby";

import { FeedDrug } from "../downloader/types";

export const drugNodeType = "BnfDrug";

export interface DrugNode
	extends NodeInput,
		Omit<FeedDrug, "clinicalSpecialties" | "topicHtmlObjects"> {
	firstLetter: string;
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
			firstLetter: title[0].toLowerCase(),
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
