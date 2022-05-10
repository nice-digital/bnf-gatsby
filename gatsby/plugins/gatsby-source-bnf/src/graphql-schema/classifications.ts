import { BnfNode } from "../node-types";

export const classificationSchema = `
	"""
	The classifications for a drug, as a small taxonomy, represented as a tree data structure.
	"""
	type ${BnfNode.Classification} implements Node @dontInfer {
		"The name of the classification. May contain HTML mark-up."
		name: String!

		"The order of this classifications within the tree structure"
		order: Int!

		"The slugified and lowercased name"
		slug: String! @slug(field: "name")

		"The more specific classifications where available. For example, 'HIV-integrase inhibitors' is a more specific classification of 'antivirals'"
		moreSpecificClassifications: [${BnfNode.Classification}!]! @link

		"The classification that's the direct parent, e.g. 'antivirals' is the parent of 'HIV-integrase inhibitors'"
		parentClassification: ${BnfNode.Classification} @link

		"The classification that's at the root of this taxonomy"
		rootClassification: ${BnfNode.Classification}! @link

		"All drugs in this class, regardless of whether they're primary or secondary"
		drugs: [${BnfNode.Drug}!]! @link
	}
`;
