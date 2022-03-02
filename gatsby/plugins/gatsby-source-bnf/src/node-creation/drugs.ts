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
	drugs.forEach(
		({
			constituentDrugs,
			id,
			sid,
			medicinalForms: { medicinalForms, ...medicinalFormsProps },
			...drug
		}) => {
			const nodeContent: DrugNodeInput = {
				...drug,
				id: sid,
				sid,
				phpid: id,
				constituentDrugs: constituentDrugs && {
					message: constituentDrugs.message,
					constituents: constituentDrugs.constituents.map((d) => d.sid),
				},
				// TODO: Add order property onto each medicinal form, prep and pack
				medicinalForms: {
					...medicinalFormsProps,
					medicinalForms: medicinalForms?.map((form, order) => ({
						...form,
						order,
					})),
				},
			};

			createBnfNode(nodeContent, BnfNode.Drug, sourceNodesArgs);
		}
	);
};
