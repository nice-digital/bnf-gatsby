import { BnfNode } from "../node-types";

export const indicationsAndDoseSchema = `
	"""
	A single section of simple (unstructured) content for a BNF drug or medical device. A monograph will include content from relevant drug classes (groups of drugs that share the same properties), the drug itself, and specific preparations where the properties differ from those of the generic drug. This record has these three parts of content in the drugClassContent, drugContent and prepContent fields respectively.
	"""
	type ${BnfNode.IndicationsAndDose} @dontInfer {
		"The name/title of the pot."
		potName: String!

		"The slugified and lowercased pot name, used as a DOM ID and hash target"
		slug: String! @slug(field: "potName")

		"The indications and dose pot content that relates to relevant drug classes for the drug. This field will contain more than one entry when the drug belongs to multiple drug classes with relevant content for the pot."
		drugClassContent: [${BnfNode.IndicationsAndDoseContent}]

		"The indications and dose pot content that relates to the drug."
		drugContent: ${BnfNode.IndicationsAndDoseContent}

		"Any indications and dose pot content that relates to specific preparations. This field will contain more than one entry when the drug has multiple preparations with specific relevant content for the pot."
		prepContent: [${BnfNode.IndicationsAndDoseContent}]
	}

	"""
	The details of the indications and doses for a drug, drug class or preparation.
	"""
	type ${BnfNode.IndicationsAndDoseContent} @dontInfer {
		"What the content is for (the name of a drug class, drug or preparation). May contain HTML mark-up"
		contentFor: String! @html

		"The indication and dose groups."
		indicationAndDoseGroups: [${BnfNode.IndicationAndDoseGroup}!]!

		"Dose adjustments due to interactions content. May contain HTML mark-up."
		doseAdjustments: String @html

		"Extremes of body weight content. May contain HTML mark-up."
		extremesOfBodyWeight: String @html

		"dose equivalence and conversion content. May contain HTML mark-up."
		doseEquivalence: String @html

		"Potency content. May contain HTML mark-up."
		potency: String @html

		"Pharmacokinetics content. May contain HTML mark-up."
		pharmacokinetics: String @html
	}

	"""
	A grouping of one or more indications and the doses relevant for those indications.
	"""
	type ${BnfNode.IndicationAndDoseGroup} @dontInfer {
		"The therapeutic indications."
		therapeuticIndications: [${BnfNode.TherapeuticIndication}!]!

		"The routes, indications, patient groups and doses statements."
		routesAndPatientGroups: [${BnfNode.RouteAndPatientGroups}!]!
	}

	"""
	The therapeutic indication, including SNOMED CT coding where available.
	"""
	type ${BnfNode.TherapeuticIndication} @dontInfer {
		"If available, the SNOMED CT identifier that encodes the indication. This value is a should be represented as a 64-bit integer, but it is represented as a String in this JSON to avoid any potential problems of 32-bit integer overflows."
		sctIndication: String

		"If available, the English preferred name of the SNOMED CT concept that encodes the therapeutic intent of the indication."
		sctTherapeuticIntent: String

		"The indication. May contain HTML mark-up."
		indication: String! @html
	}

	"""
	The route of administration and one or more patient groups with doses for that route.
	"""
	type ${BnfNode.RouteAndPatientGroups} @dontInfer {
		"The route of administration."
		routeOfAdministration: String!

		"The patient groups and dose statements for the given route of administration."
		patientGroups: [${BnfNode.PatientGroup}!]!
	}

	"""
	A dose statement and the patient group that the dose applies to (e.g. adult or child).
	"""
	type ${BnfNode.PatientGroup} @dontInfer {
		"The patient group that the dose applies to which can only be adult, child, or neonate."
		patientGroup: String!

		"Details of the patient group that the dose applies to (e.g. adult or child)."
		detailedPatientGroup: String!

		"The dose statement. May contain HTML mark-up."
		doseStatement: String! @html
	}
`;
