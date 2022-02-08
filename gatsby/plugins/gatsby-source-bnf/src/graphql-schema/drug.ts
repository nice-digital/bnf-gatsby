import { BnfNode } from "../node-types";

export const drugSchema = `
	"""
	A drug monograph
	"""
	type ${BnfNode.Drug} implements Node @dontInfer {
		"The SID for the drug e.g. _694410247"
		sid: String!

		"The title for the drug. May include HTML markup. E.g. anti-D (Rh0) immunoglobulin has a subscript 0"
		title: String!

		"The slugified and lowercased title, used as a URL path"
		slug: String! @slug(field: "title")

		"The review date, if available for this record."
		reviewDate: String

		interactant: ${BnfNode.Interactant} @link(by: "sid", from: "sid")
	}
`;
