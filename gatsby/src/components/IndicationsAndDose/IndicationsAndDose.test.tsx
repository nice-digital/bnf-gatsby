import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderToString } from "react-dom/server";

import {
	IndicationsAndDose,
	type IndicationsAndDoseProps,
} from "./IndicationsAndDose";

const data: IndicationsAndDoseProps["indicationsAndDose"] = {
	potName: "Indications <em>and</em> dose",
	slug: "indications-and-dose",
};

describe("IndicationsAndDose", () => {
	it("should render section labelled by pot name", () => {
		render(<IndicationsAndDose indicationsAndDose={data} />);

		expect(screen.getByLabelText("Indications and dose")).toBeInTheDocument();
	});

	it("should render heading 2 with HTML pot name", () => {
		render(<IndicationsAndDose indicationsAndDose={data} />);

		expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent(
			"Indications and dose"
		);
	});

	it("should render heading 2 with slug as id", () => {
		render(<IndicationsAndDose indicationsAndDose={data} />);

		expect(screen.getByRole("heading", { level: 2 })).toHaveAttribute(
			"id",
			"indications-and-dose"
		);
	});

	it("should not render content structure with empty content", () => {
		render(<IndicationsAndDose indicationsAndDose={data} />);
		expect(screen.queryAllByRole("heading", { level: 3 })).toHaveLength(0);
	});

	it("should render given drug content", () => {
		render(
			<IndicationsAndDose
				indicationsAndDose={{
					...data,
					drugContent: { contentFor: "diazepam" },
				}}
			/>
		);
		expect(screen.getAllByRole("heading", { level: 3 })).toHaveLength(1);
		expect(screen.getByRole("heading", { level: 3 })).toHaveTextContent(
			"For diazepam"
		);
	});

	it("should render content block for each drug class", () => {
		render(
			<IndicationsAndDose
				indicationsAndDose={{
					...data,
					drugClassContent: [
						{ contentFor: "opioids" },
						{ contentFor: "somethings" },
					],
				}}
			/>
		);

		const headings = screen.getAllByRole("heading", { level: 3 });

		expect(headings.map((n) => n.textContent)).toStrictEqual([
			"For all opioids",
			"For all somethings",
		]);
	});
	it("should render content block for each prep", () => {
		render(
			<IndicationsAndDose
				indicationsAndDose={{
					...data,
					prepContent: [
						{ contentFor: "Kapake® 15/500" },
						{ contentFor: "Solpadol® effervescent tablets" },
					],
				}}
			/>
		);

		const headings = screen.getAllByRole("heading", { level: 3 });

		expect(headings.map((n) => n.textContent)).toStrictEqual([
			"For Kapake® 15/500",
			"For Solpadol® effervescent tablets",
		]);
	});
	it("should not render single content blocks as accordion", () => {
		render(
			<IndicationsAndDose
				indicationsAndDose={{
					...data,
					drugContent: { contentFor: "diazepam" },
				}}
			/>
		);

		expect(screen.queryByRole("group")).toBeNull();
	});

	it("should render 2 or more content blocks as accordions", () => {
		render(
			<IndicationsAndDose
				indicationsAndDose={{
					...data,
					drugContent: { contentFor: "co-codamol" },
					prepContent: [
						{ contentFor: "Kapake® 15/500" },
						{ contentFor: "Solpadol® effervescent tablets" },
					],
				}}
			/>
		);

		expect(screen.getAllByRole("group")).toHaveLength(3);
	});

	describe("toggle all sections button", () => {
		const indicationsAndDose: IndicationsAndDoseProps["indicationsAndDose"] = {
			...data,
			// At least 2 "contentFor" here to get accordions and toggle button to render
			drugContent: { contentFor: "co-codamol" },
			prepContent: [
				{ contentFor: "Kapake® 15/500" },
				{ contentFor: "Solpadol® effervescent tablets" },
			],
		};

		it("should not render toggle all sections button server side", () => {
			const view = renderToString(
				<IndicationsAndDose indicationsAndDose={indicationsAndDose} />
			);

			expect(view).not.toContain("<button");
		});

		it("should not render render toggle all sections button client side with single content block", () => {
			render(
				<IndicationsAndDose
					indicationsAndDose={{
						...data,
						drugContent: { contentFor: "co-codamol" },
					}}
				/>
			);

			expect(screen.queryByRole("button")).toBeNull();
		});

		it("should render toggle all sections button client side when multiple content blocks", () => {
			render(<IndicationsAndDose indicationsAndDose={indicationsAndDose} />);

			expect(screen.getByRole("button")).toBeInTheDocument();
		});

		it("should expand all sections on toggle button click", () => {
			render(<IndicationsAndDose indicationsAndDose={indicationsAndDose} />);

			expect(
				screen.getAllByRole<HTMLDetailsElement>("group").map((d) => d.open)
			).toSatisfyAll((open) => !open);

			userEvent.click(screen.getByRole("button"));

			expect(
				screen.getAllByRole<HTMLDetailsElement>("group").map((d) => d.open)
			).toSatisfyAll((open) => open);
		});

		it("should toggle button text on button click", () => {
			render(<IndicationsAndDose indicationsAndDose={indicationsAndDose} />);

			expect(screen.getByRole("button")).toHaveTextContent(
				"Show all 3 sections"
			);

			userEvent.click(screen.getByRole("button"));

			expect(screen.getByRole("button")).toHaveTextContent(
				"Hide all 3 sections"
			);
		});
	});
});
