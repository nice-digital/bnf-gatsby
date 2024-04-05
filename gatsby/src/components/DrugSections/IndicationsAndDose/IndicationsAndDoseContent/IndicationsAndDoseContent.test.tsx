/* eslint-disable testing-library/no-node-access */
import { render, screen, within } from "@testing-library/react";
import { type Except } from "type-fest";

import {
	IndicationsAndDoseContent,
	type IndicationsAndDoseContentProps,
} from "./IndicationsAndDoseContent";

const content: IndicationsAndDoseContentProps["content"] = {
	contentFor: "<strong>diazepam</strong>",
	slug: "diazepam",
	doseAdjustments: null,
	doseEquivalence: null,
	extremesOfBodyWeight: null,
	pharmacokinetics: null,
	potency: null,
	indicationAndDoseGroups: [
		{
			therapeuticIndications: [
				{
					indication: "Severe acute anxiety",
					sctIndication: "197480006",
					sctTherapeuticIntent: "262202000",
				},
				{
					indication: "Control of acute panic attacks",
					sctIndication: null,
					sctTherapeuticIntent: null,
				},
			],
			routesAndPatientGroups: [
				{
					routeOfAdministration: "By mouth",
					patientGroups: [
						{
							patientGroup: "child",
							detailedPatientGroup: "Child 1–11 months",
							doseStatement: "Initially 250 micrograms/kg twice daily.",
						},
						{
							patientGroup: "child",
							detailedPatientGroup: "Child 1–4 years",
							doseStatement: "Initially 2.5 mg twice daily.",
						},
						{
							patientGroup: "neonate",
							detailedPatientGroup:
								"Neonate (body surface area up to 1.3 m<sup>2</sup>)",
							doseStatement:
								"Initially 9.4&nbsp;g/m<sup>2</sup> daily in divided doses",
						},
					],
				},
				{
					routeOfAdministration:
						"By intramuscular injection, or by slow intravenous injection",
					patientGroups: [
						{
							patientGroup: "adult",
							detailedPatientGroup: "Adult",
							doseStatement:
								"10 mg, then 10 mg after at least 4 hours if required, intravenous injection to be administered into a large vein, at a rate of <em>not</em> more than 5 mg/minute.",
						},
					],
				},
			],
		},
	],
};

describe("IndicationsAndDoseContent", () => {
	it("should match snapshot", () => {
		render(<IndicationsAndDoseContent content={content} collapsible={false} />);

		expect(screen.getByLabelText("For diazepam")).toMatchSnapshot();
	});

	describe("collapsible", () => {
		it("should wrap content in accordion when collapsible", () => {
			render(
				<IndicationsAndDoseContent content={content} collapsible={true} />
			);
			expect(screen.getByRole("group")).toBeInTheDocument();
		});

		it("should render heading 3 with content for and prefix as accordion title", () => {
			render(
				<IndicationsAndDoseContent
					content={content}
					contentForPrefix="For all"
					collapsible={true}
				/>
			);

			const heading = screen.getByRole("heading", { level: 3 });

			expect(heading).toHaveTextContent(`For all diazepam`);
			// eslint-disable-next-line testing-library/no-node-access
			expect(heading.parentElement).toHaveProperty("tagName", "SUMMARY");
		});
	});

	describe("not collapsible", () => {
		it("should not render accordion when not collapsible", () => {
			render(
				<IndicationsAndDoseContent content={content} collapsible={false} />
			);
			expect(screen.queryByRole("group")).toBeNull();
		});

		it("should render visually hidden with content for and prefix", () => {
			render(
				<IndicationsAndDoseContent
					content={content}
					contentForPrefix="For all"
					collapsible={false}
				/>
			);

			const heading = screen.getByRole("heading", { level: 3 });
			expect(heading).toHaveTextContent("For all diazepam");
			expect(heading).toHaveClass("visually-hidden");
		});
	});

	describe("body", () => {
		describe("Indications section", () => {
			it("should append for screenreaders what content the indications are for to the indications heading", () => {
				render(
					<IndicationsAndDoseContent content={content} collapsible={false} />
				);

				expect(
					screen.getByRole("heading", {
						level: 4,
					}).textContent
				).toEndWith(" for diazepam");

				expect(
					screen.getByText(
						(_content, element) => element?.textContent === " for diazepam"
					)
				).toHaveClass("visually-hidden");
			});

			it("should render section for each indication and dose group labelled by indications", () => {
				render(
					<IndicationsAndDoseContent content={content} collapsible={false} />
				);

				expect(
					screen.getByRole("region", {
						name: "Severe acute anxiety, Control of acute panic attacks for diazepam",
					})
				);
			});

			it("should render heading 4 with multiple indications", () => {
				render(
					<IndicationsAndDoseContent content={content} collapsible={false} />
				);

				expect(
					screen.getByRole("heading", {
						level: 4,
					})
				).toHaveTextContent(
					"Severe acute anxiety, Control of acute panic attacks for diazepam"
				);
			});

			it("should render SNOMED CT codes as data attributes on indications", () => {
				render(
					<IndicationsAndDoseContent content={content} collapsible={false} />
				);

				const indication = screen.getByText(/^Severe acute anxiety/);

				expect(indication).toHaveAttribute("data-sct-indication", "197480006");
				expect(indication).toHaveAttribute(
					"data-sct-therapeutic-intent",
					"262202000"
				);
			});
		});

		describe("Routes of administration", () => {
			it("should render heading 5 for each route of administration", () => {
				render(
					<IndicationsAndDoseContent content={content} collapsible={false} />
				);

				const routeOfAdministrationHeadings = screen.getAllByRole("heading", {
					level: 5,
				});

				expect(routeOfAdministrationHeadings).toHaveLength(2);

				expect(routeOfAdministrationHeadings[0]).toHaveTextContent("By mouth");
				expect(routeOfAdministrationHeadings[1]).toHaveTextContent(
					"By intramuscular injection, or by slow intravenous injection"
				);
			});
		});

		describe("Patient groups", () => {
			it("should render item for each patient group", () => {
				render(
					<IndicationsAndDoseContent content={content} collapsible={false} />
				);

				const terms = screen.getAllByRole("term");

				expect(terms).toHaveLength(4);

				expect(terms.map((t) => t.textContent)).toStrictEqual([
					"Child 1–11 months",
					"Child 1–4 years",
					"Neonate (body surface area up to 1.3 m2)",
					"Adult",
				]);
			});

			it("should render class name for patient group item", () => {
				render(
					<IndicationsAndDoseContent content={content} collapsible={false} />
				);

				expect(
					screen.getAllByRole("term").find((el) => el.textContent === "Adult")
						?.parentElement
				).toHaveClass("patientGroupDose adult");
			});

			it("should render patient group with HTML dose statement", () => {
				render(
					<IndicationsAndDoseContent content={content} collapsible={false} />
				);

				const adult = screen
					.getAllByRole("term")
					.find((el) => el.textContent === "Adult");

				const termDefinition = adult?.nextSibling;

				expect(termDefinition).toHaveProperty("tagName", "DD");
				expect(termDefinition).toHaveTextContent(
					"10 mg, then 10 mg after at least 4 hours if required, intravenous injection to be administered into a large vein, at a rate of not more than 5 mg/minute."
				);
			});
		});

		it.each<
			[
				keyof Except<typeof content, "indicationAndDoseGroups" | "contentFor">,
				string,
			]
		>([
			["doseAdjustments", "Dose adjustments due to interactions"],
			["doseEquivalence", "Dose equivalence and conversion"],
			["extremesOfBodyWeight", "Doses at extremes of body-weight"],
			["potency", "Potency"],
			["pharmacokinetics", "Pharmacokinetics"],
		])(
			"should render %s field in %s section",
			(propertyName, expectedHeadingPrefix) => {
				render(
					<IndicationsAndDoseContent
						content={{ ...content, [propertyName]: "<p>Some content</p>" }}
						collapsible={false}
					/>
				);

				const section = screen.getByRole("region", {
					name: `${expectedHeadingPrefix} for diazepam`,
				});

				expect(
					within(section).getByRole("heading", { level: 4 })
				).toHaveTextContent(`${expectedHeadingPrefix} for diazepam`);

				expect(within(section).getByText("Some content")).toHaveProperty(
					"tagName",
					"P"
				);
			}
		);
	});
});
