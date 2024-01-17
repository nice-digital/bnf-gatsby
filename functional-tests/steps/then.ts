import { Then } from "@wdio/cucumber-framework";

import { checkContainsText } from "@nice-digital/wdio-cucumber-steps/lib/support/check/checkContainsText.js";
import { checkEqualsText } from "@nice-digital/wdio-cucumber-steps/lib/support/check/checkEqualsText.js";

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
// structure:
// <ul class="autocomplete__menu autocomplete__menu--overlay" aria-labelledby="headlessui-combobox-label-:r0:" role="listbox" id="headlessui-combobox-options-:r2:" data-headlessui-state="open">
//   <li class="visually-hidden autocomplete__option" id="headlessui-combobox-option-:r3:" role="option" tabindex="-1" aria-selected="false" data-headlessui-state="">
//     <a href="/search?q=Para">Search for <em>Para</em></a>
//   </li>
//   <li class="autocomplete__option" role="option" tabindex="-1" aria-selected="false" id="headlessui-combobox-option-:r6:" data-headlessui-state="">
//     <a href="/drugs/paracetamol/"><mark>Para</mark>cetamol (BNF drugs/monographs)</a>
//   </li>
//   <li class="autocomplete__option" role="option" tabindex="-1" aria-selected="false" id="headlessui-combobox-option-:r8:" data-headlessui-state="">
//     <a href="/drugs/parathyroid-hormone/"><mark>Para</mark>thyroid hormone (BNF drugs/monographs)</a>
//   </li>
//   <li class="autocomplete__option" role="option" tabindex="-1" aria-selected="false" id="headlessui-combobox-option-:r9:" data-headlessui-state="">
//     <a href="/drugs/liquid-paraffin/">Liquid <mark>para</mark>ffin (BNF drugs/monographs)</a>
//   </li>
//   <li class="autocomplete__option" role="option" tabindex="-1" aria-selected="false" id="headlessui-combobox-option-:ra:" data-headlessui-state="">
//     <a href="/drugs/paraffin-yellow-soft/"><mark>Para</mark>ffin, yellow, soft (BNF drugs/monographs)</a>
//   </li>
//   <li class="autocomplete__option" role="option" tabindex="-1" aria-selected="false" id="headlessui-combobox-option-:rb:" data-headlessui-state="">
//     <a href="/drugs/teriparatide/">Teri<mark>para</mark>tide (BNF drugs/monographs)</a>
//   </li>
// </ul>

// Then(
// 	/^I expect to see "([^"]*)" in the autocomplete suggestions$/,
// 	async (text: string) => {
// 	  const optionSelector = await getSelector("autocomplete option");
// 	  const visibleOptionSelector = optionSelector + ":not(.visually-hidden)";
// 	  const optionElement = await $(visibleOptionSelector);
// 	  await optionElement.waitForExist({ timeout: 20000 });

// 	  const menuSelector = await getSelector("autocomplete menu");
// 	  await checkContainsText("element", menuSelector, "", text);
// 	}
//   );

Then(
	/^I expect to see "([^"]*)" in the autocomplete suggestions$/,
	async (text: string) => {
		const optionSelector = await getSelector("autocomplete option");
		const visibleOptionSelector = optionSelector + ":not(.visually-hidden)";
		const visibleOptions = await $$(visibleOptionSelector);
		const optionElement = visibleOptions[0];
		await optionElement.waitForExist({ timeout: 20000 });

		const menuSelector = await getSelector("autocomplete menu");
		await checkContainsText("element", menuSelector, "", text);
	}
);
