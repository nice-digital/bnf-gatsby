import { type SourceNodesArgs } from "gatsby";
import { type Merge } from "type-fest";

import {
	type PHPID,
	type SID,
	type FeedDrug,
	FeedMedicinalForm,
	FeedMedicinalForms,
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
		medicinalForms: Merge<
			FeedMedicinalForms,
			{
				medicinalForms?: Merge<
					FeedMedicinalForm,
					{
						cautionaryAndAdvisoryLabels?: {
							label: number;
							qualifier?: string;
						}[];
					}
				>[];
			}
		>;
	}
>;

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
				constituents: constituentDrugs.constituents
					.filter((constituent) =>
						// Only create constituents that are monographs in their own right
						drugs.some((drug) => drug.sid === constituent.sid)
					)
					.map((d) => d.sid),
			},
			medicinalForms: {
				initialStatement,
				specialOrderManufacturersStatement,
				medicinalForms:
					forms?.map((medicinalForm) => {
						return {
							...medicinalForm,
							cautionaryAndAdvisoryLabels:
								medicinalForm.cautionaryAndAdvisoryLabels?.map((label) => {
									return {
										label: label.number,
										qualifier: label.qualifier,
									};
								}),
						};
					}) || [],
			},
		};

		createBnfNode(nodeContent, BnfNode.Drug, sourceNodesArgs);
	});
};
