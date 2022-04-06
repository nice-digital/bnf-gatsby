import { type SourceNodesArgs } from "gatsby";

import { type FeedMetaData } from "../downloader/types";
import { BnfNode } from "../node-types";

import { createBnfNode } from "./utils";

export const createMetadataNode = (
	{ exportStarted }: FeedMetaData,
	sourceNodesArgs: SourceNodesArgs
): void => {
	createBnfNode(
		{
			id: sourceNodesArgs.createNodeId("1"),
			exportStarted,
		},
		BnfNode.Metadata,
		sourceNodesArgs
	);
};
