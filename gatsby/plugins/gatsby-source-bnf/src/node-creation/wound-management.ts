import { type SourceNodesArgs } from "gatsby";
import { type Except } from "type-fest";

import {
	type FeedWoundManagementTaxonomy,
	type FeedWoundManagement,
	SID,
} from "../downloader/types";
import { BnfNode } from "../node-types";

import { createBnfNode, SimpleRecordNodeInput } from "./utils";

export type TaxonomyRootNodeInput = Except<
	FeedWoundManagementTaxonomy,
	"productGroups" | "children"
> & {
	childTaxonomies: SID[];
};

export type TaxonomyNodeInput = Except<
	FeedWoundManagementTaxonomy,
	"productGroups" | "children"
> & {
	parentTaxonomy?: SID;
	rootTaxonomy: SID;
	childTaxonomies: SID[];
};

export type TaxonomyProductGroupNodeInput = {
	id: string;
	taxonomy: SID;
};

export const createWoundManagementNodes = (
	{ introduction, taxonomy }: FeedWoundManagement,
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
		BnfNode.WoundManagementIntroduction,
		sourceNodesArgs
	);

	const createTaxonomyRecursive = (
		taxonomies: FeedWoundManagementTaxonomy[],
		parent?: FeedWoundManagementTaxonomy,
		root?: FeedWoundManagementTaxonomy
	) => {
		taxonomies.forEach((taxonomy) => {
			const rootTaxonomy = root || taxonomy,
				{ children, ...taxonomyFields } = taxonomy;

			// Create a root taxonomy node if appropriate
			if (!parent) {
				createBnfNode<TaxonomyRootNodeInput>(
					{
						...taxonomyFields,
						childTaxonomies: children?.map((t) => t.id) || [],
					},
					BnfNode.WoundManagementTaxonomyRoot,
					sourceNodesArgs
				);
			}

			if (taxonomy.productGroups?.length) {
				createBnfNode<TaxonomyProductGroupNodeInput>(
					{
						id: sourceNodesArgs.createNodeId(taxonomy.id),
						taxonomy: taxonomy.id,
					},
					BnfNode.WoundManagementTaxonomyProductGroup,
					sourceNodesArgs
				);
			}

			createBnfNode<TaxonomyNodeInput>(
				{
					...taxonomyFields,
					parentTaxonomy: parent?.id,
					childTaxonomies: children?.map((t) => t.id) || [],
					rootTaxonomy: rootTaxonomy.id,
				},
				BnfNode.WoundManagementTaxonomy,
				sourceNodesArgs
			);

			if (children) createTaxonomyRecursive(children, taxonomy, rootTaxonomy);
		});
	};

	createTaxonomyRecursive(taxonomy);
};
