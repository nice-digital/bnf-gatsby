import { render, screen, within } from "@testing-library/react";

import {
	ImportantSafetyInfo,
	type ImportantSafetyInfoProps,
} from "./ImportantSafetyInfo";

describe("ImportantSafetyInfo", () => {
	const minimumProps: ImportantSafetyInfoProps = {
		potName: "Important safety information",
		slug: "important-safety-information",
	};

	it("should render section with accessible name", () => {
		render(<ImportantSafetyInfo {...minimumProps} />);

		expect(
			screen.getByRole("region", { name: "Important safety information" })
		).toBeInTheDocument();
	});

	it("should render heading 2 with section name", () => {
		render(<ImportantSafetyInfo {...minimumProps} />);

		expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent(
			"Important safety information"
		);
	});

	describe.each([
		["drug class", "drugClassContent", "For all"],
		["prep", "prepContent", "For"],
	])("%s content", (name, propsProperty, headingPrefix) => {
		const props: ImportantSafetyInfoProps = {
			...minimumProps,
			[propsProperty]: [
				{
					contentFor: "first",
					slug: "first",
					content: "<p>Some content</p>",
				},
				{
					contentFor: "second",
					slug: "second",
					content: "<p>Some more content</p>",
				},
			],
		};

		it(`should match snapshot for ${name} content`, () => {
			render(<ImportantSafetyInfo {...props} />);

			expect(
				screen.getByRole("region", {
					name: "Important safety information",
				})
			).toMatchSnapshot();
		});

		it(`should render heading 3 for each ${name} content`, () => {
			render(<ImportantSafetyInfo {...props} />);

			expect(
				screen.getAllByRole("heading", {
					level: 3,
				})
			).toHaveLength(2);
		});

		it(`should prefix heading text with '${headingPrefix}'`, () => {
			render(<ImportantSafetyInfo {...props} />);

			expect(
				screen
					.getAllByRole("heading", {
						level: 3,
					})
					.map((node) => node.textContent)
			).toStrictEqual([
				`Important safety information ${headingPrefix} first`,
				`Important safety information ${headingPrefix} second`,
			]);
		});

		it("should render visible heading", () => {
			render(<ImportantSafetyInfo {...props} />);

			expect(
				screen.getAllByRole("heading", {
					level: 3,
				})[0]
			).not.toHaveClass("visually-hidden");
		});

		it(`should render section for each ${name} content`, () => {
			render(<ImportantSafetyInfo {...props} />);

			const outerSection = screen.getByRole("region", {
				name: "Important safety information",
			});

			expect(within(outerSection).getAllByRole("region")).toHaveLength(2);
		});

		it(`should render ${name} section with accessible name prefixed with '${headingPrefix}'`, () => {
			render(<ImportantSafetyInfo {...props} />);

			expect(
				screen.getByRole("region", {
					name: `Important safety information ${headingPrefix} first`,
				})
			).toBeInTheDocument();
		});

		it("should render pot content as HTML", () => {
			render(<ImportantSafetyInfo {...props} />);

			expect(screen.getByText("Some content")).toHaveProperty("tagName", "P");
		});
	});

	describe("drug content", () => {
		const drugProps: ImportantSafetyInfoProps = {
			...minimumProps,
			drugContent: {
				contentFor: "budesonide",
				slug: "budesonide",
				content: "<p>Some drug content</p>",
			},
		};

		it("should match snapshot for drug content", () => {
			render(<ImportantSafetyInfo {...drugProps} />);

			expect(
				screen.getByRole("region", {
					name: "Important safety information",
				})
			).toMatchSnapshot();
		});

		it("should render heading 3 for drug content", () => {
			render(<ImportantSafetyInfo {...drugProps} />);

			expect(
				screen.getAllByRole("heading", {
					level: 3,
				})
			).toHaveLength(1);
		});

		it("should prefix heading text with 'For'", () => {
			render(<ImportantSafetyInfo {...drugProps} />);

			expect(
				screen.getByRole("heading", {
					level: 3,
				})
			).toHaveTextContent("For budesonide");
		});

		it("should visually hide drug heading when no drug class or prep content", () => {
			render(<ImportantSafetyInfo {...drugProps} />);

			expect(
				screen.getByText(
					(_content, node) =>
						node?.textContent === "Important safety information For budesonide"
				)
			).toHaveClass("visually-hidden");
		});

		it("should not visually hide drug heading when there is at least 1 drug class content", () => {
			render(
				<ImportantSafetyInfo
					{...drugProps}
					drugClassContent={[
						{
							content: "any content",
							contentFor: "corticosteroids",
							slug: "corticosteroids",
						},
					]}
				/>
			);

			expect(screen.getByText("For budesonide")).not.toHaveClass(
				"visually-hidden"
			);
		});

		it("should not visually hide drug heading when there is at least 1 prep content", () => {
			render(
				<ImportantSafetyInfo
					{...drugProps}
					prepContent={[
						{
							content: "any content",
							contentFor: "Rhinocort Aqua®",
							slug: "rhinocort-aqua",
						},
					]}
				/>
			);

			expect(screen.getByText("For budesonide")).not.toHaveClass(
				"visually-hidden"
			);
		});

		it("should render section for drug content", () => {
			render(<ImportantSafetyInfo {...drugProps} />);

			const outerSection = screen.getByRole("region", {
				name: "Important safety information",
			});

			expect(within(outerSection).getAllByRole("region")).toHaveLength(1);
		});

		it("should render drug section with accessible name prefixed with 'for'", () => {
			render(<ImportantSafetyInfo {...drugProps} />);

			expect(
				screen.getByRole("region", {
					name: "Important safety information For budesonide",
				})
			).toBeInTheDocument();
		});

		it("should render pot content as HTML", () => {
			render(<ImportantSafetyInfo {...drugProps} />);

			expect(screen.getByText("Some drug content")).toHaveProperty(
				"tagName",
				"P"
			);
		});
	});
});
