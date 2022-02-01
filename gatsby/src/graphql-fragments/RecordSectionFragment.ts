import { graphql } from "gatsby";

export const RecordSection = graphql`
	fragment RecordSection on BnfRecordSection {
		title
		slug
		content
		order
	}
`;
