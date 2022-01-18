import { render, screen } from "@testing-library/react";

import { SearchCardList } from "@/components/SearchCard/SearchCardList";

// import {
// 	mockDocuments,
// 	mockDocumentMatchingDates,
// 	mockDocumentUnpublished,
// 	mockDocumentSubSectionLinksBroken,
// } from "./mockDocuments";

describe("SearchCard", () => {
	it("should render search result title", () => {
		render(<SearchCardList documents={mockDocuments} />);
		expect(screen.getByText("Test title")).toBeInTheDocument();
	});

	it("should render search result title as link to search result item", () => {
		render(<SearchCardList documents={mockDocuments} />);
		expect(screen.getByRole("link", { name: "Test title" })).toHaveAttribute(
			"href",
			"/guidance/test"
		);
	});
});
