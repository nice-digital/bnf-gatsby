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
	constituentDrugs: null,
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
		initialStatement: "No licensed medicines listed.",
		specialOrderManufacturersStatement: null,
		medicinalForms: [],
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

	describe("Important safety information", () => {
		const importantSafetyInformation: DrugPageProps["data"]["bnfDrug"]["importantSafetyInformation"] =
			{
				potName: "Important safety information",
				slug: "important-safety-information",
				drugClassContent: [],
				drugContent: {
					contentFor: "diazepam",
					content:
						"<p>This is very important safety information right here</p>",
				},
				prepContent: [],
			};

		it("should not render important info section when not present in the feed", () => {
			render(
				<DrugPage
					data={{
						bnfDrug: drug,
					}}
				/>
			);

			expect(
				screen.queryByRole("link", { name: "Important safety information" })
			).toBeNull();

			expect(
				screen.queryByRole("heading", {
					level: 2,
					name: "Important safety information",
				})
			).toBeNull();

			expect(
				screen.queryByRole("region", { name: "Important safety information" })
			).toBeNull();
		});

		it("should render important safety information section when present in the feed", () => {
			render(
				<DrugPage
					data={{
						bnfDrug: {
							...drug,
							importantSafetyInformation,
						},
					}}
				/>
			);

			expect(
				screen.getByRole("link", { name: "Important safety information" })
			).toHaveAttribute("href", "#important-safety-information");

			expect(
				screen.getByRole("heading", {
					level: 2,
					name: "Important safety information",
				})
			).toHaveAttribute("id", "important-safety-information");

			expect(
				screen.getByRole("region", { name: "Important safety information" })
			).toBeInTheDocument();
		});

		it("should match snapshot for important safety information section", () => {
			render(
				<DrugPage
					data={{
						bnfDrug: {
							...drug,
							importantSafetyInformation,
						},
					}}
				/>
			);

			expect(
				screen.getByRole("region", { name: "Important safety information" })
			).toMatchSnapshot();
		});
	});

	describe("body", () => {
		describe("Constituent drugs", () => {
			const constituentDrugs: DrugPageProps["data"]["bnfDrug"]["constituentDrugs"] =
				{
					message:
						"The properties listed on this page are those particular to the combination only. For the properties of the components please consider the following;",
					constituents: [
						{
							slug: "emtricitabine",
							title: "Emtricitabine",
						},
						{
							slug: "tenofovir-alafenamide",
							title: "Tenofovir alafenamide",
						},
					],
				};

			it("should not render constituent drugs when not present in the feed", () => {
				render(
					<DrugPage
						data={{
							bnfDrug: drug,
						}}
					/>
				);

				expect(
					screen.queryByRole("link", { name: "Constituent drugs" })
				).toBeNull();

				expect(
					screen.queryByRole("heading", { level: 2, name: "Constituent drugs" })
				).toBeNull();

				expect(
					screen.queryByRole("region", { name: "Constituent drugs" })
				).toBeNull();
			});

			it("should render constituent drugs section when present in the feed", () => {
				render(
					<DrugPage
						data={{
							bnfDrug: {
								...drug,
								constituentDrugs,
							},
						}}
					/>
				);

				expect(
					screen.getByRole("link", { name: "Constituent drugs" })
				).toHaveAttribute("href", "#constituent-drugs");

				expect(
					screen.getByRole("heading", { level: 2, name: "Constituent drugs" })
				).toHaveAttribute("id", "constituent-drugs");

				expect(
					screen.getByRole("region", { name: "Constituent drugs" })
				).toBeInTheDocument();
			});

			it("should match snapshot for constituent drugs section", () => {
				render(
					<DrugPage
						data={{
							bnfDrug: {
								...drug,
								constituentDrugs,
							},
						}}
					/>
				);

				expect(
					screen.getByRole("region", { name: "Constituent drugs" })
				).toMatchSnapshot();
			});
		});

		describe("Medicinal forms", () => {
			it("should render shortcut link to medicinal forms section", () => {
				render(
					<DrugPage
						data={{
							bnfDrug: drug,
						}}
					/>
				);

				expect(
					screen.getByRole("link", { name: "Medicinal forms" })
				).toHaveAttribute("href", "#medicinal-forms");
			});

			it("should render medicinal forms section", () => {
				render(
					<DrugPage
						data={{
							bnfDrug: drug,
						}}
					/>
				);

				expect(
					screen.getByRole("heading", {
						level: 2,
						name: "Medicinal forms",
					})
				).toHaveAttribute("id", "medicinal-forms");

				expect(
					screen.getByRole("region", { name: "Medicinal forms" })
				).toBeInTheDocument();
			});

			it("should render medicinal forms shortcut panel section", () => {
				render(
					<DrugPage
						data={{
							bnfDrug: drug,
						}}
					/>
				);

				expect(
					screen.getByRole("heading", {
						level: 2,
						name: "Medicinal forms and\xa0pricing",
					})
				).toBeInTheDocument();
			});
		});

		describe.each<[keyof typeof drug]>([
			["allergyAndCrossSensitivity"],
			["breastFeeding"],
			["cautions"],
			["conceptionAndContraception"],
			["contraIndications"],
			["directionsForAdministration"],
			["drugAction"],
			["effectOnLaboratoryTests"],
			["exceptionsToLegalCategory"],
			["handlingAndStorage"],
			["hepaticImpairment"],
			["lessSuitableForPrescribing"],
			["palliativeCare"],
			["patientAndCarerAdvice"],
			["preTreatmentScreening"],
			["pregnancy"],
			["prescribingAndDispensingInformation"],
			["professionSpecificInformation"],
			["renalImpairment"],
			["sideEffects"],
		])("Simple pot section for %s", (drugProperty) => {
			it(`should not render section for ${drugProperty} when not present in the feed`, () => {
				render(
					<DrugPage
						data={{
							bnfDrug: {
								...drug,
								[drugProperty]: null,
							},
						}}
					/>
				);

				expect(
					screen.queryByRole("link", { name: "Some pot name" })
				).toBeNull();

				expect(
					screen.queryByRole("heading", { level: 2, name: "Some pot name" })
				).toBeNull;

				expect(
					screen.queryByRole("region", { name: "Some pot name" })
				).toBeNull();
			});

			it(`should render section for ${drugProperty} when present in the feed`, () => {
				render(
					<DrugPage
						data={{
							bnfDrug: {
								...drug,
								[drugProperty]: {
									potName: "Some pot name",
									slug: "some-pot-name",
									drugClassContent: [],
									drugContent: [],
									prepContent: [],
								},
							},
						}}
					/>
				);

				expect(
					screen.getByRole("link", { name: "Some pot name" })
				).toHaveAttribute("href", "#some-pot-name");

				expect(
					screen.getByRole("heading", { level: 2, name: "Some pot name" })
				).toHaveAttribute("id", "some-pot-name");

				expect(
					screen.getByRole("region", { name: "Some pot name" })
				).toBeInTheDocument();
			});
		});
	});
});
