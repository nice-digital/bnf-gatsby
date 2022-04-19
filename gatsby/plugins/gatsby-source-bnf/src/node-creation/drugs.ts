import { type SourceNodesArgs } from "gatsby";
import { type Merge } from "type-fest";

import {
	type PHPID,
	type SID,
	type FeedDrug,
	type FeedSimpleRecord,
	type FeedClassification,
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
		relatedTreatmentSummaries: string[];
		primaryClassification: SID | null;
		secondaryClassifications: SID[];
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
		({
			constituentDrugs,
			interactants,
			id,
			sid,
			primaryClassification,
			secondaryClassifications,
			...drug
		}) => {
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
				primaryClassification: primaryClassification
					? findLeafClassification(primaryClassification)
					: null,
				secondaryClassifications:
					secondaryClassifications?.map((classification) =>
						findLeafClassification(classification)
					) || [],
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

const findLeafClassification = (classification: FeedClassification): SID => {
	const { moreSpecificClassifications } = classification;

	if (!moreSpecificClassifications || moreSpecificClassifications.length === 0)
		return classification.id;

	return moreSpecificClassifications.find(
		(subClassification) => findLeafClassification(subClassification) != null
	)?.id as SID;
};
