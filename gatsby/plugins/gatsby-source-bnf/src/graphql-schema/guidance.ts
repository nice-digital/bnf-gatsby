import { BnfNode } from "../node-types";

export const guidanceSchema = `
	type ${BnfNode.Guidance} implements Node & ${BnfNode.SimpleRecord} @dontInfer {
		order: Int!

		"The title of the section. May contain HTML markup."
		title: String!

		"The review date of the record."
		reviewDate: Date @dateformat

		"The slugified and lowercased title, used as a URL path"
		slug: String! @slug(field: "title")

		"The sections of the record."
		sections: [${BnfNode.RecordSection}!]!
	}
`;
