import { type SourceNodesArgs } from "gatsby";
import { type Except } from "type-fest";

import { type FeedBorderlineSubstances } from "../downloader/types";
import { BnfNode } from "../node-types";

import { createBnfNode, SimpleRecordNodeInput } from "./utils";

export const createBorderlineSubstancesNodes = (
	{ introduction }: FeedBorderlineSubstances,
	sourceNodesArgs: SourceNodesArgs
): void => {
	const introductionNodeContent: Except<SimpleRecordNodeInput, "order"> = {
		...introduction,
		sections: introduction.sections.map((section, order) => ({
			...section,
			order,
		})),
	};

	createBnfNode(
		introductionNodeContent,
		BnfNode.BorderlineSubstancesIntroduction,
		sourceNodesArgs
	);
};
