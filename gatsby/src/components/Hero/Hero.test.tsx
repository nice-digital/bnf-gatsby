import { render, screen } from "@testing-library/react";
import * as Gatsby from "gatsby";

import { Hero, type LastUpdatedDataQueryResult } from "@/components/Hero/Hero";

const metaDataQueryResult: LastUpdatedDataQueryResult = {
	bnfMetadata: {
		lastUpdatedDate: "2022-04-06T00:38:57.911",
		lastUpdatedDateFormatted: "6 April 2022",
		runTag: "2022_04_06_0037_bnf",
	},
};

const useStaticQuery = jest.spyOn(Gatsby, "useStaticQuery");

beforeAll(() => {
	useStaticQuery.mockImplementation(() => metaDataQueryResult);
});

beforeEach(() => {
	jest.clearAllMocks();
});

describe("Hero", () => {
	it("should match snapshot for BNF", () => {
		render(<Hero isBNF={true} />);
		screen.getByRole("heading", {
			name: /british national formulary \(bnf\)/i,
		});
	});

	it("should match snapshot for BNFC", () => {
		render(<Hero isBNF={false} />);
		expect(
			screen.getByRole("heading", {
				name: /british national formulary for children \(bnfc\)/i,
			})
		).toMatchSnapshot();
	});

	it.only("should match snapshot for query", async () => {
		render(<Hero isBNF={false} />);
		const calls = useStaticQuery.mock.calls[0][0];
		expect(calls).toMatchInlineSnapshot(`
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
		expect(useStaticQuery).toMatchSnapshot();
	});
});
