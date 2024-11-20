import { useLocation } from "@reach/router";
import { render, waitFor } from "@testing-library/react";

import InteractionsIndexPage, { type InteractionsIndexPageProps } from "./";

jest.mock("@reach/router", () => ({
	useLocation: jest.fn(),
}));
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
	beforeEach(() => {
		(useLocation as jest.Mock).mockReturnValue({
			pathname: "/interactions",
		});
	});
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
				"Use the interactions A to Z to look up a drug and see which other drugs it interacts with and the severity of these interactions."
			);
		});
	});

	it("should match snapshot for page body", () => {
		const { container } = render(<InteractionsIndexPage {...props} />);
		expect(container).toMatchSnapshot();
	});
});
