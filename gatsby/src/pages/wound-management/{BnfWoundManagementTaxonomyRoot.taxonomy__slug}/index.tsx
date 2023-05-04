import { graphql, Link } from "gatsby";
import React, { type FC } from "react";
import striptags from "striptags";

import { FeedPrep } from "@nice-digital/gatsby-source-bnf";
import { Breadcrumbs, Breadcrumb } from "@nice-digital/nds-breadcrumbs";
import { Grid, GridItem } from "@nice-digital/nds-grid";
import { PageHeader } from "@nice-digital/nds-page-header";

import { Menu } from "@/components/Menu/Menu";
import {
	SectionNav,
	type SectionNavProps,
} from "@/components/SectionNav/SectionNav";
import { NEWSEO } from "@/components/SEO/NEWSEO";
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
		allBnfWoundManagementTaxonomyRoot: {
			taxonomies: {
				taxonomy: {
					title: string;
					slug: string;
				};
			}[];
		};
		bnfWoundManagementTaxonomyRoot: {
			taxonomy: {
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
	};
}

export function Head({
	data: {
		bnfWoundManagementTaxonomyRoot: {
			taxonomy: { title },
		},
	},
}: WoundManagementTaxonomyPageProps): JSX.Element {
	return (
		<NEWSEO
			title={`${title} | Wound management`}
			description={`This wound management topic describes the options that are currently recommended for ${decapitalize(
				title
			)}`}
		/>
	);
}

const WoundManagementTaxonomyPage: FC<WoundManagementTaxonomyPageProps> = ({
	data: {
		allBnfWoundManagementTaxonomyRoot: { taxonomies },
		bnfWoundManagementTaxonomyRoot: {
			taxonomy: { slug, title, text, childTaxonomies },
		},
	},
}) => {
	const { siteTitleShort } = useSiteMetadata(),
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
					<Menu
						label="Wound management products"
						link={{ destination: "/wound-management/", elementType: Link }}
						pages={taxonomies.map(({ taxonomy: { slug, title } }) => ({
							href: `/wound-management/${slug}/`,
							title,
						}))}
					></Menu>
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
										{child.text && child.productGroups.length === 0 && (
											<div
												dangerouslySetInnerHTML={{ __html: child.text }}
											></div>
										)}
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
												{child.productGroups.length > 0 && (
													<li>
														<Link
															to={`/wound-management/${slug}/${child.slug}/`}
														>
															{child.title}
														</Link>
													</li>
												)}
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
		allBnfWoundManagementTaxonomyRoot {
			taxonomies: nodes {
				taxonomy {
					title
					slug
				}
			}
		}
		bnfWoundManagementTaxonomyRoot(id: { eq: $id }) {
			taxonomy {
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
	}
`;

export default WoundManagementTaxonomyPage;
