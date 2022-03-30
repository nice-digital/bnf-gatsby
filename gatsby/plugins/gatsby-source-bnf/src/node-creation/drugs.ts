import { type SourceNodesArgs } from "gatsby";
import { type Merge } from "type-fest";

import { type PHPID, type SID, type FeedDrug } from "../downloader/types";
import { BnfNode } from "../node-types";

import { createBnfNode } from "./utils";

export type DrugNodeInput = Merge<
	FeedDrug,
	{
		id: SID;
		phpid: PHPID;
		constituentDrugs?: {
			message: string;
			constituents: SID[];
		};
	}
>;

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
				constituents: constituentDrugs.constituents
					.filter((constituent) =>
						// Only create constituents that are monographs in their own right
						drugs.some((drug) => drug.sid === constituent.sid)
					)
					.map((d) => d.sid),
			},
		};

		createBnfNode(nodeContent, BnfNode.Drug, sourceNodesArgs);
	});
};
