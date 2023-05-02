import { Link, graphql } from "gatsby";
import React, { FC } from "react";
import { Except } from "type-fest";

import { FeedLabel } from "@nice-digital/gatsby-source-bnf";

import { AboutSectionMenu } from "@/components/AboutSectionMenu/AboutSectionMenu";
import {
	CautionaryAndAdvisoryLabel,
	generateId,
	generateTitle,
} from "@/components/CautionaryAndAdvisoryLabel/CautionaryAndAdvisoryLabel";
import { DetailsPageLayout } from "@/components/DetailsPageLayout/DetailsPageLayout";
import { useSiteMetadata } from "@/hooks/useSiteMetadata";

export type CautionaryAdvisoryLabelsPageProps = {
	data: {
		allBnfCautionaryAndAdvisoryLabel: {
			advisoryLabels: Except<FeedLabel, "qualifier">[];
		};
	};
};

export const CautionaryAdvisoryLabelsPage: FC<
	CautionaryAdvisoryLabelsPageProps
> = ({
	data: {
		allBnfCautionaryAndAdvisoryLabel: { advisoryLabels },
	},
}) => {
	const { siteTitleShort } = useSiteMetadata();

	return (
		<DetailsPageLayout
			titleHtml={"Cautionary and advisory labels"}
			parentTitleParts={["About"]}
			parentBreadcrumbs={[{ href: "/about/", text: "About" }]}
			menu={AboutSectionMenu}
			sections={advisoryLabels.map((label) => {
				return {
					id: generateId(label.number),
					title: generateTitle(label.number),
				};
			})}
			metaDescription={`List of the ${advisoryLabels.length} cautionary, warning and advisory labels applied to the medications used in the ${siteTitleShort}, as found in appendix 3 of the printed edition.`}
		>
			<p>
				<Link to="/about/guidance-for-cautionary-and-advisory-labels/">
					View guidance for cautionary and advisory labels
				</Link>
			</p>
			<ol className="list--unstyled">
				{advisoryLabels.map((label) => (
					<li key={label.number}>
						<CautionaryAndAdvisoryLabel {...label} />
					</li>
				))}
			</ol>
		</DetailsPageLayout>
	);
};

export const query = graphql`
	{
		allBnfCautionaryAndAdvisoryLabel(sort: { number: ASC }) {
			advisoryLabels: nodes {
				description
				englishRecommendation
				welshRecommendation
				number
			}
		}
	}
`;

export default CautionaryAdvisoryLabelsPage;
