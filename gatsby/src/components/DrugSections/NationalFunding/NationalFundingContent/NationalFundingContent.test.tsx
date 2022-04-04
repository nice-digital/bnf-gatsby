import { screen, render } from "@testing-library/react";

import {
	NationalFundingContent,
	type NationalFundingContentProps,
} from "./NationalFundingContent";

describe("NationalFundingContent", () => {
	const props: NationalFundingContentProps = {
		heading: "<strong>NICE</strong> decisions",
		slug: "nice-decisions",
		decisions: [
			{
				fundingIdentifier: "NICE TA187",
				title: "Infliximab and adalimumab for Crohn’s disease (May 2010)",
				url: "http://www.nice.org.uk/guidance/ta187",
				approvedForUse: "Recommended",
			},
			{
				fundingIdentifier: "NICE TA329",
				title:
					"Infliximab, adalimumab and golimumab for treating moderately to severely active ulcerative colitis after the failure of conventional therapy (February 2015)",
				url: "Infliximab, adalimumab and golimumab for treating moderately to severely active ulcerative colitis after the failure of conventional therapy (February 2015)",
				approvedForUse: "Recommended with restrictions",
			},
		],
	};

	beforeEach(() => {
		// eslint-disable-next-line testing-library/no-render-in-setup
		render(<NationalFundingContent {...props} />);
	});

	it("should render section with accessible name", () => {
		expect(
			screen.getByRole("region", { name: "NICE decisions" })
		).toBeInTheDocument();
	});

	it("should render heading 4 with heading content", () => {
		expect(screen.getByRole("heading", { level: 4 })).toHaveTextContent(
			"NICE decisions"
		);
	});

	it("should render list decision list with accessible name", () => {
		expect(
			screen.getByRole("list", { name: "NICE decisions" })
		).toBeInTheDocument();
	});

	it("should render list item per decision", () => {
		expect(screen.getAllByRole("listitem")).toHaveLength(2);
	});

	it("should render link per decision", () => {
		expect(screen.getAllByRole("link")).toHaveLength(2);
	});

	it("should render decision link to given URL", () => {
		expect(screen.getByText("NICE TA187")).toHaveAttribute(
			"href",
			"http://www.nice.org.uk/guidance/ta187"
		);
	});

	it("should match snapshot", () => {
		expect(
			screen.getByRole("region", { name: "NICE decisions" })
		).toMatchSnapshot();
	});
});
