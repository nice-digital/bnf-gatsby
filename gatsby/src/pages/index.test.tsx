import { render, screen } from "@testing-library/react";

import { useSiteMetadata } from "@/hooks/useSiteMetadata";

import HomePage from "./";

describe("HomePage", () => {
	it("should match snapshot for BNF", () => {
		render(<HomePage />);
		expect(screen.getByRole("main")).toMatchSnapshot();
	});

	it("should match snapshot for BNFC", () => {
		(useSiteMetadata as jest.Mock).mockReturnValueOnce({
			isBNF: false,
			siteTitleShort: "BNF",
			siteTitleLong: "British National Formulary for Children",
		});

		render(<HomePage />);
		expect(screen.getByRole("main")).toMatchSnapshot();
	});
});
