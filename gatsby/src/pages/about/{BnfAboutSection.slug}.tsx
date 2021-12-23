import { graphql, PageProps, Link } from "gatsby";
import React, { FC } from "react";

import { Breadcrumbs, Breadcrumb } from "@nice-digital/nds-breadcrumbs";
import { PageHeader } from "@nice-digital/nds-page-header";

import { Layout } from "@/components/Layout/Layout";
import { SEO } from "@/components/SEO/SEO";
import { useSiteMetadata } from "@/hooks/useSiteMetadata";

export type AboutDetailsPageProps = PageProps<{
	bnfAboutSection: {
		title: string;
		sections: {
			order: number;
			title: string;
			slug: string;
			content: string;
		}[];
	};
}>;

const AboutDetailsPage: FC<AboutDetailsPageProps> = ({
	data: {
		bnfAboutSection: { title, sections },
	},
}) => {
	const { siteTitleShort } = useSiteMetadata();

	return (
		<Layout>
			<SEO title={`${title} | About`} />

			<Breadcrumbs>
				<Breadcrumb to="https://www.nice.org.uk/">NICE</Breadcrumb>
				<Breadcrumb to="/" elementType={Link}>
					{siteTitleShort}
				</Breadcrumb>
				<Breadcrumb to="/about/" elementType={Link}>
					About
				</Breadcrumb>
				<Breadcrumb>{title}</Breadcrumb>
			</Breadcrumbs>

			<PageHeader
				heading={<div dangerouslySetInnerHTML={{ __html: title }} />}
			/>

			{sections
				.sort((a, b) => a.order - b.order)
				.map((section) => (
					<section key={section.slug} aria-labelledby={section.slug}>
						<h2
							id={section.slug}
							dangerouslySetInnerHTML={{ __html: section.title }}
						/>
						<div dangerouslySetInnerHTML={{ __html: section.content }} />
					</section>
				))}
		</Layout>
	);
};

export const query = graphql`
	query ($id: String) {
		bnfAboutSection(id: { eq: $id }) {
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

export default AboutDetailsPage;
