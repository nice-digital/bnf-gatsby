import { graphql, PageProps, Link } from "gatsby";
import React, { FC } from "react";

import { Breadcrumbs, Breadcrumb } from "@nice-digital/nds-breadcrumbs";
import { PageHeader } from "@nice-digital/nds-page-header";

import { Layout } from "@/components/Layout/Layout";
import { SEO } from "@/components/SEO/SEO";
import { useSiteMetadata } from "@/hooks/useSiteMetadata";

export type InteractantPageProps = {
	data: {
		bnfInteractant: {
			title: string;
			drug: {
				title: string;
				slug: string;
			} | null;
		};
	};
};

const InteractantPage: FC<InteractantPageProps> = ({
	data: {
		bnfInteractant: { title, drug },
	},
}) => {
	const { siteTitleShort } = useSiteMetadata();

	return (
		<Layout>
			<SEO title={`${title} | Interactions`} />

			<Breadcrumbs>
				<Breadcrumb to="https://www.nice.org.uk/">NICE</Breadcrumb>
				<Breadcrumb to="/" elementType={Link}>
					{siteTitleShort}
				</Breadcrumb>
				<Breadcrumb to="/interactions/" elementType={Link}>
					Interactions A to Z
				</Breadcrumb>
				<Breadcrumb>{title}</Breadcrumb>
			</Breadcrumbs>

			<PageHeader
				id="content-start"
				heading={<div dangerouslySetInnerHTML={{ __html: title }} />}
				lead={
					drug ? (
						<Link to={`/drugs/${drug.slug}/`}>
							View drug monograph for {drug.title}
						</Link>
					) : null
				}
			/>
		</Layout>
	);
};

export const query = graphql`
	query ($id: String) {
		bnfInteractant(id: { eq: $id }) {
			title
			drug {
				title
				slug
			}
		}
	}
`;

export default InteractantPage;
