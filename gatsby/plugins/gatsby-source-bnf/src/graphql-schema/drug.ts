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

		"The interactant with the same sid as this drug, if it exists, otherwise null"
		interactant: ${BnfNode.Interactant} @link(by: "sid", from: "sid")

		"The constituent drugs. This will be populated if the drug is a combination (e.g. 'tramadol with paracetamol') where each constituent exists in the BNF as a monograph in its own right."
		constituentDrugs: ${BnfNode.ConstituentDrugs}

		"The indications and dose section for the drug, including any relevant drug classes and preparations."
		indicationsAndDose: ${BnfNode.IndicationsAndDose}

		"The medicinal forms for the drug."
		medicinalForms: ${BnfNode.MedicinalForms}!
	}

	"""
	A wrapper for the constituent drugs of a combination drug.
	"""
	type ${BnfNode.ConstituentDrugs} {
		"The standard message to be included with the constituent drugs."
		message: String!

		"The constituents of the combination drug. TODO: Make this non-nullable when the feed is fixed (currently it shows constituents that aren't themselves drug monographs)"
		constituents: [${BnfNode.Drug}]! @link(by: "sid")
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
