import { type FieldResolveContext } from "../node-model";

import { replaceRelativeAnchors } from "./anchors/anchor-replacer";

/**
 * Custom Gatsby field extension to process HTML string fields.
 * It replaces internal anchors with anchor tags, resolving the ids into URL paths to the relevant page.
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
				) as string | string[] | null;

				if (!fieldValue) return fieldValue;

				if (typeof fieldValue === "string") {
					fieldValue = replaceRelativeAnchors(fieldValue, context.nodeModel);

					return fieldValue;
				} else if (
					Array.isArray(fieldValue) &&
					fieldValue.every((s) => typeof s === "string")
				) {
					return fieldValue.map((s) => {
						s = replaceRelativeAnchors(s, context.nodeModel);

						return s;
					});
				}

				throw Error(
					`Expected HTML content field value to be a string or an array of strings`
				);
			},
		};
	},
};
