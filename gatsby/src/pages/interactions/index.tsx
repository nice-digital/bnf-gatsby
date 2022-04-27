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
		metaDescription="Use the interactions A to Z to look up a drug and see which other drugs it interacts with and how serious those interactions are."
		letters={letters}
		pageDescription="Browse drugs by A to Z to check for interactions. Includes information on the severity of an interaction and the type of evidence to support it."
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
