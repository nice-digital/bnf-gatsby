import { render, screen, within } from "@testing-library/react";

import { DrugsInClass, type DrugsInClassProps } from "./DrugsInClass";

describe("DrugsInClass", () => {
	const minimumProps: DrugsInClassProps = {
		potName: "Other drugs in class",
		slug: "other-drugs-in-class",
		drug: {
			slug: "aclidinium-bromide-with-formoterol",
			title: "Aclidinium bromide with formoterol",
		},
		primaryClassification: {
			title: "Pharmacokinetic enhancers",
			slug: "pharmacokinetic-enhancers",
			drugs: [
				{
					title: "B drug",
					slug: "b-drug",
				},
				{
					title: "A drug",
					slug: "a-drug",
				},
			],
			order: 0,
		},
		secondaryClassifications: [
			{
				title: "HIV-integrase inhibitors",
				slug: "hiv-integrase-inhibitors",
				drugs: [
					{
						title: "C drug",
						slug: "c-drug",
					},
				],
				order: 0,
			},
		],
	};

	it("should render section with accessible name", () => {
		render(<DrugsInClass {...minimumProps} />);

		expect(
			screen.getByRole("region", { name: "Other drugs in class" })
		).toBeInTheDocument();
	});

	it("should render heading 2 with section name", () => {
		render(<DrugsInClass {...minimumProps} />);

		expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent(
			"Other drugs in class"
		);
	});

	it("should render primary drug class section with accessible name", () => {
		render(<DrugsInClass {...minimumProps} />);

		expect(
			screen.getByRole("region", {
				name: "Other drugs in class Pharmacokinetic enhancers",
			})
		).toBeInTheDocument();
	});

	it("should render secondary drug class section with accessible name", () => {
		render(<DrugsInClass {...minimumProps} />);

		expect(
			screen.getByRole("region", {
				name: "Other drugs in class HIV-integrase inhibitors",
			})
		).toBeInTheDocument();
	});

	it("should render heading 3 with primary drug class name", () => {
		render(<DrugsInClass {...minimumProps} />);

		expect(
			screen.getByRole("heading", {
				level: 3,
				name: "Other drugs in class Pharmacokinetic enhancers",
			})
		).toBeInTheDocument();
	});

	it("should render heading 3 with secondary drug class name", () => {
		render(<DrugsInClass {...minimumProps} />);

		expect(
			screen.getByRole("heading", {
				level: 3,
				name: "Other drugs in class HIV-integrase inhibitors",
			})
		).toBeInTheDocument();
	});

	it("should render list of primary drugs with accessible name", () => {
		render(<DrugsInClass {...minimumProps} />);

		expect(
			screen.getByRole("list", {
				name: "Other drugs in class Pharmacokinetic enhancers",
			})
		).toBeInTheDocument();
	});

	it("should render list of secondary drugs with accessible name", () => {
		render(<DrugsInClass {...minimumProps} />);

		expect(
			screen.getByRole("list", {
				name: "Other drugs in class HIV-integrase inhibitors",
			})
		).toBeInTheDocument();
	});

	it("should render list item and anchor for each drug", () => {
		render(<DrugsInClass {...minimumProps} />);

		const list = screen.getByRole("list", {
			name: "Other drugs in class Pharmacokinetic enhancers",
		});

		expect(within(list).getAllByRole("listitem")).toHaveLength(2);
		expect(within(list).getAllByRole("link")).toHaveLength(2);
	});

	it("should order drugs alphabetically", () => {
		render(<DrugsInClass {...minimumProps} />);

		const list = screen.getByRole("list", {
			name: "Other drugs in class Pharmacokinetic enhancers",
		});

		expect(within(list).getAllByRole("listitem")).toHaveLength(2);
		expect(
			within(list)
				.getAllByRole("link")
				.map((l) => l.textContent)
		).toStrictEqual(["A drug", "B drug"]);
	});

	it("should link drug to correct URL", () => {
		render(<DrugsInClass {...minimumProps} />);

		expect(screen.getByRole("link", { name: "A drug" })).toHaveAttribute(
			"href",
			"/drugs/a-drug/"
		);
	});
});
