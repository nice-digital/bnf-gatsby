import { useLocation } from "@reach/router";
import { graphql, Link } from "gatsby";
import React, { type FC } from "react";

import { Breadcrumbs, Breadcrumb } from "@nice-digital/nds-breadcrumbs";
import { Grid, GridItem } from "@nice-digital/nds-grid";
import { PageHeader } from "@nice-digital/nds-page-header";

import { BorderlineSubstancesMenu } from "@/components/BorderlineSubstancesMenu/BorderlineSubstancesMenu";
import { Layout } from "@/components/Layout/Layout";
import { SectionNav } from "@/components/SectionNav/SectionNav";
import { SEO } from "@/components/SEO/SEO";
import { useSiteMetadata } from "@/hooks/useSiteMetadata";
import { type SlugAndTitle } from "@/utils";

import styles from "./{BnfBorderlineSubstancesTaxonomy.slug}.module.scss";

export type BorderlineSubstancesSectionPageProps = {
	data: {
		bnfBorderlineSubstancesTaxonomy: SlugAndTitle & {
			rootTaxonomy: {
				slug: string;
				title: string;
				childTaxonomies: {
					title: string;
					childTaxonomies: {
						title: string;
						slug: string;
					}[];
					slug: string;
				}[];
			};
		};
	};
};

const BorderlineSubstancesSectionPage: FC<
	BorderlineSubstancesSectionPageProps
> = ({
	data: {
		bnfBorderlineSubstancesTaxonomy: { slug, title, rootTaxonomy },
	},
}) => {
	const { siteTitleShort } = useSiteMetadata();
	const sections = rootTaxonomy.childTaxonomies;
	const isOneLevel = sections.find(
		(section) =>
			section.childTaxonomies != null && section.childTaxonomies.length > 0
	)
		? false
		: true;

	const isRoot = slug == rootTaxonomy.slug;

	return (
		<Layout>
			<SEO title={title} description="Browse borderline substances, by type." />

			<Breadcrumbs>
				<Breadcrumb key="NICE" to="https://www.nice.org.uk/">
					NICE
				</Breadcrumb>
				<Breadcrumb key="Home" to="/" elementType={Link}>
					{siteTitleShort}
				</Breadcrumb>
				<Breadcrumb key="Home" to="/borderline-substances/" elementType={Link}>
					Borderline Substances
				</Breadcrumb>
				<Breadcrumb key="Current page">{title}</Breadcrumb>
			</Breadcrumbs>

			<PageHeader id="content-start" heading={title} />

			{isRoot ? (
				<Grid gutter="loose" data-testid="body">
					<GridItem cols={12} md={4} lg={3} className="hide-print">
						<BorderlineSubstancesMenu />
					</GridItem>

					<GridItem cols={12} md={8} lg={9}>
						{isOneLevel ? (
							<>
								{" "}
								<nav aria-label="navigate-to-products" className={styles.nav}>
									<ol
										aria-label="Links to products"
										className={styles.linkList}
									>
										{sections.map((section) => (
											<li key={section?.slug}>
												<Link to={`/borderline-substances/${section.slug}/`}>
													{section.title}
												</Link>
											</li>
										))}
									</ol>
								</nav>
							</>
						) : (
							<>
								<section>
									{sections.map((child1, i) => (
										<>
											<h2
												key={child1.slug}
												className={i === 0 ? styles.firstHeading : undefined}
											>
												{child1.title}
											</h2>
											<ol className="list--unstyled">
												{child1.childTaxonomies.map((child2) => (
													<li key={child2.slug}>
														<Link to={`/borderline-substances/${child2.slug}/`}>
															{child2.title}
														</Link>
													</li>
												))}
											</ol>
										</>
									))}
								</section>
							</>
						)}
					</GridItem>
				</Grid>
			) : (
				<Link to={`/borderline-substances/${rootTaxonomy.slug}/`}>
					View other {rootTaxonomy.title}
				</Link>
			)}
		</Layout>
	);
};

export const query = graphql`
	query ($id: String) {
		bnfBorderlineSubstancesTaxonomy(id: { eq: $id }) {
			slug
			title
			rootTaxonomy {
				childTaxonomies {
					title
					childTaxonomies {
						title
						slug
					}
					slug
				}
				slug
				title
			}
		}
	}
`;

export default BorderlineSubstancesSectionPage;