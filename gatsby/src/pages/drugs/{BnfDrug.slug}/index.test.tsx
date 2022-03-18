import { render, waitFor, screen, within } from "@testing-library/react";

import DrugPage, { query, type DrugPageProps } from ".";

const drug: DrugPageProps["data"]["bnfDrug"] = {
	// Note deliberate use of HTML within the title for testing stripping of tags
	title: "Anti-D (Rh<sub>0</sub>) immunoglobulin",
	slug: "anti-d-rh0-immunoglobulin",
	allergyAndCrossSensitivity: null,
	breastFeeding: null,
	cautions: null,
	conceptionAndContraception: null,
	contraIndications: null,
	directionsForAdministration: null,
	drugAction: null,
	effectOnLaboratoryTests: null,
	exceptionsToLegalCategory: null,
	handlingAndStorage: null,
	hepaticImpairment: null,
	importantSafetyInformation: null,
	indicationsAndDose: null,
	lessSuitableForPrescribing: null,
	medicinalForms: {
		initialStatement: "Nothing to see here",
	},
	monitoringRequirements: null,
	nationalFunding: null,
	palliativeCare: null,
	patientAndCarerAdvice: null,
	preTreatmentScreening: null,
	pregnancy: null,
	prescribingAndDispensingInformation: null,
	renalImpairment: null,
	professionSpecificInformation: null,
	sideEffects: null,
	treatmentCessation: null,
	unlicensedUse: null,
};

const dataProp: DrugPageProps["data"] = {
	bnfDrug: drug,
};

describe("DrugPage", () => {
	it("should match snapshot for graphql query", () => {
		expect(query).toMatchSnapshot();
	});

	describe("SEO", () => {
		it("should strip HTML tags for page title", async () => {
			render(<DrugPage data={dataProp} />);

			await waitFor(() => {
				expect(document.title).toStartWith(
					"Anti-D (Rh0) immunoglobulin | Drugs |"
				);
			});
		});

		it("should strip HTML tags for templated meta description", async () => {
			render(<DrugPage data={dataProp} />);

			await waitFor(() => {
				expect(
					document
						// eslint-disable-next-line testing-library/no-node-access
						.querySelector("meta[name='description']")
				).toHaveAttribute(
					"content",
					"Indications, dose, contra-indications, side-effects, interactions, cautions, warnings and other safety information for Anti-D (Rh0) immunoglobulin"
				);
			});
		});
	});

	describe("Page header", () => {
		it("should add content start skip link target id to page header", () => {
			render(<DrugPage data={dataProp} />);
			const heading1 = screen.getByRole("heading", {
				level: 1,
			});
			// eslint-disable-next-line testing-library/no-node-access
			expect(heading1.parentElement).toHaveAttribute("id", "content-start");
		});

		it("should render heading 1 with current page title", () => {
			render(<DrugPage data={dataProp} />);
			const heading1 = screen.getByRole("heading", {
				level: 1,
			});
			expect(heading1).toHaveTextContent("Anti-D (Rh0) immunoglobulin");
		});
	});

	describe("Breadcrumbs", () => {
		it.each([
			["NICE", "https://www.nice.org.uk/"],
			["BNF", "/"],
			["Drugs", "/drugs/"],
		])(
			"should render default '(%s)' breadcrumb",
			(breadcrumbText, expectedHref) => {
				render(<DrugPage data={dataProp} />);

				const breadcrumbNav = screen.getByRole("navigation", {
					name: "Breadcrumbs",
				});
				const breadcrumb = within(breadcrumbNav).getByRole("link", {
					name: breadcrumbText,
				});

				expect(breadcrumb).toHaveAttribute("href", expectedHref);
			}
		);

		it("should render current page breadcrumb without link", () => {
			render(<DrugPage data={dataProp} />);

			const breadcrumbNav = screen.getByRole("navigation", {
				name: "Breadcrumbs",
			});
			const currentPageCrumb = within(breadcrumbNav).getByText(
				"Anti-D (Rh0) immunoglobulin"
			);
			expect(currentPageCrumb).toBeInTheDocument();
			expect(currentPageCrumb.tagName).toBe("SPAN");
		});
	});

	describe("body", () => {
		it.todo("body tests");
	});
});
