import { graphql } from "gatsby";
import { type FC } from "react";

import {
	AtoZListPage,
	type AtoZLetter,
} from "@/components/AtoZListPage/AtoZListPage";

export interface TreatmentSummariesIndexPageProps {
	data: {
		allTreatmentSummaries: {
			letters: AtoZLetter[];
		};
	};
}

const TreatmentSummariesIndexPage: FC<TreatmentSummariesIndexPageProps> = ({
	data: {
		allTreatmentSummaries: { letters },
	},
}) => (
	<AtoZListPage
		title="Treatment summaries"
		path="treatment-summaries"
		metaDescription="Browse the complete list of treatment summaries, alphabetically."
		letters={letters}
	/>
);

export const query = graphql`
	{
		allTreatmentSummaries: allBnfTreatmentSummary(
			sort: { fields: title, order: ASC }
		) {
			letters: group(field: initial) {
				...TreatmentSummaryGroup
			}
		}
	}
`;

export default TreatmentSummariesIndexPage;
