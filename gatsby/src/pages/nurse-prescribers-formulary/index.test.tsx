import { render, waitFor } from "@testing-library/react";
import { useStaticQuery } from "gatsby";

import { mockNursePrescribersPagesQueryData } from "@/hooks/useNursePrescribers.test";

import NursePrescribersFormularyIndexPage from "./";

describe("NursePrescribersFormularyTreatmentSummaryPage", () => {
	beforeEach(() => {
		(useStaticQuery as jest.Mock).mockReturnValue(
			mockNursePrescribersPagesQueryData
		);
	});

	it("should match snapshot for page contents", () => {
		const { container } = render(<NursePrescribersFormularyIndexPage />);

		expect(container).toMatchSnapshot();
	});

	it("should set page title", async () => {
		render(<NursePrescribersFormularyIndexPage />);

		await waitFor(() => {
			expect(document.title).toStartWith("Nurse Prescribers' Formulary | ");
		});
	});
});
