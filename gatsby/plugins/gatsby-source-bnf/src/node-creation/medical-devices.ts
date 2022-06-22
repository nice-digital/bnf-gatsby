import { type SourceNodesArgs } from "gatsby";
import { type Merge } from "type-fest";

import {
	type PHPID,
	type SID,
	type FeedMedicalDevice,
	type FeedMedicalDeviceType,
	type FeedClinicalMedicalDeviceInformationGroup,
	type FeedSimplePot,
	type FeedSimplePotContent,
	type FeedIndicationsAndDosePotContent,
} from "../downloader/types";
import { BnfNode } from "../node-types";

import { createBnfNode } from "./utils";

interface MedicalDeviceSimplePot {
	potName: string;
	content: FeedSimplePotContent;
}

export type MedicalDeviceNodeInput = Merge<
	FeedMedicalDevice,
	{
		id: SID;
		phpid: PHPID;
		medicalDeviceTypes: string[];
	}
>;

export type MedicalDeviceTypeNodeInput = Merge<
	FeedMedicalDeviceType,
	{
		medicalDevice: string;
		hasPreps: boolean;
		clinicalMedicalDeviceInformationGroups: string[];
		indicationsAndDose?: CMPIIndicationsAndDosePot | undefined;
	}
>;

export type CMPIIndicationsAndDosePot = {
	potName: string;
	content: FeedIndicationsAndDosePotContent;
};

export type CMPINodeInput = Merge<
	FeedClinicalMedicalDeviceInformationGroup,
	{
		medicalDeviceType: string;
		id: string;
		title: string;
		allergyAndCrossSensitivity: MedicalDeviceSimplePot | undefined;
		complianceStandards: MedicalDeviceSimplePot | undefined;
		deviceDescription: MedicalDeviceSimplePot | undefined;
		indicationsAndDose: CMPIIndicationsAndDosePot | undefined;
		patientAndCarerAdvice: MedicalDeviceSimplePot | undefined;
		prescribingAndDispensingInformation: MedicalDeviceSimplePot | undefined;
		professionSpecificInformation: MedicalDeviceSimplePot | undefined;
		treatmentCessation: MedicalDeviceSimplePot | undefined;
	}
>;

export const createMedicalDeviceNodes = (
	medicalDevices: FeedMedicalDevice[],
	sourceNodesArgs: SourceNodesArgs
): void => {
	medicalDevices.forEach((medicalDevice) => {
		const nodeContent: MedicalDeviceNodeInput = {
			...medicalDevice,
			id: medicalDevice.sid,
			phpid: medicalDevice.id,
			indicationsAndDose: medicalDevice.indicationsAndDose,
			medicalDeviceTypes: medicalDevice.medicalDeviceTypes.map(
				(medicalDeviceType) =>
					createMedicalDeviceTypeNode(
						medicalDeviceType,
						medicalDevice,
						sourceNodesArgs
					)
			),
		};

		createBnfNode(nodeContent, BnfNode.MedicalDevice, sourceNodesArgs);
	});
};

const createMedicalDeviceTypeNode = (
	medicalDeviceType: FeedMedicalDeviceType,
	medicalDevice: FeedMedicalDevice,
	sourceNodesArgs: SourceNodesArgs
): string => {
	const {
		id,
		title,
		preparations = [],
		clinicalMedicalDeviceInformationGroups,
	} = medicalDeviceType;

	const nodeContent: MedicalDeviceTypeNodeInput = {
		id,
		title,
		medicalDevice: medicalDevice.sid,
		preparations,
		hasPreps: !!preparations && preparations.length > 0,
		clinicalMedicalDeviceInformationGroups:
			clinicalMedicalDeviceInformationGroups?.map((cmpi) =>
				createCMPINode(cmpi, medicalDeviceType, sourceNodesArgs)
			) || [],
		indicationsAndDose: medicalDevice.indicationsAndDose?.drugContent
			? {
					potName: medicalDevice.indicationsAndDose.potName,
					content: medicalDevice.indicationsAndDose.drugContent,
			  }
			: undefined,
	};

	createBnfNode(nodeContent, BnfNode.MedicalDeviceType, sourceNodesArgs);

	return id;
};

const flattenCMPISimplePot = (
	pot: FeedSimplePot | undefined
): MedicalDeviceSimplePot | undefined => {
	if (!pot) return undefined;

	const { potName, drugContent } = pot;

	if (!drugContent)
		throw Error(
			`Expected drugContent to be present for CMPI in pot ${potName}`
		);

	return {
		potName,
		content: drugContent,
	};
};

const createCMPINode = (
	cmpi: FeedClinicalMedicalDeviceInformationGroup,
	medicalDeviceType: FeedMedicalDeviceType,
	sourceNodesArgs: SourceNodesArgs
): string => {
	const {
		allergyAndCrossSensitivity,
		complianceStandards,
		deviceDescription,
		indicationsAndDose,
		patientAndCarerAdvice,
		preparations = [],
		prescribingAndDispensingInformation,
		professionSpecificInformation,
		treatmentCessation,
	} = cmpi;

	const title =
		deviceDescription?.drugContent?.contentFor ||
		indicationsAndDose?.drugContent?.contentFor;

	if (!title)
		throw Error(
			`Title could not be found for CMPI in medical device type ${medicalDeviceType.title}`
		);

	const id = sourceNodesArgs.createNodeId(title);

	const nodeContent: CMPINodeInput = {
		medicalDeviceType: medicalDeviceType.id,
		id,
		title,
		indicationsAndDose: indicationsAndDose?.drugContent
			? {
					potName: indicationsAndDose.potName,
					content: indicationsAndDose.drugContent,
			  }
			: undefined,
		preparations,
		// Flatten all the simple pots as we can discard the drug class and prep info for CMPI. To quote the schema:
		// "For clinical medical device information groups, the drug class content will always be empty, as will the preparation content. The 'drugContent' will contain the information for the clinical medical device information group."
		allergyAndCrossSensitivity: flattenCMPISimplePot(
			allergyAndCrossSensitivity
		),
		complianceStandards: flattenCMPISimplePot(complianceStandards),
		deviceDescription: flattenCMPISimplePot(deviceDescription),
		patientAndCarerAdvice: flattenCMPISimplePot(patientAndCarerAdvice),
		prescribingAndDispensingInformation: flattenCMPISimplePot(
			prescribingAndDispensingInformation
		),
		professionSpecificInformation: flattenCMPISimplePot(
			professionSpecificInformation
		),
		treatmentCessation: flattenCMPISimplePot(treatmentCessation),
	};

	createBnfNode(
		nodeContent,
		BnfNode.ClinicalMedicalDeviceInformationGroup,
		sourceNodesArgs
	);

	return id;
};
