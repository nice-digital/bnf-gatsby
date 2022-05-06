import { fireEvent, render, screen, within } from "@testing-library/react";
import { renderToString } from "react-dom/server";

import { useSiteMetadata } from "@/hooks/useSiteMetadata";

// SiteDistinction is mocked globally in setup
const { SiteDistinction } = jest.requireActual("./SiteDistinction");

describe("SiteDistinction", () => {
	describe.each([
		[
			"BNF",
			true,
			"BNFC",
			"https://bnfc-gatsby-tests.nice.org.uk/test/?ref=switch",
		],
		[
			"BNFC",
			false,
			"BNF",
			"https://bnf-gatsby-tests.nice.org.uk/test/?ref=switch",
		],
	])("%s site", (siteTitleShort, isBNF, otherSiteTitleShort, expectedHref) => {
		beforeEach(() => {
			(useSiteMetadata as jest.Mock).mockReturnValue({
				siteTitleShort,
				isBNF,
			});
		});

		it("should match snapshot", () => {
			render(<SiteDistinction />);
			expect(
				screen.getByLabelText(`Show ${otherSiteTitleShort} link`)
			).toMatchSnapshot();
		});

		describe("Button", () => {
			it("should not render the button server side", () => {
				expect(renderToString(<SiteDistinction />)).not.toContain("<button");
			});

			it(`should render a button with an accessible label to show ${otherSiteTitleShort} link`, () => {
				render(<SiteDistinction />);
				expect(
					screen.getByRole("button", {
						name: `Show ${otherSiteTitleShort} link`,
					})
				).toBeInTheDocument();
			});

			it("should not be expanded by default", () => {
				render(<SiteDistinction />);
				expect(
					screen.getByRole("button", {
						name: `Show ${otherSiteTitleShort} link`,
					})
				).toHaveAttribute("aria-expanded", "false");
			});

			it("should expand on click", () => {
				render(<SiteDistinction />);
				const button = screen.getByRole("button", {
					name: `Show ${otherSiteTitleShort} link`,
				});
				fireEvent.click(button);
				expect(button).toHaveAttribute("aria-expanded", "true");
			});

			it("should change label text to hide other site link on click", () => {
				render(<SiteDistinction />);
				const button = screen.getByRole("button", {
					name: `Show ${otherSiteTitleShort} link`,
				});
				fireEvent.click(button);
				expect(button).toHaveAttribute(
					"aria-label",
					`Hide ${otherSiteTitleShort} link`
				);
			});

			it("should change data tracking attribute on button click", () => {
				render(<SiteDistinction />);
				const button = screen.getByRole("button", {
					name: `Show ${otherSiteTitleShort} link`,
				});
				expect(button).toHaveAttribute(
					"data-tracking",
					`show-${otherSiteTitleShort.toLowerCase()}-link`
				);
				fireEvent.click(button);
				expect(button).toHaveAttribute(
					"data-tracking",
					`hide-${otherSiteTitleShort.toLowerCase()}-link`
				);
			});

			it("should render an icon with an expanded class on click", () => {
				render(<SiteDistinction />);
				const button = screen.getByRole("button", {
					name: `Show ${otherSiteTitleShort} link`,
				});

				// eslint-disable-next-line testing-library/no-node-access
				const svg = button.querySelector("svg");
				expect(svg?.classList.value).toEqual("icon");
				fireEvent.click(button);
				expect(svg).toHaveClass("icon iconExpanded");
			});
		});

		describe("Link", () => {
			it(`should have href to ${otherSiteTitleShort} with querystring parameter ref=switch`, () => {
				render(<SiteDistinction />);
				const link = screen.getByRole("link", {
					name: `switch to ${otherSiteTitleShort}`,
				});
				expect(link).toHaveAttribute("href", expectedHref);
			});

			it(`should have data tracking attribute`, () => {
				render(<SiteDistinction />);
				const link = screen.getByRole("link", {
					name: `switch to ${otherSiteTitleShort}`,
				});
				expect(link).toHaveAttribute(
					"data-tracking",
					`${otherSiteTitleShort.toLowerCase()}-link`
				);
			});
		});

		describe("Visually hidden", () => {
			it(`should render visually hidden content for ${otherSiteTitleShort} site switch`, () => {
				render(<SiteDistinction />);

				const hiddenSpan = within(
					screen.getByRole("link", { name: `switch to ${otherSiteTitleShort}` })
				).getByText("switch to");
				expect(hiddenSpan).toHaveClass("visually-hidden");
			});
		});
	});
});
