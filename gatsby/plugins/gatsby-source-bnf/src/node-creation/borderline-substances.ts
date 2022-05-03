import { type SourceNodesArgs } from "gatsby";
import { type Except } from "type-fest";

import {
	FeedBorderlineSubstance,
	FeedBorderlineSubstancesTaxonomy,
	PHPID,
	SID,
	type FeedBorderlineSubstances,
} from "../downloader/types";
import { BnfNode } from "../node-types";

import { createBnfNode, SimpleRecordNodeInput } from "./utils";

export type TaxonomyNodeInput = Except<
	FeedBorderlineSubstancesTaxonomy,
	"substances" | "children"
> & {
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
		root?: FeedBorderlineSubstancesTaxonomy
	) => {
		taxonomies.forEach((taxonomy) => {
			const rootTaxonomy = root || taxonomy,
				{ children, ...taxonomyFields } = taxonomy;

			createBnfNode<TaxonomyNodeInput>(
				{
					...taxonomyFields,
					parentTaxonomy: parent?.id,
					childTaxonomies: children?.map((t) => t.id) || [],
					rootTaxonomy: rootTaxonomy.id,
				},
				BnfNode.BorderlineSubstancesTaxonomy,
				sourceNodesArgs
			);

			if (children) createTaxonomyRecursive(children, taxonomy, rootTaxonomy);
		});
	};

	createTaxonomyRecursive(taxonomy);

	const createSubstanceRecursive = (
		taxonomies: FeedBorderlineSubstancesTaxonomy[]
	) => {
		taxonomies.forEach((taxonomy) => {
			const substances = taxonomy.substances;

			substances?.forEach((substance) => {
				const { ...substanceFields } = substance;
				createBnfNode<FeedBorderlineSubstance>(
					{
						...substanceFields,
					},
					BnfNode.BorderlineSubstance,
					sourceNodesArgs
				);
			});

			if (taxonomy.children) createSubstanceRecursive(taxonomy.children);
		});
	};

	createSubstanceRecursive(taxonomy);
};
