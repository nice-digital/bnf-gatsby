import type { FeedDrug } from "../downloader/types";
import type { SourceNodesArgs, NodeInput } from "gatsby";

export const classificationNodeType = "BnfClassification";

export interface ClassificationNode extends NodeInput {
	bnfId: string;
	name: string;
	moreSpecificClassifications: string[];
	moreGeneralClassification: string | null;
	// Internal Gatsby node stuff
	internal: {
		type: typeof classificationNodeType;
	} & NodeInput["internal"];
}

export const createClassificationNodes = (
	drugs: FeedDrug[],
	sourceNodesArgs: SourceNodesArgs
): void => {
	const { createNodeId, createContentDigest, actions } = sourceNodesArgs;
	const { createNode } = actions;

	drugs.forEach(({ id, sid, title }: FeedDrug) => {
		// TODO: Create classifications from drugs
	});
};
