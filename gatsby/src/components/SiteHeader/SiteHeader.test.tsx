/* eslint-disable testing-library/no-render-in-setup */
/* eslint-disable testing-library/no-node-access */
import { render, screen, waitFor } from "@testing-library/react";

import { useSiteMetadata } from "@/hooks/useSiteMetadata";

// Header is mocked globally in setup
const { SiteHeader } = jest.requireActual("./SiteHeader");

const mockAutocompleteEndPointSuggestionsForDrug = [
	{
		Title: "SODIUM BICARBONATE",
		TitleHtml: "<mark>SODIUM</mark> BICARBONATE",
		Link: "/drugs/sodium-bicarbonate",
		TypeAheadType: "Drug",
	},
];

describe("SiteHeader", () => {
	describe("Autocomplete", () => {
		it("should apply the correct forumlary prefix for autocomplete results", async () => {
			(useSiteMetadata as jest.Mock).mockImplementationOnce(() => ({
				isBNF: false,
			}));
			render(<SiteHeader />);

			// Global nav uses a fetch to load autocomplete suggestions, and changing the input value triggers this fetch
			fetchMock.mockResponseOnce(
				JSON.stringify(mockAutocompleteEndPointSuggestionsForDrug)
			);
			await waitFor(() => {
				expect(screen.getByText(/Error page content/i)).toBeInTheDocument();
			});
		});
		it.todo("should not return a template if there is no suggestion or link");
		it.todo("should return the correct label(s)");
		it.todo("should have a correctly formatted url for autocomplete queries");
	});
});
