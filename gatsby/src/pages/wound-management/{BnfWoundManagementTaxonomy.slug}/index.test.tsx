import { render, screen, within, waitFor } from "@testing-library/react";
import React from "react";

import WoundManagementTaxonomyPage, {
	type WoundManagementTaxonomyPageProps,
} from "./";

const props: WoundManagementTaxonomyPageProps = {
	data: {
		allBnfWoundManagementTaxonomy: {
			taxonomies: [
				{
					title: "Basic wound contact dressings",
					slug: "basic-wound-contact-dressings",
				},
				{
					title: "Advanced wound dressings",
					slug: "advanced-wound-dressings",
				},
			],
		},
		bnfWoundManagementTaxonomy: {
			title: "Advanced wound dressings",
			slug: "advanced-wound-dressings",
			text: "<p> Advanced wound dressings can be used for both acute and chronic wounds. Categories for dressings in this section start with the least absorptive, moisture-donating hydrogel dressings, followed by increasingly more absorptive dressings. </p>",
			childTaxonomies: [
				{
					title: "Hydrogel dressings",
					slug: "hydrogel-dressings",
					text: "<p> Hydrogel dressings are most commonly supplied as an amorphous, cohesive topical application that can take up the shape of a wound.</p>",
					productGroups: [],
					childTaxonomies: [
						{
							title: "Sodium hyaluronate dressings",
							slug: "sodium-hyaluronate-dressings",
						},
						{
							title: "Hydrogel sheet dressings",
							slug: "hydrogel-sheet-dressings",
						},
						{
							title: "Hydrogel application (amorphous)",
							slug: "hydrogel-application-amorphous",
						},
					],
				},
				{
					title: "Vapour-permeable films and membranes",
					slug: "vapour-permeable-films-and-membranes",
					text: "<p> Vapour-permeable films and membranes allow the passage of water vapour and oxygen but are impermeable to water and micro-organisms, and are suitable for lightly exuding wounds.</p>",
					productGroups: [],
					childTaxonomies: [
						{
							title: "Non-woven fabric dressing with viscose-rayon pad",
							slug: "non-woven-fabric-dressing-with-viscose-rayon-pad",
						},
						{
							title:
								"Vapour–permeable transparent film dressing with adhesive foam border",
							slug: "vapour-permeable-transparent-film-dressing-with-adhesive-foam-border",
						},
						{
							title: "Vapour–permeable transparent, adhesive film dressing.",
							slug: "vapour-permeable-transparent-adhesive-film-dressing",
						},
						{
							title:
								"Vapour-permeable Adhesive Film Dressing (Semi-permeable Adhesive Dressing)",
							slug: "vapour-permeable-adhesive-film-dressing-semi-permeable-adhesive-dressing",
						},
					],
				},
				{
					title: "Capillary-acting dressings",
					slug: "capillary-acting-dressings",
					text: null,
					productGroups: [],
					childTaxonomies: [],
				},
			],
		},
	},
};

describe("Wound management taxonomy page", () => {
	it("should render the page title with the expected text", async () => {
		render(<WoundManagementTaxonomyPage {...props} />);
		await waitFor(() => {
			expect(document.title).toStartWith(
				props.data.bnfWoundManagementTaxonomy.title
			);
		});
	});

	it("should render meta description", async () => {
		render(<WoundManagementTaxonomyPage {...props} />);
		await waitFor(() => {
			// eslint-disable-next-line testing-library/no-node-access
			expect(document.querySelector("meta[name=description]")).toHaveAttribute(
				"content",
				`This wound management topic describes the options that are currently recommended for ${props.data.bnfWoundManagementTaxonomy.title}`
			);
		});
	});

	it("should match page snapshot", () => {
		render(<WoundManagementTaxonomyPage {...props} />);
		expect(screen.getByRole("main")).toMatchSnapshot();
	});

	it("should add content start skip link target id to page header", () => {
		render(<WoundManagementTaxonomyPage {...props} />);
		const heading1 = screen.getByRole("heading", {
			level: 1,
		});
		// eslint-disable-next-line testing-library/no-node-access
		expect(heading1.parentElement).toHaveProperty("id", "content-start");
	});

	it("should render the page heading with the expected text", () => {
		render(<WoundManagementTaxonomyPage {...props} />);
		expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
			props.data.bnfWoundManagementTaxonomy.title
		);
	});

	it("should render a navigation list of sub sections", () => {
		render(<WoundManagementTaxonomyPage {...props} />);
		expect(
			screen.getByRole("navigation", {
				name: "Wound management product pages",
			})
		).toBeInTheDocument();
	});

	it("should render correct number of sections in the sub nav", () => {
		render(<WoundManagementTaxonomyPage {...props} />);
		const subNav = screen.getByRole("navigation", {
			name: "Wound management product pages",
		});
		expect(within(subNav).getAllByRole("listitem")).toHaveLength(
			props.data.allBnfWoundManagementTaxonomy.taxonomies.length
		);
	});

	it("should show a message when rendering a product group with no information", () => {
		const noInformationWarningText =
			"Please note, there is currently no specific information about this product.";

		render(<WoundManagementTaxonomyPage {...props} />);
		expect(screen.queryByText(noInformationWarningText)).toBeNull();

		render(
			<WoundManagementTaxonomyPage
				data={{
					...props.data,
					bnfWoundManagementTaxonomy: {
						...props.data.bnfWoundManagementTaxonomy,
						childTaxonomies: [
							{
								title: "No info test",
								slug: "no-info-test",
								text: "<p>No info test</p>",
								childTaxonomies: [],
								productGroups: [
									{
										title: "Test product group",
										description: "<p>Test description</p>",
										products: [], // Need a product group with no products to trigger this condition
									},
								],
							},
						],
					},
				}}
			/>
		);
		expect(screen.getByText(noInformationWarningText)).toBeInTheDocument();
	});
});
