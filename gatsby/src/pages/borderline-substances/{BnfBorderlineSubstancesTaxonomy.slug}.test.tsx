import { render, waitFor, screen, within } from "@testing-library/react";
import { useStaticQuery } from "gatsby";

import { mockBorderlineSubstancesPagesQueryData } from "@/hooks/useBorderlineSubstancesPages.test";

import BorderlineSubstancesSectionPage, {
	query,
	type BorderlineSubstancesSectionPageProps,
} from "./{BnfBorderlineSubstancesTaxonomy.slug}";

const twoLevelProps: BorderlineSubstancesSectionPageProps = {
	data: {
		bnfBorderlineSubstancesTaxonomy: {
			slug: "root-taxonomy",
			title: "Root taxonomy",
			rootTaxonomy: {
				childTaxonomies: [
					{
						title: "Taxonomy 1",
						slug: "taxonomy-1",
						childTaxonomies: [
							{ title: "Sub taxonomy 1", slug: "sub-taxonomy-1" },
							{ title: "Sub taxonomy 2", slug: "sub-taxonomy-2" },
						],
					},
					{
						title: "Taxonomy 2",
						slug: "taxonomy-2",
						childTaxonomies: [],
					},
				],
			},
		},
	},
};

const singleLevelProps: BorderlineSubstancesSectionPageProps = {
	data: {
		bnfBorderlineSubstancesTaxonomy: {
			slug: "root-taxonomy",
			title: "Root taxonomy",
			rootTaxonomy: {
				childTaxonomies: [
					{
						title: "Taxonomy 1",
						slug: "taxonomy-1",
						childTaxonomies: [],
					},
					{
						title: "Taxonomy 2",
						slug: "taxonomy-2",
						childTaxonomies: [],
					},
				],
			},
		},
	},
};

describe("BorderlineSubstancesSectionPage", () => {
	beforeEach(() => {
		(useStaticQuery as jest.Mock).mockReturnValue(
			mockBorderlineSubstancesPagesQueryData
		);
	});

	it("should match snapshot for graphql query", () => {
		expect(query).toMatchSnapshot();
	});

	describe("SEO", () => {
		it("should set page title from treatment summary title", async () => {
			render(<BorderlineSubstancesSectionPage {...twoLevelProps} />);

			await waitFor(() => {
				expect(document.title).toStartWith("Root taxonomy |");
			});
		});

		it("should render meta description", async () => {
			render(<BorderlineSubstancesSectionPage {...twoLevelProps} />);

			await waitFor(() => {
				expect(
					document
						// eslint-disable-next-line testing-library/no-node-access
						.querySelector("meta[name='description']")
				).toHaveAttribute("content", "Browse borderline substances, by type.");
			});
		});
	});

	describe("Page header", () => {
		it("should add content start skip link target id to page header", () => {
			render(<BorderlineSubstancesSectionPage {...twoLevelProps} />);
			const heading1 = screen.getByRole("heading", {
				level: 1,
			});
			// eslint-disable-next-line testing-library/no-node-access
			expect(heading1.parentElement).toHaveAttribute("id", "content-start");
		});

		it("should render heading 1 with current page title", () => {
			render(<BorderlineSubstancesSectionPage {...twoLevelProps} />);
			const heading1 = screen.getByRole("heading", {
				level: 1,
			});
			expect(heading1).toHaveTextContent("Root taxonomy");
		});
	});

	describe("Breadcrumbs", () => {
		it.each([
			["NICE", "https://www.nice.org.uk/"],
			["BNF", "/"],
			["Borderline Substances", "/borderline-substances/"],
		])(
			"should render default '(%s)' breadcrumb",
			(breadcrumbText, expectedHref) => {
				render(<BorderlineSubstancesSectionPage {...twoLevelProps} />);

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
			render(<BorderlineSubstancesSectionPage {...twoLevelProps} />);

			const breadcrumbNav = screen.getByRole("navigation", {
				name: "Breadcrumbs",
			});
			const currentPageCrumb = within(breadcrumbNav).getByText("Root taxonomy");
			expect(currentPageCrumb).toBeInTheDocument();
			expect(currentPageCrumb.tagName).toBe("SPAN");
		});
	});

	describe("body", () => {
		it("should render links to records for taxonomies with one level of children", () => {
			render(<BorderlineSubstancesSectionPage {...singleLevelProps} />);
			expect(screen.getByRole("link", { name: "Taxonomy 1" })).toHaveAttribute(
				"href",
				"taxonomy-1"
			);
			expect(screen.getByRole("link", { name: "Taxonomy 2" })).toHaveAttribute(
				"href",
				"taxonomy-2"
			);
		});

		it("should render headers for the first level children when there are more than one level of children", () => {
			render(<BorderlineSubstancesSectionPage {...twoLevelProps} />);
			const heading2 = screen.getAllByRole("heading", {
				level: 2,
			});
			expect(heading2.length).toEqual(2);
			expect(heading2[0]).toHaveTextContent("Taxonomy 1");
		});
	});
});
