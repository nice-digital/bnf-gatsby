import { render, screen } from "@testing-library/react";
import { useStaticQuery } from "gatsby";

import { Hero, type LastUpdatedDataQueryResult } from "@/components/Hero/Hero";

const metaDataQueryResult: LastUpdatedDataQueryResult = {
	bnfMetadata: {
		lastUpdatedDate: "2022-04-06T00:38:57.911",
		lastUpdatedDateFormatted: "6 April 2022",
		runTag: "2022_04_06_0037_bnf",
	},
};

const useStaticQueryMock = useStaticQuery as jest.Mock;

beforeAll(() => {
	useStaticQueryMock.mockReturnValue(metaDataQueryResult);
});

describe("Hero", () => {
	it("should match snapshot for BNF", () => {
		render(<Hero isBNF={true} />);
		screen.getByRole("heading", {
			name: "British National Formulary (BNF)",
		});
	});

	it("should match snapshot for BNFC", () => {
		render(<Hero isBNF={false} />);
		expect(
			screen.getByRole("heading", {
				name: "British National Formulary for Children (BNFC)",
			})
		).toMatchSnapshot();
	});

	it("should render the last updated date", () => {
		render(<Hero isBNF={false} />);
		expect(screen.getByText("6 April 2022")).toHaveProperty("tagName", "TIME");
	});

	it("should render the last updated date datetime attribute", () => {
		render(<Hero isBNF={false} />);
		expect(screen.getByText("6 April 2022")).toHaveAttribute(
			"datetime",
			metaDataQueryResult.bnfMetadata.lastUpdatedDate
		);
	});

	it("should match snapshot for query", async () => {
		render(<Hero isBNF={false} />);
		const queryArgument = useStaticQueryMock.mock.calls[0][0];
		expect(queryArgument).toMatchInlineSnapshot(`
		"
			query LastUpdatedQuery {
				bnfMetadata {
					lastUpdatedDateFormatted: exportStarted(formatString: \\"D MMMM YYYY\\")
					lastUpdatedDate: exportStarted
					runTag
				}
			}
		"
	`);
	});
});
