import "@testing-library/jest-dom";
import "jest-extended";
import { enableFetchMocks } from "jest-fetch-mock";

import { type SiteMetaData } from "./hooks/useSiteMetadata";

// Enable mock fetch, mostly for the autocomplete requests from the header
enableFetchMocks();

// SiteHeader uses useStaticQuery in it, so easier to mock it globally as a no-op
jest.mock("./components/SiteHeader/SiteHeader", () => {
	return {
		SiteHeader: jest.fn((): null => null),
	};
});

// Avoid site distinction banner affecting all page snapshots
jest.mock("./components/SiteDistinction/SiteDistinction", () => {
	return {
		SiteDistinction: jest.fn((): null => null),
	};
});

// Mock the useSiteMetadata hook as it uses useStaticQuery under the hood, which itself mocked!
jest.mock("./hooks/useSiteMetadata", () => {
	return {
		useSiteMetadata: jest.fn(
			(): SiteMetaData => ({
				isBNF: true,
				siteUrl: "https://bnf.nice.org.uk",
				searchUrl: "https://mock-search-api.nice.org.uk",
				siteTitleShort: "BNF",
				siteTitleLong: "British National Formulary",
			})
		),
	};
});
