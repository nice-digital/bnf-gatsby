import { render, screen } from "@testing-library/react";

import { Layout } from "@/components/Layout/Layout";

describe("Layout", () => {
	it("should match snapshot", () => {
		const { container } = render(
			<Layout>
				<div>Content</div>
			</Layout>
		);
		expect(container).toMatchSnapshot();
	});

	it("Should not render the browser banner by default", () => {
		render(
			<Layout>
				<div>Content</div>
			</Layout>
		);

		expect(
			// eslint-disable-next-line testing-library/prefer-presence-queries
			screen.queryByRole("heading", { level: 2, name: "Browser support" })
		).toBeNull();
	});

	it("Should render a banner whenever IE11 is detected", () => {
		Object.defineProperty(global.document, "documentMode", { value: "test" }); // Spoof IE by adding a documentMode property to the document object

		render(
			<Layout>
				<div>Content</div>
			</Layout>
		);

		expect(
			screen.getByRole("heading", { level: 2, name: "Browser support" })
		).toBeInTheDocument();
	});
});
