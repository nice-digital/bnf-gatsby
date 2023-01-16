import { checkIfElementExists } from "@nice-digital/wdio-cucumber-steps/lib/support/lib/checkIfElementExists";

const elementYPosition = (
	selector: string,
	contextSelector?: string
): number => {
	let element: Element;
	if (selector.indexOf("=") > -1) {
		// WDIO selectors can be in the form TAG=TEXT so parse these out into xpath
		// selectors so we can execute this in the browser

		const parts = selector.split("="),
			tag = parts[0] || "*",
			text = parts[1],
			xPath = `.//${tag}[normalize-space() = "${text}"]`;
		element = document.evaluate(
			xPath,
			contextSelector
				? document.querySelector(contextSelector) || document
				: document,
			null,
			XPathResult.FIRST_ORDERED_NODE_TYPE,
			null
		).singleNodeValue as Element;
		console.log("A", element.tagName, element.innerHTML);
		(element as HTMLElement).scrollIntoView();
	} else {
		console.log("B");
		element = (
			contextSelector
				? document.querySelector(contextSelector)?.querySelector(selector)
				: document.querySelector(selector)
		) as Element;
		element.scrollIntoView();
	}

	return 0;
};

export async function scrollNow(
	selector: string,
	contextSelector?: string
): Promise<boolean> {
	await checkIfElementExists(selector);

	const yPos = await browser.execute(
		elementYPosition,
		selector,
		contextSelector
	);

	// Scrolling to an element is never exactly 0 pixels, so leave a bit of tolerance +/- 1px
	return yPos >= -1 && yPos <= 1;
}

/**
 * Waits for the given element to be scrolled to.
 * The wait is required as we're using smooth scrolling.
 *
 * @param {String} selector
 * @param {Number} timeoutMs Timeout for waiting, in milliseconds
 */
export async function scrollGodDamn(
	selector: string,
	contextSelector?: string
): Promise<void> {
	await browser.waitUntil(
		async () => await scrollNow(selector, contextSelector)
	);
}
