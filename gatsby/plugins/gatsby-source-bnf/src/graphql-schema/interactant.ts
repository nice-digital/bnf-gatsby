import { BnfNode } from "../node-types";

export const interactantSchema = `
	"""
	An interactant, which is a substance against which interaction messages are authored. Interactions are generally authored against moieties while some drug monographs are authored against salts (e.g. 'warfarin' and 'warfarin sodium'.
	"""
	type ${BnfNode.Interactant} implements Node @dontInfer {
		"The SID for the Interactant e.g. _694410247 which may, or may not, match the sid of a drug"
		sid: String!

		"The drug that matches this interactant, that is, the drug with same id if it exists, otherwise null"
		drug: ${BnfNode.Drug} @link(by: "sid", from: "sid")

		"The title for the interactant. May include HTML markup. E.g. anti-D (Rh0) immunoglobulin has a subscript 0"
		title: String!

		"The slugified and lowercased title, used as a URL path"
		slug: String! @slug(field: "title")
	}
`;
