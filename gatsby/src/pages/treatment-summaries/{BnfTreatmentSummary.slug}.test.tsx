import { render, waitFor, screen, within } from "@testing-library/react";

import { SlugAndTitle } from "@/utils";

import TreatmentSummaryPage, {
	query,
	type TreatmentSummaryPageProps,
} from "./{BnfTreatmentSummary.slug}";

const treatmentSummary: TreatmentSummaryPageProps["data"]["bnfTreatmentSummary"] =
	{
		title: "Acne",
		relatedDrugs: [],
		relatedTreatmentSummaries: [],
		sections: [
			{
				title: "Section 1",
				slug: "section-1",
				content: "<p>Content for section 1</p>",
			},
			{
				title: "Section 2",
				slug: "section-2",
				content: "<p>Content for section 2</p>",
			},
		],
	};

const minimumProps: TreatmentSummaryPageProps = {
	data: {
		bnfTreatmentSummary: treatmentSummary,
	},
};

describe("TreatmentSummaryPage", () => {
	it("should match snapshot for graphql query", () => {
		expect(query).toMatchSnapshot();
	});

	describe("SEO", () => {
		it("should set page title from treatment summary title", async () => {
			render(<TreatmentSummaryPage {...minimumProps} />);

			await waitFor(() => {
				expect(document.title).toStartWith("Acne | Treatment summaries |");
			});
		});

		it("should set templated meta description", async () => {
			render(<TreatmentSummaryPage {...minimumProps} />);

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
			render(<TreatmentSummaryPage {...minimumProps} />);
			const heading1 = screen.getByRole("heading", {
				level: 1,
			});
			// eslint-disable-next-line testing-library/no-node-access
			expect(heading1.parentElement).toHaveAttribute("id", "content-start");
		});

		it("should render heading 1 with current page title", () => {
			render(<TreatmentSummaryPage {...minimumProps} />);
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
				render(<TreatmentSummaryPage {...minimumProps} />);

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
			render(<TreatmentSummaryPage {...minimumProps} />);

			const breadcrumbNav = screen.getByRole("navigation", {
				name: "Breadcrumbs",
			});
			const currentPageCrumb = within(breadcrumbNav).getByText("Acne");
			expect(currentPageCrumb).toBeInTheDocument();
			expect(currentPageCrumb.tagName).toBe("SPAN");
		});
	});

	describe("body", () => {
		it("should render hash link to each record section", () => {
			render(<TreatmentSummaryPage {...minimumProps} />);
			expect(screen.getByRole("link", { name: "Section 1" })).toHaveAttribute(
				"href",
				"#section-1"
			);
			expect(screen.getByRole("link", { name: "Section 2" })).toHaveAttribute(
				"href",
				"#section-2"
			);
		});

		it("should render section with accessible name for each record section", () => {
			render(<TreatmentSummaryPage {...minimumProps} />);
			expect(
				screen.getByRole("region", { name: "Section 1" })
			).toBeInTheDocument();
			expect(
				screen.getByRole("region", { name: "Section 2" })
			).toBeInTheDocument();
		});

		describe.each([
			["Related drugs", "relatedDrugs" as const, "related-drugs", "drugs"],
			[
				"Related treatment summaries",
				"relatedTreatmentSummaries" as const,
				"related-treatment-summaries",
				"treatment-summaries",
			],
		])("%s", (sectionName, propertyName, expectedId, expectedBasePath) => {
			describe(`No ${sectionName}`, () => {
				it(`should not render ${sectionName} hash link when there are no ${sectionName}`, () => {
					render(<TreatmentSummaryPage {...minimumProps} />);
					expect(screen.queryByRole("link", { name: sectionName })).toBeNull();
				});

				it(`should not render ${sectionName} secttion when there are no ${sectionName}`, () => {
					render(<TreatmentSummaryPage {...minimumProps} />);
					expect(
						screen.queryByRole("region", { name: sectionName })
					).toBeNull();
				});
			});

			describe(`${sectionName} with content`, () => {
				const relatedThings: SlugAndTitle[] = [
					{
						title: "Thing 1",
						slug: "thing-1",
					},
					{
						title: "Thing 2",
						slug: "thing-2",
					},
				];

				const props: TreatmentSummaryPageProps = {
					data: {
						bnfTreatmentSummary: {
							...treatmentSummary,
							[propertyName]: relatedThings,
						},
					},
				};

				it(`should render ${sectionName} hash link`, () => {
					render(<TreatmentSummaryPage {...props} />);

					expect(
						screen.queryByRole("link", { name: sectionName })
					).toHaveAttribute("href", `#${expectedId}`);
				});

				it(`should render ${sectionName} section with accessible name`, () => {
					render(<TreatmentSummaryPage {...props} />);

					expect(
						screen.getByRole("region", { name: sectionName })
					).toBeInTheDocument();
				});

				it(`should render list of ${sectionName} with accessible name`, () => {
					render(<TreatmentSummaryPage {...props} />);

					expect(
						screen.getByRole("list", { name: sectionName })
					).toBeInTheDocument();
				});

				it(`should render list item per related item`, () => {
					render(<TreatmentSummaryPage {...props} />);

					const relatedItemsList = screen.getByRole("list", {
						name: sectionName,
					});

					expect(
						within(relatedItemsList).getAllByRole("listitem")
					).toHaveLength(2);
				});

				it(`should render anchor per related item`, () => {
					render(<TreatmentSummaryPage {...props} />);

					const relatedItemsList = screen.getByRole("list", {
						name: sectionName,
					});

					expect(within(relatedItemsList).getAllByRole("link")).toHaveLength(2);
				});

				it(`should render related item title as link text`, () => {
					render(<TreatmentSummaryPage {...props} />);

					expect(
						screen.getByRole("link", { name: "Thing 1" })
					).toBeInTheDocument();
				});

				it(`should render related item title as link text`, () => {
					render(<TreatmentSummaryPage {...props} />);

					expect(screen.getByRole("link", { name: "Thing 1" })).toHaveAttribute(
						"href",
						`/${expectedBasePath}/thing-1/`
					);
				});
			});
		});
	});
});
