import { type SourceNodesArgs } from "gatsby";
import { type Merge } from "type-fest";

import {
	type PHPID,
	type SID,
	type FeedDrug,
	type FeedSimpleRecord,
} from "../downloader/types";
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
		relatedTreatmentSummaries: string[];
		interactants: SID[];
	}
>;

export interface DrugCreationArgs {
	drugs: FeedDrug[];
	treatmentSummaries: FeedSimpleRecord[];
}

export const createDrugNodes = (
	{ drugs, treatmentSummaries }: DrugCreationArgs,
	sourceNodesArgs: SourceNodesArgs
): void => {
	drugs.forEach(({ constituentDrugs, interactants, id, sid, ...drug }) => {
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
			relatedTreatmentSummaries: treatmentSummaries
				.filter(({ sections }) =>
					sections.some((section) => section.content.includes(`/drug/${sid}`))
				)
				.map((treatmentSummary) => treatmentSummary.id),
			interactants: interactants.map((interactant) => interactant.sid),
		};

		createBnfNode(nodeContent, BnfNode.Drug, sourceNodesArgs);
	});
};
