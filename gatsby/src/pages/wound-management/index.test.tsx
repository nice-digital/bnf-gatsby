import { render, screen, within, waitFor } from "@testing-library/react";
import React from "react";

import WoundManagementIndexPage, {
	type WoundManagementIndexPageProps,
} from "./";

const props: WoundManagementIndexPageProps = {
	data: {
		bnfWoundManagementIntroduction: {
			title: "Wound management products and elasticated garments",
			sections: [
				{
					title: "Introduction",
					slug: "introduction",
					content:
						" <p>The correct dressing for wound management depends not only on the type of wound but also on the stage of the healing process",
					order: 1,
				},
			],
		},
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
	},
};

describe("Medical devices index page", () => {
	it("should render the page title with the expected text", async () => {
		render(<WoundManagementIndexPage {...props} />);
		await waitFor(() => {
			expect(document.title).toStartWith(
				"Wound management products and elasticated garments"
			);
		});
	});

	it("should render meta description", async () => {
		render(<WoundManagementIndexPage {...props} />);
		await waitFor(() => {
			// eslint-disable-next-line testing-library/no-node-access
			expect(document.querySelector("meta[name=description]")).toHaveAttribute(
				"content",
				"Browse wound management products and elasticated garments, by type."
			);
		});
	});

	it("should match page snapshot", () => {
		render(<WoundManagementIndexPage {...props} />);
		expect(screen.getByRole("main")).toMatchSnapshot();
	});

	it("should add content start skip link target id to page header", () => {
		render(<WoundManagementIndexPage {...props} />);
		const heading1 = screen.getByRole("heading", {
			level: 1,
		});
		// eslint-disable-next-line testing-library/no-node-access
		expect(heading1.parentElement).toHaveProperty("id", "content-start");
	});

	it("should render the page heading with the expected text", () => {
		render(<WoundManagementIndexPage {...props} />);
		expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
			"Wound management products and elasticated garments"
		);
	});

	it("should render a navigation list of sub sections", () => {
		render(<WoundManagementIndexPage {...props} />);
		expect(
			screen.getByRole("navigation", {
				name: "Wound management product pages",
			})
		).toBeInTheDocument();
	});

	it("should render correct number of sections in the sub nav", () => {
		render(<WoundManagementIndexPage {...props} />);
		const subNav = screen.getByRole("navigation", {
			name: "Wound management product pages",
		});
		expect(within(subNav).getAllByRole("listitem")).toHaveLength(
			props.data.allBnfWoundManagementTaxonomy.taxonomies.length
		);
	});
});
