import { useLocation } from "@reach/router";
import { render, waitFor } from "@testing-library/react";
import { useStaticQuery } from "gatsby";

import { mockNursePrescribersPagesQueryData } from "@/hooks/useNursePrescribers.test";

import NursePrescribersFormularyApprovedListPage, {
	type NursePrescribersFormularyApprovedListPageProps,
	query,
} from "./{BnfNursePrescribersFormularyIntroduction.slug}";

const pageProps: NursePrescribersFormularyApprovedListPageProps = {
	data: {
		bnfNursePrescribersFormularyIntroduction: {
			title:
				"Approved list for prescribing by Community Practitioner Nurse Prescribers (NPF)",
			slug: "approved-list-for-prescribing-by-community-practitioner-nurse-prescribers-npf",
			sections: [
				{
					content: "<p>Approved list content</p>",
					slug: "intro-1",
					title: "Intro 1",
				},
				{
					content: "<p>Approved list content 2</p>",
					slug: "intro-2",
					title: "Intro 2",
				},
			],
		},
	},
	location: {
		pathname:
			"/nurse-prescribers-formulary/approved-list-for-prescribing-by-community-practitioner-nurse-prescribers-npf/",
	},
};

describe("NursePrescribersFormularyApprovedListPage", () => {
	beforeEach(() => {
		(useLocation as jest.Mock).mockReturnValue(
			new URL(
				"https://bnf-gatsby-tests.nice.org.uk/nurse-prescribers-formulary/approved-list-for-prescribing-by-community-practitioner-nurse-prescribers-npf/"
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
		const { container } = render(
			<NursePrescribersFormularyApprovedListPage {...pageProps} />
		);

		expect(container).toMatchSnapshot();
	});

	it("should set page title", async () => {
		render(<NursePrescribersFormularyApprovedListPage {...pageProps} />);

		await waitFor(() => {
			expect(document.title).toStartWith(
				"Approved list for prescribing by Community Practitioner Nurse Prescribers (NPF) | Nurse Prescribers' Formulary | "
			);
		});
	});

	it("should set meta description for known path on BNF", async () => {
		render(<NursePrescribersFormularyApprovedListPage {...pageProps} />);

		await waitFor(() => {
			expect(
				// eslint-disable-next-line testing-library/no-node-access
				document.querySelector(`meta[name="description"]`)
			).toHaveAttribute(
				"content",
				"List of preparations approved for use by District Nurses and Specialist Community Public Health Nurses who have received nurse prescriber training."
			);
		});
	});

	it("should throw error for unknown path", () => {
		expect(() => {
			render(
				<NursePrescribersFormularyApprovedListPage
					data={{
						bnfNursePrescribersFormularyIntroduction: {
							title: "Unknown",
							slug: "unknown",
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
