import { type SourceNodesArgs } from "gatsby";
import { type Except } from "type-fest";

import {
	type PHPID,
	type SID,
	type FeedDrug,
	type FeedPrep,
} from "../downloader/types";
import { BnfNode } from "../node-types";

import { createBnfNode } from "./utils";

export type DrugNodeInput = Except<
	FeedDrug,
	| "id"
	| "primaryClassification"
	| "secondaryClassifications"
	| "constituentDrugs"
	| "medicinalForms"
> & {
	id: SID;
	phpid: PHPID;
	constituentDrugs?: {
		message: string;
		constituents: SID[];
	};
	medicinalForms: {
		initialStatement: string;
		specialOrderManufacturersStatement?: string;
		medicinalForms?: {
			form: string;
			excipients?: string;
			electolytes?: string;
			preps: FeedPrep[];
			cautionaryAndAdvisoryLabels?: {
				label: number;
				additionalNotes: string;
			}[];
		}[];
	};
};

export const createDrugNodes = (
	drugs: FeedDrug[],
	sourceNodesArgs: SourceNodesArgs
): void => {
	drugs.forEach(({ medicinalForms, constituentDrugs, id, sid, ...drug }) => {
		const {
			initialStatement,
			specialOrderManufacturersStatement,
			medicinalForms: forms,
		} = medicinalForms;

		const nodeContent: DrugNodeInput = {
			...drug,
			id: sid,
			sid,
			phpid: id,
			constituentDrugs: constituentDrugs && {
				message: constituentDrugs.message,
				constituents: constituentDrugs.constituents.map((d) => d.sid),
			},
			medicinalForms: {
				initialStatement,
				specialOrderManufacturersStatement,
				medicinalForms: forms?.map((medicinalForm) => {
					return {
						...medicinalForm,
						cautionaryAndAdvisoryLabels:
							medicinalForm.cautionaryAndAdvisoryLabels?.map((label) => {
								return {
									label: label.number,
									additionalNotes: "TODO",
								};
							}),
					};
				}),
			},
		};

		createBnfNode(nodeContent, BnfNode.Drug, sourceNodesArgs);
	});
};
