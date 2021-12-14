import { graphql, PageProps, Link } from "gatsby";
import React, { FC } from "react";

import { Breadcrumbs, Breadcrumb } from "@nice-digital/nds-breadcrumbs";
import { PageHeader } from "@nice-digital/nds-page-header";

import { Layout } from "@/components/Layout/Layout";
import { SEO } from "@/components/SEO/SEO";
import { useSiteMetadata } from "@/hooks/useSiteMetadata";

const IndexPage: FC = () => {
	const { siteTitleShort } = useSiteMetadata();

	return (
		<Layout>
			<SEO title="Drugs A to Z" />

			<Breadcrumbs>
				<Breadcrumb to="https://www.nice.org.uk/">NICE</Breadcrumb>
				<Breadcrumb to="/" elementType={Link}>
					{siteTitleShort}
				</Breadcrumb>
				<Breadcrumb>Drugs A to Z</Breadcrumb>
			</Breadcrumbs>

			<PageHeader
				heading="Drugs A&nbsp;to&nbsp;Z"
				lead="Browse over 1600 drug monographs, arranged alphabetically."
			/>
		</Layout>
	);
};

export default IndexPage;
