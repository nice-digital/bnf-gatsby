import { waitFor, render, screen, within } from "@testing-library/react";
import React from "react";

import { search } from "@nice-digital/search-client";

import spellCheckJsonResponse from "@/mockdata/spellcheck-response.json";

import SearchPage from "./../search/index";

const searchMock = search as jest.Mock;

describe("Search Page", () => {
	it("should render a loading message in the page header lead paragraph before the request comes in, and then disappears when loaded", async () => {
		render(<SearchPage />);
		expect(
			screen.getByText("Loading search results", {
				selector: ".page-header__lead",
			})
		).toBeInTheDocument();

		await waitFor(() => {
			expect(
				screen.queryByText("Loading search results", {
					selector: ".page-header__lead",
				})
			).toBeNull();
		});
	});

	it("should render a loading message in the breadcrumb before the request comes in, and then disappears when loaded", async () => {
		render(<SearchPage />);

		const navigation = screen.getByRole("navigation", {
			name: /breadcrumbs/i,
		});

		const loadingBreadcrumb = within(navigation).getByText(
			/loading search results/i
		);

		expect(loadingBreadcrumb).toBeInTheDocument();

		await waitFor(() => {
			expect(within(navigation).queryByText(/loading search results/i))
				.toBeNull;
		});
	});

	describe("spelling suggestions", () => {
		beforeEach(() => {
			searchMock.mockResolvedValue(spellCheckJsonResponse);
		});

		// Your search for <strong> ocelot </strong> returned no results <br /> Showing 1 to 1 of 1 for <strong> oculo </strong>

		it("should render the incorrect spelling and indicate it returned no results...", async () => {
			render(<SearchPage />);
			await waitFor(() => {
				const view = screen.getByText(/your search for/i);
				expect(within(view).getByText(/ocelot/i)).toBeInTheDocument();
			});
		});

		it("should render the corrected spelling", async () => {
			render(<SearchPage />);
			await waitFor(() => {
				const view = screen.getByText(/your search for/i);
				expect(within(view).getByText(/oculo/i)).toBeInTheDocument();
			});
		});

		it("should render the result count", async () => {
			render(<SearchPage />);
			await waitFor(() => {
				expect(
					screen.getByText(/showing 1 to 1 of 1 for/i)
				).toBeInTheDocument();
			});
		});
	});
});
