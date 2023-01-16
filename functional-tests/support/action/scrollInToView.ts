import { checkIfElementExists } from "@nice-digital/wdio-cucumber-steps/lib/support/lib/checkIfElementExists";

import { scrollIntoView_NICE } from "./scrollIntoView_NICE";
import { waitForScrollToElement } from "./waitForScrollToElement";

export async function scrollInToView(
	selector: string,
	contextSelector?: string
): Promise<void> {
	await checkIfElementExists(selector);

	const element = contextSelector
		? await (await $(contextSelector)).$(selector)
		: await $(selector);

	// TODO: Why do we need to pause here? For some reason the scrollIntoView call below doesn't always work.
	// it _might_ be conflicting with scroll restoration in Gatsby https://www.gatsbyjs.com/docs/how-to/routing/scroll-restoration/
	await browser.pause(250);

	// replace scrollIntoView with custom function as webdriverio has changed it's implementation
	// from v7 to v8 which stopped working in our cases
	await scrollIntoView_NICE(selector, contextSelector);
	await waitForScrollToElement(selector, 5000, contextSelector);
}
