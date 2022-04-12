import { type SourceNodesArgs } from "gatsby";
import { type Merge } from "type-fest";

import {
	type PHPID,
	type SID,
	type FeedDrug,
	type FeedSimpleRecord,
	FeedClassification,
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
	drugs.forEach(
		({
			constituentDrugs,
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
