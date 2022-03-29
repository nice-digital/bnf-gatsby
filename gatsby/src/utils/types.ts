import { type Primitive, type Merge, type Simplify } from "type-fest";

export type BuiltIns = Primitive | Date | RegExp;

export interface RecordSection extends Slug {
	order: number;
	title: string;
	content: string;
}

export interface MenuPageLink {
	href: string;
	title: string;
}

/** Represents the structure of JSON files used for meta descriptions:
 * a map of URL slug to string descriptions for BNF and BNFC */
export type MetaDescriptionsMap = Record<
	string,
	{ bnf: string | null; bnfc: string | null } | undefined
>;

export interface Slug {
	slug: string;
}

export interface SlugAndTitle extends Slug {
	title: string;
}

export type WithSlug<T extends object> = T & Slug;

/**
 * Add a `slug: string` property to each of the given `SlugTypes` recursively within the given type `Base`.
 *
 * This type is useful for augmenting raw feed types with `slug` properties when they're queried via GraphQl.
 * This is because we add slugs using the `@slug` directive in the GraphQL schema, so there are no slugs on the raw feed types.
 * It avoids having to do nested union types to add a `slug` property in each file that queries GraphQL.
 *
 * This type will often be used in tandem with `QueryResult` in practice to correctly type the results of GraphQL queries _and_ to add slugs where needed.
 *
 * 	@example To add slugs to all `FeedMedicinalForm` types within `FeedMedicinalForms`:
 * 		type MedicinalFormsWithSlugs = WithSlugDeep<FeedMedicinalForms, FeedMedicinalForm>
 * */
export type WithSlugDeep<
	Base extends object,
	SlugTypes extends object
> = Simplify<
	Merge<
		Base extends SlugTypes ? WithSlug<Base> : Base,
		{
			[Key in keyof Base]: Base[Key] extends (infer U)[] | undefined
				? U extends object
					? WithSlugDeep<U, SlugTypes>[] | undefined
					: Base[Key]
				: Base[Key] extends object
				? WithSlugDeep<Base[Key], SlugTypes>
				: Base[Key] extends object | undefined
				? WithSlugDeep<NonNullable<Base[Key]>, SlugTypes> | undefined
				: Base[Key];
		}
	>
>;

/**
 * Wrapper type for types returned from GraphQL queries.
 *
 * It does the following:
 * - replaces `undefined` with `null` (GraphQL queries return `null` for empty properties)
 * - makes arrays required (not `null` or `undefined`)
 * */
export type QueryResult<Base> = Base extends NonNullable<BuiltIns>
	? Base
	: Base extends BuiltIns
	? NonNullable<Base> | null
	: Base extends (infer U)[]
	? NonNullable<QueryResult<U>[]>
	: Base extends object
	? {
			[Key in keyof Base]-?: NonNullable<Base[Key]> extends unknown[]
				? NonNullable<QueryResult<Base[Key]>>
				: QueryResult<Base[Key]>;
	  }
	: unknown;
