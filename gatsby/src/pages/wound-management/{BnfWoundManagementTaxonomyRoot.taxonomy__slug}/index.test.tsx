import { render, screen, within, waitFor } from "@testing-library/react";
import React from "react";

import { decapitalize } from "@/utils";

import WoundManagementTaxonomyPage, {
	type WoundManagementTaxonomyPageProps,
} from "./";

const props: WoundManagementTaxonomyPageProps = {
	data: {
		allBnfWoundManagementTaxonomyRoot: {
			taxonomies: [
				{
					taxonomy: {
						title: "Basic wound contact dressings",
						slug: "basic-wound-contact-dressings",
					},
				},
				{
					taxonomy: {
						title: "Advanced wound dressings",
						slug: "advanced-wound-dressings",
					},
				},
			],
		},
		bnfWoundManagementTaxonomyRoot: {
			taxonomy: {
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
	},
};

const childTaxonomyListName = `List of ${props.data.bnfWoundManagementTaxonomyRoot.taxonomy.title.toLowerCase()}`;

describe("Wound management taxonomy page", () => {
	it("should render the page title with the expected text", async () => {
		render(<WoundManagementTaxonomyPage {...props} />);
		await waitFor(() => {
			expect(document.title).toStartWith(
				props.data.bnfWoundManagementTaxonomyRoot.taxonomy.title
			);
		});
	});

	it("should render meta description", async () => {
		render(<WoundManagementTaxonomyPage {...props} />);
		await waitFor(() => {
			// eslint-disable-next-line testing-library/no-node-access
			expect(document.querySelector("meta[name=description]")).toHaveAttribute(
				"content",
				`This wound management topic describes the options that are currently recommended for ${decapitalize(
					props.data.bnfWoundManagementTaxonomyRoot.taxonomy.title
				)}`
			);
		});
	});

	it("should match page snapshot", () => {
		const { container } = render(<WoundManagementTaxonomyPage {...props} />);

		expect(container).toMatchSnapshot();
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
			props.data.bnfWoundManagementTaxonomyRoot.taxonomy.title
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
			props.data.allBnfWoundManagementTaxonomyRoot.taxonomies.length
		);
	});

	it("should render a list of child taxonomies", () => {
		render(<WoundManagementTaxonomyPage {...props} />);
		expect(
			screen.getByRole("list", {
				name: childTaxonomyListName,
			})
		).toBeInTheDocument();
	});

	it("should render a heading for each child taxonomy", () => {
		render(<WoundManagementTaxonomyPage {...props} />);
		const childTaxonomyList = screen.getByRole("list", {
			name: childTaxonomyListName,
		});
		expect(
			within(childTaxonomyList).getAllByRole("heading", { level: 2 })
		).toHaveLength(
			props.data.bnfWoundManagementTaxonomyRoot.taxonomy.childTaxonomies.length
		);
	});
});
