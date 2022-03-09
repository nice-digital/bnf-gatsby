import { type SourceNodesArgs } from "gatsby";

import {
	type FeedInteractionMessage,
	type FeedInteractions,
} from "../downloader/types";
import { BnfNode } from "../node-types";

import { createBnfNode } from "./utils";

export type InteractantNodeInput = {
	id: string;
	sid: string;
	interactions: InteractionNodeInput[];
	title: string;
};

export type InteractionNodeInput = {
	interactant: string;
	messages: FeedInteractionMessage[];
};

export const createInteractionNodes = (
	{ introduction, interactants, messages }: FeedInteractions,
	sourceNodesArgs: SourceNodesArgs
): void => {
	createBnfNode(
		introduction,
		BnfNode.InteractionsIntroduction,
		sourceNodesArgs
	);

	interactants.forEach(({ sid, title }) => {
		// Find all interactions for this interactant
		const interactions = messages
			.filter((m) => m.interactant1 === sid)
			.map((m) => ({
				messages: m.messages,
				interactant: m.interactant2,
			}));

		// Only create a node if there are some constituent interactions
		if (interactions.length > 0) {
			const nodeContent: InteractantNodeInput = {
				id: sourceNodesArgs.createNodeId(sid),
				interactions,
				sid,
				title,
			};

			createBnfNode(nodeContent, BnfNode.Interactant, sourceNodesArgs);
		}
	});
};
