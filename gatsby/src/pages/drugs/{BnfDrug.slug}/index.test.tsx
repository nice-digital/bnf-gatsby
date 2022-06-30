import { render, waitFor, screen, within } from "@testing-library/react";

import DrugPage, { query, type DrugPageProps } from ".";

const drug: DrugPageProps["data"]["bnfDrug"] = {
	// Note deliberate use of HTML within the title for testing stripping of tags
	title: "Anti-D (Rh<sub>0</sub>) immunoglobulin",
	slug: "anti-d-rh0-immunoglobulin",
	primaryClassification: null,
	secondaryClassifications: [],
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
	interactants: [],
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
	relatedTreatmentSummaries: [],
	relatedNursePrescribersTreatmentSummaries: [],
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
			render(
				<DrugPage
					data={{
						bnfDrug: {
							...drug,
							renalImpairment: {
								potName: "Renal impairment",
								slug: "renal-impairment",
								drugClassContent: [],
								drugContent: {
									contentFor: "adrenaline/epinephrine",
									slug: "adrenaline-epinephrine",
									content:
										"<p>Manufacturers advise use with caution in severe impairment.</p>",
								},
								prepContent: [],
							},
							importantSafetyInformation: {
								potName: "Important safety information",
								slug: "important-safety-information",
								drugClassContent: [],
								drugContent: {
									contentFor: "adrenaline/epinephrine",
									slug: "adrenaline-epinephrine",
									content: "<h4>Test content</h4>",
								},
								prepContent: [],
							},
							monitoringRequirements: {
								potName: "Monitoring requirements",
								slug: "monitoring-requirements",
								drugClassContent: [],
								drugContent: {
									contentFor: "adrenaline/epinephrine",
									slug: "adrenaline-epinephrine",
									monitoringOfPatientParameters:
										"<p>Monitor blood pressure and ECG.</p>",
									patientMonitoringProgrammes: null,
									therapeuticDrugMonitoring: null,
								},
								prepContent: [],
							},
						},
					}}
				/>
			);

			await waitFor(() => {
				expect(
					document
						// eslint-disable-next-line testing-library/no-node-access
						.querySelector("meta[name='description']")
				).toHaveAttribute(
					"content",
					"View Anti-D (Rh0) immunoglobulin information, including renal impairment, monitoring requirements and important safety information."
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
					slug: "diazepam",
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

		describe("Interactions", () => {
			describe("No interactants", () => {
				it("should not render interactions sections when there are no interactants", () => {
					render(
						<DrugPage
							data={{
								bnfDrug: drug,
							}}
						/>
					);

					expect(
						screen.queryByRole("link", { name: "Interactions" })
					).toBeNull();

					expect(
						screen.queryByRole("heading", { level: 2, name: "Interactions" })
					).toBeNull();

					expect(
						screen.queryByRole("region", { name: "Interactions" })
					).toBeNull();
				});
			});

			describe("Single interactant", () => {
				const interactants = [{ slug: "abacavir", title: "Abacavir" }];

				it("should render shortcut link to interactions section", () => {
					render(
						<DrugPage
							data={{
								bnfDrug: {
									...drug,
									interactants: interactants,
								},
							}}
						/>
					);

					expect(
						screen.getByRole("link", { name: "Interactions" })
					).toHaveAttribute("href", "#interactions");
				});

				it("should render interactions section", () => {
					render(
						<DrugPage
							data={{
								bnfDrug: {
									...drug,
									interactants: interactants,
								},
							}}
						/>
					);

					const mainBodySection = screen.getByRole("region", {
						name: "Interactions",
					});

					expect(mainBodySection).toBeInTheDocument();

					expect(
						within(mainBodySection).getByRole("heading", {
							level: 2,
							name: "Interactions",
						})
					).toHaveAttribute("id", "interactions");
				});

				it("should match snapshot for interactions section", () => {
					render(
						<DrugPage
							data={{
								bnfDrug: {
									...drug,
									interactants: interactants,
								},
							}}
						/>
					);

					const mainBodySection = screen.getByRole("region", {
						name: "Interactions",
					});

					expect(mainBodySection).toMatchSnapshot();
				});

				it("should render interactions shortcut panel section", () => {
					render(
						<DrugPage
							data={{
								bnfDrug: {
									...drug,
									interactants: interactants,
								},
							}}
						/>
					);

					expect(
						screen.getAllByRole("heading", {
							level: 2,
							name: "Interactions",
						})
					).toHaveLength(2);
				});
			});

			describe("Multiple interactants", () => {
				const interactants = [
					{ slug: "abacavir", title: "Abacavir" },
					{ slug: "lamivudine", title: "Lamivudine" },
				];

				it("should render shortcut link to interactions section", () => {
					render(
						<DrugPage
							data={{
								bnfDrug: {
									...drug,
									interactants: interactants,
								},
							}}
						/>
					);

					expect(
						screen.getByRole("link", { name: "Interactions" })
					).toHaveAttribute("href", "#interactions");
				});

				it("should render interactions section", () => {
					render(
						<DrugPage
							data={{
								bnfDrug: {
									...drug,
									interactants: interactants,
								},
							}}
						/>
					);

					const mainBodySection = screen.getByRole("region", {
						name: "Interactions",
					});

					expect(mainBodySection).toBeInTheDocument();

					expect(
						within(mainBodySection).getByRole("heading", {
							level: 2,
							name: "Interactions",
						})
					).toHaveAttribute("id", "interactions");
				});

				it("should match snapshot for interactions section", () => {
					render(
						<DrugPage
							data={{
								bnfDrug: {
									...drug,
									interactants: interactants,
								},
							}}
						/>
					);

					const mainBodySection = screen.getByRole("region", {
						name: "Interactions",
					});

					expect(mainBodySection).toMatchSnapshot();
				});

				it("should render interactions shortcut panel section", () => {
					render(
						<DrugPage
							data={{
								bnfDrug: {
									...drug,
									interactants: interactants,
								},
							}}
						/>
					);

					expect(
						screen.getAllByRole("heading", {
							level: 2,
							name: "Interactions",
						})
					).toHaveLength(2);
				});
			});
		});

		describe("Monitoring requirements", () => {
			it("should not render monitoring requirements when not present in the feed", () => {
				render(
					<DrugPage
						data={{
							bnfDrug: drug,
						}}
					/>
				);

				expect(
					screen.queryByRole("link", { name: "Monitoring requirements" })
				).toBeNull();

				expect(
					screen.queryByRole("heading", {
						level: 2,
						name: "Monitoring requirements",
					})
				).toBeNull();

				expect(
					screen.queryByRole("region", { name: "Monitoring requirements" })
				).toBeNull();
			});

			it("should render monitoring requirements section when present in the feed", () => {
				render(
					<DrugPage
						data={{
							bnfDrug: {
								...drug,
								monitoringRequirements: {
									potName: "Monitoring requirements",
									slug: "monitoring-requirements",
									drugClassContent: [],
									drugContent: null,
									prepContent: [],
								},
							},
						}}
					/>
				);

				expect(
					screen.getByRole("link", { name: "Monitoring requirements" })
				).toHaveAttribute("href", "#monitoring-requirements");

				expect(
					screen.getByRole("heading", {
						level: 2,
						name: "Monitoring requirements",
					})
				).toHaveAttribute("id", "monitoring-requirements");

				expect(
					screen.getByRole("region", { name: "Monitoring requirements" })
				).toBeInTheDocument();
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

		describe("Related treatment summaries", () => {
			it("should not render related treatments section when there are none", () => {
				render(
					<DrugPage
						data={{
							bnfDrug: { ...drug, relatedTreatmentSummaries: [] },
						}}
					/>
				);

				expect(
					screen.queryByRole("link", { name: "Related treatment summaries" })
				).toBeNull();

				expect(
					screen.queryByRole("heading", {
						level: 2,
						name: "Related treatment summaries",
					})
				).toBeNull;

				expect(
					screen.queryByRole("region", { name: "Related treatment summaries" })
				).toBeNull();
			});

			it("should render related treatment summaries section and heading", () => {
				render(
					<DrugPage
						data={{
							bnfDrug: {
								...drug,
								relatedTreatmentSummaries: [
									{
										slug: "acne",
										title: "Acne",
									},
								],
							},
						}}
					/>
				);

				expect(
					screen.getByRole("heading", {
						level: 2,
						name: "Related treatment summaries",
					})
				).toHaveAttribute("id", "related-treatment-summaries");

				expect(
					screen.getByRole("region", { name: "Related treatment summaries" })
				).toBeInTheDocument();
			});

			it("should render link to related treatment summary", () => {
				render(
					<DrugPage
						data={{
							bnfDrug: {
								...drug,
								relatedTreatmentSummaries: [
									{
										slug: "acne",
										title: "Acne",
									},
								],
							},
						}}
					/>
				);

				expect(
					screen.getByRole("link", {
						name: "Acne",
					})
				).toHaveAttribute("href", "/treatment-summaries/acne/");
			});
		});

		describe("Related NPF treatment summaries", () => {
			it("should not render related NPF treatments section when there are none", () => {
				render(
					<DrugPage
						data={{
							bnfDrug: {
								...drug,
								relatedNursePrescribersTreatmentSummaries: [],
							},
						}}
					/>
				);

				expect(
					screen.queryByRole("link", {
						name: "Related Nurse Prescribers’ treatment summaries",
					})
				).toBeNull();

				expect(
					screen.queryByRole("heading", {
						level: 2,
						name: "Related Nurse Prescribers’ treatment summaries",
					})
				).toBeNull;

				expect(
					screen.queryByRole("region", {
						name: "Related Nurse Prescribers’ treatment summaries",
					})
				).toBeNull();
			});

			it("should render related NPF treatment summaries section and heading", () => {
				render(
					<DrugPage
						data={{
							bnfDrug: {
								...drug,
								relatedNursePrescribersTreatmentSummaries: [
									{
										slug: "analgesics",
										title: "Analgesics",
									},
								],
							},
						}}
					/>
				);

				expect(
					screen.getByRole("heading", {
						level: 2,
						name: "Related Nurse Prescribers’ treatment summaries",
					})
				).toHaveAttribute("id", "related-npf-treatment-summaries");

				expect(
					screen.getByRole("region", {
						name: "Related Nurse Prescribers’ treatment summaries",
					})
				).toBeInTheDocument();
			});

			it("should render link to related NPF treatment summary", () => {
				render(
					<DrugPage
						data={{
							bnfDrug: {
								...drug,
								relatedNursePrescribersTreatmentSummaries: [
									{
										slug: "analgesics",
										title: "Analgesics",
									},
								],
							},
						}}
					/>
				);

				expect(
					screen.getByRole("link", {
						name: "Analgesics",
					})
				).toHaveAttribute("href", "/nurse-prescribers-formulary/analgesics/");
			});
		});

		describe("Other drugs in class", () => {
			const primaryClassification = {
				title: "Antacids",
				slug: "antacids",
				order: 0,
				drugs: [
					{
						title: "Bismuth subsalicylate",
						slug: "bismuth-subsalicylate",
					},
				],
			};

			it("should not render other drugs in class when there are none", () => {
				render(
					<DrugPage
						data={{
							bnfDrug: drug,
						}}
					/>
				);

				expect(
					screen.queryByRole("link", { name: "Other drugs in class" })
				).toBeNull();

				expect(
					screen.queryByRole("heading", {
						level: 2,
						name: "Other drugs in class",
					})
				).toBeNull;

				expect(
					screen.queryByRole("region", { name: "Other drugs in class" })
				).toBeNull();
			});

			it("should render other drugs in class section and heading", () => {
				render(
					<DrugPage
						data={{
							bnfDrug: {
								...drug,
								primaryClassification,
							},
						}}
					/>
				);

				expect(
					screen.getByRole("heading", {
						level: 2,
						name: "Other drugs in class",
					})
				).toHaveAttribute("id", "other-drugs-in-class");

				expect(
					screen.getByRole("region", { name: "Other drugs in class" })
				).toBeInTheDocument();
			});
		});
	});
});
