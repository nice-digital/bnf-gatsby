export const recordSectionSchema = `
	"""
	A section of a simple record.
	"""
	type BnfRecordSection @dontInfer {
		order: Int!

		"The ID of the record."
		bnfId: String!

		"The title of the section. May contain HTML markup."
		title: String!

		"The review date of the record, formatted into a string."
		reviewDate: String

		"The content for the section. May contain HTML markup. "
		content: String!
	}
`;
