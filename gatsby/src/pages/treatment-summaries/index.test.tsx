import { render, waitFor, screen } from "@testing-library/react";

import TreatmentSummariesIndexPage, {
	type TreatmentSummariesIndexPageProps,
} from "./";

const props: TreatmentSummariesIndexPageProps = {
	data: {
		allTreatmentSummaries: {
			letters: [
				{
					letter: "a",
					links: [
						{
							title: "Acne",
							slug: "acne",
						},
						{
							title: "Acute coronary syndromes",
							slug: "acute-coronary-syndromes",
						},
					],
				},
				{
					letter: "b",
					links: [
						{
							title: "Bacillus Calmette-Guérin vaccine",
							slug: "bacillus-calmette-guerin-vaccine",
						},
						{
							title: "Beta-adrenoceptor blocking drugs",
							slug: "beta-adrenoceptor-blocking-drugs",
						},
					],
				},
			],
		},
	},
};

describe("TreatmentSummariesIndexPage", () => {
	it("should set page title", async () => {
		render(<TreatmentSummariesIndexPage {...props} />);
		await waitFor(() => {
			expect(document.title).toStartWith("Treatment summaries A to Z");
		});
	});

	it("should set page meta description", async () => {
		render(<TreatmentSummariesIndexPage {...props} />);
		await waitFor(() => {
			expect(
				document
					// eslint-disable-next-line testing-library/no-node-access
					.querySelector("meta[name='description']")
					?.getAttribute("content")
			).toEqual(
				"Browse the complete list of treatment summaries, alphabetically."
			);
		});
	});

	it("should match snapshot for page body", () => {
		render(<TreatmentSummariesIndexPage {...props} />);
		expect(screen.getByRole("main")).toMatchSnapshot();
	});
});
