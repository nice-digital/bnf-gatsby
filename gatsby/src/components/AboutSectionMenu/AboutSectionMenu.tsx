import { useLocation } from "@reach/router";
import { useStaticQuery, graphql, Link } from "gatsby";
import React, { FC } from "react";

import { StackedNav, StackedNavLink } from "@nice-digital/nds-stacked-nav";

interface AboutPage {
	slug: string;
	title: string;
}

export interface AboutSectionMenuData {
	allBnfAboutSection: {
		allAboutPages: AboutPage[];
	};
	allBnfCautionaryAndAdvisoryGuidance: {
		allCautionaryAdvisoryGuidancePages: AboutPage[];
	};
}

export const AboutSectionMenu: FC = () => {
	const {
		allBnfAboutSection: { allAboutPages },
		allBnfCautionaryAndAdvisoryGuidance: { allCautionaryAdvisoryGuidancePages },
	} = useStaticQuery<AboutSectionMenuData>(graphql`
		{
			allBnfAboutSection(sort: { fields: order, order: ASC }) {
				allAboutPages: nodes {
					title
					slug
				}
			}
			allBnfCautionaryAndAdvisoryGuidance {
				allCautionaryAdvisoryGuidancePages: nodes {
					title
					slug
				}
			}
		}
	`);

	const { pathname: currentPath } = useLocation();

	return (
		<StackedNav
			aria-label="About section pages"
			label="About"
			link={{ destination: "/about/", elementType: Link }}
		>
			{allAboutPages
				.concat(allCautionaryAdvisoryGuidancePages)
				.concat({
					slug: "labels",
					title: "Labels",
				})
				.map(({ slug, title }) => {
					const pagePath = `/about/${slug}/`;

					return (
						<StackedNavLink
							key={slug}
							destination={pagePath}
							elementType={Link}
							isCurrent={pagePath === currentPath}
						>
							<span dangerouslySetInnerHTML={{ __html: title }} />
						</StackedNavLink>
					);
				})}
		</StackedNav>
	);
};
