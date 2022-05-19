import { render, screen } from "@testing-library/react";

import Substance, { type SubstanceProps } from "./Substance";

const substanceProps: SubstanceProps = {
	substance: {
		title: "Fresubin® 1500 Complete",
		slug: "fresubin-1500-complete",
		presentations: [
			{
				acbs: [],
				carbohydrateGrams: "13.0",
				energyKCal: "100",
				energyKj: "420",
				fatGrams: null,
				fibreConstituents: [],
				fibreGrams: "1.5",
				formulation: "Liquid per 100 mL",
				presentationNote: null,
				proteinGrams: "3.8",
				fatConstituents: [],
				carbohydrateConstituents: [],
				proteinConstituents: [],
				borderlineSubstancePreps: [],
				rxAdvice: null,
				specialCharacteristics: [],
			},
		],
		introductionNote:
			"<p>Not suitable for use in child under 3 years; not recommended for child under 6 years</p>",
		id: "PHP103613",
	},
	label: "Some label",
};

describe("substance", () => {
	it("should match snapshot", () => {
		const { container } = render(<Substance {...substanceProps} />);

		expect(container).toMatchSnapshot();
	});

	it("should render a header for the substance", () => {
		render(<Substance {...substanceProps} />);
		const heading2 = screen.getByRole("heading", {
			level: 2,
		});

		// eslint-disable-next-line testing-library/no-node-access
		expect(heading2.parentElement).toHaveTextContent("Fresubin® 1500 Complete");
	});

	it("should render an alert containing the introduction note", () => {
		render(<Substance {...substanceProps} />);
		const alert = screen.getByText(
			"Not suitable for use in child under 3 years; not recommended for child under 6 years"
		);
		expect(alert).toBeTruthy;
	});

	it("should render a label", () => {
		render(<Substance {...substanceProps} />);
		const alert = screen.getByText("Some label");
		expect(alert).toBeTruthy;
	});

	it("should render each presentation", async () => {
		render(<Substance {...substanceProps} />);
		const presentation = screen.getAllByRole("definition");
		expect(presentation.length).toEqual(5);
		expect(presentation[0]).toHaveTextContent("Liquid per 100 mL");
	});
});
