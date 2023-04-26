import { useStaticQuery, graphql } from "gatsby";

import { type MenuPageLink, type SlugAndTitle } from "@/utils";

export interface AboutPages {
	allBnfAboutSection: {
		aboutSectionPages: SlugAndTitle[];
	};
	allBnfCautionaryAndAdvisoryGuidance: {
		labelsGuidancePages: SlugAndTitle[];
	};
}

const slugToHref = ({ title, slug }: SlugAndTitle): MenuPageLink => ({
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
					allBnfAboutSection(sort: { order: ASC }) {
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
