import { createBnfNode } from "./utils";

import type { FeedSimpleRecord, FeedRecordSection } from "../downloader/types";
import type { SourceNodesArgs } from "gatsby";
import type { Except } from "type-fest";

export const aboutSectionNodeType = "BnfAboutSection";

export interface AboutSectionNodeInput
	extends Except<FeedSimpleRecord, "id" | "sections"> {
	order: number;
	bnfId: string;
	sections: ({ order: number } & FeedRecordSection)[];
}

export const createAboutSectionNodes = (
	aboutSections: FeedSimpleRecord[],
	sourceNodesArgs: SourceNodesArgs
): void => {
	aboutSections.forEach(({ id: bnfId, title, reviewDate, sections }, order) => {
		const nodeContent: AboutSectionNodeInput = {
			order,
			bnfId,
			title,
			reviewDate,
			sections: sections.map((section, order) => ({
				...section,
				order,
			})),
		};

		createBnfNode(nodeContent, "bnfId", aboutSectionNodeType, sourceNodesArgs);
	});
};
