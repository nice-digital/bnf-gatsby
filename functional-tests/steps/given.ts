import { Given } from "@cucumber/cucumber";

import { acceptCookieBanner } from "@nice-digital/wdio-cucumber-steps/lib/support/action/acceptCookieBanner";
import { openWebsite } from "@nice-digital/wdio-cucumber-steps/lib/support/action/openWebsite";

import { getPath, PageName } from "../support/pagePaths";

Given(/^I open the (.*) page$/, async (pageName: PageName) => {
	await openWebsite("url", getPath(pageName));

	// Make sure the cookie banner is dismissed before we continue, as it's an overlay so blocks clicks
	await acceptCookieBanner();
});
