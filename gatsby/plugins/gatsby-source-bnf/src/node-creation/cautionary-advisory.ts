import { type SourceNodesArgs } from "gatsby";

import { type FeedCautionaryAndAdvisoryLabels } from "../downloader/types";
import { BnfNode } from "../node-types";

import { createBnfNode } from "./utils";

export const createCautionaryAndAdvisoryLabelsNodes = (
	{ guidance, labels }: FeedCautionaryAndAdvisoryLabels,
	sourceNodesArgs: SourceNodesArgs
): void => {
	createBnfNode(
		guidance,
		BnfNode.CautionaryAndAdvisoryGuidance,
		sourceNodesArgs
	);

	labels.forEach((label) => {
		createBnfNode(
			{
				...label,
				id: sourceNodesArgs.createNodeId(label.englishRecommendation),
			},
			BnfNode.CautionaryAndAdvisoryLabel,
			sourceNodesArgs
		);
	});
};
