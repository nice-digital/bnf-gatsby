import { graphql } from "gatsby";

export const AtoZGroupFragments = graphql`
	fragment InteractantGroup on BnfInteractantGroupConnection {
		letter: fieldValue
		links: nodes {
			title
			slug
		}
	}
	fragment DrugGroup on BnfDrugGroupConnection {
		letter: fieldValue
		links: nodes {
			title
			slug
		}
	}
	fragment TreatmentSummaryGroup on BnfTreatmentSummaryGroupConnection {
		letter: fieldValue
		links: nodes {
			title
			slug
		}
	}
`;
