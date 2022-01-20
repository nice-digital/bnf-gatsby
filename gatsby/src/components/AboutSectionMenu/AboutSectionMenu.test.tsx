import { useLocation } from "@reach/router";
import { render, screen } from "@testing-library/react";
import { useStaticQuery } from "gatsby";

import { type AboutPages } from "@/hooks/useAboutPages";

import { AboutSectionMenu } from "./AboutSectionMenu";

(useStaticQuery as jest.Mock).mockReturnValue({
	allBnfAboutSection: {
		aboutSectionPages: [
			{
				slug: "changes",
				title: "Changes",
			},
			{
				slug: "publication-information",
				title: "Publication <i>information</i>",
			},
		],
	},
	allBnfCautionaryAndAdvisoryGuidance: {
		labelsGuidancePages: [
			{
				slug: "guidance-for-cautionary-and-advisory-labels",
				title: "Guidance for cautionary and advisory labels",
			},
		],
	},
} as AboutPages);

describe("AboutSectionMenu", () => {
	it("should render labelled navigation wrapper", () => {
		render(<AboutSectionMenu />);

		expect(
			screen.getByRole("navigation", { name: "About section pages" })
		).toBeInTheDocument();
	});

	it("should render anchor back to parent about section", () => {
		render(<AboutSectionMenu />);

		expect(screen.getByRole("link", { name: "About" })).toHaveAttribute(
			"href",
			"/about/"
		);
	});

	it("should render anchor for each about page record from feed", () => {
		render(<AboutSectionMenu />);

		expect(screen.getByRole("link", { name: "Changes" })).toHaveAttribute(
			"href",
			"/about/changes/"
		);

		expect(screen.getAllByRole("link")).toHaveLength(5);
	});

	it("should highlight current page", () => {
		(useLocation as jest.Mock).mockImplementationOnce(
			() => new URL("https://bnf-gatsby-tests.nice.org.uk/about/labels/")
		);

		render(<AboutSectionMenu />);

		expect(screen.getByRole("link", { name: "Labels" })).toHaveAttribute(
			"aria-current",
			"true"
		);
	});
});
