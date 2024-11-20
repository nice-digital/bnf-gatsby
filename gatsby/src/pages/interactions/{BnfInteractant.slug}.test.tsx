import { useLocation } from "@reach/router";
import { render, waitFor, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { decapitalize } from "@/utils";

import InteractantPage, {
	query,
	type InteractantPageProps,
} from "./{BnfInteractant.slug}";

jest.mock("@reach/router", () => ({
	useLocation: jest.fn(),
}));

const interactant: InteractantPageProps["data"]["bnfInteractant"] = {
	// Note deliberate use of HTML within the title for testing stripping of tags
	title: "Anti-D (Rh<sub>0</sub>) immunoglobulin",
	drug: {
		title: "Acarbose",
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
				title: "Canagliflozin test",
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
		{
			interactant: {
				title: "Test interactant",
				drug: {
					slug: "testinteractant",
				},
			},
			messages: [
				{
					additiveEffect: true,
					evidence: null,
					message: "Test message 1",
					severity: "Normal",
					severityOrder: 1,
				},
				{
					additiveEffect: true,
					evidence: null,
					message: "Test message 2 (severe)",
					severity: "Severe",
					severityOrder: 4,
				},
			],
		},
	],
	supplementaryInformation: [],
};

const dataProp: InteractantPageProps["data"] = {
	bnfInteractant: interactant,
};

describe("InteractantPage", () => {
	beforeEach(() => {
		(useLocation as jest.Mock).mockReturnValue({
			pathname: "/interactions/anti-d-rh0-immunoglobulin/",
		});
	});

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
					"See the list of drugs that interact with Anti-D (Rh0) immunoglobulin. Includes information on severity of interaction and the level of evidence for it."
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
		it("should render the combination products alert", () => {
			render(<InteractantPage data={dataProp} />);
			const alert = screen.getByTestId("interactions-a-z-alert");
			expect(alert).toBeInTheDocument();
			expect(alert).toHaveTextContent(
				"Important:for combination products such as co-amilofruse (amiloride+furosemide) and co-trimoxazole (trimethoprim+sulfamethoxazole), check for interactions with the individual drugs. You can find links in the interactions section of the monograph for the combination product."
			);
		});
		it("should render 'has no specific interactions information' when there are no interactions", () => {
			render(
				<InteractantPage
					data={{ bnfInteractant: { ...interactant, interactions: [] } }}
				/>
			);
			expect(
				screen.getByText(
					(_content, node) =>
						node?.textContent ===
						"Anti-D (Rh0) immunoglobulin has no specific interactions information."
				)
			).toBeInTheDocument();
		});

		it("should match snapshot for page body", () => {
			const { container } = render(<InteractantPage data={dataProp} />);
			expect(container).toMatchSnapshot();
		});

		it("should link to drug monograph page for matching drug", () => {
			render(<InteractantPage data={dataProp} />);
			const monographLink = screen.getByRole("link", {
				name: `View ${decapitalize(
					interactant.drug?.title || ""
				)} drug monograph`,
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
		beforeEach(() => {
			window.dataLayer = [];
		});

		it("should toggle between the two different sorting buttons whenever one is pressed", async () => {
			const user = userEvent.setup();
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

			user.click(severitySortButton);

			await waitFor(() => {
				nameSortButton = screen.getByRole(...nameSortButtonArgs);
				severitySortButton = screen.queryByRole(...severitySortButtonArgs);
				expect(nameSortButton).toBeInTheDocument();
				// eslint-disable-next-line testing-library/no-wait-for-multiple-assertions
				expect(severitySortButton).not.toBeInTheDocument();
			});

			nameSortButton = screen.getByRole(...nameSortButtonArgs);
			severitySortButton = screen.queryByRole(...severitySortButtonArgs);
			expect(nameSortButton).toBeInTheDocument();
			expect(severitySortButton).not.toBeInTheDocument();

			user.click(nameSortButton);

			await waitFor(() => {
				nameSortButton = screen.queryByRole(...nameSortButtonArgs);
				severitySortButton = screen.getByRole(...severitySortButtonArgs);
				expect(nameSortButton).not.toBeInTheDocument();
				// eslint-disable-next-line testing-library/no-wait-for-multiple-assertions
				expect(severitySortButton).toBeInTheDocument();
			});
		});
		it("should sort the interaction results alphabetically by default", () => {
			render(<InteractantPage data={dataProp} />);
			expect(
				screen
					.getAllByRole("heading", { level: 3 })
					.map((heading) => heading.textContent)
			).toStrictEqual(["Canagliflozin test", "Pancreatin", "Test interactant"]);
		});

		it("should sort the interaction results by severity after hitting the 'Sort by severity' button", async () => {
			const user = userEvent.setup();
			render(<InteractantPage data={dataProp} />);
			const sortButton = screen.getByRole("button", {
				name: "Sort by: Severity",
			});
			user.click(sortButton);

			await waitFor(() =>
				expect(
					screen
						.getAllByRole("heading", { level: 3 })
						.map((heading) => heading.textContent)
				).toStrictEqual([
					"Test interactant",
					"Pancreatin",
					"Canagliflozin test",
				])
			);
		});

		it("should limit the result set when a filter value is supplied", async () => {
			const user = userEvent.setup();
			render(<InteractantPage data={dataProp} />);
			const filterButton = screen.getByRole("button", {
				name: "Filter",
			});
			user.type(screen.getByRole("textbox"), "Test");

			await waitFor(async () =>
				expect(await screen.findByRole("textbox")).toHaveValue("Test")
			);

			user.click(filterButton);

			await waitFor(() =>
				expect(
					screen
						.getAllByRole("heading", { level: 3 })
						.map((heading) => heading.textContent)
				).toStrictEqual(["Canagliflozin test", "Test interactant"])
			);
		});

		it("should limit the result set when a filter value is supplied with added whitespace", async () => {
			const user = userEvent.setup();
			render(<InteractantPage data={dataProp} />);
			const filterButton = screen.getByRole("button", {
				name: "Filter",
			});

			const searchTerm = "  Test      ";
			user.type(screen.getByRole("textbox"), searchTerm);

			await waitFor(async () =>
				expect(await screen.findByRole("textbox")).toHaveValue(searchTerm)
			);

			user.click(filterButton);

			await waitFor(() =>
				expect(
					screen
						.getAllByRole("heading", { level: 3 })
						.map((heading) => heading.textContent)
				).toStrictEqual(["Canagliflozin test", "Test interactant"])
			);
		});

		it("should successfully list a filtered result set in severity order when specified", async () => {
			const user = userEvent.setup();
			render(<InteractantPage data={dataProp} />);
			const filterButton = screen.getByRole("button", {
				name: "Filter",
			});
			user.type(screen.getByRole("textbox"), "Test");

			await waitFor(async () =>
				expect(await screen.findByRole("textbox")).toHaveValue("Test")
			);

			user.click(filterButton);

			const sortButton = screen.getByRole("button", {
				name: "Sort by: Severity",
			});
			user.click(sortButton);

			await waitFor(() =>
				expect(
					screen
						.getAllByRole("heading", { level: 3 })
						.map((heading) => heading.textContent)
				).toStrictEqual(["Test interactant", "Canagliflozin test"])
			);
		});

		it("should render supplementary information when supplied", () => {
			render(
				<InteractantPage
					data={{
						bnfInteractant: {
							...interactant,
							supplementaryInformation: [
								{
									title: "Test supplementary info 1",
									information:
										"<p>Supplementary info test information element 1</p>",
								},
								{
									title: "Test supplementary info 2",
									information:
										"<p>Supplementary info test information element 2</p>",
								},
							],
						},
					}}
				/>
			);

			expect(
				screen.getByRole("heading", {
					level: 2,
					name: "Test supplementary info 1",
				})
			).toBeInTheDocument();

			expect(
				screen.getByRole("heading", {
					level: 2,
					name: "Test supplementary info 2",
				})
			).toBeInTheDocument();

			expect(
				screen.getByText("Supplementary info test information element 1")
			).toBeInTheDocument();
			expect(
				screen.getByText("Supplementary info test information element 2")
			).toBeInTheDocument();
		});
	});

	describe("filtering", () => {
		it("should push a formSubmit event to the data layer when filter button submits form", async () => {
			const user = userEvent.setup();
			window.dataLayer = [];
			render(<InteractantPage data={dataProp} />);

			const inputElement = screen.getByLabelText("Filter by drug name");

			const submitButton = screen.getByRole("button", {
				name: "Filter",
			});

			user.type(inputElement, "some filter text");

			await waitFor(async () =>
				expect(await inputElement).toHaveValue("some filter text")
			);

			await waitFor(() => {
				expect(inputElement).toHaveValue("some filter text");
			});

			await userEvent.click(submitButton);

			await waitFor(() => {
				expect(window.dataLayer[0]).toStrictEqual({
					event: "formSubmit",
					formText: "some filter text",
				});
			});
		});
	});
});
