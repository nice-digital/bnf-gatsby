import { type SourceNodesArgs } from "gatsby";
import { type Except } from "type-fest";

import { type FeedCautionaryAndAdvisoryLabels } from "../downloader/types";
import { BnfNode } from "../node-types";

import { createBnfNode, SimpleRecordNodeInput } from "./utils";

export const createMetadateNode = (
	{ guidance, labels }: FeedCautionaryAndAdvisoryLabels,
	sourceNodesArgs: SourceNodesArgs
): void => {
	//TODO - create nodes
};
