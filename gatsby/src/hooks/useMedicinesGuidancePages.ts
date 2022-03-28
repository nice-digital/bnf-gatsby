import { useStaticQuery, graphql } from "gatsby";

import { type MenuPageLink, type SlugAndTitle } from "@/utils";

export interface MedicinesGuidanceQueryResult {
	allBnfGuidance: {
		pages: SlugAndTitle[];
	};
}

const slugToHref = ({ title, slug }: SlugAndTitle): MenuPageLink => ({
	title,
	href: `/medicines-guidance/${slug}/`,
});

/**
 * Gets the lists of pages for the medicines guidance section
 *
 * @returns The consolidated list of medicines guidance pages
 */
export const useMedicinesGuidancePages = (): MenuPageLink[] => {
	const { allBnfGuidance } = useStaticQuery<MedicinesGuidanceQueryResult>(
		graphql`
			{
				allBnfGuidance(sort: { fields: order, order: ASC }) {
					pages: nodes {
						slug
						title
					}
				}
			}
		`
	);

	return allBnfGuidance.pages.map(slugToHref);
};
