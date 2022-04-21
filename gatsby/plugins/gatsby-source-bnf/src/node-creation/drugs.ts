import { type SourceNodesArgs } from "gatsby";
import { type Merge } from "type-fest";

import {
	type PHPID,
	type SID,
	type FeedDrug,
	type FeedMedicinalForm,
	type FeedMedicinalForms,
	type FeedSimpleRecord,
	type FeedInteractions,
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
		relatedTreatmentSummaries: string[];
		interactants: SID[];
	}
>;

export interface DrugCreationArgs {
	drugs: FeedDrug[];
	treatmentSummaries: FeedSimpleRecord[];
	interactions: FeedInteractions;
}

export const createDrugNodes = (
	{
		drugs,
		treatmentSummaries,
		interactions: { messages, supplementaryInformation },
	}: DrugCreationArgs,
	sourceNodesArgs: SourceNodesArgs
): void => {
	drugs.forEach(
		({ medicinalForms, interactants, constituentDrugs, id, sid, ...drug }) => {
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
				relatedTreatmentSummaries: treatmentSummaries
					.filter(({ sections }) =>
						sections.some((section) => section.content.includes(`/drug/${sid}`))
					)
					.map((treatmentSummary) => treatmentSummary.id),
				interactants: interactants
					.filter(
						(interactant) =>
							// Only create links to interactants that have at least 1 interaction...
							messages.some(({ interactant1, interactant2 }) =>
								[interactant1, interactant2].includes(interactant.sid)
							) ||
							// ... Or have supplementary info associated. E.g. "Bowel cleansing preparations" has "Separation of administration" supplementary info
							supplementaryInformation.some(
								(s) => s.interactantSid === interactant.sid
							)
					)
					.map((interactant) => interactant.sid),
			};

			createBnfNode(nodeContent, BnfNode.Drug, sourceNodesArgs);
		}
	);
};
