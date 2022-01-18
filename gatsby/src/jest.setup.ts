import "@testing-library/jest-dom";
import "jest-extended";

import { type SiteMetaData } from "./hooks/useSiteMetadata";

// SiteHeader uses useStaticQuery in it, so easier to mock it globally as a no-op
jest.mock("./components/SiteHeader/SiteHeader.tsx", () => {
	return {
		SiteHeader: (): null => null,
	};
});

// Mock the useSiteMetadata hook as it uses useStaticQuery under the hood, which itself mocked!
jest.mock("./hooks/useSiteMetadata", () => {
	return {
		useSiteMetadata: (): SiteMetaData => ({
			isBNF: true,
			siteUrl: "https://bnf.nice.org.uk",
			siteTitleShort: "BNF",
			siteTitleLong: "British National Formulary",
		}),
	};
});
