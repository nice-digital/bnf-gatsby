import { graphql, Link } from "gatsby";
import React, { type FC } from "react";

import { Breadcrumbs, Breadcrumb } from "@nice-digital/nds-breadcrumbs";
import { ColumnList } from "@nice-digital/nds-column-list";
import { Grid, GridItem } from "@nice-digital/nds-grid";
import { PageHeader } from "@nice-digital/nds-page-header";

import { BorderlineSubstancesMenu } from "@/components/BorderlineSubstancesMenu/BorderlineSubstancesMenu";
import { SEO } from "@/components/SEO/SEO";
import { useSiteMetadata } from "@/hooks/useSiteMetadata";
import { type SlugAndTitle } from "@/utils";

import styles from "./{BnfBorderlineSubstancesTaxonomyRoot.slug}.module.scss";

export type BorderlineSubstancesRootPageProps = {
	data: {
		bnfBorderlineSubstancesTaxonomyRoot: {
			taxonomy: SlugAndTitle & {
				childTaxonomies?: (SlugAndTitle & {
					childTaxonomies?: (SlugAndTitle & {
						childTaxonomies?: SlugAndTitle[];
					})[];
				})[];
			};
		};
	};
};

const BorderlineSubstancesRootPage: FC<BorderlineSubstancesRootPageProps> = ({
	data: {
		bnfBorderlineSubstancesTaxonomyRoot: {
			taxonomy: { slug: rootSlug, title, childTaxonomies },
		},
	},
}) => {
	const { siteTitleShort } = useSiteMetadata(),
		isOneLevel = childTaxonomies?.some(
			(section) =>
				section.childTaxonomies == null || section.childTaxonomies.length == 0
		);

	return (
		<>
			<SEO title={`${title} | Borderline substances`} />

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
						<ColumnList aria-label={`Sections within ${title}`} columns={2}>
							{childTaxonomies?.map(({ slug, title }) => (
								<li key={slug}>
									<Link to={`/borderline-substances/${rootSlug}/${slug}/`}>
										{title}
									</Link>
								</li>
							))}
						</ColumnList>
					) : (
						<>
							{childTaxonomies?.map((child1, i) => (
								<section key={child1.slug} aria-labelledby={child1.slug}>
									<h2
										id={child1.slug}
										className={i === 0 ? styles.firstHeading : undefined}
									>
										{child1.title}
									</h2>
									<ColumnList
										aria-label={`Sections within ${child1.title}`}
										columns={2}
									>
										{child1.childTaxonomies?.map(({ slug, title }) => (
											<li key={slug}>
												<Link
													to={`/borderline-substances/${rootSlug}/${slug}/`}
												>
													{title}
												</Link>
											</li>
										))}
									</ColumnList>
								</section>
							))}
						</>
					)}
				</GridItem>
			</Grid>
		</>
	);
};

export const query = graphql`
	query ($id: String) {
		bnfBorderlineSubstancesTaxonomyRoot(id: { eq: $id }) {
			taxonomy {
				slug
				title
				childTaxonomies {
					title
					slug
					childTaxonomies {
						title
						slug
						childTaxonomies {
							title
							slug
						}
					}
				}
			}
		}
	}
`;

export default BorderlineSubstancesRootPage;
