import { type SourceNodesArgs } from "gatsby";

import { isTruthy } from "../../../../src/utils/index";
import {
	FeedRecordSection,
	type FeedNursePrescribersFormulary,
} from "../downloader/types";
import { BnfNode } from "../node-types";

import { createBnfNode, createSimpleRecordNodes } from "./utils";

/** NPF treatment summaries all have this prefix on in the feed which we want to strip */
const npfTreatmentSummaryTitlePrefix = "Nurse Prescribers' Formulary—";

const drugHrefRegex = /"\/drug\/(?<drugId>_\d+)"/g;

export const createNursePrescribersNodes = (
	{ introduction, npfTreatmentSummaries }: FeedNursePrescribersFormulary,
	sourceNodesArgs: SourceNodesArgs
): void => {
	createBnfNode(
		introduction,
		BnfNode.NursePrescribersFormularyIntroduction,
		sourceNodesArgs
	);

	// BNFC has no treatment summaries, so we need to check if they exist before adding the nodes
	if (npfTreatmentSummaries) {
		createSimpleRecordNodes(
			npfTreatmentSummaries.map((npfTreatmentSummary) => ({
				...npfTreatmentSummary,
				title: npfTreatmentSummary.title.replace(
					npfTreatmentSummaryTitlePrefix,
					""
				),
				relatedDrugs: Array.from(
					new Set(
						npfTreatmentSummary.sections.reduce(
							(ids: string[], { content }: FeedRecordSection) => [
								...ids,
								...Array.from(
									content.matchAll(drugHrefRegex),
									(m) => m.groups?.["drugId"]
								).filter(isTruthy),
							],
							[]
						)
					)
				),
			})),
			BnfNode.NursePrescribersFormularyTreatmentSummary,
			sourceNodesArgs
		);
	}
};
