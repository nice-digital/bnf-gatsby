export const drugSchema = `
	"""
	A drug monograph
	"""
	type BnfDrug implements Node @dontInfer {
		"The lowercase first letter of the title, used for grouping"
		initial: String!

		"The PHP ID for the drug e.g. PHP5693"
		bnfId: String!

		"The SID for the drug e.g. _694410247"
		sid: String!

		"The title for the drug. May include HTML markup."
		title: String!

		"The lowercase slugified title, used as the path within a URL e.g. 'bacillus-calmette-guérin' for 'Bacillus Calmette-Guérin'"
		slug: String!

		"The review date, if available for this record."
		reviewDate: String

		"TODO The general primary classification for a drug"
		generalPrimaryClassification: BnfClassification

		"TODO The primary classification for a drug, as a small taxonomy, represented as a tree data structure."
		specificPrimaryClassification: BnfClassification

		"TODO The secondary classifications for a drug, as a small taxonomy, represented as a tree data structure."
		specificSecondaryClassifications: [BnfClassification]
	}
`;
