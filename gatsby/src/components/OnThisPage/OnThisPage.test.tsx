import { render, screen } from "@testing-library/react";

import { OnThisPage, type OnThisPageProps } from "./OnThisPage";

describe("OnThisPage", () => {
	const props: OnThisPageProps = {
		sections: [
			{
				id: "test-1",
				title: "Test 1",
			},
			{
				id: "test-2",
				title: "Test 2",
			},
		],
	};

	it("should render nothing when there is only 1 section", () => {
		render(<OnThisPage sections={[props.sections[0]]} />);

		expect(screen.queryByRole("navigation")).toBeNull();
	});

	it("should render labelled navigation wrapper", () => {
		render(<OnThisPage {...props} />);

		expect(
			screen.getByRole("navigation", { name: "On this page" })
		).toBeInTheDocument();
	});

	it("should render a heading", () => {
		render(<OnThisPage {...props} />);

		expect(
			screen.getByRole("heading", { name: "On this page" })
		).toBeInTheDocument();
	});

	it("should render a list of items", () => {
		render(<OnThisPage {...props} />);
		expect(screen.getByRole("list")).toBeInTheDocument();
	});

	it("should render an anchor for each section", () => {
		render(<OnThisPage {...props} />);
		expect(screen.getAllByRole("link")).toHaveLength(props.sections.length);
	});

	it.todo("should highlight the currently visible section");
});
