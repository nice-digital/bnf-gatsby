import { createBnfNode } from "./utils";

import type { FeedDrug } from "../downloader/types";
import type { SourceNodesArgs } from "gatsby";
import type { Except } from "type-fest";

export const drugNodeType = "BnfDrug";

export interface DrugNodeInput
	extends Except<
		FeedDrug,
		"primaryClassification" | "secondaryClassifications"
	> {
	initial: string;
}

export const createDrugNodes = (
	drugs: FeedDrug[],
	sourceNodesArgs: SourceNodesArgs
): void => {
	drugs.forEach(({ id, sid, title }: FeedDrug) => {
		const nodeContent: DrugNodeInput = {
			id,
			sid,
			title,
			initial: title[0].toLowerCase(),
		};

		createBnfNode(nodeContent, drugNodeType, sourceNodesArgs);
	});
};
