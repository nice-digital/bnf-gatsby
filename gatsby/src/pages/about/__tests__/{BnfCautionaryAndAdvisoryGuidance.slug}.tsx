import { useLocation } from "@reach/router";
import { render, screen, waitFor } from "@testing-library/react";
import { useStaticQuery } from "gatsby";

import { mockAboutPagesQueryData } from "@/hooks/useAboutPages.test";

import CautionaryAdvisoryGuidancePage, {
	type CautionaryAdvisoryGuidancePageProps,
	query,
} from "../{BnfCautionaryAndAdvisoryGuidance.slug}";

const pageProps: CautionaryAdvisoryGuidancePageProps = {
	data: {
		currentPage: {
			title: "Guidance for cautionary and advisory labels",
			sections: [
				{
					order: 0,
					content:
						"<p>Medicinal forms within BNF publications include code numbers...</p>",
					slug: "introduction",
					title: "Introduction",
				},
				{
					order: 1,
					content:
						"<p>Most preparations are dispensed in unbroken original packs...</p>",
					slug: "original-packs",
					title: "Original packs",
				},
			],
		},
	},
};

(useLocation as jest.Mock).mockImplementation(
	() =>
		new URL(
			"https://bnf-gatsby-tests.nice.org.uk/about/guidance-for-cautionary-and-advisory-labels/"
		)
);

(useStaticQuery as jest.Mock).mockReturnValue(mockAboutPagesQueryData);

describe("CautionaryAdvisoryGuidancePage", () => {
	it("should match snapshot for graphql query", () => {
		expect(query).toMatchSnapshot();
	});

	it("should match snapshot for page contents", () => {
		render(<CautionaryAdvisoryGuidancePage {...pageProps} />);

		expect(screen.getByRole("main")).toMatchSnapshot();
	});

	it("should set page title", async () => {
		render(<CautionaryAdvisoryGuidancePage {...pageProps} />);

		await waitFor(() => {
			expect(document.title).toBe(
				"Guidance for cautionary and advisory labels | About | BNF content published by NICE"
			);
		});
	});
});
