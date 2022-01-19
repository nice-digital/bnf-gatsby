import { waitFor, render, screen, within } from "@testing-library/react";
import React from "react";

import SearchPage from "./../search/index";

jest.useFakeTimers();

describe("Search Page", () => {
	it("should render a loading message in the page header lead paragraph before the request comes in", async () => {
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

	it("should render a loading message in the breadcrumb before the request comes in", async () => {
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
});
