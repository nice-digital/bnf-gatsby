export const drugSchema = `
	"""
	A classifications for a drug, as a small taxonomy, represented as a tree data structure.
	"""
	type Classification @dontInfer {
		"The ID of the classification e.g. '_448101428'"
		id: String!

		"The name of the classification e.g 'Vitamins and trace elements'"
		name: String!

		"The more specific classifications where available. For example, 'HIV-integrase inhibitors' is a more specific classification of 'antivirals'."
		moreSpecificClassifications: [Classification]!
	}

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

		"The primary classification for a drug, as a small taxonomy, represented as a tree data structure."
		specificPrimaryClassification: BnfClassification!

		"The secondary classifications for a drug, as a small taxonomy, represented as a tree data structure."
		specificSecondaryClassifications: [BnfClassification]
	}
`;
