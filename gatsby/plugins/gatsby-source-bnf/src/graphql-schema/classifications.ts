import { BnfNode } from "../node-types";

export const classificationSchema = `
	"""
	All the properties for a single medical device monograph.
	"""
	type ${BnfNode.Classification} implements Node @dontInfer {
		"The name of the classification. May contain HTML mark-up."
		name: String!

		"The more specific classifications where available. For example, 'HIV-integrase inhibitors' is a more specific classification of 'antivirals'"
		moreSpecificClassifications: [${BnfNode.Classification}!]! @link

		"The classification that's the direct parent, e.g. 'antivirals' is the parent of 'HIV-integrase inhibitors'"
		parentClassification: ${BnfNode.Classification} @link

		"The classification that's at the root of this taxonomy"
		rootClassification: ${BnfNode.Classification}! @link

		"All drugs in this class, regardless of whether they're primary or secondary"
		allDrugs: [${BnfNode.Drug}!]! @link

		"The drugs for which this classification is the primary"
		primaryDrugs: [${BnfNode.Drug}!]! @link

		"The drugs for which this classification is one of the secondaries"
		secondaryDrugs: [${BnfNode.Drug}!]! @link
	}
`;
