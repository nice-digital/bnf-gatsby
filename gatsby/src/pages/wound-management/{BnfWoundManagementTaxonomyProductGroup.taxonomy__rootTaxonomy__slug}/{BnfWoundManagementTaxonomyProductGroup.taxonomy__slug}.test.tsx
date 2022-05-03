import { render, screen, within, waitFor } from "@testing-library/react";
import React from "react";

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
						description:
							"<p>For intravenous and subcutaneous catheter sites</p>",
						products: [
							{
								name: "IV3000 dressing 5cm x 6cm",
								manufacturer: "Smith & Nephew Healthcare Ltd",
								packs: [
									{
										nhsIndicativePrice: "£0.45",
									},
								],
							},
							{
								name: "IV3000 dressing 9cm x 12cm",
								manufacturer: "Smith & Nephew Healthcare Ltd",
								packs: [
									{
										nhsIndicativePrice: "£1.55",
									},
								],
							},
							{
								name: "IV3000 dressing 10cm x 12cm",
								manufacturer: "Smith & Nephew Healthcare Ltd",
								packs: [
									{
										nhsIndicativePrice: "£1.49",
									},
								],
							},
						],
					},
					{
						title: "Mepore IV",
						description:
							"<p>For intravenous and subcutaneous catheter sites</p>",
						products: [
							{
								name: "Mepore IV dressing 5cm x 5.5cm",
								manufacturer: "Molnlycke Health Care Ltd",
								packs: [
									{
										nhsIndicativePrice: "£0.32",
									},
								],
							},
						],
					},
					{
						title: "Pharmapore-PU IV",
						description:
							"<p>For intravenous and subcutaneous catheter sites</p>",
						products: [
							{
								name: "Pharmapore-PU-I.V dressing 7cm x 8.5cm",
								manufacturer: "Wallace, Cameron & Company Ltd",
								packs: [
									{
										nhsIndicativePrice: "£0.07",
									},
								],
							},
							{
								name: "Pharmapore-PU-I.V dressing 6cm x 7cm",
								manufacturer: "Wallace, Cameron & Company Ltd",
								packs: [
									{
										nhsIndicativePrice: "£0.08",
									},
								],
							},
							{
								name: "Pharmapore-PU-I.V dressing 7cm x 9cm",
								manufacturer: "Wallace, Cameron & Company Ltd",
								packs: [
									{
										nhsIndicativePrice: "£0.17",
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

describe("Wound management taxonomy page", () => {
	it("should render the page title with the expected text", async () => {
		render(<WoundManagementProductPage {...props} />);
		await waitFor(() => {
			expect(document.title).toStartWith(
				props.data.bnfWoundManagementTaxonomyProductGroup.taxonomy.title
			);
		});
	});

	it("should render meta description", async () => {
		render(<WoundManagementProductPage {...props} />);
		await waitFor(() => {
			// eslint-disable-next-line testing-library/no-node-access
			expect(document.querySelector("meta[name=description]")).toHaveAttribute(
				"content",
				`This wound management topic describes the options that are currently recommended for ${taxonomy.title}`
			);
		});
	});

	it("should match page snapshot", () => {
		render(<WoundManagementProductPage {...props} />);
		expect(screen.getByRole("main")).toMatchSnapshot();
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
});
