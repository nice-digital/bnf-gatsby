import { BnfNode } from "../node-types";

export const nursePrescribersSchema = `
	type ${BnfNode.NursePrescribersFormularyIntroduction} implements Node & ${BnfNode.SimpleRecord} @dontInfer {
		"The title of the section. May contain HTML markup."
		title: String!

		"The review date of the record, formatted into a string."
		reviewDate: Date @dateformat

		"The slugified and lowercased title, used as a URL path"
		slug: String! @slug(field: "title")

		"The sections of the record."
		sections: [${BnfNode.RecordSection}!]!
	}

	type ${BnfNode.NursePrescribersFormularyTreatmentSummary} implements Node & ${BnfNode.SimpleRecord} @dontInfer {
		"The title of the section. May contain HTML markup."
		title: String!

		"The review date of the record, formatted into a string."
		reviewDate: Date @dateformat

		"The slugified and lowercased title, used as a URL path"
		slug: String! @slug(field: "title")

		"The sections of the record."
		sections: [${BnfNode.RecordSection}!]!

		"Any drugs linked from this NPF treatment summary"
		relatedDrugs: [${BnfNode.Drug}!]! @link
	}
`;
