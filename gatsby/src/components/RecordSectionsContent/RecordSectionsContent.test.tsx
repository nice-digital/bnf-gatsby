/* eslint-disable testing-library/no-render-in-setup */
import { render, screen } from "@testing-library/react";

import { type RecordSection } from "@/utils";

import { RecordSectionsContent } from "./RecordSectionsContent";

const sections: RecordSection[] = [
	// Notice these are in the wrong order so we can test they're rendered in the correct order
	{
		order: 1,
		title: "Section 2",
		slug: "section-2",
		content: "<p>Section 2 content</p>",
	},
	{
		order: 0,
		title: "<strong>Section</strong> 1",
		slug: "section-1",
		content: "<p>Section 1 content</p>",
	},
];

describe("RecordSectionsContent", () => {
	beforeEach(() => {
		render(
			<RecordSectionsContent sections={sections}>test</RecordSectionsContent>
		);
	});

	it("should render section element for each given content section", () => {
		expect(screen.getAllByRole("region")).toHaveLength(2);
	});

	it("should render sections in correct order", () => {
		expect(
			screen.getAllByRole("heading").map((heading) => heading.textContent)
		).toStrictEqual(["Section 1", "Section 2"]);
	});

	it("should create heading 2 with slug id for section HTML title", () => {
		const heading = screen.getAllByRole("heading", { level: 2 })[0];
		expect(heading).toHaveProperty("innerHTML", "<strong>Section</strong> 1");
		expect(heading).toHaveProperty("id", "section-1");
	});

	it("should label sections with section title", () => {
		expect(
			screen.getByRole("region", { name: "Section 1" })
		).toBeInTheDocument();
	});

	it("should render HTML content inside section", () => {
		const section = screen.getByRole("region", { name: "Section 2" });
		expect(section.innerHTML).toMatchInlineSnapshot(
			`"<h2 id=\\"section-2\\">Section 2</h2><div><p>Section 2 content</p></div>"`
		);
	});

	it("should add CSS class to target first heading for removing margin", () => {
		const headings = screen.getAllByRole("heading", { level: 2 });
		expect(headings[0]).toHaveClass("firstHeading");
		expect(headings[1]).not.toHaveClass("firstHeading");
	});
});
