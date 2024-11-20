import { useLocation } from "@reach/router";
import { render, screen } from "@testing-library/react";

import { InteractionsAlert } from "./InteractionsAlert";

jest.mock("@reach/router", () => ({
	useLocation: jest.fn(),
}));

describe("InteractionsAlert", () => {
	beforeEach(() => {
		(useLocation as jest.Mock).mockReturnValue({ pathname: "/interactions" });
	});

	it("should render without errors", () => {
		render(<InteractionsAlert />);
		expect(screen.getByTestId("interactions-a-z-alert")).toBeInTheDocument();
	});

	it("should have the correct role attribute", () => {
		render(<InteractionsAlert />);
		expect(screen.getByRole("alert")).toBeInTheDocument();
	});

	it("should display the correct alert type", () => {
		render(<InteractionsAlert />);
		expect(screen.getByTestId("interactions-a-z-alert")).toHaveClass(
			"alert--caution"
		);
	});

	it("should render the heading with the correct text", () => {
		render(<InteractionsAlert />);
		expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent(
			"Important"
		);
	});

	it("should render the correct message content", () => {
		render(<InteractionsAlert />);
		expect(screen.getByTestId("interactions-a-z-alert")).toHaveTextContent(
			"For combination products such as co-amilofruse (amiloride+furosemide) and co-trimoxazole (trimethoprim+sulfamethoxazole), check for interactions with the individual drugs. You can find links in the interactions section of the monograph for the combination product."
		);
	});

	it("should be accessible by the data-testid", () => {
		render(<InteractionsAlert />);
		expect(screen.getByTestId("interactions-a-z-alert")).toBeInTheDocument();
	});

	it("should render the alert for subpaths of '/interactions'", () => {
		(useLocation as jest.Mock).mockReturnValue({
			pathname: "/interactions/abacavir/",
		});
		render(<InteractionsAlert />);
		expect(screen.getByTestId("interactions-a-z-alert")).toBeInTheDocument();
	});

	it("should not render the alert for unrelated paths", () => {
		(useLocation as jest.Mock).mockReturnValue({ pathname: "/other-path" });
		render(<InteractionsAlert />);
		expect(
			screen.queryByTestId("interactions-a-z-alert")
		).not.toBeInTheDocument();
	});

	it("should not render the alert for paths that just partially match, e.g., '/interaction-test'", () => {
		(useLocation as jest.Mock).mockReturnValue({
			pathname: "/interaction-test",
		});
		render(<InteractionsAlert />);
		expect(
			screen.queryByTestId("interactions-a-z-alert")
		).not.toBeInTheDocument();
	});
});
