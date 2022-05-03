import slugify from "@sindresorhus/slugify";
import { graphql, Link } from "gatsby";
import React, { type FC } from "react";
import striptags from "striptags";

import { Breadcrumbs, Breadcrumb } from "@nice-digital/nds-breadcrumbs";
import { PageHeader } from "@nice-digital/nds-page-header";

import { Layout } from "@/components/Layout/Layout";
import {
	SectionNav,
	type SectionNavProps,
} from "@/components/SectionNav/SectionNav";
import { SEO } from "@/components/SEO/SEO";
import { useSiteMetadata } from "@/hooks/useSiteMetadata";

import styles from "./{BnfWoundManagementTaxonomyProductGroup.taxonomy__slug}.module.scss";

export interface WoundManagementPricingPageProps {
	data: {
		bnfWoundManagementTaxonomyProductGroup: {
			taxonomy: {
				title: string;
				text: string;
				rootTaxonomy: {
					slug: string;
					title: string;
				};
				productGroups: {
					title: string;
					description: string;
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
			taxonomy: { title, text, rootTaxonomy, productGroups },
		},
	},
}) => {
	const { siteTitleShort } = useSiteMetadata();

	const navSections: SectionNavProps = {
		sections: productGroups.map(({ title }) => {
			return {
				id: slugify(striptags(title)),
				title,
			};
		}),
	};

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
				lead={
					<Link className="p" to={`/wound-management/${rootTaxonomy.slug}`}>
						View other {rootTaxonomy.title.toLowerCase()}
					</Link>
				}
			/>

			<SectionNav {...navSections} />

			{text && <div dangerouslySetInnerHTML={{ __html: text }}></div>}

			<ul className={styles.productGroupList}>
				{productGroups.map(({ title, description, products }) => (
					<li key={title}>
						<h2 id={slugify(striptags(title))}>{title}</h2>
						{description && (
							<div dangerouslySetInnerHTML={{ __html: description }}></div>
						)}
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
										<td>{packs[0]?.nhsIndicativePrice}</td>
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
				text
				rootTaxonomy {
					slug
					title
				}
				productGroups {
					title
					description
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
