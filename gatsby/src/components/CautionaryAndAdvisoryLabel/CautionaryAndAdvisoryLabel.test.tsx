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
	it("should render a heading containing the label number", () => {
		render(<CautionaryAndAdvisoryLabel {...props} />);
		const heading = screen.getByRole("heading", { name: "Label 3" });
		expect(heading).toBeInTheDocument();
	});

	it("should contain an English language recommendation", () => {
		render(<CautionaryAndAdvisoryLabel {...props} />);
		const recommendation = screen.getByText(props.englishRecommendation);
		expect(recommendation).toBeInTheDocument();
	});

	it("should contain a Welsh language recommendation", () => {
		render(<CautionaryAndAdvisoryLabel {...props} />);
		const recommendation = screen.getByText(props.welshRecommendation);
		expect(recommendation).toHaveAttribute("lang", "cy");
	});

	it("should contain an HTML description of the label", () => {
		render(<CautionaryAndAdvisoryLabel {...props} />);
		const description = screen.getByText("Test description");
		expect(description).toBeInTheDocument();
	});

	it("should create an h2 with an appropriate id for the section title", () => {
		render(<CautionaryAndAdvisoryLabel {...props} />);
		const heading = screen.getByRole("heading", { name: "Label 3" });
		expect(heading).toHaveProperty("id", "label-3");
	});

	it("should render the correct content within each section", () => {
		render(<CautionaryAndAdvisoryLabel {...props} />);
		const section = screen.getByRole("region", { name: "Label 3" });
		expect(section).toMatchSnapshot();
	});

	it("should add a CSS class to the label itself to show a border", () => {
		render(<CautionaryAndAdvisoryLabel {...props} />);
		// eslint-disable-next-line testing-library/no-node-access
		const label = screen.getByText(props.englishRecommendation).closest("div");
		expect(label).toHaveClass("label");
	});
});
