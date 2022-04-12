import { type SourceNodesArgs } from "gatsby";

import {
	type FeedDrug,
	type SID,
	type FeedClassification,
} from "../downloader/types";
import { BnfNode } from "../node-types";

import { createBnfNode } from "./utils";

export type ClassificationNodeInput = {
	id: SID;
	name: string;
	moreSpecificClassifications: SID[];
	parentClassification: SID | null;
	rootClassification: SID;
	allDrugs: SID[];
	primaryDrugs: SID[];
	secondaryDrugs: SID[];
};

export interface ClassificationsCreationArgs {
	drugs: FeedDrug[];
	classifications: FeedClassification[];
}

export const createClassificationNodes = (
	{ drugs, classifications }: ClassificationsCreationArgs,
	sourceNodesArgs: SourceNodesArgs
): void => {
	const createClassificationNode = (
		{ id, name, moreSpecificClassifications }: FeedClassification,
		rootClassification: SID,
		parentClassification: SID | null = null
	) => {
		const nodeInput: ClassificationNodeInput = {
			id,
			name,
			moreSpecificClassifications:
				moreSpecificClassifications?.map((s) => s.id) || [],
			parentClassification,
			rootClassification,
			allDrugs: drugs
				.filter(
					(drug) =>
						hasLeafClassification(drug.primaryClassification, id) ||
						drug.secondaryClassifications?.some((classification) =>
							hasLeafClassification(classification, id)
						)
				)
				.map(toSID),
			primaryDrugs: drugs
				.filter(({ primaryClassification }) =>
					hasLeafClassification(primaryClassification, id)
				)
				.map(toSID),
			secondaryDrugs: drugs
				.filter(({ secondaryClassifications }) =>
					secondaryClassifications?.some((classification) =>
						hasLeafClassification(classification, id)
					)
				)
				.map(toSID),
		};

		createBnfNode(nodeInput, BnfNode.Classification, sourceNodesArgs);

		if (moreSpecificClassifications)
			moreSpecificClassifications.forEach((classification) => {
				createClassificationNode(classification, rootClassification, id);
			});
	};

	classifications.forEach((classification) =>
		createClassificationNode(classification, classification.id)
	);
};

const toSID = (drug: FeedDrug) => drug.sid;

const hasLeafClassification = (
	drugClassification: FeedClassification | undefined,
	classificationSID: SID
): boolean => {
	if (!drugClassification) return false;

	if (
		!drugClassification.moreSpecificClassifications ||
		drugClassification.moreSpecificClassifications.length === 0
	)
		return drugClassification.id === classificationSID;

	return drugClassification.moreSpecificClassifications.some((classification) =>
		hasLeafClassification(classification, classificationSID)
	);
};
