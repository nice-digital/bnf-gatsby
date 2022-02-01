import { BnfNode } from "../node-types";

export const cautionaryAndAdvisoryLabelSchema = `
	type ${BnfNode.CautionaryAndAdvisoryLabel} implements Node @dontInfer {
		number: Int!

		"A description of the label. May contain HTML mark-up. "
		description: String!

		"The label recommendation in English."
		englishRecommendation: String!

		"The Welsh translation of the label recommendation."
		welshRecommendation: String!
	}
`;
