import { graphql } from "gatsby";

export const RecordSection = graphql`
	fragment FundingDecision on BnfFundingDecision {
		approvedForUse
		fundingIdentifier
		slug
		title
		url
	}

	fragment NationalFundingContent on BnfNationalFundingPotContent {
		contentFor
		initialText
		niceDecisionsTitle
		niceDecisions {
			...FundingDecision
		}
		smcDecisionsTitle
		smcDecisions {
			...FundingDecision
		}
		awmsgDecisionsTitle
		awmsgDecisions {
			...FundingDecision
		}
		nonNhsTitle
		nonNhs
	}
`;
