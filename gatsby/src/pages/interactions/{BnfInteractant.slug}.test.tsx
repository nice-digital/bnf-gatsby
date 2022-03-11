import { render, waitFor, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import InteractantPage, {
	query,
	type InteractantPageProps,
} from "./{BnfInteractant.slug}";

const interactant: InteractantPageProps["data"]["bnfInteractant"] = {
	// Note deliberate use of HTML within the title for testing stripping of tags
	title: "Anti-D (Rh<sub>0</sub>) immunoglobulin",
	drug: {
		title: "acarbose",
		slug: "acarbose",
	},
	interactions: [
		{
			interactant: {
				title: "Pancreatin",
				drug: {
					slug: "pancreatin",
				},
			},
			messages: [
				{
					additiveEffect: false,
					evidence: "Theoretical",
					message:
						'<span class="substance-primary" data-monograph-sid="_743802912" data-sid="_743802912">pancreatin</span> <span class="effectQualifier">is predicted to</span> <span class="effect">decrease</span> <span class="parameter">the effects of</span> <span class="substance-primary" data-monograph-sid="_426793441" data-sid="_426793441">acarbose</span>. <span class="action">Manufacturer advises avoid</span>.  ',
					severity: "Moderate",
					severityOrder: 3,
				},
			],
		},
		{
			interactant: {
				title: "Canagliflozin",
				drug: {
					slug: "canagliflozin",
				},
			},
			messages: [
				{
					additiveEffect: true,
					evidence: null,
					message:
						'<p>Both <span class="substance-primary" data-monograph-sid="_426793441" data-sid="_426793441">acarbose</span> and <span class="substance-primary" data-monograph-sid="_629412592" data-sid="_629412592">canagliflozin</span> can increase the risk of hypoglycaemia.</p>',
					severity: "Normal",
					severityOrder: 1,
				},
			],
		},
	],
};

const dataProp: InteractantPageProps["data"] = {
	bnfInteractant: interactant,
};

describe("InteractantPage", () => {
	it("should match snapshot for graphql query", () => {
		expect(query).toMatchSnapshot();
	});

	describe("SEO", () => {
		it("should strip HTML tags for page title", async () => {
			render(<InteractantPage data={dataProp} />);

			await waitFor(() => {
				expect(document.title).toStartWith(
					"Anti-D (Rh0) immunoglobulin | Interactions |"
				);
			});
		});

		it("should strip HTML tags for templated meta description", async () => {
			render(<InteractantPage data={dataProp} />);

			await waitFor(() => {
				expect(
					document
						// eslint-disable-next-line testing-library/no-node-access
						.querySelector("meta[name='description']")
				).toHaveAttribute(
					"content",
					"A list of drugs that interact with Anti-D (Rh0) immunoglobulin"
				);
			});
		});
	});

	describe("Page header", () => {
		it("should add content start skip link target id to page header", () => {
			render(<InteractantPage data={dataProp} />);
			const heading1 = screen.getByRole("heading", {
				level: 1,
			});
			// eslint-disable-next-line testing-library/no-node-access
			expect(heading1.parentElement).toHaveAttribute("id", "content-start");
		});

		it("should render heading 1 with current page title", () => {
			render(<InteractantPage data={dataProp} />);
			const heading1 = screen.getByRole("heading", {
				level: 1,
			});
			expect(heading1).toHaveTextContent(
				"Anti-D (Rh0) immunoglobulin Interactions"
			);
		});
	});

	describe("Breadcrumbs", () => {
		it.each([
			["NICE", "https://www.nice.org.uk/"],
			["BNF", "/"],
			["Interactions", "/interactions/"],
		])(
			"should render default '(%s)' breadcrumb",
			(breadcrumbText, expectedHref) => {
				render(<InteractantPage data={dataProp} />);

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
			render(<InteractantPage data={dataProp} />);

			const breadcrumbNav = screen.getByRole("navigation", {
				name: "Breadcrumbs",
			});
			const currentPageCrumb = within(breadcrumbNav).getByText(
				"Anti-D (Rh0) immunoglobulin"
			);
			expect(currentPageCrumb).toBeInTheDocument();
			expect(currentPageCrumb.tagName).toBe("SPAN");
		});
	});

	describe("body", () => {
		it("should match snapshot for page body", () => {
			render(<InteractantPage data={dataProp} />);
			expect(screen.getByRole("main")).toMatchSnapshot();
		});

		it("should link to drug monograph page for matching drug", () => {
			render(<InteractantPage data={dataProp} />);
			const monographLink = screen.getByRole("link", {
				name: `View ${interactant.drug?.title} monograph page`,
			});
			expect(monographLink).toHaveAttribute(
				"href",
				`/drugs/${interactant.drug?.slug}/`
			);
		});

		it("should render a list of interactions, one per interactant", () => {
			render(<InteractantPage data={dataProp} />);
			const interactionList = screen.getByRole("list", {
				name: `List of interactions for ${interactant.drug?.title}`,
			});
			// Have to disable linting on no-node-access, as nested list items mean that getAllByRole returns too many elements
			// eslint-disable-next-line testing-library/no-node-access
			expect(interactionList.children).toHaveLength(
				interactant.interactions.length
			);
		});
	});

	describe("sorting", () => {
		it("should toggle between the two different sorting buttons whenever one is pressed", () => {
			render(<InteractantPage data={dataProp} />);

			const nameSortButtonArgs: [string, { name: string }] = [
				"button",
				{
					name: "Sort by: Name",
				},
			];
			const severitySortButtonArgs: [string, { name: string }] = [
				"button",
				{
					name: "Sort by: Severity",
				},
			];

			// Have to use queryByRole instead of getByRole for nullable queries (i.e. queries that may return no elements)
			// This is because we want to check that certain elements *don't* exist and have been removed from the DOM
			let nameSortButton: HTMLElement | null = screen.queryByRole(
				...nameSortButtonArgs
			);
			let severitySortButton: HTMLElement | null = screen.getByRole(
				...severitySortButtonArgs
			);
			expect(nameSortButton).not.toBeInTheDocument();
			expect(severitySortButton).toBeInTheDocument();

			userEvent.click(severitySortButton);
			nameSortButton = screen.getByRole(...nameSortButtonArgs);
			severitySortButton = screen.queryByRole(...severitySortButtonArgs);
			expect(nameSortButton).toBeInTheDocument();
			expect(severitySortButton).not.toBeInTheDocument();

			userEvent.click(nameSortButton);
			nameSortButton = screen.queryByRole(...nameSortButtonArgs);
			severitySortButton = screen.getByRole(...severitySortButtonArgs);
			expect(nameSortButton).not.toBeInTheDocument();
			expect(severitySortButton).toBeInTheDocument();
		});
		it("should sort the interaction results alphabetically by default", () => {
			render(<InteractantPage data={dataProp} />);
			expect(
				screen
					.getAllByRole("heading", { level: 3 })
					.map((heading) => heading.textContent)
			).toStrictEqual(["Canagliflozin", "Pancreatin"]);
		});

		it("should sort the interaction results by severity after hitting the 'Sort by severity' button", () => {
			render(<InteractantPage data={dataProp} />);
			const sortButton = screen.getByRole("button", {
				name: "Sort by: Severity",
			});
			userEvent.click(sortButton);
			expect(
				screen
					.getAllByRole("heading", { level: 3 })
					.map((heading) => heading.textContent)
			).toStrictEqual(["Pancreatin", "Canagliflozin"]);
		});
	});
});
