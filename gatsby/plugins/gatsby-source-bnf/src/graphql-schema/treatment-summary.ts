import { BnfNode } from "../node-types";

export const treamentSummarySchema = `
	type ${BnfNode.TreatmentSummary} implements Node & ${BnfNode.SimpleRecord} @dontInfer {
		"The title of the section. May contain HTML markup."
		title: String!

		"The review date of the record, formatted into a string."
		reviewDate: Date @dateformat

		"The slugified and lowercased title, used as a URL path"
		slug: String! @slug(field: "title")

		"The sections of the record."
		sections: [${BnfNode.RecordSection}!]!

		"Any treatment summaries that contain a link from or to this treatment summary"
		relatedTreatmentSummaries: [${BnfNode.TreatmentSummary}!]! @link

		"Any drugs linked from this treatment summary"
		relatedDrugs: [${BnfNode.Drug}!]! @link
	}
`;
