import striptags from "striptags";

type InitialFieldExtensionOptions = {
	field: string;
};

/**
 * Custom Gatsby field extension to create a field value with a lowercased initial (first letter) from an existing field.
 *
 * @example
 * 	Use within a GraphQL schema like:
 * 	```initial: String! @initial(field: "title")```
 *
 * @see https://www.gatsbyjs.com/docs/reference/graphql-data-layer/schema-customization/#creating-custom-extensions
 */
export const initialFieldExtension = {
	name: "initial",
	args: {
		field: {
			type: "String",
			defaultValue: "title",
		},
	},
	// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
	extend(options: InitialFieldExtensionOptions, _prevFieldConfig: unknown) {
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
						`Field ${options.field} has no value so doesn't have an initial`
					);

				if (typeof fieldValue !== "string")
					throw new Error(`Field ${options.field} isn't a string value`);

				return striptags(fieldValue)[0].toLowerCase();
			},
		};
	},
};
