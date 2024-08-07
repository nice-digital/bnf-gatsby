import { Then } from "@wdio/cucumber-framework";

import { checkContainsText } from "@nice-digital/wdio-cucumber-steps/lib/support/check/checkContainsText.js";
import { checkEqualsText } from "@nice-digital/wdio-cucumber-steps/lib/support/check/checkEqualsText.js";

import { acceptEULA } from "../support/action/acceptEULA.js";
import { scrollInToView } from "../support/action/scrollInToView.js";
import { getSelector, SelectorName } from "../support/selectors/index.js";

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

Then("I expect to see search results for {}", async (searchTerm: string) => {
	const selector = await getSelector("search results summary");
	await checkContainsText("element", selector, "", `results for ${searchTerm}`);
});

Then(
	/^I expect to see a list of ([^0-9"]*)$/,
	async (selectorName: SelectorName) => {
		const selector = await getSelector(selectorName),
			elements = await $$(selector);
		expect(elements).toBeElementsArrayOfSize({ gte: 1 });
	}
);

Then(
	"I expect to see a list of {int} {}",
	async (numberOfResults: number, selectorName: SelectorName) => {
		const selector = await getSelector(selectorName),
			elements = await $$(selector);
		expect(elements).toBeElementsArrayOfSize(numberOfResults);
	}
);

Then(
	"I expect to see {int} total search results for {}",
	async (numberOfResults: number, searchTerm: string) => {
		const selector = await getSelector("search results summary");
		await checkEqualsText(
			"element",
			selector,
			"",
			`Showing 1 to 10 of ${numberOfResults} results for ${searchTerm}`
		);
	}
);

Then(
	/^I expect to see "([^"]*)" in the autocomplete suggestions$/,
	async (text: string) => {
		const optionElement = await $(
			(await getSelector("autocomplete option")) + ":not(.visually-hidden)"
		);
		await optionElement.waitForExist({ timeout: 20000 });

		const menuSelector = await getSelector("autocomplete menu");
		await checkContainsText("element", menuSelector, "", text);
	}
);
Then(/^I accept EULA banner terms$/, acceptEULA);
Then(/^I close cookies banner$/, async () => {
	const cookiesBannerClose = await $("#ccc-close");
	await cookiesBannerClose.scrollIntoView();
	await cookiesBannerClose.isDisplayed();
	await cookiesBannerClose.click();
});
