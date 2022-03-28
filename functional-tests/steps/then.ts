import { Then } from "@cucumber/cucumber";

import { scrollInToView } from "../support/action/scrollInToView";

Then(
	/I expect to see label (\d+) \(([^)]+)\)$/,
	async (labelNumber: string, labelText: string) => {
		const labelHeadingText = "Label " + labelNumber,
			labelSectionSelector = `section[aria-labelledby="label-${labelNumber}"]`,
			labelSectionElement = await browser.$(labelSectionSelector),
			labelHeadingElement = await labelSectionElement.$(`h2`),
			labelEnglishElement = await labelSectionElement.$(`p=${labelText}`);

		await scrollInToView(`h2=${labelHeadingText}`, labelSectionSelector);

		await expect(labelHeadingElement).toHaveText(labelHeadingText);
		await expect(labelEnglishElement).toBeExisting();
	}
);

Then("I expect that the BNF GTM container is available", async () => {
	const containerId = (await browser.executeAsync(function (
		done: (containerId: string) => void
	) {
		(window as unknown as { dataLayer: unknown[] }).dataLayer.push({
			event: "integration-test",
			eventCallback: function (containerId: string) {
				done(containerId);
			},
		});
	} as unknown as () => void)) as string;

	expect(containerId).toEqual("GTM-5H5L9GK");
});
