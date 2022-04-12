import { BnfNode } from "../node-types";

export const drugSchema = `
	"""
	A drug monograph
	"""
	type ${BnfNode.Drug} implements Node @dontInfer {
		"The PHP ID for the drug e.g. PHP5693"
		phpid: ID!

		"The SID for the drug e.g. _694410247"
		sid: ID!

		"The title for the drug. May include HTML markup. E.g. anti-D (Rh0) immunoglobulin has a subscript 0"
		title: String!

		"The slugified and lowercased title, used as a URL path"
		slug: String! @slug(field: "title")

		"The review date, if available for this record."
		reviewDate: Date @dateformat

		"The lowest level primary classification to which this drug belongs. Note: it's nullable because not all drugs have a primary classification, e.g. Cranberry"
		primaryClassification: ${BnfNode.Classification} @link

		"The lowest level secondary classifications to which this drug belongs."
		secondaryClassifications: [${BnfNode.Classification}!]! @link

		"The interactant with the same sid as this drug, if it exists, otherwise null"
		interactant: ${BnfNode.Interactant} @link(by: "sid", from: "sid")

		"Any treatment summaries that contain a link to back this drug"
		relatedTreatmentSummaries: [${BnfNode.TreatmentSummary}!]! @link

		"The constituent drugs. This will be populated if the drug is a combination (e.g. 'tramadol with paracetamol') where each constituent exists in the BNF as a monograph in its own right."
		constituentDrugs: ${BnfNode.ConstituentDrugs}

		"The allergy and cross-sensitivity section for the drug, including any relevant drug classes and preparations."
		allergyAndCrossSensitivity: ${BnfNode.SimplePot}

		"The breast feeding section for the drug, including any relevant drug classes and preparations."
		breastFeeding: ${BnfNode.SimplePot}

		"The cautions section for the drug, including any relevant drug classes and preparations."
		cautions: ${BnfNode.SimplePot}

		"The conception and contraception section for the drug, including any relevant drug classes and preparations."
		conceptionAndContraception: ${BnfNode.SimplePot}

		"The contra-indications section for the drug, including any relevant drug classes and preparations."
		contraIndications: ${BnfNode.SimplePot}

		"The directions for administration section for the drug, including any relevant drug classes and preparations."
		directionsForAdministration: ${BnfNode.SimplePot}

		"The drug action section for the drug, including any relevant drug classes and preparations"
		drugAction: ${BnfNode.SimplePot}

		"The effect on laboratory tests section for the drug, including any relevant drug classes and preparations."
		effectOnLaboratoryTests: ${BnfNode.SimplePot}

		"The exceptions to legal category section for the drug, including any relevant drug classes and preparations."
		exceptionsToLegalCategory: ${BnfNode.SimplePot}

		"The handling and storage section for the drug, including any relevant drug classes and preparations."
		handlingAndStorage: ${BnfNode.SimplePot}

		"The hepatic impairment section for the drug, including any relevant drug classes and preparations."
		hepaticImpairment: ${BnfNode.SimplePot}

		"The important safety information section for the drug, including any relevant drug classes and preparations."
		importantSafetyInformation: ${BnfNode.SimplePot}

		"The less suitable for prescribing section for the drug, including any relevant drug classes and preparations."
		lessSuitableForPrescribing: ${BnfNode.SimplePot}

		"The indications and dose section for the drug, including any relevant drug classes and preparations."
		indicationsAndDose: ${BnfNode.IndicationsAndDose}

		"The medicinal forms for the drug."
		medicinalForms: ${BnfNode.MedicinalForms}!

		"The monitoring requirements section for the drug, including any relevant drug classes and preparations."
		monitoringRequirements: ${BnfNode.MonitoringPot}

		"The national funding section for the drug, including any relevant drug classes and preparations."
		nationalFunding: ${BnfNode.NationalFundingPot}

		"The palliative care section for the drug, including any relevant drug classes and preparations."
		palliativeCare: ${BnfNode.SimplePot}

		"The patient and carer advice section for the drug, including any relevant drug classes and preparations."
		patientAndCarerAdvice: ${BnfNode.SimplePot}

		"The pregnancy section for the drug, including any relevant drug classes and preparations."
		pregnancy: ${BnfNode.SimplePot}

		"The prescribing and dispensing information section for the drug, including any relevant drug classes and preparations. Note that this section used to contain information about prescribing and dispensing in palliative care, but this will now appear in the palliative care section."
		prescribingAndDispensingInformation: ${BnfNode.SimplePot}

		"The profession specific information section for the drug, including any relevant drug classes and preparations."
		professionSpecificInformation: ${BnfNode.SimplePot}

		"The pre-treatment screening section for the drug, including any relevant drug classes and preparations."
		preTreatmentScreening: ${BnfNode.SimplePot}

		"The renal impairment section for the drug, including any relevant drug classes and preparations."
		renalImpairment: ${BnfNode.SimplePot}

		"The side effects section for the drug, including any relevant drug classes and preparations."
		sideEffects: ${BnfNode.SimplePot}

		"The treatment cessation section for the drug, including any relevant drug classes and preparations."
		treatmentCessation: ${BnfNode.SimplePot}

		"The unlicensed use section for the drug, including any relevant drug classes and preparations."
		unlicensedUse: ${BnfNode.SimplePot}
	}

	"""
	A wrapper for the constituent drugs of a combination drug.
	"""
	type ${BnfNode.ConstituentDrugs} {
		"The standard message to be included with the constituent drugs."
		message: String!

		"The constituents of the combination drug."
		constituents: [${BnfNode.Drug}!]! @link(by: "sid")
	}

	"""
	The medicinal forms for a drug. A medicinal form is how a drug is made up for a patient to take, such as 'tablet', 'capsule', or 'solution for injection'. Each medicinal form will contain details of the available preparations of the drug. In some cases, a drug monograph may appear in the BNF without any preparations and medicinal forms (for example, if the drug only has special-order preparations that the BNF does not list). In this case, the 'initialStatement' will indicate that there are no medicines listed.
	"""
	type ${BnfNode.MedicinalForms} {
		"The initial statement for the medicinal forms for a drug. This will either be a standard licensing variation statement or a statement to indicate that there are no medicines listed."
		initialStatement: String!

		"The BNF does not contain details of special-order preparations, but where these are available, this field contains a statement to say for which forms special-order preparations are available"
		specialOrderManufacturersStatement: String

		"The medicinal forms. May be empty if there are no licensed medicines listed in the BNF."
		medicinalForms: [${BnfNode.MedicinalForm}!]!
	}

	"""
	The properties for a medicinal form. This contains all the preparations and packs for a specific medicinal form for a drug, as well as information about applicable cautionary and advisory labels, excipients and electrolytes.
	"""
	type ${BnfNode.MedicinalForm} {
		"The name of the medicinal form."
		form: String!

		"The slugified and lowercased form name, used as a section id, and hash target"
		slug: String! @slug(field: "form")

		"A list of any cautionary and advisory labels for the medicinal form."
		cautionaryAndAdvisoryLabels: [String!]

		"A list of any excipients for the medicinal form, provided as a text statement."
		excipients: String

		"A list of any electrolytes for the medicinal form, provided as a text statement."
		electolytes: String

		"The preparations of the drug for the medicinal form."
		preps: [${BnfNode.Prep}!]!
	}
`;
