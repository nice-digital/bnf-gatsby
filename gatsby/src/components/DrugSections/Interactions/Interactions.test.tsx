import { render, screen } from "@testing-library/react";

import { Interactions, type InteractionsProps } from "./Interactions";

describe("Interactions", () => {
	const props: InteractionsProps = {
		potName: "Interactions",
		slug: "interactions",
		interactants: [],
	};

	it("should render section with accessible name", () => {
		render(<Interactions {...props} />);

		expect(
			screen.getByRole("region", { name: "Interactions" })
		).toBeInTheDocument();
	});

	it("should render heading 2 with section name", () => {
		render(<Interactions {...props} />);

		expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent(
			"Interactions"
		);
	});

	it("should match snapshot for single interactant", () => {
		render(
			<Interactions
				{...props}
				interactants={[{ slug: "abacavir", title: "Abacavir" }]}
			/>
		);

		expect(screen.getByRole("region")).toMatchSnapshot();
	});

	it("should match snapshot for multiple interactant", () => {
		render(
			<Interactions
				{...props}
				interactants={[
					{ slug: "abacavir", title: "Abacavir" },
					{ slug: "lamivudine", title: "<em>Lamivudine</em>" },
				]}
			/>
		);

		expect(screen.getByRole("region")).toMatchSnapshot();
	});
});
