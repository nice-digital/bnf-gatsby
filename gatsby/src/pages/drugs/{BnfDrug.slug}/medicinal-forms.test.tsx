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
		medicinalForms: [],
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

		it.todo("Meta description");
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
});
