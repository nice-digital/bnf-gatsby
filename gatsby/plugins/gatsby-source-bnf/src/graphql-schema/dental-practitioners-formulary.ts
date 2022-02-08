import { BnfNode } from "../node-types";

export const dentalPractitionersFormularySchema = `
	type ${BnfNode.DentalPractitionersFormulary} implements Node & ${BnfNode.SimpleRecord} @dontInfer {
		"The title of the section. May contain HTML markup."
		title: String!

		"The review date of the record, formatted into a string."
		reviewDate: String

		"The slugified and lowercased title, used as a URL path"
		slug: String! @slug(field: "title")

		"The sections of the record."
		sections: [${BnfNode.RecordSection}!]!
	}
`;
