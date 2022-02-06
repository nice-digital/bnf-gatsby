import { render, screen, waitFor } from "@testing-library/react";

import DentalPractitionersFormularyPage, {
	type DentalPractitionersFormularyPageProps,
	query,
} from "./";

const pageProps: DentalPractitionersFormularyPageProps = {
	data: {
		bnfDentalPractitionersFormulary: {
			title: "Dental Practitioners’ Formulary",
			sections: [
				{
					order: 0,
					content:
						"<p>The following list has been approved by the appropriate Secretaries of State</p>",
					slug: "list-of-dental-preparations",
					title: "List of Dental Preparations",
				},
				{
					order: 1,
					content:
						"<p>Preparations on the List of Dental Preparations which are specified as DPF are described as follows in the DPF.</p>",
					slug: "details-of-dpf-preparations",
					title: "Details of DPF preparations",
				},
			],
		},
	},
};

describe("DentalPractitionersFormularyPageProps", () => {
	it("should match snapshot for graphql query", () => {
		expect(query).toMatchSnapshot();
	});

	it("should match snapshot for page contents", () => {
		render(<DentalPractitionersFormularyPage {...pageProps} />);

		expect(screen.getByRole("main")).toMatchSnapshot();
	});

	it("should set page title", async () => {
		render(<DentalPractitionersFormularyPage {...pageProps} />);

		await waitFor(() => {
			expect(document.title).toStartWith("Dental Practitioners’ Formulary |");
		});
	});

	it.todo("should render meta description");
});
