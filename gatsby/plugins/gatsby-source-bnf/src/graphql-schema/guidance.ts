export const guidanceSchema = `
	type BnfGuidance implements Node & BnfSimpleRecord @dontInfer {
		order: Int!

		"The title of the section. May contain HTML markup."
		title: String!

		"The review date of the record, formatted into a string."
		reviewDate: String

		"The slugified and lowercased title, used as a URL path"
		slug: String! @slug(field: "title")

		"The sections of the record."
		sections: [BnfRecordSection!]!
	}
`;
