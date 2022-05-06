import { render, waitFor, screen, within } from "@testing-library/react";
import { useStaticQuery } from "gatsby";

import { mockBorderlineSubstancesPagesQueryData } from "@/hooks/useBorderlineSubstancesPages.test";

import BorderlineSubstancesSectionPage, {
	query,
	type BorderlineSubstancesSectionPageProps,
} from "./{BnfBorderlineSubstancesTaxonomy.slug}";

const isRootTwoLevelProps: BorderlineSubstancesSectionPageProps = {
	data: {
		bnfBorderlineSubstancesTaxonomy: {
			slug: "root-taxonomy",
			title: "Root taxonomy",
			rootTaxonomy: {
				slug: "root-taxonomy",
				title: "Root taxonomy",
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
					},
				],
			},
		},
	},
};

const isRootSingleLevelProps: BorderlineSubstancesSectionPageProps = {
	data: {
		bnfBorderlineSubstancesTaxonomy: {
			slug: "root-taxonomy",
			title: "Root taxonomy",
			rootTaxonomy: {
				slug: "root-taxonomy",
				title: "Root taxonomy",
				childTaxonomies: [
					{
						title: "Taxonomy 1",
						slug: "taxonomy-1",
					},
					{
						title: "Taxonomy 2",
						slug: "taxonomy-2",
					},
				],
			},
		},
	},
};

const isNotRootProps: BorderlineSubstancesSectionPageProps = {
	data: {
		bnfBorderlineSubstancesTaxonomy: {
			slug: "taxonomy-1",
			title: "Taxonomy 1",
			rootTaxonomy: {
				slug: "root-taxonomy",
				title: "Root taxonomy",
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
			substances: [
				{
					title: "Fresubin® 1500 Complete",
					presentations: [
						{
							acbs: [
								"<p><b>Standard ACBS indications:</b> Disease-related malnutrition, intractable malabsorption, pre-operative preparation of malnourished patients, dysphagia, proven inflammatory bowel disease, following total gastrectomy, short-bowel syndrome, bowel fistula except bowel fistula and pre-operative preparation of malnourished patients.</p>",
							],
							carbohydrateGrams: "13",
							energyKCal: "100",
							energyKj: "420",
							fatGrams: "3.4",
							fibreGrams: "1.5",
							fibreConstituents: null,
							formulation: "Liquid (tube feed) per 100 mL",
							presentationNote: null,
							proteinGrams: "3.8",
							fatConstituents: [],
							carbohydrateConstituents: ["(sugars 0.9 g)"],
							proteinConstituents: ["milk, soya proteins"],
							borderlineSubstancePreps: [
								{
									manufacturer: "Fresenius Kabi Ltd",
									name: "Fresubin 1500 Complete liquid",
									packs: [
										{
											unit: "litre",
											size: "1.5",
											nhsIndicativePrice: "£15.32",
											legalCategory: "Not Applicable",
											hospitalOnly: false,
											drugTariffPrice: null,
											drugTariff: null,
											colour: null,
											amppId: "16052511000001104",
										},
									],
									ampId: "16052411000001103",
									blackTriangle: false,
									controlledDrugSchedule: null,
									activeIngredients: [],
									sugarFree: null,
								},
							],
							rxAdvice: null,
							specialCharacteristics: [
								"Contains fish oil, residual lactose, soya. Gluten-free",
							],
						},
					],
					introductionNote:
						"<p>Not suitable for use in child under 3 years; not recommended for child under 6 years</p>",
					id: "PHP103613",
				},
				{
					title: "Fresubin® Original Fibre",
					presentations: [
						{
							acbs: [
								"<p><b>Standard ACBS indications:</b> Disease-related malnutrition, intractable malabsorption, pre-operative preparation of malnourished patients, dysphagia, proven inflammatory bowel disease, following total gastrectomy, short-bowel syndrome, bowel fistula except bowel fistula and pre-operative preparation of malnourished patients.</p>",
							],
							carbohydrateGrams: "13.0",
							energyKCal: "100",
							energyKj: "420",
							fatGrams: "3.4",
							fibreConstituents: null,
							fibreGrams: "1.5",
							formulation: "Liquid (tube feed) per 100 mL",
							presentationNote: null,
							proteinGrams: "3.8",
							fatConstituents: [],
							carbohydrateConstituents: ["(sugars 0.9 g)"],
							proteinConstituents: ["milk, soya proteins"],
							borderlineSubstancePreps: [
								{
									manufacturer: "Fresenius Kabi Ltd",
									name: "Fresubin Original Fibre liquid",
									packs: [
										{
											unit: "ml",
											size: "500",
											nhsIndicativePrice: "£5.97",
											legalCategory: "Not Applicable",
											hospitalOnly: false,
											drugTariffPrice: null,
											drugTariff: null,
											colour: null,
											amppId: "1690511000001101",
										},
										{
											unit: "ml",
											size: "1000",
											nhsIndicativePrice: "£11.26",
											legalCategory: "Not Applicable",
											hospitalOnly: false,
											drugTariffPrice: null,
											drugTariff: null,
											colour: null,
											amppId: "1690611000001102",
										},
									],
									ampId: "871011000001101",
									blackTriangle: false,
									controlledDrugSchedule: null,
									activeIngredients: [],
									sugarFree: null,
								},
							],
							rxAdvice: null,
							specialCharacteristics: [
								"Contains fish oil, residual lactose, soya. Gluten-free",
							],
						},
					],
					introductionNote:
						"<p>Not suitable for use in child under 3 years; not recommended for child under 6 years</p>",
					id: "PHP103612",
				},
			],
			childTaxonomies: [
				{
					title: "Sub taxonomy 1",
					substances: [
						{
							title: "Fresubin® Soya Fibre",
							introductionNote:
								"<p>Not suitable for use in child under 3 years; not recommended for child under 6 years</p>",
							id: "PHP103619",
							presentations: [
								{
									acbs: [
										"<p><b>Standard ACBS indications:</b> Disease-related malnutrition, intractable malabsorption, pre-operative preparation of malnourished patients, dysphagia, proven inflammatory bowel disease, following total gastrectomy, short-bowel syndrome, bowel fistula except bowel fistula and pre-operative preparation of malnourished patients.</p>",
									],
									carbohydrateGrams: "13.0",
									energyKCal: "100",
									energyKj: "420",
									fatGrams: "3.4",
									fibreConstituents: null,
									fibreGrams: "1.5",
									formulation: "Liquid (tube feed) per 100 mL",
									presentationNote: null,
									proteinGrams: "3.8",
									fatConstituents: [],
									carbohydrateConstituents: ["(sugars 0.9 g)"],
									proteinConstituents: ["milk, soya proteins"],
									borderlineSubstancePreps: [
										{
											manufacturer: "Fresenius Kabi Ltd",
											name: "Fresubin Original Fibre liquid",
											packs: [
												{
													unit: "ml",
													size: "500",
													nhsIndicativePrice: "£5.97",
													legalCategory: "Not Applicable",
													hospitalOnly: false,
													drugTariffPrice: null,
													drugTariff: null,
													colour: null,
													amppId: "1690511000001101",
												},
												{
													unit: "ml",
													size: "1000",
													nhsIndicativePrice: "£11.26",
													legalCategory: "Not Applicable",
													hospitalOnly: false,
													drugTariffPrice: null,
													drugTariff: null,
													colour: null,
													amppId: "1690611000001102",
												},
											],
											ampId: "871011000001101",
											blackTriangle: false,
											controlledDrugSchedule: null,
											activeIngredients: [],
											sugarFree: null,
										},
									],
									rxAdvice: null,
									specialCharacteristics: [
										"Contains fish oil, residual lactose, soya. Gluten-free",
									],
								},
							],
						},
					],
					childTaxonomies: [],
				},
				{ title: "Sub taxonomy 2", substances: [], childTaxonomies: [] },
			],
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
		it("should set page title from borderline substance taxonomy title", async () => {
			render(<BorderlineSubstancesSectionPage {...isRootTwoLevelProps} />);

			await waitFor(() => {
				expect(document.title).toStartWith("Root taxonomy |");
			});
		});
	});

	describe("Page header", () => {
		it("should add content start skip link target id to page header", () => {
			render(<BorderlineSubstancesSectionPage {...isRootTwoLevelProps} />);
			const heading1 = screen.getByRole("heading", {
				level: 1,
			});
			// eslint-disable-next-line testing-library/no-node-access
			expect(heading1.parentElement).toHaveAttribute("id", "content-start");
		});

		it("should render heading 1 with current page title", () => {
			render(<BorderlineSubstancesSectionPage {...isRootTwoLevelProps} />);
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
			["Borderline substances", "/borderline-substances/"],
		])(
			"should render default '(%s)' breadcrumb",
			(breadcrumbText, expectedHref) => {
				render(<BorderlineSubstancesSectionPage {...isRootTwoLevelProps} />);

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
			render(<BorderlineSubstancesSectionPage {...isRootTwoLevelProps} />);

			const breadcrumbNav = screen.getByRole("navigation", {
				name: "Breadcrumbs",
			});
			const currentPageCrumb = within(breadcrumbNav).getByText("Root taxonomy");
			expect(currentPageCrumb).toBeInTheDocument();
			expect(currentPageCrumb.tagName).toBe("SPAN");
		});

		it("should render root taxonomy breadcrumb for child taxonomy", () => {
			render(<BorderlineSubstancesSectionPage {...isNotRootProps} />);

			const breadcrumbNav = screen.getByRole("navigation", {
				name: "Breadcrumbs",
			});
			const parentPageCrumb = within(breadcrumbNav).getByText("Root taxonomy");
			expect(parentPageCrumb).toBeInTheDocument();
		});
	});

	describe("body", () => {
		it("should render links to records for taxonomies with one level of children", () => {
			render(<BorderlineSubstancesSectionPage {...isRootSingleLevelProps} />);
			expect(screen.getByRole("link", { name: "Taxonomy 1" })).toHaveAttribute(
				"href",
				"/borderline-substances/taxonomy-1/"
			);
			expect(screen.getByRole("link", { name: "Taxonomy 2" })).toHaveAttribute(
				"href",
				"/borderline-substances/taxonomy-2/"
			);
		});

		it("should render headers for the first level children when there are more than one level of children", () => {
			render(<BorderlineSubstancesSectionPage {...isRootTwoLevelProps} />);
			const heading2 = screen.getAllByRole("heading", {
				level: 2,
			});
			expect(heading2.length).toEqual(2);
			expect(heading2[0]).toHaveTextContent("Taxonomy 1");
		});

		it("should render link back to root taxonomy for borderline substance presentation page", () => {
			render(<BorderlineSubstancesSectionPage {...isNotRootProps} />);
			const link = screen.getAllByRole("link");
			expect(link[4]).toHaveTextContent("View other Root taxonomy");
		});

		it("should flatten all the substances for the section nav", async () => {
			render(<BorderlineSubstancesSectionPage {...isNotRootProps} />);
			const navigation = screen.getByRole("navigation", {
				name: "Navigate to section",
			});

			const findNavigationList = () =>
				within(navigation).findAllByRole("listitem");
			const navigationList = await findNavigationList();
			expect(navigationList.length).toEqual(3);
		});

		it("should render each substance", async () => {
			render(<BorderlineSubstancesSectionPage {...isNotRootProps} />);
			const substance = screen.getAllByRole("heading", { level: 2 });
			expect(substance.length).toEqual(4);
			expect(substance[1]).toHaveTextContent("Fresubin® 1500 Complete");
		});

		it("should render each preparation", async () => {
			render(<BorderlineSubstancesSectionPage {...isNotRootProps} />);
			const preparation = screen.getAllByRole("heading", { level: 3 });
			expect(preparation.length).toEqual(3);
			expect(preparation[0]).toHaveTextContent(
				"Fresubin 1500 Complete liquid Fresenius Kabi Ltd"
			);
		});
	});
});
