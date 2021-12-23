import { graphql, PageProps, Link } from "gatsby";
import { FC } from "react";

import { Breadcrumbs, Breadcrumb } from "@nice-digital/nds-breadcrumbs";
import { PageHeader } from "@nice-digital/nds-page-header";

import { Layout } from "@/components/Layout/Layout";
import { SEO } from "@/components/SEO/SEO";
import { useSiteMetadata } from "@/hooks/useSiteMetadata";

export type DrugsIndexPageProps = PageProps<{
	allDrugs: {
		group: {
			fieldValue: string;
			nodes: {
				title: string;
				slug: string;
			}[];
		}[];
	};
}>;

const DrugsIndexPage: FC<DrugsIndexPageProps> = ({ data: { allDrugs } }) => {
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

			<ol>
				{allDrugs.group.map(({ fieldValue, nodes }) => (
					<li key={fieldValue}>
						<h2>{fieldValue}</h2>

						<ol>
							{nodes.map(({ title, slug }) => (
								<li key={slug}>
									<Link
										to={`/drugs/${slug}/`}
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
		allDrugs: allBnfDrug(sort: { fields: title, order: ASC }) {
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

export default DrugsIndexPage;
