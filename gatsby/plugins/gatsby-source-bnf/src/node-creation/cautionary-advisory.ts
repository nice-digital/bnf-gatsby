import { createBnfNode } from "./utils";

import type {
	FeedSimpleRecord,
	FeedRecordSection,
	FeedCautionaryAndAdvisoryLabels,
} from "../downloader/types";
import type { SourceNodesArgs } from "gatsby";
import type { Except } from "type-fest";

export const cautionaryAndAdvisoryGuidanceNodeType =
	"BnfCautionaryAndAdvisoryGuidance";

export const cautionaryAndAdvisoryLabelNodeType =
	"BnfCautionaryAndAdvisoryLabel";

export interface CautionaryAndAdvisoryGuidanceNodeInput
	extends Except<FeedSimpleRecord, "sections"> {
	sections: ({ order: number } & FeedRecordSection)[];
}

export const createCautionaryAndAdvisoryLabelsNodes = (
	{ guidance, labels }: FeedCautionaryAndAdvisoryLabels,
	sourceNodesArgs: SourceNodesArgs
): void => {
	const guidanceNodeContent: CautionaryAndAdvisoryGuidanceNodeInput = {
		...guidance,
		sections: guidance.sections.map((section, order) => ({
			...section,
			order,
		})),
	};

	createBnfNode(
		guidanceNodeContent,
		cautionaryAndAdvisoryGuidanceNodeType,
		sourceNodesArgs
	);

	labels.forEach((label) => {
		createBnfNode(
			{
				...label,
				id: sourceNodesArgs.createNodeId(label.englishRecommendation),
			},
			cautionaryAndAdvisoryLabelNodeType,
			sourceNodesArgs
		);
	});
};
