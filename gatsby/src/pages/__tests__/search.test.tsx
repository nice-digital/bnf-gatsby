import { waitFor, render, screen } from "@testing-library/react";
import React from "react";

import SearchPage from "./../search/index";

jest.useFakeTimers();

describe("Search Page", () => {
	it("should render a loading message before the request comes in", async () => {
		render(<SearchPage />);
		const loadingElements = screen.getAllByText(/loading search results/i);
		expect(loadingElements).toHaveLength(2);
		await waitFor(() => {
			expect(screen.queryAllByText("Loading search results")).toHaveLength(0);
		});
	});

	it.only("should render a loading message in the page header lead paragraph before the request comes in", async () => {
		render(<SearchPage />);
		const pageHeader = screen.getByText("Loading search results", {
			selector: ".page-header__lead",
		});

		await waitFor(() => {
			expect(
				screen.queryByText("Loading search results", {
					selector: ".page-header__lead",
				})
			).toBeNull();
		});
	});

	it("should render a loading message in the breadcrumb before the request comes in", async () => {
		screen.getByRole("listitem", {
			name: "Loading search results",
		});
	});
});
