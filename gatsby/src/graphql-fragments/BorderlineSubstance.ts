import { graphql } from "gatsby";

export const BnfBorderlineSubstance = graphql`
	fragment FullSubstance on BnfBorderlineSubstance {
		id
		title
		slug
		introductionNote
		presentations {
			...FullPresentation
		}
	}
`;
