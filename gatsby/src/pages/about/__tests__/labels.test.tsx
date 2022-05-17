import { useLocation } from "@reach/router";
import { render, waitFor } from "@testing-library/react";
import { useStaticQuery } from "gatsby";
import React from "react";

import { type CautionaryAndAdvisoryLabelProps } from "@/components/CautionaryAndAdvisoryLabel/CautionaryAndAdvisoryLabel";
import { mockAboutPagesQueryData } from "@/hooks/useAboutPages.test";
import { useSiteMetadata } from "@/hooks/useSiteMetadata";

import { CautionaryAdvisoryLabelsPage, query } from "../labels";

const exampleLabels: CautionaryAndAdvisoryLabelProps[] = [
	{
		number: 1,
		description: "<p>Example description 1</p>",
		englishRecommendation: "English recommendation 1",
		welshRecommendation: "Welsh recommendation 1",
	},
	{
		number: 2,
		description: "<p>Example description 2</p>",
		englishRecommendation: "English recommendation 2",
		welshRecommendation: "Welsh recommendation 2",
	},
];

const props = {
	data: {
		allBnfCautionaryAndAdvisoryLabel: {
			advisoryLabels: exampleLabels,
		},
	},
};

describe("CautionaryAdvisoryLabelsPage", () => {
	beforeEach(() => {
		(useLocation as jest.Mock).mockImplementation(
			() => new URL("https://bnf-gatsby-tests.nice.org.uk/about/labels/")
		);

		(useStaticQuery as jest.Mock).mockReturnValue(mockAboutPagesQueryData);
	});

	it("should match snapshot for graphql query", () => {
		expect(query).toMatchSnapshot();
	});

	it("should render correct page title", async () => {
		render(<CautionaryAdvisoryLabelsPage {...props} />);

		await waitFor(() => {
			expect(document.title).toStartWith(
				"Cautionary and advisory labels | About |"
			);
		});
	});

	it("should render meta description for BNF", async () => {
		render(<CautionaryAdvisoryLabelsPage {...props} />);

		await waitFor(() => {
			expect(
				// eslint-disable-next-line testing-library/no-node-access
				document.querySelector(`meta[name="description"]`)
			).toHaveAttribute(
				"content",
				"List of the 2 cautionary, warning and advisory labels applied to the medications used in the BNF, as found in appendix 3 of the printed edition."
			);
		});
	});

	it("should render meta description for BNFC", async () => {
		(useSiteMetadata as jest.Mock).mockImplementationOnce(() => ({
			siteTitleShort: "BNFC",
		}));

		render(<CautionaryAdvisoryLabelsPage {...props} />);

		await waitFor(() => {
			expect(
				// eslint-disable-next-line testing-library/no-node-access
				document.querySelector(`meta[name="description"]`)
			).toHaveAttribute(
				"content",
				"List of the 2 cautionary, warning and advisory labels applied to the medications used in the BNFC, as found in appendix 3 of the printed edition."
			);
		});
	});

	it("should match snapshot for page contents", () => {
		const { container } = render(<CautionaryAdvisoryLabelsPage {...props} />);

		expect(container).toMatchSnapshot();
	});
});
