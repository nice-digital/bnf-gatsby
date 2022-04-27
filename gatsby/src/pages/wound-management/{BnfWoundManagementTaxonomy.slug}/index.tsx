import { graphql, Link } from "gatsby";
import React, { type FC } from "react";

import { Breadcrumbs, Breadcrumb } from "@nice-digital/nds-breadcrumbs";
import { PageHeader } from "@nice-digital/nds-page-header";

import { Layout } from "@/components/Layout/Layout";
import { SEO } from "@/components/SEO/SEO";
import { useSiteMetadata } from "@/hooks/useSiteMetadata";

export interface WoundManagementTaxonomyPageProps {
	data: {
		bnfWoundManagementTaxonomy: {
			title: string;
			slug: string;
			text: string;
			childTaxonomies: {
				title: string;
				slug: string;
				text: string;
				childTaxonomies: {
					title: string;
					slug: string;
				}[];
			}[];
		};
	};
}

const WoundManagementTaxonomyPage: FC<WoundManagementTaxonomyPageProps> = ({
	data: {
		bnfWoundManagementTaxonomy: { slug, title, text, childTaxonomies },
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

			<div dangerouslySetInnerHTML={{ __html: text }}></div>

			{childTaxonomies.length > 0 && (
				<ul>
					{childTaxonomies.map((child) => (
						<>
							<h2>{child.title}</h2>
							<div dangerouslySetInnerHTML={{ __html: child.text }}></div>
							{child.childTaxonomies.length > 0 ? (
								<ul>
									{child.childTaxonomies.map((nestedChild) => (
										<li key={nestedChild.slug}>
											<Link
												to={`/wound-management/${slug}/${nestedChild.slug}`}
											>
												{nestedChild.title}
											</Link>
										</li>
									))}
								</ul>
							) : (
								<ul>
									<li>
										<Link to={`/wound-management/${slug}/${child.slug}`}>
											{child.title}
										</Link>
									</li>
								</ul>
							)}
						</>
					))}
				</ul>
			)}
		</Layout>
	);
};

export const query = graphql`
	query ($id: String) {
		bnfWoundManagementTaxonomy(id: { eq: $id }) {
			title
			slug
			text
			childTaxonomies {
				title
				slug
				text
				childTaxonomies {
					title
					slug
				}
			}
		}
	}
`;

export default WoundManagementTaxonomyPage;
