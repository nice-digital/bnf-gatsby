import { render, waitFor, screen, within } from "@testing-library/react";
import { useStaticQuery } from "gatsby";

import Presentation, { PresentationProps } from "./Presentation";

const presentationProps: PresentationProps = {
	presentation: {
		acbs: [
			"<p><b>Standard ACBS indications:</b> Disease-related malnutrition, intractable malabsorption, pre-operative preparation of malnourished patients, dysphagia, proven inflammatory bowel disease, following total gastrectomy, short-bowel syndrome, bowel fistula except bowel fistula and pre-operative preparation of malnourished patients.</p>",
		],
		carbohydrateGrams: "13.0",
		energyKCal: "100",
		energyKj: "420",
		fatGrams: null,
		fibreConstituents: null,
		fibreGrams: "1.5",
		formulation: "Liquid (tube feed) per 100 mL",
		presentationNote: null,
		proteinGrams: "3.8",
		fatConstituents: [],
		carbohydrateConstituents: ["(sugars 0.9 g)"],
		proteinConstituents: ["milk, soya proteins"],
		borderlineSubstancePreps: [
			{
				manufacturer: "Fresenius Kabi Ltd",
				name: "Fresubin Original Fibre liquid",
				packs: [],
				ampId: "871011000001101",
				blackTriangle: false,
				controlledDrugSchedule: null,
				activeIngredients: [],
				sugarFree: null,
			},
			{
				manufacturer: "Fresenius Kabi Ltd",
				name: "Fresubin 1500 Complete liquid",
				packs: [],
				ampId: "16052411000001103",
				blackTriangle: false,
				controlledDrugSchedule: null,
				activeIngredients: [],
				sugarFree: null,
			},
		],
		rxAdvice: null,
		specialCharacteristics: [
			"Contains fish oil, residual lactose, soya. Gluten-free",
		],
	},
};

describe("presentation", () => {
	it("should match snapshot", () => {
		const { container } = render(<Presentation {...presentationProps} />);

		expect(container).toMatchSnapshot();
	});

	it("should render a definition list for each presentation, with a number of terms matching the data supplied", () => {
		render(<Presentation {...presentationProps} />);
		const allTerms = screen.getAllByRole("term");
		expect(allTerms.length).toBe(7);
	});

	it("should render each preparation", async () => {
		render(<Presentation {...presentationProps} />);
		const preparation = screen.getAllByRole("heading", { level: 3 });
		expect(preparation.length).toEqual(2);
		expect(preparation[0]).toHaveTextContent("Fresubin Original Fibre liquid");
	});
});
