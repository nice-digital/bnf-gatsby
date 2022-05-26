import { checkIfElementExists } from "@nice-digital/wdio-cucumber-steps/lib/support/lib/checkIfElementExists";

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

	const navsection = await $(
		'[aria-labelledby="navigate-to-section"]'
	).isExisting();

	if (navsection) {
		await browser.execute(async (location: { x: number; y: number }) => {
			await window.scroll(0, location.y - 50);
		}, element.getLocation() as unknown as { x: number; y: number });
	} else {
		await element.scrollIntoView();
	}

	await browser.pause(750);
}
