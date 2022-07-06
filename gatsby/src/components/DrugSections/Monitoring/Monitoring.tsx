import { type FC } from "react";

import {
	type FeedMonitoringPot,
	type FeedMonitoringPotContent,
} from "@nice-digital/gatsby-source-bnf";

import { type QueryResult, type WithSlug, type WithSlugDeep } from "@/utils";

import { PotSection } from "../PotSection/PotSection";

export type MonitoringProps = QueryResult<
	WithSlugDeep<WithSlug<FeedMonitoringPot>, FeedMonitoringPotContent>
>;

export const Monitoring: FC<MonitoringProps> = (props) => {
	return (
		<PotSection {...props}>
			{({
				contentForPrefix,
				content: {
					contentFor,
					slug,
					monitoringOfPatientParameters,
					patientMonitoringProgrammes,
					therapeuticDrugMonitoring,
				},
			}) => {
				return (
					<>
						{therapeuticDrugMonitoring && (
							<section aria-labelledby={`therapeutic-drug-${slug}`}>
								<h4 id={`therapeutic-drug-${slug}`}>
									Therapeutic drug monitoring
									<span
										className="visually-hidden"
										dangerouslySetInnerHTML={{
											__html: ` ${contentForPrefix} ${contentFor}`,
										}}
									/>
								</h4>
								<div
									dangerouslySetInnerHTML={{
										__html: therapeuticDrugMonitoring,
									}}
								/>
							</section>
						)}

						{monitoringOfPatientParameters && (
							<section aria-labelledby={`patient-parameters-${slug}`}>
								<h4 id={`patient-parameters-${slug}`}>
									Monitoring of patient parameters
									<span
										className="visually-hidden"
										dangerouslySetInnerHTML={{
											__html: ` ${contentForPrefix} ${contentFor}`,
										}}
									/>
								</h4>
								<div
									dangerouslySetInnerHTML={{
										__html: monitoringOfPatientParameters,
									}}
								/>
							</section>
						)}

						{patientMonitoringProgrammes && (
							<section aria-labelledby={`patient-programmes-${slug}`}>
								<h4 id={`patient-programmes-${slug}`}>
									Patient monitoring programmes
									<span
										className="visually-hidden"
										dangerouslySetInnerHTML={{
											__html: ` ${contentForPrefix} ${contentFor}`,
										}}
									/>
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
