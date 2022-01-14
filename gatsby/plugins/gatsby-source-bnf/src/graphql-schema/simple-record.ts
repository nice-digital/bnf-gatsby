import { BnfNode } from "../node-types";

export const simpleRecordSchema = `
	"""
	A simple record that just contains a list of sections.
	For example, treatment summaries, about and guidance records, interactions introduction, etc.
	"""
	interface ${BnfNode.SimpleRecord} @dontInfer {
		"The title of the section. May contain HTML markup."
		title: String!

		"The slugified and lowercased title, used as a URL path"
		slug: String! @slug(field: "title")

		"The review date of the record, formatted into a string."
		reviewDate: String

		"The sections of the record."
		sections: [${BnfNode.RecordSection}!]!
	}
`;
