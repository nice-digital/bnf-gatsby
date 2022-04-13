import slugify from "@sindresorhus/slugify";
import { type FC } from "react";
import striptags from "striptags";

import { type FeedMonitoringPot } from "@nice-digital/gatsby-source-bnf";

import { type QueryResult, type WithSlug } from "@/utils";

import { PotSection } from "../PotSection/PotSection";

export type MonitoringProps = QueryResult<WithSlug<FeedMonitoringPot>>;

export const Monitoring: FC<MonitoringProps> = (props) => {
	return (
		<PotSection {...props}>
			{({
				contentForPrefix,
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
							<section
								aria-labelledby={`patient-parameters-${sectionSlugPostfix}`}
							>
								<h4 id={`patient-parameters-${sectionSlugPostfix}`}>
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
							<section
								aria-labelledby={`patient-programmes-${sectionSlugPostfix}`}
							>
								<h4 id={`patient-programmes-${sectionSlugPostfix}`}>
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
