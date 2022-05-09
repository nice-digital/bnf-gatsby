import { render, screen } from "@testing-library/react";

import { FeedPrep } from "@nice-digital/gatsby-source-bnf";

import { QueryResult } from "@/utils";

import { MedicalDevicePrepsSection } from "./MedicalDevicePrepsSection";

const prep1: QueryResult<FeedPrep> = {
	name: "Prep 1",
	manufacturer: "Acme Ltd",
	activeIngredients: [],
	ampId: "123",
	blackTriangle: false,
	controlledDrugSchedule: null,
	packs: [],
	sugarFree: false,
};

const prep2: QueryResult<FeedPrep> = {
	name: "Prep 2",
	manufacturer: "Timbuktu Ltd",
	activeIngredients: [],
	ampId: "456",
	blackTriangle: false,
	controlledDrugSchedule: null,
	packs: [],
	sugarFree: false,
};

describe("MedicalDevicePrepsSection", () => {
	it("should render section with accessible name", () => {
		render(<MedicalDevicePrepsSection preps={[prep1]} />);

		expect(
			screen.getByRole("region", { name: "Medical device types" })
		).toBeInTheDocument();
	});

	it("should render heading 2 with id", () => {
		render(<MedicalDevicePrepsSection preps={[prep1]} />);

		expect(screen.getByRole("heading", { level: 2 })).toHaveAttribute(
			"id",
			"medical-device-types"
		);
	});

	it("should render multiple preps as accordions with accordion group", () => {
		render(<MedicalDevicePrepsSection preps={[prep1, prep2]} />);

		expect(screen.getAllByRole("group")).toHaveLength(2);
		expect(
			screen.getByRole("button", {
				name: "Show all medical device types (2)",
			})
		).toBeInTheDocument();
	});

	it("should render heading 3 per prep", () => {
		render(<MedicalDevicePrepsSection preps={[prep1, prep2]} />);

		const heading3s = screen.getAllByRole("heading", { level: 3 });

		expect(heading3s.map((h) => h.textContent)).toStrictEqual([
			"Prep 1 Acme Ltd",
			"Prep 2 Timbuktu Ltd",
		]);
	});
});
