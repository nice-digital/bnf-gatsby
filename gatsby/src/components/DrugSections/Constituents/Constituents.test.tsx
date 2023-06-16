import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { navigate } from "gatsby";

import { Constituents, type ConstituentsProps } from "./Constituents";

describe("Constituents", () => {
	const props: ConstituentsProps = {
		potName: "Constituent drugs",
		slug: "constituent-drugs",
		message:
			"The properties listed <em>below</em> are those particular to the combination only",
		constituents: [
			{
				title: "bimatoprost",
				slug: "bimatoprost",
			},
			{
				title: "<em>timolol</em> maleate",
				slug: "timolol-maleate",
			},
		],
	};

	it("should render section with accessible name", () => {
		render(<Constituents {...props} />);

		expect(
			screen.getByRole("region", { name: "Constituent drugs" })
		).toBeInTheDocument();
	});

	it("should render heading 2 with section name", () => {
		render(<Constituents {...props} />);

		expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent(
			"Constituent drugs"
		);
	});

	it("should render message as HTML", () => {
		render(<Constituents {...props} />);

		expect(
			screen.getByText(
				(_content, node) =>
					node?.textContent ===
					"The properties listed below are those particular to the combination only",
				{ selector: "p" }
			)
		).toBeInTheDocument();
	});

	it("should list with accessible name", () => {
		render(<Constituents {...props} />);

		expect(
			screen.getByRole("list", { name: "Constituent drugs" })
		).toBeInTheDocument();
	});

	it("should render link to drug monograph page for each constituent", () => {
		render(<Constituents {...props} />);

		expect(screen.getAllByRole("link")).toHaveLength(2);
	});

	it("should render drug HTML name as link text", () => {
		render(<Constituents {...props} />);

		expect(
			screen.getByRole("link", { name: "timolol maleate" })
		).toBeInTheDocument();
	});

	it("should link to drug monograph page", () => {
		render(<Constituents {...props} />);

		expect(
			screen.getByRole("link", { name: "timolol maleate" })
		).toHaveAttribute("href", "/drugs/timolol-maleate/");
	});

	it("should use Gatsbys links component for mongraph links", async () => {
		render(<Constituents {...props} />);

		userEvent.click(screen.getByRole("link", { name: "bimatoprost" }));
		await waitFor(() => {
			expect(navigate).toHaveBeenCalledWith("/drugs/bimatoprost/");
		});
	});

	it("should match snapshot", () => {
		render(<Constituents {...props} />);

		expect(
			screen.getByRole("region", { name: "Constituent drugs" })
		).toMatchSnapshot();
	});
});
