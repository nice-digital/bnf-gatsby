import { render, screen, within, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { navigate, useStaticQuery } from "gatsby";
import React from "react";

import { mockQueryData } from "@/hooks/useMedicalDevicePages.test";

import MedicalDevicesIndexPage from "./";

describe("Medical devices index page", () => {
	(useStaticQuery as jest.Mock).mockReturnValue(mockQueryData);

	it("should render the page title with the expected text", async () => {
		render(<MedicalDevicesIndexPage />);
		await waitFor(() => {
			expect(document.title).toStartWith("Medical devices");
		});
	});

	it("should render meta description", async () => {
		render(<MedicalDevicesIndexPage />);
		await waitFor(() => {
			// eslint-disable-next-line testing-library/no-node-access
			expect(document.querySelector("meta[name=description]")).toHaveAttribute(
				"content",
				"Browse medical devices, by type."
			);
		});
	});

	it("should add content start skip link target id to page header", () => {
		render(<MedicalDevicesIndexPage />);
		const heading1 = screen.getByRole("heading", {
			level: 1,
		});
		// eslint-disable-next-line testing-library/no-node-access
		expect(heading1.parentElement).toHaveProperty("id", "content-start");
	});

	it("should render the page heading with the expected text", () => {
		render(<MedicalDevicesIndexPage />);
		expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
			"Medical devices"
		);
	});

	it("should render a list of sections", () => {
		render(<MedicalDevicesIndexPage />);
		expect(
			screen.getByRole("list", {
				name: "Pages in the medical devices section",
			})
		).toBeInTheDocument();
	});

	it("should render correct number of list items", () => {
		render(<MedicalDevicesIndexPage />);
		const linkList = screen.getByRole("list", {
			name: "Pages in the medical devices section",
		});
		expect(within(linkList).getAllByRole("listitem")).toHaveLength(2);
	});

	it("should render a Gatsby Link component for each item", async () => {
		const user = userEvent.setup();
		render(<MedicalDevicesIndexPage />);
		const testLink = screen.getByRole("link", {
			name: "Artificial saliva products",
		});
		user.click(testLink);

		await waitFor(() =>
			expect(navigate).toHaveBeenCalledWith(
				"/medical-devices/artificial-saliva-products/"
			)
		);
	});
});
