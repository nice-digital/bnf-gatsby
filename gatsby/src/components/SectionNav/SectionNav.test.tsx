import { render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderToString } from "react-dom/server";

import { SectionNav } from "./SectionNav";

const defaultProps = {
	sections: [
		{ title: "test-1", id: "1" },
		{ title: "test-2", id: "2" },
	],
};

describe("SectionNav", () => {
	it("should match snapshot server side", () => {
		const wrapper = document.createElement("div");
		wrapper.innerHTML = renderToString(<SectionNav {...defaultProps} />);

		expect(wrapper).toMatchSnapshot();
	});

	it("should match snapshot client side", () => {
		const { container } = render(<SectionNav {...defaultProps} />);
		expect(container).toMatchSnapshot();
	});

	describe("Button", () => {
		it("should render a button with an accessible label to show sections", () => {
			render(<SectionNav {...defaultProps} />);
			expect(
				screen.getByRole("button", {
					name: `Show Navigate to section`,
				})
			).toBeInTheDocument();
		});

		it("should expand on click", () => {
			render(<SectionNav {...defaultProps} />);
			const button = screen.getByRole("button", {
				name: `Show Navigate to section`,
			});
			userEvent.click(button);
			expect(button).toHaveAttribute("aria-expanded", "true");
		});
	});
});
