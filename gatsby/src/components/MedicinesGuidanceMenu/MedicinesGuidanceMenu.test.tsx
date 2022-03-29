import { useLocation } from "@reach/router";
import { render, screen } from "@testing-library/react";
import { useStaticQuery } from "gatsby";

import { mockQueryData } from "@/hooks/useMedicinesGuidancePages.test";

import { MedicinesGuidanceMenu } from "./MedicinesGuidanceMenu";

(useStaticQuery as jest.Mock).mockReturnValue(mockQueryData);

describe("MedicinesGuidanceMenu", () => {
	it("should render labelled navigation wrapper", () => {
		render(<MedicinesGuidanceMenu />);

		expect(
			screen.getByRole("navigation", { name: "Medicines guidance pages" })
		).toBeInTheDocument();
	});

	it("should render anchor back to parent medicines guidance index page", () => {
		render(<MedicinesGuidanceMenu />);

		expect(
			screen.getByRole("link", { name: "Medicines guidance" })
		).toHaveAttribute("href", "/medicines-guidance/");
	});

	it("should render anchor for each medicines guidance page record from feed", () => {
		render(<MedicinesGuidanceMenu />);

		expect(
			screen.getByRole("link", { name: "Guidance on prescribing" })
		).toHaveAttribute("href", "/medicines-guidance/guidance-on-prescribing/");

		expect(screen.getAllByRole("link")).toHaveLength(3);
	});

	it("should highlight current page", () => {
		(useLocation as jest.Mock).mockImplementationOnce(
			() =>
				new URL(
					"https://bnf-gatsby-tests.nice.org.uk/medicines-guidance/prescription-writing/"
				)
		);

		render(<MedicinesGuidanceMenu />);

		expect(
			screen.getByRole("link", { name: "Prescription writing" })
		).toHaveAttribute("aria-current", "true");
	});
});
