import { render, screen, within, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { navigate } from "gatsby";
import React from "react";

import { useAboutPages } from "@/hooks/useAboutPages";

import AboutIndexPage from "../about/index";

jest.mock("@/hooks/useAboutPages");
(useAboutPages as jest.Mock).mockImplementation(() => [
	{ title: "Test link", href: "/about/test-link/" },
	{
		title: "Publication <i>information</i>",
		href: "/about/publication-information/",
	},
]);

describe("About index page", () => {
	it("should add content start skip link target id to page header", () => {
		render(<AboutIndexPage />);
		const heading1 = screen.getByRole("heading", {
			level: 1,
		});
		// eslint-disable-next-line testing-library/no-node-access
		expect(heading1.parentElement).toHaveProperty("id", "content-start");
	});

	it("should render the page title with the expected text", async () => {
		render(<AboutIndexPage />);
		await waitFor(() => {
			expect(document.title).toStartWith("About");
		});
	});

	it("should render the page heading with the expected text", () => {
		render(<AboutIndexPage />);
		expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
			"About BNF"
		);
	});

	it("should render a list of sections", () => {
		render(<AboutIndexPage />);
		expect(
			screen.getByRole("list", { name: "Pages in the about section" })
		).toBeInTheDocument();
	});

	it("should render 2 list items", () => {
		render(<AboutIndexPage />);
		const linkList = screen.getByRole("list", {
			name: "Pages in the about section",
		});
		expect(within(linkList).getAllByRole("listitem")).toHaveLength(2);
	});

	it("should render a Gatsby Link component for each item", () => {
		render(<AboutIndexPage />);
		const testLink = screen.getByRole("link", { name: "Test link" });
		userEvent.click(testLink);
		expect(navigate).toHaveBeenCalledWith("/about/test-link/");
	});
});
