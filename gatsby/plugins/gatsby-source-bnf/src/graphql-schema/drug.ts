export const drugSchema = `
	"""
	A drug monograph
	"""
	type BnfDrug implements Node @dontInfer {
		"The lowercase first letter of the title, used for grouping"
		initial: String!

		"The SID for the drug e.g. _694410247"
		sid: String!

		"The title for the drug. May include HTML markup. E.g. anti-D (Rh0) immunoglobulin has a subscript 0"
		title: String!

		"The slugified and lowercased title, used as a URL path"
		slug: String! @slug(field: "title")

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
