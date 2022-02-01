import { useLocation } from "@reach/router";
import { render, screen } from "@testing-library/react";
import { useStaticQuery } from "gatsby";
import React from "react";

import { mockAboutPagesQueryData } from "@/hooks/useAboutPages.test";

import { type CautionaryAndAdvisoryLabelProps } from "../../../components/CautionaryAndAdvisoryLabel/CautionaryAndAdvisoryLabel";
import { CautionaryAdvisoryLabelsPage, query } from "../labels";

describe("Labels page", () => {
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

	describe("LabelsPage", () => {
		it("should match snapshot for graphql query", () => {
			expect(query).toMatchSnapshot();
		});

		it("should match snapshot for page contents", () => {
			(useLocation as jest.Mock).mockImplementation(
				() => new URL("https://bnf-gatsby-tests.nice.org.uk/about/labels/")
			);

			(useStaticQuery as jest.Mock).mockReturnValue(mockAboutPagesQueryData);

			render(<CautionaryAdvisoryLabelsPage {...props} />);

			expect(screen.getByRole("main")).toMatchSnapshot();
		});
	});
});
