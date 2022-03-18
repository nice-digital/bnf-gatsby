import { type FieldResolveContext } from "../node-model";

import { replaceHashAnchors } from "./anchors/hash-anchor-replacer";
import { replaceXRefs } from "./anchors/xref-replacer";

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
				let fieldValue = context.defaultFieldResolver(
					source,
					args,
					context,
					info
				) as string | null;

				if (!fieldValue) return fieldValue;

				if (typeof fieldValue !== "string")
					throw Error(`Expected HTML content field value to be a string`);

				fieldValue = replaceHashAnchors(fieldValue, context.nodeModel);
				fieldValue = replaceXRefs(fieldValue, context.nodeModel);

				return fieldValue;
			},
		};
	},
};
