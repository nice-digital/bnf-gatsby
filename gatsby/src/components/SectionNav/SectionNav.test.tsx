import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderToString } from "react-dom/server";

import { SectionNav } from "./SectionNav";

const defaultProps = {
	sections: [
		{ title: "test-1", id: "wound-type-1889862293" },
		{ title: "test-2", id: "wound-type-1889862294" },
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

		it("should not be expanded by default", () => {
			render(<SectionNav {...defaultProps} />);
			expect(
				screen.getByRole("button", {
					name: `Show Navigate to section`,
				})
			).toHaveAttribute("aria-expanded", "false");
		});

		it("should expand on click", () => {
			render(<SectionNav {...defaultProps} />);
			const button = screen.getByRole("button", {
				name: `Show Navigate to section`,
			});
			userEvent.click(button);
			screen.debug();
			expect(button).toHaveAttribute("aria-expanded", "true");
		});

		it("should render an icon with an expanded class on click", () => {
			render(<SectionNav {...defaultProps} />);
			const button = screen.getByRole("button", {
				name: `Show Navigate to section`,
			});

			// eslint-disable-next-line testing-library/no-node-access
			const svg = button.querySelector("svg");
			expect(svg?.classList.value).toEqual("icon");
			userEvent.click(button);
			expect(svg).toHaveClass("icon iconExpanded");
		});
	});

	describe("Link list", () => {
		it("should render links when button is clicked", () => {
			render(<SectionNav {...defaultProps} />);
			const button = screen.getByRole("button", {
				name: `Show Navigate to section`,
			});
			userEvent.click(button);
			expect(screen.getByRole("link", { name: "test-1" })).toBeInTheDocument();
			expect(screen.getByRole("link", { name: "test-2" })).toBeInTheDocument();
		});

		it("should render an aria labelled list in specific order by dom snapshot", () => {
			render(<SectionNav {...defaultProps} />);
			const button = screen.getByRole("button", {
				name: `Show Navigate to section`,
			});

			userEvent.click(button);
			const list = screen.getByRole("list");
			expect(list).toMatchInlineSnapshot(`
			<ol
			  aria-label="Jump links to sections on this page"
			  class="linkList"
			>
			  <li>
			    <a
			      href="#wound-type-1889862293"
			    >
			      test-1
			    </a>
			  </li>
			  <li>
			    <a
			      href="#wound-type-1889862294"
			    >
			      test-2
			    </a>
			  </li>
			</ol>
		`);
		});

		it("should render a list item for each section when button is clicked", () => {
			render(<SectionNav {...defaultProps} />);
			const button = screen.getByRole("button", {
				name: `Show Navigate to section`,
			});
			expect(screen.queryAllByRole("listitem")).toHaveLength(0);
			userEvent.click(button);
			expect(screen.queryAllByRole("listitem")).toHaveLength(2);
		});
	});
});
