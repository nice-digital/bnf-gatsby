import { NodeInput } from "gatsby";
import replaceAsync from "string-replace-async";

import { aboutSectionNodeType } from "../node-creation/about-sections";
import { cautionaryAndAdvisoryGuidanceNodeType } from "../node-creation/cautionary-advisory";
import { drugNodeType } from "../node-creation/drugs";
import { guidanceNodeType } from "../node-creation/guidance";
import { treatmentSummaryNodeType } from "../node-creation/treament-summaries";
import { type FieldResolveContext, type NodeModel } from "../node-model";

import { slugify } from "./slug";

const xRefRegex =
	/<xref type="([^"]*)"(?: sid="([^"]*)")? idref="([^"]*)">([^<].*?)<\/xref>/gm;

const getHtmlReplacer =
	(nodeModel: NodeModel) =>
	async (
		_match: string,
		type: "drug" | "bookmark" | string,
		sid: string | null,
		id: string,
		textContent: string
	) => {
		if (type !== "drug" && type !== "bookmark")
			throw new Error(
				`Unexpected xref type of ${type} found. Expected either drug or bookmark.`
			);

		let node = nodeModel.getNodeById<{ title: string } & NodeInput>({ id });

		// Some nodes e.g. treatment summaries seem to use the sid instead of PHP id so do a fallback query
		if (!node && sid)
			node = nodeModel.getNodeById<{ title: string } & NodeInput>({ id: sid });

		if (!node) throw new Error(`Couldn't find node with id ${id}`);

		let path = "";
		switch (node.internal.type) {
			case drugNodeType:
				path = "drugs";
				break;
			case aboutSectionNodeType:
			case cautionaryAndAdvisoryGuidanceNodeType:
				path = "about";
				break;
			case treatmentSummaryNodeType:
				path = "treatment-summaries";
				break;
			case guidanceNodeType:
				path = "medicines-guidance";
				break;
			default:
				throw new Error(
					`Unsupported node type ${node.internal.type} for mapping to a path`
				);
		}

		// TODO: it seems a shame to have slugify again here and it's not returned as part of the node content
		const slug = slugify(node.title);

		return `<a href="/${path}/${slug}/">${textContent}</a>`;
	};

/**
 * Custom Gatsby field extension to replace xrefs in HTML content with anchor tags
 *
 * See https://www.gatsbyjs.com/docs/reference/graphql-data-layer/schema-customization/#creating-custom-extensions
 */
export const htmlFieldExtension = {
	name: "html",
	extend(_options: never, _prevFieldConfig: unknown): object {
		return {
			async resolve(
				source: unknown,
				args: never,
				context: FieldResolveContext,
				info: unknown
			) {
				const fieldValue = context.defaultFieldResolver(
					source,
					args,
					context,
					info
				);

				const result = await replaceAsync(
					fieldValue,
					xRefRegex,
					getHtmlReplacer(context.nodeModel)
				);

				return result;
			},
		};
	},
};
