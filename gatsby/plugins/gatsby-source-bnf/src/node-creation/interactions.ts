import { type SourceNodesArgs } from "gatsby";
import { type Except } from "type-fest";

import {
	type FeedInteraction,
	type FeedInteractions,
	type FeedInteractant,
} from "../downloader/types";
import { BnfNode } from "../node-types";

import { createBnfNode } from "./utils";

export type InteractantNodeInput = FeedInteractant & {
	id: string;
};

export type InteractionNodeInput = FeedInteraction & {
	id: string;
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
		const nodeContent: InteractantNodeInput = {
			id: sourceNodesArgs.createNodeId(sid),
			sid,
			title,
		};

		createBnfNode(nodeContent, BnfNode.Interactant, sourceNodesArgs);
	});

	messages.forEach(({ interactant1, interactant2, messages }) => {
		const nodeContent: InteractionNodeInput = {
			id: sourceNodesArgs.createNodeId(interactant1 + interactant2),
			interactant1,
			interactant2,
			messages,
		};

		createBnfNode(nodeContent, BnfNode.Interaction, sourceNodesArgs);
	});
};
