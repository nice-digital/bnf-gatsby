import { When } from "@wdio/cucumber-framework";

import { scrollInToView } from "../support/action/scrollInToView";
import { waitForScrollToElement } from "../support/action/waitForScrollToElement";
import { waitForTitleToChange } from "../support/action/waitForTitleToChange";
import { waitForUrlToChange } from "../support/action/waitForUrlToChange";
import { getSelector } from "../support/selectors";

When(/^I click the ([^"]*) breadcrumb$/, async (breadcrumbText: string) => {
	const pageTitle = await browser.getTitle(),
		breadcrumbsListSelector = await getSelector("breadcrumbs list");

	await scrollInToView(breadcrumbsListSelector, "main");

	const breadcrumbListElement = await $(breadcrumbsListSelector),
		breadcrumbElement = await breadcrumbListElement.$(`=${breadcrumbText}`);

	await breadcrumbElement.click();
	await waitForTitleToChange(pageTitle);
});

// Use this for link clicks as it waits for the link to scroll into view before clicking it.
// This is beacuse we're using CSS smooth scrolling (scroll-behavior: smooth; in CSS), which
// means the usual WDIO click won't work.
// We need to wait for the following before clicking:
// 	- the scroll to finish
//	- the element to be in viewport
//	- the scrolling to have stopped so the element is not moving
When(/^I click the "([^"]*)" link$/, async (linkText: string) => {
	const pageTitle = await browser.getTitle(),
		urlStr = await browser.getUrl(),
		selector = `a=${linkText}`,
		// Look for anchors within main to avoid conflicting with links in the Global Nav
		contextSelector = "main";

	await scrollInToView(selector, contextSelector);

	const element = await (await $(contextSelector)).$(selector);
	await element.click();

	await waitForUrlToChange(urlStr);

	const oldUrl = new URL(urlStr);
	const newUrl = new URL(await browser.getUrl());

	if (newUrl.pathname !== oldUrl.pathname) {
		// Because we use Gatsby links using history API we don't have full page loads
		// so we have to wait for the title to change before we click. This guarantees the
		// new page is ready before we execute the next step.
		await waitForTitleToChange(pageTitle);
	} else {
		// We must be linking to a hash on the same page, which must be the ID of another element
		const targetElementId = newUrl.hash;
		await waitForScrollToElement(targetElementId);
	}
});
