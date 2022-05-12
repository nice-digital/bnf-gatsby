import baseSlugify, { type Options } from "@sindresorhus/slugify";
import striptags from "striptags";

export type Slugify = (string: string, options?: Options) => string;

/** Cache a unique slugifier per node type so we can have unique slugs */
const sluggerMap = new Map<string, Slugify>();

export const resetAllCounters = (): void => sluggerMap.clear();

/**
 * Strips HTML tags and slugifies the given string
 *
 * @param toBeSlugified The string to slugify
 * @returns The lowercase, slugified string
 */
export const slugify = (toBeSlugified: string, key?: string): string => {
	if (!toBeSlugified) throw new Error("Cannot slugify an empty string");

	let specificSlugify: Slugify = baseSlugify;
	if (typeof key === "string" && key.length > 0) {
		if (sluggerMap.has(key)) specificSlugify = sluggerMap.get(key) as Slugify;
		else {
			specificSlugify = baseSlugify.counter();
			sluggerMap.set(key, specificSlugify);
		}
	}

	// Some titles (e.g. `Frequently asked questions for the BNF and BNF <i>for Children</i> (BNFC)—general`)
	// have HTML tags in so strip these before we slugify
	return specificSlugify(striptags(toBeSlugified), {
		decamelize: false,
		customReplacements: [
			["'", ""],
			["’", ""],
		],
	});
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
		const slugCache = new Map<string, string>();

		return {
			resolve(
				source: Record<string, unknown>,
				_args: null,
				_context: unknown,
				{
					path: { typename },
				}: {
					path: {
						typename: string;
					};
				}
			) {
				const fieldValue = source[options.field];

				if (!fieldValue)
					throw new Error(
						`Field ${options.field} has no value so can't be stringified`
					);

				if (typeof fieldValue !== "string")
					throw new Error(`Field ${options.field} isn't a string value`);

				// Avoid re-generating the same slug again to avoid accidentally incrementing a slug counter
				const cacheKey = `${typename}:${source.id || "no-id"}:${fieldValue}`,
					slug = slugCache.get(cacheKey) || slugify(fieldValue, typename);

				slugCache.set(cacheKey, slug);

				return slug;
			},
		};
	},
};
