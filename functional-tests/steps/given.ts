import { Given } from "@cucumber/cucumber";

import { acceptCookieBanner } from "@nice-digital/wdio-cucumber-steps/lib/support/action/acceptCookieBanner";
import { openWebsite } from "@nice-digital/wdio-cucumber-steps/lib/support/action/openWebsite";
import { setWindowSize } from "@nice-digital/wdio-cucumber-steps/lib/support/action/setWindowSize";

import { waitForReact } from "../support/action/waitForReact";
import { getPath, PageName } from "../support/pagePaths";

Given(/^I open the (.*) page$/, async (pageName: PageName) => {
	await openWebsite("url", getPath(pageName));

	await waitForReact();

	// Make sure the cookie banner is dismissed before we continue, as it's an overlay so blocks clicks
	//await acceptCookieBanner();
});

Given(/^I am using a desktop size browser$/, () =>
	setWindowSize("1366", "768")
);

Given(/^I am using a mobile size browser$/, () => setWindowSize("320", "568"));
