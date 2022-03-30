import { render, screen, within } from "@testing-library/react";

import { SimplePot, type SimplePotProps } from "./SimplePot";

describe("SimplePot", () => {
	const minimumProps: SimplePotProps = {
		potName: "A <em>simple</em> pot",
		slug: "simple-pot",
		drugClassContent: [],
		drugContent: null,
		prepContent: [],
	};

	it("should render section with accessible name", () => {
		render(<SimplePot {...minimumProps} />);

		expect(
			screen.getByRole("region", { name: "A simple pot" })
		).toBeInTheDocument();
	});

	it("should render heading 2 with HTML section name", () => {
		render(<SimplePot {...minimumProps} />);

		expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent(
			"A simple pot"
		);
	});

	describe.each([
		["drug class", "drugClassContent", "For all"],
		["prep", "prepContent", "For"],
	])("%s content", (name, propsProperty, headingPrefix) => {
		const props: SimplePotProps = {
			...minimumProps,
			[propsProperty]: [
				{
					contentFor: "first",
					content: "<p>Some content</p>",
				},
				{
					contentFor: "second",
					content: "<p>Some more content</p>",
				},
			],
		};

		it(`should render heading 3 for each ${name} content`, () => {
			render(<SimplePot {...props} />);

			expect(
				screen.getAllByRole("heading", {
					level: 3,
				})
			).toHaveLength(2);
		});

		it(`should prefix heading text with '${headingPrefix}'`, () => {
			render(<SimplePot {...props} />);

			expect(
				screen
					.getAllByRole("heading", {
						level: 3,
					})
					.map((node) => node.textContent)
			).toStrictEqual([
				`A simple pot ${headingPrefix} first`,
				`A simple pot ${headingPrefix} second`,
			]);
		});

		it("should render visible heading", () => {
			render(<SimplePot {...props} />);

			expect(
				screen.getAllByRole("heading", {
					level: 3,
				})[0]
			).not.toHaveClass("visually-hidden");
		});

		it(`should render section for each ${name} content`, () => {
			render(<SimplePot {...props} />);

			const outerSection = screen.getByRole("region", {
				name: "A simple pot",
			});

			expect(within(outerSection).getAllByRole("region")).toHaveLength(2);
		});

		it(`should render ${name} section with accessible name prefixed with '${headingPrefix}'`, () => {
			render(<SimplePot {...props} />);

			expect(
				screen.getByRole("region", {
					name: `A simple pot ${headingPrefix} first`,
				})
			).toBeInTheDocument();
		});

		it("should render pot content as HTML", () => {
			render(<SimplePot {...props} />);

			expect(screen.getByText("Some content")).toHaveProperty("tagName", "P");
		});
	});

	describe("drug content", () => {
		const drugProps: SimplePotProps = {
			...minimumProps,
			drugContent: {
				contentFor: "budesonide",
				content: "<p>Some drug content</p>",
			},
		};

		it("should render heading 3 for drug content", () => {
			render(<SimplePot {...drugProps} />);

			expect(
				screen.getAllByRole("heading", {
					level: 3,
				})
			).toHaveLength(1);
		});

		it("should prefix heading text with 'For'", () => {
			render(<SimplePot {...drugProps} />);

			expect(
				screen.getByRole("heading", {
					level: 3,
				})
			).toHaveTextContent("A simple pot For budesonide");
		});

		it("should visually hide drug heading when no drug class or prep content", () => {
			render(<SimplePot {...drugProps} />);

			expect(
				screen.getByRole("heading", { name: "A simple pot For budesonide" })
			).toHaveClass("visually-hidden");
		});

		it("should not visually hide drug heading when there is at least 1 drug class content", () => {
			render(
				<SimplePot
					{...drugProps}
					drugClassContent={[
						{ content: "any content", contentFor: "corticosteroids" },
					]}
				/>
			);

			expect(
				screen.getByRole("heading", { name: "A simple pot For budesonide" })
			).not.toHaveClass("visually-hidden");
		});

		it("should not visually hide drug heading when there is at least 1 prep content", () => {
			render(
				<SimplePot
					{...drugProps}
					prepContent={[
						{ content: "any content", contentFor: "Rhinocort Aqua®" },
					]}
				/>
			);

			expect(
				screen.getByRole("heading", { name: "A simple pot For budesonide" })
			).not.toHaveClass("visually-hidden");
		});

		it("should render section for drug content", () => {
			render(<SimplePot {...drugProps} />);

			const outerSection = screen.getByRole("region", {
				name: "A simple pot",
			});

			expect(within(outerSection).getAllByRole("region")).toHaveLength(1);
		});

		it("should render drug section with accessible name prefixed with 'for'", () => {
			render(<SimplePot {...drugProps} />);

			expect(
				screen.getByRole("region", {
					name: "A simple pot For budesonide",
				})
			).toBeInTheDocument();
		});

		it("should render pot content as HTML", () => {
			render(<SimplePot {...drugProps} />);

			expect(screen.getByText("Some drug content")).toHaveProperty(
				"tagName",
				"P"
			);
		});
	});
});
