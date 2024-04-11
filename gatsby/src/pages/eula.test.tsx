import { render } from "@testing-library/react";
import React from "react";

import EULAPage from "./eula";

describe("EULA page", () => {
	it("should match snapshot", () => {
		const { container } = render(<EULAPage />);

		expect(container).toMatchSnapshot();
	});
});
