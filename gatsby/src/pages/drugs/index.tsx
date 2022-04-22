import { graphql } from "gatsby";
import { FC } from "react";

import {
	AtoZListPage,
	type AtoZLetter,
} from "@/components/AtoZListPage/AtoZListPage";

export interface DrugsIndexPageProps {
	data: {
		allDrugs: {
			letters: AtoZLetter[];
		};
	};
}

const DrugsIndexPage: FC<DrugsIndexPageProps> = ({
	data: {
		allDrugs: { letters },
	},
}) => (
	<AtoZListPage
		title="Drugs"
		path="drugs"
		metaDescription="Browse the complete list of drugs, alphabetically."
		letters={letters}
		pageDescription="Browse drug monographs by A-Z. Drug monographs describe the uses, doses, safety issues, medicinal forms and other considerations involved in the use of a drug."
	/>
);

export const query = graphql`
	{
		allDrugs: allBnfDrug(sort: { fields: title, order: ASC }) {
			letters: group(field: initial) {
				...DrugGroup
			}
		}
	}
`;

export default DrugsIndexPage;
