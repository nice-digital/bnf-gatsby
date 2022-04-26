import { captureRejectionSymbol } from "stream";

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

	// create the content - map childTaxonomies level 2 to h3 and child taxonomies level 3 to links
	// or if level 2 is lowest level, map level 2 to links
	// add this content to "sections" so that we can use the record section

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
			{/* <RecordSectionsContent sections={sections} /> */}
			<ol className="list--unstyled">
				{sections.map((child1) => (
					<>
						{child1.childTaxonomies && child1.childTaxonomies.length > 0 ? (
							<>
								<h2 key={child1.slug}>{child1.title}</h2>
								<ol className="list--unstyled">
									{child1.childTaxonomies.map((child2) => (
										<>
											{child2.childTaxonomies &&
											child2.childTaxonomies.length > 0 ? (
												<>
													{" "}
													<h3 key={child2.slug}>{child2.title}</h3>
													<ColumnList plain>
														{child2.childTaxonomies.map((child3) => (
															<li key={child3.slug}>
																<Link to={`/interactions/${child3.slug}/`}>
																	{child3.title}
																</Link>
															</li>
														))}
													</ColumnList>
												</>
											) : (
												<>
													{" "}
													<li key={child2.slug}>
														<Link to={`/interactions/${child2.slug}/`}>
															{child2.title}
														</Link>
													</li>
												</>
											)}
										</>
									))}
								</ol>
							</>
						) : (
							<>
								{/* {" "}
								<li key={child1.slug}>
									<Link to={`/interactions/${child1.slug}/`}>
										{child1.title}
									</Link>
								</li> */}
							</>
						)}
					</>
				))}
			</ol>
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
