import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderToString } from "react-dom/server";

import {
	IndicationsAndDose,
	type IndicationsAndDoseProps,
} from "./IndicationsAndDose";

const minimumProps: IndicationsAndDoseProps = {
	potName: "Indications <em>and</em> dose",
	slug: "indications-and-dose",
	drugClassContent: [],
	drugContent: null,
	prepContent: [],
};

const diazepamDrugContent: IndicationsAndDoseProps["drugContent"] = {
		contentFor: "diazepam",
		indicationAndDoseGroups: [
			{
				therapeuticIndications: [],
				routesAndPatientGroups: [],
			},
		],
		doseAdjustments: null,
		doseEquivalence: null,
		extremesOfBodyWeight: null,
		pharmacokinetics: null,
		potency: null,
	},
	opioidsDrugClassContent: IndicationsAndDoseProps["drugContent"] = {
		...diazepamDrugContent,
		contentFor: "opioids",
	},
	antipsychoticDrugClassContent: IndicationsAndDoseProps["drugContent"] = {
		...diazepamDrugContent,
		contentFor: "antipsychotic drugs",
	},
	kapakePrepContent: IndicationsAndDoseProps["drugContent"] = {
		...diazepamDrugContent,
		contentFor: "Kapake® 15/500",
	},
	solpadolPrepContent: IndicationsAndDoseProps["drugContent"] = {
		...diazepamDrugContent,
		contentFor: "Solpadol® effervescent tablets",
	};

describe("IndicationsAndDose", () => {
	it("should render section labelled by pot name", () => {
		render(<IndicationsAndDose {...minimumProps} />);

		expect(screen.getByLabelText("Indications and dose")).toBeInTheDocument();
	});

	it("should render heading 2 with HTML pot name", () => {
		render(<IndicationsAndDose {...minimumProps} />);

		expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent(
			"Indications and dose"
		);
	});

	it("should render heading 2 with slug as id", () => {
		render(<IndicationsAndDose {...minimumProps} />);

		expect(screen.getByRole("heading", { level: 2 })).toHaveAttribute(
			"id",
			"indications-and-dose"
		);
	});

	it("should not render content structure with empty content", () => {
		render(<IndicationsAndDose {...minimumProps} />);
		expect(screen.queryAllByRole("heading", { level: 3 })).toHaveLength(0);
	});

	it("should render given drug content", () => {
		render(
			<IndicationsAndDose {...minimumProps} drugContent={diazepamDrugContent} />
		);
		expect(screen.getAllByRole("heading", { level: 3 })).toHaveLength(1);
		expect(screen.getByRole("heading", { level: 3 })).toHaveTextContent(
			"For diazepam"
		);
	});

	it("should render content block for each drug class", () => {
		render(
			<IndicationsAndDose
				{...minimumProps}
				drugClassContent={[
					opioidsDrugClassContent,
					antipsychoticDrugClassContent,
				]}
			/>
		);

		const headings = screen.getAllByRole("heading", { level: 3 });

		expect(headings.map((n) => n.textContent)).toStrictEqual([
			"For all opioids",
			"For all antipsychotic drugs",
		]);
	});
	it("should render content block for each prep", () => {
		render(
			<IndicationsAndDose
				{...minimumProps}
				prepContent={[kapakePrepContent, solpadolPrepContent]}
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
			<IndicationsAndDose {...minimumProps} drugContent={diazepamDrugContent} />
		);

		expect(screen.queryByRole("group")).toBeNull();
	});

	it("should render 2 or more content blocks as accordions", () => {
		render(
			<IndicationsAndDose
				{...minimumProps}
				drugContent={diazepamDrugContent}
				prepContent={[kapakePrepContent, solpadolPrepContent]}
			/>
		);

		expect(screen.getAllByRole("group")).toHaveLength(3);
	});

	describe("toggle all sections button", () => {
		const props: IndicationsAndDoseProps = {
			...minimumProps,
			// At least 2 "contentFor" here to get accordions and toggle button to render
			drugContent: diazepamDrugContent,
			prepContent: [kapakePrepContent, solpadolPrepContent],
		};

		it("should not render toggle all sections button server side", () => {
			const view = renderToString(<IndicationsAndDose {...props} />);

			expect(view).not.toContain("<button");
		});

		it("should not render render toggle all sections button client side with single content block", () => {
			render(
				<IndicationsAndDose
					{...minimumProps}
					drugContent={diazepamDrugContent}
				/>
			);

			expect(screen.queryByRole("button")).toBeNull();
		});

		it("should render toggle all sections button client side when multiple content blocks", () => {
			render(<IndicationsAndDose {...props} />);

			expect(screen.getByRole("button")).toBeInTheDocument();
		});

		it("should expand all sections on toggle button click", () => {
			render(<IndicationsAndDose {...props} />);

			expect(
				screen.getAllByRole<HTMLDetailsElement>("group").map((d) => d.open)
			).toSatisfyAll((open) => !open);

			userEvent.click(screen.getByRole("button"));

			expect(
				screen.getAllByRole<HTMLDetailsElement>("group").map((d) => d.open)
			).toSatisfyAll((open) => open);
		});

		it("should have appropriate data tracking attribute on the expand/collapse all sections button", () => {
			render(<IndicationsAndDose {...props} />);

			expect(
				screen.getByRole("button", {
					name: /show all 3 sections/i,
				})
			).toHaveAttribute("data-tracking", "Show all sections");

			userEvent.click(
				screen.getByRole("button", {
					name: /show all 3 sections/i,
				})
			);

			expect(
				screen.getByRole("button", {
					name: /hide all 3 sections/i,
				})
			).toHaveAttribute("data-tracking", "Hide all sections");
		});

		it("should toggle button text on button click", () => {
			render(<IndicationsAndDose {...props} />);

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
