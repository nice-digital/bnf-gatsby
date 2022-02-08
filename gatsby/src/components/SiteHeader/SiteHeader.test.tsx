/* eslint-disable testing-library/no-render-in-setup */
/* eslint-disable testing-library/no-node-access */
import { render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

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

const useSiteMetadataMock = useSiteMetadata as jest.Mock;

describe("SiteHeader", () => {
	describe("Autocomplete", () => {
		it("should apply the BNF forumlary prefix for autocomplete results for BNF", async () => {
			useSiteMetadataMock.mockReturnValueOnce({
				isBNF: true,
			});

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
		it("should apply the BNFC forumlary prefix for autocomplete results for BNFC", async () => {
			useSiteMetadataMock.mockReturnValueOnce({
				isBNF: false,
			});

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

		it("should have a correctly formatted url for autocomplete queries", async () => {
			useSiteMetadataMock.mockReturnValueOnce({
				isBNF: false,
				searchUrl: "/test-api-url",
			});

			render(<SiteHeader />);

			// Global nav uses a fetch to load autocomplete suggestions, and changing the input value triggers this fetch
			fetchMock.mockResponseOnce(
				JSON.stringify([{ Title: "test", Link: "/test" }])
			);
			userEvent.type(await screen.findByRole("combobox"), "anything");

			await waitFor(() => {
				expect(fetchMock).toHaveBeenCalledTimes(1);
				// eslint-disable-next-line testing-library/no-wait-for-multiple-assertions
				expect(fetchMock).toHaveBeenCalledWith(
					"/test-api-url/typeahead?index=bnfc&q=anything"
				);
			});
		});

		it("should render the suggestion link correctly", async () => {
			useSiteMetadataMock.mockReturnValueOnce({
				isBNF: false,
			});

			render(<SiteHeader />);

			// Global nav uses a fetch to load autocomplete suggestions, and changing the input value triggers this fetch
			fetchMock.mockResponseOnce(
				JSON.stringify(mockAutocompleteEndPointSuggestionsForDrug)
			);
			userEvent.type(await screen.findByRole("combobox"), "SODIUM");

			await waitFor(() => {
				const link = screen.getByRole("link", {
					name: /sodium bicarbonate \(bnfc drugs\/monographs\)/i,
				});
				expect(link).toHaveAttribute("href", "/drugs/sodium-bicarbonate");
			});
		});

		it.each([
			["Drug", "BNF drugs/monographs", true],
			["Drug", "BNFC drugs/monographs", false],
			["BorderlineSubstance", "BNF borderline substances", true],
			["BorderlineSubstance", "BNFC borderline substances", false],
			["MedicalDevice", "BNF medical devices", true],
			["MedicalDevice", "BNFC medical devices", false],
			["TreatmentSummary", "BNF treatment summaries", true],
			["TreatmentSummary", "BNFC treatment summaries", false],
			["WoundManagement", "BNF wound management", true],
			["WoundManagement", "BNFC wound management", false],
			["", "BNF search", true],
			["", "BNFC search", false],
		])(
			"should show label for %s typeahead suggestions - %s",
			async (TypeAheadType, expected, isBNF) => {
				useSiteMetadataMock.mockReturnValueOnce({
					isBNF,
				});

				render(<SiteHeader />);

				// Global nav uses a fetch to load autocomplete suggestions, and changing the input value triggers this fetch
				fetchMock.mockResponseOnce(
					JSON.stringify([{ Title: "test", Link: "/test", TypeAheadType }])
				);
				userEvent.type(await screen.findByRole("combobox"), "anything");

				await waitFor(() => {
					const form = screen.getByRole("search");
					const suggestedElement = within(form).queryByRole("option");
					expect(suggestedElement).toHaveTextContent(`test (${expected})`);
				});
			}
		);
	});
});
