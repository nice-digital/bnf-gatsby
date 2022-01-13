import { createBnfNode } from "./utils";

import type { FeedSimpleRecord, FeedRecordSection } from "../downloader/types";
import type { SourceNodesArgs } from "gatsby";
import type { Except } from "type-fest";

export const treatmentSummaryNodeType = "BnfTreatmentSummary";

export interface TreatmentSummaryNodeInput
	extends Except<FeedSimpleRecord, "sections"> {
	order: number;
	sections: ({ order: number } & FeedRecordSection)[];
}

export const createTreamentSummaryNodes = (
	treamentSummaries: FeedSimpleRecord[],
	sourceNodesArgs: SourceNodesArgs
): void => {
	treamentSummaries.forEach(({ id, title, reviewDate, sections }, order) => {
		const nodeContent: TreatmentSummaryNodeInput = {
			order,
			id,
			title,
			reviewDate,
			sections: sections.map((section, order) => ({
				...section,
				order,
			})),
		};

		createBnfNode(nodeContent, treatmentSummaryNodeType, sourceNodesArgs);
	});
};
