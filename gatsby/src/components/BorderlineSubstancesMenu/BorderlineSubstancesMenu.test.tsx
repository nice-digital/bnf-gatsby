import { useLocation } from "@reach/router";
import { render, screen } from "@testing-library/react";
import { useStaticQuery } from "gatsby";

import { mockBorderlineSubstancesPagesQueryData } from "@/hooks/useBorderlineSubstancesPages.test";

import { BorderlineSubstancesMenu } from "./BorderlineSubstancesMenu";

(useStaticQuery as jest.Mock).mockReturnValue(
	mockBorderlineSubstancesPagesQueryData
);

describe("BorderlineSubstancesMenu", () => {
	it("should render labelled navigation wrapper", () => {
		render(<BorderlineSubstancesMenu />);

		expect(
			screen.getByRole("navigation", { name: "Borderline substances" })
		).toBeInTheDocument();
	});

	it("should render anchor back to parent about section", () => {
		render(<BorderlineSubstancesMenu />);

		expect(
			screen.getByRole("link", { name: "Borderline substances" })
		).toHaveAttribute("href", "/borderline-substances/");
	});

	it("should render anchor for each parent level taxonomy from feed", () => {
		render(<BorderlineSubstancesMenu />);

		expect(screen.getByRole("link", { name: "Parent 1" })).toHaveAttribute(
			"href",
			"/borderline-substances/parent-1/"
		);

		expect(screen.getAllByRole("link")).toHaveLength(4);
	});

	it("should highlight current page", () => {
		(useLocation as jest.Mock).mockImplementationOnce(
			() =>
				new URL(
					"https://bnf-gatsby-tests.nice.org.uk/borderline-substances/parent-1/"
				)
		);

		render(<BorderlineSubstancesMenu />);

		expect(screen.getByRole("link", { name: "Parent 1" })).toHaveAttribute(
			"aria-current",
			"true"
		);
	});
});
