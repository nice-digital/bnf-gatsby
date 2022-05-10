import { render, screen } from "@testing-library/react";

import { InteractionsContent } from "./InteractionsContent";

describe("InteractionsContent", () => {
	describe("Single interactant", () => {
		const interactants = [{ slug: "abacavir", title: "<em>Abacavir</em>" }];

		it("should render link to view interaction when there", () => {
			render(<InteractionsContent interactants={interactants} />);

			const link = screen.getByRole("link");
			expect(link).toHaveTextContent("View interactions for Abacavir");
			expect(link).toHaveAttribute("href", "/interactions/abacavir/");
		});
	});

	describe("Multiple interactants", () => {
		const interactants = [
			{ slug: "abacavir", title: "Abacavir" },
			{ slug: "lamivudine", title: "<em>Lamivudine</em>" },
		];

		it("should render multiple interactants in list with accessible name", () => {
			render(<InteractionsContent interactants={interactants} />);

			expect(screen.getByRole("list")).toHaveAccessibleName(
				"Links to each interactant"
			);
		});

		it("should render interactant name as link text", () => {
			render(<InteractionsContent interactants={interactants} />);

			const links = screen.getAllByRole("link");

			expect(links.map((l) => l.textContent)).toStrictEqual([
				"Abacavir",
				"Lamivudine",
			]);
		});

		it("should render link to correct URL for each interactant", () => {
			render(<InteractionsContent interactants={interactants} />);

			const links = screen.getAllByRole("link");

			expect(links.map((l) => l.getAttribute("href"))).toStrictEqual([
				"/interactions/abacavir/",
				"/interactions/lamivudine/",
			]);
		});
	});
});
