import { render, screen } from "@testing-library/react";

import { Prep, type PrepProps } from "./Prep";

const pack: PrepProps["prep"]["packs"][0] = {
	amppId: "37499811000001109",
	size: "1",
	unit: "pre-filled disposable injection",
	nhsIndicativePrice: "£450.00",
	legalCategory: "POM",
	hospitalOnly: false,
	colour: null,
	drugTariff: null,
	drugTariffPrice: null,
	acbs: false,
};

const prep: PrepProps["prep"] = {
	name: "Emgality 120mg/1ml solution for injection pre-filled pens",
	manufacturer: "Eli Lilly and Company Ltd",
	ampId: "37499711000001101",
	blackTriangle: false,
	sugarFree: false,
	activeIngredients: ["Galcanezumab 120&#x2009;mg per 1&#x2009;ml"],
	controlledDrugSchedule: null,
	packs: [pack],
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
			"▼ (black triangle) Emgality 120mg/1ml solution for injection pre-filled pens Eli Lilly and Company Ltd"
		);
	});

	it("should render a 'sugar free' element whenever the prep is sugar free", () => {
		render(<Prep prep={{ ...prep, sugarFree: true }} />);
		expect(screen.getByRole("heading", { level: 3 })).toHaveTextContent(
			"Sugar free Emgality 120mg/1ml solution for injection pre-filled pens Eli Lilly and Company Ltd"
		);
	});

	it("should render a controlled drug schedule whenever it exists in the feed", () => {
		render(
			<Prep prep={{ ...prep, controlledDrugSchedule: "Schedule 1 (CD Lic)" }} />
		);
		expect(screen.getByText("Schedule 1 (CD Lic)")).toBeInTheDocument();
	});

	it("should render active ingredients whenever they exist in the feed", () => {
		render(<Prep prep={prep} />);
		expect(
			screen.getByText("Galcanezumab 120 mg per 1 ml")
		).toBeInTheDocument();
	});

	it("should render a list of packs, containing one pack per item in the feed", () => {
		render(<Prep prep={prep} />);
		expect(screen.getAllByRole("listitem")).toHaveLength(prep.packs.length);
	});

	it("should render a definition list for each pack, with a number of terms matching the data supplied", () => {
		render(<Prep prep={prep} />);
		const allTerms = screen.getAllByRole("term");
		expect(allTerms.length).toBe(5);
	});

	it("should render the pack size", () => {
		render(<Prep prep={prep} />);
		const allTerms = screen.getAllByRole("term");
		const term = allTerms.find((t) => t.textContent?.trim() === "Size");
		expect(term).toBeInTheDocument();

		// eslint-disable-next-line testing-library/no-node-access
		const definition = term?.nextElementSibling;
		expect(definition?.nodeName).toBe("DD");
		expect(definition).toHaveTextContent(prep.packs[0].size || "");
	});

	it("should render the unit, including the 'acbs' flag", () => {
		render(
			<Prep
				prep={{
					...prep,
					packs: [
						{
							...pack,
							acbs: true,
						},
					],
				}}
			/>
		);
		const allTerms = screen.getAllByRole("term");
		const term = allTerms.find((t) => t.textContent?.trim() === "Unit");
		expect(term).toBeInTheDocument();

		// eslint-disable-next-line testing-library/no-node-access
		const definition = term?.nextElementSibling;
		expect(definition?.nodeName).toBe("DD");
		expect(definition).toHaveTextContent(prep.packs[0].unit || "");

		// eslint-disable-next-line testing-library/no-node-access
		const acbs = definition?.firstElementChild;
		expect(acbs?.nodeName).toBe("ABBR");
		expect(acbs).toHaveTextContent("(ACBS)");
	});

	it("should render the indicative price, including the 'hospital only' flag", () => {
		render(
			<Prep
				prep={{
					...prep,
					packs: [
						{
							...pack,
							hospitalOnly: true,
						},
					],
				}}
			/>
		);
		const allTerms = screen.getAllByRole("term");
		const term = allTerms.find(
			(t) => t.textContent?.trim() === "NHS indicative price"
		);
		expect(term).toBeInTheDocument();

		// eslint-disable-next-line testing-library/no-node-access
		const definition = term?.nextElementSibling;
		expect(definition?.nodeName).toBe("DD");
		expect(definition).toHaveTextContent(
			`${prep.packs[0].nhsIndicativePrice} (Hospital only)` || ""
		);
	});

	it("should render no indicative price message", () => {
		render(
			<Prep
				prep={{
					...prep,
					packs: [
						{
							...pack,
							nhsIndicativePrice: null,
						},
					],
				}}
			/>
		);

		expect(
			screen.getByText("No NHS indicative price available")
		).toBeInTheDocument();
	});

	it("should render no indicative price message with hospital only flag", () => {
		render(
			<Prep
				prep={{
					...prep,
					packs: [
						{
							...pack,
							nhsIndicativePrice: null,
							hospitalOnly: true,
						},
					],
				}}
			/>
		);

		expect(
			screen.getByText("No NHS indicative price available (Hospital only)")
		).toBeInTheDocument();
	});

	it("should render the drug tariff info when supplied", () => {
		render(
			<Prep
				prep={{
					...prep,
					packs: [
						{
							amppId: "37499811000001109",
							size: "1",
							unit: "pre-filled disposable injection",
							nhsIndicativePrice: "£450.00",
							legalCategory: "POM",
							hospitalOnly: false,
							colour: null,
							drugTariff: "Part VIIIA Category C",
							drugTariffPrice: "£1.75",
							acbs: false,
						},
					],
				}}
			/>
		);

		const allTerms = screen.getAllByRole("term");

		const tariffTerm = allTerms.find(
			(t) => t.textContent?.trim() === "Drug tariff"
		);
		expect(tariffTerm).toBeInTheDocument();

		// eslint-disable-next-line testing-library/no-node-access
		const tariffDefinition = tariffTerm?.nextElementSibling;
		expect(tariffDefinition?.nodeName).toBe("DD");
		expect(tariffDefinition).toHaveTextContent("Part VIIIA Category C");

		const tariffPriceTerm = allTerms.find(
			(t) => t.textContent?.trim() === "Drug tariff price"
		);
		expect(tariffPriceTerm).toBeInTheDocument();

		// eslint-disable-next-line testing-library/no-node-access
		const tariffPriceDefinition = tariffPriceTerm?.nextElementSibling;
		expect(tariffPriceDefinition?.nodeName).toBe("DD");
		expect(tariffPriceDefinition).toHaveTextContent("£1.75");
	});

	it("should render the legal category", () => {
		render(<Prep prep={prep} />);
		const allTerms = screen.getAllByRole("term");
		const term = allTerms.find(
			(t) => t.textContent?.trim() === "Legal category"
		);
		expect(term).toBeInTheDocument();

		// eslint-disable-next-line testing-library/no-node-access
		const definition = term?.nextElementSibling;
		expect(definition?.nodeName).toBe("DD");
		expect(definition).toHaveTextContent("POM (Prescription-only medicine)");
	});
});
