import { captureRejections } from "events";

import { graphql, Link } from "gatsby";
import React, { type FC } from "react";

import { FeedBorderlineSubstance } from "@nice-digital/gatsby-source-bnf";
import { Breadcrumbs, Breadcrumb } from "@nice-digital/nds-breadcrumbs";
import { Grid, GridItem } from "@nice-digital/nds-grid";
import { PageHeader } from "@nice-digital/nds-page-header";

import { BorderlineSubstancesMenu } from "@/components/BorderlineSubstancesMenu/BorderlineSubstancesMenu";
import { Layout } from "@/components/Layout/Layout";
import { SectionNav } from "@/components/SectionNav/SectionNav";
import { SEO } from "@/components/SEO/SEO";
import { useSiteMetadata } from "@/hooks/useSiteMetadata";
import { QueryResult, type SlugAndTitle } from "@/utils";

import Substance from "./Substance/Substance";
import styles from "./{BnfBorderlineSubstancesTaxonomy.slug}.module.scss";

export type BorderlineSubstancesSectionPageProps = {
	data: {
		bnfBorderlineSubstancesTaxonomy: SlugAndTitle & {
			rootTaxonomy: SlugAndTitle & {
				childTaxonomies: {
					title: string;
					slug: string;
					childTaxonomies?: {
						title: string;
						slug: string;
					}[];
				}[];
			};
			substances?: QueryResult<FeedBorderlineSubstance>[];
			childTaxonomies?: {
				title: string;
				substances?: QueryResult<FeedBorderlineSubstance>[];
				childTaxonomies?: {
					title: string;
					substances?: QueryResult<FeedBorderlineSubstance>[];
				}[];
			}[];
		};
	};
};

const BorderlineSubstancesSectionPage: FC<
	BorderlineSubstancesSectionPageProps
> = ({
	data: {
		bnfBorderlineSubstancesTaxonomy: {
			slug,
			title,
			rootTaxonomy,
			substances,
			childTaxonomies,
		},
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

	// In some taxonomies there are substances at multiple levels of the taxonomy which need to be flattened for the section nav
	// Currently these only go 3 deep in the "food for special diets" taxonomy.
	// If they ever go further it would be worth doing something recursive to check every level until there are no more substances.
	const flattenedSubstances: QueryResult<FeedBorderlineSubstance>[] = [];

	substances?.forEach((substance) => flattenedSubstances.push(substance));

	childTaxonomies?.map((child) =>
		child.substances?.forEach((substance) =>
			flattenedSubstances.push(substance)
		)
	);

	childTaxonomies?.map((child) =>
		child.childTaxonomies?.map((child2) =>
			child2.substances?.forEach((substance) =>
				flattenedSubstances.push(substance)
			)
		)
	);

	return (
		<Layout>
			<SEO title={title} />

			<Breadcrumbs>
				<Breadcrumb key="NICE" to="https://www.nice.org.uk/">
					NICE
				</Breadcrumb>
				<Breadcrumb key="Home" to="/" elementType={Link}>
					{siteTitleShort}
				</Breadcrumb>
				<Breadcrumb
					key="Borderline substances"
					to="/borderline-substances/"
					elementType={Link}
				>
					Borderline Substances
				</Breadcrumb>
				{isRoot ? null : (
					<Breadcrumb
						key="Parent taxonomy"
						to={`/borderline-substances/${rootTaxonomy.slug}/`}
						elementType={Link}
					>
						{rootTaxonomy.title}
					</Breadcrumb>
				)}
				<Breadcrumb key="Current page">{title}</Breadcrumb>
			</Breadcrumbs>

			<PageHeader
				id="content-start"
				heading={title}
				lead={
					isRoot ? null : (
						<Link
							className="p"
							to={`/borderline-substances/${rootTaxonomy.slug}/`}
						>
							View other {rootTaxonomy.title}
						</Link>
					)
				}
			/>

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
												{child1.childTaxonomies?.map((child2) => (
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
				<section aria-labelledby={slug} className={styles.section}>
					<SectionNav sections={flattenedSubstances}></SectionNav>

					{substances?.map((substance) => (
						<Substance key={substance.id} substance={substance}></Substance>
					))}

					{childTaxonomies?.map((child) => (
						<>
							{child.substances?.map((substance) => (
								<Substance
									key={substance.id}
									substance={substance}
									label={child.title}
								></Substance>
							))}
							{child.childTaxonomies?.map((child2) => (
								<>
									{child2.substances?.map((substance) => (
										<Substance
											key={substance.id}
											substance={substance}
											label={child2.title}
										></Substance>
									))}
								</>
							))}
						</>
					))}
				</section>
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
				slug
				title
				childTaxonomies {
					title
					childTaxonomies {
						title
						slug
					}
					slug
				}
			}
			substances {
				title
				introductionNote
				id
				presentations {
					acbs
					energyKj
					proteinGrams
					carbohydrateGrams
					fatGrams
					fibreGrams
					specialCharacteristics
					formulation
					borderlineSubstancePreps {
						...FullPrep
					}
				}
			}
			childTaxonomies {
				title
				substances {
					title
					introductionNote
					id
					presentations {
						acbs
						energyKj
						proteinGrams
						carbohydrateGrams
						fatGrams
						fibreGrams
						specialCharacteristics
						formulation
						borderlineSubstancePreps {
							...FullPrep
						}
					}
				}
				childTaxonomies {
					title
					substances {
						title
						introductionNote
						id
						presentations {
							acbs
							energyKj
							proteinGrams
							carbohydrateGrams
							fatGrams
							fibreGrams
							specialCharacteristics
							formulation
							borderlineSubstancePreps {
								...FullPrep
							}
						}
					}
				}
			}
		}
	}
`;

export default BorderlineSubstancesSectionPage;
