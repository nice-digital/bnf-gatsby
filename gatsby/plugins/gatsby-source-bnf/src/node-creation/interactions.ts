import { type SourceNodesArgs } from "gatsby";

import {
	type FeedInteractions,
	type FeedInteractant,
} from "../downloader/types";
import { BnfNode } from "../node-types";

import { createBnfNode } from "./utils";

export type InteractantNodeInput = FeedInteractant & {
	id: string;
};

export const createInteractionNodes = (
	{ interactants }: FeedInteractions,
	sourceNodesArgs: SourceNodesArgs
): void => {
	interactants.forEach(({ sid, title }) => {
		const nodeContent: InteractantNodeInput = {
			id: sourceNodesArgs.createNodeId(sid),
			sid,
			title: title.trim(),
		};

		createBnfNode(nodeContent, BnfNode.Interactant, sourceNodesArgs);
	});
};
