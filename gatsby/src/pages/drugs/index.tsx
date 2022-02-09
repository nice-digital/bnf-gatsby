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
}) => <AtoZListPage title="Drugs" path="drugs" letters={letters} />;

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
