import { type SourceNodesArgs } from "gatsby";

import { isTruthy } from "../../../../src/utils/index";
import {
	type FeedRecordSection,
	type FeedSimpleRecord,
} from "../downloader/types";
import { BnfNode } from "../node-types";

import { createBnfNode } from "./utils";

const drugPathRegex = /"\/drug\/(?<drugId>_\d+)"/g,
	treatmentSummaryPathRegex =
		/"\/treatmentSummaries\/(?<treatmentSummaryId>_\d+)"/g;

const regexReducer =
	(groupName: "treatmentSummaryId" | "drugId", regex: RegExp) =>
	(ids: string[], { content }: FeedRecordSection) =>
		[
			...ids,
			...Array.from(
				content.matchAll(regex),
				(m) => m.groups?.[groupName]
			).filter(isTruthy),
		];

export type TreatmentSummaryNodeInput = FeedSimpleRecord & {
	relatedTreatmentSummaries: string[];
	relatedDrugs: string[];
};

export const createTreatmentSummaryNodes = (
	treatmentSummaries: FeedSimpleRecord[],
	sourceNodesArgs: SourceNodesArgs
): void => {
	treatmentSummaries.forEach((treatmentSummary) => {
		const nodeInput: TreatmentSummaryNodeInput = {
			...treatmentSummary,
			relatedDrugs: Array.from(
				new Set(
					treatmentSummary.sections.reduce(
						regexReducer("drugId", drugPathRegex),
						[]
					)
				)
			),
			relatedTreatmentSummaries: Array.from(
				new Set([
					// Links TO this this treatment FROM others
					...treatmentSummaries
						.filter((tS) =>
							tS.sections.some((section) =>
								section.content.includes(
									`"/treatmentSummaries/${treatmentSummary.id}"`
								)
							)
						)
						.map((tS) => tS.id),
					// Links FROM this treatment summary TO others
					...treatmentSummary.sections.reduce(
						regexReducer("treatmentSummaryId", treatmentSummaryPathRegex),
						[]
					),
				])
			),
		};

		createBnfNode(nodeInput, BnfNode.TreatmentSummary, sourceNodesArgs);
	});
};
