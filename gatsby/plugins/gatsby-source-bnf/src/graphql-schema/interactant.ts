import { BnfNode } from "../node-types";

export const interactantSchema = `
	"""
	An interactant
	"""
	type ${BnfNode.Interactant} implements Node @dontInfer {
		"The SID for the Interactant e.g. _694410247 which may, or may not, match the sid of a drug"
		sid: String!

		drug: ${BnfNode.Drug} @link(by: "sid", from: "sid")

		"The title for the interactant. May include HTML markup. E.g. anti-D (Rh0) immunoglobulin has a subscript 0"
		title: String!

		"The slugified and lowercased title, used as a URL path"
		slug: String! @slug(field: "title")
	}
`;
