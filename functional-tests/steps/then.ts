import { Then } from "@cucumber/cucumber";

import { scrollInToView } from "../support/action/scrollInToView";

Then(
	/I expect to see label (\d+) \(([^)]+)\)$/,
	async (labelNumber: string, labelText: string) => {
		const labelHeadingText = "Label " + labelNumber,
			labelSectionSelector = `section[aria-labelledby="label-${labelNumber}"]`,
			labelSectionElement = await browser.$(labelSectionSelector),
			labelHeadingElement = await labelSectionElement.$(`h2`),
			labelEnglishElement = await labelSectionElement.$(`=${labelText}`);

		await scrollInToView(`h2=${labelHeadingText}`, labelSectionSelector);

		expect(labelHeadingElement).toHaveText(labelHeadingText);
		expect(labelEnglishElement).toBeExisting();
	}
);
