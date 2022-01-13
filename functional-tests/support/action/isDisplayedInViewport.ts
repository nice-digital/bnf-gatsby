/**
 * Returns whether the given element is visible within the viewport.
 * If the selector returns multiple elements, then it uses the first matching element.
 * @param {String} selector
 */
export async function isDisplayedInViewport(
	selector: string,
	contextSelector?: string
): Promise<boolean> {
	const elements = contextSelector
		? await (await $(contextSelector)).$$(selector)
		: await $$(selector);

	expect(elements).toBeElementsArrayOfSize({ gte: 1 });

	const element = elements[0];

	return element.isDisplayedInViewport();
}
