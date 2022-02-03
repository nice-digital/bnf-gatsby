/* eslint-disable testing-library/no-render-in-setup */
/* eslint-disable testing-library/no-node-access */
import { render, screen, waitFor, within } from "@testing-library/react";

import { SiteHeader } from "./SiteHeader";

describe("SiteHeader", () => {
	describe("Autocomplete", () => {
		it.todo(
			"should apply the correct forumlary prefix for autocomplete results"
		);
		it.todo("should not return a template if there is no suggestion or link");
		it.todo("should return the correct label(s)");
		it.todo("should have a correctly formatted url for autocomplete queries");
	});
});
