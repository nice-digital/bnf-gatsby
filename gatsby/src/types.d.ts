import {
	type FeedBaseNamedPot,
	type FeedMedicinalForms,
	type FeedMedicinalForm,
	type FeedConstituentDrugs,
} from "@nice-digital/gatsby-source-bnf";

export interface RecordSection {
	order: number;
	title: string;
	slug: string;
	content: string;
}

export interface MenuPageLink {
	href: string;
	title: string;
}

export type WithSlug<T extends object> = T & {
	slug: string;
};

export type PotWithSlug = WithSlug<FeedBaseNamedPot>;

/**
 * We add slugs to the feed content when we create GraphQL nodes.
 * So this type represents the original medicinal forms type from the feed but
 * augmented with slugs on each form */
export type MedicinalFormsWithSlugs = {
	medicinalForms: WithSlug<FeedMedicinalForm>[];
} & FeedMedicinalForms;

export interface SlugAndTitle {
	title: string;
	slug: string;
}

export type ConstituentsWithSlugs = {
	// A consituent can be null if it doesn't correspond to a monograph in its own right
	constituents: (SlugAndTitle | null)[];
} & FeedConstituentDrugs;
