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
			it.todo("should render stacked nav when there are sibling device types");

			it.todo("should render nav link to parent medical device");
			it.todo("should render nav link to each sibling device types");
			it.todo("should render highlight current page");
		});

		it.todo("should render list of preparations");
	});
});
