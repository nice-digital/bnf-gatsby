import { graphql, Link } from "gatsby";
import React, { type FC } from "react";

import { Breadcrumbs, Breadcrumb } from "@nice-digital/nds-breadcrumbs";
import { PageHeader } from "@nice-digital/nds-page-header";

import { Layout } from "@/components/Layout/Layout";
import { SEO } from "@/components/SEO/SEO";
import { useSiteMetadata } from "@/hooks/useSiteMetadata";

export interface WoundManagementPricingPageProps {
	data: {
		bnfWoundManagementTaxonomyProductGroup: {
			taxonomy: {
				title: string;
				slug: string;
				text: string | null;
			};
		};
	};
}

const WoundManagementPricingPage: FC<WoundManagementPricingPageProps> = ({
	data: {
		bnfWoundManagementTaxonomyProductGroup: {
			taxonomy: { slug, title },
		},
	},
}) => {
	const { siteTitleShort } = useSiteMetadata();

	return (
		<Layout>
			<SEO
				title={title}
				description={`This wound management topic describes the options that are currently recommended for ${title}`}
			/>

			<Breadcrumbs>
				<Breadcrumb to="https://www.nice.org.uk/">NICE</Breadcrumb>
				<Breadcrumb to="/" elementType={Link}>
					{siteTitleShort}
				</Breadcrumb>
				<Breadcrumb to="/wound-management/" elementType={Link}>
					Wound management products and elasticated garments
				</Breadcrumb>
				<Breadcrumb>{title}</Breadcrumb>
			</Breadcrumbs>

			<PageHeader
				id="content-start"
				heading={<span dangerouslySetInnerHTML={{ __html: title }} />}
			/>

			<p>{title}</p>
			<p>{slug}</p>
		</Layout>
	);
};

export const query = graphql`
	query ($id: String) {
		bnfWoundManagementTaxonomyProductGroup(id: { eq: $id }) {
			taxonomy {
				title
				slug
				text
			}
		}
	}
`;

export default WoundManagementPricingPage;
