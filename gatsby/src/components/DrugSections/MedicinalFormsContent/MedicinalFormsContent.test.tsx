import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { navigate } from "gatsby";

import {
	MedicinalFormsContent,
	type MedicinalFormsContentProps,
} from "./MedicinalFormsContent";

describe("MedicinalFormsContent", () => {
	const minimumProps: MedicinalFormsContentProps = {
		drug: {
			slug: "anti-d-rh0-immunoglobulin",
			title: "anti-d (rh<sub>0</sub>) immunoglobulin",
		},
		initialStatement: "<em>No</em> licensed medicines listed.",
		medicinalForms: [],
		specialOrderManufacturersStatement: null,
	};

	it("should render HTML initial statement", () => {
		render(<MedicinalFormsContent {...minimumProps} />);

		expect(
			screen.getByText(
				(_content, node) =>
					node?.tagName === "P" &&
					node?.textContent === "No licensed medicines listed."
			)
		).toBeInTheDocument();
	});

	it("should render HTML special order manufacturers statement when present", () => {
		render(
			<MedicinalFormsContent
				{...minimumProps}
				specialOrderManufacturersStatement="<strong>A</strong> test"
			/>
		);

		expect(
			screen.getByText((_content, node) => node?.textContent === "A test")
		).toHaveProperty("tagName", "P");
	});

	it("should not render link or list when there are no medicinal forms", () => {
		render(<MedicinalFormsContent {...minimumProps} />);

		expect(screen.queryByRole("list")).toBeNull();
		expect(screen.queryAllByRole("link")).toHaveLength(0);
	});

	describe("forms", () => {
		const propsWithForms: MedicinalFormsContentProps = {
			...minimumProps,
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

		it("should render Gatsby link to medicinal forms page with only 1 form", () => {
			render(
				<MedicinalFormsContent
					{...minimumProps}
					medicinalForms={[{ form: "Any", slug: "any" }]}
				/>
			);

			const link = screen.getByRole("link", {
				name: "View medicinal forms and pricing\xa0information",
			});

			userEvent.click(link);

			expect(link).toHaveAttribute(
				"href",
				"/drugs/anti-d-rh0-immunoglobulin/medicinal-forms/"
			);
			expect(navigate).toHaveBeenCalledWith(
				"/drugs/anti-d-rh0-immunoglobulin/medicinal-forms/"
			);
		});

		it("should render Gatsby link to medicinal forms page with 2 or more forms", () => {
			render(<MedicinalFormsContent {...propsWithForms} />);

			const link = screen.getByRole("link", {
				name: "View all medicinal forms and pricing\xa0information",
			});

			userEvent.click(link);

			expect(link).toHaveAttribute(
				"href",
				"/drugs/anti-d-rh0-immunoglobulin/medicinal-forms/"
			);
			expect(navigate).toHaveBeenCalledWith(
				"/drugs/anti-d-rh0-immunoglobulin/medicinal-forms/"
			);
		});

		it("should not render forms list when there is only 1 form", () => {
			render(
				<MedicinalFormsContent
					{...minimumProps}
					medicinalForms={[{ form: "Any", slug: "any" }]}
				/>
			);

			expect(screen.queryByRole("list")).toBeNull();
		});

		it("should render labelled list of medicinal forms when there are 2 or more forms", () => {
			render(<MedicinalFormsContent {...propsWithForms} />);

			const list = screen.getByRole("list", {
				name: "Links to each medicinal form",
			});

			expect(list).toBeInTheDocument();
		});

		it("should render link per medicinal form to section on forms page", () => {
			render(<MedicinalFormsContent {...propsWithForms} />);

			const list = screen.getByRole("list");

			expect(within(list).getAllByRole("link")).toHaveLength(2);
		});

		it("should render link medicinal form to section with hash on medicinal forms page", () => {
			render(<MedicinalFormsContent {...propsWithForms} />);

			const tabletsLink = screen.getByRole("link", { name: "Tablets" });

			userEvent.click(tabletsLink);

			expect(tabletsLink).toHaveAttribute(
				"href",
				"/drugs/anti-d-rh0-immunoglobulin/medicinal-forms/#tablets"
			);
			expect(navigate).toHaveBeenCalledWith(
				"/drugs/anti-d-rh0-immunoglobulin/medicinal-forms/#tablets"
			);
		});

		it("should match snapshot", () => {
			const { container } = render(
				<MedicinalFormsContent {...propsWithForms} />
			);

			expect(container).toMatchSnapshot();
		});
	});
});
