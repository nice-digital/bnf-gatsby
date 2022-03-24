import { within, screen, render, waitFor } from "@testing-library/react";

import MedicinalFormsPage, {
	query,
	type MedicinalFormsPageProps,
} from "./medicinal-forms";

const drug: MedicinalFormsPageProps["data"]["bnfDrug"] = {
	title: "Anti-D (Rh<sub>0</sub>) immunoglobulin",
	slug: "anti-d-rh0-immunoglobulin",
	medicinalForms: {
		initialStatement: "",
		specialOrderManufacturersStatement: "",
		medicinalForms: [
			{
				form: "Tablets",
				slug: "tablets",
				cautionaryAndAdvisoryLabels: [],
				electolytes: null,
				excipients: null,
				preps: [],
				cautionaryAndAdvisoryLabels: [
					{
						label: {
							number: 3,
							description: "<p>Description</p>",
							englishRecommendation: "<p>English recommendation</p>",
							welshRecommendation: "<p>Welsh recommendation</p>",
						},
						additionalInfo: "test info",
					},
					{
						label: {
							number: 5,
							description: "<p>Another description</p>",
							englishRecommendation: "<p>Another English recommendation</p>",
							welshRecommendation: "<p>Another Welsh recommendation</p>",
						},
					},
				],
			},
			{
				form: "Powder",
				slug: "powder",
				cautionaryAndAdvisoryLabels: [],
				electolytes: null,
				excipients: null,
				preps: [],
			},
		],
	},
};

const dataProp: MedicinalFormsPageProps["data"] = {
	bnfDrug: drug,
};

describe("MedicinalFormsPage", () => {
	it("should match snapshot for graphql query", () => {
		expect(query).toMatchSnapshot();
	});

	describe("SEO", () => {
		it("should strip HTML tags for page title", async () => {
			render(<MedicinalFormsPage data={dataProp} />);

			await waitFor(() => {
				expect(document.title).toStartWith(
					"Medicinal forms | Anti-D (Rh0) immunoglobulin | Drugs |"
				);
			});
		});

		it.todo("Meta description (see BNF-1215");
	});

	describe("Breadcrumbs", () => {
		it.each([
			["NICE", "https://www.nice.org.uk/"],
			["BNF", "/"],
			["Drugs", "/drugs/"],
			["Anti-D (Rh0) immunoglobulin", "/drugs/anti-d-rh0-immunoglobulin/"],
		])(
			"should render default '(%s)' breadcrumb",
			(breadcrumbText, expectedHref) => {
				render(<MedicinalFormsPage data={dataProp} />);

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
			render(<MedicinalFormsPage data={dataProp} />);

			const breadcrumbNav = screen.getByRole("navigation", {
				name: "Breadcrumbs",
			});
			const currentPageCrumb =
				within(breadcrumbNav).getByText("Medicinal forms");
			expect(currentPageCrumb).toBeInTheDocument();
			expect(currentPageCrumb.tagName).toBe("SPAN");
		});
	});

	describe("Body", () => {
		it("should create a section and heading for each medicinal form", () => {
			render(<MedicinalFormsPage data={dataProp} />);

			expect(screen.getAllByRole("region")).toHaveLength(2);
			expect(
				screen.getAllByRole("heading", { level: 2, name: /Tablets|Powder/ })
			).toHaveLength(2);
		});

		it("should create a labelled section", () => {
			render(<MedicinalFormsPage data={dataProp} />);

			expect(
				screen.getByRole("region", { name: "Tablets" })
			).toBeInTheDocument();
		});

		it("should show cautionary labels when they have been supplied", () => {
			render(<MedicinalFormsPage data={dataProp} />);

			const labelAccordion = screen.getByRole("group");
			expect(labelAccordion).toHaveClass("labelAccordion");

			const labelList = within(labelAccordion).getByRole("list");
			const numberOfLabels =
				dataProp.bnfDrug.medicinalForms.medicinalForms[0]
					.cautionaryAndAdvisoryLabels?.length || -1;
			// eslint-disable-next-line testing-library/no-node-access
			expect(labelList.children).toHaveLength(numberOfLabels);
		});
	});
});
