import { graphql, Link } from "gatsby";
import React, { type FC } from "react";

import {
	FeedBorderlineSubstance,
	PHPID,
} from "@nice-digital/gatsby-source-bnf";
import { Breadcrumbs, Breadcrumb } from "@nice-digital/nds-breadcrumbs";
import { ColumnList } from "@nice-digital/nds-column-list";
import { Grid, GridItem } from "@nice-digital/nds-grid";
import { PageHeader } from "@nice-digital/nds-page-header";

import { AccordionGroup } from "@/components/AccordionGroup/AccordionGroup";
import { BorderlineSubstancesMenu } from "@/components/BorderlineSubstancesMenu/BorderlineSubstancesMenu";
import { Layout } from "@/components/Layout/Layout";
import {
	type SectionLink,
	SectionNav,
} from "@/components/SectionNav/SectionNav";
import { SEO } from "@/components/SEO/SEO";
import { useSiteMetadata } from "@/hooks/useSiteMetadata";
import {
	decapitalize,
	type QueryResult,
	type SlugAndTitle,
	type WithSlug,
} from "@/utils";

import Substance from "../../components/Substance/Substance";

import styles from "./{BnfBorderlineSubstancesTaxonomy.slug}.module.scss";

export type BorderlineSubstancesRootPageProps = {
	data: {
		bnfBorderlineSubstancesTaxonomyRoot: SlugAndTitle & {
			substances: WithSlug<QueryResult<FeedBorderlineSubstance>>[];
			childTaxonomies: {
				title: string;
				substances: WithSlug<QueryResult<FeedBorderlineSubstance>>[];
				childTaxonomies?: {
					title: string;
					substances: WithSlug<QueryResult<FeedBorderlineSubstance>>[];
				}[];
			}[];
		};
	};
};

const BorderlineSubstancesRootPage: FC<BorderlineSubstancesRootPageProps> = ({
	data: {
		bnfBorderlineSubstancesTaxonomyRoot: {
			slug,
			title,
			substances,
			childTaxonomies,
		},
	},
}) => {
	// const { siteTitleShort } = useSiteMetadata();
	// const sections = rootTaxonomy.childTaxonomies;
	// const isOneLevel = sections.some(
	// 	(section) =>
	// 		section.childTaxonomies == null || section.childTaxonomies.length == 0
	// );

	// const isRoot: boolean = slug == rootTaxonomy.slug;

	// const hasSiblings: boolean = parentTaxonomy?.childTaxonomies?.length > 1;

	// // In some taxonomies there are substances at multiple levels of the taxonomy which need to be flattened for the section nav
	// // Currently these only go 3 deep in the "food for special diets" taxonomy.
	// // If they ever go further it would be worth doing something recursive to check every level until there are no more substances.
	// const flattenedSubstances: SectionLink[] = [];

	// substances?.forEach(({ title, slug }) =>
	// 	flattenedSubstances.push({ title, id: slug })
	// );

	// childTaxonomies?.map((child) =>
	// 	child.substances?.forEach(({ title, slug }) =>
	// 		flattenedSubstances.push({ title, id: slug })
	// 	)
	// );

	// childTaxonomies?.map((child) =>
	// 	child.childTaxonomies?.map((child2) =>
	// 		child2.substances?.forEach(({ title, slug }) =>
	// 			flattenedSubstances.push({ title, id: slug })
	// 		)
	// 	)
	// );

	return (
		<h1>{title}</h1>
		// <Layout>
		// 	<SEO
		// 		title={`${title} ${
		// 			isRoot ? "" : ` | ${rootTaxonomy.title}`
		// 		} | Borderline substances`}
		// 	/>

		// 	<Breadcrumbs>
		// 		<Breadcrumb to="https://www.nice.org.uk/">NICE</Breadcrumb>
		// 		<Breadcrumb to="/" elementType={Link}>
		// 			{siteTitleShort}
		// 		</Breadcrumb>
		// 		<Breadcrumb to="/borderline-substances/" elementType={Link}>
		// 			Borderline substances
		// 		</Breadcrumb>
		// 		{isRoot ? null : (
		// 			<Breadcrumb
		// 				to={`/borderline-substances/${rootTaxonomy.slug}/`}
		// 				elementType={Link}
		// 			>
		// 				{rootTaxonomy.title}
		// 			</Breadcrumb>
		// 		)}
		// 		<Breadcrumb>{title}</Breadcrumb>
		// 	</Breadcrumbs>

		// 	<PageHeader
		// 		id="content-start"
		// 		heading={title}
		// 		lead={
		// 			hasSiblings ? (
		// 				<Link
		// 					className="p"
		// 					to={`/borderline-substances/${rootTaxonomy.slug}/`}
		// 				>
		// 					View other {decapitalize(rootTaxonomy.title)}
		// 				</Link>
		// 			) : null
		// 		}
		// 		preheading={parentTaxonomy?.title}
		// 	/>

		// 	{isRoot ? (
		// 		<Grid gutter="loose" data-testid="body">
		// 			<GridItem cols={12} md={4} lg={3} className="hide-print">
		// 				<BorderlineSubstancesMenu />
		// 			</GridItem>

		// 			<GridItem cols={12} md={8} lg={9}>
		// 				{isOneLevel ? (
		// 					<>
		// 						<ColumnList aria-label={`${title} substances`} columns={2}>
		// 							{sections.map(({ slug, title }) => (
		// 								<li key={slug}>
		// 									<Link to={`/borderline-substances/${slug}/`}>
		// 										{title}
		// 									</Link>
		// 								</li>
		// 							))}
		// 						</ColumnList>
		// 					</>
		// 				) : (
		// 					<>
		// 						{sections.map((child1, i) => (
		// 							<section key={child1.slug}>
		// 								<h2
		// 									id={child1.slug}
		// 									className={i === 0 ? styles.firstHeading : undefined}
		// 								>
		// 									{child1.title}
		// 								</h2>
		// 								<ColumnList
		// 									aria-label={`${child1.title} substances`}
		// 									columns={2}
		// 								>
		// 									{child1.childTaxonomies?.map(({ slug, title }) => (
		// 										<li key={slug}>
		// 											<Link to={`/borderline-substances/${slug}/`}>
		// 												{title}
		// 											</Link>
		// 										</li>
		// 									))}
		// 								</ColumnList>
		// 							</section>
		// 						))}
		// 					</>
		// 				)}
		// 			</GridItem>
		// 		</Grid>
		// 	) : (
		// 		<section aria-labelledby={slug} className={styles.section}>
		// 			<SectionNav sections={flattenedSubstances}></SectionNav>
		// 			<AccordionGroup>
		// 				{substances?.map((substance) => (
		// 					<Substance key={substance.id} substance={substance}></Substance>
		// 				))}

		// 				{childTaxonomies?.map((child) => (
		// 					<>
		// 						{child.substances?.map((substance) => (
		// 							<Substance
		// 								key={substance.id}
		// 								substance={substance}
		// 								label={child.title}
		// 							></Substance>
		// 						))}
		// 						{child.childTaxonomies?.map((child2) => (
		// 							<>
		// 								{child2.substances?.map((substance) => (
		// 									<Substance
		// 										key={substance.id}
		// 										substance={substance}
		// 										label={child2.title}
		// 									></Substance>
		// 								))}
		// 							</>
		// 						))}
		// 					</>
		// 				))}
		// 			</AccordionGroup>
		// 		</section>
		// 	)}
		// </Layout>
	);
};

export const query = graphql`
	query ($id: String) {
		bnfBorderlineSubstancesTaxonomyRoot(id: { eq: $id }) {
			slug
			title
			substances {
				...FullSubstance
			}
			childTaxonomies {
				title
				substances {
					...FullSubstance
				}
				childTaxonomies {
					title
					substances {
						...FullSubstance
					}
				}
			}
		}
	}
`;

export default BorderlineSubstancesRootPage;
