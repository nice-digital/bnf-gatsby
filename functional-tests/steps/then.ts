import { Then } from "@cucumber/cucumber";

import { checkContainsText } from "@nice-digital/wdio-cucumber-steps/lib/support/check/checkContainsText";
import { checkEqualsText } from "@nice-digital/wdio-cucumber-steps/lib/support/check/checkEqualsText";

import { scrollInToView } from "../support/action/scrollInToView";
import { getSelector, SelectorName } from "../support/selectors";

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
		const optionElement = await $(await getSelector("autocomplete option"));
		await optionElement.waitForExist({ timeout: 20000 });

		const menuSelector = await getSelector("autocomplete menu");
		await checkContainsText("element", menuSelector, "", text);
	}
);

Then("I expect the url to contain {string}", async (expectedUrl: string) => {
	const actualUrl = await browser.getUrl();
	expect(actualUrl).toContain(expectedUrl);
});
