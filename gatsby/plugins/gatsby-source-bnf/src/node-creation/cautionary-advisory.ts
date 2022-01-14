import { type SourceNodesArgs } from "gatsby";
import { type Except } from "type-fest";

import { type FeedCautionaryAndAdvisoryLabels } from "../downloader/types";
import { BnfNode } from "../node-types";

import { createBnfNode, SimpleRecordNodeInput } from "./utils";

export const createCautionaryAndAdvisoryLabelsNodes = (
	{ guidance, labels }: FeedCautionaryAndAdvisoryLabels,
	sourceNodesArgs: SourceNodesArgs
): void => {
	const guidanceNodeContent: Except<SimpleRecordNodeInput, "order"> = {
		...guidance,
		sections: guidance.sections.map((section, order) => ({
			...section,
			order,
		})),
	};

	createBnfNode(
		guidanceNodeContent,
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
