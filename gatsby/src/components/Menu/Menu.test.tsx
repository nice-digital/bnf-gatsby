import { render, screen } from "@testing-library/react";

import { Menu, MenuProps } from "./Menu";

const menuProps: MenuProps = {
	label: "My menu",
	link: "my-menu",
	pages: [
		{
			href: "/a-page/",
			title: "A title of a page",
		},
		{
			href: "/another-page/",
			title: "Another page title",
		},
	],
};

describe("Menu", () => {
	it("should render labelled navigation wrapper", () => {
		render(<Menu {...menuProps} />);

		expect(
			screen.getByRole("navigation", { name: "My menu pages" })
		).toBeInTheDocument();
	});

	it("should render provided aria-label", () => {
		render(<Menu {...menuProps} ariaLabel={"a different label"} />);

		expect(
			screen.getByRole("navigation", { name: "a different label" })
		).toBeInTheDocument();
	});

	it("should render anchor back to page", () => {
		render(<Menu {...menuProps} />);

		expect(screen.getByRole("link", { name: "My menu" })).toHaveAttribute(
			"href",
			"my-menu"
		);
	});

	it("should render anchor for each page record", () => {
		render(<Menu {...menuProps} />);

		expect(screen.getAllByRole("link")).toHaveLength(3);
	});
});
