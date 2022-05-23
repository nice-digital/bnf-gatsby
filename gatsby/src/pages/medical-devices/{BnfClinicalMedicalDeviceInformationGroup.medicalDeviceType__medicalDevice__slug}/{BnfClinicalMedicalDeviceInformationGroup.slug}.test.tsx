import { useLocation } from "@reach/router";
import { render, waitFor, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import CMPIPage, {
	type CMPIPageProps,
} from "./{BnfClinicalMedicalDeviceInformationGroup.slug}";

const props: CMPIPageProps = {
	data: {
		bnfClinicalMedicalDeviceInformationGroup: {
			allergyAndCrossSensitivity: null,
			complianceStandards: null,
			deviceDescription: null,
			indicationsAndDose: null,
			medicalDeviceType: {
				slug: "artificial-saliva-products",
				title: "Artificial saliva products",
				medicalDevice: {
					slug: "artificial-saliva-products",
					title: "Artificial saliva products",
				},
				clinicalMedicalDeviceInformationGroups: [
					{
						title: "AS Saliva Orthana® lozenges",
						slug: "as-saliva-orthana-lozenges",
					},
					{
						title: "AS Saliva Orthana® spray",
						slug: "as-saliva-orthana-spray",
					},
					{
						title: "BioXtra® gel",
						slug: "bioxtra-gel",
					},
				],
			},
			patientAndCarerAdvice: null,
			preparations: [],
			prescribingAndDispensingInformation: null,
			professionSpecificInformation: null,
			title: "AS Saliva Orthana® lozenges",
			treatmentCessation: null,
		},
	},
};

describe("CMPIPage", () => {
	describe("SEO", () => {
		it("should set page title from medical type title", async () => {
			render(<CMPIPage {...props} />);
			await waitFor(() => {
				expect(document.title).toStartWith(
					"AS Saliva Orthana® lozenges | Artificial saliva products | Medical devices | "
				);
			});
		});

		it("should set meta description", async () => {
			render(<CMPIPage {...props} />);
			await waitFor(() => {
				expect(
					// eslint-disable-next-line testing-library/no-node-access
					document.querySelector("meta[name=description]")
				).toHaveAttribute(
					"content",
					"This medical devices topic describes the options that are currently recommended for AS Saliva Orthana® lozenges."
				);
			});
		});
	});

	describe("Breadcrumbs", () => {
		it.each([
			["NICE", "https://www.nice.org.uk/"],
			["BNF", "/"],
			["Medical devices", "/medical-devices/"],
			[
				"Artificial saliva products",
				"/medical-devices/artificial-saliva-products/",
			],
		])(
			"should render default '(%s)' breadcrumb",
			(breadcrumbText, expectedHref) => {
				render(<CMPIPage {...props} />);

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
			render(<CMPIPage {...props} />);

			const breadcrumbNav = screen.getByRole("navigation", {
				name: "Breadcrumbs",
			});
			const currentPageCrumb = within(breadcrumbNav).getByText(
				"AS Saliva Orthana® lozenges",
				{
					selector: "span",
				}
			);
			expect(currentPageCrumb).toBeInTheDocument();
		});
	});

	describe("Page header", () => {
		it("should add content start skip link target id to page header", () => {
			render(<CMPIPage {...props} />);
			const heading1 = screen.getByRole("heading", {
				level: 1,
			});
			// eslint-disable-next-line testing-library/no-node-access
			expect(heading1.parentElement).toHaveAttribute("id", "content-start");
		});

		it("should render heading 1 with current page title", () => {
			render(<CMPIPage {...props} />);
			const heading1 = screen.getByRole("heading", {
				level: 1,
			});
			expect(heading1).toHaveTextContent("AS Saliva Orthana® lozenges");
		});
	});

	describe("Stacked nav", () => {
		it("should not render stacked nav when there are no sibling device types", () => {
			render(
				<CMPIPage
					data={{
						bnfClinicalMedicalDeviceInformationGroup: {
							...props.data.bnfClinicalMedicalDeviceInformationGroup,
							medicalDeviceType: {
								...props.data.bnfClinicalMedicalDeviceInformationGroup
									.medicalDeviceType,
								clinicalMedicalDeviceInformationGroups: [],
							},
						},
					}}
				/>
			);

			expect(
				screen.queryByText("AS Saliva Orthana® lozenges", {
					selector: ".stacked-nav a",
				})
			).toBeNull();
		});

		it("should render stacked nav when there are sibling device types", () => {
			render(<CMPIPage {...props} />);
			expect(
				screen.getByText("Artificial saliva products", {
					selector: ".stacked-nav a",
				})
			).toBeInTheDocument();
		});

		it("should render nav link to parent medical device", () => {
			render(<CMPIPage {...props} />);
			const stackedNav = screen.getByRole("navigation", {
				name: "Artificial saliva products",
			});
			expect(
				within(stackedNav).getByRole("link", {
					name: "Artificial saliva products",
				})
			).toHaveAttribute("href", "/medical-devices/artificial-saliva-products/");
		});

		it.each([
			["AS Saliva Orthana® lozenges", "as-saliva-orthana-lozenges"],
			["AS Saliva Orthana® spray", "as-saliva-orthana-spray"],
			["BioXtra® gel", "bioxtra-gel"],
		])("should render nav link to %s", (name, expectedPath) => {
			render(<CMPIPage {...props} />);
			const stackedNav = screen.getByRole("navigation", {
				name: "Artificial saliva products",
			});
			expect(
				within(stackedNav).getByRole("link", {
					name,
				})
			).toHaveAttribute(
				"href",
				`/medical-devices/artificial-saliva-products/${expectedPath}/`
			);
		});

		it("should highlight current page in stacked nav", () => {
			(useLocation as jest.Mock).mockReturnValue(
				new URL(
					"https://bnf-gatsby-tests.nice.org.uk/medical-devices/artificial-saliva-products/as-saliva-orthana-lozenges/"
				)
			);

			render(<CMPIPage {...props} />);

			const stackedNav = screen.getByRole("navigation", {
				name: "Artificial saliva products",
			});

			expect(
				within(stackedNav).getByRole("link", {
					name: "AS Saliva Orthana® lozenges",
				})
			).toHaveAttribute("aria-current", "true");
		});
	});

	describe("Body", () => {
		describe("Simple pots", () => {
			it.each<
				[
					keyof CMPIPageProps["data"]["bnfClinicalMedicalDeviceInformationGroup"]
				]
			>([
				["deviceDescription"],
				["allergyAndCrossSensitivity"],
				["treatmentCessation"],
				["prescribingAndDispensingInformation"],
				["patientAndCarerAdvice"],
				["professionSpecificInformation"],
				["complianceStandards"],
			])(
				"should create navigate to section link and associated section when %s is present in the feed",
				(sectionName) => {
					render(
						<CMPIPage
							data={{
								bnfClinicalMedicalDeviceInformationGroup: {
									...props.data.bnfClinicalMedicalDeviceInformationGroup,
									[sectionName]: {
										potName: "Test pot",
										slug: "test-pot",
										content: {
											contentFor: "AS Saliva Orthana® lozenges",
											content: "<p>Some content</p>",
										},
									},
								},
							}}
						/>
					);

					const sectionNavButton = screen.getByRole("button", {
						name: "Show Navigate to section",
					});
					userEvent.click(sectionNavButton);

					expect(
						screen.getByRole("link", { name: "Test pot" })
					).toHaveAttribute("href", "#test-pot");
					expect(
						screen.getByRole("region", { name: "Test pot" })
					).toBeInTheDocument();
					expect(
						screen.getByRole("heading", { level: 2, name: "Test pot" })
					).toBeInTheDocument();
					expect(screen.getByText("Some content")).toBeInTheDocument();
				}
			);
		});

		describe("Indications and dose", () => {
			const indicationsAndDose: CMPIPageProps["data"]["bnfClinicalMedicalDeviceInformationGroup"]["indicationsAndDose"] =
				{
					potName: "Indications and dose",
					slug: "indications-and-dose",
					content: {
						contentFor: "AS Saliva Orthana® lozenges",
						doseAdjustments: null,
						doseEquivalence: null,
						extremesOfBodyWeight: null,
						indicationAndDoseGroups: [
							{
								routesAndPatientGroups: [
									{
										routeOfAdministration: "By mouth",
										patientGroups: [
											{
												patientGroup: "adult",
												detailedPatientGroup: "Adult",
												doseStatement:
													"1 lozenge as required, allow to dissolve slowly in the mouth.",
											},
										],
									},
								],
								therapeuticIndications: [
									{
										sctIndication: null,
										sctTherapeuticIntent: null,
										indication:
											"Dry mouth as a result of sicca syndrome (ACBS)",
									},
								],
							},
						],
						pharmacokinetics: null,
						potency: null,
					},
				};

			const indicationsAndDoseProps: CMPIPageProps = {
				data: {
					bnfClinicalMedicalDeviceInformationGroup: {
						...props.data.bnfClinicalMedicalDeviceInformationGroup,
						indicationsAndDose,
					},
				},
			};

			it("should render indications and dose section link and associated section", () => {
				render(<CMPIPage {...indicationsAndDoseProps} />);

				const sectionNavButton = screen.getByRole("button", {
					name: "Show Navigate to section",
				});
				userEvent.click(sectionNavButton);

				expect(
					screen.getByRole("link", { name: indicationsAndDose.potName })
				).toHaveAttribute("href", `#${indicationsAndDose.slug}`);
				expect(
					screen.getByRole("region", { name: indicationsAndDose.potName })
				).toBeInTheDocument();
				expect(
					screen.getByRole("heading", {
						level: 2,
						name: indicationsAndDose.potName,
					})
				).toBeInTheDocument();
			});

			it("should match snapshot for indications and dose section", () => {
				render(<CMPIPage {...indicationsAndDoseProps} />);
				expect(
					screen.getByRole("region", { name: indicationsAndDose.potName })
				).toMatchSnapshot();
			});
		});

		describe("Preparations", () => {
			const preparations: CMPIPageProps["data"]["bnfClinicalMedicalDeviceInformationGroup"]["preparations"] =
					[
						{
							name: "AS Saliva Orthana lozenges",
							manufacturer: "CCMed Ltd",
							ampId: "3804011000001101",
							blackTriangle: false,
							sugarFree: false,
							activeIngredients: [],
							controlledDrugSchedule: null,
							packs: [
								{
									amppId: "3804211000001106",
									size: "30",
									unit: "lozenge",
									nhsIndicativePrice: "£3.04",
									legalCategory: "Not Applicable",
									hospitalOnly: false,
									drugTariff: "Part VIIIA Category C",
									drugTariffPrice: "£3.04",
									colour: null,
								},
							],
						},
					],
				prepsProps: CMPIPageProps = {
					data: {
						bnfClinicalMedicalDeviceInformationGroup: {
							...props.data.bnfClinicalMedicalDeviceInformationGroup,
							preparations,
						},
					},
				};

			it("should render section with accessible name for preps list", () => {
				render(<CMPIPage {...prepsProps} />);
				expect(
					screen.getByRole("region", { name: "Medical device types" })
				).toBeInTheDocument();
			});

			it("should render heading 2 for preps list", () => {
				render(<CMPIPage {...prepsProps} />);
				expect(
					screen.getByRole("heading", {
						level: 2,
						name: "Medical device types",
					})
				).toBeInTheDocument();
			});

			it("should match snapshot for preps list", () => {
				render(<CMPIPage {...prepsProps} />);
				expect(
					screen.getByRole("region", { name: "Medical device types" })
				).toMatchSnapshot();
			});
		});
	});
});
