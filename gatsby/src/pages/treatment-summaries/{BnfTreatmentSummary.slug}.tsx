import { graphql, PageProps, Link } from "gatsby";
import React, { FC } from "react";

import { Breadcrumbs, Breadcrumb } from "@nice-digital/nds-breadcrumbs";
import { PageHeader } from "@nice-digital/nds-page-header";

import { Layout } from "@/components/Layout/Layout";
import { SEO } from "@/components/SEO/SEO";
import { useSiteMetadata } from "@/hooks/useSiteMetadata";

export type TreatmentSummaryPageProps = {
	data: {
		bnfTreatmentSummary: {
			title: string;
		};
	};
};

const TreatmentSummaryPage: FC<TreatmentSummaryPageProps> = ({
	data: {
		bnfTreatmentSummary: { title },
	},
}) => {
	const { siteTitleShort } = useSiteMetadata();

	return (
		<Layout>
			<SEO title={`${title} | Treatment summaries`} />

			<Breadcrumbs>
				<Breadcrumb to="https://www.nice.org.uk/">NICE</Breadcrumb>
				<Breadcrumb to="/" elementType={Link}>
					{siteTitleShort}
				</Breadcrumb>
				<Breadcrumb to="/treatment-summaries/" elementType={Link}>
					Treatment summaries A to Z
				</Breadcrumb>
				<Breadcrumb>{title}</Breadcrumb>
			</Breadcrumbs>

			<PageHeader
				id="content-start"
				heading={<div dangerouslySetInnerHTML={{ __html: title }} />}
			/>
		</Layout>
	);
};

export const query = graphql`
	query ($id: String) {
		bnfTreatmentSummary(id: { eq: $id }) {
			title
		}
	}
`;

export default TreatmentSummaryPage;
