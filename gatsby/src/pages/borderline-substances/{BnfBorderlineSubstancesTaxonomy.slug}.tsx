import { graphql, Link } from "gatsby";
import React, { type FC } from "react";

import { ColumnList } from "@nice-digital/nds-column-list";

import { BorderlineSubstancesMenu } from "@/components/BorderlineSubstancesMenu/BorderlineSubstancesMenu";
import { DetailsPageLayout } from "@/components/DetailsPageLayout/DetailsPageLayout";
import { type SlugAndTitle } from "@/utils";

export type BorderlineSubstancesSectionPageProps = {
	data: {
		bnfBorderlineSubstancesTaxonomy: SlugAndTitle & {
			rootTaxonomy: {
				childTaxonomies: {
					title: string;
					childTaxonomies: {
						title: string;
						childTaxonomies: {
							title: string;
							slug: string;
						}[];
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
	const sections = rootTaxonomy.childTaxonomies;
	const isOneLevel = sections.find(
		(section) =>
			section.childTaxonomies != null && section.childTaxonomies.length > 0
	)
		? false
		: true;

	return (
		<DetailsPageLayout
			titleHtml={title}
			parentTitleParts={["Borderline Substances"]}
			parentBreadcrumbs={[
				{ href: "/borderline-substances/", text: "Borderline Substances" },
			]}
			menu={BorderlineSubstancesMenu}
			sections={sections.map(({ slug, title }) => ({
				id: slug,
				title,
			}))}
			useSectionNav={true}
		>
			{!isOneLevel && (
				<ol className="list--unstyled">
					{sections.map((child1) => (
						<>
							<h2 key={child1.slug}>{child1.title}</h2>
							<ol className="list--unstyled">
								{child1.childTaxonomies.map((child2) => (
									<li key={child2.slug}>
										<Link to={`/interactions/${child2.slug}/`}>
											{child2.title}
										</Link>
									</li>
								))}
							</ol>
						</>
					))}
				</ol>
			)}
		</DetailsPageLayout>
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
						childTaxonomies {
							title
							slug
						}
						slug
					}
					slug
				}
			}
		}
	}
`;

export default BorderlineSubstancesSectionPage;
