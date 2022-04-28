import { useLocation } from "@reach/router";
import { render, screen, waitFor } from "@testing-library/react";
import { useStaticQuery } from "gatsby";

import { mockNursePrescribersPagesQueryData } from "@/hooks/useNursePrescribers.test";

import NursePrescribersFormularyTreatmentSummaryPage, {
	type NursePrescribersFormularyTreatmentSummaryPageProps,
	query,
} from "./{BnfNursePrescribersFormularyTreatmentSummary.slug}";

const pageProps: NursePrescribersFormularyTreatmentSummaryPageProps = {
	data: {
		bnfNursePrescribersFormularyTreatmentSummary: {
			title: "Analgesics",
			slug: "analgesics",
			sections: [
				{
					content: "<p>Analgesic content</p>",
					slug: "analgesic-1",
					title: "Analgesic 1",
				},
				{
					content: "<p>Analgesic content 2</p>",
					slug: "analgesic-2",
					title: "Analgesic 2",
				},
			],
		},
	},
	location: {
		pathname: "/nurse-prescribers-formulary/analgesics/",
	},
};

describe("NursePrescribersFormularyTreatmentSummaryPage", () => {
	beforeEach(() => {
		(useLocation as jest.Mock).mockReturnValue(
			new URL(
				"https://bnf-gatsby-tests.nice.org.uk/nurse-prescribers-formulary/analgesics/"
			)
		);

		(useStaticQuery as jest.Mock).mockReturnValue(
			mockNursePrescribersPagesQueryData
		);
	});

	it("should match snapshot for graphql query", () => {
		expect(query).toMatchSnapshot();
	});

	it("should match snapshot for page contents", () => {
		render(<NursePrescribersFormularyTreatmentSummaryPage {...pageProps} />);

		expect(screen.getByRole("main")).toMatchSnapshot();
	});

	it("should set page title", async () => {
		render(<NursePrescribersFormularyTreatmentSummaryPage {...pageProps} />);

		await waitFor(() => {
			expect(document.title).toStartWith(
				"Analgesics | Nurse Prescribers' Formulary | "
			);
		});
	});

	it("should set meta description for known path on BNF", async () => {
		render(<NursePrescribersFormularyTreatmentSummaryPage {...pageProps} />);

		await waitFor(() => {
			expect(
				// eslint-disable-next-line testing-library/no-node-access
				document.querySelector(`meta[name="description"]`)
			).toHaveAttribute(
				"content",
				"Read non-opioid analgesic prescribing information for nurse prescribers, including aspirin, ibuprofen; and paracetamol for mild-to-moderate pain relief."
			);
		});
	});

	it("should throw error for unknown path", () => {
		expect(() => {
			render(
				<NursePrescribersFormularyTreatmentSummaryPage
					data={{
						bnfNursePrescribersFormularyTreatmentSummary: {
							slug: "unknown",
							title: "Unknown",
							sections: [],
						},
					}}
					location={{
						pathname: "/nurse-prescribers-formulary/unknown/",
					}}
				/>
			);
		}).toThrowError(
			"Couldn't find meta description for page 'Unknown' at path '/nurse-prescribers-formulary/unknown/'. Has the page been added or renamed?"
		);
	});
});
