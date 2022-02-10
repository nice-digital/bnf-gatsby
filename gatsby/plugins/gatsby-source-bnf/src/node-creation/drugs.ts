import { type SourceNodesArgs } from "gatsby";
import { type Except } from "type-fest";

import { type FeedDrug } from "../downloader/types";
import { BnfNode } from "../node-types";

import { createBnfNode } from "./utils";

export type DrugNodeInput = Except<
	FeedDrug,
	"primaryClassification" | "secondaryClassifications" | "constituentDrugs"
> & {
	constituentDrugs?: {
		message: string;
		constituents: string[];
	};
};

export const createDrugNodes = (
	drugs: FeedDrug[],
	sourceNodesArgs: SourceNodesArgs
): void => {
	drugs.forEach(({ constituentDrugs, ...drug }) => {
		const nodeContent: DrugNodeInput = {
			...drug,
			constituentDrugs: constituentDrugs && {
				message: constituentDrugs.message,
				constituents: constituentDrugs.constituents.map((d) => d.sid),
			},
		};

		createBnfNode(nodeContent, BnfNode.Drug, sourceNodesArgs);
	});
};
