import { type SourceNodesArgs } from "gatsby";
import { type Except } from "type-fest";

import { type FeedDrug } from "../downloader/types";
import { BnfNode } from "../node-types";

import { createBnfNode } from "./utils";

export type DrugNodeInput = Except<
	FeedDrug,
	"primaryClassification" | "secondaryClassifications"
>;

export const createDrugNodes = (
	drugs: FeedDrug[],
	sourceNodesArgs: SourceNodesArgs
): void => {
	drugs.forEach(({ id, sid, title }: FeedDrug) => {
		const nodeContent: DrugNodeInput = {
			id,
			sid,
			title,
		};

		createBnfNode(nodeContent, BnfNode.Drug, sourceNodesArgs);
	});
};
