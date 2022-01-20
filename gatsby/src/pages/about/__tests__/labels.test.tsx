import { render, screen } from "@testing-library/react";
import React from "react";

import { CautionaryAndAdvisoryLabelProps } from "../../../components/CautionaryAndAdvisoryLabel/CautionaryAndAdvisoryLabel";
import {
	CautionaryAdvisoryLabelsGuidancePage,
	CautionaryAdvisoryLabelsPageProps,
} from "../labels";

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

	it.todo("Should render a heading containing the label number");
	it.todo("Should show the page breadcrumbs");
	it.todo("Should render an ordered list of labels");
});
