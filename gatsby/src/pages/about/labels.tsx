import { PageProps, Link, graphql } from "gatsby";
import React, { FC } from "react";

import { Breadcrumbs, Breadcrumb } from "@nice-digital/nds-breadcrumbs";
import { PageHeader } from "@nice-digital/nds-page-header";

import { CautionaryAndAdvisoryLabel } from "@/components/CautionaryAndAdvisoryLabel/CautionaryAndAdvisoryLabel";
import { Layout } from "@/components/Layout/Layout";
import { SEO } from "@/components/SEO/SEO";
import { useSiteMetadata } from "@/hooks/useSiteMetadata";

export type CautionaryAdvisoryLabelsPageProps = PageProps<{
	allBnfCautionaryAndAdvisoryLabel: {
		advisoryLabels: {
			description: string;
			englishRecommendation: string;
			welshRecommendation: string;
			number: number;
		}[];
	};
}>;

const CautionaryAdvisoryLabelsGuidancePage: FC<
	CautionaryAdvisoryLabelsPageProps
> = ({
	data: {
		allBnfCautionaryAndAdvisoryLabel: { advisoryLabels },
	},
}) => {
	const { siteTitleShort } = useSiteMetadata();

	return (
		<Layout>
			<SEO title={`Guidance for cautionary and advisory labels | About`} />

			<Breadcrumbs>
				<Breadcrumb to="https://www.nice.org.uk/">NICE</Breadcrumb>
				<Breadcrumb to="/" elementType={Link}>
					{siteTitleShort}
				</Breadcrumb>
				<Breadcrumb to="/about/" elementType={Link}>
					About
				</Breadcrumb>
				<Breadcrumb>Guidance for cautionary and advisory labels</Breadcrumb>
			</Breadcrumbs>

			<PageHeader heading="Cautionary and advisory labels" />
			<ol>
				{advisoryLabels.map((label) => (
					<li key={label.number}>
						<CautionaryAndAdvisoryLabel {...label} />
					</li>
				))}
			</ol>
		</Layout>
	);
};

export const query = graphql`
	{
		allBnfCautionaryAndAdvisoryLabel(sort: { fields: number, order: ASC }) {
			advisoryLabels: nodes {
				description
				englishRecommendation
				welshRecommendation
				number
			}
		}
	}
`;

export default CautionaryAdvisoryLabelsGuidancePage;
