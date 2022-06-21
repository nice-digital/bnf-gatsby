import { render, screen } from "@testing-library/react";
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

	describe("Link list", () => {
		it("should render links", () => {
			render(<SectionNav {...defaultProps} />);
			expect(screen.getByRole("link", { name: "test-1" })).toBeInTheDocument();
			expect(screen.getByRole("link", { name: "test-2" })).toBeInTheDocument();
		});

		it("should render an aria labelled list in specific order by dom snapshot", () => {
			render(<SectionNav {...defaultProps} />);
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
	});
});
