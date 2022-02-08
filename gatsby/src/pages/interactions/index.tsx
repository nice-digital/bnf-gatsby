import { graphql, PageProps, Link } from "gatsby";
import { FC } from "react";

import { Breadcrumbs, Breadcrumb } from "@nice-digital/nds-breadcrumbs";
import { PageHeader } from "@nice-digital/nds-page-header";

import { Layout } from "@/components/Layout/Layout";
import { SEO } from "@/components/SEO/SEO";
import { useSiteMetadata } from "@/hooks/useSiteMetadata";

export type InteractionsIndexPageProps = PageProps<{
	allInteractants: {
		group: {
			fieldValue: string;
			nodes: {
				title: string;
				slug: string;
			}[];
		}[];
	};
}>;

const InteractionsIndexPage: FC<InteractionsIndexPageProps> = ({
	data: { allInteractants },
}) => {
	const { siteTitleShort } = useSiteMetadata();

	return (
		<Layout>
			<SEO title="Interactions A to Z" />

			<Breadcrumbs>
				<Breadcrumb to="https://www.nice.org.uk/">NICE</Breadcrumb>
				<Breadcrumb to="/" elementType={Link}>
					{siteTitleShort}
				</Breadcrumb>
				<Breadcrumb>Interactions A to Z</Breadcrumb>
			</Breadcrumbs>

			<PageHeader id="content-start" heading="Interactions A&nbsp;to&nbsp;Z" />

			<ol>
				{allInteractants.group.map(({ fieldValue, nodes }) => (
					<li key={fieldValue}>
						<h2>{fieldValue}</h2>

						<ol>
							{nodes.map(({ title, slug }) => (
								<li key={slug}>
									<Link
										to={`/interactions/${slug}/`}
										dangerouslySetInnerHTML={{ __html: title }}
									/>
								</li>
							))}
						</ol>
					</li>
				))}
			</ol>
		</Layout>
	);
};

export const query = graphql`
	{
		allInteractants: allBnfInteractant(sort: { fields: title, order: ASC }) {
			group(field: initial) {
				fieldValue
				nodes {
					title
					slug
				}
			}
		}
	}
`;

export default InteractionsIndexPage;
