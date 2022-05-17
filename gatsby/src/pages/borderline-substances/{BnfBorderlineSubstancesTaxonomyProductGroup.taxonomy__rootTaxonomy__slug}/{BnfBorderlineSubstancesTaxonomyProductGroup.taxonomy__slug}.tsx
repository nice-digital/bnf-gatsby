import { graphql, Link } from "gatsby";
import React, { type FC } from "react";

import { Breadcrumbs, Breadcrumb } from "@nice-digital/nds-breadcrumbs";
import { PageHeader } from "@nice-digital/nds-page-header";

import { AccordionGroup } from "@/components/AccordionGroup/AccordionGroup";
import { SectionNav } from "@/components/SectionNav/SectionNav";
import { SEO } from "@/components/SEO/SEO";
import Substance, {
	type SubstanceType,
} from "@/components/Substance/Substance";
import { useSiteMetadata } from "@/hooks/useSiteMetadata";
import { decapitalize, type SlugAndTitle } from "@/utils";

import styles from "./{BnfBorderlineSubstancesTaxonomyProductGroup.taxonomy__slug}.module.scss";

type LabelledSubstance = {
	label?: string;
	substance: SubstanceType;
};

type QueriedTaxonomy = SlugAndTitle & {
	substances: SubstanceType[];
	childTaxonomies: QueriedTaxonomy[];
};

export type BorderlineSubstancesProductGroupPageProps = {
	data: {
		bnfBorderlineSubstancesTaxonomyProductGroup: {
			taxonomy: QueriedTaxonomy & {
				rootTaxonomy: SlugAndTitle;
				parentTaxonomy: SlugAndTitle & {
					childTaxonomies: SlugAndTitle[];
				};
			};
		};
	};
};

const flattenSubstancesWithLabel = (
	prev: LabelledSubstance[],
	{ substances, childTaxonomies, title }: QueriedTaxonomy
): LabelledSubstance[] => [
	...prev,
	...substances.map((substance) => ({ substance, label: title })),
	...childTaxonomies.reduce(flattenSubstancesWithLabel, []),
];

const BorderlineSubstancesProductGroupPage: FC<
	BorderlineSubstancesProductGroupPageProps
> = ({
	data: {
		bnfBorderlineSubstancesTaxonomyProductGroup: {
			taxonomy: {
				title,
				rootTaxonomy,
				substances,
				parentTaxonomy,
				childTaxonomies,
			},
		},
	},
}) => {
	const { siteTitleShort } = useSiteMetadata(),
		hasSiblings = parentTaxonomy.childTaxonomies.length > 1,
		allSubstances = childTaxonomies.reduce(
			flattenSubstancesWithLabel,
			substances.map((substance) => ({ substance }))
		);

	return (
		<>
			<SEO
				title={`${title} | ${parentTaxonomy.title} | ${rootTaxonomy.title} | Borderline substances`}
			/>

			<Breadcrumbs>
				<Breadcrumb to="https://www.nice.org.uk/">NICE</Breadcrumb>
				<Breadcrumb to="/" elementType={Link}>
					{siteTitleShort}
				</Breadcrumb>
				<Breadcrumb to="/borderline-substances/" elementType={Link}>
					Borderline substances
				</Breadcrumb>
				<Breadcrumb
					to={`/borderline-substances/${rootTaxonomy.slug}/`}
					elementType={Link}
				>
					{rootTaxonomy.title}
				</Breadcrumb>
				<Breadcrumb>{title}</Breadcrumb>
			</Breadcrumbs>

			<PageHeader
				id="content-start"
				heading={title}
				lead={
					hasSiblings ? (
						<Link
							className="p"
							to={`/borderline-substances/${rootTaxonomy.slug}/`}
						>
							View other {decapitalize(rootTaxonomy.title)}
						</Link>
					) : null
				}
				preheading={`${parentTaxonomy.title}: `}
			/>

			<section
				aria-label={`Substances within ${title}`}
				className={styles.section}
			>
				<SectionNav
					sections={allSubstances.map(({ substance: { title, slug } }) => ({
						title,
						id: slug,
					}))}
				></SectionNav>
				{allSubstances.length === 1 ? (
					<Substance {...allSubstances[0]} />
				) : (
					<AccordionGroup
						toggleText={(isOpen) =>
							`${isOpen ? "Hide" : "Show"} all ${decapitalize(title)} (${
								allSubstances.length
							})`
						}
					>
						<ol
							aria-label={`Substances within ${title}`}
							className="list list--unstyled"
						>
							{allSubstances.map((substanceWithLabel) => (
								<li key={substanceWithLabel.substance.title}>
									<Substance {...substanceWithLabel} />
								</li>
							))}
						</ol>
					</AccordionGroup>
				)}
			</section>
		</>
	);
};

export const query = graphql`
	query ($id: String) {
		bnfBorderlineSubstancesTaxonomyProductGroup(id: { eq: $id }) {
			taxonomy {
				slug
				title
				rootTaxonomy {
					slug
					title
				}
				parentTaxonomy {
					slug
					title
					childTaxonomies {
						slug
						title
					}
				}
				substances {
					...FullSubstance
				}
				childTaxonomies {
					slug
					title
					substances {
						...FullSubstance
					}
					childTaxonomies {
						slug
						title
						substances {
							...FullSubstance
						}
						childTaxonomies {
							slug
							title
							substances {
								...FullSubstance
							}
						}
					}
				}
			}
		}
	}
`;

export default BorderlineSubstancesProductGroupPage;
