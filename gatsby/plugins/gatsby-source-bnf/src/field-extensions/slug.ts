import baseSlugify from "@sindresorhus/slugify";
import striptags from "striptags";

type SlugFieldExtensionOptions = {
	field: string;
};

export const slugify = (title: string): string => {
	if (!title) throw new Error("Cannot slugify an empty string");

	// Some titles (e.g. `Frequently asked questions for the BNF and BNF <i>for Children</i> (BNFC)—general`)
	// have HTML tags in so strip these before we slugify
	return baseSlugify(striptags(title));
};

/**
 * Custom Gatsby field extension to create a slug field value from an existing field
 *
 * See https://www.gatsbyjs.com/docs/reference/graphql-data-layer/schema-customization/#creating-custom-extensions
 */
export const slugFieldExtension = {
	name: "slug",
	args: {
		field: {
			type: "String!",
			defaultValue: "title",
		},
	},
	extend(
		options: SlugFieldExtensionOptions,
		_prevFieldConfig: unknown
	): object {
		return {
			resolve(
				source: Record<string, unknown>,
				_args: never,
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
