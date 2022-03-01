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
`;
