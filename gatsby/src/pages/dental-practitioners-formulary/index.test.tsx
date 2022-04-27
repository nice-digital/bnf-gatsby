import { render, screen, waitFor } from "@testing-library/react";

import { useSiteMetadata } from "@/hooks/useSiteMetadata";

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
					content:
						"<p>The following list has been approved by the appropriate Secretaries of State</p>",
					slug: "list-of-dental-preparations",
					title: "List of Dental Preparations",
				},
				{
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

	it("should render meta description for BNF", async () => {
		render(<DentalPractitionersFormularyPage {...pageProps} />);

		await waitFor(() => {
			expect(
				document
					// eslint-disable-next-line testing-library/no-node-access
					.querySelector("meta[name='description']")
			).toHaveAttribute(
				"content",
				"Browse the Dental Practitioners' Formulary (DPF) - the list of approved preparations for prescribing by dentists in the BNF."
			);
		});
	});

	it("should render meta description for BNFC", async () => {
		(useSiteMetadata as jest.Mock).mockImplementationOnce(() => ({
			siteTitleShort: "BNFC",
		}));

		render(<DentalPractitionersFormularyPage {...pageProps} />);

		await waitFor(() => {
			expect(
				document
					// eslint-disable-next-line testing-library/no-node-access
					.querySelector("meta[name='description']")
			).toHaveAttribute(
				"content",
				"Browse the Dental Practitioners' Formulary (DPF) - the list of approved preparations for prescribing by dentists in the BNFC."
			);
		});
	});
});
