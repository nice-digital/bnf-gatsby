import { render, screen } from "@testing-library/react";

import { Prep, type PrepProps } from "./Prep";

const prep: PrepProps["prep"] = {
	order: 0,
	name: "Emgality 120mg/1ml solution for injection pre-filled pens",
	manufacturer: "Eli Lilly and Company Ltd",
	ampId: "37499711000001101",
	blackTriangle: false,
	sugarFree: false,
	activeIngredients: ["Galcanezumab 120&#x2009;mg per 1&#x2009;ml"],
	packs: [
		{
			order: 0,
			amppId: "37499811000001109",
			size: "1",
			unit: "pre-filled disposable injection",
			nhsIndicativePrice: "£450.00",
			legalCategory: "POM",
			hospitalOnly: false,
		},
	],
};

describe("Prep", () => {
	it("should render section prep name and manufacturer in heading", () => {
		render(<Prep prep={prep} />);
		expect(screen.getByRole("heading", { level: 3 })).toHaveTextContent(
			"Emgality 120mg/1ml solution for injection pre-filled pens Eli Lilly and Company Ltd"
		);
	});

	it("should render black triangle in heading", () => {
		render(<Prep prep={{ ...prep, blackTriangle: true }} />);
		expect(screen.getByRole("heading", { level: 3 })).toHaveTextContent(
			"Emgality 120mg/1ml solution for injection pre-filled pens Eli Lilly and Company Ltd ▼"
		);
	});
});
