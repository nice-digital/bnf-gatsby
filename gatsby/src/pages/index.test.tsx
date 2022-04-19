import { render, screen, within } from "@testing-library/react";
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
			siteTitleShort: "BNF",
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

		it("should render 'Drugs A to Z' level 2 heading", () => {
			render(<HomePage />);
			const drugsAtoZHeading = screen.getByRole("heading", {
				name: /drugs a to z/i,
				level: 2,
			});

			expect(drugsAtoZHeading).toBeInTheDocument();
		});

		it("should render 'browse drugs' level 3 heading", () => {
			render(<HomePage />);
			const browseDrugsHeading = screen.getByRole("heading", {
				name: /browse drugs/i,
				level: 3,
			});

			expect(browseDrugsHeading).toBeInTheDocument();
		});
	});
});
