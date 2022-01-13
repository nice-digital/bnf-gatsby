import { createBnfNode } from "./utils";

import type { FeedSimpleRecord, FeedRecordSection } from "../downloader/types";
import type { SourceNodesArgs } from "gatsby";
import type { Except } from "type-fest";

export const guidanceNodeType = "BnfGuidance";

export interface GuidanceNodeInput
	extends Except<FeedSimpleRecord, "sections"> {
	order: number;
	sections: ({ order: number } & FeedRecordSection)[];
}

export const createGuidanceNodes = (
	treamentSummaries: FeedSimpleRecord[],
	sourceNodesArgs: SourceNodesArgs
): void => {
	treamentSummaries.forEach(({ id, title, reviewDate, sections }, order) => {
		const nodeContent: GuidanceNodeInput = {
			order,
			id,
			title,
			reviewDate,
			sections: sections.map((section, order) => ({
				...section,
				order,
			})),
		};

		createBnfNode(nodeContent, guidanceNodeType, sourceNodesArgs);
	});
};
