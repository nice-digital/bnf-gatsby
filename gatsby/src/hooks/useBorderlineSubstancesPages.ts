import { useStaticQuery, graphql } from "gatsby";

import { SID, PHPID } from "@nice-digital/gatsby-source-bnf";

import { type MenuPageLink, type SlugAndTitle } from "@/utils";

export interface BorderlineSubstancesQueryResult {
	allBnfBorderlineSubstancesTaxonomyRoot: {
		pages: {
			slug: string;
			title: string;
		}[];
	};
}

const slugToHref = ({ title, slug }: SlugAndTitle): MenuPageLink => ({
	title,
	href: `/borderline-substances/${slug}/`,
});

/**
 * Gets the lists of pages for the borderline substances section
 *
 * @returns The consolidated list of borderline substances pages
 */
export const useBorderlineSubstancesPages = (): MenuPageLink[] => {
	const { allBnfBorderlineSubstancesTaxonomyRoot } =
		useStaticQuery<BorderlineSubstancesQueryResult>(
			graphql`
				{
					allBnfBorderlineSubstancesTaxonomyRoot {
						pages: nodes {
							slug
							title
						}
					}
				}
			`
		);

	return allBnfBorderlineSubstancesTaxonomyRoot.pages.map(slugToHref);
};
