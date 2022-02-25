import { type FieldResolveContext } from "../node-model";

import { anchorReplacer, internalAnchorRegex } from "./anchors/anchor-replacer";
import { xRefReplacer, xRefRegex } from "./anchors/xref-replacer";

/**
 * Custom Gatsby field extension to process HTML string fields.
 * It replaces xrefs and internal anchors with anchor tags, resolving the ids into URL paths to the relevant page.
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
					throw Error(`Expected HTML content field value to be a string`);

				return fieldValue
					.replace(xRefRegex, xRefReplacer(context.nodeModel))
					.replace(internalAnchorRegex, anchorReplacer(context.nodeModel));
			},
		};
	},
};
