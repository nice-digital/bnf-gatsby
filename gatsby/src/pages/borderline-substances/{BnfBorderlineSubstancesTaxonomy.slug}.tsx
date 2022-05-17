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
	const isOneLevel = sections.some(
		(section) =>
			section.childTaxonomies == null || section.childTaxonomies.length == 0
	);

	return (
		<>
			<SEO title={title} />

			<Breadcrumbs>
				<Breadcrumb to="https://www.nice.org.uk/">NICE</Breadcrumb>
				<Breadcrumb to="/" elementType={Link}>
					{siteTitleShort}
				</Breadcrumb>
				<Breadcrumb to="/borderline-substances/" elementType={Link}>
					Borderline substances
				</Breadcrumb>
				<Breadcrumb>{title}</Breadcrumb>
			</Breadcrumbs>

			<PageHeader id="content-start" heading={title} />
			<Grid gutter="loose" data-testid="body">
				<GridItem cols={12} md={4} lg={3} className="hide-print">
					<BorderlineSubstancesMenu />
				</GridItem>

				<GridItem cols={12} md={8} lg={9}>
					{isOneLevel ? (
						<>
							<SectionNav
								sections={sections.map(({ slug, title }) => ({
									title,
									id: `/borderline-substances/${slug}/`,
								}))}
								navigateToAnotherPage={true}
							></SectionNav>
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
													<Link
														to={`/borderline-substances/${slug}/${child1.slug}/${child2.slug}/`}
													>
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
		</>
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
			}
		}
	}
`;

export default BorderlineSubstancesSectionPage;
