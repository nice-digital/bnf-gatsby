import baseSlugify, { type Options, counter } from "@sindresorhus/slugify";
import { decode } from "he";
import striptags from "striptags";

/** Cache a unique slugifier per node type so we can have unique slugs */
const sluggerMap = new Map<
	string | undefined,
	(string: string, options?: Options) => string
>();

const options: Options = {
	decamelize: false,
	customReplacements: [
		["'", ""],
		["’", ""],
		// Default library behaviour is to replaec & with "and" but we prefer to just remove ampersands
		["&", ""],
	],
};

/**
 * Strips HTML tags and slugifies the given string

 * @returns The lowercase, slugified string
 */
export const slugify = (toSlug: string, key?: string): string => {
	if (!toSlug) throw new Error("Cannot slugify an empty string");

	// Some titles (e.g. `Frequently asked questions for the BNF and BNF <i>for Children</i> (BNFC)—general`)
	// have HTML tags in so strip these before we slugify
	toSlug = decode(striptags(toSlug));

	// No key given means no incrementing the counter.
	// This is useful for things like 'pots' on drugs or medical devices
	// where many objects share the same title e.g. "Indications and dose"
	if (!key) return baseSlugify(toSlug, options);

	const countingSlugify = sluggerMap.get(key) || counter();
	sluggerMap.set(key, countingSlugify);

	return countingSlugify(toSlug, options);
};

export const resetCounters = (): void => sluggerMap.clear();
