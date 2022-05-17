import { type SourceNodesArgs } from "gatsby";
import { type Except } from "type-fest";

import {
	FeedBorderlineSubstancesTaxonomy,
	PHPID,
	SID,
	type FeedBorderlineSubstances,
} from "../downloader/types";
import { BnfNode } from "../node-types";

import { slugify } from "./slugify";
import { createBnfNode, SimpleRecordNodeInput } from "./utils";

export type TaxonomyNodeInput = Except<
	FeedBorderlineSubstancesTaxonomy,
	"substances" | "children"
> & {
	slug: string;
	parentTaxonomy?: SID | PHPID;
	rootTaxonomy: SID | PHPID;
	childTaxonomies: (SID | PHPID)[];
};

export const createBorderlineSubstancesNodes = (
	{ introduction, taxonomy }: FeedBorderlineSubstances,
	sourceNodesArgs: SourceNodesArgs
): void => {
	const introductionNodeContent: Except<SimpleRecordNodeInput, "order"> = {
		...introduction,
		sections: introduction.sections.map((section, order) => ({
			...section,
			order,
		})),
	};

	createBnfNode(
		introductionNodeContent,
		BnfNode.BorderlineSubstancesIntroduction,
		sourceNodesArgs
	);

	const createTaxonomyRecursive = (
		taxonomies: FeedBorderlineSubstancesTaxonomy[],
		parent?: FeedBorderlineSubstancesTaxonomy,
		root?: FeedBorderlineSubstancesTaxonomy,
		isProductGroup?: boolean
	) => {
		taxonomies.forEach((taxonomy) => {
			const rootTaxonomy = root || taxonomy,
				{ children, ...taxonomyFields } = taxonomy;

			createBnfNode<TaxonomyNodeInput>(
				{
					...taxonomyFields,
					slug: slugify(
						taxonomyFields.title,
						BnfNode.BorderlineSubstancesTaxonomy
					),
					parentTaxonomy: parent?.id,
					childTaxonomies: children?.map((t) => t.id) || [],
					rootTaxonomy: rootTaxonomy.id,
				},
				BnfNode.BorderlineSubstancesTaxonomy,
				sourceNodesArgs
			);

			// Create a root taxonomy node that links to the main taxonomy
			if (!parent) {
				createBnfNode(
					{
						taxonomy: taxonomy.id,
						id: sourceNodesArgs.createNodeId(taxonomy.id),
					},
					BnfNode.BorderlineSubstancesTaxonomyRoot,
					sourceNodesArgs
				);
			}

			// A product group is the level we create sub pages at
			if (isProductGroup) {
				createBnfNode(
					{
						taxonomy: taxonomy.id,
						id: sourceNodesArgs.createNodeId(taxonomy.id),
					},
					BnfNode.BorderlineSubstancesTaxonomyProductGroup,
					sourceNodesArgs
				);
			}

			// Recursivly create nested taxonomy objects
			if (children)
				createTaxonomyRecursive(
					children,
					taxonomy,
					rootTaxonomy,
					isProductGroup
						? false
						: children.some(
								(child) => !child.children || child.children.length == 0
						  )
				);
		});
	};

	createTaxonomyRecursive(taxonomy);
};
