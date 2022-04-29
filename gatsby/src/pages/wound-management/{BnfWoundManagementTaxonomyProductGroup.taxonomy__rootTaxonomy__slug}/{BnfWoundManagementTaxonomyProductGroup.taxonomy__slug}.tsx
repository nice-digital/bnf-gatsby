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
				rootTaxonomy: {
					slug: string;
					title: string;
				};
				productGroups: {
					title: string;
					products: {
						name: string;
						manufacturer: string;
						packs: {
							nhsIndicativePrice: string;
						}[];
					}[];
				}[];
			};
		};
	};
}

const WoundManagementPricingPage: FC<WoundManagementPricingPageProps> = ({
	data: {
		bnfWoundManagementTaxonomyProductGroup: {
			taxonomy: { title, rootTaxonomy, productGroups },
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
				<Breadcrumb
					to={`/wound-management/${rootTaxonomy.slug}`}
					elementType={Link}
				>
					{rootTaxonomy.title}
				</Breadcrumb>
				<Breadcrumb>{title}</Breadcrumb>
			</Breadcrumbs>

			<PageHeader
				id="content-start"
				heading={<span dangerouslySetInnerHTML={{ __html: title }} />}
			/>

			<ul>
				{productGroups.map(({ title, products }) => (
					<li key={title}>
						<h2>{title}</h2>
						<table>
							<thead>
								<tr>
									<th>Product</th>
									<th>Price</th>
								</tr>
							</thead>
							<tbody>
								{products.map(({ name, manufacturer, packs }) => (
									<tr key={name}>
										<td>
											{name} <span>{manufacturer}</span>
										</td>
										<td>{packs[0].nhsIndicativePrice}</td>
									</tr>
								))}
							</tbody>
						</table>
					</li>
				))}
			</ul>
		</Layout>
	);
};

export const query = graphql`
	query ($id: String) {
		bnfWoundManagementTaxonomyProductGroup(id: { eq: $id }) {
			taxonomy {
				title
				rootTaxonomy {
					slug
					title
				}
				productGroups {
					title
					products {
						name
						manufacturer
						packs {
							nhsIndicativePrice
						}
					}
				}
			}
		}
	}
`;

export default WoundManagementPricingPage;
