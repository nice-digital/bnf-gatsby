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
						{
							title: "AS Saliva Orthana® spray",
							slug: "as-saliva-orthana-spray",
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
		it("should set page title from medical device type title", async () => {
			render(<MedicalDevicePage {...props} />);
			await waitFor(() => {
				expect(document.title).toStartWith(
					"Artificial saliva products | Medical devices | "
				);
			});
		});

		it("should set meta description", async () => {
			render(<MedicalDevicePage {...props} />);
			await waitFor(() => {
				expect(
					// eslint-disable-next-line testing-library/no-node-access
					document.querySelector("meta[name=description]")
				).toHaveAttribute(
					"content",
					"This medical devices topic describes the options that are currently recommended for artificial saliva products."
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
		it("should render CMPIs region with accessible name", () => {
			render(<MedicalDevicePage {...props} />);

			expect(
				screen.getByRole("region", {
					name: "Artificial saliva products",
				})
			).toBeInTheDocument();
		});

		it("should render list of CMPIs with accessible name", () => {
			render(<MedicalDevicePage {...props} />);

			expect(
				screen.getByRole("list", {
					name: "Products within Artificial saliva products",
				})
			).toBeInTheDocument();
		});

		it("should render list of links to each CMPI", () => {
			render(<MedicalDevicePage {...props} />);

			const list = screen.getByRole("list", {
				name: "Products within Artificial saliva products",
			});

			expect(within(list).getAllByRole("listitem")).toHaveLength(2);
			expect(within(list).getAllByRole("link")).toHaveLength(2);
		});

		it("should render CMPI link with correct href and text", () => {
			render(<MedicalDevicePage {...props} />);

			expect(
				screen.getByRole("link", { name: "AS Saliva Orthana® lozenges" })
			).toHaveAttribute(
				"href",
				"/medical-devices/artificial-saliva-products/as-saliva-orthana-lozenges/"
			);
		});

		it("should render list of links to each medical device type with preps", () => {
			render(
				<MedicalDevicePage
					data={{
						bnfMedicalDevice: {
							title: "Gloves",
							slug: "gloves",
							medicalDeviceTypes: [
								{
									title: "Film gloves",
									slug: "film-gloves",
									clinicalMedicalDeviceInformationGroups: [],
									hasPreps: true,
								},
								{
									title: "Nitrile gloves",
									slug: "nitrile-gloves",
									clinicalMedicalDeviceInformationGroups: [],
									hasPreps: true,
								},
							],
						},
					}}
				/>
			);

			const list = screen.getByRole("list", {
				name: "Medical device types for Gloves",
			});

			expect(within(list).getAllByRole("listitem")).toHaveLength(2);
			expect(within(list).getAllByRole("link")).toHaveLength(2);

			expect(screen.getByRole("link", { name: "Film gloves" })).toHaveAttribute(
				"href",
				"/medical-devices/gloves/film-gloves/"
			);
		});
	});
});
