import { useLocation } from "@reach/router";
import { render, screen } from "@testing-library/react";
import { useStaticQuery } from "gatsby";

import { mockNursePrescribersPagesQueryData } from "@/hooks/useNursePrescribers.test";

import { NursePrescribersFormularyMenu } from "./NursePrescribersFormularyMenu";

(useStaticQuery as jest.Mock).mockReturnValue(
	mockNursePrescribersPagesQueryData
);

describe("NursePrescribersMenu", () => {
	it("should render labelled navigation wrapper", () => {
		render(<NursePrescribersFormularyMenu />);

		expect(
			screen.getByRole("navigation", {
				name: "Nurse Prescribers' Formulary pages",
			})
		).toBeInTheDocument();
	});

	it("should render anchor back to parent nurse prescribers formulary section", () => {
		render(<NursePrescribersFormularyMenu />);

		expect(
			screen.getByRole("link", { name: "Nurse Prescribers' Formulary" })
		).toHaveAttribute("href", "/nurse-prescribers-formulary/");
	});

	it("should render anchor for each item from feed", () => {
		render(<NursePrescribersFormularyMenu />);

		expect(screen.getByRole("link", { name: "Analgesics" })).toHaveAttribute(
			"href",
			"/nurse-prescribers-formulary/analgesics/"
		);

		expect(screen.getAllByRole("link")).toHaveLength(5);
	});

	it("should highlight current page", () => {
		(useLocation as jest.Mock).mockReturnValue(
			new URL(
				"https://bnf-gatsby-tests.nice.org.uk/nurse-prescribers-formulary/analgesics/"
			)
		);

		render(<NursePrescribersFormularyMenu />);

		expect(screen.getByRole("link", { name: "Analgesics" })).toHaveAttribute(
			"aria-current",
			"true"
		);
	});
});
