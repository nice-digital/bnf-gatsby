import { PageProps, Link, graphql } from "gatsby";
import React, { FC } from "react";

import { Breadcrumbs, Breadcrumb } from "@nice-digital/nds-breadcrumbs";
import { PageHeader } from "@nice-digital/nds-page-header";

import { AboutSectionMenu } from "@/components/AboutSectionMenu/AboutSectionMenu";
import { Layout } from "@/components/Layout/Layout";
import { SEO } from "@/components/SEO/SEO";
import { useSiteMetadata } from "@/hooks/useSiteMetadata";

export type CautionaryAdvisoryLabelsGuidancePageProps = PageProps<{
	currentPage: {
		title: string;
		sections: {
			order: number;
			title: string;
			slug: string;
			content: string;
		}[];
	};
}>;

const CautionaryAdvisoryLabelsGuidancePage: FC<
	CautionaryAdvisoryLabelsGuidancePageProps
> = ({
	data: {
		currentPage: { title, sections },
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

			<PageHeader heading="Guidance for cautionary and advisory labels" />

			<AboutSectionMenu />
		</Layout>
	);
};

export const query = graphql`
	query ($id: String) {
		currentPage: bnfCautionaryAndAdvisoryGuidance(id: { eq: $id }) {
			title
			sections {
				slug
				order
				title
				content
			}
		}
	}
`;

export default CautionaryAdvisoryLabelsGuidancePage;
