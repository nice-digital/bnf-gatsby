import { render, screen } from "@testing-library/react";

import { Monitoring, type MonitoringProps } from "./Monitoring";

describe("Monitoring", () => {
	const minimumProps: MonitoringProps = {
		potName: "Monitoring requirements",
		slug: "monitoring-requirements",
		drugClassContent: [],
		drugContent: null,
		prepContent: [],
	};

	describe("outer section", () => {
		it("should match snapshot", () => {
			render(
				<Monitoring
					{...minimumProps}
					drugClassContent={[
						{
							contentFor: "corticosteroids",
							patientMonitoringProgrammes:
								"<p>Some patient monitoring for all corticosteroids</p>",
							monitoringOfPatientParameters: null,
							therapeuticDrugMonitoring: null,
						},
						{
							contentFor: "opioids",
							monitoringOfPatientParameters:
								"<p>Patient parameters for all opioids</p>",
							therapeuticDrugMonitoring: null,
							patientMonitoringProgrammes: null,
						},
					]}
					drugContent={{
						contentFor: "co-codamol",
						therapeuticDrugMonitoring: "<p>Therapeutic for co-codamol</p>",
						monitoringOfPatientParameters: null,
						patientMonitoringProgrammes: null,
					}}
					prepContent={[
						{
							contentFor: "Solpadol® caplets",
							patientMonitoringProgrammes:
								"<p>Patient monitoring for a prep</p>",
							therapeuticDrugMonitoring: null,
							monitoringOfPatientParameters: null,
						},
					]}
				/>
			);

			expect(
				screen.getByRole("region", { name: "Monitoring requirements" })
			).toMatchSnapshot();
		});

		it("should render section with accessible name", () => {
			render(<Monitoring {...minimumProps} />);

			expect(
				screen.getByRole("region", { name: "Monitoring requirements" })
			).toBeInTheDocument();
		});

		it("should render heading 2 with section name", () => {
			render(<Monitoring {...minimumProps} />);

			expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent(
				"Monitoring requirements"
			);
		});
	});

	describe.each([
		["Therapeutic drug monitoring", "therapeuticDrugMonitoring"],
		["Monitoring of patient parameters", "monitoringOfPatientParameters"],
		["Patient monitoring programmes", "patientMonitoringProgrammes"],
	])("%s section", (heading, propertyName) => {
		const props: MonitoringProps = {
			...minimumProps,
			drugContent: {
				contentFor: "furosemide",
				monitoringOfPatientParameters: null,
				patientMonitoringProgrammes: null,
				therapeuticDrugMonitoring: null,
				[propertyName]: "<p>Monitor electrolytes during treatment.</p>",
			},
		};

		it(`should render section for ${heading} with accessible name`, () => {
			render(<Monitoring {...props} />);
			expect(
				screen.getByRole("region", { name: `${heading} For furosemide` })
			).toBeInTheDocument();
		});

		it(`should render heading 4 for ${heading}`, () => {
			render(<Monitoring {...props} />);
			expect(screen.getByRole("heading", { level: 4 })).toHaveTextContent(
				`${heading} For furosemide`
			);
		});

		it(`should render ${heading} content as HTML`, () => {
			render(<Monitoring {...props} />);
			expect(
				screen.getByText("Monitor electrolytes during treatment.")
			).toHaveProperty("tagName", "P");
		});
	});
});
