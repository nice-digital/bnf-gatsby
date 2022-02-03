import { render, screen } from "@testing-library/react";

import { mockDocuments } from "@/mockdata/mock-documents";

import { SearchCardList } from "./SearchCardList";

describe("SearchCardList", () => {
	it("should render a card for each result", () => {
		render(<SearchCardList documents={mockDocuments} />);
		expect(screen.getAllByRole("listitem")).toHaveLength(2);
	});

	it("should render search result title", () => {
		render(<SearchCardList documents={mockDocuments} />);
		expect(screen.getByText("Test title")).toBeInTheDocument();
	});

	it("should render teaser as HTML string", () => {
		render(<SearchCardList documents={mockDocuments} />);
		expect(
			screen.getByText(
				(_, node) =>
					node?.tagName === "P" &&
					node?.textContent ===
						"Non-extensible bandages Light-weight conforming bandages Tubular bandages and garments Support..."
			)
		).toBeInTheDocument();
	});

	it("should render search result title as link to search result item", () => {
		render(<SearchCardList documents={mockDocuments} />);
		expect(screen.getByRole("link", { name: "Test title" })).toHaveAttribute(
			"href",
			"/testpathandquery/test.html"
		);
	});
});
