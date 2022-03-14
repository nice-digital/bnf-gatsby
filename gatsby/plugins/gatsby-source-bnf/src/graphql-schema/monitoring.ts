import { BnfNode } from "../node-types";

export const monitoringSchema = `
	"""
	A single section of monitoring requirements content for a BNF drug or medical device. A monograph will include content from relevant drug classes (groups of drugs that share the same properties), the drug itself, and specific preparations where the properties differ from those of the generic drug. This record has these three parts of content in the drugClassContent, drugContent and prepContent fields respectively.
	"""
	type ${BnfNode.MonitoringPot} {
		"The name/title of the pot."
		potName: String!

		"The slugified and lowercased pot name, used as an ID/hash link"
		slug: String! @slug(field: "potName")

		""The monitoring requirements pot content that relates to relevant drug classes for the drug. This field will contain more than one entry when the drug belongs to multiple drug classes with relevant content for the pot."
		drugClassContent: [${BnfNode.MonitoringPotContent}!]!

		"The monitoring requirements pot content that relates to the drug."
		drugContent: ${BnfNode.MonitoringPotContent}

		"Any monitoring requirements pot content that relates to specific preparations. This field will contain more than one entry when the drug has multiple preparations with specific relevant content for the pot."
		prepContent: [${BnfNode.MonitoringPotContent}!]!
	}

	"""
	The sections covering monitoring requirements.
	"""
	type ${BnfNode.MonitoringPotContent} {
		"What the content is for (the name of a drug class, drug or preparation). May contain HTML mark-up"
		contentFor: String!

		"The therapeutic drug monitoring section. May contain HTML mark-up"
		therapeuticDrugMonitoring: String

		"The monitoring of patient parameters section. May contain HTML mark-up"
		therapeuticDrugMonitoring
		monitoringOfPatientParameters: String

		"The patient monitoring programmes section. May contain HTML mark-up"
		patientMonitoringProgrammes: String
	}
`;
