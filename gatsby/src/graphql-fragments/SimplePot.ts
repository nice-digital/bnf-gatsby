import { graphql } from "gatsby";

export const RecordSection = graphql`
	fragment SimplePot on BnfSimplePot {
		potName
		slug
		drugClassContent {
			contentFor
			slug
			content
		}
		drugContent {
			contentFor
			slug
			content
		}
		prepContent {
			contentFor
			slug
			content
		}
	}
`;
