export * from "./types";

/**
 * Returns whether the given object is truthy or not but casted to the object's type.
 *
 * This casting allows filtering of types that are potentially falsy:
 *
 * @example
 * 	const list: (SomeType | undefined)[] = []
 * 	someList.filter(isTruthy).map(a: SomeType => {
 *  		// Do something
 *  	})
 * */
export const isTruthy = <TMaybe>(
	maybeT: TMaybe | null | undefined
): maybeT is TMaybe => !!maybeT;

const nonAlphaNumericsAtStart =
	/^[^a-zA-Z0-9\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u024F]*/;

/** Lowercases the first letter of a string, when it's not an acronym */
export const decapitalize = (str: string): string => {
	if (!str) return str;

	// E.g. MucoClear® 6% or Nebusal®
	if (str.includes("®")) return str;

	const firstWordMatch = str
			.trim()
			.match(
				/^([a-zA-Z0-9\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u024F]*)(.*)$/u
			) as RegExpMatchArray,
		firstWord = firstWordMatch[1],
		rest = firstWordMatch[2],
		firstLetter = firstWord[0],
		firstLetterLower = firstLetter.toLocaleLowerCase();

	// It's already lower so just return as-is to save doing more than we need
	if (firstLetter === firstLetterLower) return str;

	// First word with abbreviation e.g. C1 or HIV or A2A Spacer
	if (firstWord === firstWord.toLocaleUpperCase()) return str;

	// E.g. St John's wort
	if (firstWord === "St") return str;

	// Single word brand names with an uppercase first letter and another uppercase letter elsewhere e.g. OptiChamber
	if (
		firstLetter === firstLetter.toLocaleUpperCase() &&
		firstWord.slice(1) !== firstWord.slice(1).toLocaleLowerCase()
	)
		return str;

	// Brand names made of multiple words stating with capitals e.g. Fresubin Original Drink
	if (firstLetter === firstLetter.toLocaleUpperCase() && rest) {
		const words = rest.split(/\s/).filter(Boolean);

		if (
			words.every((word) => {
				word = word.replace(nonAlphaNumericsAtStart, "");

				return word[0] === word[0].toLocaleUpperCase();
			})
		)
			return str;
	}

	return firstLetterLower + firstWord.slice(1) + rest;
};
