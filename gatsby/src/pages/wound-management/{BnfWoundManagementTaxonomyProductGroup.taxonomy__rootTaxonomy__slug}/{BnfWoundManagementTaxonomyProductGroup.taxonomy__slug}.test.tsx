import { render, screen, within, waitFor } from "@testing-library/react";
import React from "react";

import { decapitalize } from "@/utils";

import WoundManagementProductPage, {
	type WoundManagementProductPageProps,
} from "./{BnfWoundManagementTaxonomyProductGroup.taxonomy__slug}";

const props: WoundManagementProductPageProps = {
	data: {
		bnfWoundManagementTaxonomyProductGroup: {
			taxonomy: {
				title: "Vapour–permeable, transparent, adhesive film dressing.",
				text: "<p>Test description for this product group</p>",
				rootTaxonomy: {
					slug: "advanced-wound-dressings",
					title: "Advanced wound dressings",
				},
				productGroups: [
					{
						title: "IV3000",
						slug: "iv3000",
						description:
							"<p>For intravenous and subcutaneous catheter sites</p>",
						products: [
							{
								name: "IV3000 dressing 5cm x 6cm",
								manufacturer: "Smith & Nephew Healthcare Ltd",
								packs: [
									{
										nhsIndicativePrice: "£0.45",
										colour: null,
									},
								],
							},
							{
								name: "IV3000 dressing 9cm x 12cm",
								manufacturer: "Smith & Nephew Healthcare Ltd",
								packs: [
									{
										nhsIndicativePrice: "£1.55",
										colour: null,
									},
								],
							},
							{
								name: "IV3000 dressing 10cm x 12cm",
								manufacturer: "Smith & Nephew Healthcare Ltd",
								packs: [
									{
										nhsIndicativePrice: "£1.49",
										colour: null,
									},
								],
							},
						],
					},
					{
						title: "Mepore IV",
						slug: "mepore-iv",
						description:
							"<p>For intravenous and subcutaneous catheter sites</p>",
						products: [
							{
								name: "Mepore IV dressing 5cm x 5.5cm",
								manufacturer: "Molnlycke Health Care Ltd",
								packs: [
									{
										nhsIndicativePrice: "£0.32",
										colour: null,
									},
								],
							},
						],
					},
					{
						title: "Pharmapore-PU IV",
						slug: "pharmapore-pu-iv",
						description:
							"<p>For intravenous and subcutaneous catheter sites</p>",
						products: [
							{
								name: "Pharmapore-PU-I.V dressing 7cm x 8.5cm",
								manufacturer: "Wallace, Cameron & Company Ltd",
								packs: [
									{
										nhsIndicativePrice: "£0.07",
										colour: null,
									},
								],
							},
							{
								name: "Pharmapore-PU-I.V dressing 6cm x 7cm",
								manufacturer: "Wallace, Cameron & Company Ltd",
								packs: [
									{
										nhsIndicativePrice: "£0.08",
										colour: null,
									},
								],
							},
							{
								name: "Pharmapore-PU-I.V dressing 7cm x 9cm",
								manufacturer: "Wallace, Cameron & Company Ltd",
								packs: [
									{
										nhsIndicativePrice: "£0.17",
										colour: null,
									},
								],
							},
						],
					},
				],
			},
		},
	},
};

// Saves some lengthy repetition below...
const taxonomy = props.data.bnfWoundManagementTaxonomyProductGroup.taxonomy;
const productListName = `List of products: ${taxonomy.title}`;

describe("Wound management taxonomy page", () => {
	it("should render the page title with the expected text", async () => {
		render(<WoundManagementProductPage {...props} />);
		await waitFor(() => {
			expect(document.title).toStartWith(taxonomy.title);
		});
	});

	it("should render meta description", async () => {
		render(<WoundManagementProductPage {...props} />);
		await waitFor(() => {
			// eslint-disable-next-line testing-library/no-node-access
			expect(document.querySelector("meta[name=description]")).toHaveAttribute(
				"content",
				`This wound management topic describes the options that are currently recommended for ${decapitalize(
					taxonomy.title
				)}`
			);
		});
	});

	it("should match page snapshot", () => {
		const { container } = render(<WoundManagementProductPage {...props} />);
		expect(container).toMatchSnapshot();
	});

	it("should add content start skip link target id to page header", () => {
		render(<WoundManagementProductPage {...props} />);
		const heading1 = screen.getByRole("heading", {
			level: 1,
		});
		// eslint-disable-next-line testing-library/no-node-access
		expect(heading1.parentElement).toHaveProperty("id", "content-start");
	});

	it("should render the page heading with the expected text", () => {
		render(<WoundManagementProductPage {...props} />);
		expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
			taxonomy.title
		);
	});

	it("should render a navigation list of sub sections", () => {
		render(<WoundManagementProductPage {...props} />);
		expect(
			screen.getByRole("navigation", {
				name: "Navigate to section",
			})
		).toBeInTheDocument();
	});

	it("should render correct number of sections in the sub nav", () => {
		render(<WoundManagementProductPage {...props} />);
		const subNav = screen.getByRole("navigation", {
			name: "Navigate to section",
		});
		expect(within(subNav).getAllByRole("listitem")).toHaveLength(
			taxonomy.productGroups.length
		);
	});

	it("should render a list of products", () => {
		render(<WoundManagementProductPage {...props} />);
		expect(
			screen.getByRole("list", {
				name: productListName,
			})
		).toBeInTheDocument();
	});

	it("should render a heading for each product group", () => {
		render(<WoundManagementProductPage {...props} />);
		const productList = screen.getByRole("list", {
			name: productListName,
		});
		expect(
			within(productList).getAllByRole("heading", { level: 2 })
		).toHaveLength(taxonomy.productGroups.length);
	});

	it.each(taxonomy.productGroups)(
		"should render a heading and a product table for each product group",
		({ title, products }) => {
			render(<WoundManagementProductPage {...props} />);
			const heading = screen.getByRole("heading", { level: 2, name: title });
			expect(heading).toBeInTheDocument();

			// eslint-disable-next-line testing-library/no-node-access
			const parentListItem = heading.closest("li");
			if (parentListItem) {
				const tableRows = within(parentListItem).getAllByRole("row");
				expect(tableRows).toHaveLength(products.length + 1); // Adding 1 for the table header
			}
		}
	);

	it("should show a message when there is no specific product information", () => {
		render(
			<WoundManagementProductPage
				data={{
					bnfWoundManagementTaxonomyProductGroup: {
						taxonomy: {
							...props.data.bnfWoundManagementTaxonomyProductGroup.taxonomy,
							productGroups: [
								{
									title: "No products here",
									slug: "no-products-here",
									description: "<p>No products here</p>",
									products: [],
								},
							],
						},
					},
				}}
			/>
		);

		expect(
			screen.getByText(
				"Please note, there is currently no specific information about this product."
			)
		).toBeInTheDocument();
	});
});
