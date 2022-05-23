/* eslint-disable testing-library/no-render-in-setup */
/* eslint-disable testing-library/no-node-access */
import { render, screen, waitFor, within } from "@testing-library/react";
import React from "react";

import { type OnThisPageProps } from "../OnThisPage/OnThisPage";

import { DetailsPageLayout } from "./DetailsPageLayout";

describe("DetailsPageLayout", () => {
	const sections: OnThisPageProps = {
		sections: [
			{
				id: "test-1",
				title: "Test 1",
			},
			{
				id: "test-2",
				title: "Test 2",
			},
		],
	};

	describe("SEO", () => {
		beforeEach(() => {
			render(
				<DetailsPageLayout
					menu={() => null}
					titleHtml="FAQs for BNF <em>for Children</em> — general"
					parentTitleParts={["Parent", "Grandparent"]}
					metaDescription="A test meta"
					parentBreadcrumbs={[{ href: "/about/", text: "About" }]}
					{...sections}
				>
					test
				</DetailsPageLayout>
			);
		});

		it("should strip tags from titleHtml prop in page <title> tag", async () => {
			await waitFor(() => {
				expect(document.title).toStartWith(
					"FAQs for BNF for Children — general"
				);
			});
		});

		it("should append title parent title parts to page title", async () => {
			await waitFor(() => {
				expect(document.title).toStartWith(
					"FAQs for BNF for Children — general | Parent | Grandparent"
				);
			});
		});

		it("should set page meta description", async () => {
			await waitFor(() => {
				expect(
					document
						.querySelector("meta[name='description']")
						?.getAttribute("content")
				).toEqual("A test meta");
			});
		});
	});

	describe("Breadcrumbs", () => {
		beforeEach(() => {
			render(
				<DetailsPageLayout
					menu={() => null}
					titleHtml="Some title"
					parentBreadcrumbs={[{ href: "/about/", text: "About" }]}
					{...sections}
				>
					test
				</DetailsPageLayout>
			);
		});

		it.each([
			["NICE", "https://www.nice.org.uk/"],
			["BNF", "/"],
		])(
			"should render default '(%s)' breadcrumb",
			(breadcrumbText, expectedHref) => {
				const breadcrumbNav = screen.getByRole("navigation", {
					name: "Breadcrumbs",
				});
				const breadcrumb = within(breadcrumbNav).getByRole("link", {
					name: breadcrumbText,
				});

				expect(breadcrumb).toHaveAttribute("href", expectedHref);
			}
		);

		it("should render given parent breadcrumbs", () => {
			const breadcrumbNav = screen.getByRole("navigation", {
				name: "Breadcrumbs",
			});
			const breadcrumb = within(breadcrumbNav).getByRole("link", {
				name: "About",
			});

			expect(breadcrumb).toHaveAttribute("href", "/about/");
		});

		it("should render current page breadcrumb without link", () => {
			const breadcrumbNav = screen.getByRole("navigation", {
				name: "Breadcrumbs",
			});
			const currentPageCrumb = within(breadcrumbNav).getByText("Some title");
			expect(currentPageCrumb).toBeInTheDocument();
			expect(currentPageCrumb.tagName).toBe("SPAN");
		});
	});

	describe("Page header", () => {
		it("should add content start skip link target id to page header", () => {
			render(
				<DetailsPageLayout
					menu={() => null}
					titleHtml="Anything"
					{...sections}
					parentBreadcrumbs={[{ href: "/about/", text: "About" }]}
				>
					test
				</DetailsPageLayout>
			);
			const heading1 = screen.getByRole("heading", {
				level: 1,
			});
			expect(heading1.parentElement).toHaveProperty("id", "content-start");
		});

		it("should render heading 1 with current page title", () => {
			render(
				<DetailsPageLayout
					menu={() => null}
					titleHtml="Some <b>title</b>"
					parentBreadcrumbs={[{ href: "/about/", text: "About" }]}
					{...sections}
				>
					test
				</DetailsPageLayout>
			);
			const heading1 = screen.getByRole("heading", {
				level: 1,
			});
			expect(heading1).toHaveTextContent("Some title");
			expect(heading1).toHaveProperty(
				"innerHTML",
				"<span>Some <b>title</b></span>"
			);
		});

		it("should render pre header", () => {
			render(
				<DetailsPageLayout
					menu={() => null}
					preheading="Some <strong>HTML</strong>"
					titleHtml="Title"
					parentBreadcrumbs={[{ href: "/about/", text: "About" }]}
					{...sections}
				>
					test
				</DetailsPageLayout>
			);
			const heading1 = screen.getByRole("heading", {
				level: 1,
			});
			expect(heading1).toHaveTextContent("Some HTMLTitle");
			expect(heading1).toHaveProperty(
				"innerHTML",
				`<span class="page-header__pre-heading"><span>Some <strong>HTML</strong></span></span><span>Title</span>`
			);
		});
	});

	describe("Body", () => {
		it("should match snapshot for body", () => {
			render(
				<DetailsPageLayout
					menu={() => <>Menu</>}
					titleHtml="Anything"
					parentBreadcrumbs={[{ href: "/about/", text: "About" }]}
					{...sections}
				>
					Body content
				</DetailsPageLayout>
			);
			expect(screen.getByTestId("body")).toMatchSnapshot();
		});

		it("should match snapshot for body with no menu", () => {
			render(
				<DetailsPageLayout titleHtml="Anything" {...sections}>
					Body content
				</DetailsPageLayout>
			);
			expect(screen.getByTestId("body")).toMatchSnapshot();
		});
	});
});
