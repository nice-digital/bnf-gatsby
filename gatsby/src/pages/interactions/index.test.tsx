import { render, waitFor, screen } from "@testing-library/react";

import InteractionsIndexPage, { type InteractionsIndexPageProps } from "./";

const props: InteractionsIndexPageProps = {
	data: {
		allInteractants: {
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
							slug: "bacillus-calmette-guerin-vaccine",
						},
						{
							title: "Bacitracin",
							slug: "bacitracin",
						},
					],
				},
			],
		},
	},
};

describe("InteractionsIndexPage", () => {
	it("should set page title", async () => {
		render(<InteractionsIndexPage {...props} />);
		await waitFor(() => {
			expect(document.title).toStartWith("Interactions A to Z");
		});
	});

	it("should set page meta description", async () => {
		render(<InteractionsIndexPage {...props} />);
		await waitFor(() => {
			expect(
				document
					// eslint-disable-next-line testing-library/no-node-access
					.querySelector("meta[name='description']")
					?.getAttribute("content")
			).toEqual(
				"Look up a drug to see which other drugs it interacts with and how serious those interactions are."
			);
		});
	});

	it("should match snapshot for page body", () => {
		render(<InteractionsIndexPage {...props} />);
		expect(screen.getByRole("main")).toMatchSnapshot();
	});
});
