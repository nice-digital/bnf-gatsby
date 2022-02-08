import { graphql } from "gatsby";
import { type FC } from "react";

import {
	AtoZListPage,
	type AtoZLetter,
} from "@/components/AtoZListPage/AtoZListPage";

export type TreatmentSummariesIndexPageProps = {
	data: {
		allTreatmentSummaries: {
			letters: AtoZLetter[];
		};
	};
};

const TreatmentSummariesIndexPage: FC<TreatmentSummariesIndexPageProps> = ({
	data: {
		allTreatmentSummaries: { letters },
	},
}) => (
	<AtoZListPage
		title="Treatment summaries"
		path="treatment-summaries"
		data={letters}
	/>
);

export const query = graphql`
	{
		allTreatmentSummaries: allBnfTreatmentSummary(
			sort: { fields: title, order: ASC }
		) {
			letters: group(field: initial) {
				letter: fieldValue
				links: nodes {
					title
					slug
				}
			}
		}
	}
`;

export default TreatmentSummariesIndexPage;
