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
export const isTruthy = <TMaybe>(maybeT: TMaybe | null): maybeT is TMaybe =>
	!!maybeT;
