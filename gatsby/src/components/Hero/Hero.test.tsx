import { render, screen } from "@testing-library/react";
// import { graphql } from "gatsby";
import * as Gatsby from "gatsby";

import { Hero, type LastUpdatedDataQueryResult } from "@/components/Hero/Hero";

// export const mockLastUpdatedDataQueryData: LastUpdatedDataQueryResult = {
// 	bnfMetadata: {
// 		lastUpdatedDate: "2022-04-06T00:38:57.911",
// 		lastUpdatedDateFormatted: "6 April 2022",
// 		runTag: "2022_04_06_0037_bnf",
// 	},
// };

// (useStaticQuery as jest.Mock).mockReturnValue(mockLastUpdatedDataQueryData);

const metaDataQueryResult: LastUpdatedDataQueryResult = {
	bnfMetadata: {
		lastUpdatedDate: "2022-04-06T00:38:57.911",
		lastUpdatedDateFormatted: "6 April 2022",
		runTag: "2022_04_06_0037_bnf",
	},
};

const useStaticQuery = jest.spyOn(Gatsby, "useStaticQuery");

useStaticQuery.mockImplementation(() => metaDataQueryResult);

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
	it.todo("test query args?");

	it("should match snapshot for BNFC", () => {
		render(<Hero isBNF={false} />);
		expect(
			screen.getByRole("heading", {
				name: /british national formulary for children \(bnfc\)/i,
			})
		).toMatchSnapshot();
	});

	it.only("test query args?", async () => {
		render(<Hero isBNF={false} />);
		expect(useStaticQuery).toHaveBeenCalledWith({ bob: "bob" });
		expect(useStaticQuery).toMatchSnapshot();
	});
});
