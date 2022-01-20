import { waitFor, render, screen, within } from "@testing-library/react";
import React from "react";

import { search } from "@nice-digital/search-client";

import searchResponseJson from "@/mockdata/search-response.json";
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

	describe("error handling", () => {
		beforeEach(() => {
			searchMock.mockResolvedValue({ failed: true });
		});

		it("should fall back to error message if the response doesn't come back", async () => {
			render(<SearchPage />);

			await waitFor(() => {
				expect(screen.getByText(/Error Page/i)).toBeInTheDocument();
			});
		});
	});

	describe("Screen reader announcements", () => {
		beforeEach(() => {
			const mockGatsbyAnnouncer = document.createElement("div");
			mockGatsbyAnnouncer.id = "gatsby-announcer";
			if (!document.getElementById("gatsby-announcer")) {
				document.body.appendChild(mockGatsbyAnnouncer);
			}
		});

		//TODO issue with this test
		it.skip("should make a screen reader announcement when the search results have loaded", async () => {
			render(<SearchPage />);
			const ariaLiveDiv = document.querySelector("#gatsby-announcer");
			expect(ariaLiveDiv).toBeInTheDocument();

			await waitFor(() => {
				screen.debug();
				expect(ariaLiveDiv?.textContent).toEqual(
					"Showing 1 to 10 of 234 for aspirin"
				);
			});
		});
		describe("Error condition", () => {
			// beforeEach(() => {
			// 	searchMock.mockResolvedValue({ failed: true });
			// });
			//TODO this test is failing - poss due to error page loading and not updating the announcement
			it.skip("should make a screen reader announcement when the search result response has errored", async () => {
				render(<SearchPage />);
				const ariaLiveDiv = document.querySelector("#gatsby-announcer");
				await waitFor(() => {
					expect(ariaLiveDiv?.textContent).toEqual(
						"There was an error getting search results"
					);
				});
			});
		});

		it("should make a screen reader announcement when the search result response is loading", () => {
			render(<SearchPage />);
			const ariaLiveDiv = document.querySelector("#gatsby-announcer");
			expect(ariaLiveDiv?.textContent).toEqual("Loading search results");
		});
	});

	describe("Breadcrumbs", () => {
		it.todo("should not link to the original query if we're on page 1");
		it.todo(
			"should include a link to the original query if we're on page >= 2"
		);
	});

	describe("result summary", () => {
		beforeEach(() => {
			searchMock.mockResolvedValue(searchResponseJson);
		});

		it("should render the result summary record count information", async () => {
			render(<SearchPage />);

			await waitFor(() => {
				expect(screen.getByText(/showing 1 to 10 of 234/i)).toBeInTheDocument();
			});
		});
	});

	describe("pagination", () => {
		//TODO implement page limit on search results page if required
		it.todo(
			"should not show any pagination if there are fewer results than the supplied page limit"
		);
	});

	describe("spelling suggestions", () => {
		beforeEach(() => {
			searchMock.mockResolvedValue(spellCheckJsonResponse);
		});

		it("should render the incorrect spelling and indicate it returned no results...", async () => {
			render(<SearchPage />);

			await waitFor(() => {
				expect(
					screen.getByText(/your search for/i, { exact: false }).textContent
				).toContain("Your search for ocelot returned no results");
			});
		});

		it("should render the corrected spelling after the result count", async () => {
			render(<SearchPage />);
			await waitFor(() => {
				expect(
					screen.getByText(/Showing 1 to 1 of 1/i, { exact: false }).textContent
				).toContain("for oculo");
			});
		});

		it("should format the spellchecked result summary with bold highligting for the search query(ies)", async () => {
			render(<SearchPage />);
			await waitFor(() => {
				const resultSummary = screen.getByText(/your search for/i);
				expect(resultSummary.innerHTML).toEqual(
					"Your search for <strong>ocelot</strong> returned no results<br>Showing 1 to 1 of 1 for <strong>oculo</strong>"
				);
			});
		});
	});
});
