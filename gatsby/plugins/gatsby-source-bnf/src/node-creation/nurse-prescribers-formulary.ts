import { type SourceNodesArgs } from "gatsby";

import { type FeedNursePrescribersFormulary } from "../downloader/types";
import { BnfNode } from "../node-types";

import { createBnfNode, createSimpleRecordNodes } from "./utils";

/** NPF treatment summaries all have this prefix on in the feed which we want to strip */
const npfTreatmentSummaryTitlePrefix = "Nurse Prescribers' Formulary—";

export const createNursePrescribersNodes = (
	{ introduction, npfTreatmentSummaries }: FeedNursePrescribersFormulary,
	sourceNodesArgs: SourceNodesArgs
): void => {
	createBnfNode(
		introduction,
		BnfNode.NursePrescribersFormularyIntroduction,
		sourceNodesArgs
	);

	if (npfTreatmentSummaries)
		createSimpleRecordNodes(
			npfTreatmentSummaries.map((npfTreatmentSummary) => ({
				...npfTreatmentSummary,
				title: npfTreatmentSummary.title.replace(
					npfTreatmentSummaryTitlePrefix,
					""
				),
			})),
			BnfNode.NursePrescribersFormularyTreatmentSummary,
			sourceNodesArgs
		);
};
