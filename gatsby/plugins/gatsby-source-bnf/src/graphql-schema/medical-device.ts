import { BnfNode } from "../node-types";

export const medicalDeviceSchema = `
	"""
	All the properties for a single medical device monograph.
	"""
	type ${BnfNode.MedicalDevice} implements Node @dontInfer {
		"The PHP ID for the medical device."
		phpid: ID!

		"The SID for the medical device."
		sid: ID!

		"The title for the medical device. May include HTML mark-up."
		title: String!

		"The slugified and lowercased title, used as a URL path"
		slug: String! @slug(field: "title")

		"The medical device types. Usually there is only one of these, but theoretically there could be more."
		medicalDeviceTypes: [${BnfNode.MedicalDeviceType}!]!
	}

	"""
	An individual medical device. Preparations can appear at this level but they can also appear at the clinical medical device information group level.
	"""
	type ${BnfNode.MedicalDeviceType} @dontInfer {
		"The title for the medical device type. May include HTML mark-up."
		title: String!

		"The general preparations for the medical device type. This will only be present if there are no clinical medical device information groups."
		preparations: [${BnfNode.Prep}!]!

		"The clinical medical device information groups. These contain preparation-specific content such as device descriptions, compliance standards and prescribing & dispensing information."
		clinicalMedicalDeviceInformationGroups: [${BnfNode.ClinicalMedicalDeviceInformationGroup}!]!
	}

	"""
	This object contains content that is relevant to a set of medical device preparations.
	"""
	type ${BnfNode.ClinicalMedicalDeviceInformationGroup} {
		"The device description for the clinical medical device information group."
		deviceDescription: ${BnfNode.MedicalDeviceSimplePot}

		"The compliance standards for the clinical medical device information group."
		complianceStandards: ${BnfNode.MedicalDeviceSimplePot}

		"The indications and dose section for the clinical medical device information group."
		indicationsAndDose: ${BnfNode.IndicationsAndDose}

		"The allergy and cross-sensitivity section for the clinical medical device information group."
		allergyAndCrossSensitivity: ${BnfNode.MedicalDeviceSimplePot}

		"The treatment cessation section for the clinical medical device information group."
		treatmentCessation: ${BnfNode.MedicalDeviceSimplePot}

		"The prescribing and dispensing information section for the clinical medical device information group."
		prescribingAndDispensingInformation: ${BnfNode.MedicalDeviceSimplePot}

		"The patient and carer advice section for the clinical medical device information group."
		patientAndCarerAdvice: ${BnfNode.MedicalDeviceSimplePot}

		"The profession specific information section for the clinical medical device information group."
		professionSpecificInformation: ${BnfNode.MedicalDeviceSimplePot}

		"The preparations that are relevant to the clinical medical device information group."
		preparations: [${BnfNode.Prep}!]!
	}

	"""
	Simple pot content specifically for medical devices
	"""
	type ${BnfNode.MedicalDeviceSimplePot} {
		"The name/title of the pot."
		potName: String!

		"The slugified and lowercased pot name, used as an ID/hash link"
		slug: String! @slug(field: "potName")

		"The simple pot content that relates to the medical device."
		content: ${BnfNode.SimplePotContent}!
	}
`;
