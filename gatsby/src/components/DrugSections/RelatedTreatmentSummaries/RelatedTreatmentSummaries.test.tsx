import { render, screen } from "@testing-library/react";

import {
	RelatedTreatmentSummaries,
	type RelatedTreatmentSummariesProps,
} from "./RelatedTreatmentSummaries";

describe("RelatedTreatmentSummaries", () => {
	const props: RelatedTreatmentSummariesProps = {
		potName: "Related treatment summaries",
		slug: "related-treatment-summaries",
		relatedTreatmentSummaries: [
			{ slug: "acne", title: "Acne" },
			{ slug: "dementia", title: "Dementia" },
		],
	};

	it("should render section with accessible name", () => {
		render(<RelatedTreatmentSummaries {...props} />);

		expect(
			screen.getByRole("region", { name: "Related treatment summaries" })
		).toBeInTheDocument();
	});

	it("should render heading 2 with HTML section name", () => {
		render(<RelatedTreatmentSummaries {...props} />);

		expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent(
			"Related treatment summaries"
		);
	});

	it("should render tag list with accessible name", () => {
		render(<RelatedTreatmentSummaries {...props} />);

		expect(
			screen.getByRole("list", { name: "Related treatment summaries" })
		).toBeInTheDocument();
	});

	it("should render tag list item for each related treatment summary", () => {
		render(<RelatedTreatmentSummaries {...props} />);

		expect(screen.getAllByRole("listitem")).toHaveLength(2);
	});

	it("should render link to treatment summary page", () => {
		render(<RelatedTreatmentSummaries {...props} />);

		expect(screen.getByRole("link", { name: "Acne" })).toHaveAttribute(
			"href",
			"/treatment-summaries/acne/"
		);
	});
});
