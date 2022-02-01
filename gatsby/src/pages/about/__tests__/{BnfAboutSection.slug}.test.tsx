import { useLocation } from "@reach/router";
import { render, screen, waitFor } from "@testing-library/react";
import { useStaticQuery } from "gatsby";

import { mockAboutPagesQueryData } from "@/hooks/useAboutPages.test";

import AboutSectionPage, {
	type AboutSectionPageProps,
	query,
} from "../{BnfAboutSection.slug}";

const pageProps: AboutSectionPageProps = {
	data: {
		currentAboutPage: {
			title: "Changes",
			sections: [
				{
					order: 0,
					content:
						"<p>Monthly updates are provided online via Medicines Complete and the NHS Evidence portal. The changes listed below are cumulative (from one print edition to the next).</p>",
					slug: "introduction",
					title: "Introduction",
				},
				{
					order: 1,
					content:
						"<p>Significant changes made since the release of data for the print edition of BNF 82 (September 2021 — March 2022):</p>",
					slug: "significant-changes",
					title: "Significant changes",
				},
			],
		},
	},
};

(useLocation as jest.Mock).mockImplementation(
	() => new URL("https://bnf-gatsby-tests.nice.org.uk/about/changes/")
);

(useStaticQuery as jest.Mock).mockReturnValue(mockAboutPagesQueryData);

describe("AboutSectionPage", () => {
	it("should match snapshot for graphql query", () => {
		expect(query).toMatchSnapshot();
	});

	it("should match snapshot for page contents", () => {
		render(<AboutSectionPage {...pageProps} />);

		expect(screen.getByRole("main")).toMatchSnapshot();
	});

	it("should set page title", async () => {
		render(<AboutSectionPage {...pageProps} />);

		await waitFor(() => {
			expect(document.title).toBe(
				"Changes | About | BNF content published by NICE"
			);
		});
	});
});
