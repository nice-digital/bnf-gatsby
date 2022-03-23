import { graphql } from "gatsby";

export const RecordSection = graphql`
	fragment SimplePot on BnfSimplePot {
		potName
		slug
		drugClassContent {
			contentFor
			content
		}
		drugContent {
			contentFor
			content
		}
		prepContent {
			contentFor
			content
		}
	}
`;
