import slugify from "@sindresorhus/slugify";
import striptags from "striptags";

interface TitledNode {
	title: string;
}

/**
 * A GraphQL resolver that returns a slugified title.
 *
 * For use with `createResolvers` in Gatsby.
 *
 * @param node The node that has a `title` property
 * @returns the slugified title
 */
export const titleSlugifyingResolver = async (
	{ title }: TitledNode,
	_args: unknown,
	_resolveContext: unknown
): Promise<string> => {
	if (!title) throw new Error(`Expected node to have a title property`);

	// Some titles (e.g. `Frequently asked questions for the BNF and BNF <i>for Children</i> (BNFC)—general`)
	// have HTML tags in so strip these before we slugify
	return slugify(striptags(title));
};

/**
 * A resolver object that slugifies the title into a new `slug` property.
 *
 * E.g.:
 * ```
 * createResolvers({
 * 	BnfAboutSection: withSlugFieldFromTitle,
 * });
 * ```
 */
export const withSlugFieldFromTitle = {
	slug: {
		type: `String!`,
		resolve: titleSlugifyingResolver,
	},
};
