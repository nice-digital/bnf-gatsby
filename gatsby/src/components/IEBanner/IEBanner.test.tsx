import { render } from "@testing-library/react";

import { IEBanner } from "@/components/IEBanner/IEBanner";

describe("IEBanner", () => {
	it("should match snapshot", () => {
		const { container } = render(<IEBanner />);
		expect(container).toMatchSnapshot();
	});
});
