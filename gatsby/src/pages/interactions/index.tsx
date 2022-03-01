import { graphql } from "gatsby";
import { FC } from "react";

import {
	AtoZListPage,
	type AtoZLetter,
} from "@/components/AtoZListPage/AtoZListPage";

export interface InteractionsIndexPageProps {
	data: {
		allInteractants: {
			letters: AtoZLetter[];
		};
	};
}

const InteractionsIndexPage: FC<InteractionsIndexPageProps> = ({
	data: {
		allInteractants: { letters },
	},
}) => (
	<AtoZListPage
		title="Interactions"
		path="interactions"
		metaDescription="Look up a drug to see which other drugs it interacts with and how serious those interactions are."
		letters={letters}
	/>
);

export const query = graphql`
	{
		allInteractants: allBnfInteractant(sort: { fields: title, order: ASC }) {
			letters: group(field: initial) {
				...InteractantGroup
			}
		}
	}
`;

export default InteractionsIndexPage;