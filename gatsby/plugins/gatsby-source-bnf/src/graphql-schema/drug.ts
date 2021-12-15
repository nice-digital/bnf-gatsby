export const drugSchema = `
	"""
	A drug monograph
	"""
	type BnfDrug implements Node @dontInfer {
		"The lowercase first letter of the title, used for grouping"
		firstLetter: String!

		"Id from the feed e.g. PHP5693"
		bnfId: String!

		"E.g. _694410247"
		sid: String!

		"The name of the drug"
		title: String!

		"The lowercase slugified title, used as the path within a URL e.g. 'bacillus-calmette-guérin' for 'Bacillus Calmette-Guérin'"
		slug: String!
	}
`;
