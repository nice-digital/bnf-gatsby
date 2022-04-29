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

export const decapitalize = (str: string): string => {
	if (!str) return str;

	const firstWordMatch = str.match(/^(\w*)(.*)$/) as RegExpMatchArray;

	const firstWord = firstWordMatch[1],
		rest = firstWordMatch[2];

	if (firstWord === firstWord.toLocaleUpperCase()) return str;

	return firstWord[0].toLocaleLowerCase() + firstWord.slice(1) + rest;
};
