import { render, waitFor, screen } from "@testing-library/react";
import React from "react";

import NotFoundPage from "./404";

describe("404", () => {
	it("should match snapshot", () => {
		const { container } = render(<NotFoundPage />);

		expect(container).toMatchSnapshot();
	});

	it("should render h1 with correct text", () => {
		render(<NotFoundPage />);

		expect(screen.queryByText("We can't find this page")?.tagName).toBe("H1");
	});

	it("should render a noindex robots meta tag", async () => {
		render(<NotFoundPage />);

		await waitFor(() => {
			// eslint-disable-next-line testing-library/no-node-access
			expect(document.querySelector("meta[name='robots']")).toHaveAttribute(
				"content",
				"noindex"
			);
		});
	});
});
