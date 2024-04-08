import { render } from "@testing-library/react";
import React from "react";

import { useSiteMetadata } from "@/hooks/useSiteMetadata";

import { EULAPanel } from "./EULAPanel";

const useSiteMetadataMock = useSiteMetadata as jest.Mock;

describe("EULA panel", () => {
	it("should match snapshot for BNF site", () => {
		useSiteMetadataMock.mockImplementationOnce(() => ({ isBNF: true }));

		const { container } = render(<EULAPanel />);

		expect(container).toMatchSnapshot();
	});

	it("should match snapshot for BNFC site", () => {
		useSiteMetadataMock.mockImplementationOnce(() => ({ isBNF: false }));

		const { container } = render(<EULAPanel />);

		expect(container).toMatchSnapshot();
	});
});
