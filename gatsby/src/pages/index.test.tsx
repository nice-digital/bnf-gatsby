import { render, screen } from "@testing-library/react";
import { useStaticQuery } from "gatsby";

import { type LastUpdatedDataQueryResult } from "@/components/Hero/Hero";
import { useSiteMetadata } from "@/hooks/useSiteMetadata";

import HomePage from "./";

export const mockLastUpdatedDataQueryData: LastUpdatedDataQueryResult = {
	bnfMetadata: {
		lastUpdatedDate: "2022-04-06T00:38:57.911",
		lastUpdatedDateFormatted: "6 April 2022",
		runTag: "2022_04_06_0037_bnf",
	},
};

(useStaticQuery as jest.Mock).mockReturnValue(mockLastUpdatedDataQueryData);

describe("HomePage", () => {
	it("should match snapshot for BNF", () => {
		render(<HomePage />);
		expect(screen.getByRole("main")).toMatchSnapshot();
	});

	it("should match snapshot for BNFC", () => {
		(useSiteMetadata as jest.Mock).mockReturnValueOnce({
			isBNF: false,
			siteTitleShort: "BNFC",
			siteTitleLong: "British National Formulary for Children",
		});

		render(<HomePage />);
		expect(screen.getByRole("main")).toMatchSnapshot();
	});

	describe("Drug list", () => {
		it("should render an A-Z link for all letters", () => {
			render(<HomePage />);
			expect(screen.queryByText("A")?.tagName).toBe("A");
			expect(screen.queryByText("B")?.tagName).toBe("A");
			expect(screen.queryByText("D")?.tagName).toBe("A");
			expect(screen.queryByText("K")?.tagName).toBe("A");
			expect(screen.queryByText("Z")?.tagName).toBe("A");
		});

		it("should render letters that link to /drugs/ with appropriate anchor", () => {
			render(<HomePage />);
			const linkElementA = screen.getByText("A");
			expect(linkElementA).toHaveAttribute("href", "/drugs/#a");

			const linkElementH = screen.getByText("H");
			expect(linkElementH).toHaveAttribute("href", "/drugs/#h");

			const linkElementZ = screen.getByText("Z");
			expect(linkElementZ).toHaveAttribute("href", "/drugs/#z");
		});
	});

	describe("Headings", () => {
		it.each([
			["Drugs", 2],
			["Browse drugs by A-Z", 3],
			["Treatment summaries", 2],
			["Interactions", 2],
			["Medicines guidance", 2],
			["Wound management", 2],
			["Medical devices", 2],
			["Borderline substances", 2],
			["Nurse prescribers formulary", 2],
			["Dental practitioners formulary", 2],
			["Approximate conversions and units", 2],
			["Cautionary and advisory labels", 2],
			["Abbreviations and symbols", 2],
		])("should render a '%s' level %d heading", (name, level) => {
			render(<HomePage />);

			expect(screen.getByRole("heading", { name, level })).toBeInTheDocument();
		});
	});

	describe("Wound management rendering per site", () => {
		it("should render wound management section for BNF ", () => {
			render(<HomePage />);

			expect(
				screen.getByRole("link", {
					name: "Wound management",
				})
			).toHaveAttribute("href", "/wound-management/");
		});

		it("should not render wound management section for BNFC query by role", () => {
			(useSiteMetadata as jest.Mock).mockReturnValueOnce({
				isBNF: false,
				siteTitleShort: "BNFC",
				siteTitleLong: "British National Formulary for Children",
			});

			render(<HomePage />);

			expect(
				screen.queryByRole("link", { name: "Wound management" })
			).toBeNull();
		});
	});
});
