import { render, screen, within } from "@testing-library/react";

import { FeedBasePotContent } from "@nice-digital/gatsby-source-bnf";

import { PotSection, type PotSectionProps } from "./PotSection";

interface CustomPot extends FeedBasePotContent {
	something: string;
}

describe("PotSection", () => {
	const minimumProps: PotSectionProps<CustomPot> = {
		potName: "A <em>simple</em> pot",
		slug: "simple-pot",
		drugClassContent: [],
		drugContent: null,
		prepContent: [],
		children: ({ content }) => <p>{content.something}</p>,
	};

	it("should render section with accessible name", () => {
		render(<PotSection {...minimumProps} />);

		expect(
			screen.getByRole("region", { name: "A simple pot" })
		).toBeInTheDocument();
	});

	it("should render heading 2 with HTML section name", () => {
		render(<PotSection {...minimumProps} />);

		expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent(
			"A simple pot"
		);
	});

	describe.each([
		["drug class", "drugClassContent", "For all"],
		["prep", "prepContent", "For"],
	])("%s content", (name, propsProperty, headingPrefix) => {
		const props: PotSectionProps<CustomPot> = {
			...minimumProps,
			[propsProperty]: [
				{
					contentFor: "first",
					something: "Some content",
				},
				{
					contentFor: "second",
					something: "Some more content",
				},
			],
		};

		it(`should render heading 3 for each ${name} content`, () => {
			render(<PotSection {...props} />);

			expect(
				screen.getAllByRole("heading", {
					level: 3,
				})
			).toHaveLength(2);
		});

		it(`should prefix heading text with '${headingPrefix}'`, () => {
			render(<PotSection {...props} />);

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
			render(<PotSection {...props} />);

			expect(
				screen.getAllByRole("heading", {
					level: 3,
				})[0]
			).not.toHaveClass("visually-hidden");
		});

		it(`should render section for each ${name} content`, () => {
			render(<PotSection {...props} />);

			const outerSection = screen.getByRole("region", {
				name: "A simple pot",
			});

			expect(within(outerSection).getAllByRole("region")).toHaveLength(2);
		});

		it(`should render ${name} section with accessible name prefixed with '${headingPrefix}'`, () => {
			render(<PotSection {...props} />);

			expect(
				screen.getByRole("region", {
					name: `A simple pot ${headingPrefix} first`,
				})
			).toBeInTheDocument();
		});

		it("should render pot content as HTML", () => {
			render(<PotSection {...props} />);

			expect(screen.getByText("Some content")).toHaveProperty("tagName", "P");
		});
	});

	describe("drug content", () => {
		const drugProps: PotSectionProps<CustomPot> = {
			...minimumProps,
			drugContent: {
				contentFor: "budesonide",
				something: "Some drug content",
			},
		};

		it("should render heading 3 for drug content", () => {
			render(<PotSection {...drugProps} />);

			expect(
				screen.getAllByRole("heading", {
					level: 3,
				})
			).toHaveLength(1);
		});

		it("should prefix heading text with 'For'", () => {
			render(<PotSection {...drugProps} />);

			expect(
				screen.getByRole("heading", {
					level: 3,
				})
			).toHaveTextContent("A simple pot For budesonide");
		});

		it("should visually hide drug heading when no drug class or prep content", () => {
			render(<PotSection {...drugProps} />);

			expect(
				screen.getByRole("heading", { name: "A simple pot For budesonide" })
			).toHaveClass("visually-hidden");
		});

		it("should not visually hide drug heading when there is at least 1 drug class content", () => {
			render(
				<PotSection
					{...drugProps}
					drugClassContent={[
						{ contentFor: "corticosteroids", something: "any content" },
					]}
				/>
			);

			expect(
				screen.getByRole("heading", { name: "A simple pot For budesonide" })
			).not.toHaveClass("visually-hidden");
		});

		it("should not visually hide drug heading when there is at least 1 prep content", () => {
			render(
				<PotSection
					{...drugProps}
					prepContent={[
						{ contentFor: "Rhinocort Aqua®", something: "any content" },
					]}
				/>
			);

			expect(
				screen.getByRole("heading", { name: "A simple pot For budesonide" })
			).not.toHaveClass("visually-hidden");
		});

		it("should render section for drug content", () => {
			render(<PotSection {...drugProps} />);

			const outerSection = screen.getByRole("region", {
				name: "A simple pot",
			});

			expect(within(outerSection).getAllByRole("region")).toHaveLength(1);
		});

		it("should render drug section with accessible name prefixed with 'for'", () => {
			render(<PotSection {...drugProps} />);

			expect(
				screen.getByRole("region", {
					name: "A simple pot For budesonide",
				})
			).toBeInTheDocument();
		});

		it("should render pot content as HTML", () => {
			render(<PotSection {...drugProps} />);

			expect(screen.getByText("Some drug content")).toHaveProperty(
				"tagName",
				"P"
			);
		});
	});
});
