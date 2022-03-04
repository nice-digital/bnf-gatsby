import { type SourceNodesArgs } from "gatsby";
import { type Except } from "type-fest";

import {
	type PHPID,
	type SID,
	type FeedMedicalDevice,
} from "../downloader/types";
import { BnfNode } from "../node-types";

import { createBnfNode } from "./utils";

export type MedicalDeviceNodeInput = Except<FeedMedicalDevice, "id"> & {
	id: SID;
	phpid: PHPID;
};

export const createMedicalDeviceNodes = (
	medicalDevices: FeedMedicalDevice[],
	sourceNodesArgs: SourceNodesArgs
): void => {
	medicalDevices.forEach(({ id, sid, ...medicalDevice }) => {
		const nodeContent: MedicalDeviceNodeInput = {
			...medicalDevice,
			id: sid,
			sid,
			phpid: id,
		};

		createBnfNode(nodeContent, BnfNode.MedicalDevice, sourceNodesArgs);
	});
};
