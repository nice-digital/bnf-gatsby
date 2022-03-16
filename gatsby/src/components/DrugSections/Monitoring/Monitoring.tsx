import slugify from "@sindresorhus/slugify";
import { type FC } from "react";
import striptags from "striptags";

import { type FeedMonitoringPot } from "@nice-digital/gatsby-source-bnf";

import { type WithSlug } from "src/types";

import { PotSection } from "../PotSection/PotSection";

export type MonitoringProps = WithSlug<FeedMonitoringPot>;

export const Monitoring: FC<MonitoringProps> = (props) => {
	return (
		<PotSection {...props}>
			{({
				content: {
					contentFor,
					monitoringOfPatientParameters,
					patientMonitoringProgrammes,
					therapeuticDrugMonitoring,
				},
			}) => {
				const sectionSlugPostfix = slugify(striptags(contentFor));

				return (
					<>
						{therapeuticDrugMonitoring && (
							<section
								aria-labelledby={`therapeutic-drug-${sectionSlugPostfix}`}
							>
								<h4 id={`therapeutic-drug-${sectionSlugPostfix}`}>
									Therapeutic drug monitoring
								</h4>
								<div
									dangerouslySetInnerHTML={{
										__html: therapeuticDrugMonitoring,
									}}
								/>
							</section>
						)}

						{monitoringOfPatientParameters && (
							<section
								aria-labelledby={`patient-parameters-${sectionSlugPostfix}`}
							>
								<h4 id={`patient-parameters-${sectionSlugPostfix}`}>
									Monitoring of patient parameters
								</h4>
								<div
									dangerouslySetInnerHTML={{
										__html: monitoringOfPatientParameters,
									}}
								/>
							</section>
						)}

						{patientMonitoringProgrammes && (
							<section
								aria-labelledby={`patient-programmes-${sectionSlugPostfix}`}
							>
								<h4 id={`patient-programmes-${sectionSlugPostfix}`}>
									Patient monitoring programmes
								</h4>
								<div
									dangerouslySetInnerHTML={{
										__html: patientMonitoringProgrammes,
									}}
								/>
							</section>
						)}
					</>
				);
			}}
		</PotSection>
	);
};
