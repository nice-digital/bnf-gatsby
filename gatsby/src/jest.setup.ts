import "@testing-library/jest-dom";
import "jest-extended";

import { type SiteMetaData } from "./hooks/useSiteMetadata";
import { MenuPageLink } from "./types";

// SiteHeader uses useStaticQuery in it, so easier to mock it globally as a no-op
jest.mock("./components/SiteHeader/SiteHeader", () => {
	return {
		SiteHeader: jest.fn((): null => null),
	};
});

// Mock the useSiteMetadata hook as it uses useStaticQuery under the hood, which itself mocked!
jest.mock("./hooks/useSiteMetadata", () => {
	return {
		useSiteMetadata: jest.fn(
			(): SiteMetaData => ({
				isBNF: true,
				siteUrl: "https://bnf.nice.org.uk",
				siteTitleShort: "BNF",
				siteTitleLong: "British National Formulary",
			})
		),
	};
});

// Mock the useAboutPages hook to test the list of links (e.g. on the index page)
jest.mock("./hooks/useAboutPages", () => {
	return {
		useAboutPages: jest.fn((): MenuPageLink[] => [
			{ title: "Labels", href: "/about/labels/" },
			{
				title: "Publication <i>information</i>",
				href: "/about/publication-information/",
			},
		]),
	};
});
