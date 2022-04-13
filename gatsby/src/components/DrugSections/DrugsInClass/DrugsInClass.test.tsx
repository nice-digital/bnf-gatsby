import { render, screen } from "@testing-library/react";

import { DrugsInClass, type DrugsInClassProps } from "./DrugsInClass";

describe("DrugsInClass", () => {
	const minimumProps: DrugsInClassProps = {
		potName: "Other drugs in class",
		slug: "other-drugs-in-class",
		drug: {
			slug: "aclidinium-bromide-with-formoterol",
			title: "Aclidinium bromide with formoterol",
		},
		primaryClassification: null,
		secondaryClassifications: [],
	};

	it("should render section with accessible name", () => {
		render(<DrugsInClass {...minimumProps} />);

		expect(
			screen.getByRole("region", { name: "Other drugs in class" })
		).toBeInTheDocument();
	});

	it("should render heading 2 with section name", () => {
		render(<DrugsInClass {...minimumProps} />);

		expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent(
			"Other drugs in class"
		);
	});
});
