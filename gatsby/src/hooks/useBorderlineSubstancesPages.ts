import { useStaticQuery, graphql } from "gatsby";

import { type MenuPageLink, type SlugAndTitle } from "@/utils";

interface TaxonomySlug {
	taxonomy: SlugAndTitle;
}

export interface BorderlineSubstancesQueryResult {
	allBnfBorderlineSubstancesTaxonomyRoot: {
		nodes: TaxonomySlug[];
	};
}

const slugToHref = ({
	taxonomy: { slug, title },
}: TaxonomySlug): MenuPageLink => ({
	title,
	href: `/borderline-substances/${slug}/`,
});

const query = graphql`
	{
		allBnfBorderlineSubstancesTaxonomyRoot {
			nodes {
				taxonomy {
					slug
					title
				}
			}
		}
	}
`;

/**
 * Gets the lists of pages for the borderline substances section
 *
 * @returns The consolidated list of borderline substances pages
 */
export const useBorderlineSubstancesPages = (): MenuPageLink[] =>
	useStaticQuery<BorderlineSubstancesQueryResult>(
		query
	).allBnfBorderlineSubstancesTaxonomyRoot.nodes.map(slugToHref);
