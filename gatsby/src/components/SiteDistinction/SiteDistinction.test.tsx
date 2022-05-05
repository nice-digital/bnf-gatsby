import { render, screen, within } from "@testing-library/react";

import { useSiteMetadata } from "@/hooks/useSiteMetadata";

import { SiteDistinction } from "./SiteDistinction";

describe("SiteDistinction", () => {
	it("should match snapshot", () => {
		render(<SiteDistinction />);
		expect(screen.getByLabelText("Show BNFC link")).toMatchSnapshot();
	});

	describe.each([
		["BNF", true, "BNFC"],
		["BNFC", false, "BNF"],
	])("%s site", (siteTitleShort, isBNF, otherSiteTitleShort) => {
		beforeEach(() => {
			(useSiteMetadata as jest.Mock).mockReturnValue({
				siteTitleShort,
				isBNF,
			});
		});

		describe("Button", () => {
			it.todo("should not render a button on serverside");
			it(`should render a button with an accessible label to show ${otherSiteTitleShort} link`, () => {
				render(<SiteDistinction />);
				expect(
					screen.getByRole("button", {
						name: `Show ${otherSiteTitleShort} link`,
					})
				).toBeInTheDocument();
			});
			it.todo("should not be expanded by default");
			it.todo("should expand on click");
			it.todo("should change text to hide other site link on click");
			it.todo("should render an icon with an expanded class");
		});

		describe("Link", () => {
			it.todo("should ");
			it.todo("should have an href with ref = switch on querystring");
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
