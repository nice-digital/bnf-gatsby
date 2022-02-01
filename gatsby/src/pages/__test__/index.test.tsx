import { render, screen } from "@testing-library/react";
import React from "react";

import AboutIndexPage from "../about/index";

describe("About index page", () => {
	const aboutPageData = {
		allAboutPages: {
			sectionList: [
				{
					title: "Test title",
					slug: "test-title",
				},
				{
					title: "Test title 2",
					slug: "test-title-2",
				},
			],
		},
	};
	it("should render the title with the expected text", () => {
		render(<AboutIndexPage data={aboutPageData} />);
		expect(screen.getByText("About BNF")?.tagName).toBe("H1");
	});

	it("should render a list of sections", () => {
		render(<AboutIndexPage data={aboutPageData} />);
		// First list is the breadcrumbs, so we need to check that the second
		// available list exists
		expect(screen.getAllByRole("list")[1]).toBeInTheDocument();
	});
});
