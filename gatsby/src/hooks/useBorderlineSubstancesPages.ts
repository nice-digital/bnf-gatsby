import { useStaticQuery, graphql } from "gatsby";

import { SID, PHPID } from "@nice-digital/gatsby-source-bnf";

import { type MenuPageLink, type SlugAndTitle } from "@/utils";

export interface BorderlineSubstancesQueryResult {
	allBnfBorderlineSubstancesTaxonomy: {
		pages: {
			slug: string;
			title: string;
			parentTaxonomy: {
				id: SID | PHPID;
			} | null;
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
	const { allBnfBorderlineSubstancesTaxonomy } =
		useStaticQuery<BorderlineSubstancesQueryResult>(
			graphql`
				{
					allBnfBorderlineSubstancesTaxonomy {
						pages: nodes {
							slug
							title
							parentTaxonomy {
								id
							}
						}
					}
				}
			`
		);

	const topLevel = allBnfBorderlineSubstancesTaxonomy.pages.filter(
		(taxonomy) => taxonomy.parentTaxonomy == null
	);

	return topLevel.map(slugToHref);
};
