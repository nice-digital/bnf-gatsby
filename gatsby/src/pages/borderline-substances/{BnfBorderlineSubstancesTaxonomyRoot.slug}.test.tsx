import { useLocation } from "@reach/router";
import { render, waitFor, screen, within } from "@testing-library/react";
import { useStaticQuery } from "gatsby";

import { mockBorderlineSubstancesPagesQueryData } from "@/hooks/useBorderlineSubstancesPages.test";

import BorderlineSubstancesRootPage, {
	type BorderlineSubstancesRootPageProps,
	query,
} from "./{BnfBorderlineSubstancesTaxonomyRoot.taxonomy__slug}";

const minimumProps: BorderlineSubstancesRootPageProps = {
	data: {
		bnfBorderlineSubstancesTaxonomyRoot: {
			taxonomy: {
				title: "Specialised formulas",
				slug: "specialised-formulas",
				childTaxonomies: [
					{
						title: "Specialised formulas for specific clinical conditions",
						slug: "specialised-formulas-for-specific-clinical-conditions",
						childTaxonomies: [],
					},
				],
			},
		},
	},
};

describe("BorderlineSubstancesRootPage", () => {
	beforeEach(() => {
		// useStaticQuery is used within the left hand menu (BorderlineSubstancesMenu)
		(useStaticQuery as jest.Mock).mockReturnValue(
			mockBorderlineSubstancesPagesQueryData
		);
	});

	it("should match snapshot for graphql query", () => {
		expect(query).toMatchSnapshot();
	});

	describe("SEO", () => {
		beforeEach(() => {
			document.title = "";
		});

		it("should set page title from borderline substance taxonomy title", async () => {
			render(<BorderlineSubstancesRootPage {...minimumProps} />);

			await waitFor(() => {
				expect(document.title).toStartWith(
					"Specialised formulas | Borderline substances | "
				);
			});
		});
	});

	describe("Page header", () => {
		it("should add content start skip link target id to page header", () => {
			render(<BorderlineSubstancesRootPage {...minimumProps} />);
			const pageHeader = screen.getByTestId("page-header");
			expect(pageHeader).toHaveAttribute("id", "content-start");
		});

		it("should render heading 1 with current page title", () => {
			render(<BorderlineSubstancesRootPage {...minimumProps} />);
			const heading1 = screen.getByRole("heading", {
				level: 1,
			});
			expect(heading1).toHaveTextContent("Specialised formulas");
		});
	});

	describe("Breadcrumbs", () => {
		it.each([
			["NICE", "https://www.nice.org.uk/"],
			["BNF", "/"],
			["Borderline substances", "/borderline-substances/"],
		])(
			"should render default '(%s)' breadcrumb",
			(breadcrumbText, expectedHref) => {
				render(<BorderlineSubstancesRootPage {...minimumProps} />);

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
			render(<BorderlineSubstancesRootPage {...minimumProps} />);

			const breadcrumbNav = screen.getByRole("navigation", {
				name: "Breadcrumbs",
			});
			const currentPageCrumb = within(breadcrumbNav).getByText(
				"Specialised formulas"
			);
			expect(currentPageCrumb).toBeInTheDocument();
			expect(currentPageCrumb.tagName).toBe("SPAN");
		});
	});

	describe("Body", () => {
		describe("Single level", () => {
			beforeEach(() => {
				(useLocation as jest.Mock).mockImplementation(
					() =>
						new URL(
							"https://bnf-gatsby-tests.nice.org.uk/borderline-substances/specialised-formulas/"
						)
				);
			});

			it("should not render any heading 2s", () => {
				render(<BorderlineSubstancesRootPage {...minimumProps} />);
				expect(
					screen.queryAllByRole("heading", {
						level: 2,
					})
				).toHaveLength(0);
			});

			it("should render labelled list of sub pages", () => {
				render(<BorderlineSubstancesRootPage {...minimumProps} />);
				expect(
					screen.getByRole("list", {
						name: "Sections within Specialised formulas",
					})
				).toBeInTheDocument();
			});

			it("should render links to sub taxonomy pages", () => {
				render(<BorderlineSubstancesRootPage {...minimumProps} />);
				expect(
					screen.getByRole("link", {
						name: "Specialised formulas for specific clinical conditions",
					})
				).toHaveAttribute(
					"href",
					"/borderline-substances/specialised-formulas/specialised-formulas-for-specific-clinical-conditions/"
				);
			});

			it("should match snapshot", () => {
				const { container } = render(
					<BorderlineSubstancesRootPage {...minimumProps} />
				);
				expect(container).toMatchSnapshot();
			});
		});

		describe("Two levels", () => {
			const props: BorderlineSubstancesRootPageProps = {
				data: {
					bnfBorderlineSubstancesTaxonomyRoot: {
						taxonomy: {
							title: "Foods for special diets",
							slug: "foods-for-special-diets",
							childTaxonomies: [
								{
									title: "Gluten-free foods",
									slug: "gluten-free-foods",
									childTaxonomies: [
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
								{
									title: "Low-protein foods",
									slug: "low-protein-foods",
									childTaxonomies: [
										{
											title: "Bread",
											slug: "bread-2",
											childTaxonomies: [],
										},
										{
											title: "Cake, biscuits, and snacks",
											slug: "cake-biscuits-and-snacks",
											childTaxonomies: [],
										},
									],
								},
							],
						},
					},
				},
			};

			beforeEach(() => {
				(useLocation as jest.Mock).mockImplementation(
					() =>
						new URL(
							"https://bnf-gatsby-tests.nice.org.uk/borderline-substances/foods-for-special-diets/"
						)
				);
			});

			it("should render section with accessible name for each sub taxonomy", () => {
				render(<BorderlineSubstancesRootPage {...props} />);
				expect(
					screen.getByRole("region", {
						name: "Gluten-free foods",
					})
				).toBeInTheDocument();
				expect(
					screen.getByRole("region", {
						name: "Low-protein foods",
					})
				).toBeInTheDocument();
			});

			it("should render heading 2 for each sub taxonomy", () => {
				render(<BorderlineSubstancesRootPage {...props} />);
				expect(
					screen.getByRole("heading", {
						level: 2,
						name: "Gluten-free foods",
					})
				).toBeInTheDocument();
				expect(
					screen.getByRole("heading", {
						level: 2,
						name: "Low-protein foods",
					})
				).toBeInTheDocument();
			});

			it("should render list for each sub taxonomy", () => {
				render(<BorderlineSubstancesRootPage {...props} />);
				expect(
					screen.getByRole("list", {
						name: "Sections within Gluten-free foods",
					})
				).toBeInTheDocument();
				expect(
					screen.getByRole("list", {
						name: "Sections within Low-protein foods",
					})
				).toBeInTheDocument();
			});

			it("should render links to sub taxonomy pages", () => {
				render(<BorderlineSubstancesRootPage {...props} />);
				expect(
					screen.getByRole("link", {
						name: "Cereals",
					})
				).toHaveAttribute(
					"href",
					"/borderline-substances/foods-for-special-diets/cereals/"
				);
			});

			it("should match snapshot", () => {
				const { container } = render(
					<BorderlineSubstancesRootPage {...props} />
				);
				expect(container).toMatchSnapshot();
			});
		});
	});
});
