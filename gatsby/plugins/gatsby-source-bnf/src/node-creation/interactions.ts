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
	supplementaryInformation: InteractionSupplementaryInformationNodeInput | null;
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
		supplementaryInformation,
	}: FeedInteractions,
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
			const supplementaryInfo = supplementaryInformation.find(
				(i) => i.interactantSid === sid
			);

			const nodeContent: InteractantNodeInput = {
				id: sourceNodesArgs.createNodeId(sid),
				interactions,
				sid,
				title: title.trim(),
				supplementaryInformation: supplementaryInfo
					? {
							title: supplementaryInfo.title,
							information: supplementaryInfo.information,
					  }
					: null,
			};

			createBnfNode(nodeContent, BnfNode.Interactant, sourceNodesArgs);
		}
	});
};
