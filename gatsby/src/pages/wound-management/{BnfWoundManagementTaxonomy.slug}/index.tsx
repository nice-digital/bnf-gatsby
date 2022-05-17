import { useLocation } from "@reach/router";
import { graphql, Link } from "gatsby";
import React, { type FC } from "react";

import { FeedPrep } from "@nice-digital/gatsby-source-bnf";
import { Breadcrumbs, Breadcrumb } from "@nice-digital/nds-breadcrumbs";
import { Grid, GridItem } from "@nice-digital/nds-grid";
import { PageHeader } from "@nice-digital/nds-page-header";
import { StackedNav, StackedNavLink } from "@nice-digital/nds-stacked-nav";

import {
	SectionNav,
	type SectionNavProps,
} from "@/components/SectionNav/SectionNav";
import { SEO } from "@/components/SEO/SEO";
import { useSiteMetadata } from "@/hooks/useSiteMetadata";
import { decapitalize } from "@/utils";

import styles from "./index.module.scss";

export type ProductGroup = {
	title: string;
	description: string;
	products: FeedPrep[];
};

export interface WoundManagementTaxonomyPageProps {
	data: {
		allBnfWoundManagementTaxonomy: {
			taxonomies: {
				title: string;
				slug: string;
			}[];
		};
		bnfWoundManagementTaxonomy: {
			title: string;
			slug: string;
			text: string | null;
			childTaxonomies: {
				title: string;
				slug: string;
				text: string | null;
				productGroups: ProductGroup[];
				childTaxonomies: {
					title: string;
					slug: string;
				}[];
			}[];
		};
	};
}

const productGroupsHaveNoInfo = (productGroups: ProductGroup[]) => {
	let groupsHaveNoInfo = true;
	for (const group of productGroups) {
		if (group.products?.length) {
			groupsHaveNoInfo = false;
			break;
		}
	}

	return groupsHaveNoInfo;
};

const WoundManagementTaxonomyPage: FC<WoundManagementTaxonomyPageProps> = ({
	data: {
		allBnfWoundManagementTaxonomy: { taxonomies },
		bnfWoundManagementTaxonomy: { slug, title, text, childTaxonomies },
	},
}) => {
	const { siteTitleShort } = useSiteMetadata(),
		{ pathname } = useLocation(),
		sortedTaxonomies = childTaxonomies.sort((a, b) =>
			a.title > b.title ? 1 : -1
		),
		navSections: SectionNavProps = {
			sections: sortedTaxonomies.map(({ slug, title }) => {
				return {
					id: slug,
					title,
				};
			}),
		};

	return (
		<>
			<SEO
				title={`${title} | Wound management`}
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
				<Breadcrumb>{title}</Breadcrumb>
			</Breadcrumbs>

			<PageHeader
				id="content-start"
				heading={<span dangerouslySetInnerHTML={{ __html: title }} />}
			/>

			<Grid gutter="loose" data-testid="body">
				<GridItem cols={12} md={4} lg={3} className="hide-print">
					<StackedNav
						aria-label="Wound management product pages"
						label="Wound management products"
						link={{ destination: "/wound-management/", elementType: Link }}
					>
						{taxonomies.map(({ slug, title }) => (
							<StackedNavLink
								key={slug}
								destination={`/wound-management/${slug}/`}
								elementType={Link}
								isCurrent={pathname.includes(slug)}
							>
								<span dangerouslySetInnerHTML={{ __html: title }} />
							</StackedNavLink>
						))}
					</StackedNav>
				</GridItem>
				<GridItem cols={12} md={8} lg={9}>
					<SectionNav {...navSections} />
					{text && <div dangerouslySetInnerHTML={{ __html: text }}></div>}

					{sortedTaxonomies.length > 0 && (
						<ul
							className={styles.childTaxonomyList}
							aria-label={`List of ${title.toLowerCase()}`}
						>
							{childTaxonomies.map((child) => {
								return (
									<li key={child.slug}>
										<h2 id={child.slug}>{child.title}</h2>
										{child.text && (
											<div
												dangerouslySetInnerHTML={{ __html: child.text }}
											></div>
										)}
										{child.productGroups.length > 0 &&
											productGroupsHaveNoInfo(child.productGroups) &&
											child.productGroups.map(({ title, description }) => (
												<>
													<h3>{title}</h3>
													<div
														dangerouslySetInnerHTML={{ __html: description }}
													></div>
													<p>
														Please note, there is currently no specific
														information about this product.
													</p>
												</>
											))}
										{child.childTaxonomies.length > 0 ? (
											<ul className={styles.nestedTaxonomyList}>
												{child.childTaxonomies
													.sort((a, b) => (a.title > b.title ? 1 : -1))
													.map((nestedChild) => (
														<li key={nestedChild.slug}>
															<Link
																to={`/wound-management/${slug}/${nestedChild.slug}/`}
															>
																{nestedChild.title}
															</Link>
														</li>
													))}
											</ul>
										) : (
											<ul className={styles.nestedTaxonomyList}>
												<li>
													<Link to={`/wound-management/${slug}/${child.slug}/`}>
														{child.title}
													</Link>
												</li>
											</ul>
										)}
									</li>
								);
							})}
						</ul>
					)}
				</GridItem>
			</Grid>
		</>
	);
};

export const query = graphql`
	query ($id: String) {
		allBnfWoundManagementTaxonomy(
			filter: { parentTaxonomy: { title: { eq: null } } }
		) {
			taxonomies: nodes {
				title
				slug
			}
		}
		bnfWoundManagementTaxonomy(id: { eq: $id }) {
			title
			slug
			text
			childTaxonomies {
				title
				slug
				text
				productGroups {
					title
					description
					products {
						name
					}
				}
				childTaxonomies {
					title
					slug
				}
			}
		}
	}
`;

export default WoundManagementTaxonomyPage;
