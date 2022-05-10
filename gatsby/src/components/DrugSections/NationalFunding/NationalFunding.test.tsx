import { screen, render } from "@testing-library/react";

import { type FeedFundingDecision } from "@nice-digital/gatsby-source-bnf";

import { type QueryResult } from "@/utils";

import { NationalFunding, type NationalFundingProps } from "./NationalFunding";

describe("NationalFunding", () => {
	const mockDecision: QueryResult<FeedFundingDecision> = {
		title: "A mock decision",
		fundingIdentifier: "ABC123",
		url: "https://funding-decision.com",
		approvedForUse: "Recommended",
	};

	const drugContent: NationalFundingProps["drugContent"] = {
		contentFor: "diazepam",
		initialText: "For full details see funding body website.",
		awmsgDecisions: [],
		awmsgDecisionsTitle: "All Wales Medicines Strategy Group (AWMSG) decisions",
		niceDecisions: [],
		niceDecisionsTitle: "NICE decisions",
		nonNhs: null,
		nonNhsTitle: "NHS restrictions",
		smcDecisions: [],
		smcDecisionsTitle: "Scottish Medicines Consortium (SMC) decisions",
	};

	const minimumProps: NationalFundingProps = {
		potName: "National funding/access decisions",
		slug: "national-funding-access-decisions",
		drugContent: drugContent,
		drugClassContent: [],
		prepContent: [],
	};

	it("should render section with accessible name", () => {
		render(<NationalFunding {...minimumProps} />);

		expect(
			screen.getByRole("region", { name: "National funding/access decisions" })
		).toBeInTheDocument();
	});

	it("should render heading 2 with HTML section name", () => {
		render(<NationalFunding {...minimumProps} />);

		expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent(
			"National funding/access decisions"
		);
	});

	it("should render section with accessible name for drug content", () => {
		render(<NationalFunding {...minimumProps} />);

		expect(
			screen.getByRole("region", {
				name: "National funding/access decisions For diazepam",
			})
		).toBeInTheDocument();
	});

	it("should render heading 3 for drug content", () => {
		render(<NationalFunding {...minimumProps} />);

		expect(
			screen.getByRole("heading", {
				level: 3,
				name: "National funding/access decisions For diazepam",
			})
		).toBeInTheDocument();
	});

	it("should render initial text", () => {
		render(<NationalFunding {...minimumProps} />);

		expect(
			screen.getByText("For full details see funding body website.", {
				selector: "p",
			})
		).toBeInTheDocument();
	});

	it.each<[string, "niceDecisions" | "awmsgDecisions" | "smcDecisions"]>([
		["NICE", "niceDecisions"],
		["AWMSG", "awmsgDecisions"],
		["SMC", "smcDecisions"],
	])("should render %s decisions section", (_name, fieldName) => {
		render(
			<NationalFunding
				{...minimumProps}
				drugContent={{ ...drugContent, [fieldName]: [mockDecision] }}
			/>
		);

		const expectedHeading = drugContent[`${fieldName}Title`] + " For diazepam";

		expect(
			screen.getByRole("heading", {
				name: expectedHeading,
				level: 4,
			})
		).toBeInTheDocument();

		expect(
			screen.getByRole("region", {
				name: expectedHeading,
			})
		).toBeInTheDocument();
	});

	it("should render NHS restrictions section", () => {
		render(
			<NationalFunding
				{...minimumProps}
				drugContent={{
					...drugContent,
					nonNhs:
						"<p>Alprazolam tablets are not prescribable in NHS primary care.</p>",
				}}
			/>
		);

		expect(
			screen.getByRole("heading", {
				name: "NHS restrictions",
				level: 4,
			})
		).toBeInTheDocument();

		expect(
			screen.getByRole("region", {
				name: "NHS restrictions",
			})
		).toBeInTheDocument();

		expect(
			screen.getByText(
				"Alprazolam tablets are not prescribable in NHS primary care."
			)
		).toHaveProperty("tagName", "P");
	});
});
