import { render, waitFor, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import BorderlineSubstancesProductGroupPage, {
	type BorderlineSubstancesProductGroupPageProps,
	query,
} from "./{BnfBorderlineSubstancesTaxonomyProductGroup.taxonomy__slug}";

const minimumTaxonomy: BorderlineSubstancesProductGroupPageProps["data"]["bnfBorderlineSubstancesTaxonomyProductGroup"]["taxonomy"] =
	{
		title: "Bread",
		slug: "bread",
		rootTaxonomy: {
			title: "Foods for special diets",
			slug: "foods-for-special-diets",
		},
		parentTaxonomy: {
			title: "Gluten-free foods",
			slug: "gluten-free-foods",
			childTaxonomies: [
				// Only need 2 here to test rendering of the "Show more" link
				{
					title: "Bread",
					slug: "bread",
				},
				{
					title: "Cereals",
					slug: "cereals",
				},
			],
		},
		substances: [
			{
				id: "PHP1234",
				title: "Top-level substance",
				slug: "top-level-substance",
				introductionNote: null,
				presentations: [],
			},
		],
		childTaxonomies: [
			{
				title: "Loaves",
				slug: "loaves",
				childTaxonomies: [],
				substances: [
					{
						id: "PHP103759",
						title: "Barkat® Loaves",
						slug: "barkat-loaves",
						introductionNote: null,
						presentations: [],
					},
					{
						id: "PHP103763",
						title: "Glutafin® Loaves",
						slug: "glutafin-loaves",
						introductionNote: null,
						presentations: [],
					},
				],
			},
			{
				title: "Baguettes, buns and rolls",
				slug: "baguettes-buns-and-rolls",
				childTaxonomies: [],
				substances: [
					{
						id: "PHP103759",
						title: "Barkat® Baguettes, buns and rolls",
						slug: "barkat-baguettes-buns-and-rolls",
						introductionNote: null,
						presentations: [],
					},
					{
						id: "PHP103774",
						title: "Glutafin® Baguettes and rolls",
						slug: "glutafin-baguettes-buns-and-rolls",
						introductionNote: null,
						presentations: [],
					},
				],
			},
		],
	};

const minimumProps: BorderlineSubstancesProductGroupPageProps = {
	data: {
		bnfBorderlineSubstancesTaxonomyProductGroup: {
			taxonomy: minimumTaxonomy,
		},
	},
};

describe("BorderlineSubstancesProductGroupPage", () => {
	it("should match snapshot for graphql query", () => {
		expect(query).toMatchSnapshot();
	});

	describe("SEO", () => {
		beforeEach(() => {
			document.title = "";
		});

		it("should set page title from taxonomy, parent and root titles", async () => {
			render(<BorderlineSubstancesProductGroupPage {...minimumProps} />);

			await waitFor(() => {
				expect(document.title).toStartWith(
					"Bread | Gluten-free foods | Foods for special diets | Borderline substances | "
				);
			});
		});
	});

	describe("Page header", () => {
		it("should add content start skip link target id to page header", () => {
			render(<BorderlineSubstancesProductGroupPage {...minimumProps} />);
			const heading1 = screen.getByRole("heading", {
				level: 1,
			});
			// eslint-disable-next-line testing-library/no-node-access
			expect(heading1.parentElement).toHaveAttribute("id", "content-start");
		});

		it("should render heading 1 with current page title", () => {
			render(<BorderlineSubstancesProductGroupPage {...minimumProps} />);
			const heading1 = screen.getByRole("heading", {
				level: 1,
			});
			expect(heading1).toHaveTextContent("Gluten-free foods: Bread");
		});

		it("should render link to view other products in the root taxonomy when there are multiple siblings", () => {
			render(<BorderlineSubstancesProductGroupPage {...minimumProps} />);
			expect(
				screen.getByRole("link", {
					name: "View other foods for special diets",
				})
			).toHaveAttribute(
				"href",
				"/borderline-substances/foods-for-special-diets/"
			);
		});

		it("should not render link to view other products when there are no siblings", () => {
			render(
				<BorderlineSubstancesProductGroupPage
					data={{
						bnfBorderlineSubstancesTaxonomyProductGroup: {
							taxonomy: {
								...minimumTaxonomy,
								parentTaxonomy: {
									...minimumTaxonomy.parentTaxonomy,
									childTaxonomies: [],
								},
							},
						},
					}}
				/>
			);
			expect(
				screen.queryByRole("link", {
					name: "View other foods for special diets",
				})
			).toBeNull();
		});
	});

	describe("Breadcrumbs", () => {
		it.each([
			["NICE", "https://www.nice.org.uk/"],
			["BNF", "/"],
			["Borderline substances", "/borderline-substances/"],
			[
				"Foods for special diets",
				"/borderline-substances/foods-for-special-diets/",
			],
		])(
			"should render default '(%s)' breadcrumb",
			(breadcrumbText, expectedHref) => {
				render(<BorderlineSubstancesProductGroupPage {...minimumProps} />);

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
			render(<BorderlineSubstancesProductGroupPage {...minimumProps} />);

			const breadcrumbNav = screen.getByRole("navigation", {
				name: "Breadcrumbs",
			});
			const currentPageCrumb = within(breadcrumbNav).getByText("Bread");
			expect(currentPageCrumb).toBeInTheDocument();
			expect(currentPageCrumb.tagName).toBe("SPAN");
		});
	});

	describe("Body", () => {
		it("should render navigate to section with link to each substance", () => {
			render(<BorderlineSubstancesProductGroupPage {...minimumProps} />);

			const sectionNavButton = screen.getByRole("button", {
				name: "Show Navigate to section",
			});
			userEvent.click(sectionNavButton);

			const navigateToSection = screen.getByRole("navigation", {
				name: "Navigate to section",
			});
			expect(
				within(navigateToSection)
					.getAllByRole("link")
					.map((n) => n.textContent)
			).toStrictEqual([
				"Top-level substance",
				"Barkat® Loaves",
				"Glutafin® Loaves",
				"Barkat® Baguettes, buns and rolls",
				"Glutafin® Baguettes and rolls",
			]);
		});

		it("should render single substance without accordion", () => {
			render(
				<BorderlineSubstancesProductGroupPage
					data={{
						bnfBorderlineSubstancesTaxonomyProductGroup: {
							taxonomy: {
								...minimumTaxonomy,
								childTaxonomies: [],
							},
						},
					}}
				/>
			);
			expect(
				screen.queryByRole("list", {
					name: "Substances within Bread",
				})
			).toBeNull();
			expect(
				screen.queryByRole("button", {
					name: /Show all bread/,
				})
			).toBeNull();
		});

		it("should render show all accordions toggle button when multiple products", () => {
			render(<BorderlineSubstancesProductGroupPage {...minimumProps} />);

			expect(
				screen.getByRole("button", {
					name: "Show all bread (5)",
				})
			).toBeInTheDocument();
		});

		it("should render list of substances with accessible name when multiple products", () => {
			render(<BorderlineSubstancesProductGroupPage {...minimumProps} />);

			expect(
				screen.getByRole("list", {
					name: "Substances within Bread",
				})
			).toBeInTheDocument();
		});

		it("should render each substance", () => {
			render(<BorderlineSubstancesProductGroupPage {...minimumProps} />);

			const substanceList = screen.getByRole("list", {
				name: "Substances within Bread",
			});

			expect(within(substanceList).getAllByRole("group")).toHaveLength(5);
		});

		it("should match snapshot", () => {
			const { container } = render(
				<BorderlineSubstancesProductGroupPage {...minimumProps} />
			);
			expect(container).toMatchSnapshot();
		});
	});
});
