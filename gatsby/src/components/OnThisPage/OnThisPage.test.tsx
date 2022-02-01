import { render, screen } from "@testing-library/react";

import { OnThisPage, type OnThisPageProps } from "./OnThisPage";

describe("OnThisPage", () => {
	const sections: OnThisPageProps = {
		sections: [
			{
				id: "test-1",
				title: "Test 1",
			},
			{
				id: "test-2",
				title: "Test 2",
			},
		],
	};

	it("should render labelled navigation wrapper", () => {
		render(<OnThisPage {...sections} />);

		expect(
			screen.getByRole("navigation", { name: "On this page" })
		).toBeInTheDocument();
	});

	it("should render a heading", () => {
		render(<OnThisPage {...sections} />);

		expect(
			screen.getByRole("heading", { name: "On this page" })
		).toBeInTheDocument();
	});

	it("should render a list of items", () => {
		render(<OnThisPage {...sections} />);
		expect(screen.getByRole("list")).toBeInTheDocument();
	});

	it("should render an anchor for each section", () => {
		render(<OnThisPage {...sections} />);
		expect(screen.getAllByRole("link")).toHaveLength(sections.sections.length);
	});

	it.todo("should highlight the currently visible section");
});
