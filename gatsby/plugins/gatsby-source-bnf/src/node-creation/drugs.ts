import { type SourceNodesArgs } from "gatsby";
import { type Except } from "type-fest";

import { type PHPID, type SID, type FeedDrug } from "../downloader/types";
import { BnfNode } from "../node-types";

import { createBnfNode } from "./utils";

export type DrugNodeInput = Except<
	FeedDrug,
	| "id"
	| "primaryClassification"
	| "secondaryClassifications"
	| "constituentDrugs"
> & {
	id: SID;
	phpid: PHPID;
	constituentDrugs?: {
		message: string;
		constituents: string[];
	};
};

export const createDrugNodes = (
	drugs: FeedDrug[],
	sourceNodesArgs: SourceNodesArgs
): void => {
	drugs.forEach(({ constituentDrugs, id, sid, ...drug }) => {
		const nodeContent: DrugNodeInput = {
			...drug,
			id: sid,
			sid,
			phpid: id,
			constituentDrugs: constituentDrugs && {
				message: constituentDrugs.message,
				constituents: constituentDrugs.constituents.map((d) => d.sid),
			},
		};

		createBnfNode(nodeContent, BnfNode.Drug, sourceNodesArgs);
	});
};
