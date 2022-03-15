import { graphql } from "gatsby";

export const RecordSection = graphql`
	fragment NationalFundingContent on BnfNationalFundingPotContent {
		contentFor
		initialText
		niceDecisions {
			approvedForUse
			fundingIdentifier
			slug
			title
			url
		}
		smcDecisions {
			approvedForUse
			fundingIdentifier
			slug
			title
			url
		}
		awmsgDecisions {
			approvedForUse
			fundingIdentifier
			slug
			title
			url
		}
	}
`;
