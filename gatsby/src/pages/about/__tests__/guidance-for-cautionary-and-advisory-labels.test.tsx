import { useLocation } from "@reach/router";
import { render, waitFor } from "@testing-library/react";
import { useStaticQuery } from "gatsby";

import { mockAboutPagesQueryData } from "@/hooks/useAboutPages.test";
import { useSiteMetadata } from "@/hooks/useSiteMetadata";

import CautionaryAdvisoryGuidancePage, {
	type CautionaryAdvisoryGuidancePageProps,
	query,
} from "../guidance-for-cautionary-and-advisory-labels";

const pageProps: CautionaryAdvisoryGuidancePageProps = {
	data: {
		bnfCautionaryAndAdvisoryGuidance: {
			title: "Guidance for cautionary and advisory labels",
			sections: [
				{
					content:
						"<p>Medicinal forms within BNF publications include code numbers...</p>",
					slug: "introduction",
					title: "Introduction",
				},
				{
					content:
						"<p>Most preparations are dispensed in unbroken original packs...</p>",
					slug: "original-packs",
					title: "Original packs",
				},
			],
		},
	},
};

describe("CautionaryAdvisoryGuidancePage", () => {
	beforeEach(() => {
		(useLocation as jest.Mock).mockImplementation(
			() =>
				new URL(
					"https://bnf-gatsby-tests.nice.org.uk/about/guidance-for-cautionary-and-advisory-labels/"
				)
		);

		(useStaticQuery as jest.Mock).mockReturnValue(mockAboutPagesQueryData);
	});

	it("should match snapshot for graphql query", () => {
		expect(query).toMatchSnapshot();
	});

	it("should match snapshot for page contents", () => {
		const { container } = render(
			<CautionaryAdvisoryGuidancePage {...pageProps} />
		);

		expect(container).toMatchSnapshot();
	});

	it("should set page title", async () => {
		render(<CautionaryAdvisoryGuidancePage {...pageProps} />);

		await waitFor(() => {
			expect(document.title).toStartWith(
				"Guidance for cautionary and advisory labels | About | "
			);
		});
	});

	it("should render meta description for BNF", async () => {
		render(<CautionaryAdvisoryGuidancePage {...pageProps} />);

		await waitFor(() => {
			expect(
				// eslint-disable-next-line testing-library/no-node-access
				document.querySelector(`meta[name="description"]`)
			).toHaveAttribute(
				"content",
				"View explanatory information on the usage of recommended BNF cautionary and advisory labels that pharmacists add when dispensing."
			);
		});
	});

	it("should render meta description for BNFC", async () => {
		(useSiteMetadata as jest.Mock).mockImplementationOnce(() => ({
			siteTitleShort: "BNFC",
		}));

		render(<CautionaryAdvisoryGuidancePage {...pageProps} />);

		await waitFor(() => {
			expect(
				// eslint-disable-next-line testing-library/no-node-access
				document.querySelector(`meta[name="description"]`)
			).toHaveAttribute(
				"content",
				"View explanatory information on the usage of recommended BNFC cautionary and advisory labels that pharmacists add when dispensing."
			);
		});
	});
});
