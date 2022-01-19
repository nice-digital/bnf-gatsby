import { render, screen } from "@testing-library/react";
import React from "react";

import {
	CautionaryAndAdvisoryLabel,
	type CautionaryAndAdvisoryLabelProps,
} from "./CautionaryAndAdvisoryLabel";

const props: CautionaryAndAdvisoryLabelProps = {
	description: "<p>Test description</p>",
	englishRecommendation: "English test recommendation",
	welshRecommendation: "Welsh test recommendation",
	number: 3,
};

describe("CautionaryAndAdvisoryLabel", () => {
	it("Should render a heading containing the label number", () => {
		render(<CautionaryAndAdvisoryLabel {...props} />);
		const heading = screen.getByRole("heading", { name: "Label 3" });
		expect(heading).toBeInTheDocument();
	});

	it("Should contain an English language recommendation", () => {
		render(<CautionaryAndAdvisoryLabel {...props} />);
		const recommendation = screen.getByText(props.englishRecommendation);
		expect(recommendation).toHaveAttribute("lang", "en-GB");
	});

	it("Should contain a Welsh language recommendation", () => {
		render(<CautionaryAndAdvisoryLabel {...props} />);
		const recommendation = screen.getByText(props.welshRecommendation);
		expect(recommendation).toHaveAttribute("lang", "cy");
	});

	it("Should contain an HTML description of the label", () => {
		render(<CautionaryAndAdvisoryLabel {...props} />);
		const description = screen.getByText("Test description");
		expect(description).toBeInTheDocument();
	});
});
