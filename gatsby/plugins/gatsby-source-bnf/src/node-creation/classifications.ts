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
	drugs: SID[];
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
			drugs: drugs
				.filter(
					(drug) =>
						hasLeafClassification(drug.primaryClassification, id) ||
						drug.secondaryClassifications?.some((classification) =>
							hasLeafClassification(classification, id)
						)
				)
				.map((drug) => drug.sid),
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
