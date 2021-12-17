import { render, screen } from "@testing-library/react";

import NotFoundPage from "./404";

describe("NotFoundPage", () => {
	it("should render something", () => {
		render(<NotFoundPage />);

		expect(screen.getByText("Go home")).toBeInTheDocument();
	});
});
