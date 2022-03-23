import { render, screen, within, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { navigate, useStaticQuery } from "gatsby";
import React from "react";

import { mockQueryData } from "@/hooks/useMedicinesGuidancePages.test";

import MedicinesGuidanceIndexPage from "./";

describe("Medicines guidance index page", () => {
	(useStaticQuery as jest.Mock).mockReturnValue(mockQueryData);

	it("should add content start skip link target id to page header", () => {
		render(<MedicinesGuidanceIndexPage />);
		const heading1 = screen.getByRole("heading", {
			level: 1,
		});
		// eslint-disable-next-line testing-library/no-node-access
		expect(heading1.parentElement).toHaveProperty("id", "content-start");
	});

	it("should render the page title with the expected text", async () => {
		render(<MedicinesGuidanceIndexPage />);
		await waitFor(() => {
			expect(document.title).toStartWith("Medicines guidance");
		});
	});

	it("should render the page heading with the expected text", () => {
		render(<MedicinesGuidanceIndexPage />);
		expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
			"Medicines guidance"
		);
	});

	it("should render a list of sections", () => {
		render(<MedicinesGuidanceIndexPage />);
		expect(
			screen.getByRole("list", {
				name: "Pages in the medicines guidance section",
			})
		).toBeInTheDocument();
	});

	it("should render correct number of list items", () => {
		render(<MedicinesGuidanceIndexPage />);
		const linkList = screen.getByRole("list", {
			name: "Pages in the medicines guidance section",
		});
		expect(within(linkList).getAllByRole("listitem")).toHaveLength(2);
	});

	it("should render a Gatsby Link component for each item", () => {
		render(<MedicinesGuidanceIndexPage />);
		const testLink = screen.getByRole("link", {
			name: "Guidance on prescribing",
		});
		userEvent.click(testLink);
		expect(navigate).toHaveBeenCalledWith(
			"/medicines-guidance/guidance-on-prescribing/"
		);
	});
});
