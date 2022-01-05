export const aboutSectionSchema = `
	type BnfAboutSection implements Node & BnfSimpleRecord @dontInfer {
		order: Int!

		"The ID of the record."
		bnfId: ID!

		"The title of the section. May contain HTML markup."
		title: String!

		"The review date of the record, formatted into a string."
		reviewDate: String

		"The sections of the record."
		sections: [BnfRecordSection!]!
	}
`;
