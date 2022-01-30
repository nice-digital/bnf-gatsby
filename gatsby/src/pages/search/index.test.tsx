import {
	waitFor,
	render,
	screen,
	within,
	waitForElementToBeRemoved,
} from "@testing-library/react";
import React from "react";

import { search } from "@nice-digital/search-client";

import noResultsResponse from "@/mockdata/noresults-response.json";
import pageTwoResponse from "@/mockdata/pagetwo-response.json";
import searchResponseJson from "@/mockdata/search-response.json";
import spellCheckJsonResponse from "@/mockdata/spellcheck-response.json";

import SearchPage from "./";

const searchMock = search as jest.Mock;

describe("Search Page", () => {
	beforeEach(() => {
		searchMock.mockResolvedValue(searchResponseJson);
	});

	describe("Robots", () => {
		it("should hide page from robots using noindex meta tag", async () => {
			render(<SearchPage />);

			await waitFor(() => {
				// eslint-disable-next-line testing-library/no-node-access
				expect(document.querySelector("meta[name='robots']")).toHaveAttribute(
					"content",
					"noindex"
				);
			});
		});
	});

	describe("Page title", () => {
		it("should set page title when loading", async () => {
			searchMock.mockImplementationOnce(() => {
				// Mock a pending promise to allow us to assert on the loading title
				return new Promise(jest.fn());
			});
			render(<SearchPage />);

			await waitFor(() => {
				expect(document.title).toContain("Loading… | Search results |");
			});
		});

		it("should set page title when results loaded", async () => {
			render(<SearchPage />);

			await waitFor(() => {
				expect(document.title).toContain("aspirin | Search results |");
			});
		});

		it("should set page title when results loaded for page >=2 ", async () => {
			searchMock.mockResolvedValueOnce(pageTwoResponse);
			render(<SearchPage />);

			await waitFor(() => {
				expect(document.title).toContain("Page 2 | dentist | Search results |");
			});
		});

		it("should set page title when no results", async () => {
			searchMock.mockResolvedValueOnce(noResultsResponse);

			render(<SearchPage />);

			await waitFor(() => {
				expect(document.title).toContain(
					"No results | ferrari | Search results |"
				);
			});
		});

		it("should set page title when errored", async () => {
			searchMock.mockResolvedValueOnce({ failed: true });
			render(<SearchPage />);

			await waitFor(() => {
				expect(document.title).toContain("Error");
			});
		});
	});

	describe("Error handling", () => {
		beforeEach(() => {
			searchMock.mockResolvedValueOnce({ failed: true });
		});

		it("should fall back to error message if the response doesn't come back", async () => {
			render(<SearchPage />);

			await waitFor(() => {
				expect(screen.getByText(/Error page content/i)).toBeInTheDocument();
			});
		});
	});

	describe("Screen reader announcements", () => {
		let gatsbyAnnouncer: HTMLDivElement;
		beforeEach(() => {
			gatsbyAnnouncer = document.createElement("div");
			gatsbyAnnouncer.id = "gatsby-announcer";
			gatsbyAnnouncer.setAttribute("aria-live", "assertive");
			gatsbyAnnouncer.setAttribute("aria-atomic", "true");
			document.body.appendChild(gatsbyAnnouncer);
		});

		afterEach(() => {
			document.body.removeChild(gatsbyAnnouncer);
		});

		it("should make a screen reader announcement when the search results have loaded", async () => {
			render(<SearchPage />);
			await waitFor(() => {
				expect(
					screen.getByText("Showing 1 to 10 of 234 for aspirin", {
						selector: "[aria-live='assertive']",
					})
				).toBeInTheDocument();
			});
		});

		it("should make a screen reader announcement when the search result response has errored", async () => {
			searchMock.mockResolvedValueOnce({ failed: true });
			render(<SearchPage />);
			await waitFor(() => {
				expect(
					screen.getByText("An error occurred", {
						selector: "[aria-live='assertive']",
					})
				).toBeInTheDocument();
			});
		});

		it("should make a screen reader announcement when the search result response is loading", async () => {
			render(<SearchPage />);
			expect(
				screen.getByText("Loading search results", {
					selector: "[aria-live='assertive']",
				})
			).toBeInTheDocument();

			await waitFor(() => {
				expect(
					screen.queryByText("Loading search results", {
						selector: "[aria-live='assertive']",
					})
				).toBeNull();
			});
		});
	});

	describe("Breadcrumbs", () => {
		it.each([
			["NICE", "https://www.nice.org.uk/"],
			["BNF", "/"],
		])(
			"should render default '(%s)' breadcrumb",
			(breadcrumbText, expectedHref) => {
				render(<SearchPage />);

				const breadcrumbNav = screen.getByRole("navigation", {
					name: "Breadcrumbs",
				});
				const breadcrumb = within(breadcrumbNav).getByRole("link", {
					name: breadcrumbText,
				});

				expect(breadcrumb).toHaveAttribute("href", expectedHref);
			}
		);

		it("should render a loading breadcrumb", async () => {
			render(<SearchPage />);

			const breadcrumbNav = screen.getByRole("navigation", {
				name: "Breadcrumbs",
			});

			expect(
				within(breadcrumbNav).getByText("Loading search results…")
			).toBeInTheDocument();

			await waitForElementToBeRemoved(() =>
				within(breadcrumbNav).queryByText("Loading search results…")
			);
		});

		it("should not link to the original query if we're on page 1", async () => {
			render(<SearchPage />);

			const breadcrumbNav = screen.getByRole("navigation", {
				name: "Breadcrumbs",
			});

			await waitFor(() => {
				expect(
					within(breadcrumbNav).getByText("Search results for aspirin")
				).not.toHaveProperty("tagName", "A");
			});
		});

		it("should include a link to the original query if we're on page >= 2", async () => {
			searchMock.mockResolvedValueOnce(pageTwoResponse);

			render(<SearchPage />);

			const breadcrumbNav = screen.getByRole("navigation", {
				name: "Breadcrumbs",
			});

			await waitFor(() => {
				expect(
					within(breadcrumbNav).getByRole("link", {
						name: "Search results for dentist",
					})
				).toHaveProperty("href", expect.stringContaining("/search/?q=dentist"));
			});
		});

		it("should include non-clickable breadcrumb for page >= 2", async () => {
			searchMock.mockResolvedValueOnce(pageTwoResponse);

			render(<SearchPage />);

			const breadcrumbNav = screen.getByRole("navigation", {
				name: "Breadcrumbs",
			});

			await waitFor(() => {
				expect(within(breadcrumbNav).getByText("Page 2")).not.toHaveProperty(
					"tagName",
					"A"
				);
			});
		});
	});

	describe("Page header", () => {
		it("should add content start skip link target id to page header", () => {
			render(<SearchPage />);

			const heading1 = screen.getByRole("heading", {
				level: 1,
			});

			// eslint-disable-next-line testing-library/no-node-access
			expect(heading1.parentElement).toHaveProperty("id", "content-start");
		});

		it("should render a loading message in the page header lead", async () => {
			render(<SearchPage />);
			expect(
				screen.getByText("Loading search results…", {
					selector: ".page-header__lead",
				})
			).toBeInTheDocument();

			await waitForElementToBeRemoved(() =>
				screen.queryByText("Loading search results…", {
					selector: ".page-header__lead",
				})
			);
		});

		it("should render the results summary in page header lead", async () => {
			render(<SearchPage />);

			await waitFor(() => {
				expect(
					screen.getByText(
						(_, node) =>
							node?.textContent === "Showing 1 to 10 of 234 for aspirin"
					)
				).toHaveClass("page-header__lead");
			});
		});

		it("should highlight current search term in page header lead", async () => {
			render(<SearchPage />);

			await waitFor(() => {
				expect(
					screen.getByText("aspirin", { selector: ".page-header__lead strong" })
				).toBeInTheDocument();
			});
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
						screen.getByText(/Showing 1 to 1 of 1/i, { exact: false })
							.textContent
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
});
