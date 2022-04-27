import { graphql, Link } from "gatsby";
import React, { type FC } from "react";

import { Breadcrumbs, Breadcrumb } from "@nice-digital/nds-breadcrumbs";
import { Grid, GridItem } from "@nice-digital/nds-grid";
import { PageHeader } from "@nice-digital/nds-page-header";
import { StackedNav, StackedNavLink } from "@nice-digital/nds-stacked-nav";

import { Layout } from "@/components/Layout/Layout";
import {
	SectionNav,
	type SectionNavProps,
} from "@/components/SectionNav/SectionNav";
import { SEO } from "@/components/SEO/SEO";
import { useSiteMetadata } from "@/hooks/useSiteMetadata";

import styles from "./index.module.scss";

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
		allBnfWoundManagementTaxonomy: { taxonomies },
		bnfWoundManagementTaxonomy: { slug, title, text, childTaxonomies },
	},
}) => {
	const { siteTitleShort } = useSiteMetadata();
	const navSections: SectionNavProps = {
		sections: childTaxonomies.map(({ slug, title }) => {
			return {
				id: slug,
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
								destination={`/wound-management/${slug}`}
								elementType={Link}
							>
								<span dangerouslySetInnerHTML={{ __html: title }} />
							</StackedNavLink>
						))}
					</StackedNav>
				</GridItem>
				<GridItem cols={12} md={8} lg={9}>
					<SectionNav {...navSections} />
					{text && <div dangerouslySetInnerHTML={{ __html: text }}></div>}

					{childTaxonomies.length > 0 && (
						<ul className={styles.childTaxonomyList}>
							{childTaxonomies.map((child) => (
								<li key={child.slug}>
									<h2 id={child.slug}>{child.title}</h2>
									{child.text && (
										<div dangerouslySetInnerHTML={{ __html: child.text }}></div>
									)}
									{child.childTaxonomies.length > 0 ? (
										<ul className={styles.nestedTaxonomyList}>
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
										<ul className={styles.nestedTaxonomyList}>
											<li>
												<Link to={`/wound-management/${slug}/${child.slug}`}>
													{child.title}
												</Link>
											</li>
										</ul>
									)}
								</li>
							))}
						</ul>
					)}
				</GridItem>
			</Grid>
		</Layout>
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
				childTaxonomies {
					title
					slug
				}
			}
		}
	}
`;

export default WoundManagementTaxonomyPage;
