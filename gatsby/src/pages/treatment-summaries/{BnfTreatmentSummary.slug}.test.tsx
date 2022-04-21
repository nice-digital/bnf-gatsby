import { render, waitFor, screen, within } from "@testing-library/react";

import TreatmentSummaryPage, {
	query,
	type TreatmentSummaryPageProps,
} from "./{BnfTreatmentSummary.slug}";

const treatmentSummary: TreatmentSummaryPageProps["data"]["bnfTreatmentSummary"] =
	{
		title: "Acne",
		relatedDrugs: [],
		relatedTreatmentSummaries: [],
		sections: [],
	};

const dataProp: TreatmentSummaryPageProps["data"] = {
	bnfTreatmentSummary: treatmentSummary,
};

describe("TreatmentSummaryPage", () => {
	it("should match snapshot for graphql query", () => {
		expect(query).toMatchSnapshot();
	});

	describe("SEO", () => {
		it("should set page title from treatment summary title", async () => {
			render(<TreatmentSummaryPage data={dataProp} />);

			await waitFor(() => {
				expect(document.title).toStartWith("Acne | Treatment summaries |");
			});
		});

		it("should set templated meta description", async () => {
			render(<TreatmentSummaryPage data={dataProp} />);

			await waitFor(() => {
				expect(
					document
						// eslint-disable-next-line testing-library/no-node-access
						.querySelector("meta[name='description']")
				).toHaveAttribute(
					"content",
					"This treatment summary topic describes Acne"
				);
			});
		});
	});

	describe("Page header", () => {
		it("should add content start skip link target id to page header", () => {
			render(<TreatmentSummaryPage data={dataProp} />);
			const heading1 = screen.getByRole("heading", {
				level: 1,
			});
			// eslint-disable-next-line testing-library/no-node-access
			expect(heading1.parentElement).toHaveAttribute("id", "content-start");
		});

		it("should render heading 1 with current page title", () => {
			render(<TreatmentSummaryPage data={dataProp} />);
			const heading1 = screen.getByRole("heading", {
				level: 1,
			});
			expect(heading1).toHaveTextContent("Acne");
		});
	});

	describe("Breadcrumbs", () => {
		it.each([
			["NICE", "https://www.nice.org.uk/"],
			["BNF", "/"],
			["Treatment summaries", "/treatment-summaries/"],
		])(
			"should render default '(%s)' breadcrumb",
			(breadcrumbText, expectedHref) => {
				render(<TreatmentSummaryPage data={dataProp} />);

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
			render(<TreatmentSummaryPage data={dataProp} />);

			const breadcrumbNav = screen.getByRole("navigation", {
				name: "Breadcrumbs",
			});
			const currentPageCrumb = within(breadcrumbNav).getByText("Acne");
			expect(currentPageCrumb).toBeInTheDocument();
			expect(currentPageCrumb.tagName).toBe("SPAN");
		});
	});

	describe("body", () => {
		describe.each([
			["Related drugs", "relatedDrugs", "/drugs/"],
			[
				"Related treatment summaries",
				"relatedTreatmentSummaries",
				"/treatment-summaries/",
			],
		])("%s", (sectionName, propertyName, expectedBasePath) => {
			describe(`No ${sectionName}`, () => {
				it.todo(
					`should not render ${sectionName} hash link when there are no ${sectionName}`
				);

				it.todo(
					`should not render ${sectionName} secttion when there are no ${sectionName}`
				);
			});

			describe(`${sectionName} with content`, () => {
				it.todo("should do something");
			});
		});
	});
});
