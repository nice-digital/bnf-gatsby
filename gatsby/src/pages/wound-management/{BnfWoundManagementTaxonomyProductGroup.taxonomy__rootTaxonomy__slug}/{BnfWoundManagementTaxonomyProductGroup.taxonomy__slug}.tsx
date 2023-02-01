import { graphql, Link } from "gatsby";
import React, { type FC } from "react";

import { Breadcrumbs, Breadcrumb } from "@nice-digital/nds-breadcrumbs";
import { Grid, GridItem } from "@nice-digital/nds-grid";
import { PageHeader } from "@nice-digital/nds-page-header";

import { Accordion } from "@/components/Accordion/Accordion";
import { AccordionGroup } from "@/components/AccordionGroup/AccordionGroup";
import {
	SectionNav,
	type SectionNavProps,
} from "@/components/SectionNav/SectionNav";
import { SEO } from "@/components/SEO/SEO";
import { useSiteMetadata } from "@/hooks/useSiteMetadata";
import { decapitalize } from "@/utils";

import styles from "./{BnfWoundManagementTaxonomyProductGroup.taxonomy__slug}.module.scss";

export interface WoundManagementProductPageProps {
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
					slug: string;
					description: string;
					products: {
						name: string;
						manufacturer: string;
						packs: {
							nhsIndicativePrice: string;
							colour: string | null;
						}[];
					}[];
				}[];
			};
		};
	};
}

const WoundManagementProductPage: FC<WoundManagementProductPageProps> = ({
	data: {
		bnfWoundManagementTaxonomyProductGroup: {
			taxonomy: { title, text, rootTaxonomy, productGroups },
		},
	},
}) => {
	const { siteTitleShort } = useSiteMetadata(),
		sortedProductGroups = productGroups.sort((a, b) =>
			a.title > b.title ? 1 : -1
		),
		navSections: SectionNavProps = {
			sections: sortedProductGroups.map(({ title, slug }) => {
				return {
					id: slug,
					title,
				};
			}),
		};

	return (
		<>
			<SEO
				title={`${title} | ${rootTaxonomy.title} | Wound management`}
				description={`This wound management topic describes the options that are currently recommended for ${decapitalize(
					title
				)}`}
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
					to={`/wound-management/${rootTaxonomy.slug}/`}
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
					<Link className="p" to={`/wound-management/${rootTaxonomy.slug}/`}>
						View other {rootTaxonomy.title.toLowerCase()}
					</Link>
				}
			/>

			<Grid gutter="loose">
				<GridItem cols={12} lg={9}>
					<SectionNav {...navSections} />

					{text && <div dangerouslySetInnerHTML={{ __html: text }}></div>}

					<AccordionGroup
						toggleText={(isOpen) =>
							`${isOpen ? "Hide" : "Show"} all ${title.toLowerCase()}  (${
								sortedProductGroups.length
							})`
						}
					>
						<ul
							className={styles.productGroupList}
							aria-label={`List of products: ${title}`}
						>
							{sortedProductGroups.map(
								({ title, slug, description, products }) => (
									<li key={title}>
										<Accordion
											title={
												<div>
													<h2 className={styles.productGroupHeading} id={slug}>
														{title}
													</h2>
													{description && (
														<div
															dangerouslySetInnerHTML={{ __html: description }}
														></div>
													)}
												</div>
											}
										>
											{products.length > 0 ? (
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
																	{name}{" "}
																	{packs[0]?.colour && `(${packs[0]?.colour}) `}
																	<span className={styles.manufacturer}>
																		{manufacturer}
																	</span>
																</td>
																<td>
																	{packs[0]?.nhsIndicativePrice || "£0.00"}
																</td>
															</tr>
														))}
													</tbody>
												</table>
											) : (
												<p>
													Please note, there is currently no specific
													information about this product.
												</p>
											)}
										</Accordion>
									</li>
								)
							)}
						</ul>
					</AccordionGroup>
				</GridItem>
			</Grid>
		</>
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
					slug
					description
					products {
						name
						manufacturer
						packs {
							nhsIndicativePrice
							colour
						}
					}
				}
			}
		}
	}
`;

export default WoundManagementProductPage;
