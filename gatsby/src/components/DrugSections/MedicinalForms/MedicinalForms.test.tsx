import { render, screen } from "@testing-library/react";

import { MedicinalForms, type MedicinalFormsProps } from "./MedicinalForms";

describe("MedicinalForms", () => {
	const props: MedicinalFormsProps = {
		drug: {
			slug: "anti-d-rh0-immunoglobulin",
			title: "anti-d (rh<sub>0</sub>) immunoglobulin",
		},
		potName: "Medicinal forms",
		slug: "medicinal-forms",
		initialStatement: "<em>No</em> licensed medicines listed.",
		specialOrderManufacturersStatement: null,
		medicinalForms: [
			{
				form: "Tablets",
				slug: "tablets",
			},
			{
				form: "Eye drops",
				slug: "eye-drops",
			},
		],
	};

	it("should render section with accessible name", () => {
		render(<MedicinalForms {...props} />);

		expect(
			screen.getByRole("region", { name: "Medicinal forms" })
		).toBeInTheDocument();
	});

	it("should render heading 2 with section name", () => {
		render(<MedicinalForms {...props} />);

		expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent(
			"Medicinal forms"
		);
	});

	it("should match snapshot", () => {
		const { container } = render(<MedicinalForms {...props} />);

		expect(container).toMatchSnapshot();
	});
});
