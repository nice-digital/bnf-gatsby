import { BnfNode } from "../node-types";

export const recordSectionSchema = `
	"""
	A section of a simple record.
	"""
	type ${BnfNode.RecordSection} @dontInfer {
		order: Int!

		"The title of the section. May contain HTML markup."
		title: String!

		"The slugified and lowercased title, used as a URL path"
		slug: String! @slug(field: "title")

		"The review date of the record, formatted into a string."
		reviewDate: String

		"The content for the section. May contain HTML markup. "
		content: String! @html
	}
`;
