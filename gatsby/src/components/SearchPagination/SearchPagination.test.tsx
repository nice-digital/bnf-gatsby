import { useLocation } from "@reach/router";
import { render, screen } from "@testing-library/react";
import React from "react";

import { SearchPagination } from "./SearchPagination";

describe("SearchPagination", () => {
	beforeEach(() => {
		(useLocation as jest.Mock).mockImplementation(
			() => new URL("https://bnf-gatsby-tests.nice.org.uk/search/?q=test")
		);
	});

	it("should not render pagination when there are no results", () => {
		render(
			<SearchPagination
				results={{ firstResult: 1, resultCount: 0, pageSize: 10 }}
			/>
		);

		expect(screen.queryByRole("navigation", { name: "Pagination" })).toBeNull();
	});

	it("should add CSS class to wrapper element for styling top margin", () => {
		render(
			<SearchPagination
				results={{ firstResult: 1, resultCount: 20, pageSize: 10 }}
			/>
		);

		expect(
			// eslint-disable-next-line testing-library/no-node-access
			screen.getByRole("navigation", { name: "Pagination" }).parentElement
		).toHaveClass("pagination");
	});

	it("should show total pages from given result count and page size", () => {
		render(
			<SearchPagination
				results={{ firstResult: 11, resultCount: 21, pageSize: 10 }}
			/>
		);

		expect(
			screen.getByText((_, node) => node?.textContent === "Page 2 of 3")
		).toBeInTheDocument();
	});

	it("should use correct href for next page links", () => {
		render(
			<SearchPagination
				results={{ firstResult: 1, resultCount: 11, pageSize: 10 }}
			/>
		);

		expect(screen.getByRole("link", { name: "Next page" })).toHaveAttribute(
			"href",
			"/search/?q=test&pa=2"
		);
	});

	it("should use correct href for previous page links", () => {
		render(
			<SearchPagination
				results={{ firstResult: 31, resultCount: 31, pageSize: 10 }}
			/>
		);

		expect(screen.getByRole("link", { name: "Previous page" })).toHaveAttribute(
			"href",
			"/search/?q=test&pa=3"
		);
	});

	it("should not set pa param for page 1", () => {
		render(
			<SearchPagination
				results={{ firstResult: 11, resultCount: 11, pageSize: 10 }}
			/>
		);

		expect(screen.getByRole("link", { name: "Previous page" })).toHaveAttribute(
			"href",
			"/search/?q=test"
		);
	});
});
