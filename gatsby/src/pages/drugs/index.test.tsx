import { render, waitFor, screen } from "@testing-library/react";

import DrugsIndexPage, { type DrugsIndexPageProps } from "./";

const props: DrugsIndexPageProps = {
	data: {
		allDrugs: {
			letters: [
				{
					letter: "a",
					links: [
						{
							title: "Abacavir",
							slug: "abacavir",
						},
						{
							title: "Abatacept",
							slug: "abatacept",
						},
					],
				},
				{
					letter: "b",
					links: [
						{
							title: "Bacillus Calmette-Guérin",
							slug: "bacillus-calmette-guerin",
						},
						{
							title: "Bacillus Calmette-Guérin",
							slug: "bacillus-calmette-guerin-vaccine",
						},
					],
				},
			],
		},
	},
};

describe("DrugsIndexPage", () => {
	it("should set page title", async () => {
		render(<DrugsIndexPage {...props} />);
		await waitFor(() => {
			expect(document.title).toStartWith("Drugs A to Z");
		});
	});

	it("should set page meta description", async () => {
		render(<DrugsIndexPage {...props} />);
		await waitFor(() => {
			expect(
				document
					// eslint-disable-next-line testing-library/no-node-access
					.querySelector("meta[name='description']")
					?.getAttribute("content")
			).toEqual("Browse the complete list of drugs, alphabetically.");
		});
	});

	it("should match snapshot for page body", () => {
		render(<DrugsIndexPage {...props} />);
		expect(screen.getByRole("main")).toMatchSnapshot();
	});
});
