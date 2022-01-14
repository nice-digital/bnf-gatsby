import { type NodeInput } from "gatsby";

import { type FieldResolveContext, type NodeModel } from "../node-model";
import { BnfNode, BnfNodeType } from "../node-types";

import { slugify } from "./slug";

const nodeTypePathMap: { [key: BnfNodeType]: string } = {
	[BnfNode.Drug]: "drugs",
	[BnfNode.AboutSection]: "about",
	[BnfNode.CautionaryAndAdvisoryGuidance]: "about",
	[BnfNode.TreatmentSummary]: "treatment-summaries",
	[BnfNode.Guidance]: "medicines-guidance",
};

/**
 * Regular expression to target `xref` element within an HTML string.
 * We can do this via a regex because HTML from the feed is always strict, valid XML and xrefs always follow a set format.
 *
 * Note the optional `sid`: some xrefs only have `idref` and some have both `idref` and `sid`.
 */
const xRefRegex =
	/<xref type="([^"]*)"(?: sid="([^"]*)")? idref="([^"]*)">([^<].*?)<\/xref>/gm;

const getHtmlReplaceFunc =
	(nodeModel: NodeModel) =>
	(
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

		const path = nodeTypePathMap[node.internal.type as BnfNodeType],
			slug = slugify(node.title);

		if (!path)
			throw new Error(
				`Unsupported node type ${node.internal.type} for mapping to a path`
			);

		return `<a href="/${path}/${slug}/">${textContent}</a>`;
	};

/**
 * Custom Gatsby field extension to process HTML string fields.
 * It replaces xrefs with anchor tags, resolving the xref ids into URL paths to the relevant page.
 *
 * @example Use within a GraphQL schema like:
 * 	content: String! @html
 *
 * See https://www.gatsbyjs.com/docs/reference/graphql-data-layer/schema-customization/#creating-custom-extensions
 */
export const htmlFieldExtension = {
	name: "html",
	// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
	extend(_options: unknown, _prevFieldConfig: unknown) {
		return {
			resolve(
				source: unknown,
				args: unknown,
				context: FieldResolveContext,
				info: unknown
			) {
				const fieldValue = context.defaultFieldResolver(
					source,
					args,
					context,
					info
				);

				if (!fieldValue || typeof fieldValue !== "string")
					throw new Error(`Expected HTML content field to be a string`);

				return fieldValue.replace(
					xRefRegex,
					getHtmlReplaceFunc(context.nodeModel)
				);
			},
		};
	},
};
