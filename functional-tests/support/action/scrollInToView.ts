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

	await element.scrollIntoView();

	const navsection = await $(
		'[aria-labelledby="navigate-to-section"]'
	).isExisting();

	if (navsection) {
		await browser.execute(() => {
			const navsectionel = document.querySelector<HTMLElement>(
				'[aria-labelledby="navigate-to-section"]'
			)!;

			navsectionel.style.display = "none";
		});

		console.log("Element selector #####", element.selector);
	}

	await waitForScrollToElement(selector, 5000, contextSelector);
}
