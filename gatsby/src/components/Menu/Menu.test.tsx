import { useLocation } from "@reach/router";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Link } from "gatsby";
import React from "react";

import { Menu, MenuProps } from "./Menu";

const menuProps: MenuProps = {
	label: "My menu",
	ariaLabel: "example pages",
	link: { destination: "my-menu", elementType: Link },
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
			screen.getByRole("navigation", { name: "example pages" })
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

describe("mobile menu", () => {
	it("should not render mobile toggle button in static build", () => {
		const spy = jest.spyOn(React, "useLayoutEffect").mockImplementation(() => {
			/*noop*/
		});

		render(<Menu {...menuProps} />);

		expect(
			screen.queryByRole("button", {
				name: "Expand menu for example pages",
			})
		).toBeNull();

		spy.mockRestore();
	});

	it("should render mobile anchor to topic menu in static build", () => {
		const spy = jest.spyOn(React, "useLayoutEffect").mockImplementation(() => {
			/*noop*/
		});

		render(<Menu {...menuProps} />);

		expect(
			screen.getAllByRole("link", {
				name: "My menu",
			})[0]
		).toHaveAttribute("href", "#collapsible-menu");

		spy.mockRestore();
	});

	it("should use the page title where available for the menu link", () => {
		(useLocation as jest.Mock).mockReturnValue(
			new URL("https://bnf-gatsby-tests.nice.org.uk/another-page/")
		);

		const spy = jest.spyOn(React, "useLayoutEffect").mockImplementation(() => {
			/*noop*/
		});

		render(<Menu {...menuProps} />);

		expect(
			screen.getAllByRole("link", {
				name: "Another page title",
			})[0]
		).toBeInTheDocument;

		spy.mockRestore();
	});

	it("should render collapsed mobile menu button client side", () => {
		render(<Menu {...menuProps} />);

		const toggleBtn = screen.getByRole("button", {
			name: "Expand menu for example pages",
		});
		expect(toggleBtn).toBeInTheDocument();
		expect(toggleBtn).toHaveAttribute("aria-expanded", "false");
	});

	it("should collapse toggle button on click", async () => {
		const user = userEvent.setup();
		render(<Menu {...menuProps} />);

		const toggleBtn = screen.getByRole("button", {
			name: "Expand menu for example pages",
		});

		user.click(toggleBtn);

		await waitFor(() => {
			expect(toggleBtn).toHaveAttribute("aria-expanded", "true");
		});
		expect(toggleBtn).toHaveAttribute(
			"aria-label",
			"Collapse menu for example pages"
		);
	});
});
