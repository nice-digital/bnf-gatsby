import baseSlugify from "@sindresorhus/slugify";
import striptags from "striptags";

/**
 * Strips HTML tags and slugifies the given string
 *
 * @param toBeSlugified The string to slugify
 * @returns The lowercase, slugified string
 */
export const slugify = (toBeSlugified: string): string => {
	if (!toBeSlugified) throw new Error("Cannot slugify an empty string");

	// Some titles (e.g. `Frequently asked questions for the BNF and BNF <i>for Children</i> (BNFC)—general`)
	// have HTML tags in so strip these before we slugify
	return baseSlugify(striptags(toBeSlugified));
};

type SlugFieldExtensionOptions = {
	field: string;
};

/**
 * Custom Gatsby field extension to create a slug field value from an existing field.
 *
 * @example
 * 	Use within a GraphQL schema like:
 * 	```slug: String! @slug(field: "title")```
 *
 * @see https://www.gatsbyjs.com/docs/reference/graphql-data-layer/schema-customization/#creating-custom-extensions
 */
export const slugFieldExtension = {
	name: "slug",
	args: {
		field: {
			type: "String",
			defaultValue: "title",
		},
	},
	// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
	extend(options: SlugFieldExtensionOptions, _prevFieldConfig: unknown) {
		return {
			resolve(
				source: Record<string, unknown>,
				_args: null,
				_context: unknown,
				_info: unknown
			) {
				const fieldValue = source[options.field];

				if (!fieldValue)
					throw new Error(
						`Field ${options.field} has no value so can't be stringified`
					);

				if (typeof fieldValue !== "string")
					throw new Error(`Field ${options.field} isn't a string value`);

				return slugify(fieldValue);
			},
		};
	},
};
