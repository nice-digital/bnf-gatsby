import { render, screen, within } from "@testing-library/react";

import { SiteDistinction } from "./SiteDistinction";

describe("SiteDistinction", () => {
	it("should match snapshot", () => {
		render(<SiteDistinction />);
		expect(screen.getByLabelText("Show BNFC link")).toMatchSnapshot();
	});

	it("should render a button with an accessible label to show bnfc link", () => {
		render(<SiteDistinction />);
		const button = screen.getByRole("button");
		expect(button).toHaveAccessibleName("Show BNFC link");
	});

	it("should render visually hidden content for site switch", () => {
		render(<SiteDistinction />);

		const hiddenSpan = within(
			screen.getByRole("link", { name: "switch to BNFC" })
		).getByText("switch to");
		expect(hiddenSpan).toHaveClass("visually-hidden");
	});
});
