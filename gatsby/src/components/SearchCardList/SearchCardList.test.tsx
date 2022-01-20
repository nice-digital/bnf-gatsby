import { render, screen } from "@testing-library/react";

import { mockDocuments } from "@/mockdata/mock-documents";

import { SearchCardList } from "./SearchCardList";

describe("SearchCard", () => {
	it("should render search result title", () => {
		render(<SearchCardList documents={mockDocuments} />);
		expect(screen.getByText("Test title")).toBeInTheDocument();
	});

	it("should render search result title as link to search result item", () => {
		render(<SearchCardList documents={mockDocuments} />);
		expect(screen.getByRole("link", { name: "Test title" })).toHaveAttribute(
			"href",
			"/testpathandquery/test.html"
		);
	});

	it.todo("test for no results returned");
});
