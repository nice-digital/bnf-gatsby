import { type SourceNodesArgs } from "gatsby";
import { type Except } from "type-fest";

import {
	type PHPID,
	type SID,
	type FeedDrug,
	type FeedMedicinalForms,
	type FeedMedicinalForm,
	type FeedPrep,
	type FeedPack,
} from "../downloader/types";
import { BnfNode } from "../node-types";

import { createBnfNode } from "./utils";

type OrderedMedicinalForm = FeedMedicinalForm & {
	order: number;
	preps: OrderedPrep[];
};
type OrderedPrep = FeedPrep & { order: number; packs: OrderedPack[] };
type OrderedPack = FeedPack & { order: number };

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
		constituents: string[];
	};
	medicinalForms: FeedMedicinalForms & {
		medicinalForms: OrderedMedicinalForm[];
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
				medicinalForms: {
					...medicinalFormsProps,
					// Add an order (index) property onto each form, prep and pack so we can present them in a consistent order
					medicinalForms:
						medicinalForms?.map((form, order) => ({
							...form,
							order,
							preps: form.preps.map((prep, order) => ({
								...prep,
								order,
								packs:
									prep.packs?.map((pack, order) => ({
										...pack,
										order,
									})) || [],
							})),
						})) || [],
				},
			};

			createBnfNode(nodeContent, BnfNode.Drug, sourceNodesArgs);
		}
	);
};
