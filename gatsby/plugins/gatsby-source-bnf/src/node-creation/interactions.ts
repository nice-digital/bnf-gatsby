import { type SourceNodesArgs } from "gatsby";
import { type Except } from "type-fest";

import {
	type FeedInteractionMessage,
	type FeedInteractions,
	type FeedSupplementaryInformation,
} from "../downloader/types";
import { BnfNode } from "../node-types";

import { createBnfNode } from "./utils";

export type InteractantNodeInput = {
	id: string;
	sid: string;
	interactions: InteractionNodeInput[];
	title: string;
	supplementaryInformation: InteractionSupplementaryInformationNodeInput[];
};

export type InteractionNodeInput = {
	interactant: string;
	messages: FeedInteractionMessage[];
};

export type InteractionSupplementaryInformationNodeInput = Except<
	FeedSupplementaryInformation,
	"interactantSid"
>;

export const createInteractionNodes = (
	{
		introduction,
		interactants,
		messages,
		supplementaryInformation: allSupplementaryInformation,
	}: FeedInteractions,
	sourceNodesArgs: SourceNodesArgs
): void => {
	createBnfNode(
		introduction,
		BnfNode.InteractionsIntroduction,
		sourceNodesArgs
	);

	interactants.forEach(({ sid, title }) => {
		// Find all interactions and supplementary info for this interactant
		const interactions = messages
				.filter((msg) => msg.interactant1 === sid)
				.map(({ messages, interactant2 }) => ({
					messages,
					interactant: interactant2,
				})),
			supplementaryInformation = allSupplementaryInformation
				.filter((supInf) => supInf.interactantSid === sid)
				.map(({ title, information }) => ({ title, information }));

		// Only create a node if there is content associated with the interactant
		if (interactions.length > 0 || supplementaryInformation.length > 0) {
			const nodeContent: InteractantNodeInput = {
				id: sourceNodesArgs.createNodeId(sid),
				interactions,
				sid,
				title: title.trim(),
				supplementaryInformation,
			};

			createBnfNode(nodeContent, BnfNode.Interactant, sourceNodesArgs);
		}
	});
};
