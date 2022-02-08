/* eslint-disable testing-library/no-render-in-setup */
/* eslint-disable testing-library/no-node-access */
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { useSiteMetadata } from "@/hooks/useSiteMetadata";

// Header is mocked globally in setup
const { SiteHeader } = jest.requireActual("./SiteHeader");
const { Header } = jest.requireActual("@nice-digital/global-nav");
const GlobalNavHeader = Header;

const mockAutocompleteEndPointSuggestionsForDrug = [
	{
		Title: "SODIUM BICARBONATE",
		TitleHtml: "<mark>SODIUM</mark> BICARBONATE",
		Link: "/drugs/sodium-bicarbonate",
		TypeAheadType: "Drug",
	},
];

const mockNoLinkorTitle = [
	{
		TypeAheadType: "Drug",
	},
];

describe("SiteHeader", () => {
	describe("Autocomplete", () => {
		it.only("should apply the BNF forumlary prefix for autocomplete results", async () => {
			(useSiteMetadata as jest.Mock).mockImplementationOnce(() => ({
				isBNF: true,
			}));

			render(<SiteHeader />);

			// Global nav uses a fetch to load autocomplete suggestions, and changing the input value triggers this fetch
			fetchMock.mockResponseOnce(
				JSON.stringify(mockAutocompleteEndPointSuggestionsForDrug)
			);
			userEvent.type(await screen.findByRole("combobox"), "SODIUM");

			await waitFor(() => {
				const suggestedElements = screen.queryAllByRole("option");
				expect(suggestedElements[0].textContent).toEqual(
					"SODIUM BICARBONATE (BNF drugs/monographs)"
				);
			});
		});
		it("should apply the BNFC forumlary prefix for autocomplete results", async () => {
			(useSiteMetadata as jest.Mock).mockImplementationOnce(() => ({
				isBNF: false,
			}));

			render(<SiteHeader />);

			// Global nav uses a fetch to load autocomplete suggestions, and changing the input value triggers this fetch
			fetchMock.mockResponseOnce(
				JSON.stringify(mockAutocompleteEndPointSuggestionsForDrug)
			);
			userEvent.type(await screen.findByRole("combobox"), "SODIUM");

			await waitFor(() => {
				const suggestedElements = screen.queryAllByRole("option");
				expect(suggestedElements[0].textContent).toEqual(
					"SODIUM BICARBONATE (BNFC drugs/monographs)"
				);
			});
		});
		it("should not return a template if there is no suggestion or link", async () => {
			(useSiteMetadata as jest.Mock).mockImplementationOnce(() => ({
				isBNF: false,
			}));

			render(<SiteHeader />);

			fetchMock.mockResponseOnce(JSON.stringify(mockNoLinkorTitle));
			userEvent.type(await screen.findByRole("combobox"), "zyx");
			await waitFor(() => {
				const suggestedElements = screen.queryAllByRole("option");
				expect(suggestedElements).toHaveLength(1);
			});
		});
		it.todo("should append the correct typeahead label(s) for suggestions");
		it.todo("should have a correctly formatted url for autocomplete queries");
	});
});