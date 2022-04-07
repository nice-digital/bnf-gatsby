import { type SourceNodesArgs } from "gatsby";

import { type FeedPublicationMetadata } from "../downloader/types";
import { BnfNode } from "../node-types";

import { createBnfNode } from "./utils";

export const createMetadataNode = (
	metadata: FeedPublicationMetadata,
	sourceNodesArgs: SourceNodesArgs
): void => {
	createBnfNode(
		{
			id: metadata.runTag,
			...metadata,
		},
		BnfNode.Metadata,
		sourceNodesArgs
	);
};
