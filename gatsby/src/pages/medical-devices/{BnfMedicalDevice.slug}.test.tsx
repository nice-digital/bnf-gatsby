import { useLocation } from "@reach/router";
import { render, waitFor, screen, within } from "@testing-library/react";
import { useStaticQuery } from "gatsby";

import { mockQueryData } from "@/hooks/useMedicalDevicePages.test";

import MedicalDevicePage, {
	query,
	type MedicalDevicePageProps,
} from "./{BnfMedicalDevice.slug}";

const props: MedicalDevicePageProps = {
	data: {
		bnfMedicalDevice: {
			title: "Artificial saliva products",
			slug: "artificial-saliva-products",
			medicalDeviceTypes: [
				{
					title: "Artificial saliva products",
					slug: "artificial-saliva-products",
					hasPreps: false,
					clinicalMedicalDeviceInformationGroups: [
						{
							title: "AS Saliva Orthana® lozenges",
							slug: "as-saliva-orthana-lozenges",
						},
					],
				},
			],
		},
	},
};

describe("MedicalDevicePage", () => {
	beforeEach(() => {
		(useLocation as jest.Mock).mockReturnValue(
			new URL(
				"https://bnf-gatsby-tests.nice.org.uk/medical-devices/artificial-saliva-products/"
			)
		);

		(useStaticQuery as jest.Mock).mockReturnValue(mockQueryData);
	});

	it("should match snapshot for graphql query", () => {
		expect(query).toMatchSnapshot();
	});

	describe("SEO", () => {
		it("should set page title from medical type title", async () => {
			render(<MedicalDevicePage {...props} />);
			await waitFor(() => {
				expect(document.title).toStartWith(
					"Artificial saliva products | Medical devices | "
				);
			});
		});
	});

	describe("Breadcrumbs", () => {
		it.each([
			["NICE", "https://www.nice.org.uk/"],
			["BNF", "/"],
			["Medical devices", "/medical-devices/"],
		])(
			"should render default '(%s)' breadcrumb",
			(breadcrumbText, expectedHref) => {
				render(<MedicalDevicePage {...props} />);

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
			render(<MedicalDevicePage {...props} />);

			const breadcrumbNav = screen.getByRole("navigation", {
				name: "Breadcrumbs",
			});
			const currentPageCrumb = within(breadcrumbNav).getByText(
				"Artificial saliva products"
			);
			expect(currentPageCrumb).toBeInTheDocument();
			expect(currentPageCrumb.tagName).toBe("SPAN");
		});
	});

	describe("Page header", () => {
		it("should add content start skip link target id to page header", () => {
			render(<MedicalDevicePage {...props} />);
			const heading1 = screen.getByRole("heading", {
				level: 1,
			});
			// eslint-disable-next-line testing-library/no-node-access
			expect(heading1.parentElement).toHaveAttribute("id", "content-start");
		});

		it("should render heading 1 with current page title", () => {
			render(<MedicalDevicePage {...props} />);
			const heading1 = screen.getByRole("heading", {
				level: 1,
			});
			expect(heading1).toHaveTextContent("Artificial saliva products");
		});
	});

	describe("Page body", () => {
		it.todo("should render list of links to each CMPI");
		it.todo(
			"should render list of links to each medical device type with preps"
		);
	});
});
