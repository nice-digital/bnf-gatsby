export const cautionaryAndAdvisoryLabelSchema = `
	type BnfCautionaryAndAdvisoryLabel implements Node @dontInfer {
		number: Int!

		"A description of the label. May contain HTML mark-up. "
		description: String!

		"The label recommendation in English."
		englishRecommendation: String!

		"The Welsh translation of the label recommendation."
		welshRecommendation: String!
	}
`;
