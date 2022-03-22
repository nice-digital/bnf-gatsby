import { render, screen } from "@testing-library/react";

import { PotContent, type PotContentProps } from "./PotContent";

describe("PotContent", () => {
	const minimumProps: PotContentProps = {
		pot: {
			potName: "A <em>simple</em> pot",
			slug: "simple-pot",
		},
		children: <p>Child element</p>,
		showHeading: true,
		contentFor: "Anti-D (RH<sub>0</sub>) immunoglobulin",
		contentForPrefix: "For",
	};

	it("should match snapshot", () => {
		const { container } = render(<PotContent {...minimumProps} />);

		expect(container).toMatchSnapshot();
	});

	it("should render section with accessible name", () => {
		render(<PotContent {...minimumProps} />);

		expect(
			screen.getByRole("region", {
				name: "A simple pot For Anti-D (RH 0 ) immunoglobulin",
			})
		).toBeInTheDocument();
	});

	it("should render heading 3 with HTML section name", () => {
		render(<PotContent {...minimumProps} />);

		expect(screen.getByRole("heading", { level: 3 })).toHaveTextContent(
			"A simple pot For Anti-D (RH0) immunoglobulin"
		);
	});

	it("should visually show the heading when `showHeading` is true", () => {
		render(<PotContent {...minimumProps} />);

		expect(screen.getByRole("heading", { level: 3 })).not.toHaveClass(
			"visually-hidden"
		);
	});

	it("should visually hide the heading when `showHeading` is true", () => {
		render(<PotContent {...minimumProps} showHeading={false} />);

		expect(screen.getByRole("heading", { level: 3 })).toHaveClass(
			"visually-hidden"
		);
	});

	it("should render child content", () => {
		render(<PotContent {...minimumProps} />);

		expect(screen.getByText("Child element")).toHaveProperty("tagName", "P");
	});
});
