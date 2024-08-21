import { render, screen, waitFor, within } from "@testing-library/react";

import { AtoZListPage, type AtoZListPageProps } from "./AtoZListPage";

const props: AtoZListPageProps = {
	path: "test-path",
	title: "Test title",
	metaDescription: "Test meta desc",
	letters: [
		{
			letter: "a",
			links: [
				{
					title: "Aardvark",
					slug: "aardvark",
				},
			],
		},
		{
			letter: "b",
			links: [
				{
					title: "Bear",
					slug: "bear",
				},
			],
		},
	],
	pageDescription: "Test description",
};

describe("AtoZListPage", () => {
	it("should set page title", async () => {
		render(<AtoZListPage {...props} />);
		await waitFor(() => {
			expect(document.title).toStartWith("Test title A to Z");
		});
	});

	it("should set page meta description", async () => {
		render(<AtoZListPage {...props} />);
		await waitFor(() => {
			expect(
				document
					// eslint-disable-next-line testing-library/no-node-access
					.querySelector("meta[name='description']")
					?.getAttribute("content")
			).toEqual("Test meta desc");
		});
	});

	it.each([
		["NICE", "https://www.nice.org.uk/"],
		["BNF", "/"],
	])(
		"should render default '(%s)' breadcrumb",
		(breadcrumbText, expectedHref) => {
			render(<AtoZListPage {...props} />);

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
		render(<AtoZListPage {...props} />);

		const breadcrumbNav = screen.getByRole("navigation", {
			name: "Breadcrumbs",
		});
		const currentPageCrumb =
			within(breadcrumbNav).getByText("Test title A to Z");
		expect(currentPageCrumb).toBeInTheDocument();
		expect(currentPageCrumb.tagName).toBe("SPAN");
	});

	it("should add content start skip link target id to page header", () => {
		render(<AtoZListPage {...props} />);

		// const heading1 = screen.getByRole("heading", {
		// 	level: 1,
		// });
		const pageHeader = screen.getByTestId("page-header");
		// eslint-disable-next-line testing-library/no-node-access
		expect(pageHeader).toHaveProperty("id", "content-start");
	});

	it("should render main heading with A to Z postfix", () => {
		render(<AtoZListPage {...props} />);

		const heading1 = screen.getByRole("heading", {
			level: 1,
		});
		expect(heading1).toHaveProperty("innerHTML", "Test title A&nbsp;to&nbsp;Z");
	});
});
