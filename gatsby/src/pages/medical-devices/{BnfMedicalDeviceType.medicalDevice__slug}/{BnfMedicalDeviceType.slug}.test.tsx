import { useLocation } from "@reach/router";
import { render, waitFor, screen, within } from "@testing-library/react";

import MedicalDeviceTypePage, {
	MedicalDeviceTypePageProps,
} from "./{BnfMedicalDeviceType.slug}";

const props: MedicalDeviceTypePageProps = {
	data: {
		bnfMedicalDeviceType: {
			title: "Film gloves",
			slug: "film-gloves",
			medicalDevice: {
				title: "Gloves",
				slug: "gloves",
				medicalDeviceTypes: [
					{
						title: "Nitrile gloves",
						slug: "nitrile-gloves",
					},
					{
						title: "Film gloves",
						slug: "film-gloves",
					},
					{
						title: "Polythene gloves",
						slug: "polythene-gloves",
					},
				],
			},
			preparations: [
				{
					name: "Dispos-A-Gloves non-sterile large",
					manufacturer: "Ansell Medical Ltd",
					activeIngredients: [],
					ampId: "123",
					blackTriangle: false,
					controlledDrugSchedule: null,
					packs: [],
					sugarFree: false,
				},
				{
					name: "Dispos-A-Gloves non-sterile medium",
					manufacturer: "Ansell Medical Ltd",
					activeIngredients: [],
					ampId: "123",
					blackTriangle: false,
					controlledDrugSchedule: null,
					packs: [],
					sugarFree: false,
				},
			],
		},
	},
};

describe("MedicalDeviceTypePage", () => {
	describe("SEO", () => {
		it("should set page title from medical type title", async () => {
			render(<MedicalDeviceTypePage {...props} />);
			await waitFor(() => {
				expect(document.title).toStartWith(
					"Film gloves | Gloves | Medical devices | "
				);
			});
		});

		it("should set meta description", async () => {
			render(<MedicalDeviceTypePage {...props} />);
			await waitFor(() => {
				expect(
					// eslint-disable-next-line testing-library/no-node-access
					document.querySelector("meta[name=description]")
				).toHaveAttribute(
					"content",
					"This medical device type describes the options that are currently recommended for Film gloves."
				);
			});
		});
	});

	describe("Breadcrumbs", () => {
		it.each([
			["NICE", "https://www.nice.org.uk/"],
			["BNF", "/"],
			["Medical devices", "/medical-devices/"],
			["Gloves", "/medical-devices/gloves/"],
		])(
			"should render default '(%s)' breadcrumb",
			(breadcrumbText, expectedHref) => {
				render(<MedicalDeviceTypePage {...props} />);

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
			render(<MedicalDeviceTypePage {...props} />);

			const breadcrumbNav = screen.getByRole("navigation", {
				name: "Breadcrumbs",
			});
			const currentPageCrumb = within(breadcrumbNav).getByText("Film gloves", {
				selector: "span",
			});
			expect(currentPageCrumb).toBeInTheDocument();
		});
	});

	describe("Page header", () => {
		it("should add content start skip link target id to page header", () => {
			render(<MedicalDeviceTypePage {...props} />);
			const heading1 = screen.getByRole("heading", {
				level: 1,
			});
			// eslint-disable-next-line testing-library/no-node-access
			expect(heading1.parentElement).toHaveAttribute("id", "content-start");
		});

		it("should render heading 1 with current page title", () => {
			render(<MedicalDeviceTypePage {...props} />);
			const heading1 = screen.getByRole("heading", {
				level: 1,
			});
			expect(heading1).toHaveTextContent("Film gloves");
		});
	});

	describe("Body", () => {
		describe("Stacked Nav", () => {
			it("should not render stacked nav when there are no sibling device types", () => {
				render(
					<MedicalDeviceTypePage
						data={{
							bnfMedicalDeviceType: {
								...props.data.bnfMedicalDeviceType,
								medicalDevice: {
									...props.data.bnfMedicalDeviceType.medicalDevice,
									medicalDeviceTypes: [
										props.data.bnfMedicalDeviceType.medicalDevice,
									],
								},
							},
						}}
					/>
				);

				expect(
					screen.queryByText("Gloves", { selector: ".stacked-nav a" })
				).toBeNull();
			});

			it("should render stacked nav when there are sibling device types", () => {
				render(<MedicalDeviceTypePage {...props} />);
				expect(
					screen.getByText("Gloves", { selector: ".stacked-nav a" })
				).toBeInTheDocument();
			});

			it("should render nav link to parent medical device", () => {
				render(<MedicalDeviceTypePage {...props} />);
				expect(
					screen.getByText("Gloves", { selector: ".stacked-nav a" })
				).toHaveAttribute("href", "/medical-devices/gloves/");
			});

			it("should render nav link to each sibling device types", () => {
				render(<MedicalDeviceTypePage {...props} />);
				expect(
					screen.getByRole("link", { name: "Nitrile gloves" })
				).toHaveAttribute("href", "/medical-devices/gloves/nitrile-gloves/");
				expect(
					screen.getByRole("link", { name: "Film gloves" })
				).toHaveAttribute("href", "/medical-devices/gloves/film-gloves/");
				expect(
					screen.getByRole("link", { name: "Polythene gloves" })
				).toHaveAttribute("href", "/medical-devices/gloves/polythene-gloves/");
			});

			it("should order stacked nav links alphabetically", () => {
				render(<MedicalDeviceTypePage {...props} />);

				const stackedNav = screen.getByRole("navigation", {
					name: "Gloves pages",
				});

				expect(
					within(stackedNav)
						.getAllByRole("link")
						.map((l) => l.textContent)
				).toStrictEqual([
					// Root link
					"Gloves",
					// Sub links
					"Film gloves",
					"Nitrile gloves",
					"Polythene gloves",
				]);
			});

			it("should highlight current page in stacked nav", () => {
				(useLocation as jest.Mock).mockReturnValue(
					new URL(
						"https://bnf-gatsby-tests.nice.org.uk/medical-devices/gloves/film-gloves/"
					)
				);

				render(<MedicalDeviceTypePage {...props} />);

				const stackedNav = screen.getByRole("navigation", {
					name: "Gloves pages",
				});

				expect(
					within(stackedNav).getByRole("link", { name: "Film gloves" })
				).toHaveAttribute("aria-current", "true");
			});
		});

		describe("Prep list section", () => {
			it("should render section with accessible name for preps list", () => {
				render(<MedicalDeviceTypePage {...props} />);
				expect(
					screen.getByRole("region", { name: "Medical device types" })
				).toBeInTheDocument();
			});

			it("should render heading 2 for medical device type preps", () => {
				render(<MedicalDeviceTypePage {...props} />);
				expect(
					screen.getByRole("heading", {
						level: 2,
						name: "Medical device types",
					})
				).toBeInTheDocument();
			});

			it("should render list of preparations", () => {
				render(<MedicalDeviceTypePage {...props} />);
				const prepsSection = screen.getByRole("region", {
					name: "Medical device types",
				});
				expect(within(prepsSection).getByRole("list").childNodes).toHaveLength(
					2
				);
			});

			it("should render each prep", () => {
				render(<MedicalDeviceTypePage {...props} />);

				expect(
					screen.getByText("Dispos-A-Gloves non-sterile large")
				).toBeInTheDocument();
				expect(
					screen.getByText("Dispos-A-Gloves non-sterile medium")
				).toBeInTheDocument();
			});
		});
	});
});
