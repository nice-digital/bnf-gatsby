import { useLocation } from "@reach/router";
import { render, screen } from "@testing-library/react";
import { useStaticQuery } from "gatsby";

import {
	AboutSectionMenu,
	type AboutSectionMenuData,
} from "./AboutSectionMenu";

// These gatsby fucntions are mocked globally in our test setup
const useStaticQueryMock = useStaticQuery as jest.Mock,
	useLocationMock = useLocation as jest.Mock;

describe("AboutSectionMenu", () => {
	beforeEach(() => {
		useStaticQueryMock.mockReturnValue({
			allBnfAboutSection: {
				allAboutPages: [
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
				allCautionaryAdvisoryGuidancePages: [
					{
						slug: "guidance-for-cautionary-and-advisory-labels",
						title: "Guidance for cautionary and advisory labels",
					},
				],
			},
		} as AboutSectionMenuData);
	});

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

		expect(
			screen.getByRole("link", { name: "Publication information" })
		).toHaveAttribute("href", "/about/publication-information/");
	});

	it("should render anchor for each cautionary guidance record from feed", () => {
		render(<AboutSectionMenu />);

		expect(
			screen.getByRole("link", {
				name: "Guidance for cautionary and advisory labels",
			})
		).toHaveAttribute(
			"href",
			"/about/guidance-for-cautionary-and-advisory-labels/"
		);
	});

	it("should render anchor to labels page", () => {
		render(<AboutSectionMenu />);

		expect(screen.getByRole("link", { name: "Labels" })).toHaveAttribute(
			"href",
			"/about/labels/"
		);
	});

	it("should highlight current page", () => {
		useLocationMock.mockImplementationOnce(
			() => new URL("https://bnf-gatsby-tests.nice.org.uk/about/labels/")
		);

		render(<AboutSectionMenu />);

		expect(screen.getByRole("link", { name: "Labels" })).toHaveAttribute(
			"aria-current",
			"true"
		);
	});
});
