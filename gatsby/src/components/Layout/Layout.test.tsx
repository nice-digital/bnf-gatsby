import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

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
});
