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
	interactions: InteractionNodeInput[];
};

export type InteractionNodeInput = Except<FeedInteraction, "interactant1"> & {
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
		// Find all interactions for this interactant
		const interactions = messages.reduce(function (
			interactionArray,
			currentValue
		) {
			if (currentValue.interactant1 === sid) {
				const secondInteractant = interactants.find(
					(i) => i.sid === currentValue.interactant2
				);
				const updatedInteraction = {
					id: sourceNodesArgs.createNodeId(sid + secondInteractant?.sid),
					messages: currentValue.messages,
					interactant2: secondInteractant?.title || "",
				};
				interactionArray.push(updatedInteraction);
			}
			return interactionArray;
		},
		[] as InteractionNodeInput[]);

		const nodeContent: InteractantNodeInput = {
			id: sourceNodesArgs.createNodeId(sid),
			interactions,
			sid,
			title,
		};

		createBnfNode(nodeContent, BnfNode.Interactant, sourceNodesArgs);
	});
};
