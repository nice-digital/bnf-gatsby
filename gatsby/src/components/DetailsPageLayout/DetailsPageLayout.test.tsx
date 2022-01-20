/* eslint-disable testing-library/no-render-in-setup */
/* eslint-disable testing-library/no-node-access */
import { render, screen, waitFor, within } from "@testing-library/react";

import { DetailsPageLayout } from "./DetailsPageLayout";

describe("DetailsPageLayout", () => {
	describe("SEO", () => {
		beforeEach(() => {
			render(
				<DetailsPageLayout
					menu={() => null}
					titleHtml="FAQs for BNF <em>for Children</em> — general"
					parentTitleParts={["Parent", "Grandparent"]}
					metaDescription="A test meta"
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
				<DetailsPageLayout menu={() => null} titleHtml="Anything">
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
				<DetailsPageLayout menu={() => null} titleHtml="Some <b>title</b>">
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
	});

	describe("Body", () => {
		it("should match snapshot for body", () => {
			render(
				<DetailsPageLayout menu={() => <>Menu</>} titleHtml="Anything">
					Body content
				</DetailsPageLayout>
			);
			expect(screen.getByTestId("body")).toMatchSnapshot();
		});
	});
});
