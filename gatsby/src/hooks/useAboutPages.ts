import { useStaticQuery, graphql } from "gatsby";

import { MenuPageLink } from "src/types";

type SlugLink = { title: string; slug: string };

export interface AboutPages {
	allBnfAboutSection: {
		aboutSectionPages: SlugLink[];
	};
	allBnfCautionaryAndAdvisoryGuidance: {
		labelsGuidancePages: SlugLink[];
	};
}

const slugToHref = ({ title, slug }: SlugLink): MenuPageLink => ({
	title,
	href: `/about/${slug}/`,
});

/**
 * Gets the lists of pages for the about section by combining:
 * - about sections
 * - cautionary/advisory labels
 * - cautionary/advisory guidance page(s)
 * from the feed.
 *
 * @returns The consolidated list of about pages
 */
export const useAboutPages = (): MenuPageLink[] => {
	const { allBnfAboutSection, allBnfCautionaryAndAdvisoryGuidance } =
		useStaticQuery<AboutPages>(
			graphql`
				query AboutPages {
					allBnfAboutSection(sort: { fields: order, order: ASC }) {
						aboutSectionPages: nodes {
							slug
							title
						}
					}
					allBnfCautionaryAndAdvisoryGuidance {
						labelsGuidancePages: nodes {
							title
							slug
						}
					}
				}
			`
		);

	return [
		...allBnfAboutSection.aboutSectionPages.map(slugToHref),
		{ title: "Labels", href: "/about/labels/" },
		...allBnfCautionaryAndAdvisoryGuidance.labelsGuidancePages.map(slugToHref),
	];
};
