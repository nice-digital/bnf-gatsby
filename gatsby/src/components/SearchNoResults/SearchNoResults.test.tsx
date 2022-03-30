import { render } from "@testing-library/react";

import { useSiteMetadata } from "@/hooks/useSiteMetadata";

import { SearchNoResults } from "./SearchNoResults";

const useSiteMetadataMock = useSiteMetadata as jest.Mock;

describe("SearchNoResults", () => {
	it("should match snapshot for BNF site", () => {
		useSiteMetadataMock.mockImplementationOnce(() => ({ isBNF: true }));

		render(<SearchNoResults searchText="aspirin" />);

		expect(document.body).toMatchSnapshot();
	});

	it("should match snapshot for BNFC site", () => {
		useSiteMetadataMock.mockImplementationOnce(() => ({ isBNF: false }));

		render(<SearchNoResults searchText="aspirin" />);

		expect(document.body).toMatchSnapshot();
	});
});
